import { TestBed } from "@angular/core/testing"

import { CitySelectorService } from "./city-selector.service"

describe("CitySelectorService", () => {
	let service: CitySelectorService

	beforeEach(() => {
		TestBed.configureTestingModule({})
		service = TestBed.inject(CitySelectorService)
	})

	it("should be created", () => {
		expect(service).toBeTruthy()
	})
})
