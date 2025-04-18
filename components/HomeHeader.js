import { Pressable, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Image } from "expo-image";
import { blurhash } from "../constants";
import { useRouter } from "expo-router";
import { AuthContext } from "../context/authcontext";
import LogoImg from "../assets/app/logo.png";
import { useTheme } from "react-native-paper";
import RNText from "./RNText";

const HomeHeader = () => {
  const { user, toggleTheme } = useContext(AuthContext);
  const { colors } = useTheme();
  const router = useRouter();
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    toggleTheme();
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        borderBottomColor: colors.border,
        borderBottomWidth: 2,
      }}
    >
      <TouchableOpacity onPress={() => router.push("/home")}>
        <RNText
          font={"M-Bold"}
          style={{
            color: colors.primary,
            fontSize: 22,
            letterSpacing: .5,
            textAlign: "center",
            marginLeft: 10,
          }}
        >
          MediLink
        </RNText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onToggleSwitch}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: "auto",
          marginRight: 16,
        }}
      >
        {isSwitchOn ? (
          <Image
            source={"https://cdn-icons-png.flaticon.com/128/4489/4489231.png"}
            style={{ height: hp(3.5), aspectRatio: 1, marginLeft: 5 }}
          />
        ) : (
          <Image
            source={"https://cdn-icons-png.flaticon.com/128/10562/10562510.png"}
            style={{ height: hp(4), aspectRatio: 1, marginLeft: 5 }}
          />
        )}
      </TouchableOpacity>
      <Pressable
        style={{}}
        onPress={() => {
          router.push("/profile");
        }}
      >
        <Image
          style={{
            height: hp(5.5),
            aspectRatio: 1,
            borderRadius: 100,
            backgroundColor: "#0553",
          }}
          source={
            user?.profileUrl
              ? user?.profileUrl
              : "https://cdn3d.iconscout.com/3d/premium/thumb/user-3711728-3105450.png?f=webp"
          }
          placeholder={blurhash}
          transition={500}
        />
      </Pressable>
    </View>
  );
};

export default HomeHeader;
