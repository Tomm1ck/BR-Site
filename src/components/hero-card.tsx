"use client"


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { memo } from "react"

interface HeroCardProps {
  name: string
  years: string
  title: string
  description: string
  image: string
  index?: number
  onClick?: () => void
}

export const HeroCard = memo(function HeroCard({
  name,
  years,
  title,
  description,
  image,
  index = 0,
  onClick,
}: HeroCardProps) {
  return (
    <Card
      className="group overflow-hidden hover:shadow-2xl hover:shadow-primary/30 transition-all duration-700 bg-card relative animate-bounce-in cursor-pointer hover:scale-[1.03] hover:-translate-y-2 will-change-transform"
      style={{
        animationDelay: `${index * 100}ms`,
        transformStyle: "preserve-3d",
      }}
      onClick={onClick}
    >
      <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary/30 via-accent/20 to-transparent rounded-bl-full transition-all duration-700 group-hover:w-32 group-hover:h-32 sm:group-hover:w-40 sm:group-hover:h-40 group-hover:rotate-[25deg] opacity-70 group-hover:opacity-100" />

      <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-tr from-accent/20 to-transparent rounded-tr-full transition-all duration-700 group-hover:w-24 group-hover:h-24 sm:group-hover:w-32 sm:group-hover:h-32 group-hover:rotate-[-20deg] opacity-50" />

      <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden bg-gradient-to-br from-muted via-muted/80 to-muted/60">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="absolute inset-0 h-full w-full object-contain transition-all duration-1000 group-hover:scale-125 group-hover:brightness-110 group-hover:rotate-3 group-hover:contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />

        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-gradient-to-r from-primary via-primary/90 to-accent backdrop-blur-sm text-primary-foreground px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-primary/70 group-hover:shadow-2xl animate-glow-pulse">
          {years}
        </div>
      </div>

      <CardHeader className="pb-3 pt-4 sm:pt-6 relative z-10">
        <CardTitle className="text-xl sm:text-2xl md:text-3xl text-balance text-foreground group-hover:text-primary transition-all duration-500 will-change-auto group-hover:translate-x-2 drop-shadow-sm">
          {name}
        </CardTitle>
        <CardDescription className="text-sm sm:text-base font-semibold text-accent mt-2 flex items-center gap-2 group-hover:text-primary transition-colors duration-500">
          <span className="inline-block w-6 sm:w-8 h-0.5 bg-gradient-to-r from-accent via-primary to-primary/50 transition-all duration-700 group-hover:w-14 sm:group-hover:w-20 shadow-sm group-hover:shadow-primary/50" />
          {title}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-4 sm:pb-6 relative z-10">
        <p className="text-sm sm:text-base text-justify text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-500">
          {description}
        </p>

        <div className="mt-4 sm:mt-6 flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-all duration-500">
          <div className="h-0.5 flex-1 bg-gradient-to-r from-primary via-accent to-transparent transition-all duration-700 group-hover:from-accent group-hover:via-primary" />
          <div className="w-2 h-2 rounded-full bg-gradient-to-br from-primary to-accent transition-all duration-500 group-hover:scale-[2] group-hover:shadow-lg group-hover:shadow-primary/50 animate-pulse" />
        </div>
      </CardContent>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
    </Card>
  )
})
