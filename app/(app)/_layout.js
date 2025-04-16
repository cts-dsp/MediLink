import React from "react";
import {  Stack } from "expo-router";
import { useTheme } from "react-native-paper";

export default AppLayout = () => {
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
        name="emergencyContacts"
        options={{
          headerTitle: "Emergency",
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
    </Stack>
  );
};
