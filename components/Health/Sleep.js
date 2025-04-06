import React from "react";
import { StyleSheet, View } from "react-native";
import RNText from "../RNText";
import { ProgressBar, useTheme } from "react-native-paper";
import CircularProgress from "react-native-circular-progress-indicator";

const SleepTrackingChart = ({
  range,
  weeklyStats,
  dailyStats,
  monthlyStats,
}) => {
  const { colors } = useTheme();

  const sleepMinutes =
    range === "weekly"
      ? weeklyStats?.sleepAvg || 0
      : range === "daily"
      ? dailyStats?.sleepMinutes || 0
      : monthlyStats?.sleepAvg || 0;

  // if sleepMinutes is 0 hours and minutes will be 0
  const hours = Math.floor(sleepMinutes / 60);
  const minutes = sleepMinutes % 60;

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
        Sleep
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
              Number(hours).toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }) // Format number with commas
            }
          </RNText>
          <RNText
            style={{ fontSize: 18, color: colors.text }}
            font="M-SemiBold"
          >
            h
          </RNText>

          <RNText
            style={{ fontSize: 40, color: colors.text, marginLeft: 5 }}
            font="M-Bold"
          >
            {
              Number(minutes).toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }) // Format number with commas
            }
          </RNText>
          <RNText
            style={{ fontSize: 18, color: colors.text }}
            font="M-SemiBold"
          >
            m
          </RNText>

          <RNText
            style={{ fontSize: 18, color: colors.text, marginLeft: 5 }}
            font="M-SemiBold"
          >
            of 8h goal
          </RNText>
        </View>
        <View
          style={{
            alignSelf: "center",
            marginLeft: 14,
          }}
        >
          <CircularProgress
            value={sleepMinutes}
            radius={40}
            maxValue={480}
            progressFormatter={(value) => {
              "worklet";

              return value.toFixed(1); // 2 decimal places
            }}
            title="💤"
            titleFontSize={28}
            showProgressValue={false}
          ></CircularProgress>
        </View>
      </View>

      {range === "daily" ? (
        <SleepStages sleepStages={dailyStats?.sleepStages} />
      ) : (
        <RNText
          font={"M-Medium"}
          style={{
            fontSize: 16,
            marginBottom: 10,
            color: colors.text,
          }}
        >
          Average Sleep Duration
        </RNText>
      )}
    </View>
  );
};

export default SleepTrackingChart;

const SleepStages = ({ sleepStages }) => {
  console.log("Sleep Stages: ", sleepStages);
  if (!sleepStages) return null; // Handle case when sleepStages is not available

  const total =
    sleepStages.deep + sleepStages.light + sleepStages.rem + sleepStages.wake;

    const getPercentage = (value) => {
      if (total === 0) return "0.00";
      return (value / total).toFixed(2);
    };
  return (
    <View style={styles.container}>
      <RNText font={"M-Medium"} style={styles.title}>
        🛌 Sleep Stages
      </RNText>
      {Object.entries(sleepStages).map(([stage, value]) => (
        <View key={stage} style={styles.stageContainer}>
          <View style={styles.labelRow}>
            <RNText font={"M-Medium"} style={styles.label}>
              {stage.toUpperCase()}
            </RNText>
            <RNText font={"M-SemiBold"} style={styles.value}>
              {formatMinutesToHrMin(value)}
            </RNText>
          </View>
          <ProgressBar
            progress={parseFloat(getPercentage(value))}
            color={getStageColor(stage)}
            style={styles.progress}
          />
        </View>
      ))}
    </View>
  );
};

const getStageColor = (stage) => {
  switch (stage) {
    case "deep":
      return "#2980b9"; // blue
    case "light":
      return "#27ae60"; // green
    case "rem":
      return "#8e44ad"; // purple
    case "wake":
      return "#e74c3c"; // red
    default:
      return "#95a5a6"; // gray
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f4f6f8",
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  stageContainer: {
    marginBottom: 10,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  value: {
    fontSize: 14,
    color: "#555",
  },
  progress: {
    height: 8,
    borderRadius: 5,
  },
});
const formatMinutesToHrMin = (minutes) => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;

  // if hrs is 0, return only minutes
  if (hrs === 0) return `${mins} min`;
  // if mins is 0, return only hours
  if (mins === 0) return `${hrs} hr`;
  // if both are present, return both
  if (hrs > 0 && mins > 0) return `${hrs} hr ${mins} min`;
};
