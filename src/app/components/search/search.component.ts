import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms"
import {
	Subject,
	catchError,
	debounceTime,
	distinctUntilChanged,
	of,
	switchMap,
	takeUntil,
} from "rxjs"
import { WeatherService } from "../../services/weather/weather.service"
import { CityLocation } from "../../types/citylocation"
import { NgClass, NgFor, NgIf } from "@angular/common"
import { CitySelectorService } from "../../services/citySelector/city-selector.service"
import { UnitService } from "../../services/unit/unit.service"
import { UnitType, Units } from "../../types/units"

@Component({
	selector: "app-search",
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor, NgClass],
	templateUrl: "./search.component.html",
	styleUrl: "./search.component.scss",
})
export class SearchComponent implements OnDestroy, OnInit {
	searchInput: FormControl = new FormControl("")
	units = Units
	selectedUnit: UnitType = Units.metric
	cityLocations: CityLocation[] | null = null
	isInputFocused: boolean = false
	private destroy$: Subject<void> = new Subject()

	clearFormAndCities() {
		this.searchInput.reset()
		this.cityLocations = null
	}

	onFocus() {
		this.isInputFocused = true
	}

	// if we blur immediately, we can't capture the click on search results
	onBlur() {
		setTimeout(() => {
			this.isInputFocused = false
		}, 100)
	}

	onSelect(city: CityLocation) {
		this.citySelectorService.updateSelectedCity(city)
		this.clearFormAndCities()
	}

	changeUnit(unit: UnitType) {
		this.unitService.updateSelectedUnit(unit)
	}

	ngOnInit(): void {
		this.unitService.selectedUnit$.subscribe((unit) => {
			this.selectedUnit = unit
		})
	}

	constructor(
		private weatherService: WeatherService,
		private citySelectorService: CitySelectorService,
		private unitService: UnitService
	) {
		this.searchInput.valueChanges
			.pipe(
				debounceTime(300),
				distinctUntilChanged(),
				switchMap((searchTerm: string) => {
					if (searchTerm !== null && searchTerm.trim()) {
						return this.weatherService.getLocation(searchTerm).pipe(
							takeUntil(this.destroy$),
							catchError((err) => {
								console.error("error getting city locations:", err)
								this.clearFormAndCities()
								return of([])
							})
						)
					} else {
						this.clearFormAndCities()
						return of([])
					}
				})
			)
			.subscribe({
				next: (data: CityLocation[]) => {
					this.cityLocations = data
				},
				error: (err) => {
					console.error("error getting city locations", err)
					this.clearFormAndCities()
				},
			})
	}

	ngOnDestroy(): void {
		this.destroy$.next()
		this.destroy$.complete()
	}
}
