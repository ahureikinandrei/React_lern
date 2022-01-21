import React, { FC, useEffect, useState } from 'react'
import moment from 'moment'
import 'moment-timezone'

interface IClockProps {
    timezone: string | undefined
}

const Clock: FC<IClockProps> = ({ timezone }) => {
    const [hourState, setHourState] = useState('')

    useEffect(() => {
        if (timezone) {
            setHourState(moment().tz(timezone).format('dddd | h:mmA'))
        }
        const intervalId = setInterval(() => {
            if (timezone) {
                setHourState(moment().tz(timezone).format('dddd | h:mmA'))
            }
        }, 60000)
        return () => {
            clearInterval(intervalId)
        }
    }, [timezone])

    return <span>{hourState}</span>
}

export default Clock