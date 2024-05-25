import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from "@angular/core/testing"
import { SearchComponent } from "./search.component"
import { By } from "@angular/platform-browser"
import { WeatherService } from "../../services/weather/weather.service"
import { ReactiveFormsModule } from "@angular/forms"
import { CitySelectorService } from "../../services/citySelector/city-selector.service"
import { mockCityData } from "../weather/citydata.mock"
import { of } from "rxjs"
import { mockWeatherData } from "../weather/weather.mock"

describe("SearchComponent", () => {
	let component: SearchComponent
	let fixture: ComponentFixture<SearchComponent>
	let weatherServiceSpy: jasmine.SpyObj<WeatherService>

	beforeEach(async () => {
		weatherServiceSpy = jasmine.createSpyObj("WeatherService", ["getLocation", "getWeather"])

		await TestBed.configureTestingModule({
			imports: [ReactiveFormsModule, SearchComponent],
			providers: [{ provide: WeatherService, useValue: weatherServiceSpy }, CitySelectorService],
		}).compileComponents()

		fixture = TestBed.createComponent(SearchComponent)
		component = fixture.componentInstance
		weatherServiceSpy = TestBed.inject(WeatherService) as jasmine.SpyObj<WeatherService>
		weatherServiceSpy.getLocation.and.returnValue(of(mockCityData))
		weatherServiceSpy.getWeather.and.returnValue(of(mockWeatherData))
		fixture.detectChanges()
	})

	beforeEach(() => {
		fixture = TestBed.createComponent(SearchComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it("should create", () => {
		expect(component).toBeTruthy()
	})

	it("should render the search bar", () => {
		const searchBar = fixture.debugElement.query(By.css('[data-test="search-input"]')).nativeElement
		expect(searchBar).toBeTruthy()
	})

	it("should show search results", fakeAsync(() => {
		const searchTerm = "Helsinki"
		const searchBar = fixture.debugElement.query(By.css('[data-test="search-input"]')).nativeElement

		expect(searchBar).toBeTruthy()
		searchBar.dispatchEvent(new Event("focus"))
		expect(component.isInputFocused).toBeTruthy()
		component.searchInput.setValue(searchTerm)
		expect(component.searchInput.value).toBe(searchTerm)

		fixture.detectChanges()
		tick(300) // wait for debounce on search input
		expect(weatherServiceSpy.getLocation).toHaveBeenCalledWith(searchTerm)
		expect(component.cityLocations?.length).toBeGreaterThan(0)

		fixture.detectChanges()

		const searchResults = fixture.debugElement.query(
			By.css('[data-test="search-results"]')
		).nativeElement
		expect(searchResults).toBeTruthy()

		const resultRows = fixture.debugElement.queryAll(By.css('[data-test="result-row"]'))
		expect(resultRows.length).toEqual(1)
	}))
})
