
import { HeroSection } from "@/components/hero-section"
import React, { Suspense } from "react"
import { PageTransition } from "@/components/page-transition"

const HeroesGallery = React.lazy(
    () => import("@/components/heroes-gallery").then((mod) => ({ default: mod.HeroesGallery }))
)

const InteractiveMap = React.lazy(
    () => import("@/components/interactive-map").then((mod) => ({ default: mod.InteractiveMap }))
)

export default function HomePage() {
    return (
        <PageTransition>
            <HeroSection />
            <Suspense fallback={
                <div className="py-32 flex items-center justify-center bg-background">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
                </div>
            }>
                <HeroesGallery />
            </Suspense>
            <Suspense fallback={
                <div className="py-32 flex items-center justify-center bg-gradient-to-b from-background to-primary/5">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent" />
                </div>
            }>
                <InteractiveMap />
            </Suspense>
        </PageTransition>
    )
}
