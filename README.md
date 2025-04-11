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

npm install

Add your OpenWeather API key:

Create a file .env in the root and add:

OPENWEATHER_API_KEY=your_api_key_here

Run the app:

npx expo start

📱 APK Build (Android)

npx expo run:android
Make sure your emulator is running or device is connected via USB with debugging enabled.

🖼️ Screenshots
![Simulator Screenshot - iPhone SE (3rd generation) - 2025-04-11 at 12 48 37](https://github.com/user-attachments/assets/28989710-8df5-455c-b292-2bc17d78a3ad)
![Simulator Screenshot - iPhone SE (3rd generation) - 2025-04-11 at 12 48 37 #2](https://github.com/user-attachments/assets/b0c663fc-92cf-497e-adb7-011441fe851b)
<img width="299" alt="Screenshot 2025-04-11 at 4 12 53 PM" src="https://github.com/user-attachments/assets/b0417b21-fc95-45d4-8260-1e51c80a496a" />
<img width="299" alt="Screenshot 2025-04-11 at 4 12 36 PM" src="https://github.com/user-attachments/assets/4ea185b2-5a0e-4fce-9a50-b27131f83ffc" />


🧠 Approach
Built using the Expo ecosystem to streamline development.

Weather fetching logic separated into service files.

Forecast and current weather shown using dedicated UI components.

City suggestions are dynamically fetched and displayed using a dropdown overlay.

Favorites are persisted using AsyncStorage.

