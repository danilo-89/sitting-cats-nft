'use client'

import { useCallback, useEffect, useState } from 'react'

const useScrollIndicator = (heightToCheck?: number) => {
    const [scrollPosition, setScrollPosition] = useState(0)
    const [isOverHeight, setIsOverHeight] = useState(false)

    const onScroll = useCallback(() => {
        // This will calculate how many pixels the page is vertically
        // const homepageScrollWrapper = document.querySelector(
        //     '.layout-wrapper'
        // ) as any

        // const quote = document.querySelector('.quote') as any

        let winScroll =
            (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop

        // This is responsible for subtracticing the total height of the page - where the users page is scrolled to
        const height = document.body.scrollHeight

        // This will calculate the final total of the percentage of how much the user has scrolled.
        const scrolled = (winScroll / height) * 100

        // const homepageScrolled =
        //     homepageScrollWrapper.scrollHeight -
        //     (homepageScrollWrapper.scrollHeight -
        //         homepageScrollWrapper.scrollTop)

        // Check if current scroll position is over height we are checking
        if (heightToCheck) {
            setIsOverHeight(winScroll > heightToCheck)
        }

        // if (quote) {
        //     if (homepageScrolled >= quote.getBoundingClientRect().bottom) {
        //         setIsOverHeight(true)
        //     } else {
        //         setIsOverHeight(false)
        //     }
        // }

        // setScrollPosition(homepageScrolled ? homepageScrolled : scrolled)
        setScrollPosition(scrolled)
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

    return { scrollPosition, isOverHeight }
}

export default useScrollIndicator
