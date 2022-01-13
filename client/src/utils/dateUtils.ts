export function unixToDay(unixTimestamp: number, isShortHand = false): string {
    const format = isShortHand ? 'short' : 'long'
    return new Date(unixTimestamp * 1000).toLocaleString('en-US', {
        weekday: format,
    })
}

export function unixToHour(unixTimestamp: number): string {
    return new Date(unixTimestamp * 1000).toLocaleString('en-US', {
        hour: 'numeric',
    })
}
