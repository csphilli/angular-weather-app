import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherComponent } from './weather.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { mockWeatherData } from './weather.mock';
import { mockCityData } from './citydata.mock';
import { of } from 'rxjs';
import { WeatherService } from '../../services/weather/weather.service';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let weatherService: jasmine.SpyObj<WeatherService>

  beforeEach(async () => {
    const weatherServiceSpy = jasmine.createSpyObj('WeatherService', ['getWeather'])
    await TestBed.configureTestingModule({
      imports: [WeatherComponent],
      providers: [
        {provide: WeatherService, useValue: weatherServiceSpy},
        importProvidersFrom(HttpClientModule)
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(WeatherService) as jasmine.SpyObj<WeatherService>
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() => {
    const city = mockCityData
    const unit = 'metric'

    weatherService.getWeather.and.returnValue(of(mockWeatherData))

    component.fetchWeather(city[0], unit)
    fixture.detectChanges()
  })

  it('should fetch weather data and updated the component state', () => {
    const city = mockCityData
    const unit = 'metric'

    expect(component.weather).toEqual(mockWeatherData)
    expect(weatherService.getWeather).toHaveBeenCalledWith(city[0].lat, city[0].lon, unit)
  })

  it('should have the required weather metrics', () => {
    expect(fixture.debugElement.query(By.css("[data-test='weather-heading']"))).toBeTruthy()
    expect(fixture.debugElement.query(By.css("[data-test='feels-like']"))).toBeTruthy()
    expect(fixture.debugElement.query(By.css("[data-test='weather-description']"))).toBeTruthy()
    expect(fixture.debugElement.query(By.css("[data-test='hi-low-temps']"))).toBeTruthy()
    expect(fixture.debugElement.query(By.css("[data-test='humidity']"))).toBeTruthy()
    expect(fixture.debugElement.query(By.css("[data-test='pressure']"))).toBeTruthy()
    expect(fixture.debugElement.query(By.css("[data-test='sunrise-sunset-times']"))).toBeTruthy()
    expect(fixture.debugElement.query(By.css("[data-test='wind-speed']"))).toBeTruthy()
    expect(fixture.debugElement.query(By.css("[data-test='visibility']"))).toBeTruthy()
  })

  it('should convert a value to specified number of decimal places', () => {
    const value = 123.4567
    let places = 2
    let expected = 123.46
    
    let result = component.convertToDecimal(value, places)
    expect(result).toBe(expected)

    places = 0
    expected = 123
    result = component.convertToDecimal(value, places)
    expect(result).toBe(expected)
  })

  it('should return the correct wind direction given a degree input', () => {
    let degree = 15
    let expected = "S"

    let result = component.getWindDirection(degree)
    expect(result).toBe(expected)

    degree = 160
    expected = "N"
    result = component.getWindDirection(degree)
    expect(result).toBe(expected)

    degree = 1
    expected = "S"
    result = component.getWindDirection(degree)
    expect(result).toBe(expected)

    degree = 300 
    expected = "SE"
    result = component.getWindDirection(degree)
    expect(result).toBe(expected)
  })

  it('Should capitalize first letter of every word', () => {
    let words = "thank you for considering me"
    let expected = "Thank You For Considering Me"
    let result = component.capitalizeWords(words)
    expect(result).toBe(expected)

    words = "Mixing a few Words"
    expected = "Mixing A Few Words"
    result = component.capitalizeWords(words)
    expect(result).toBe(expected)
  })
});
