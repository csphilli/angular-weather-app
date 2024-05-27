import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import { UnitType, Units } from "../../types/units"

@Injectable({
	providedIn: "root",
})
export class UnitService {
	private getStoredUnit(): UnitType {
		const storedUnit = localStorage.getItem("measurement_unit")
		if (storedUnit === Units.metric || storedUnit === Units.imperial) {
			return storedUnit
		}
		return Units.metric
	}

	private unitSubject = new BehaviorSubject<UnitType>(this.getStoredUnit())

	selectedUnit$ = this.unitSubject.asObservable()

	updateSelectedUnit(unit: UnitType) {
		this.unitSubject.next(unit)
		localStorage.setItem("measurement_unit", unit)
	}

	get selectedUnit(): string {
		return this.unitSubject.getValue()
	}

	constructor() {}
}
