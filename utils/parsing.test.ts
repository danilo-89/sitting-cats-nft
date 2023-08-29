import { expect, test } from 'vitest'
import { shortenHexString, ipfsToHttps } from './parsing'

// shortenHexString
test('shorten a hexadecimal string', () => {
    expect(shortenHexString('0x54C28209aA8793bB7b493D91b24Ca48eEf262788')).toBe(
        '0x54...2788'
    )
})

test('return undefined if the input string is falsy', () => {
    expect(shortenHexString('')).toBe(undefined)
})

// ipfsToHttps
test('convert an IPFS URL to its corresponding HTTPS URL', () => {
    expect(
        ipfsToHttps('ipfs://QmX5jf1zZf5EGFb8Vw6NS26Wzge6z1m1HcGP9c9bRvz5qR')
    ).toBe(
        'https://ipfs.io/ipfs/QmX5jf1zZf5EGFb8Vw6NS26Wzge6z1m1HcGP9c9bRvz5qR'
    )
})
