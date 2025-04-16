import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const saveProfileUrl = async (id, url) => {
  try {
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, {
      profileUrl: url,
    });
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, msg: e.message };
  }
};
export const updateProflie = async (id, data) => {
  try {
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, {
      ...data,
    });
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, msg: e.message };
  }
};

// Helper function to get past dates
const getPastDate = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
};

// Function to fetch sleep data and calculate average for last 7 days
const fetchSleepLast7Days = async () => {
  try {
    const token = await AsyncStorage.getItem("fitbit_token");
    if (!token) throw new Error("No Fitbit token found");

    const endDate = getPastDate(0); // Today
    const startDate = getPastDate(6); // 7 days ago

    const response = await fetch(
      `https://api.fitbit.com/1.2/user/-/sleep/date/${startDate}/${endDate}.json`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (!data.sleep || data.sleep.length === 0) return { average: 0, total: 0 };

    const totalSleepMinutes = data.sleep.reduce(
      (sum, entry) => sum + entry.minutesAsleep,
      0
    );

    const averageSleep = totalSleepMinutes / data.sleep.length;
    return {
      total: totalSleepMinutes,
      average: (averageSleep / 60).toFixed(2), // Convert minutes to hours
    };
  } catch (error) {
    console.error("Error fetching sleep data for last 7 days:", error);
    return { average: 0, total: 0 };
  }
};

// Function to fetch sleep data and calculate average for last 30 days
const fetchSleepLast30Days = async () => {
  try {
    const token = await AsyncStorage.getItem("fitbit_token");
    if (!token) throw new Error("No Fitbit token found");

    const endDate = getPastDate(0); // Today
    const startDate = getPastDate(29); // 30 days ago

    const response = await fetch(
      `https://api.fitbit.com/1.2/user/-/sleep/date/${startDate}/${endDate}.json`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (!data.sleep || data.sleep.length === 0) return { average: 0, total: 0 };

    const totalSleepMinutes = data.sleep.reduce(
      (sum, entry) => sum + entry.minutesAsleep,
      0
    );

    const averageSleep = totalSleepMinutes / data.sleep.length;
    return {
      total: totalSleepMinutes,
      average: (averageSleep / 60).toFixed(2), // Convert minutes to hours
    };
  } catch (error) {
    console.error("Error fetching sleep data for last 30 days:", error);
    return { average: 0, total: 0 };
  }
};

// Example usage
// fetchSleepLast7Days().then((data) => console.log("Last 7 Days Sleep:", data));
// fetchSleepLast30Days().then((data) => console.log("Last 30 Days Sleep:", data));

// Replace with your actual Gemini API key
const API_KEY = "AIzaSyATmXR9fQQz7euoaznxrd9N_QDmKTxINcI";
const genAI = new GoogleGenerativeAI(API_KEY);

// The actual function to call Gemini
export const getHealthInsightsFromGemini = async (userData) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
You are a health and wellness expert. A user has shared their daily fitness and health stats with you. These include calories burned, resting heart rate, sleep duration and stages, and step count.

Here is the user's data:
${JSON.stringify(userData, null, 2)}

Based on this data, provide clear, personalized insights and suggestions for the user. Your response should be structured, friendly, and motivational. Include:

1. **Summary of the user's current health status** based on the provided data.
2. **Personalized insights** on each of the metrics (calories, resting heart rate, sleep quality, step count).
3. **Suggestions for improvement**, if any, especially related to sleep, activity levels, or heart health.
4. **Friendly tone** and encouraging language—treat this like a virtual fitness coach giving daily feedback.
5. If anything stands out (e.g., low deep sleep, high resting HR, low steps), highlight it with a simple explanation and tip.

Example output format:
{
  summary: "You're on track with your fitness! Great job staying active today.",
  insights: {
    calories: "You burned 2407 kcal today, which is great for maintaining or slightly reducing weight.",
    restingHR: "Your resting heart rate of 60 bpm is within a healthy range—keep it up!",
    sleep: "You slept for 8.5 hours with 1.5 hours of deep sleep—great recovery!",
    steps: "You took 6847 steps today—almost to 10k! Try a walk after dinner to hit your goal."
  },
  suggestions: [
    "Aim for at least 7000–8000 steps daily to boost cardiovascular health.",
    "Try to improve deep sleep with a consistent bedtime and limiting screens before bed.",
    "Keep hydrating and fuel your body with nutrient-dense foods to support your activity level."
  ],
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Try parsing JSON part of the response
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}") + 1;
    const jsonString = text.slice(jsonStart, jsonEnd);

    const healthInsights = JSON.parse(jsonString);

    return healthInsights;
  } catch (error) {
    console.error("Gemini API error:", error);
    return {
      summary: "Unable to analyze your health data right now.",
      insights: {},
      suggestions: [],
      motivation: "Try again later, and keep up the healthy habits!"
    };
  }
};

export { fetchSleepLast7Days, fetchSleepLast30Days };
