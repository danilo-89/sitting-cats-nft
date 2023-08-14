import { useState, useEffect } from 'react'

const useIsMounted = () => {
    const [isMounted, setisMounted] = useState(false)

    useEffect(() => {
        setisMounted(true)
        return () => setisMounted(false)
    }, [])

    return isMounted
}

export default useIsMounted
