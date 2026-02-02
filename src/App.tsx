
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import WarHeroesPage from './pages/WarHeroesPage';
import './globals.css';

import { DataProvider } from "@/context/DataProvider"
import { AuthProvider } from "@/context/AuthProvider"
import { AdminLayout } from "@/pages/admin/AdminLayout"
import { LoginPage } from "@/pages/admin/LoginPage"
import { DashboardPage } from "@/pages/admin/DashboardPage"
import { ContentEditor } from "@/pages/admin/ContentEditor"
import { QuizEditor } from "@/pages/admin/QuizEditor"
import { TimelineEditor } from "@/pages/admin/TimelineEditor"

const QuizPage = React.lazy(() => import("./pages/QuizPage"))
const TimelinePage = React.lazy(() => import("./pages/TimelinePage"))

function App() {
    return (
        <AuthProvider>
            <DataProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<HomePage />} />
                            <Route path="war-heroes" element={<WarHeroesPage />} />
                            <Route path="quiz" element={<React.Suspense fallback={<div>Loading...</div>}><QuizPage /></React.Suspense>} />
                            <Route path="timeline" element={<React.Suspense fallback={<div>Loading...</div>}><TimelinePage /></React.Suspense>} />
                        </Route>

                        {/* Admin Routes */}
                        <Route path="/admin/login" element={<LoginPage />} />
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route index element={<DashboardPage />} />
                            <Route path="heroes" element={<ContentEditor />} />
                            <Route path="war-heroes" element={<ContentEditor />} />
                            <Route path="places" element={<ContentEditor />} />
                            <Route path="quiz" element={<QuizEditor />} />
                            <Route path="timeline" element={<TimelineEditor />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </DataProvider>
        </AuthProvider>
    );
}

export default App;
