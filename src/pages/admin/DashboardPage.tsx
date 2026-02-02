
import { useData } from "@/context/DataProvider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Shield, Map, HelpCircle, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardPage() {
    const { heroes, warHeroes, places, quiz, events } = useData()

    const handleExport = () => {
        const data = { heroes, warHeroes, places, quiz, events }
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `history-backup-${new Date().toISOString().split('T')[0]}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    const stats = [
        {
            title: "Героі (Асветнікі і дзеячы)",
            value: heroes.length,
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-100",
        },
        {
            title: "Героі Вайны",
            value: warHeroes.length,
            icon: Shield,
            color: "text-red-600",
            bg: "bg-red-100",
        },
        {
            title: "Месцы на карце",
            value: places.length,
            icon: Map,
            color: "text-green-600",
            bg: "bg-green-100",
        },
        {
            title: "Пытанні віктарыны",
            value: quiz ? quiz.length : 0,
            icon: HelpCircle,
            color: "text-purple-600",
            bg: "bg-purple-100",
        },
    ]

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-col gap-2">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">Дашборд</h2>
                    <p className="text-slate-500 text-lg">Вітаем! вось агляд вашага гістарычнага праекта.</p>
                </div>
                <Button variant="outline" onClick={handleExport} className="rounded-xl border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm transition-all hover:shadow-md gap-2 w-full md:w-auto">
                    <Download className="h-4 w-4" />
                    Скачаць рэзервную копію данных
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title} className="border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white overflow-hidden group">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-semibold text-slate-600 line-clamp-1">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-3 rounded-xl ${stat.bg} group-hover:scale-110 transition-transform duration-300`}>
                                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-slate-900 mb-1">{stat.value}</div>
                            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                                Запісаў
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-8 relative overflow-hidden shadow-sm">
                    <div className="relative z-10 max-w-2xl">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
                                <Shield className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold text-xl text-emerald-900">Бяспечнае захаванне</h3>
                        </div>
                        <p className="text-emerald-800/80 leading-relaxed mb-4">
                            Вашы дадзеныя зараз аўтаматычна сінхранізуюцца з лакальнымі файламі JSON.
                            Гэта значыць, што вы можаце смела перазагружаць старонку, адкрываць сайт у іншых браўзерах —
                            усё, што вы дадалі, застанецца на месцы.
                        </p>
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute right-0 top-0 h-64 w-64 bg-emerald-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                </div>
            </div>
        </div>
    )
}
