import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { selectWeatherDataForecast } from '../../store/reducers/weather/selectors'
import ForecastCard from '../ForecastCard/ForecastCard'

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

const TableWeather: FC = () => {
    const classes = useStylesTableWeather()
    const forecast = useTypedSelector(selectWeatherDataForecast)

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
