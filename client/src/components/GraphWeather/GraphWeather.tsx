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
}

const GraphWeather: FC<ITableWeatherProps> = ({
    forecast,
    timezone,
    favouritesForecastData,
    shownOnGraphLocations,
}) => {
    const { cartWrapper, setting, settingBtn } = useStyles()
    const [dataKey, setDataKey] = useState<'temp' | 'humidity'>('humidity')

    const onButtonDataKeyClick = (dataKey: 'temp' | 'humidity'): void => {
        setDataKey(dataKey)
    }

    return (
        <div>
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
                            left: -30,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
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
                    onClick={() => {
                        onButtonDataKeyClick('temp')
                    }}
                    className={settingBtn}
                >
                    Temp
                </Button>
                <Button
                    onClick={() => {
                        onButtonDataKeyClick('humidity')
                    }}
                    className={settingBtn}
                >
                    Wind
                </Button>
                <Button
                    onClick={() => {
                        onButtonDataKeyClick('humidity')
                    }}
                    className={settingBtn}
                >
                    Hum
                </Button>
            </ButtonGroup>
        </div>
    )
}

export default GraphWeather
