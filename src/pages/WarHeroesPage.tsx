
import React, { Suspense } from "react"
import { PageTransition } from "@/components/page-transition"

const WarHeroesGallery = React.lazy(
    () => import("@/components/war-heroes-gallery").then((mod) => ({ default: mod.WarHeroesGallery }))
)

export default function WarHeroesPage() {
    return (
        <PageTransition>
            <Suspense fallback={
                <div className="py-32 flex items-center justify-center bg-background">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
                </div>
            }>
                <WarHeroesGallery />
            </Suspense>
        </PageTransition>
    )
}
