'use client'

import Hero from '@/components/sections/SectionHero'
import SectionMint from '@/components/sections/SectionMint'
import SectionRoadmap from '@/components/sections/SectionRoadmap/SectionRoadmap'
import useScrollIndicator from './hooks/useScrollIndindicator'
import Nav from '@/components/Nav'

export default function Home() {
    return (
        <main className="max-w-full">
            <Nav />

            <Hero />
            <SectionMint />
            <SectionRoadmap />
        </main>
    )
}
