import Button from '../common/Button/Button'

const faucets = process.env.NEXT_PUBLIC_FAUCET?.split(',')

const Faucet = () => {
    return (
        <div className="mx-auto mb-5 max-w-[640px] bg-silver p-5">
            <span className="font-bold">You need gas!</span> Seems like you
            don&apos;t have enough balance, go get some:
            {faucets?.map((href: string) => (
                <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Faucet
                </a>
            ))}
            <Button>Recheck Balance</Button>
        </div>
    )
}

export default Faucet
