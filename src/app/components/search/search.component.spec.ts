import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { By } from '@angular/platform-browser';
import { WeatherService } from '../../services/weather/weather.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CitySelectorService } from '../../services/citySelector/city-selector.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    const weatherServiceSpy = jasmine.createSpyObj('WeatherService', ['getLocation'])

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SearchComponent],
      providers: [
        {provide: WeatherService, useValue: weatherServiceSpy},
        CitySelectorService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should render the search bar', () => {
    const searchBar = fixture.debugElement.query(By.css('[data-test="search-bar"]')).nativeElement
    expect(searchBar).toBeTruthy();
  })
});
