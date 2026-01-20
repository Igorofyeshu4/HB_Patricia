import React, { useState } from 'react';
import { Gift, Heart, MapPin, Star, Wind, Anchor } from 'lucide-react';

const App = () => {
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: "happy birthday, tornado. 🌪️",
            content: "no wonder the sun is shining brighter today. the world is celebrating the day you arrived.",
            icon: <Wind className="w-12 h-12 text-blue-400" />,
            bg: "bg-slate-900"
        },
        {
            title: "a gift of facts, not just words.",
            content: "i know you value actions. so today, i'm giving you a 'digital voucher' for our future meeting. it includes 100% of my attention and a dinner anywhere you choose.",
            icon: <Gift className="w-12 h-12 text-pink-400" />,
            bg: "bg-indigo-900"
        },
        {
            title: "the anchor and the tornado.",
            content: "i'm not here to change your path or stop your travel. i'm here to be the place where you can always come back to rest. whenever you're ready for the book, i'll be here to read it with you.",
            icon: <Anchor className="w-12 h-12 text-teal-400" />,
            bg: "bg-cyan-900"
        },
        {
            title: "enjoy your beach day, princess.",
            content: "don't worry about being 'quiet' or 'moody' today. just be you. you look beautiful when you're free. i've got you. ❤️",
            icon: <Heart className="w-12 h-12 text-red-400" />,
            bg: "bg-rose-900"
        }
    ];

    return (
        <div className={`min-h-screen ${steps[step].bg} text-white flex flex-col items-center justify-center p-6 transition-colors duration-700 font-sans`}>
            <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="flex justify-center">
                    {steps[step].icon}
                </div>

                <h1 className="text-3xl font-light tracking-tight lowercase">
                    {steps[step].title}
                </h1>

                <p className="text-lg text-slate-300 leading-relaxed lowercase italic">
                    "{steps[step].content}"
                </p>

                <div className="pt-8 flex flex-col items-center space-y-4">
                    {step < steps.length - 1 ? (
                        <button
                            onClick={() => setStep(step + 1)}
                            className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full transition-all text-sm tracking-widest uppercase"
                        >
                            next part →
                        </button>
                    ) : (
                        <button
                            onClick={() => setStep(0)}
                            className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full transition-all text-sm tracking-widest uppercase underline"
                        >
                            read it again
                        </button>
                    )}

                    <div className="flex space-x-2">
                        {steps.map((_, i) => (
                            <div
                                key={i}
                                className={`w-2 h-2 rounded-full transition-all ${i === step ? 'bg-white w-4' : 'bg-white/20'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="fixed bottom-8 text-[10px] text-white/30 tracking-[0.2em] uppercase">
                created with care for patricia • 20.01.2026
            </div>
        </div>
    );
};

export default App;
