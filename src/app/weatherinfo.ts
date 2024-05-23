interface coordType {
	coord: {
		lon: string
		lat: string
	}
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
	sea_level: number
	grnd_level: number
}

interface windType {
	speed: number
	deg: number
	gust: number
}

interface cloudType {
	all: number
}

interface intervalType {
	'1h'?: number
	'3h'?: number
}

interface sysType {
	sunrise: number
	sunset: number
}

export interface WeatherInfo {
	coord: coordType
	weather: weatherType
	main: mainType
	visibility: number
	wind: windType
	clouds: cloudType
	rain?: intervalType
	snow?: intervalType
	dt: number
	sys: sysType
	timezone: number
	name: string
}
