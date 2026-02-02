import { memo } from "react"

export const HeroSection = memo(function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 md:py-32 lg:py-40">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-accent/5 to-background animate-gradient-shift"></div>

      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-5 sm:left-10 w-16 h-16 sm:w-32 sm:h-32 border-2 sm:border-4 border-primary rotate-45 animate-float"></div>
        <div
          className="absolute top-20 right-10 sm:right-20 w-12 h-12 sm:w-24 sm:h-24 border-2 sm:border-4 border-accent rotate-12 animate-float"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-14 h-14 sm:w-28 sm:h-28 border-2 sm:border-4 border-primary -rotate-12 animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-10 right-1/3 w-10 h-10 sm:w-20 sm:h-20 border-2 sm:border-4 border-accent rotate-45 animate-float"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-10 w-8 h-8 sm:w-16 sm:h-16 rounded-full border-2 border-primary animate-pulse-glow"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-6 h-6 sm:w-12 sm:h-12 rounded-full border-2 border-accent animate-pulse-glow"
          style={{ animationDelay: "2.5s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-block mb-6 sm:mb-8 animate-bounce-in">
            <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-primary via-accent to-primary mx-auto mb-3 sm:mb-4 animate-shimmer"></div>
            <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
              <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-primary animate-pulse"></div>
              <div
                className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-accent animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-primary animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-balance mb-6 sm:mb-8 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-scale-in animate-gradient-shift">
            Крэпасць духу
          </h1>

          <div
            className="h-1 w-32 sm:w-48 bg-gradient-to-r from-primary via-accent to-primary mx-auto mb-4 sm:mb-6 animate-fade-in animate-shimmer"
            style={{ animationDelay: "0.3s" }}
          ></div>

          <p
            className="text-xl sm:text-2xl md:text-3xl text-balance font-semibold text-primary mb-4 sm:mb-6 animate-slide-in-left"
            style={{ animationDelay: "0.4s" }}
          >
            Абаронцы Беларускай зямлі
          </p>

          <p
            className="text-base sm:text-lg md:text-xl text-pretty text-foreground max-w-3xl mx-auto leading-relaxed border-l-2 sm:border-l-4 border-accent pl-4 sm:pl-6 italic animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            Помнік тым, хто абараняў нашу зямлю, хто ўвасобіў мужнасць і адданасць Радзіме. Ад святых асветнікаў да
            герояў вайны — іх подвігі жывуць у нашых сэрцах.
          </p>

          <div className="mt-8 sm:mt-12 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
              <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-primary animate-pulse"></div>
              <div
                className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-accent animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-primary animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
            <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-primary via-accent to-primary mx-auto animate-shimmer"></div>
          </div>
        </div>
      </div>
    </section>
  )
})
