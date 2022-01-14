import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core'
import ForecastCard from '../ForecastCard/ForecastCard'
import { IWeatherForecastData } from '../../store/reducers/weather/types'

const useStylesTableWeather = makeStyles(() =>
    createStyles({
        table: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
        },
    })
)

interface ITableWeatherProps {
    forecast: IWeatherForecastData[]
}

const TableWeather: FC<ITableWeatherProps> = ({ forecast }) => {
    const classes = useStylesTableWeather()

    return (
        <div className={classes.table}>
            {forecast
                ? forecast.map(({ datetimeEpoch, temp, humidity }) => {
                      return (
                          <ForecastCard
                              key={datetimeEpoch}
                              humidity={humidity}
                              temp={temp}
                              datetimeEpoch={datetimeEpoch}
                          />
                      )
                  })
                : null}
        </div>
    )
}

export default TableWeather
