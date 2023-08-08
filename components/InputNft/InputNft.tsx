'use client'
import { useState } from 'react'

// Components
import Button from '@/components/common/Button'

const InputNft = ({ value, setValue }: any) => {
    return (
        <div className="mx-auto mb-4 flex max-w-[16rem] border-2 border-x-wenge bg-white p-2">
            <Button
                variation="secondary"
                type="button"
                onClick={() =>
                    setValue((curr: string) => (+curr - 1).toString())
                }
            >
                -
            </Button>
            <input
                className="w-[80%] text-center"
                type="text"
                inputMode="numeric"
                pattern="[1-3]"
                value={value}
                onChange={(e) => {
                    if (!e.target.validity.patternMismatch) {
                        setValue(e.target.value)
                    }
                }}
            />
            <Button
                variation="secondary"
                type="button"
                onClick={() =>
                    setValue((curr: string) => (+curr + 1).toString())
                }
            >
                +
            </Button>
        </div>
    )
}

export default InputNft
