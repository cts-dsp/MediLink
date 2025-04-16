import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BarChart, LineChart } from "react-native-gifted-charts";
import { widthPercentageToDP } from "react-native-responsive-screen";
import RNText from "../RNText";
import { useTheme } from "react-native-paper";
import CircularProgress from "react-native-circular-progress-indicator";

const HeartRateChart = ({ range, weeklyStats, dailyStats, monthlyStats }) => {
  // Sample heart rate data (Time in hours, Heart Rate in BPM)
  const { colors } = useTheme();
  const [show, setShow] = useState(false);

  // Daily: Hourly data

  const now = new Date();
const currentHour = now.getHours(); // returns 0-23

const fullHeartRateData = [
  { value: 58, label: "12 AM" },
  { value: 56, label: "1 AM" },
  { value: 55, label: "2 AM" },
  { value: 54, label: "3 AM" },
  { value: 53, label: "4 AM" },
  { value: 55, label: "5 AM" },
  { value: 60, label: "6 AM" },
  { value: 65, label: "7 AM" },
  { value: 70, label: "8 AM" },
  { value: 74, label: "9 AM" },
  { value: 78, label: "10 AM" },
  { value: 82, label: "11 AM" },
  { value: 85, label: "12 PM" },
  { value: 88, label: "1 PM" },
  { value: 84, label: "2 PM" },
  { value: 80, label: "3 PM" },
  { value: 77, label: "4 PM" },
  { value: 90, label: "5 PM" },
  { value: 95, label: "6 PM" },
  { value: 88, label: "7 PM" },
  { value: 82, label: "8 PM" },
  { value: 78, label: "9 PM" },
  { value: 72, label: "10 PM" },
  { value: 65, label: "11 PM" },
];

// Only take data until the current hour
const heartRateHourlyData = fullHeartRateData.slice(0, currentHour + 1);

  const barData =
    range === "weekly"
      ? weeklyStats?.restingHR?.map((hr, index) => ({
          value: hr,
          label:
            weeklyStats.stepsData[index]?.dateTime.slice(8, 10) ||
            `D${index + 1}`,
        })) || []
      : monthlyStats?.restingHR?.map((hr, index) => ({
          value: hr,
          label:
            monthlyStats.stepsData[index]?.dateTime.slice(8, 10) ||
            `M${index + 1}`,
        })) || [];

  //revere the data to show the latest date first
  barData.reverse();
  const showLineChart = range === "daily";

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
            Heart Rate {range === "daily" ? "(Hourly)" : "Resting (Avg)"}
          </RNText>
          {showLineChart ? (
            <LineChart
              data={heartRateHourlyData}
              width={widthPercentageToDP(80)}
              height={200}
              curved
              isBezier
              hideDataPoints
              noOfSections={8}
              color={"#3498db"}
              yAxisThickness={0}
              xAxisLabelTextStyle={{ color: colors.text }}
              yAxisTextStyle={{ color: colors.text }}
              yAxisOffset={10}
            />
          ) : (
            <BarChart
              data={barData}
              // barWidth={16}
              barBorderRadius={3}
              frontColor={"#3498db"}
              yAxisTextStyle={{ color: colors.text }}
              xAxisLabelTextStyle={{ color: colors.text }}
              width={widthPercentageToDP(80)}
              // height={200}

              barWidth={25}
              noOfSections={5}
              yAxisThickness={0}
            />
            
          )}
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
          Heart
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
              {range === "daily"
                ? dailyStats?.restingHR || 0
                : range === "weekly"
                ? weeklyStats?.heartRateAvg || 0
                : monthlyStats?.heartRateAvg || 0}
            </RNText>

            <RNText
              style={{ fontSize: 18, color: colors.text, marginLeft: 10 }}
              font="M-SemiBold"
            >
              bpm
            </RNText>
          </View>

          <View
            style={{
              alignSelf: "center",
              marginLeft: 20,
            }}
          >
            <CircularProgress
              value={
                range === "daily"
                  ? dailyStats?.restingHR || 0
                  : range === "weekly"
                  ? weeklyStats?.heartRateAvg || 0
                  : monthlyStats?.heartRateAvg || 0
              }
              radius={40}
              maxValue={100}
              title="❤️"
              titleFontSize={28}
              showProgressValue={false}
            ></CircularProgress>
          </View>
        </View>

        {range === "daily" ? (
          <RNText
            font={"M-Medium"}
            style={{
              fontSize: 16,
              marginBottom: 10,
              color: colors.text,
            }}
          >
            Heart Rate
          </RNText>
        ) : (
          <RNText
            font={"M-Medium"}
            style={{
              fontSize: 16,
              marginBottom: 10,
              color: colors.text,
            }}
          >
            Average Resting Heart Rate
          </RNText>
        )}

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

export default HeartRateChart;
