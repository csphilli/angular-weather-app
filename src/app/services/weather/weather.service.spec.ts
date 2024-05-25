import { TestBed } from "@angular/core/testing"

import { WeatherService } from "./weather.service"
import { importProvidersFrom } from "@angular/core"
import { HttpClientModule } from "@angular/common/http"

describe("WeatherService", () => {
	let service: WeatherService

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [importProvidersFrom(HttpClientModule)],
		})
		service = TestBed.inject(WeatherService)
	})

	it("should be created", () => {
		expect(service).toBeTruthy()
	})
})
