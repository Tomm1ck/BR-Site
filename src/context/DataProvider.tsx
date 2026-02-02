
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

    // Load from Config Files on mount
    useEffect(() => {
        const fetchData = () => {
            // Priority: LocalStorage (if edits were made) -> Config Files (Source of truth)
            try {
                const localHeroes = localStorage.getItem('data_heroes');
                const localWarHeroes = localStorage.getItem('data_warHeroes');
                const localPlaces = localStorage.getItem('data_places');
                const localQuiz = localStorage.getItem('data_quiz');
                const localEvents = localStorage.getItem('data_timeline');

                setHeroes(localHeroes ? JSON.parse(localHeroes) : INITIAL_HEROES);
                setWarHeroes(localWarHeroes ? JSON.parse(localWarHeroes) : INITIAL_WAR_HEROES);
                setPlaces(localPlaces ? JSON.parse(localPlaces) : INITIAL_PLACES);
                setQuiz(localQuiz ? JSON.parse(localQuiz) : INITIAL_QUIZ);
                setEvents(localEvents ? JSON.parse(localEvents) : INITIAL_EVENTS);

            } catch (error) {
                console.error("Error loading data:", error);
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


    const saveToLocalStorage = (filename: string, data: any) => {
        try {
            localStorage.setItem(`data_${filename}`, JSON.stringify(data));
        } catch (error) {
            console.error(`Error saving ${filename} to localStorage:`, error);
        }
    };


    // Save watchers
    useEffect(() => { if (isInitialized) saveToLocalStorage('heroes', heroes); }, [heroes, isInitialized])
    useEffect(() => { if (isInitialized) saveToLocalStorage('warHeroes', warHeroes); }, [warHeroes, isInitialized])
    useEffect(() => { if (isInitialized) saveToLocalStorage('places', places); }, [places, isInitialized])
    useEffect(() => { if (isInitialized) saveToLocalStorage('quiz', quiz); }, [quiz, isInitialized])
    useEffect(() => { if (isInitialized) saveToLocalStorage('timeline', events); }, [events, isInitialized])


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
        saveToLocalStorage('heroes', INITIAL_HEROES);
        saveToLocalStorage('warHeroes', INITIAL_WAR_HEROES);
        saveToLocalStorage('places', INITIAL_PLACES);
        saveToLocalStorage('quiz', INITIAL_QUIZ);
        saveToLocalStorage('timeline', INITIAL_EVENTS);
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
