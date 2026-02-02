"use client"

import { HeroCard } from "./hero-card"
import { useState, useMemo } from "react"
import { HeroDetailModal } from "./hero-detail-modal"
import { useData } from "@/context/DataProvider"

function getBirthYear(years: string): number {
  const match = years.match(/\d{3,4}/)
  return match ? Number.parseInt(match[0]) : 0
}

export function WarHeroesGallery() {
  const { warHeroes } = useData()
  const [selectedHero, setSelectedHero] = useState<(typeof warHeroes)[0] | null>(null)

  const sortedWarHeroes = useMemo(() => {
    return [...warHeroes].sort((a, b) => getBirthYear(a.years) - getBirthYear(b.years))
  }, [warHeroes])

  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none animate-gradient-shift" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none opacity-60" />

      <div
        className="absolute top-40 right-16 w-36 h-36 bg-primary/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-20 left-24 w-44 h-44 bg-accent/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "3s" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-slide-up-fade">
          <h2 className="text-4xl md:text-6xl font-bold text-balance mb-6 text-foreground drop-shadow-sm">
            Героі Вялікай Айчыннай вайны
          </h2>
          <p className="text-xl text-pretty text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Абаронцы Беларускай зямлі, якія аддалі жыццё за свабоду ў 1941-1945 гадах
          </p>
          <div
            className="mt-8 flex items-center justify-center gap-4 animate-zoom-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-primary animate-shimmer" />
            <div className="h-2 w-2 rounded-full bg-primary animate-heartbeat" />
            <div
              className="h-px w-16 bg-gradient-to-l from-transparent via-accent to-accent animate-shimmer"
              style={{ animationDelay: "0.5s" }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {sortedWarHeroes.map((hero, index) => (
            <HeroCard key={hero.id} {...hero} index={index} onClick={() => setSelectedHero(hero)} />
          ))}
        </div>
      </div>

      {selectedHero && (
        <HeroDetailModal
          {...selectedHero}
          open={!!selectedHero}
          onOpenChange={(open) => !open && setSelectedHero(null)}
        />
      )}
    </section>
  )
}
