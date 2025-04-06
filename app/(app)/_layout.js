import React, { useContext } from "react";
import { router, Stack } from "expo-router";
import { Alert, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../../context/authcontext";
import { useTheme } from "react-native-paper";

export default AppLayout = () => {
  const { logout } = useContext(AuthContext);
  const { colors } = useTheme();
  return (
    <Stack>
      <Stack.Screen
        name="profile"
        options={{
          headerTitle: "My profile",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.background,
          },

          headerTintColor: colors.text,
          headerTitleStyle: {
            fontFamily: "M-ExtraBold",
            fontSize: 26,
            alignSelf: "center",
            backgroundColor: "#000",
          },
        }}
      />
      <Stack.Screen
        name="contact"
        options={{
          headerTitleStyle: {
            fontFamily: "M-ExtraBold",
            fontSize: 36,
          },
        }}
      />
      <Stack.Screen
        name="chat"
        options={{
          headerShown: false,
          title: "Symptoms",
          headerTitle: "Healix (🤖)",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "M-Bold",
            fontSize: 26,
          },
        }}
      />

      <Stack.Screen
        name="updateProfile"
        options={{
          headerTitle: "Edit Profile",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontFamily: "M-Bold",
            fontSize: 26,
            alignSelf: "center",
            backgroundColor: "#000",
          },
        }}
      />
      <Stack.Screen
        name="ai"
        options={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitle: "Healix",

          headerTintColor: colors.text,
          headerTitleStyle: {
            fontFamily: "M-ExtraBold",
            fontSize: 28,
            alignSelf: "center",
          },
        }}
      />
      <Stack.Screen
        name="first-aid"
        options={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.background,
          },

          headerTintColor: colors.text,
          headerTitleStyle: {
            fontFamily: "M-ExtraBold",
            fontSize: 28,
            alignSelf: "center",
            backgroundColor: "#000",
          },
        }}
      />
      <Stack.Screen
        name="challenge"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};
