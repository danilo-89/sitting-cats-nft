'use client'

import { useCallback, useEffect, useState } from 'react'

const useScrollIndicator = (heightToCheck?: number) => {
    const [isHeightChecked, setIsHeightChecked] = useState(false)
    const [isOverHeight, setIsOverHeight] = useState(false)

    const onScroll = useCallback(() => {
        let winScroll =
            (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop

        // Check if current scroll position is over height we are checking
        if (heightToCheck) {
            setIsOverHeight(winScroll > heightToCheck)
            setIsHeightChecked(true)
        }
    }, [heightToCheck])

    useEffect(() => {
        const debouncedHandleResize = onScroll

        window.addEventListener('scroll', debouncedHandleResize, true)
        // window.addEventListener('touchmove', debouncedHandleResize, false);
        onScroll()

        return () => {
            window.removeEventListener('scroll', debouncedHandleResize, true)
            // window.removeEventListener('touchmove', debouncedHandleResize);
        }
    }, [onScroll])

    return { isOverHeight, isHeightChecked }
}

export default useScrollIndicator
