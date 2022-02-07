interface IDayWeatherInfo {
    datetime: string
    datetimeEpoch: number
    tempmax: number
    tempmin: number
    temp: number
    feelslikemax: number
    feelslikemin: number
    feelslike: number
    dew: number
    humidity: number
    precip: number
    precipprob: number
    precipcover: string | null
    preciptype: string[] | null
    snow: number
    snowdepth: number
    windgust: number
    windspeed: number
    winddir: number
    pressure: number
    cloudcover: number
    visibility: number
    solarradiation: number
    solarenergy: number
    uvindex: number
    severerisk: number
    sunrise: string
    sunriseEpoch: number
    sunset: string
    sunsetEpoch: number
    moonphase: number
    conditions: string
    description: string
    icon: string
    stations: string[]
    source: string
}

interface ICurrentConditions {
    datetime: string
    datetimeEpoch: number
    temp: number
    feelslike: number
    humidity: number
    dew: number
    precip: number | null
    precipprob: number | null
    snow: number | null
    snowdepth: number
    preciptype: number | null
    windgust: number
    windspeed: number
    winddir: number
    pressure: number
    visibility: number
    cloudcover: number
    solarradiation: number | null
    solarenergy: number | null
    uvindex: number | null
    conditions: string
    icon: string
    stations: string[]
    sunrise: string
    sunriseEpoch: number
    sunset: string
    sunsetEpoch: number
    moonphase: number
}

export interface IWeatherDataResponse {
    queryCost: number
    latitude: number
    longitude: number
    resolvedAddress: string
    address: string
    timezone: string
    tzoffset: 3
    days: IDayWeatherInfo[]
    stations: {
        [key: string]: {
            distance: number
            latitude: number
            longitude: number
            useCount: number
            id: string
            name: string
            quality: number
            contribution: number
        }
    }
    currentConditions: ICurrentConditions
}

export interface IGeolocationResponse {
    name: string
    local_names: {
        [key: string]: string
    }
    lat: number
    lon: number
    country: string
}

export interface IWeatherDataFromServer extends IWeatherDataResponse {
    location: IGeolocationResponse[]
}
