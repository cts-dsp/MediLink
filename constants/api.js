import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

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

export { fetchSleepLast7Days, fetchSleepLast30Days };
