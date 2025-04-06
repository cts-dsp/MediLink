import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import HeartRateChart from "../../components/Health/Heart";
import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SleepTrackingChart from "../../components/Health/Sleep";
import { heightPercentageToDP } from "react-native-responsive-screen";
import {
  ActivityIndicator,
  SegmentedButtons,
  useTheme,
} from "react-native-paper";
import StepsTracking from "../../components/Health/steps";
import CaloriesTracking from "../../components/Health/calories";
import RNText from "../../components/RNText";
import * as Linking from "expo-linking";
import { useFocusEffect } from "expo-router";
import dayjs from "dayjs";
import axios from "axios";

// const config = {
//   clientId: "23Q45B", // Replace with your Fitbit Client ID
//   scopes: ["heartrate", "activity", "profile", "sleep"],
//   clientSecret: "8d5e6e958053897f0b14a5e1980992a4",
// };

const config = {
  clientId: "23QCCS", // Replace with your Fitbit Client ID
  scopes: ["heartrate", "activity", "profile", "sleep"],
  clientSecret: "6d4040ab03bcbf8a9214a781675cbd4b",
};

// const getRedirectUri = () => {
//   const scheme = Constants.manifest?.extra?.scheme || "medi-link"; // Replace with your app's scheme
//   // return `${scheme}:/redirect`;
//   return "medilink://oauthredirect";
// };
const redirectUri = Linking.createURL("oauthredirect");

// const redirectUri = getRedirectUri();
// console.log("Redirect URI:", redirectUri);

const Health = () => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(false);

  const [authToken, setAuthToken] = useState(null);

  const [weeklyStats, setWeeklyStats] = useState({
    sleepAvg: 0,
    caloriesAvg: 0,
    heartRateAvg: 0,
    stepsAvg: 0,
    restingHR: [],
    stepsData: [],
  });

  const [monthlyStats, setMonthlyStats] = useState({
    sleepAvg: 0,
    caloriesAvg: 0,
    heartRateAvg: 0,
    stepsAvg: 0,
    restingHR: [],
    stepsData: [],
  });
  const [dailyStats, setDailyStats] = useState({
    sleepMinutes: 0,
    sleepStages: {
      deep: 0,
      light: 0,
      rem: 0,
      wake: 0,
    },
    calories: 0,
    steps: 0,
    restingHR: 0,
  });
  const [error, setError] = useState(null);
  const [range, setRange] = useState("daily");
  console.log(
    "Range selected:",
    range,
    "Daily Stats:",
    dailyStats,
    "weeklyStats:",
    weeklyStats
  );

  // clear token from storage
  const clearToken = async () => {
    try {
      await AsyncStorage.removeItem("fitbit_token");
      setAuthToken(null);
      setUserData(false);
    } catch (error) {
      console.error("Error clearing token:", error);
    }
  };
  const fetchStoredToken = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("fitbit_token");
      if (token) {
        setAuthToken(token);
      }
    } catch (error) {
      console.error("Error fetching token from storage:", error);
    } finally {
      setLoading(false);
    }
  };

  /// based on the range fetch weeklyStats
  useEffect(() => {
    if (authToken) {
      console.log(
        "Fetching data 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀"
      );

      if (range === "daily") {
        if (dailyStats?.steps === 0) {
          console.log("Fetching daily stats...");

          fetchDailyStats();
        }
      } else if (range === "weekly") {
        if (weeklyStats?.stepsData?.length === 0) {
          console.log("Fetching weekly stats...");
          fetchStats();
        }
        //  else {
        //   {
        //     setWeeklyStats({
        //       caloriesAvg: 2190.4,
        //       heartRateAvg: 60,
        //       restingHR: [61, 60, 60, 59, 60, 60],
        //       sleepAvg: 429.8,
        //       stepsAvg: 7295,
        //       stepsData: [
        //         { dateTime: "2025-04-01", value: "8548" },
        //         { dateTime: "2025-04-02", value: "8113" },
        //         { dateTime: "2025-04-03", value: "6420" },
        //         { dateTime: "2025-04-04", value: "12378" },
        //         { dateTime: "2025-04-05", value: "13233" },
        //         { dateTime: "2025-04-06", value: "2373" },
        //         { dateTime: "2025-04-07", value: "0" },
        //       ],
        //     });
        //     setUserData(true);
        //   }
        // }
      } else if (range === "monthly") {
        if (monthlyStats?.stepsData?.length === 0) {
          console.log("Fetching monthly stats...");
          fetchStats();
        }
        // else {
        //   setMonthlyStats({
        //     caloriesAvg: 2551.3,
        //     heartRateAvg: 59.3,
        //     restingHR: [
        //       60, 60, 60, 60, 59, 58, 57, 58, 60, 60, 60, 58, 57, 58, 60, 60,
        //       59, 58, 57, 59, 60, 61, 60, 59, 61, 60, 60, 59, 60, 60,
        //     ],
        //     sleepAvg: 402.1,
        //     stepsAvg: 8431.5,
        //     stepsData: [
        //       { dateTime: "2025-03-08", value: "12407" },
        //       { dateTime: "2025-03-09", value: "5989" },
        //       { dateTime: "2025-03-10", value: "6670" },
        //       { dateTime: "2025-03-11", value: "7221" },
        //       { dateTime: "2025-03-12", value: "8569" },
        //       { dateTime: "2025-03-13", value: "5147" },
        //       { dateTime: "2025-03-14", value: "8386" },
        //       { dateTime: "2025-03-15", value: "16196" },
        //       { dateTime: "2025-03-16", value: "9166" },
        //       { dateTime: "2025-03-17", value: "6647" },
        //       { dateTime: "2025-03-18", value: "7197" },
        //       { dateTime: "2025-03-19", value: "10303" },
        //       { dateTime: "2025-03-20", value: "5300" },
        //       { dateTime: "2025-03-21", value: "8666" },
        //       { dateTime: "2025-03-22", value: "11631" },
        //       { dateTime: "2025-03-23", value: "12319" },
        //       { dateTime: "2025-03-24", value: "4744" },
        //       { dateTime: "2025-03-25", value: "4229" },
        //       { dateTime: "2025-03-26", value: "8630" },
        //       { dateTime: "2025-03-27", value: "6903" },
        //       { dateTime: "2025-03-28", value: "10320" },
        //       { dateTime: "2025-03-29", value: "5296" },
        //       { dateTime: "2025-03-30", value: "9874" },
        //       { dateTime: "2025-03-31", value: "10974" },
        //       { dateTime: "2025-04-01", value: "8548" },
        //       { dateTime: "2025-04-02", value: "8113" },
        //       { dateTime: "2025-04-03", value: "6420" },
        //       { dateTime: "2025-04-04", value: "12378" },
        //       { dateTime: "2025-04-05", value: "13233" },
        //       { dateTime: "2025-04-06", value: "1468" },
        //     ],
        //   });
        //   setUserData(true);
        // }
      }
    }
  }, [authToken, range]);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: config.clientId,
      responseType: "code", // Change from 'token' to 'code'
      scopes: config.scopes,
      redirectUri,
    },
    { authorizationEndpoint: "https://www.fitbit.com/oauth2/authorize" }
  );

  useEffect(() => {
    if (response?.type === "success") {
      const authCode = response.params.code;
      console.log("Authorization Code:", authCode);
      // Exchange this code for an access token
      exchangeCodeForToken(authCode);
    }
  }, [response]);

  const exchangeCodeForToken = async (authCode) => {
    const tokenUrl = "https://api.fitbit.com/oauth2/token";

    const authHeader = `Basic ${btoa(
      `${config.clientId}:${config.clientSecret}`
    )}`;

    const body = new URLSearchParams();
    body.append("client_id", config.clientId);
    body.append("grant_type", "authorization_code");
    body.append("code", authCode);
    body.append("redirect_uri", redirectUri);
    if (request?.codeVerifier) {
      body.append("code_verifier", request.codeVerifier);
    }
    try {
      const response = await fetch(tokenUrl, {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Access Token:", data.access_token);
        await AsyncStorage.setItem("fitbit_token", data.access_token);
        setAuthToken(data.access_token);
      } else {
        console.error("Error:", data);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchStoredToken();
    }, [])
  );
  const fetchDailyStats = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = await AsyncStorage.getItem("fitbit_token");
      if (!token) throw new Error("No Fitbit token found");

      const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");
      const today = dayjs().format("YYYY-MM-DD");
      const headers = { Authorization: `Bearer ${token}` };

      const safeGet = async (url) => {
        try {
          const res = await axios.get(url, { headers });
          if (res.status === 200) return res.data;
          else throw res;
        } catch (err) {
          const data = err?.response?.data;
          const errorMessage = data?.errors?.[0]?.errorType || "Unknown error";

          console.error("Fitbit API error:", data || err.message);

          if (["expired_token", "invalid_token"].includes(errorMessage)) {
            Alert.alert(
              errorMessage === "expired_token"
                ? "Session Expired"
                : "Invalid Token",
              `Your session has expired. Please re-authenticate.`,
              [{ text: "OK", onPress: clearToken }],
              { cancelable: false }
            );
          } else {
            Alert.alert(
              "Error",
              `An error occurred: ${errorMessage}`,
              [{ text: "OK", onPress: clearToken }],
              { cancelable: false }
            );
          }

          throw new Error(errorMessage);
        }
      };

      // Sleep
      const sleepData = await safeGet(
        `https://api.fitbit.com/1.2/user/-/sleep/date/${yesterday}.json`
      );
      const stages = sleepData?.summary?.stages || {};
      const sleepMinutes = sleepData?.summary?.totalMinutesAsleep || 0;

      // Calories
      const caloriesData = await safeGet(
        `https://api.fitbit.com/1/user/-/activities/calories/date/${today}/${today}.json`
      );
      const calories = parseInt(
        caloriesData["activities-calories"]?.[0]?.value || 0
      );

      // Steps
      const stepsData = await safeGet(
        `https://api.fitbit.com/1/user/-/activities/steps/date/${today}/${today}.json`
      );
      const steps = parseInt(stepsData["activities-steps"]?.[0]?.value || 0);

      // Heart Rate
      const heartData = await safeGet(
        `https://api.fitbit.com/1/user/-/activities/heart/date/${today}/${today}.json`
      );
      const restingHR =
        heartData["activities-heart"]?.[0]?.value?.restingHeartRate || 0;

      setDailyStats({
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
      setUserData(true);
    } catch (err) {
      console.error("Daily Fitbit stats error:", err.message || err);
      setError(err);
      Alert.alert(
        "Network Error",
        "An error occurred while fetching daily stats. Please try again.",
        [{ text: "OK", onPress: clearToken }],
        { cancelable: false }
      );
    } finally {
      setLoading(false);
    }
  };
  const fetchStats = async () => {
    if (range === "daily") return;

    setLoading(true);
    setError(null);

    try {
      const token = await AsyncStorage.getItem("fitbit_token");
      if (!token) throw new Error("No Fitbit token found");

      const today = dayjs().format("YYYY-MM-DD");
      const startDate =
        range === "weekly"
          ? dayjs().subtract(6, "day").format("YYYY-MM-DD")
          : dayjs().subtract(29, "day").format("YYYY-MM-DD");

      const headers = { Authorization: `Bearer ${token}` };

      // Helper to handle API calls
      const safeGet = async (url) => {
        try {
          const res = await axios.get(url, { headers });
          if (res.status === 200) return res.data;
          else throw res;
        } catch (err) {
          const data = err?.response?.data;
          const errorMessage = data?.errors?.[0]?.errorType || "Unknown error";

          console.error("Fitbit API error:", data || err.message);

          if (["expired_token", "invalid_token"].includes(errorMessage)) {
            Alert.alert(
              errorMessage === "expired_token"
                ? "Session Expired"
                : "Invalid Token",
              `Your session has expired. Please re-authenticate.`,
              [{ text: "OK", onPress: clearToken }],
              { cancelable: false }
            );
          } else {
            Alert.alert(
              "Error",
              `An error occurred: ${errorMessage}`,
              [{ text: "OK", onPress: clearToken }],
              { cancelable: false }
            );
          }

          throw new Error(errorMessage);
        }
      };

      // Sleep
      const sleepData = await safeGet(
        `https://api.fitbit.com/1.2/user/-/sleep/date/${startDate}/${today}.json`
      );
      const sleepMain = sleepData.sleep.filter((s) => s.isMainSleep);
      const sleepMinutes = sleepMain.reduce(
        (sum, s) => sum + (s.minutesAsleep || 0),
        0
      );
      const sleepAvg = sleepMain.length ? sleepMinutes / sleepMain.length : 0;

      // Calories
      const caloriesData = await safeGet(
        `https://api.fitbit.com/1/user/-/activities/calories/date/${startDate}/${today}.json`
      );
      const caloriesArray = caloriesData["activities-calories"];
      const caloriesTotal = caloriesArray.reduce(
        (sum, d) => sum + parseInt(d.value || 0),
        0
      );
      const caloriesAvg = caloriesArray.length
        ? caloriesTotal / caloriesArray.length
        : 0;

      // Steps
      const stepsData = await safeGet(
        `https://api.fitbit.com/1/user/-/activities/steps/date/${startDate}/${today}.json`
      );
      const stepsArray = stepsData["activities-steps"];
      const stepsTotal = stepsArray.reduce(
        (sum, d) => sum + parseInt(d.value || 0),
        0
      );
      const stepsAvg = stepsArray.length ? stepsTotal / stepsArray.length : 0;

      // Heart rate
      const heartData = await safeGet(
        `https://api.fitbit.com/1/user/-/activities/heart/date/${startDate}/${today}.json`
      );
      const heartArray = heartData["activities-heart"];
      const restingHR = heartArray
        .map((d) => d.value.restingHeartRate)
        .filter(Boolean);
      const heartRateAvg = restingHR.length
        ? restingHR.reduce((sum, v) => sum + v, 0) / restingHR.length
        : 0;

      if (range === "weekly") {
        setWeeklyStats({
          sleepAvg: parseFloat(sleepAvg.toFixed(1)),
          caloriesAvg: parseFloat(caloriesAvg.toFixed(1)),
          heartRateAvg: parseFloat(heartRateAvg.toFixed(1)),
          restingHR,
          stepsData: stepsArray,
          stepsAvg: parseFloat(stepsAvg.toFixed(1)),
        });
      } else if (range === "monthly") {
        setMonthlyStats({
          sleepAvg: parseFloat(sleepAvg.toFixed(1)),
          caloriesAvg: parseFloat(caloriesAvg.toFixed(1)),
          heartRateAvg: parseFloat(heartRateAvg.toFixed(1)),
          restingHR,
          stepsData: stepsArray,
          stepsAvg: parseFloat(stepsAvg.toFixed(1)),
        });
      }
      setUserData(true);
    } catch (error) {
      console.error("Network or parsing error:", error);
      setError(error);
      Alert.alert(
        "Network Error",
        "An error occurred while fetching Fitbit data. Please try again.",
        [{ text: "OK", onPress: clearToken }],
        { cancelable: false }
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <View
      style={{
        backgroundColor: colors.background,
        flex: 1,
        height: heightPercentageToDP(100),
        padding: 16,
        gap: 20,
      }}
    >
      {authToken !== null ? (
        <>
          {userData === false ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 16,
                gap: 20,
                height: heightPercentageToDP(100),
                width: "100%",
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",

                backgroundColor: colors.card,
              }}
            >
              <ActivityIndicator
                size="large"
                color={colors.primary}
                style={{ marginTop: 20 }}
              />
            </View>
          ) : (
            <>
              <SegmentedButtons
                value={range}
                onValueChange={setRange}
                style={{
                  backgroundColor: colors.card,
                }}
                buttons={[
                  {
                    value: "daily",
                    label: "Daily",
                    style: {
                      backgroundColor:
                        range === "daily" ? colors.primary : colors.card,
                    },
                    labelStyle: {
                      color: range === "daily" ? colors.black : colors.text,
                      fontFamily: range === "daily" ? "M-Bold" : "M-Medium",
                      fontSize: 16,
                    },
                  },
                  {
                    value: "weekly",
                    label: "Weekly",
                    style: {
                      backgroundColor:
                        range === "weekly" ? colors.primary : colors.card,
                    },
                    labelStyle: {
                      color: range === "weekly" ? colors.black : colors.text,
                      fontFamily: range === "weekly" ? "M-Bold" : "M-Medium",
                      fontSize: 16,
                    },
                  },
                  {
                    value: "monthly",
                    label: "Monthly",
                    style: {
                      backgroundColor:
                        range === "monthly" ? colors.primary : colors.card,
                    },
                    labelStyle: {
                      color: range === "monthly" ? colors.black : colors.text,
                      fontFamily: range === "monthly" ? "M-Bold" : "M-Medium",
                      fontSize: 16,
                    },
                  },
                ]}
              />

              {loading && (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 16,
                    width: "100%",
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator
                    size="large"
                    color={colors.primary}
                    style={{ marginTop: 20 }}
                  />
                </View>
              )}
              <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              >
                <View
                  style={{
                    flex: 1,
                    gap: 20,
                  }}
                >
                  <HeartRateChart
                    range={range}
                    weeklyStats={weeklyStats}
                    monthlyStats={monthlyStats}
                    dailyStats={dailyStats}
                  />
                  <StepsTracking
                    range={range}
                    weeklyStats={weeklyStats}
                    monthlyStats={monthlyStats}
                    dailyStats={dailyStats}
                  />
                  <SleepTrackingChart
                    range={range}
                    weeklyStats={weeklyStats}
                    monthlyStats={monthlyStats}
                    dailyStats={dailyStats}
                  />
                  <CaloriesTracking
                    range={range}
                    weeklyStats={weeklyStats}
                    monthlyStats={monthlyStats}
                    dailyStats={dailyStats}
                  />
                </View>
              </ScrollView>
            </>
          )}
        </>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
            gap: 20,
            backgroundColor: colors.card,
            borderRadius: 18,
          }}
        >
          <RNText font={"M-Bold"} style={{ color: colors.text }}>
            To access your health data, please authenticate with Fitbit.
          </RNText>
          <RNText font={"M-Bold"} style={{ color: colors.text }}>
            You can track your heart rate, steps, sleep, and calories burned.
          </RNText>

          <TouchableOpacity
            onPress={() => {
              promptAsync();
            }}
            style={{
              marginBottom: 16,
              backgroundColor: colors.green,
              padding: 8,
              borderRadius: 8,
              width: "90%",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              shadowColor: colors.text,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 3,
            }}
          >
            <RNText
              font={"M-Bold"}
              style={{ color: colors.text, fontSize: 16 }}
            >
              Authenticate with Fitbit
            </RNText>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Health;
