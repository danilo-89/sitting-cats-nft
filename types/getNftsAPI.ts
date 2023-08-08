interface TokenMetadata {
    tokenType: string
}

interface TokenUri {
    gateway: string
    raw: string
}

interface Media {
    gateway: string
    thumbnail?: string
    raw: string
    format: string
    bytes: number
}

interface ContractMetadata {
    name: string
    totalSupply: string
    tokenType: string
    openSea: {
        lastIngestedAt: string
    }
}

interface NFT {
    contract: {
        address: string
    }
    id: {
        tokenId: string
        tokenMetadata: TokenMetadata
    }
    balance: string
    title: string
    description: string
    tokenUri: TokenUri
    media: Media[]
    metadata: {
        image?: string
        external_url: string
        background_color: string
        name: string
        description: string
        customImage: string
        attributes?: {
            value: string
            trait_type: string
        }[]
        customAnimationUrl: string
    }
    timeLastUpdated: string
    contractMetadata: ContractMetadata
}

interface NFTData {
    ownedNfts: NFT[]
    totalCount: number
    blockHash: string
}

export interface GetNfts {
    data: NFTData
}
