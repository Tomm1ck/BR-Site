
import { useMemo } from "react"
import { motion } from "framer-motion"
import { useData } from "@/context/DataProvider"
import { PageTransition } from "@/components/page-transition"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

function getYear(dateString: string): number {
    const match = dateString.match(/\d{3,4}/)
    return match ? Number.parseInt(match[0]) : 0
}

export default function TimelinePage() {
    const { heroes, warHeroes, places, events: historicalEvents } = useData()

    // Combine and sort events
    const timelineEvents = useMemo(() => {
        const events = [
            ...heroes.map(h => ({
                id: h.id,
                year: getYear(h.years),
                title: h.name,
                description: h.title,
                type: "hero",
                image: h.image,
                fullDate: h.years
            })),
            ...warHeroes.map(w => ({
                id: w.id,
                year: getYear(w.years),
                title: w.name,
                description: w.title,
                type: "war-hero",
                image: w.image,
                fullDate: w.years
            })),
            ...historicalEvents.map(e => ({
                id: e.id,
                year: e.year,
                title: e.title,
                description: e.description,
                type: "event",
                image: e.image,
                fullDate: e.year.toString()
            }))
        ]

        return events.sort((a, b) => a.year - b.year)
    }, [heroes, warHeroes, historicalEvents])

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <PageTransition>
                <div className="container mx-auto px-4 py-12 md:py-20">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Гістарычная Стужка</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Падарожжа праз стагоддзі: ад полацкіх князёў да герояў сучаснасці
                        </p>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        {/* Vertical Line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-primary to-primary/20 transform -translate-x-1/2" />

                        {timelineEvents.map((event, index) => (
                            <motion.div
                                key={`${event.title}-${index}`}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`relative mb-12 flex flex-col md:flex-row items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Dot on the line */}
                                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-background border-4 border-primary rounded-full transform -translate-x-1/2 z-10" />

                                {/* Content Card */}
                                <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                                    <Card className="hover:shadow-lg transition-shadow duration-300">
                                        <CardContent className="p-4 flex gap-4 items-start">
                                            <div className="w-16 h-16 shrink-0 rounded-full overflow-hidden border-2 border-primary/20">
                                                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <div className="flex flex-wrap gap-2 mb-1">
                                                    <Badge variant="outline" className="font-bold text-primary">
                                                        {event.fullDate}
                                                    </Badge>
                                                    <Badge variant="secondary" className="text-xs">
                                                        {event.type === "hero" && "Асоба"}
                                                        {event.type === "war-hero" && "Герой вайны"}
                                                        {event.type === "event" && "Падзея"}
                                                    </Badge>
                                                </div>
                                                <h3 className="font-bold text-lg leading-tight mb-1">{event.title}</h3>
                                                <p className="text-sm text-muted-foreground">{event.description}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Empty Space for the other side */}
                                <div className="hidden md:block md:w-1/2" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </PageTransition>
        </div>
    )
}
