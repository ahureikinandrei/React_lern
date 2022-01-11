import { useEffect, useState } from 'react'
import WeatherService from '../api/WeatherService'

export default function (): any {
    const [data] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error] = useState('')

    useEffect(() => {
        setLoading(true)
        WeatherService.getCurrentWeather()
    }, [])

    return [data, loading, error]
}
