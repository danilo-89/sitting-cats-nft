import axios from 'axios'

export const getNFTs = async (address: string | undefined) => {
    const res = await axios.get(
        `https://${'polygon-amoy'}.g.alchemy.com/nft/v2/${process.env.NEXT_PUBLIC_ALCHEMY}/getNFTs`,
        {
            params: {
                owner: address,
                contractAddresses: [process.env.NEXT_PUBLIC_CONTRACT],
            },
        }
    )
    return res
}

export const getNFTMetadata = async (tokenId?: number | undefined) => {
    if (tokenId) {
        const res = await axios.get(
            `https://${'polygon-amoy'}.g.alchemy.com/nft/v2/${process.env.NEXT_PUBLIC_ALCHEMY}/getNFTMetadata`,
            {
                params: {
                    tokenId: tokenId,
                    contractAddress: process.env.NEXT_PUBLIC_CONTRACT,
                    tokenType: 'ERC721',
                },
            }
        )
        return res
    }
    return undefined
}
