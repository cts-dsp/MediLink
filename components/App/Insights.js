import { TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import RNText from "../RNText";
import { useTheme } from "react-native-paper";
import { getDailyTip } from "../../constants/constants";
import { Entypo } from "@expo/vector-icons";

const Insights = () => {
  const { colors } = useTheme();
  const [count, setCount] = useState(0);
  return (
    <View 
      style={{
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      <RNText
        style={{
          marginTop: 20,
          marginBottom: 10,
          marginLeft: 10,
          fontSize: 20,
          color:colors.text
        }}
        font={"M-SemiBold"}
      >
        Smart Health Tips
      </RNText>

      <View
        style={{
          height: 240,
          width: "100%",
          overflow: "hidden",
          position: "relative",
          marginRight: 10,
          padding: 12,
          borderRadius: 10,
          backgroundColor: colors.card,
        }}
      >
        <Entypo
          name="bookmarks"
          size={36}
          color={colors.green}
          style={{
            position: "absolute",
            top: 10,
            left: 10,
          }}
        />
        <View
          style={{
            width: "100%",
            height: "100%",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RNText
            font={"M-Medium"}
            style={{
              fontSize: 20,
              color: colors.text,
              textAlign: "center",
            }}
          >
            {getDailyTip(count)}
          </RNText>
          <View
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.green,
              padding: 3.5,
              borderRadius: 6,
            }}
          >
            <RNText font={"M-SemiBold"} style={{ fontSize: 12, color: "#000" }}>
              Daily Tip
            </RNText>
          </View>
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 0,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.text,
              padding: 10,
              width: "100%",
              borderRadius: 6,
            }}
            onPress={() => setCount((count) => (count + 1) % 31)}
          >
            <RNText font={"M-Medium"} style={{ fontSize: 16, color: colors.background }}>
            Health Tip 🩺
            </RNText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Insights;
