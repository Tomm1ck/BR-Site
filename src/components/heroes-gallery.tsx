"use client"

import { HeroCard } from "./hero-card"
import { useState, useMemo } from "react"
import { HeroDetailModal } from "./hero-detail-modal"
import { Button } from "@/components/ui/button"
import { useData } from "@/context/DataProvider"

function getBirthYear(years: string): number {
  const match = years.match(/\d{3,4}/)
  return match ? Number.parseInt(match[0]) : 0
}

export function HeroesGallery() {
  const { heroes } = useData()
  const [selectedPeriod, setSelectedPeriod] = useState<"all" | "early" | "modern">("all")
  const [selectedHero, setSelectedHero] = useState<(typeof heroes)[0] | null>(null)

  const sortedHeroes = useMemo(() => {
    return [...heroes].sort((a, b) => getBirthYear(a.years) - getBirthYear(b.years))
  }, [heroes])

  const filteredHeroes = useMemo(() => {
    return selectedPeriod === "all" ? sortedHeroes : sortedHeroes.filter((hero) => hero.period === selectedPeriod)
  }, [selectedPeriod, sortedHeroes])

  return (
    <section id="heroes" className="py-16 sm:py-20 md:py-28 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none animate-gradient-shift" />
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-primary/5 pointer-events-none opacity-50" />

      <div
        className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="absolute bottom-32 right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-primary/5 rounded-full blur-2xl animate-wave" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 sm:mb-16 animate-slide-up-fade">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-balance mb-4 sm:mb-6 text-foreground drop-shadow-sm">
            Галерэя герояў
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-pretty text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Асобы, якія ўвасобілі мужнасць, мудрасць і адданасць Беларускай зямлі
          </p>
          <div
            className="mt-6 sm:mt-8 flex items-center justify-center gap-4 animate-zoom-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-primary to-primary animate-shimmer" />
            <div className="h-2 w-2 rounded-full bg-primary animate-heartbeat" />
            <div
              className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent via-accent to-accent animate-shimmer"
              style={{ animationDelay: "0.5s" }}
            />
          </div>

          <div
            className="mt-8 sm:mt-10 flex items-center justify-center gap-3 sm:gap-4 flex-wrap px-4 animate-bounce-slide"
            style={{ animationDelay: "0.5s" }}
          >
            <Button
              variant={selectedPeriod === "all" ? "default" : "outline"}
              onClick={() => setSelectedPeriod("all")}
              className="text-sm sm:text-base transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-primary/30 active:scale-95"
            >
              Усе перыяды
            </Button>
            <Button
              variant={selectedPeriod === "early" ? "default" : "outline"}
              onClick={() => setSelectedPeriod("early")}
              className="text-sm sm:text-base transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-primary/30 active:scale-95"
            >
              Ранні перыяд
            </Button>
            <Button
              variant={selectedPeriod === "modern" ? "default" : "outline"}
              onClick={() => setSelectedPeriod("modern")}
              className="text-sm sm:text-base transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-primary/30 active:scale-95"
            >
              Сучасны перыяд
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mt-12 sm:mt-16">
          {filteredHeroes.map((hero, index) => (
            <HeroCard key={hero.id} {...hero} index={index} onClick={() => setSelectedHero(hero)} />
          ))}
        </div>

        {selectedHero && (
          <HeroDetailModal
            {...selectedHero}
            open={!!selectedHero}
            onOpenChange={(open) => !open && setSelectedHero(null)}
          />
        )}
      </div>
    </section>
  )
}
