import React, { useState } from 'react';
import { Gift, Heart, Wind, Anchor, Flower2 } from 'lucide-react';

const App = () => {
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: "happy birthday, tornado. 🌪️",
            content: "no wonder the sun is shining brighter today. the world is celebrating the day you arrived.",
            icon: <Wind className="w-16 h-16 text-cyan-200 drop-shadow-[0_0_15px_rgba(165,243,252,0.5)]" />,
        },
        {
            title: "a gift of facts, not just words.",
            content: "i know you value actions. so today, i'm giving you a 'digital voucher' for our future meeting. it includes 100% of my attention and a dinner anywhere you choose.",
            icon: <Gift className="w-16 h-16 text-pink-300 drop-shadow-[0_0_15px_rgba(249,168,212,0.5)]" />,
        },
        {
            title: "the anchor and the tornado.",
            content: "i'm not here to change your path or stop your travel. i'm here to be the place where you can always come back to rest. whenever you're ready for the book, i'll be here to read it with you.",
            icon: <Anchor className="w-16 h-16 text-teal-200 drop-shadow-[0_0_15px_rgba(153,246,228,0.5)]" />,
        },
        {
            title: "enjoy your beach day, princess.",
            content: "don't worry about being 'quiet' or 'moody' today. just be you. you look beautiful when you're free. i've got you. ❤️",
            icon: <Heart className="w-16 h-16 text-rose-300 drop-shadow-[0_0_15px_rgba(253,164,175,0.5)]" />,
        }
    ];

    return (
        <div className="min-h-screen ocean-bg text-white relative overflow-hidden font-sans selection:bg-cyan-500/30">
            {/* Floating Flowers Background Layer */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute opacity-10 animate-float"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${10 + Math.random() * 10}s`
                        }}
                    >
                        <Flower2 size={100 + Math.random() * 150} />
                    </div>
                ))}
            </div>

            {/* Main Content Container with Rocking Motion */}
            <div className="flex flex-col items-center justify-center min-h-screen p-6 relative z-10 animate-rocking">
                <div className="max-w-md w-full glass-card rounded-3xl p-12 text-center space-y-10 transition-all duration-700 hover:scale-[1.02]">

                    <div className="flex justify-center animate-float">
                        {steps[step].icon}
                    </div>

                    <h1 className="text-4xl font-extralight tracking-tight lowercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 to-white drop-shadow-sm">
                        {steps[step].title}
                    </h1>

                    <p className="text-xl text-cyan-50/90 leading-relaxed lowercase font-light italic tracking-wide">
                        "{steps[step].content}"
                    </p>

                    <div className="pt-8 flex flex-col items-center space-y-6">
                        <div className="flex space-x-3">
                            {steps.map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? 'bg-cyan-200 w-8 shadow-[0_0_10px_rgba(165,243,252,0.5)]' : 'bg-white/20 w-2'}`}
                                />
                            ))}
                        </div>

                        {step < steps.length - 1 ? (
                            <button
                                onClick={() => setStep(step + 1)}
                                className="group px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full transition-all text-xs tracking-[0.2em] uppercase text-cyan-100 hover:text-white hover:border-cyan-200/50 hover:shadow-[0_0_20px_rgba(165,243,252,0.2)]"
                            >
                                <span className="flex items-center gap-2">
                                    next part <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </span>
                            </button>
                        ) : (
                            <button
                                onClick={() => setStep(0)}
                                className="px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full transition-all text-xs tracking-[0.2em] uppercase text-cyan-100 hover:text-white underline underline-offset-4"
                            >
                                read it again
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="fixed bottom-8 w-full text-center text-[10px] text-cyan-100/30 tracking-[0.3em] uppercase z-20">
                created with care for patricia • 20.01.2026
            </div>
        </div>
    );
};

export default App;
