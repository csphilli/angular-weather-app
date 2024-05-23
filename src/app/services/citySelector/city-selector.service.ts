import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CityLocation } from '../../citylocation';

@Injectable({
  providedIn: 'root'
})
export class CitySelectorService {
  private selectedCitySubject = new Subject<CityLocation>();

  selectedCity$ = this.selectedCitySubject.asObservable();

  selectCity(city: CityLocation) {
    this.selectedCitySubject.next(city);
  }

  constructor() { }
}
