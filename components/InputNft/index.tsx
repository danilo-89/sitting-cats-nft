'use client'
import { useState } from 'react'
import Button from '@/components/Button'

const InputNft = () => {
    const [value, setValue] = useState('1')

    return (
        <div className="mx-auto flex max-w-[16rem] border-2 border-x-wenge bg-white p-2">
            <Button
                variation="secondary"
                shadow={false}
                type="button"
                onClick={() => setValue((curr) => (+curr - 1).toString())}
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
                shadow={false}
                type="button"
                onClick={() => setValue((curr) => (+curr + 1).toString())}
            >
                +
            </Button>
        </div>
    )
}

export default InputNft
