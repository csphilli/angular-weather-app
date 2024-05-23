import { Component, HostListener, OnDestroy } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, catchError, debounceTime, distinctUntilChanged, of, switchMap, takeUntil } from 'rxjs';
import { WeatherService } from '../../services/weather/weather.service';
import { CityLocation } from '../../citylocation';
import { NgFor, NgIf } from '@angular/common';
import { CitySelectorService } from '../../services/citySelector/city-selector.service';
import DOMPurify from 'dompurify';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnDestroy {
  searchInput: FormControl = new FormControl('');
  cityLocations: CityLocation[] | null = null;
  private destroy$: Subject<void> = new Subject();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  clearFormAndCities() {
    this.searchInput.reset();
    this.cityLocations = null;
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    const searchInput = document.querySelector("#searchInput")
    if (event.target !== searchInput) {
      this.clearFormAndCities();
    }
  }
  
  onSelect(city: CityLocation) {
    this.citySelectorService.selectCity(city);
  }

 
  constructor(private weatherService: WeatherService, private citySelectorService: CitySelectorService) {
    this.searchInput.valueChanges.
    pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchTerm: string) => {
        if (searchTerm !== null && searchTerm.trim()) {
          const sanitizedTerm = DOMPurify.sanitize(searchTerm)
          return this.weatherService.getLocation(sanitizedTerm).
          pipe(
            takeUntil(this.destroy$),
            catchError(err => {
              console.error("error getting city locations:", err)
              this.clearFormAndCities()
              return of([])
            })
          )
        } else {
          this.clearFormAndCities();
          return of([]);
        }
      })).
    subscribe({
      next: (data: CityLocation[]) => {
        this.cityLocations = data
      },
      error: (err) => {
        console.error("error getting city locations", err)
        this.clearFormAndCities()
      }
    })
  }
}
