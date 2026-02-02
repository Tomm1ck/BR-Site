
export interface Hero {
    id: string
    name: string
    years: string
    title: string
    description: string
    image: string
    period: "early" | "modern"
}

export interface WarHero {
    id: string
    name: string
    years: string
    title: string
    description: string
    image: string
}

export type PlaceType = "castle" | "memorial" | "religious" | "historical"

export interface Place {
    id: string
    name: string
    description: string
    location: string
    url: string
    imageUrl: string
    x: number
    y: number
    type: PlaceType
}

export interface QuizQuestion {
    id: number
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
    image?: string
}

export interface HistoricalEvent {
    id: number
    title: string
    year: number
    description: string
    image?: string
}
