
export const getCuscoWeather = async () => {
    try {
        const url = 'https://api.open-meteo.com/v1/forecast?latitude=-13.52264&longitude=-71.96734&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,is_day,precipitation,cloud_cover,wind_speed_10m&timezone=America/Lima';

        const response = await fetch(url);
        const data = await response.json();
        const current = data.current;

        // Interpret Weather Code (WMO)
        const code = current.weather_code;
        const isDay = current.is_day === 1;

        // Determine Scenario
        let scenario = 'A'; // Default: Andean Energy
        let moodDescription = 'Clear & Vibrant';

        // Scenario C: Night Navigation (Any condition at night, or specifically clear night)
        // Check Night first, but "Bad Weather" at night might still feel "Cozy" (B) or "Stormy".
        // Let's stick to the plan: 
        // A: Sun/Day (Clear)
        // B: Rain/Cloudy/Bad (Any time)
        // C: Night (Clear/Stars)

        if (!isDay && [0, 1, 2].includes(code)) {
            scenario = 'C';
            moodDescription = 'Starry Night';
        } else if ([51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(code) || code > 45) {
            // Rain, Drizzle, Showers, Thunderstorm, Fog
            scenario = 'B';
            moodDescription = 'Cozy Rain';
        } else if ([3].includes(code)) {
            // Overcast
            scenario = 'B';
            moodDescription = 'Cloudy Comfort';
        } else {
            // Default Day/Clear (0, 1, 2 during day)
            scenario = 'A';
            moodDescription = 'Andean Sun';
        }

        return {
            temp: current.temperature_2m,
            feelsLike: current.apparent_temperature,
            humidity: current.relative_humidity_2m,
            isDay: isDay,
            code: current.weather_code,
            scenario: scenario,
            description: moodDescription
        };

    } catch (error) {
        console.error("Failed to fetch weather:", error);
        // Fallback to a safe default (Scenario A)
        return {
            temp: 20,
            feelsLike: 20,
            humidity: 50,
            isDay: true,
            code: 0,
            scenario: 'A',
            description: 'Connection Lost (Simulated)'
        };
    }
};
