import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Custom hook to fetch Fitbit stats: sleep, heart rate, steps, and calories
 * @param {"daily" | "weekly" | "monthly"} range
 */
const useFitbitStats = (range) => {
  console.log(range);

  const [stats, setStats] = useState({
    sleepAvg: 0,
    caloriesAvg: 0,
    heartRateAvg: 0,
    stepsAvg: 0,
    restingHR: [],
    stepsData: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      if (range === "daily") return;

      setLoading(true);
      setError(null);
      try {
        const token = await AsyncStorage.getItem("fitbit_token");
        if (!token) return;

        const today = dayjs().format("YYYY-MM-DD");
        let startDate =
          range === "weekly"
            ? dayjs().subtract(0, "day").format("YYYY-MM-DD")
            : dayjs().subtract(29, "day").format("YYYY-MM-DD");

        const headers = { Authorization: `Bearer ${token}` };

        // Sleep
        const sleepUrl = `https://api.fitbit.com/1.2/user/-/sleep/date/${startDate}/${today}.json`;
        const sleepRes = await axios.get(sleepUrl, { headers });
        const sleepMain = sleepRes.data.sleep.filter((s) => s.isMainSleep);
        const sleepMinutes = sleepMain.reduce(
          (sum, s) => sum + (s.minutesAsleep || 0),
          0
        );
        const sleepAvg = sleepMain.length ? sleepMinutes / sleepMain.length : 0;

        // Calories
        const caloriesUrl = `https://api.fitbit.com/1/user/-/activities/calories/date/${startDate}/${today}.json`;
        const caloriesRes = await axios.get(caloriesUrl, { headers });
        const caloriesData = caloriesRes.data["activities-calories"];
        const caloriesTotal = caloriesData.reduce(
          (sum, d) => sum + parseInt(d.value || 0),
          0
        );
        const caloriesAvg = caloriesData.length
          ? caloriesTotal / caloriesData.length
          : 0;

        // Steps
        const stepsUrl = `https://api.fitbit.com/1/user/-/activities/steps/date/${startDate}/${today}.json`;
        const stepsRes = await axios.get(stepsUrl, { headers });
        const stepsData = stepsRes.data["activities-steps"];
        const stepsTotal = stepsData.reduce(
          (sum, d) => sum + parseInt(d.value || 0),
          0
        );
        const stepsAvg = stepsData.length ? stepsTotal / stepsData.length : 0;

        // Heart rate
        const heartUrl = `https://api.fitbit.com/1/user/-/activities/heart/date/${startDate}/${today}.json`;
        const heartRes = await axios.get(heartUrl, { headers });
        const heartData = heartRes.data["activities-heart"];
        const restingHR = heartData
          .map((d) => d.value.restingHeartRate)
          .filter(Boolean);
        const heartRateAvg = restingHR.length
          ? restingHR.reduce((sum, v) => sum + v, 0) / restingHR.length
          : 0;

        setStats({
          sleepAvg: parseFloat(sleepAvg.toFixed(1)),
          caloriesAvg: parseFloat(caloriesAvg.toFixed(1)),
          heartRateAvg: parseFloat(heartRateAvg.toFixed(1)),
          restingHR,
          stepsData,
          stepsAvg: parseFloat(stepsAvg.toFixed(1)),
        });
      } catch (err) {
        console.error(
          "Fitbit stats error:",
          err?.response?.data || err.message
        );
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [range]);

  // DAILY DATA HOOK
  useEffect(() => {
    if (range !== "daily") return;

    const fetchDailyStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = await AsyncStorage.getItem("fitbit_token");
        if (!token) return;

        const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");
        const today = dayjs().format("YYYY-MM-DD");
        const headers = { Authorization: `Bearer ${token}` };

        // Sleep
        const sleepUrl = `https://api.fitbit.com/1.2/user/-/sleep/date/${yesterday}.json`;
        const sleepRes = await axios.get(sleepUrl, { headers });

        const stages = sleepRes.data?.summary?.stages || {};
        const sleepMinutes = sleepRes.data?.summary?.totalMinutesAsleep || 0;

        const caloriesUrl = `https://api.fitbit.com/1/user/-/activities/calories/date/${today}/${today}.json`;
        const caloriesRes = await axios.get(caloriesUrl, { headers });
        const caloriesData = caloriesRes.data["activities-calories"];

        const calories = parseInt(caloriesData?.[0]?.value || 0);

        // // Steps
        const stepsUrl = `https://api.fitbit.com/1/user/-/activities/steps/date/${today}/${today}.json`;
        const stepsRes = await axios.get(stepsUrl, { headers });
        const steps = parseInt(
          stepsRes.data["activities-steps"]?.[0]?.value || 0
        );

        // // Heart rate
        const heartUrl = `https://api.fitbit.com/1/user/-/activities/heart/date/${today}/${today}.json`;
        const heartRes = await axios.get(heartUrl, { headers });
        const heartData = heartRes.data["activities-heart"];
        const restingHR = heartData?.[0]?.value?.restingHeartRate || 0;

        setStats({
          sleepMinutes: parseFloat(sleepMinutes.toFixed(1)),
          sleepStages: {
            deep: stages.deep || 0,
            light: stages.light || 0,
            rem: stages.rem || 0,
            wake: stages.wake || 0,
          },
          calories,
          steps,
          restingHR,
        });
      } catch (err) {
        console.error(
          "Daily Fitbit stats error:",
          err?.response?.data || err.message
        );
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyStats();
  }, [range]);

  return { stats, loading, error };
};

export default useFitbitStats;
