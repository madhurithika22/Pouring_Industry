import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import { Cpu, Layers3, Activity, Sun, Moon, UploadCloud, FileText, BarChart3, History } from 'lucide-react';

export default function App() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });

    const [activeTab, setActiveTab] = useState('ingest'); // 'ingest', 'viewer', 'analytics', 'historical'

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    const tabs = [
        { id: 'ingest', label: 'Ingest & Upload', desc: 'Stage cycle reports', icon: UploadCloud },
        { id: 'viewer', label: 'Digitized Viewer', desc: 'Parsed document blocks', icon: FileText },
        { id: 'analytics', label: 'Analytics', desc: 'Tonnage & cluster signals', icon: BarChart3 },
        { id: 'historical', label: 'Historical Logs', desc: 'Saved cycle archive', icon: History }
    ];

    const getBreadcrumb = () => {
        const tab = tabs.find(t => t.id === activeTab);
        return tab ? `${tab.label} / ${tab.desc}` : '';
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 selection:bg-orange-500 selection:text-white transition-colors duration-300">
            {/* Ambient Background Glows */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-orange-500/5 dark:bg-orange-500/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/5 dark:bg-amber-500/10 blur-[120px]" />
            </div>

            {/* Left Sidebar - Desktop */}
            <aside className="hidden md:flex w-64 shrink-0 bg-white dark:bg-slate-950 border-r border-slate-250 dark:border-slate-850 flex-col justify-between z-20 relative transition-colors duration-300 shadow-md dark:shadow-none">
                <div>
                    {/* Brand Logo Header */}
                    <div className="p-6 border-b border-slate-150 dark:border-slate-850 flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-orange-500 text-white shadow-md shadow-orange-500/20">
                            <Cpu size={22} className="animate-pulse" />
                        </div>
                        <div>
                            <h2 className="font-extrabold text-sm tracking-wider text-slate-800 dark:text-white uppercase">FORGE.IQ</h2>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold tracking-widest uppercase mt-0.5">PARSING ENGINE V3.2</p>
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="p-4 space-y-1.5">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-left transition-all duration-300 border-l-4 ${isActive
                                        ? 'bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 border-orange-500 font-bold'
                                        : 'bg-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border-transparent hover:bg-slate-50 dark:hover:bg-slate-900/50'
                                    }`}
                                >
                                    <Icon size={18} className={isActive ? 'text-orange-500' : 'text-slate-400 dark:text-slate-500'} />
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-wider">{tab.label}</div>
                                        <div className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold mt-0.5">{tab.desc}</div>
                                    </div>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom Status Widget */}
                <div className="p-4 border-t border-slate-150 dark:border-slate-855 bg-slate-50/50 dark:bg-slate-950/30">
                    <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-805 shadow-sm dark:shadow-inner text-[10px] uppercase font-bold tracking-widest text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                            <span className="w-2 h-2 rounded-full bg-emerald-500 absolute" />
                            <span className="ml-1 text-slate-500 dark:text-slate-400">ENGINE STATUS</span>
                        </span>
                        <strong className="text-emerald-500 font-extrabold">READY</strong>
                    </div>
                </div>
            </aside>

            {/* Mobile Header / Navigation */}
            <header className="md:hidden w-full bg-white dark:bg-slate-950 border-b border-slate-250 dark:border-slate-850 z-20 relative transition-colors duration-300">
                <div className="px-5 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-orange-500 text-white">
                            <Cpu size={16} />
                        </div>
                        <h2 className="font-extrabold text-sm tracking-wide text-slate-800 dark:text-white uppercase">FORGE.IQ</h2>
                    </div>
                    {/* Theme Toggle Button */}
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 text-slate-550 dark:text-slate-400"
                    >
                        {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                    </button>
                </div>
                {/* Horizontal Tab List for Mobile */}
                <div className="flex overflow-x-auto border-t border-slate-150 dark:border-slate-850 custom-scrollbar scrollbar-none px-2 py-1">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs whitespace-nowrap font-bold uppercase tracking-wider shrink-0 transition-all duration-300 ${isActive
                                    ? 'bg-orange-500 text-white shadow-sm font-extrabold'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                                }`}
                            >
                                <Icon size={14} />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            </header>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-h-screen min-w-0 z-10 relative">
                {/* Top Desktop Bar */}
                <header className="hidden md:flex sticky top-0 z-10 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 py-4 px-8 items-center justify-between transition-colors duration-300">
                    <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        <Cpu size={14} className="text-orange-500" />
                        <span>{getBreadcrumb()}</span>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-bold">
                        {/* Heat & Flow Telemetry Metrics */}
                        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 shadow-sm dark:shadow-inner text-slate-655 dark:text-slate-300 transition-colors duration-300">
                            <span className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400">
                                <Activity size={14} className="animate-pulse" />
                                <span>1042°C</span>
                            </span>
                            <span className="text-slate-300 dark:text-slate-700">|</span>
                            <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                                <Layers3 size={14} />
                                <span>4.2 t/h</span>
                            </span>
                        </div>

                        {/* Theme Switcher Button */}
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-655 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 border border-slate-200 dark:border-slate-700/60 transition-all duration-300 shadow-sm dark:shadow-inner flex items-center justify-center"
                            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                            id="theme-switcher"
                        >
                            {theme === 'dark' ? (
                                <Sun size={16} className="text-amber-500" />
                            ) : (
                                <Moon size={16} className="text-indigo-600" />
                            )}
                        </button>
                    </div>
                </header>

                {/* Primary Page Content Router */}
                <main className="flex-1 z-10 relative">
                    <Dashboard theme={theme} activeTab={activeTab} setActiveTab={setActiveTab} />
                </main>

                {/* Footer */}
                <footer className="z-10 py-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 text-center text-xs text-slate-500 font-medium transition-colors duration-300">
                    <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p>© 2026 Pouring Industry &bull; Advanced Metallurgy Intelligent System</p>
                        <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
                            <span>Reliability Score: <strong className="text-orange-600 dark:text-orange-400 font-semibold">99.8%</strong></span>
                            <span className="text-slate-300 dark:text-slate-600">|</span>
                            <span>Auto-Align Engine</span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}