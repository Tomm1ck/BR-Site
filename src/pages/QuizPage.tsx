
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, XCircle, RefreshCcw, Trophy } from "lucide-react"
import { PageTransition } from "@/components/page-transition"
import { useData } from "@/context/DataProvider"

export default function QuizPage() {
    const { quiz: QUIZ_QUESTIONS } = useData()
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [isCompleted, setIsCompleted] = useState(false)
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
    const [showExplanation, setShowExplanation] = useState(false)

    // Ensure we have questions before rendering logic that depends on them
    if (!QUIZ_QUESTIONS || QUIZ_QUESTIONS.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Загрузка віктарыны...</p>
            </div>
        )
    }

    const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex]

    // Handle win confetti
    useEffect(() => {
        if (isCompleted && score > QUIZ_QUESTIONS.length / 2) {
            const duration = 3 * 1000
            const animationEnd = Date.now() + duration
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

            const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

            const interval: any = setInterval(() => {
                const timeLeft = animationEnd - Date.now()

                if (timeLeft <= 0) {
                    return clearInterval(interval)
                }

                const particleCount = 50 * (timeLeft / duration)
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } })
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } })
            }, 250)

            return () => clearInterval(interval)
        }
    }, [isCompleted, score, QUIZ_QUESTIONS.length])

    const handleAnswerClick = (index: number) => {
        if (selectedAnswer !== null) return // Prevent multi-click

        setSelectedAnswer(index)
        setShowExplanation(true)

        if (index === currentQuestion.correctAnswer) {
            setScore((prev) => prev + 1)
        }
    }

    const handleNextQuestion = () => {
        if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1)
            setSelectedAnswer(null)
            setShowExplanation(false)
        } else {
            setIsCompleted(true)
        }
    }

    const restartQuiz = () => {
        setCurrentQuestionIndex(0)
        setScore(0)
        setIsCompleted(false)
        setSelectedAnswer(null)
        setShowExplanation(false)
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-zinc-900">
            <PageTransition>
                <div className="container mx-auto px-4 py-8 md:py-16 max-w-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Гістарычная віктарына</h1>
                        <p className="text-muted-foreground text-lg">Правер свае веды пра гісторыю і культуру Беларусі</p>
                    </div>

                    <AnimatePresence mode="wait">
                        {!isCompleted ? (
                            <motion.div
                                key="quiz-card"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="border-2 border-primary/10 shadow-xl overflow-hidden backdrop-blur-sm bg-white/80 dark:bg-black/50">
                                    <div className="h-2 bg-gray-100 w-full">
                                        <motion.div
                                            className="h-full bg-primary"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${((currentQuestionIndex) / QUIZ_QUESTIONS.length) * 100}%` }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    </div>
                                    <CardHeader>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium text-muted-foreground">
                                                Пытанне {currentQuestionIndex + 1} з {QUIZ_QUESTIONS.length}
                                            </span>
                                            <span className="text-sm font-bold text-primary">
                                                Ачкі: {score}
                                            </span>
                                        </div>
                                        {currentQuestion.image && (
                                            <div className="mb-4 rounded-lg overflow-hidden aspect-video relative">
                                                <img
                                                    src={currentQuestion.image}
                                                    alt="Question Illustration"
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                        )}
                                        <CardTitle className="text-xl md:text-2xl leading-relaxed">
                                            {currentQuestion.question}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        {currentQuestion.options.map((option, index) => {
                                            let buttonVariant = "outline"
                                            let icon = null

                                            if (selectedAnswer !== null) {
                                                if (index === currentQuestion.correctAnswer) {
                                                    buttonVariant = "default" // Correct
                                                    icon = <CheckCircle2 className="ml-auto h-5 w-5 text-green-200" />
                                                } else if (index === selectedAnswer) {
                                                    buttonVariant = "destructive" // Wrong
                                                    icon = <XCircle className="ml-auto h-5 w-5" />
                                                }
                                            }

                                            return (
                                                <Button
                                                    key={index}
                                                    variant={buttonVariant as any}
                                                    className={`w-full justify-between h-auto py-4 text-base whitespace-normal text-left ${selectedAnswer !== null && index === currentQuestion.correctAnswer ? "bg-green-600 hover:bg-green-700 text-white border-green-600" : ""
                                                        }`}
                                                    onClick={() => handleAnswerClick(index)}
                                                    disabled={selectedAnswer !== null}
                                                >
                                                    {option}
                                                    {icon}
                                                </Button>
                                            )
                                        })}

                                        <AnimatePresence>
                                            {showExplanation && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="mt-4 p-4 bg-muted/50 rounded-lg border-l-4 border-primary"
                                                >
                                                    <p className="text-sm md:text-base text-foreground">
                                                        <span className="font-bold block mb-1">Тлумачэнне:</span>
                                                        {currentQuestion.explanation}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </CardContent>
                                    <CardFooter className="pt-2">
                                        {selectedAnswer !== null && (
                                            <Button
                                                className="w-full text-lg"
                                                size="lg"
                                                onClick={handleNextQuestion}
                                            >
                                                {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? "Наступнае пытанне" : "Завяршыць"}
                                            </Button>
                                        )}
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="result-card"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Card className="text-center border-2 border-primary/20 shadow-2xl overflow-hidden">
                                    <CardHeader className="pt-10">
                                        <div className="mx-auto w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                                            <Trophy className="h-12 w-12 text-yellow-600" />
                                        </div>
                                        <CardTitle className="text-3xl font-bold">Вынік</CardTitle>
                                        <CardDescription className="text-lg">
                                            Вы адказалі правільна на {score} з {QUIZ_QUESTIONS.length} пытанняў
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-xl font-medium mb-6">
                                            {score === QUIZ_QUESTIONS.length ? "Выдатна! Вы сапраўдны знаўца гісторыі! 🎓" :
                                                score > QUIZ_QUESTIONS.length / 2 ? "Добры вынік! Але ёсць куды расці. 👍" :
                                                    "Не засмучайцеся! Гэта нагода даведацца больш новага. 📚"}
                                        </p>
                                        <div className="w-full bg-gray-200 rounded-full h-4 mb-6 overflow-hidden">
                                            <div
                                                className="bg-primary h-4 rounded-full transition-all duration-1000"
                                                style={{ width: `${(score / QUIZ_QUESTIONS.length) * 100}%` }}
                                            />
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-center pb-8">
                                        <Button onClick={restartQuiz} size="lg" className="gap-2">
                                            <RefreshCcw className="h-4 w-4" />
                                            Паспрабаваць зноў
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </PageTransition>
        </div>
    )
}
