import { type SVGProps } from 'react'

const LoaderSquare = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height="auto"
        viewBox="0 0 100 100"
        {...props}
        data-cy="loader-square"
    >
        <path
            fill="none"
            stroke="#dcdcdc"
            strokeWidth={20}
            d="M20 20h60v60H20z"
        />
        <path
            fill="none"
            stroke="#61C1CE"
            strokeWidth={20}
            d="M20 20h60v60H20z"
        >
            <animate
                attributeName="stroke-dasharray"
                dur="1s"
                keyTimes="0;0.5;1"
                repeatCount="indefinite"
                values="24 216;120 120;24 216"
            />
            <animate
                attributeName="stroke-dashoffset"
                dur="1s"
                keyTimes="0;0.5;1"
                repeatCount="indefinite"
                values="0;-120;-240"
            />
        </path>
    </svg>
)

export default LoaderSquare
