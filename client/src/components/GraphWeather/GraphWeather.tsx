import React, { FC } from 'react'
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
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={transformForecastForGraph(
                    forecast,
                    timezone,
                    favouritesForecastData
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
                <Line type="monotone" dataKey="Selected" stroke="#8884d8" />
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
    )
}

export default GraphWeather
