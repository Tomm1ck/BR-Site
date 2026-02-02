
import { useState } from "react"
import { useData } from "@/context/DataProvider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Pencil, Trash2, Plus, HelpCircle } from "lucide-react"
import { QuizQuestion } from "@/types"

export function QuizEditor() {
    const {
        quiz,
        updateQuizQuestion,
        addQuizQuestion,
        deleteQuizQuestion
    } = useData()

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingItem, setEditingItem] = useState<QuizQuestion | null>(null)

    const handleEdit = (item: QuizQuestion) => {
        setEditingItem(item)
        setIsDialogOpen(true)
    }

    const handleAdd = () => {
        setEditingItem(null)
        setIsDialogOpen(true)
    }

    const handleDelete = (item: QuizQuestion) => {
        if (confirm("Вы ўпэўнены, што хочаце выдаліць гэта пытанне?")) {
            deleteQuizQuestion(item)
        }
    }

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)

        const options = [
            formData.get("option0") as string,
            formData.get("option1") as string,
            formData.get("option2") as string,
            formData.get("option3") as string,
        ]

        const questionData: QuizQuestion = {
            id: editingItem ? editingItem.id : Date.now(),
            question: formData.get("question") as string,
            options: options,
            correctAnswer: Number(formData.get("correctAnswer")),
            explanation: formData.get("explanation") as string,
            image: formData.get("image") as string || undefined
        }

        if (editingItem) {
            updateQuizQuestion(editingItem, questionData)
        } else {
            addQuizQuestion(questionData)
        }
        setIsDialogOpen(false)
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Віктарына</h2>
                    <p className="text-slate-500 mt-1">Кіраванне пытаннямі і адказамі.</p>
                </div>
                <Button onClick={handleAdd} className="rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                    <Plus className="mr-2 h-4 w-4" />
                    Дадаць пытанне
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {quiz.map((item) => (
                    <div key={item.id} className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col">
                        {item.image && (
                            <div className="h-32 w-full bg-slate-100 relative overflow-hidden">
                                <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        )}
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex justify-between items-start gap-4 mb-4">
                                <h3 className="font-bold text-slate-800 line-clamp-2 leading-tight min-h-[3rem]">
                                    {item.question}
                                </h3>
                            </div>

                            <div className="space-y-2 mb-6 flex-1">
                                {item.options.map((option, idx) => (
                                    <div
                                        key={idx}
                                        className={`text-sm px-3 py-2 rounded-lg flex items-center gap-2 ${idx === item.correctAnswer
                                            ? "bg-green-50 text-green-700 font-medium ring-1 ring-green-100"
                                            : "text-slate-500 bg-slate-50"}`}
                                    >
                                        <div className={`w-1.5 h-1.5 rounded-full ${idx === item.correctAnswer ? "bg-green-500" : "bg-slate-300"}`} />
                                        <span className="truncate">{option}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                <span className="text-xs text-slate-400 font-medium px-2 py-1 bg-slate-50 rounded">ID: {item.id}</span>
                                <div className="flex gap-1">
                                    <Button variant="ghost" size="sm" className="h-8 w-8 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg" onClick={() => handleEdit(item)}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg" onClick={() => handleDelete(item)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {quiz.length === 0 && (
                    <div className="col-span-full py-20 text-center text-slate-400 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
                        <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                            <HelpCircle className="h-8 w-8 text-slate-300" />
                        </div>
                        <p>Спіс пытанняў пусты.</p>
                    </div>
                )}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {editingItem ? "Рэдагаваць пытанне" : "Дадаць пытанне"}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSave} className="space-y-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="question">Тэкст пытання</Label>
                            <Textarea id="question" name="question" defaultValue={editingItem?.question} required />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="image">Спасылка на выяву (неабавязкова)</Label>
                            <Input id="image" name="image" defaultValue={editingItem?.image} placeholder="https://..." />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[0, 1, 2, 3].map((index) => (
                                <div key={index} className="grid gap-2">
                                    <Label htmlFor={`option${index}`}>Варыянт {index + 1}</Label>
                                    <Input
                                        id={`option${index}`}
                                        name={`option${index}`}
                                        defaultValue={editingItem?.options[index]}
                                        required
                                        className={editingItem?.correctAnswer === index ? "border-green-500 bg-green-50" : ""}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="correctAnswer">Нумар правільнага варыянта</Label>
                            <select
                                id="correctAnswer"
                                name="correctAnswer"
                                defaultValue={editingItem?.correctAnswer || 0}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="0">Варыянт 1</option>
                                <option value="1">Варыянт 2</option>
                                <option value="2">Варыянт 3</option>
                                <option value="3">Варыянт 4</option>
                            </select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="explanation">Тлумачэнне</Label>
                            <Textarea id="explanation" name="explanation" defaultValue={editingItem?.explanation} required className="h-24" />
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Адмена</Button>
                            <Button type="submit">Захаваць</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
