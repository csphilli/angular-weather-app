import { Component, OnDestroy, OnInit } from "@angular/core"
import { CitySelectorService } from "../../services/citySelector/city-selector.service"
import { CityLocation } from "../../types/citylocation"
import { Subject, Subscription, takeUntil, combineLatest } from "rxjs"
import { NgIf, DatePipe, DecimalPipe } from "@angular/common"
import { WeatherService } from "../../services/weather/weather.service"
import { WeatherInfo } from "../../types/weatherinfo"
import { IconComponent } from "../icon/icon.component"
import { UnitService } from "../../services/unit/unit.service"
import { Units } from "../../types/units"

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
		return this.selectedUnit === Units.metric ? "m/s" : "mph"
	}

	// direction is in terms of where wind is coming FROM
	getWindDirection(degree: number): string {
		if (degree >= 337.5) {
			return "E"
		} else if (degree >= 292.5) {
			return "SE"
		} else if (degree >= 247.5) {
			return "E"
		} else if (degree >= 202.5) {
			return "NE"
		} else if (degree >= 157.5) {
			return "N"
		} else if (degree >= 112.5) {
			return "NW"
		} else if (degree >= 67.5) {
			return "W"
		} else if (degree >= 22.5) {
			return "SW"
		} else {
			return "S"
		}
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
				this.degreeUnit = this.selectedUnit === Units.metric ? "°C" : "°F"
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
