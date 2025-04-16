import { View } from "react-native";
import React, { useState } from "react";
import Map from "../../components/Map";
import { useTheme } from "react-native-paper";

const Resources = () => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: 10,
        height: "100%",
        width: "100%",
      }}
    >
      <Map />
    </View>
  );
};

export default Resources;
