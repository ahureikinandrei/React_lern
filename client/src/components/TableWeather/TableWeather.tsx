import React, { FC } from 'react'
import Carousel from 'react-multi-carousel'
import ForecastCard from '../ForecastCard/ForecastCard'
import { IWeatherForecastData } from '../../store/reducers/weather/types'
import 'react-multi-carousel/lib/styles.css'

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 7,
        slidesToSlide: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 4,
        slidesToSlide: 2,
    },
    mobile: {
        breakpoint: { max: 500, min: 0 },
        items: 3,
        slidesToSlide: 1,
    },
}

interface ITableWeatherProps {
    forecast: IWeatherForecastData[]
    unitsDegrees: string
    timezone: string
}

const TableWeather: FC<ITableWeatherProps> = ({
    forecast,
    unitsDegrees,
    timezone,
}) => {
    return (
        <Carousel
            responsive={responsive}
            swipeable={false}
            draggable={false}
            infinite
        >
            {forecast
                ? forecast.map(({ datetimeEpoch, temp, humidity }) => {
                      return (
                          <ForecastCard
                              key={datetimeEpoch}
                              humidity={humidity}
                              temp={temp}
                              datetimeEpoch={datetimeEpoch}
                              unitsDegrees={unitsDegrees}
                              timezone={timezone}
                          />
                      )
                  })
                : null}
        </Carousel>
    )
}

export default TableWeather
