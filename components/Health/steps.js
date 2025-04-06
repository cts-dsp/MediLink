import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import RNText from "../RNText";
import { useTheme } from "react-native-paper";
import CircularProgress from "react-native-circular-progress-indicator";
import { BarChart } from "react-native-gifted-charts";

const StepsTracking = ({ range, weeklyStats, dailyStats, monthlyStats }) => {
  const { colors } = useTheme();

  const now = new Date();
  const currentHour = now.getHours(); // returns 0-23
  const dailyArray = [
    { value: 0, label: "12 AM" },
    { value: 0, label: "1 AM" },
    { value: 0, label: "2 AM" },
    { value: 0, label: "3 AM" },
    { value: 0, label: "4 AM" },
    { value: 20, label: "5 AM" },
    { value: 200, label: "6 AM" },
    { value: 400, label: "7 AM" },
    { value: 800, label: "8 AM" },
    { value: 600, label: "9 AM" },
    { value: 300, label: "10 AM" },
    { value: 200, label: "11 AM" },
    { value: 400, label: "12 PM" },
    { value: 350, label: "1 PM" },
    { value: 300, label: "2 PM" },
    { value: 250, label: "3 PM" },
    { value: 200, label: "4 PM" },
    { value: 500, label: "5 PM" },
    { value: 1000, label: "6 PM" }, // Workout/walk
    { value: 800, label: "7 PM" },
    { value: 700, label: "8 PM" },
    { value: 600, label: "9 PM" },
    { value: 300, label: "10 PM" },
    { value: 100, label: "11 PM" },
  ];

  const dailySteps = dailyArray.slice(0, currentHour + 1);

  const barData =
    range === "weekly"
      ? weeklyStats?.stepsData?.map((data, index) => ({
          value: +data?.value,
          label: data?.dateTime.slice(8, 10) || `D${index + 1}`,
        })) || []
      : range === "daily"
      ? dailySteps
      : monthlyStats?.stepsData?.map((data, index) => ({
          value: +data?.value,
          label: data?.dateTime.slice(8, 10) || `M${index + 1}`,
        })) || [];

  barData.reverse();

  const steps =
    range === "weekly"
      ? weeklyStats?.stepsAvg || 0
      : range === "daily"
      ? dailyStats?.steps || 0
      : monthlyStats?.stepsAvg || 0;

  const [show, setShow] = useState(false);
  return (
    <>
      {show && (
        <>
          <RNText
            font={"M-Medium"}
            style={{
              fontSize: 16,
              color: colors.text,
              textAlign: "center",
            }}
          >
            Steps Tracking (Hourly)
          </RNText>
          <BarChart
            data={barData.map((item) => ({
              ...item,
              value: item.value / 1000,
            }))}
            barWidth={30}
            noOfSections={6}
            frontColor="#3498db"
            yAxisThickness={0}
            xAxisLabelTextStyle={{ fontSize: 12, color: colors.text }}
            yAxisTextStyle={{ fontSize: 12, color: colors.text }}
            yAxisLabelSuffix="km"
          />
        </>
      )}

      <TouchableOpacity
        style={{ padding: 16, backgroundColor: colors.card, borderRadius: 20 }}
        onPress={() => setShow(!show)}
      >
        <RNText
          font={"M-Medium"}
          style={{
            fontSize: 20,
            color: colors.text,
          }}
        >
          Steps
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
              {Number(steps).toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </RNText>
          </View>
          <View
            style={{
              alignSelf: "center",
              marginLeft: 20,
            }}
          >
            <CircularProgress
              value={steps}
              radius={40}
              maxValue={10000}
              title="👟"
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
          Target 10,000 steps
        </RNText>

        <RNText
          font={"M-Bold"}
          style={{
            fontSize: 12,
            color: colors.text,
            textAlign: "center",
          }}
        >
          {show ? "Hide Chart" : "Tap to view Chart"}
        </RNText>
      </TouchableOpacity>
    </>
  );
};

export default StepsTracking;
