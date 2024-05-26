import { Component, OnDestroy, OnInit } from "@angular/core"
import { CitySelectorService } from "../../services/citySelector/city-selector.service"
import { CityLocation } from "../../citylocation"
import { Subject, Subscription, takeUntil, combineLatest } from "rxjs"
import { NgIf, DatePipe, DecimalPipe } from "@angular/common"
import { WeatherService } from "../../services/weather/weather.service"
import { WeatherInfo } from "../../weatherinfo"
import { IconComponent } from "../icon/icon.component"
import { UnitService } from "../../services/unit/unit.service"

@Component({
	selector: "app-weather",
	standalone: true,
	imports: [NgIf, IconComponent, DatePipe, DecimalPipe],
	templateUrl: "./weather.component.html",
	styleUrl: "./weather.component.scss",
})
export class WeatherComponent implements OnInit, OnDestroy {
	selectedCity!: CityLocation
	selectedUnit!: string
	degreeUnit!: string
	weather: WeatherInfo | null = null
	private destroy$: Subject<void> = new Subject()
	private citySubscription: Subscription = new Subscription()

	capitalizeWords(words: string): string {
		return words.replace(/\b\w/g, function (char) {
			return char.toUpperCase()
		})
	}

	getWindSpeedUnit() {
		return this.selectedUnit === "metric" ? "m/s" : "mph"
	}

	// direction is in terms of where wind is coming FROM
	getWindDirection(degree: number): string {
		let direction

		switch (true) {
			case degree >= 337.5:
				direction = "E"
				break
			case degree >= 292.5:
				direction = "SE"
				break
			case degree >= 247.5:
				direction = "E"
				break
			case degree >= 202.5:
				direction = "NE"
				break
			case degree >= 157.5:
				direction = "N"
				break
			case degree >= 112.5:
				direction = "NW"
				break
			case degree >= 67.5:
				direction = "W"
				break
			case degree >= 22.5:
				direction = "SW"
				break
			case degree >= 0:
				direction = "S"
				break
			default:
				direction = "S"
		}
		return direction
	}

	convertToDate(value: number): Date {
		return new Date(value * 1000)
	}

	ngOnInit(): void {
		combineLatest([this.citySelectorService.selectedCity$, this.unitService.selectedUnit$])
			.pipe(takeUntil(this.destroy$))
			.subscribe(([city, unit]) => {
				this.selectedCity = city
				this.selectedUnit = unit
				this.degreeUnit = this.selectedUnit === "metric" ? "°C" : "°F"
				this.fetchWeather(city, unit)
			})
	}

	fetchWeather(city: CityLocation, unit: string) {
		this.weatherService
			.getWeather(city.lat, city.lon, unit)
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: (weather: WeatherInfo) => {
					this.weather = weather
				},
				error: (err) => {
					console.error("error fetching weather data:", err)
				},
			})
	}

	ngOnDestroy(): void {
		if (this.citySubscription) {
			this.citySubscription.unsubscribe()
		}
	}

	constructor(
		private citySelectorService: CitySelectorService,
		private weatherService: WeatherService,
		private unitService: UnitService
	) {}
}
