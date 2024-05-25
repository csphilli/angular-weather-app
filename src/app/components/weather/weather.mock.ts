import { WeatherInfo } from "../../weatherinfo";
export const mockWeatherData: WeatherInfo = {
	coord: {
			lon: 24.9353,
			lat: 60.1694
	},
	weather: [
			{
					id: 800,
					main: "Clear",
					description: "clear sky",
					icon: "01d"
			}
	],
	base: "stations",
	main: {
			temp: 20.54,
			feels_like: 20.45,
			temp_min: 17.71,
			temp_max: 24.78,
			pressure: 1009,
			humidity: 69
	},
	visibility: 10000,
	wind: {
			speed: 1.34,
			deg: 328
	},
	clouds: {
			all: 0
	},
	dt: 1716622683,
	sys: {
			type: 2,
			id: 2036194,
			country: "FI",
			sunrise: 1716600006,
			sunset: 1716664615
	},
	timezone: 10800,
	id: 658225,
	name: "Helsinki",
	cod: 200
}