
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Layout() {
    return (
        <div className="font-sans antialiased text-foreground bg-background min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
