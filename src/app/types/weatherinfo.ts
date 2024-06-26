interface coordType {
	lon: number
	lat: number
}

interface weatherType {
	id: number
	main: string
	description: string
	icon: string
}

interface mainType {
	temp: number
	feels_like: number
	pressure: number
	humidity: number
	temp_min: number
	temp_max: number
	sea_level?: number
	grnd_level?: number
}

interface windType {
	speed: number
	deg: number
	gust?: number
}

interface cloudType {
	all: number
}

interface sysType {
	sunrise: number
	sunset: number
	type: number
	id: number
	country: string
}

export interface WeatherInfo {
	coord: coordType
	weather: weatherType[]
	base: string
	main: mainType
	visibility: number
	wind: windType
	clouds: cloudType
	dt: number
	sys: sysType
	timezone: number
	id: number
	name: string
	cod: number
}
