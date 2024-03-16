import { fromHex, isHex } from 'viem'

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

/**
 * Retrieves an ID from a given hash value.
 *
 * @param {string | undefined} hashId - The hash value to extract the ID from.
 * @returns {string | undefined} The extracted ID, or the original hash value if it's not in the expected format.
 */
const getIdFromHash = (hashId: undefined | string): string | undefined => {
    return isHex(hashId)
        ? fromHex(hashId as '0x${string}', 'number').toString()
        : hashId
}

/**
 * Truncates the decimal places of a numeric string while preserving "0".
 *
 * @param {string | undefined} input - The numeric string to truncate or undefined.
 * @param {number} fixed - The number of decimal places to preserve.
 * @returns {string | undefined} The truncated numeric string or undefined if input is invalid.
 */
const limitDecimals = (
    input: string | undefined,
    fixed: number = 0
): string | undefined => {
    if (input === undefined || input === '0') return input

    const num = parseFloat(input)

    if (!isNaN(num)) {
        const multiplier = Math.pow(10, fixed)
        return (Math.floor(num * multiplier) / multiplier).toString()
    }

    return undefined
}

export { shortenHexString, ipfsToHttps, getIdFromHash, limitDecimals }
