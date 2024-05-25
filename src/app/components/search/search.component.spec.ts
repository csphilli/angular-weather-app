import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { By } from '@angular/platform-browser';
import { WeatherService } from '../../services/weather/weather.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CitySelectorService } from '../../services/citySelector/city-selector.service';
import { mockCityData } from '../weather/citydata.mock';
import { of } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let weatherService: jasmine.SpyObj<WeatherService>

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

    fixture = TestBed.createComponent(SearchComponent)
    component = fixture.componentInstance
    weatherService = TestBed.inject(WeatherService) as jasmine.SpyObj<WeatherService>
    fixture.detectChanges()
  });

  beforeEach(() => {
    const city = mockCityData

    weatherService.getLocation.and.returnValue(of(mockCityData))
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should render the search bar', () => {
    const searchBar = fixture.debugElement.query(By.css('[data-test="search-input"]')).nativeElement
    expect(searchBar).toBeTruthy();
  })

  it('should show search results', fakeAsync(() => {
    const searchTerm = "Helsinki"
    const searchBar = fixture.debugElement.query(By.css('[data-test="search-input"]')).nativeElement
    expect(searchBar).toBeTruthy()
    component.searchInput.setValue(searchTerm)

    fixture.detectChanges()
    tick(300) // wait for debounce on search input

    const searchBarValue = searchBar.value
    expect(searchBarValue).toEqual(searchTerm)
    // expect(weatherServiceSpy.)

    // const searchResults = fixture.debugElement.query(By.css('[data-test="search-results"]')).nativeElement
    // expect(searchResults).toBeTruthy()
  }))
});
