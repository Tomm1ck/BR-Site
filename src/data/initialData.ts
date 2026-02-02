import { Hero, WarHero, Place } from "../types"

export const INITIAL_HEROES: Hero[] = []

export const INITIAL_WAR_HEROES: WarHero[] = []

export const INITIAL_PLACES: Place[] = []

import { QuizQuestion, HistoricalEvent } from "../types"
export const INITIAL_QUIZ: QuizQuestion[] = [
    {
        id: 1,
        question: "У якім годзе Францыск Скарына надрукаваў сваю першую кнігу?",
        options: ["1517", "1410", "1569", "1588"],
        correctAnswer: 0,
        explanation: "6 жніўня 1517 года Францыск Скарына выдаў у Празе 'Псалтыр' — першую друкаваную кнігу на старабеларускай мове.",
    },
    {
        id: 2,
        question: "Што такое 'Слуцкі пояс'?",
        options: [
            "Від старажытнай зброі",
            "Элемент мужчынскага касцюма шляхты",
            "Назва ракі ў Слуцку",
            "Грашовая адзінка ВКЛ",
        ],
        correctAnswer: 1,
        explanation: "Слуцкі пояс — элемент мужчынскага касцюма Вялікага княства Літоўскага, сімвал шляхецкай годнасці і багацця.",
    },
    // ... we can migrate other questions here if needed for initial seed or keep it minimal
]

export const INITIAL_EVENTS: HistoricalEvent[] = []
