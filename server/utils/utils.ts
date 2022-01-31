export const transformLocation = testValue => {
    if (typeof testValue === 'string') {
        return testValue.substring(0, 5)
    }
    return testValue
}
