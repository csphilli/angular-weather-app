import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { CityLocation } from "../../types/citylocation"
import { WeatherInfo } from "../../types/weatherinfo"

@Injectable({
	providedIn: "root",
})
export class WeatherService {
	private weatherBaseApiUrl = "https://api.openweathermap.org/data/2.5/weather?"
	private geoCodeBaseApiUrl = "https://api.openweathermap.org/geo/1.0/direct?q="
	private searchLimit = 10

	getWeather(lat: number, lon: number, unit: string): Observable<WeatherInfo> {
		const url = `${this.weatherBaseApiUrl}lat=${lat}&lon=${lon}&units=${unit}&appid=${process.env["OPEN_WEATHER_ORG_API_KEY"]}`
		return this.http.get<WeatherInfo>(url)
	}

	getLocation(searchTerm: string): Observable<CityLocation[]> {
		const url = `${this.geoCodeBaseApiUrl}${searchTerm}&limit=${this.searchLimit}&appid=${process.env["OPEN_WEATHER_ORG_API_KEY"]}`
		return this.http.get<CityLocation[]>(url)
	}

	constructor(private http: HttpClient) {}
}
