import {
  View,
  Pressable,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Image } from "expo-image";

import { blurhash } from "../../constants";
import CustomKeyboardView from "../../components/CustomKeybordView";
import { AuthContext } from "../../context/authcontext";
import ProfileImage from "../../components/ProflieImage";
import RNText from "../../components/RNText";
import { saveProfileUrl } from "../../constants/api";
import { List, useTheme } from "react-native-paper";
import { router } from "expo-router";

const Profile = () => {
  const { user, logout, isDarkMode, toggleTheme } = useContext(AuthContext);

  const { colors } = useTheme();

  return (
    <ScrollView
      style={{
        flex: 1,
        padding: wp(5),
        backgroundColor: colors.background,
        paddingBottom: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Image
          style={{
            height: hp(20),
            aspectRatio: 1,
            borderRadius: 100,
            borderWidth: 1,
            borderColor: "#D1D5DB",
          }}
          source={
            user?.profileUrl
              ? user?.profileUrl
              : "https://cdn3d.iconscout.com/3d/premium/thumb/user-3711728-3105450.png?f=webp"
          }
          placeholder={blurhash}
          transition={500}
        />
      </View>
      <RNText
        font={"M-Bold"}
        style={{
          color: colors.text,
          fontSize: 16,
          marginTop: 10,
          textAlign: "center",
        }}
      >
        {user?.email}
      </RNText>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 16,
        }}
      >
        <List.Section
          style={{
            width: widthPercentageToDP(90),
            gap: 8,
          }}
        >
          <List.Item
            style={{
              backgroundColor: colors.card,
              paddingHorizontal: 16,
              borderRadius: 8,
            }}
            title="Edit Profile"
            titleStyle={{
              fontFamily: "M-Bold",
              textTransform: "capitalize",
            }}
            description={"Edit your profile"}
            descriptionStyle={{
              fontFamily: "M-Medium",
            }}
            left={() => <List.Icon icon="account-edit" />}
            onPress={() => {
              router.push("updateProfile");
            }}
          />
  
          <List.Item
            style={{
              backgroundColor: colors.card,
              paddingHorizontal: 16,
              borderRadius: 8,
            }}
            onPress={() => {
              toggleTheme();
            }}
            title="Switch Mode"
            titleStyle={{
              fontFamily: "M-Bold",
              textTransform: "capitalize",
            }}
            description={
              isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
            descriptionStyle={{
              fontFamily: "M-Medium",
            }}
            left={() => (
              <List.Icon
                icon={isDarkMode ? "weather-sunny" : "weather-night"}
              />
            )}
          />
          <List.Item
            style={{
              backgroundColor: colors.card,
              paddingHorizontal: 16,
              borderRadius: 8,
            }}
            onPress={() => {
              //logout
              Alert.alert("Logout", "Are you sure you want to logout?", [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "Logout",
                  onPress: () => {
                    logout();
                  },
                },
              ]);
            }}
            title="Logout"
            titleStyle={{
              fontFamily: "M-Bold",
            }}
            description={"Logout from your account"}
            descriptionStyle={{
              textTransform: "capitalize",
              fontFamily: "M-Medium",
            }}
            left={() => <List.Icon icon="logout" />}
          />
        </List.Section>
      </View>

    </ScrollView>
  );
};

export default Profile;
