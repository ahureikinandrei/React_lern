function generateIdCardFunc(): () => string {
    let ui = 0

    return (): string => {
        ui += 1
        return `card_id_${ui}`
    }
}

export const generateIdCard = generateIdCardFunc()
