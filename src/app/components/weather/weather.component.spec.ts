import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherComponent } from './weather.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherComponent],
      providers: [importProvidersFrom(HttpClientModule)]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
