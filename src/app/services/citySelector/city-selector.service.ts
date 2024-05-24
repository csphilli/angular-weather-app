import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CityLocation } from '../../citylocation';

@Injectable({
  providedIn: 'root'
})
export class CitySelectorService {
  defaultCity: CityLocation = {
    name: "Helsinki",
    lat: 60.1675,
    lon: 24.9427,
    country: "FI"
  }

  private selectedCitySubject = new BehaviorSubject<CityLocation>(this.getStoredCity());

  selectedCity$ = this.selectedCitySubject.asObservable();

  private getStoredCity(): CityLocation {
    const storedCity = localStorage.getItem("city")
    if (storedCity) {
      return JSON.parse(storedCity)
    }
    return this.defaultCity
  }

  updateSelectedCity(city: CityLocation) {
    this.selectedCitySubject.next(city)
    localStorage.setItem("city", JSON.stringify(city))
  }

  constructor() { }
}
