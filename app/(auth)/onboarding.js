import React from "react";
import { View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import {  useTheme } from "react-native-paper";
import RNText from "../../components/RNText";
import { Image } from "react-native";
import LogoImg from "../../assets/app/logo.png";
import { Pressable } from "react-native";

const Onboarding = () => {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.background,
        flex: 1,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={LogoImg}
          style={{ height: widthPercentageToDP(50), aspectRatio: 1 }}
        />
        <View
          style={{
            gap: 10,
          }}
        >
          <RNText
            font={"M-Bold"}
            style={{ color: colors.green, fontSize: 24, textAlign: "center" }}
          >
            MediLink
          </RNText>

          <RNText
            font={"M-Medium"}
            style={{ color: colors.text, fontSize: 18, textAlign: "center" }}
          >
            Linking to the care you need
          </RNText>
        </View>
        <View style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          width: wp("100%"),
          position: "absolute",
          bottom: 40,
          gap: 10,
        }}>
          <Pressable
            style={{
              marginTop: hp("5%"),
              width: wp("80%"),
              height: hp("7%"),
              backgroundColor: colors.green,
              borderRadius: 30,
              padding: 7,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
            onPress={() => router.replace("/(auth)/signin")}
          >
            <RNText
              font={"M-Bold"}
              style={{
                fontSize: hp(2.2),
                color: "#fff",
                textAlign: "center",
                padding: 7,
              }}
            >
              Log In
            </RNText>
          </Pressable>
          <Pressable
            style={{
              marginTop: hp("1%"),
              width: wp("80%"),
              height: hp("7%"),
              backgroundColor: colors.card,
              borderRadius: 30,
              padding: 7,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
            onPress={() => router.replace("/(auth)/signup")}
          >
            <RNText
              font={"M-Bold"}
              style={{
                fontSize: hp(2.2),
                color: colors.text,
                textAlign: "center",
                padding: 7,
              }}
            >
              Sign Up
            </RNText>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Onboarding;
