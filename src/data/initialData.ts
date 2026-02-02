import { Hero, WarHero, Place, QuizQuestion, HistoricalEvent } from "../types"

// Импортируем данные напрямую из папки data в корне проекта
// Vite позволяет импортировать JSON как объекты
import heroesData from "../../data/storage/heroes.json"
import warHeroesData from "../../data/storage/warHeroes.json"
import placesData from "../../data/storage/places.json"
import quizData from "../../data/storage/quiz.json"
import timelineData from "../../data/storage/timeline.json"

export const INITIAL_HEROES: Hero[] = heroesData as Hero[]
export const INITIAL_WAR_HEROES: WarHero[] = warHeroesData as WarHero[]
export const INITIAL_PLACES: Place[] = placesData as Place[]
export const INITIAL_QUIZ: QuizQuestion[] = (quizData as any[]).map(q => ({
    ...q,
    // Убеждаемся, что тип соответствует QuizQuestion
})) as QuizQuestion[]
export const INITIAL_EVENTS: HistoricalEvent[] = timelineData as HistoricalEvent[]
