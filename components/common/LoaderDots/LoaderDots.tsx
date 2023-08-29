const LoaderDots = () => {
    return (
        <span
            className="inline-block"
            data-cy="loader-dots"
        >
            <span className="animate-[dot-1_1.2s_ease-out_infinite]">.</span>
            <span className="animate-[dot-2_1.2s_ease-out_infinite]">.</span>
            <span className="animate-[dot-3_1.2s_ease-out_infinite]">.</span>
        </span>
    )
}

export default LoaderDots
