interface ITokenMetadata {
    tokenType: string
}

interface ITokenUri {
    gateway: string
    raw: string
}

interface IMedia {
    gateway: string
    thumbnail?: string
    raw: string
    format: string
    bytes: number
}

interface IContractMetadata {
    name: string
    totalSupply: string
    tokenType: string
    openSea: {
        lastIngestedAt: string
    }
}

interface IMetadata {
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

export interface INFT {
    contract: {
        address: string
    }
    id: {
        tokenId: string | undefined
        tokenMetadata?: ITokenMetadata
    }
    balance: string
    title: string
    description: string
    tokenUri: ITokenUri
    media: IMedia[]
    metadata: IMetadata | null
    timeLastUpdated: string
    contractMetadata: IContractMetadata
}

export interface INFTData {
    ownedNfts: INFT[]
    totalCount: number
    blockHash: string
}

export interface IMintedMetadata extends IMetadata {
    id: string | undefined
    quantity: string | undefined
}

export interface INFTDataWithId extends Omit<INFT, 'id'> {
    id: string | undefined
    quantity: string | undefined
}

export interface GetNfts {
    data: INFTData
}
