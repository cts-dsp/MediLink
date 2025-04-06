import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Map from "../../components/Map";
import SearchBar from "../../components/SearchBar";
import { useTheme } from "react-native-paper";
import { ScrollView } from "react-native";
import RNText from "../../components/RNText";
import { POINTS_IMG_URL, TASKS } from "../../constants/constants";
import { router } from "expo-router";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { Image } from "expo-image";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";

const Resources = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
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
