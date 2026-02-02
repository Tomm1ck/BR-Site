
import React, { createContext, useContext, useEffect, useState } from "react"
import { Hero, WarHero, Place, QuizQuestion, HistoricalEvent } from "../types"
import { INITIAL_HEROES, INITIAL_WAR_HEROES, INITIAL_PLACES, INITIAL_QUIZ, INITIAL_EVENTS } from "../data/initialData"

interface DataContextType {
    heroes: Hero[]
    warHeroes: WarHero[]
    places: Place[]
    quiz: QuizQuestion[]
    events: HistoricalEvent[]
    updateHero: (oldHero: Hero, newHero: Hero) => void
    addHero: (hero: Hero) => void
    deleteHero: (hero: Hero) => void
    updateWarHero: (oldHero: WarHero, newHero: WarHero) => void
    addWarHero: (hero: WarHero) => void
    deleteWarHero: (hero: WarHero) => void
    updatePlace: (oldPlace: Place, newPlace: Place) => void
    addPlace: (place: Place) => void
    deletePlace: (place: Place) => void
    updateQuizQuestion: (oldQuestion: QuizQuestion, newQuestion: QuizQuestion) => void
    addQuizQuestion: (question: QuizQuestion) => void
    deleteQuizQuestion: (question: QuizQuestion) => void
    updateEvent: (oldEvent: HistoricalEvent, newEvent: HistoricalEvent) => void
    addEvent: (event: HistoricalEvent) => void
    deleteEvent: (event: HistoricalEvent) => void
    resetData: () => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
    const [heroes, setHeroes] = useState<Hero[]>(INITIAL_HEROES)
    const [warHeroes, setWarHeroes] = useState<WarHero[]>(INITIAL_WAR_HEROES)
    const [places, setPlaces] = useState<Place[]>(INITIAL_PLACES)
    const [quiz, setQuiz] = useState<QuizQuestion[]>(INITIAL_QUIZ)
    const [events, setEvents] = useState<HistoricalEvent[]>(INITIAL_EVENTS)
    const [isInitialized, setIsInitialized] = useState(false)

    // Load from Server on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [heroesRes, warHeroesRes, placesRes, quizRes, eventsRes] = await Promise.all([
                    fetch('http://localhost:3001/api/data/heroes'),
                    fetch('http://localhost:3001/api/data/warHeroes'),
                    fetch('http://localhost:3001/api/data/places'),
                    fetch('http://localhost:3001/api/data/quiz'),
                    fetch('http://localhost:3001/api/data/timeline')
                ]);

                const heroesData = await heroesRes.json();
                const warHeroesData = await warHeroesRes.json();
                const placesData = await placesRes.json();
                const quizData = await quizRes.json();
                const eventsData = await eventsRes.json();

                if (heroesData.length > 0) setHeroes(heroesData);
                else {
                    setHeroes(INITIAL_HEROES);
                    saveToServer('heroes', INITIAL_HEROES);
                }

                if (warHeroesData.length > 0) setWarHeroes(warHeroesData);
                else {
                    setWarHeroes(INITIAL_WAR_HEROES);
                    saveToServer('warHeroes', INITIAL_WAR_HEROES);
                }

                if (placesData.length > 0) setPlaces(placesData);
                else {
                    setPlaces(INITIAL_PLACES);
                    saveToServer('places', INITIAL_PLACES);
                }

                if (quizData.length > 0) setQuiz(quizData);
                else {
                    setQuiz(INITIAL_QUIZ);
                    saveToServer('quiz', INITIAL_QUIZ);
                }

                if (eventsData.length > 0) setEvents(eventsData);
                else {
                    setEvents(INITIAL_EVENTS);
                    saveToServer('timeline', INITIAL_EVENTS);
                }

            } catch (error) {
                console.error("Error loading data:", error);
                // Fallback
                setHeroes(INITIAL_HEROES);
                setWarHeroes(INITIAL_WAR_HEROES);
                setPlaces(INITIAL_PLACES);
                setQuiz(INITIAL_QUIZ);
                setEvents(INITIAL_EVENTS);
            }
            setIsInitialized(true);
        };

        fetchData();
    }, [])

    const saveToServer = async (filename: string, data: any) => {
        try {
            await fetch(`http://localhost:3001/api/data/${filename}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        } catch (error) {
            console.error(`Error saving ${filename}:`, error);
        }
    };

    // Save watchers
    useEffect(() => { if (isInitialized) saveToServer('heroes', heroes); }, [heroes, isInitialized])
    useEffect(() => { if (isInitialized) saveToServer('warHeroes', warHeroes); }, [warHeroes, isInitialized])
    useEffect(() => { if (isInitialized) saveToServer('places', places); }, [places, isInitialized])
    useEffect(() => { if (isInitialized) saveToServer('quiz', quiz); }, [quiz, isInitialized])
    useEffect(() => { if (isInitialized) saveToServer('timeline', events); }, [events, isInitialized])

    // Actions
    const updateHero = (oldHero: Hero, newHero: Hero) => setHeroes(prev => prev.map(h => (h.id === oldHero.id ? newHero : h)))
    const addHero = (hero: Hero) => setHeroes(prev => [...prev, hero])
    const deleteHero = (hero: Hero) => setHeroes(prev => prev.filter(h => h.id !== hero.id))

    const updateWarHero = (oldHero: WarHero, newHero: WarHero) => setWarHeroes(prev => prev.map(h => (h.id === oldHero.id ? newHero : h)))
    const addWarHero = (hero: WarHero) => setWarHeroes(prev => [...prev, hero])
    const deleteWarHero = (hero: WarHero) => setWarHeroes(prev => prev.filter(h => h.id !== hero.id))

    const updatePlace = (oldPlace: Place, newPlace: Place) => setPlaces(prev => prev.map(p => (p.id === oldPlace.id ? newPlace : p)))
    const addPlace = (place: Place) => setPlaces(prev => [...prev, place])
    const deletePlace = (place: Place) => setPlaces(prev => prev.filter(p => p.id !== place.id))

    const updateQuizQuestion = (oldQuestion: QuizQuestion, newQuestion: QuizQuestion) => setQuiz(prev => prev.map(q => (q.id === oldQuestion.id ? newQuestion : q)))
    const addQuizQuestion = (question: QuizQuestion) => setQuiz(prev => [...prev, question])
    const deleteQuizQuestion = (question: QuizQuestion) => setQuiz(prev => prev.filter(q => q.id !== question.id))

    const updateEvent = (oldEvent: HistoricalEvent, newEvent: HistoricalEvent) => setEvents(prev => prev.map(e => (e.id === oldEvent.id ? newEvent : e)))
    const addEvent = (event: HistoricalEvent) => setEvents(prev => [...prev, event])
    const deleteEvent = (event: HistoricalEvent) => setEvents(prev => prev.filter(e => e.id !== event.id))


    const resetData = () => {
        setHeroes(INITIAL_HEROES);
        setWarHeroes(INITIAL_WAR_HEROES);
        setPlaces(INITIAL_PLACES);
        setQuiz(INITIAL_QUIZ);
        setEvents(INITIAL_EVENTS);
        saveToServer('heroes', INITIAL_HEROES);
        saveToServer('warHeroes', INITIAL_WAR_HEROES);
        saveToServer('places', INITIAL_PLACES);
        saveToServer('quiz', INITIAL_QUIZ);
        saveToServer('timeline', INITIAL_EVENTS);
    }

    return (
        <DataContext.Provider value={{
            heroes, warHeroes, places, quiz, events,
            updateHero, addHero, deleteHero,
            updateWarHero, addWarHero, deleteWarHero,
            updatePlace, addPlace, deletePlace,
            updateQuizQuestion, addQuizQuestion, deleteQuizQuestion,
            updateEvent, addEvent, deleteEvent,
            resetData
        }}>
            {children}
        </DataContext.Provider>
    )
}

export function useData() {
    const context = useContext(DataContext)
    if (context === undefined) {
        throw new Error("useData must be used within a DataProvider")
    }
    return context
}
