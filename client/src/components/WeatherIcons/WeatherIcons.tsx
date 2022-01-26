import React, { ReactElement } from 'react'
import { ReactComponent as Wind } from '../../assets/icons/weather/wind.svg'
import { ReactComponent as Snow } from '../../assets/icons/weather/snow.svg'
import { ReactComponent as Rain } from '../../assets/icons/weather/rain.svg'
import { ReactComponent as Fog } from '../../assets/icons/weather/fog.svg'
import { ReactComponent as Cloudy } from '../../assets/icons/weather/cloudy.svg'
import { ReactComponent as PartlyCloudyDay } from '../../assets/icons/weather/partly-cloudy-day.svg'
import { ReactComponent as PartlyCloudyNight } from '../../assets/icons/weather/partly-cloudy-night.svg'
import { ReactComponent as ClearDay } from '../../assets/icons/weather/clear-day.svg'
import { ReactComponent as ClearNight } from '../../assets/icons/weather/clear-night.svg'

export enum WeatherIconsTitle {
    SNOW = 'snow',
    RAIN = 'rain',
    FOG = 'fog',
    WIND = 'wind',
    CLOUDY = 'cloudy',
    PARTLY_CLOUDY_DAY = 'partly-cloudy-day',
    PARTLY_CLOUDY_NIGHT = 'partly-cloudy-night',
    CLOUDY_DAY = 'clear-day',
    CLOUDY_NIGHT = 'clear-night',
}

export const WeatherIconList: { [key: string]: ReactElement } = {
    [WeatherIconsTitle.SNOW]: <Snow />,
    [WeatherIconsTitle.RAIN]: <Rain />,
    [WeatherIconsTitle.FOG]: <Fog />,
    [WeatherIconsTitle.WIND]: <Wind />,
    [WeatherIconsTitle.CLOUDY]: <Cloudy />,
    [WeatherIconsTitle.PARTLY_CLOUDY_DAY]: <PartlyCloudyDay />,
    [WeatherIconsTitle.PARTLY_CLOUDY_NIGHT]: <PartlyCloudyNight />,
    [WeatherIconsTitle.CLOUDY_DAY]: <ClearDay />,
    [WeatherIconsTitle.CLOUDY_NIGHT]: <ClearNight />,
}
