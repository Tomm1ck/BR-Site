
import { Outlet } from "react-router-dom"
import { useAuth } from "@/context/AuthProvider"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, Users, Map, Shield, LogOut, HelpCircle, Calendar } from "lucide-react"

export function AdminLayout() {
    const { isAuthenticated, logout } = useAuth()
    const location = useLocation()

    useEffect(() => {
        // If not authenticated, we should strictly speaking redirect
        // But since we are using client-side routing, we handle this in the component
        // or wrap this in a ProtectedRoute component.
        // For simplicity, we check here.
        if (!isAuthenticated) {
            window.location.href = "/admin/login"
        }
    }, [isAuthenticated])

    if (!isAuthenticated) return null

    const navItems = [
        { path: "/admin", icon: LayoutDashboard, label: "Дашборд" },
        { path: "/admin/heroes", icon: Users, label: "Героі (Галерэя)" },
        { path: "/admin/war-heroes", icon: Shield, label: "Героі Вайны" },
        { path: "/admin/places", icon: Map, label: "Месцы на карце" },
        { path: "/admin/quiz", icon: HelpCircle, label: "Віктарына" },
        { path: "/admin/timeline", icon: Calendar, label: "Стужка часу" },
    ]

    return (
        <div className="min-h-screen bg-slate-50/50 flex font-sans text-slate-900">
            {/* Sidebar - Glassmorphism Light */}
            <aside className="w-72 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] fixed h-full z-30 hidden md:flex flex-col transition-all duration-300">
                <div className="p-8 pb-6">
                    <div className="flex items-center gap-3 px-2">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
                            A
                        </div>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
                            Адмін-панэль
                        </h1>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-2 py-4">
                    <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Навігацыя</p>
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path
                        return (
                            <Link key={item.path} to={item.path}>
                                <Button
                                    variant="ghost"
                                    className={`w-full justify-start gap-3 h-12 rounded-xl text-base transition-all duration-200 ${isActive
                                        ? "bg-indigo-50 text-indigo-700 font-medium shadow-sm ring-1 ring-indigo-100"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                        }`}
                                >
                                    <item.icon className={`h-5 w-5 ${isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"}`} />
                                    {item.label}
                                </Button>
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-slate-100 mt-auto bg-slate-50/50">
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl h-11"
                        onClick={() => {
                            logout()
                            window.location.href = "/"
                        }}
                    >
                        <LogOut className="h-5 w-5" />
                        Выхад
                    </Button>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 z-40 p-4 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                        A
                    </div>
                    <span className="font-bold text-slate-800">Адмін-панэль</span>
                </div>
                <Button size="sm" variant="ghost" onClick={() => {
                    logout()
                    window.location.href = "/"
                }}>Выхад</Button>
            </div>

            {/* Main Content */}
            <main className="flex-1 md:ml-72 p-4 md:p-10 pt-20 md:pt-10 overflow-y-auto min-h-screen relative">
                {/* Decorative background blob */}
                <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-50/50 to-transparent pointer-events-none -z-10" />

                <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
