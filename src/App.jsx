import React, { useState, useEffect } from 'react';
import { Gift, Heart, Wind, Anchor, Sparkles, Feather, Compass, Sun, Moon, Coffee, Star, Ship } from 'lucide-react';
import { getCuscoWeather } from './services/weatherService';
import { sanctuaryMessages } from './data/sanctuaryMessages';

// --- DATA: TIME-BASED BIRTHDAY MESSAGES (EXPANDED) ---
const BIRTHDAY_DATA = {
    MORNING: [
        { title: "first light.", content: "the ocean is calm, waiting for your command. happy birthday, captain.", icon: <Sun className="w-10 h-10 text-amber-200" /> },
        { title: "fresh sails.", content: "a new year, a new horizon. raise the anchor.", icon: <Ship className="w-10 h-10 text-blue-200" /> },
        { title: "morning star.", content: "you guide us all with your quiet strength.", icon: <Star className="w-10 h-10 text-yellow-100" /> },
        { title: "awake.", content: "the world is better because you woke up today.", icon: <Coffee className="w-10 h-10 text-orange-200" /> }
    ],
    AFTERNOON: [
        { title: "high tide.", content: "you are a force of nature. unstoppable. beautiful.", icon: <Wind className="w-10 h-10 text-cyan-200" /> },
        { title: "full sun.", content: "shine. just shine. we are all watching in awe.", icon: <Sun className="w-10 h-10 text-yellow-400" /> },
        { title: "celebration.", content: "happy birthday, tornado. let the chaos be joy today.", icon: <Gift className="w-10 h-10 text-rose-400" /> },
        { title: "adventure.", content: "the map is vast, but you know the way.", icon: <Compass className="w-10 h-10 text-emerald-300" /> }
    ],
    EVENING: [
        { title: "velvet sky.", content: "the day cools, but your heart remains warm.", icon: <Moon className="w-10 h-10 text-purple-300" /> },
        { title: "gratitude.", content: "thank you for being the lighthouse in my storm.", icon: <Sparkles className="w-10 h-10 text-indigo-300" /> },
        { title: "romance.", content: "distance is just geography. my heart is there.", icon: <Heart className="w-10 h-10 text-pink-500" /> },
        { title: "safe harbor.", content: "drop anchor. rest. you are loved.", icon: <Anchor className="w-10 h-10 text-teal-400" /> }
    ],
    LATE_NIGHT: [
        { title: "silent watch.", content: "i am keeping watch while you dream.", icon: <Moon className="w-10 h-10 text-slate-400" /> },
        { title: "deep ocean.", content: "your depth terrifies the shallow and comforts the brave.", icon: <Wind className="w-10 h-10 text-cyan-700" /> },
        { title: "starlight.", content: "happy birthday. you are the brightest thing in the dark.", icon: <Star className="w-10 h-10 text-slate-200" /> },
        { title: "peace.", content: "breathe. another year of wisdom earned.", icon: <Feather className="w-10 h-10 text-emerald-200" /> }
    ]
};

const App = () => {
    const [mood, setMood] = useState('MORNING');
    const [isBirthday, setIsBirthday] = useState(false);
    const [sanctuaryMode, setSanctuaryMode] = useState('professional');
    const [sanctuaryMsg, setSanctuaryMsg] = useState(null);
    const [weather, setWeather] = useState(null);
    const [step, setStep] = useState(0);

    // INIT
    useEffect(() => {
        // 1. Time Logic (Cusco - America/Lima)
        const getCuscoNow = () => {
            try {
                const parts = new Intl.DateTimeFormat("en-US", {
                    timeZone: "America/Lima",
                    year: "numeric", month: "2-digit", day: "2-digit",
                    hour: "2-digit", minute: "2-digit", hour12: false,
                }).formatToParts(new Date());

                const get = (t) => parts.find(p => p.type === t)?.value || "";
                const yyyy = get("year");
                const mm = get("month");
                const dd = get("day");
                const hh = Number(get("hour"));
                const min = Number(get("minute"));

                return { hh, mm, dd, dateKey: `${yyyy}-${mm}-${dd}` };
            } catch (e) {
                console.error("Timezone error", e);
                return { hh: 12, mm: '01', dd: '01' }; // Fallback
            }
        };

        const getMoodFromHour = (h) => {
            if (h >= 5 && h < 12) return 'MORNING';
            if (h >= 12 && h < 18) return 'AFTERNOON';
            if (h >= 18 || h < 24) return 'EVENING';
            return 'LATE_NIGHT';
        };

        const cuscoTime = getCuscoNow();
        setMood(getMoodFromHour(cuscoTime.hh));

        // 2. Date Check (Jan 20)
        const bday = cuscoTime.mm === '01' && (cuscoTime.dd === '20');
        setIsBirthday(bday);
        // setIsBirthday(true); // Toggle for debugging

        // 3. Sanctuary Selection
        const sModes = ['professional', 'romantic', 'zen'];
        const vid = sModes[Math.floor(Math.random() * sModes.length)];
        setSanctuaryMode(vid);
        const msgs = sanctuaryMessages[vid];
        setSanctuaryMsg(msgs[Math.floor(Math.random() * msgs.length)]);

        // 4. Weather
        getCuscoWeather().then(setWeather);
    }, []);

    const toggleMode = () => setIsBirthday(!isBirthday);

    // BACKGROUND COLOR LOGIC
    const getBgColors = () => {
        if (isBirthday) {
            switch (mood) {
                case 'MORNING': return { base: 'bg-slate-900', aurora1: 'bg-amber-500', aurora2: 'bg-blue-600', aurora3: 'bg-orange-400' };
                case 'AFTERNOON': return { base: 'bg-stone-900', aurora1: 'bg-yellow-500', aurora2: 'bg-red-500', aurora3: 'bg-orange-600' };
                case 'EVENING': return { base: 'bg-[#1a0b14]', aurora1: 'bg-purple-800', aurora2: 'bg-pink-700', aurora3: 'bg-indigo-900' };
                case 'LATE_NIGHT': return { base: 'bg-[#050f14]', aurora1: 'bg-emerald-900', aurora2: 'bg-cyan-900', aurora3: 'bg-slate-800' };
                default: return { base: 'bg-black', aurora1: 'bg-white', aurora2: 'bg-white', aurora3: 'bg-white' };
            }
        }
        // Sanctuary
        if (sanctuaryMode === 'professional') return { base: 'bg-slate-950', aurora1: 'bg-slate-700', aurora2: 'bg-gray-800', aurora3: 'bg-zinc-800' };
        if (sanctuaryMode === 'romantic') return { base: 'bg-[#180509]', aurora1: 'bg-rose-900', aurora2: 'bg-red-900', aurora3: 'bg-pink-950' };
        return { base: 'bg-[#02120b]', aurora1: 'bg-emerald-900', aurora2: 'bg-teal-900', aurora3: 'bg-green-950' };
    };

    const colors = getBgColors();
    const cards = BIRTHDAY_DATA[mood] || BIRTHDAY_DATA.MORNING;

    return (
        <div className={`min-h-screen relative font-sans overflow-hidden transition-colors duration-[2000ms] ${colors.base}`}>

            {/* === 1. CINEMATIC BACKGROUND LAYERS === */}

            {/* a) Aurora Layers (Movement) */}
            <div className={`aurora-blob w-[500px] h-[500px] -top-20 -left-20 animate-aurora-1 transition-colors duration-[3000ms] ${colors.aurora1}`} />
            <div className={`aurora-blob w-[600px] h-[600px] -bottom-32 -right-32 animate-aurora-2 transition-colors duration-[3000ms] ${colors.aurora2}`} />
            <div className={`aurora-blob w-[400px] h-[400px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-aurora-3 transition-colors duration-[3000ms] ${colors.aurora3}`} />

            {/* b) Gold Glow / Bokeh Top Layer (Warmth) */}
            {isBirthday && (
                <div className="fixed top-0 left-0 right-0 h-[40vh] bg-gradient-to-b from-amber-500/10 to-transparent pointer-events-none z-0 mix-blend-screen animate-pulse-slow" />
            )}

            {/* c) Noise Overlay (Texture) */}
            <div className="fixed inset-0 bg-noise opacity-[0.06] pointer-events-none z-0 mix-blend-overlay" />

            {/* d) Global Watermark (Shimmering + Breathing) */}
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 select-none mix-blend-overlay">
                <h1 className="text-[14vw] font-bold tracking-tighter opacity-20 animate-shimmer animate-pulse-slow whitespace-nowrap">
                    PATRICIA CAPRIO
                </h1>
            </div>

            {/* e) Particles */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {weather?.scenario === 'B' ? (
                    [...Array(30)].map((_, i) => (
                        <div key={i} className="absolute w-px h-12 bg-white/30 animate-rain"
                            style={{ left: `${Math.random() * 100}%`, top: `-${Math.random() * 20}%`, animationDelay: `${Math.random()}s` }} />
                    ))
                ) : (
                    [...Array(25)].map((_, i) => (
                        <div key={i} className="absolute rounded-full w-1 h-1 bg-white/50 animate-twinkle"
                            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s` }} />
                    ))
                )}
            </div>

            {/* === 2. WIDGETS === */}
            <div className="fixed top-8 left-0 right-0 flex justify-center z-50 animate-fade-in">
                <div className="px-5 py-2 bg-black/20 backdrop-blur-md rounded-full border border-white/10 text-[10px] tracking-[0.3em] uppercase text-white/60 flex items-center gap-2 shadow-xl">
                    <span>Cusco</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    <span>{weather ? `${weather.temp}°` : '--'}</span>
                    <span className="opacity-50 hidden sm:inline border-l border-white/10 pl-2 ml-1">{weather?.description || 'Loading...'}</span>
                </div>
            </div>

            {/* === 3. CONTENT === */}
            <main className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">

                {isBirthday ? (
                    // --- BIRTHDAY MODE ---
                    <div className="w-full max-w-lg animate-fade-in">

                        {/* Header Title (Light Glow only) */}
                        <div className="text-center mb-12 space-y-2">
                            <p className="text-[10px] tracking-[0.4em] uppercase text-white/50">January 20, 2026</p>
                            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white/95 text-glow">
                                Happy Birthday <br />
                                <span className="font-semibold italic font-serif">Patricia Caprio</span>
                            </h1>
                        </div>

                        {/* Card */}
                        <div className="glass-card rounded-[2rem] p-8 md:p-12 text-center relative overflow-hidden group transition-all duration-500 hover:bg-white/10">

                            <div className="relative z-10 space-y-8">
                                <div className="flex justify-center transform group-hover:-translate-y-2 transition-transform duration-500">
                                    <div className="p-4 rounded-full bg-white/5 border border-white/10 shadow-inner">
                                        {cards[step].icon}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-2xl font-light lowercase tracking-tight text-white">
                                        {cards[step].title}
                                    </h2>
                                    <p className="text-sm md:text-base text-white/70 font-light leading-relaxed lowercase">
                                        {cards[step].content}
                                    </p>
                                </div>

                                {/* Stepper */}
                                <div className="flex justify-center gap-3 pt-4">
                                    {cards.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setStep(i)}
                                            className={`h-1 rounded-full transition-all duration-500 ${step === i ? 'w-10 bg-white shadow-glow' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 text-center">
                            <button onClick={toggleMode} className="text-[9px] text-white/30 hover:text-white uppercase tracking-[0.3em] transition-all hover:scale-105">
                                Enter Digital Sanctuary
                            </button>
                        </div>
                    </div>
                ) : (
                    // --- SANCTUARY MODE ---
                    <div className="max-w-xl w-full text-center space-y-16 animate-fade-in">
                        <div className="flex justify-center animate-breathe">
                            <div className="p-6 rounded-full bg-white/5 border border-white/5 shadow-2xl backdrop-blur-sm">
                                {sanctuaryMode === 'professional' && <Compass className="w-16 h-16 text-amber-100/70" strokeWidth={0.5} />}
                                {sanctuaryMode === 'romantic' && <Feather className="w-16 h-16 text-rose-100/70" strokeWidth={0.5} />}
                                {sanctuaryMode === 'zen' && <Sparkles className="w-16 h-16 text-emerald-100/70" strokeWidth={0.5} />}
                            </div>
                        </div>

                        <div className="space-y-8 relative">
                            {/* Decorative line */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-transparent to-white/20" />

                            <p className="text-3xl md:text-5xl text-white/90 font-light leading-tight tracking-wide font-serif italic text-glow px-4">
                                "{sanctuaryMsg?.text}"
                            </p>

                            <div className="flex items-center justify-center gap-4 text-white/40 text-[10px] tracking-[0.4em] uppercase pt-4">
                                <span className="w-1 h-1 rounded-full bg-white/30" />
                                {sanctuaryMsg?.author}
                                <span className="w-1 h-1 rounded-full bg-white/30" />
                            </div>
                        </div>

                        <div className="fixed bottom-8 left-0 right-0 text-center">
                            <button onClick={toggleMode} className="text-[9px] text-white/20 hover:text-white uppercase tracking-[0.2em] transition-colors">
                                Return to Celebration
                            </button>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
};

export default App;
