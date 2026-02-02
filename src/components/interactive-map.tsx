"use client"

import { useState, useCallback } from "react"
import { ExternalLink, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlaceType } from "@/types"
import { useData } from "@/context/DataProvider"

export function InteractiveMap() {
  const { places } = useData()
  const [hoveredPlace, setHoveredPlace] = useState<string | null>(null)
  const [selectedPlace, setSelectedPlace] = useState<(typeof places)[0] | null>(null)

  const getMarkerColor = useCallback((type: PlaceType, isHovered: boolean) => {
    const colors: Record<PlaceType, string> = {
      castle: isHovered ? "#3b82f6" : "#60a5fa",
      memorial: isHovered ? "#dc2626" : "#ef4444",
      religious: isHovered ? "#9333ea" : "#a855f7",
      historical: isHovered ? "#059669" : "#10b981",
    }
    return colors[type]
  }, [])

  return (
    <section id="map" className="py-16 sm:py-20 md:py-28 lg:py-32 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-balance mb-3 sm:mb-4 text-foreground">
            Месцы славы
          </h2>
          <p className="text-base sm:text-lg text-pretty text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
            Інтэрактыўная карта гістарычных месцаў, якія захавалі памяць аб подвігах абаронцаў Беларусі
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          <div className="lg:col-span-2 animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
            <Card className="border-border bg-card p-3 sm:p-4 md:p-6">
              <svg
                viewBox="0 0 1626 1451"
                className="w-full h-auto"
                xmlns="http://www.w3.org/2000/svg"
                style={{ maxHeight: "600px" }}
              >
                <image
                  href="https://upload.wikimedia.org/wikipedia/commons/1/12/Belarus_adm_location_map.svg"
                  x="0"
                  y="0"
                  width="1626"
                  height="1451"
                  preserveAspectRatio="xMidYMid meet"
                  opacity="0.9"
                />

                {places.map((place) => (
                  <g key={`marker-${place.id}`}>
                    {hoveredPlace === place.id && (
                      <circle
                        cx={place.x}
                        cy={place.y}
                        r="60"
                        fill={getMarkerColor(place.type, true)}
                        opacity="0.3"
                        className="animate-pulse"
                      />
                    )}

                    <circle
                      cx={place.x}
                      cy={place.y}
                      r="25"
                      fill={getMarkerColor(place.type, hoveredPlace === place.id)}
                      stroke="#ffffff"
                      strokeWidth="4"
                      className="transition-all duration-500 drop-shadow-lg"
                      style={{
                        transform: hoveredPlace === place.id ? "scale(1.2)" : "scale(1)",
                        transformOrigin: `${place.x}px ${place.y}px`,
                      }}
                    />

                    {/* Invoice hit target for easier clicking on mobile */}
                    <circle
                      cx={place.x}
                      cy={place.y}
                      r="60"
                      fill="transparent"
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredPlace(place.id)}
                      onMouseLeave={() => setHoveredPlace(null)}
                      onClick={() => setSelectedPlace(place)}
                    />

                    <g
                      transform={`translate(${place.x - 15}, ${place.y - 50})`}
                      className="pointer-events-none transition-all duration-500"
                      opacity={hoveredPlace === place.id ? "1" : "0.8"}
                      style={{
                        transform: hoveredPlace === place.id ? "scale(1.1)" : "scale(1)",
                      }}
                    >
                      <path
                        d="M 15 0 L 15 25 M 15 25 C 10 25 5 28 5 32 C 5 36 10 40 15 40 C 20 40 25 36 25 32 C 25 28 20 25 15 25"
                        stroke={getMarkerColor(place.type, hoveredPlace === place.id)}
                        strokeWidth="3"
                        fill="none"
                      />
                    </g>
                  </g>
                ))}

                {places.map(
                  (place) =>
                    hoveredPlace === place.id && (
                      <g key={`label-${place.id}`} className="animate-fade-in">
                        <rect
                          x={place.x - 180}
                          y={place.y - 90}
                          width="360"
                          height="60"
                          fill="#ffffff"
                          opacity="0.98"
                          rx="12"
                          stroke={getMarkerColor(place.type, true)}
                          strokeWidth="3"
                          className="pointer-events-none drop-shadow-xl"
                        />
                        <text
                          x={place.x}
                          y={place.y - 50}
                          textAnchor="middle"
                          className="text-[32px] font-bold pointer-events-none"
                          fill={getMarkerColor(place.type, true)}
                          style={{ textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
                        >
                          {place.name}
                        </text>
                      </g>
                    ),
                )}
              </svg>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full" style={{ backgroundColor: "#60a5fa" }}></div>
                  <span className="text-xs sm:text-sm text-muted-foreground">Замкі</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full" style={{ backgroundColor: "#ef4444" }}></div>
                  <span className="text-xs sm:text-sm text-muted-foreground">Мемарыялы</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full" style={{ backgroundColor: "#a855f7" }}></div>
                  <span className="text-xs sm:text-sm text-muted-foreground">Рэлігійныя</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full" style={{ backgroundColor: "#10b981" }}></div>
                  <span className="text-xs sm:text-sm text-muted-foreground">Гістарычныя</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground text-center mt-3 sm:mt-4 px-2">
                Навядзіце курсор на маркер, каб убачыць назву месца. Націсніце, каб атрымаць падрабязную інфармацыю.
              </p>
            </Card>
          </div>

          <div className="lg:col-span-1 animate-slide-in-right" style={{ animationDelay: "0.4s" }}>
            {selectedPlace ? (
              <Card className="border-border bg-card lg:sticky lg:top-4 animate-scale-in">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl text-balance text-foreground">
                    {selectedPlace.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {selectedPlace.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img
                      src={selectedPlace.imageUrl || "/placeholder.svg"}
                      alt={selectedPlace.name}
                      className="w-full h-40 sm:h-48 object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                  <p className="text-sm text-pretty text-muted-foreground leading-relaxed mb-4">
                    {selectedPlace.description}
                  </p>
                  <Button
                    asChild
                    variant="default"
                    size="sm"
                    className="w-full transition-all duration-300 hover:scale-105"
                  >
                    <a
                      href={selectedPlace.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      Афіцыйны сайт
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-2 transition-all duration-300 hover:scale-105"
                    onClick={() => setSelectedPlace(null)}
                  >
                    Закрыць
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-border bg-card/50 lg:sticky lg:top-4">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg text-balance text-foreground">
                    Выберыце месца на карце
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-pretty text-muted-foreground leading-relaxed mb-4">
                    Націсніце на любы маркер на карце, каб убачыць падрабязную інфармацыю пра гістарычнае месца і
                    спасылку на афіцыйны сайт.
                  </p>
                  <div className="space-y-2 max-h-[400px] lg:max-h-[500px] overflow-y-auto pr-2">
                    {places.map((place) => (
                      <button
                        key={place.id}
                        className="w-full text-left px-3 py-2 rounded-md hover:bg-primary/10 transition-all duration-300 text-sm hover:translate-x-1"
                        onClick={() => setSelectedPlace(place)}
                        onMouseEnter={() => setHoveredPlace(place.id)}
                        onMouseLeave={() => setHoveredPlace(null)}
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3 text-accent flex-shrink-0 transition-transform duration-300 hover:scale-125" />
                          <span className="text-foreground font-medium">{place.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
