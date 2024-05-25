import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"

@Injectable({
	providedIn: "root",
})
export class UnitService {
	private unitSubject = new BehaviorSubject<string>(
		localStorage.getItem("measurement_unit") || "metric"
	)
	selectedUnit$ = this.unitSubject.asObservable()

	updateSelectedUnit(unit: string) {
		this.unitSubject.next(unit)
		localStorage.setItem("measurement_unit", unit)
	}

	get selectedUnit(): string {
		return this.unitSubject.getValue()
	}

	constructor() {}
}
