import React, { FC, useState } from 'react'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import {
    LineChart,
    XAxis,
    CartesianGrid,
    Line,
    ResponsiveContainer,
    YAxis,
    Legend,
} from 'recharts'
import { IWeatherForecastData } from '../../store/reducers/weather/types'
import { transformForecastForGraph } from '../../utils/dataTransfrom'
import { IGraphLineData } from '../../store/reducers/settings/types'
import { useStyles } from './styles'

interface ITableWeatherProps {
    forecast: IWeatherForecastData[]
    timezone: string
    favouritesForecastData: Array<IWeatherForecastData[]>
    shownOnGraphLocations: IGraphLineData[]
    unitsDegrees: string
}

export type graphDataKeysType = 'temp' | 'humidity' | 'windspeed'

const GraphWeather: FC<ITableWeatherProps> = ({
    forecast,
    timezone,
    favouritesForecastData,
    shownOnGraphLocations,
    unitsDegrees,
}) => {
    const { cartWrapper, setting, settingBtn } = useStyles()
    const [dataKey, setDataKey] = useState<graphDataKeysType>('temp')

    const onButtonDataKeyClick = (dataKey: graphDataKeysType): void => {
        setDataKey(dataKey)
    }

    const labelYAxis = (): string => {
        if (dataKey === 'temp') {
            return unitsDegrees
        }
        if (dataKey === 'humidity') {
            return '%'
        }
        return 'km/h'
    }

    return (
        <>
            <div className={cartWrapper}>
                <ResponsiveContainer>
                    <LineChart
                        data={transformForecastForGraph(
                            forecast,
                            timezone,
                            favouritesForecastData,
                            dataKey
                        )}
                        margin={{
                            top: 5,
                            right: 5,
                            left: -20,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis
                            label={{
                                value: labelYAxis(),
                                angle: -90,
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="Selected"
                            stroke="#8884d8"
                        />
                        {shownOnGraphLocations.map(({ location, color }) => {
                            return (
                                <Line
                                    key={location}
                                    type="monotone"
                                    dataKey={location}
                                    stroke={color}
                                />
                            )
                        })}
                        <Legend />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <ButtonGroup
                className={setting}
                size="small"
                aria-label="small outlined button group"
            >
                <Button
                    variant={dataKey === 'temp' ? 'contained' : 'outlined'}
                    onClick={() => {
                        onButtonDataKeyClick('temp')
                    }}
                    className={settingBtn}
                >
                    Temp
                </Button>
                <Button
                    variant={dataKey === 'windspeed' ? 'contained' : 'outlined'}
                    onClick={() => {
                        onButtonDataKeyClick('windspeed')
                    }}
                    className={settingBtn}
                >
                    Wind
                </Button>
                <Button
                    variant={dataKey === 'humidity' ? 'contained' : 'outlined'}
                    onClick={() => {
                        onButtonDataKeyClick('humidity')
                    }}
                    className={settingBtn}
                >
                    Hum
                </Button>
            </ButtonGroup>
        </>
    )
}

export default GraphWeather
