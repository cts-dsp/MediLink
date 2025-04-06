import React, { Children } from "react";
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useTheme } from "react-native-paper";

const ios = Platform.OS === "ios";

const CustomKeyboardView = ({ children }) => {
  const { colors } = useTheme();
  return (
    <KeyboardAvoidingView
      behavior={ios ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.background }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CustomKeyboardView;
