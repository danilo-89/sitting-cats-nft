'use client'
import { useState } from 'react'

// Components
import Button from '@/components/common/Button'
import { useContractContext } from '@/context/ContractContext'

const InputNft = ({ value, setValue, mintableQuantity, isDisabled }: any) => {
    const { limitPerWallet } = useContractContext()

    return (
        <div className="mx-auto mb-4 flex max-w-[16rem] border-2 border-x-wenge bg-white p-2">
            <Button
                variation="secondary"
                type="button"
                onClick={() =>
                    setValue((curr: string) => (+curr - 1).toString())
                }
                disabled={!mintableQuantity || value <= 1 || isDisabled}
            >
                -
            </Button>
            <input
                className="w-[80%] text-center placeholder:text-sm disabled:text-silver"
                type="text"
                inputMode="numeric"
                pattern={`[1-${mintableQuantity}]`}
                value={value}
                onChange={(e) => {
                    if (!e.target.validity.patternMismatch) {
                        setValue(e.target.value)
                    }
                }}
                disabled={!mintableQuantity || isDisabled}
                placeholder="quantity"
            />
            <Button
                variation="secondary"
                type="button"
                onClick={() =>
                    setValue((curr: string) => (+curr + 1).toString())
                }
                disabled={
                    !mintableQuantity || value == mintableQuantity || isDisabled
                }
            >
                +
            </Button>
        </div>
    )
}

export default InputNft