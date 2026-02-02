
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
import { Pencil, Trash2, Plus, Calendar } from "lucide-react"
import { HistoricalEvent } from "@/types"

export function TimelineEditor() {
    const {
        events,
        updateEvent,
        addEvent,
        deleteEvent
    } = useData()

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingItem, setEditingItem] = useState<HistoricalEvent | null>(null)

    // Sort by year for display
    const sortedEvents = [...(events || [])].sort((a, b) => a.year - b.year)

    const handleEdit = (item: HistoricalEvent) => {
        setEditingItem(item)
        setIsDialogOpen(true)
    }

    const handleAdd = () => {
        setEditingItem(null)
        setIsDialogOpen(true)
    }

    const handleDelete = (item: HistoricalEvent) => {
        if (confirm("Вы ўпэўнены, што хочаце выдаліць гэтую падзею?")) {
            deleteEvent(item)
        }
    }

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)

        const eventData: HistoricalEvent = {
            id: editingItem ? editingItem.id : Date.now(),
            title: formData.get("title") as string,
            year: Number(formData.get("year")),
            description: formData.get("description") as string,
            image: formData.get("image") as string || undefined
        }

        if (editingItem) {
            updateEvent(editingItem, eventData)
        } else {
            addEvent(eventData)
        }
        setIsDialogOpen(false)
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Храналогія</h2>
                    <p className="text-slate-500 mt-1">Кіраванне гістарычнымі падзеямі для стужкі часу.</p>
                </div>
                <Button onClick={handleAdd} className="rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                    <Plus className="mr-2 h-4 w-4" />
                    Дадаць падзею
                </Button>
            </div>

            <div className="grid gap-4">
                {sortedEvents.map((item) => (
                    <div key={item.id} className="group bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-4 flex flex-col md:flex-row gap-6 items-start md:items-center">
                        <div className="flex-shrink-0 w-full md:w-32 h-32 md:h-24 bg-slate-100 rounded-lg overflow-hidden relative">
                            {item.image ? (
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                    <Calendar className="h-8 w-8" />
                                </div>
                            )}
                            <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded text-xs font-bold shadow-sm">
                                {item.year}
                            </div>
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-lg text-slate-800 mb-1 truncate">{item.title}</h3>
                            <p className="text-slate-500 text-sm line-clamp-2 md:line-clamp-1">{item.description}</p>
                        </div>

                        <div className="flex gap-2 w-full md:w-auto justify-end">
                            <Button variant="ghost" size="sm" className="h-9 w-9 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg" onClick={() => handleEdit(item)}>
                                <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-9 w-9 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg" onClick={() => handleDelete(item)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}

                {sortedEvents.length === 0 && (
                    <div className="py-20 text-center text-slate-400 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
                        <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                            <Calendar className="h-8 w-8 text-slate-300" />
                        </div>
                        <p>Спіс падзей пусты.</p>
                    </div>
                )}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {editingItem ? "Рэдагаваць падзею" : "Дадаць падзею"}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSave} className="space-y-4 py-4">
                        <div className="grid grid-cols-4 gap-4">
                            <div className="col-span-3 grid gap-2">
                                <Label htmlFor="title">Назва падзеі</Label>
                                <Input id="title" name="title" defaultValue={editingItem?.title} required />
                            </div>
                            <div className="col-span-1 grid gap-2">
                                <Label htmlFor="year">Год</Label>
                                <Input id="year" name="year" type="number" defaultValue={editingItem?.year} required />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="image">Спасылка на выяву</Label>
                            <Input id="image" name="image" defaultValue={editingItem?.image} placeholder="https://..." />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Апісанне</Label>
                            <Textarea id="description" name="description" defaultValue={editingItem?.description} required className="h-32" />
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
