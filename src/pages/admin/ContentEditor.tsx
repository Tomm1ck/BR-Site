
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
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
import { Pencil, Trash2, Plus } from "lucide-react"
import { Hero, WarHero, Place } from "@/types"

type ItemType = Hero | WarHero | Place
type Category = "heroes" | "war-heroes" | "places"

export function ContentEditor() {
    const {
        heroes, warHeroes, places,
        updateHero, addHero, deleteHero,
        updateWarHero, addWarHero, deleteWarHero,
        updatePlace, addPlace, deletePlace
    } = useData()

    const location = useLocation()
    const [category, setCategory] = useState<Category>("heroes")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingItem, setEditingItem] = useState<ItemType | null>(null)

    // Determine category from path
    useEffect(() => {
        if (location.pathname.includes("war-heroes")) setCategory("war-heroes")
        else if (location.pathname.includes("heroes")) setCategory("heroes")
        else if (location.pathname.includes("places")) setCategory("places")
    }, [location.pathname])

    const getData = () => {
        switch (category) {
            case "heroes": return heroes
            case "war-heroes": return warHeroes
            case "places": return places
        }
    }

    const handleEdit = (item: ItemType) => {
        setEditingItem(item)
        setIsDialogOpen(true)
    }

    const handleAdd = () => {
        setEditingItem(null)
        setIsDialogOpen(true)
    }

    const handleDelete = (item: ItemType) => {
        if (confirm("Вы ўпэўнены, што хочаце выдаліць гэты запіс?")) {
            switch (category) {
                case "heroes": deleteHero(item as Hero); break;
                case "war-heroes": deleteWarHero(item as WarHero); break;
                case "places": deletePlace(item as Place); break;
            }
        }
    }

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)

        // Construct object based on category type
        const common = {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            image: formData.get("image") as string, // Note: form field should match 'image' or 'imageUrl'
        }

        if (category === "places") {
            const placeData: Place = {
                id: editingItem ? (editingItem as Place).id : Date.now().toString(),
                name: common.name,
                description: common.description,
                imageUrl: common.image, // places use imageUrl
                location: formData.get("location") as string,
                url: formData.get("url") as string,
                x: Number(formData.get("x")),
                y: Number(formData.get("y")),
                type: formData.get("type") as any
            }
            if (editingItem) updatePlace(editingItem as Place, placeData)
            else addPlace(placeData)
        } else {
            // Hero or WarHero
            const heroData: any = {
                id: editingItem ? (editingItem as Hero | WarHero).id : Date.now().toString(),
                name: common.name,
                description: common.description,
                image: common.image,
                years: formData.get("years") as string,
                title: formData.get("title") as string,
            }

            if (category === "heroes") {
                heroData.period = formData.get("period") as any
                if (editingItem) updateHero(editingItem as Hero, heroData)
                else addHero(heroData)
            } else {
                if (editingItem) updateWarHero(editingItem as WarHero, heroData)
                else addWarHero(heroData)
            }
        }
        setIsDialogOpen(false)
    }

    // Render Form Fields
    const renderFields = () => {
        const defaultValues: any = editingItem || {}

        return (
            <>
                <div className="grid gap-2">
                    <Label htmlFor="name">Імя / Назва</Label>
                    <Input id="name" name="name" defaultValue={defaultValues.name} required />
                </div>

                {category === "places" ? (
                    // Place specific fields
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="type">Тып</Label>
                                <select
                                    id="type"
                                    name="type"
                                    defaultValue={defaultValues.type || "historical"}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="castle">Замак</option>
                                    <option value="memorial">Мемарыял</option>
                                    <option value="religious">Рэлігійны</option>
                                    <option value="historical">Гістарычны</option>
                                </select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="location">Лакацыя</Label>
                                <Input id="location" name="location" defaultValue={defaultValues.location} required />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="x">X (каардыната)</Label>
                                <Input id="x" name="x" type="number" defaultValue={defaultValues.x} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="y">Y (каардыната)</Label>
                                <Input id="y" name="y" type="number" defaultValue={defaultValues.y} required />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="url">Спасылка (URL)</Label>
                            <Input id="url" name="url" defaultValue={defaultValues.url} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="image">Спасылка на выяву</Label>
                            <Input id="image" name="image" defaultValue={defaultValues.imageUrl} required />
                        </div>
                    </>
                ) : (
                    // Hero Specific Fields
                    <>
                        <div className="grid gap-2">
                            <Label htmlFor="years">Гады жыцця</Label>
                            <Input id="years" name="years" defaultValue={defaultValues.years} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="title">Тытул / Званне</Label>
                            <Input id="title" name="title" defaultValue={defaultValues.title} />
                        </div>
                        {category === "heroes" && (
                            <div className="grid gap-2">
                                <Label htmlFor="period">Перыяд</Label>
                                <select
                                    id="period"
                                    name="period"
                                    defaultValue={defaultValues.period || "early"}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="early">Ранні</option>
                                    <option value="modern">Сучасны</option>
                                </select>
                            </div>
                        )}
                        <div className="grid gap-2">
                            <Label htmlFor="image">Спасылка на выяву</Label>
                            <Input id="image" name="image" defaultValue={defaultValues.image} required />
                        </div>
                    </>
                )}

                <div className="grid gap-2">
                    <Label htmlFor="description">Апісанне</Label>
                    <Textarea id="description" name="description" defaultValue={defaultValues.description} required className="h-32" />
                </div>
            </>
        )
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                        {category === "heroes" && "Гістарычныя асобы"}
                        {category === "war-heroes" && "Героі вайны"}
                        {category === "places" && "Месцы і славутасці"}
                    </h2>
                    <p className="text-slate-500 mt-1">Кіраванне спісам і рэдагаванне кантэнту.</p>
                </div>
                <Button onClick={handleAdd} className="rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                    <Plus className="mr-2 h-4 w-4" />
                    Дадаць запіс
                </Button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50/50">
                        <TableRow className="border-slate-100 hover:bg-slate-50/50">
                            <TableHead className="w-[80px]">Від</TableHead>
                            <TableHead>Імя / Назва</TableHead>
                            <TableHead className="hidden md:table-cell">Апісанне</TableHead>
                            <TableHead className="w-[120px] text-right">Дзеянні</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {getData().map((item: any) => (
                            <TableRow key={item.id} className="border-slate-50 hover:bg-slate-50/80 transition-colors">
                                <TableCell>
                                    <div className="h-10 w-10 rounded-lg overflow-hidden bg-slate-100 ring-1 ring-slate-200">
                                        <img
                                            src={item.image || item.imageUrl || "/placeholder.svg"}
                                            alt={item.name}
                                            className="h-full w-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${item.name}&background=random`
                                            }}
                                        />
                                    </div>
                                </TableCell>
                                <TableCell className="font-semibold text-slate-800">{item.name}</TableCell>
                                <TableCell className="hidden md:table-cell text-slate-500 truncate max-w-md">{item.description}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-1">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg" onClick={() => handleEdit(item)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg" onClick={() => handleDelete(item)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {getData().length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="h-32 text-center text-slate-400">
                                    Няма запісаў. Націсніце "Дадаць", каб стварыць першы.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {editingItem ? "Рэдагаваць запіс" : "Дадаць запіс"}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSave} className="space-y-4 py-4">
                        {renderFields()}
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
