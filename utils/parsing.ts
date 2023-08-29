/**
 * Shortens a hexadecimal string by replacing the middle part with ellipsis.
 *
 * @param {string | undefined} hexString - The input hexadecimal string to be shortened.
 * @returns {string | undefined} A shortened version of the input string with ellipsis in the middle,
 * or undefined if the input string is falsy.
 */
const shortenHexString = (hexString: string | undefined) => {
    if (!hexString) return undefined

    const prefixLength = 4
    const suffixLength = 4

    const firstPart = hexString.slice(0, prefixLength)
    const lastPart = hexString.slice(-suffixLength)

    return `${firstPart}...${lastPart}`
}

/**
 * Converts an IPFS URL to its corresponding HTTPS URL.
 *
 * @param {string} ipfsString - The input IPFS URL to be converted to HTTPS.
 * @returns {string} The converted HTTPS URL.
 */
const ipfsToHttps = (ipfsString: string): string => {
    return ipfsString.replace('ipfs://', 'https://ipfs.io/ipfs/')
}

export { shortenHexString, ipfsToHttps }
