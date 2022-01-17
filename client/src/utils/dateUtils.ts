export function unixToDay(unixTimestamp: number): string {
    return new Date(unixTimestamp * 1000).toLocaleString('en-US', {
        weekday: 'long',
    })
}

export function unixToHour(unixTimestamp: number): string {
    return new Date(unixTimestamp * 1000).toLocaleString('en-US', {
        hour: 'numeric',
    })
}
