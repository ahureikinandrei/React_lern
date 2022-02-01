export const transformLocation = (
    testValue: string | number
): string | number => {
    if (typeof testValue === 'string') {
        return testValue.substring(0, 5)
    }
    return testValue
}

export function undefinedToEmptyString(string = '') {
    return string
}
