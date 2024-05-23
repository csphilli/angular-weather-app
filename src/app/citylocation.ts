interface localNames {
	[key: string]: string | undefined
}

export interface CityLocation {
  name: string;
	local_names?: localNames;
  lat: number;
  lon: number;
	country: string;
	state?: string;
}
