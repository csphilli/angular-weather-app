import { Component, OnDestroy, OnInit } from '@angular/core';
import { CitySelectorService } from '../../services/citySelector/city-selector.service';
import { CityLocation } from '../../citylocation';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { NgIf } from '@angular/common';
import { WeatherService } from '../../services/weather/weather.service';
import { WeatherInfo } from '../../weatherinfo';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [NgIf],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent implements OnInit, OnDestroy {
  selectedCity: CityLocation | null = null
  currentWeather: WeatherInfo | null = null
  private destroy$: Subject<void> = new Subject()
  private citySubscription: Subscription = new Subscription

  ngOnInit(): void {
    this.citySubscription = this.citySelectorService.selectedCity$.subscribe({
      next: (city: CityLocation) => {
        this.selectedCity = city
        this.weatherService.getWeather(city.lat, city.lon)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (weather: WeatherInfo) => {
              this.currentWeather = weather
            },
            error: (err) => {
              console.error("Error fetching weather data:", err)
            }
          })
      },
      error: (err) => {
        console.error("Error receiving city:", err)
      }
    }
    )
  }

  ngOnDestroy(): void {
    if (this.citySubscription) {
      this.citySubscription.unsubscribe()
    }
  }

  constructor(private citySelectorService: CitySelectorService, private weatherService: WeatherService) {}
}
