import moment from 'moment-timezone'

export function unixToDay(
    unixTimestamp: number,
    timezone = 'Europe/London',
    format = 'dddd'
): string {
    return moment(unixTimestamp * 1000)
        .tz(timezone)
        .format(format)
}
