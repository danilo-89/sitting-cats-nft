const shortenHexString = (hexString: string | undefined) => {
    if (!hexString) return undefined

    const prefixLength = 4
    const suffixLength = 4

    const firstPart = hexString.slice(0, prefixLength)
    const lastPart = hexString.slice(-suffixLength)

    return `${firstPart}...${lastPart}`
}

export { shortenHexString }
