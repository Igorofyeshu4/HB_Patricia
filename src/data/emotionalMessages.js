
export const emotionalMessages = [
    // SCENARIO A: ANDEAN ENERGY (Sun/Day/Clear)
    {
        id: 'a1',
        scenario: 'A',
        text: {
            en: "The sun over the Andes shines for you today. Let its warmth reach you across the ocean.",
            es: "El sol sobre los Andes brilla para ti hoy. Deja que su calor te alcance a través del océano."
        }
    },
    {
        id: 'a2',
        scenario: 'A',
        text: {
            en: "Cusco is vibrant and golden right now, just like your energy when you smile.",
            es: "Cusco está vibrante y dorado ahora mismo, igual que tu energía cuando sonríes."
        }
    },

    // SCENARIO B: COZY & NOSTALGIA (Rain/Cloudy/Fog)
    {
        id: 'b1',
        scenario: 'B',
        text: {
            en: "Even storms bring life. The rain in Cusco whispers that it's okay to rest.",
            es: "Incluso las tormentas traen vida. La lluvia en Cusco susurra que está bien descansar."
        }
    },
    {
        id: 'b2',
        scenario: 'B',
        text: {
            en: "The clouds are hugging the mountains today. A cozy embrace sent from home.",
            es: "Las nubes abrazan las montañas hoy. Un abrazo acogedor enviado desde casa."
        }
    },

    // SCENARIO C: NIGHT NAVIGATION (Night/Clear)
    {
        id: 'c1',
        scenario: 'C',
        text: {
            en: "The southern stars are watching over you. We look at the same sky, no matter the distance.",
            es: "Las estrellas del sur te cuidan. Miramos el mismo cielo, sin importar la distancia."
        }
    },
    {
        id: 'c2',
        scenario: 'C',
        text: {
            en: "Cusco sleeps peacefully under the moonlight, waiting for your return.",
            es: "Cusco duerme pacíficamente bajo la luz de la luna, esperando tu regreso."
        }
    }
];

export const getRandomMessage = (scenario) => {
    const candidates = emotionalMessages.filter(m => m.scenario === scenario);
    if (candidates.length === 0) return emotionalMessages[0];
    return candidates[Math.floor(Math.random() * candidates.length)];
};
