import { ComponentFixture, TestBed } from "@angular/core/testing"
import { WeatherComponent } from "./weather.component"
import { importProvidersFrom } from "@angular/core"
import { HttpClientModule } from "@angular/common/http"
import { By } from "@angular/platform-browser"
import { mockWeatherData } from "./weather.mock"
import { mockCityData } from "./citydata.mock"
import { of } from "rxjs"
import { WeatherService } from "../../services/weather/weather.service"

describe("WeatherComponent", () => {
	let component: WeatherComponent
	let fixture: ComponentFixture<WeatherComponent>
	let weatherService: jasmine.SpyObj<WeatherService>

	beforeEach(async () => {
		const weatherServiceSpy = jasmine.createSpyObj("WeatherService", ["getWeather"])
		await TestBed.configureTestingModule({
			imports: [WeatherComponent],
			providers: [
				{ provide: WeatherService, useValue: weatherServiceSpy },
				importProvidersFrom(HttpClientModule),
			],
		}).compileComponents()

		fixture = TestBed.createComponent(WeatherComponent)
		component = fixture.componentInstance
		weatherService = TestBed.inject(WeatherService) as jasmine.SpyObj<WeatherService>
		fixture.detectChanges()
	})

	it("should create", () => {
		expect(component).toBeTruthy()
	})

	beforeEach(() => {
		const city = mockCityData
		const unit = "metric"

		weatherService.getWeather.and.returnValue(of(mockWeatherData))

		component.fetchWeather(city[0], unit)
		fixture.detectChanges()
	})

	it("should fetch weather data and updated the component state", () => {
		const city = mockCityData
		const unit = "metric"

		expect(component.weather).toEqual(mockWeatherData)
		expect(weatherService.getWeather).toHaveBeenCalledWith(city[0].lat, city[0].lon, unit)
	})

	it("should have the required weather metrics and correct values", () => {
		const dataTestTags = [
			"weather-description",
			"hi-low-temps",
			"humidity",
			"pressure",
			"sunrise-sunset-times",
			"wind-speed",
			"visibility",
		]

		interface ExpectedTagsToValues {
			[key: string]: string
		}

		const expectedTagsToValues: ExpectedTagsToValues = {
			"weather-description-value": "Clear Sky",
			"hi-low-temps-value": "25°C / 18°C",
			"humidity-value": "69%",
			"pressure-value": "1009 hPa",
			"sunrise-sunset-times-value": "4:20 AM / 10:16 PM",
			"wind-speed-value": "SE 1.34 m/s",
			"visibility-value": "10 km",
		}

		dataTestTags.forEach((tag) => {
			const element = fixture.debugElement.query(By.css(`[data-test='${tag}']`))
			expect(element).toBeTruthy()

			const valueTag = `${tag}-value`
			const value = fixture.debugElement.query(By.css(`[data-test='${valueTag}']`))
			expect(value).toBeTruthy()
			expect(value.nativeElement.textContent).toEqual(expectedTagsToValues[valueTag])
		})
	})

	it("should return the correct wind direction given a degree input", () => {
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

	it("Should capitalize first letter of every word", () => {
		let words = "thank you for considering me"
		let expected = "Thank You For Considering Me"
		let result = component.capitalizeWords(words)
		expect(result).toBe(expected)

		words = "Mixing a few Words"
		expected = "Mixing A Few Words"
		result = component.capitalizeWords(words)
		expect(result).toBe(expected)
	})
})
