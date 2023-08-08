import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {
    useAccount,
    useContractWrite,
    usePrepareContractWrite,
    useContractRead,
    useWaitForTransaction,
} from 'wagmi'
import { fromHex, parseEther, parseUnits } from 'viem'
import debounce from 'lodash.debounce'

// Components
import AngledContentStripe from '@/components/shared/AngledContentStripe/AngledContentStripe'
import Button from '@/components/common/Button/Button'
import InputNft from '@/components/InputNft'
import Title from '@/components/common/Title/Title'
import Faucet from '@/components/Faucet/Faucet'

// ABI
import { contractABI as ABI } from '@/abi/contractABI'

const SectionMint = () => {
    const { address } = useAccount()
    const [inputValue, setInputValue] = useState('1')
    const [quantity, setQuantity] = useState(inputValue)
    const [hash, setHash] = useState<any>(undefined)

    // prevent excessive request sending
    const handleSearchDebounced = useRef(
        debounce((searchText: string) => setQuantity(searchText), 800)
    ).current

    useEffect(() => {
        handleSearchDebounced(inputValue)
    }, [inputValue, handleSearchDebounced])

    const {
        config,
        error,
        isFetching: isPrepareFetching,
        isLoading: isPrepareLoading,
    } = usePrepareContractWrite({
        enabled: true,
        address: process.env.NEXT_PUBLIC_CONTRACT as `0x${string}`,
        abi: ABI,
        functionName: 'claim',
        args: [
            address!,
            parseUnits(quantity, 0),
            '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
            parseEther('0'),
            {
                proof: [],
                quantityLimitPerWallet: parseUnits('3', 0),
                pricePerToken: parseUnits('0', 0),
                currency: '0x0000000000000000000000000000000000000000',
            },
            '0x',
        ],
        value: parseEther('0'),
    })

    const { write, data: cWData } = useContractWrite({
        ...config,
        onSuccess(data) {
            setHash(data?.hash)
        },
    })

    const {
        data: receiptData,
        isError,
        isLoading: isReceiptLoading,
    } = useWaitForTransaction({
        hash,
        onSettled() {
            setHash(undefined)
        },
    })

    console.log({ cWData })
    console.log({ receiptData })
    console.log(
        receiptData?.logs?.[0]?.topics?.[3]
            ? fromHex(receiptData?.logs?.[0]?.topics?.[3], 'number')
            : 'no data'
    )

    //read method on blockchain tokenURI

    return (
        <section className="pt-[10rem]">
            <Title title="Mint now">
                Lorem Ipsum is simply dummy text of the printy. Minted 21 of
                1000.
            </Title>

            <Faucet />

            <div className="mx-auto mb-[10rem] flex max-w-[640px] bg-linen">
                <div className="flex-column flex-row items-center p-10 text-center">
                    <InputNft
                        value={inputValue}
                        setValue={setInputValue}
                    />
                    <p className="mb-9 text-sm">
                        You’ve haven’t reached your minting limit.
                    </p>
                    <Button
                        type="button"
                        // disabled
                        disabled={!write}
                        onClick={() => write?.()}
                    >
                        MINT
                    </Button>
                    {(isPrepareFetching || isPrepareLoading) && (
                        <div>loading...</div>
                    )}
                    <div>{quantity}</div>
                </div>
                <div className="p-10 text-center">
                    <Image
                        width="100"
                        height="50"
                        src="/NFT-placeholder.png"
                        alt="cat silhouette with question sign inside"
                    />
                </div>
            </div>
            <AngledContentStripe color="blue">
                <div className="mx-auto flex max-w-[820px] px-5 py-4">
                    <p className="text-md max-w-auto basis shrink grow pt-2">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry&apos;s standard dummy text ever since the
                        1500s, when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only ...
                    </p>
                    <figure className="ml-4 h-full w-6 min-w-[120px] shrink-0 grow">
                        <Image
                            className="relative top-[-1.5rem]"
                            alt="paw"
                            width="120"
                            height="100"
                            src="/paw-light-blue.png"
                        />
                    </figure>
                </div>
            </AngledContentStripe>
        </section>
    )
}

export default SectionMint

// two tokens minted:

// {address
// :
// "0x2b2d8aa76e03fedfd22e9b5e333f9eae10488014"
// blockHash
// :
// "0x09e7926138968f21cc5425d1ed9a8a33c4a9994b5e3c8a8f4c5f4bb438a5062b"
// blockNumber
// :
// 38751829n
// data
// :
// "0x"
// logIndex
// :
// 69
// removed
// :
// false
// topics
// :
// (4) ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', '0x0000000000000000000000000000000000000000000000000000000000000000', '0x00000000000000000000000054c28209aa8893bb7b403d91b24ca48eef262788', '0x0000000000000000000000000000000000000000000000000000000000000012']
// transactionHash
// :
// "0xbca7d998901fa49bc4d5e1a9f7508f8dc182e161dc41629b9ac70b7544db6d78"
// transactionIndex
// :
// 5}
