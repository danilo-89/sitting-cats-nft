import { expect, test, describe, it } from 'vitest'
import {
    shortenHexString,
    ipfsToHttps,
    getIdFromHash,
    limitDecimals,
} from './parsing'

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

// getIdFromHash
test('convert hash to id number string', () => {
    expect(
        getIdFromHash(
            '0x0000000000000000000000000000000000000000000000000000000000000001'
        )
    ).toBe('1')
})

test('return string if hashId is not in hex', () => {
    expect(getIdFromHash('1')).toBe('1')
})

// limitDecimals
describe('limit decimals', () => {
    const testCases = [
        { a: undefined, expected: undefined },
        { a: '0', expected: '0' },
        { a: '1', expected: '1' },
        { a: '9.99999', expected: '9' },
        { a: '9.99999', b: 4, expected: '9.9999' },
        { a: '100.99999', b: 4, expected: '100.9999' },
        {
            a: '100000000000.99999',
            b: 4,
            expected: '100000000000.9999',
        },
    ]

    it.each(testCases)(
        'limitDecimals($a, $b) -> $expected',
        ({ a, b, expected }) => {
            expect(limitDecimals(a, b)).toBe(expected)
        }
    )
})
