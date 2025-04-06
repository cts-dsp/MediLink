import { Pressable, View } from "react-native";
import React, { useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import RNText from "../RNText";
import Colors from "../../constants/Colors";
import { useTheme } from "react-native-paper";

const Solution = ({ item }) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        height: 300,
        width: wp(70),
        borderRadius: 30,
        overflow: "hidden",
        position: "relative",
        marginRight: 10,
        //shadow effect
        shadowColor: "#000",
        backgroundColor: colors.card,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }}
    >
      <Image
        source={{
          uri: item.img,
        }}
        contentFit="cover"
        style={styles.video}
      />
      <View
        style={{
          padding: 12,
        }}
      >
        <RNText
          font={"M-Bold"}
          style={{
            fontSize: 21,
            color: colors.text,
          }}
        >
          {item.title}
        </RNText>
        <RNText
          font={"M-Medium"}
          style={{
            fontSize: 15,
            marginTop: 10,
            color:colors.gray
          }}
        >
          {item.description}
        </RNText>
      </View>
    </View>
  );
};

export default Solution;

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: "46%",
  },
});
