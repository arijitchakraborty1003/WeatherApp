Weather App 🌦️

A cross-platform weather application built with React Native, TypeScript, and Expo Router, powered by the OpenWeather API.

🔗 GitHub Repository
👉 https://github.com/arijit100381/weather-app

🚀 Features
Real-time weather by current location 🌍

5-day / 3-hour forecast with detailed weather data 📊

Search cities with autocomplete 🔍

Favorite cities with quick access ⭐

Dynamic background based on weather ☁️

Responsive and smooth UI

🛠️ Setup Instructions
Prerequisites
Node.js & npm

Expo CLI (npm install -g expo-cli)

Android Studio (for emulator) or a physical device

OpenWeather API key (free: https://openweathermap.org/api)

Installation
Clone the repo:

bash
Copy
Edit
git clone https://github.com/arijit100381/weather-app.git
cd weather-app
Install dependencies:

bash
Copy
Edit
npm install
Add your OpenWeather API key:

Create a file .env in the root and add:

env
Copy
Edit
OPENWEATHER_API_KEY=your_api_key_here
Run the app:

bash
Copy
Edit
npx expo start
📱 APK Build (Android)
bash
Copy
Edit
npx expo run:android
Make sure your emulator is running or device is connected via USB with debugging enabled.

🖼️ Screenshots
(Add screenshots here – I can help if you provide some or want me to guide you through it.)

🧠 Approach
Built using the Expo ecosystem to streamline development.

Weather fetching logic separated into service files.

Forecast and current weather shown using dedicated UI components.

City suggestions are dynamically fetched and displayed using a dropdown overlay.

Favorites are persisted using AsyncStorage.

