import React from "react";
import { View } from "react-native";
import RNText from "../RNText";
import { useTheme } from "react-native-paper";
import CircularProgress from "react-native-circular-progress-indicator";

const CaloriesTracking = ({
  range,
  weeklyStats,
  dailyStats,
  monthlyStats,
}) => {
  const { colors } = useTheme();


  const caloriesBurned = 
    range === "weekly"
      ? weeklyStats?.caloriesAvg || 0
      : range === "daily"
      ? dailyStats?.calories || 0
      : monthlyStats?.caloriesAvg || 0;

  return (
    <View
      style={{ padding: 16, backgroundColor: colors.card, borderRadius: 20 }}
    >
      <RNText
        font={"M-Medium"}
        style={{
          fontSize: 20,
          color: colors.text,
        }}
      >
        Energy Burned
      </RNText>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "baseline",
          }}
        >
          <RNText style={{ fontSize: 40, color: colors.text }} font="M-Bold">
          {
            Number(caloriesBurned).toLocaleString("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }) // Format number with commas
          }
          </RNText>
   

          <RNText
            style={{ fontSize: 18, color: colors.text, marginLeft: 10 }}
            font="M-SemiBold"
          >
           cal
          </RNText>
        </View>
        <View
          style={{
            alignSelf: "center",
            marginLeft: 20,
          }}
        >
          <CircularProgress
            value={1200}
            radius={40}
            maxValue={2500}
            title="🔥"
            titleFontSize={28}
            showProgressValue={false}
          ></CircularProgress>
        </View>
      </View>

      <RNText
        font={"M-Medium"}
        style={{
          fontSize: 16,
          marginBottom: 10,
          color: colors.text,
        }}
      >
        Today
      </RNText>
    </View>
  );
};

export default CaloriesTracking;
