import React, { FC } from 'react'
import {
    LineChart,
    XAxis,
    CartesianGrid,
    Line,
    ResponsiveContainer,
    YAxis,
} from 'recharts'
import { IWeatherForecastData } from '../../store/reducers/weather/types'
import { transformForecastForGraph } from '../../utils/dataTransfrom'

interface ITableWeatherProps {
    forecast: IWeatherForecastData[]
}

const GraphWeather: FC<ITableWeatherProps> = ({ forecast }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={250}
                height={300}
                data={transformForecastForGraph(forecast)}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Line type="monotone" dataKey="temp" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default GraphWeather
