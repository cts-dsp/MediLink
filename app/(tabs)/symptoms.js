import { Text, TouchableOpacity, View } from "react-native";
import React, { useCallback } from "react";
import { Button, useTheme } from "react-native-paper";
import { useFocusEffect, useRouter } from "expo-router";
import { Image } from "expo-image";
import RNText from "../../components/RNText";
import { heightPercentageToDP } from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Symptoms = () => {
  const router = useRouter();
  const { colors } = useTheme();
  // check if users has any conversation history
  const [hasHistory, setHasHistory] = React.useState(false);
  const checkHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("chatHistory");
      if (history) {
        setHasHistory(true);
      } else {
        setHasHistory(false);
      }
    } catch (error) {
      console.error("Failed to load chat history", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      checkHistory();
    }, [])
  );
  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: colors.background,
        height: "100%",
      }}
    >
      <Image
        source={
          "https://cdn3d.iconscout.com/3d/premium/thumb/chat-bot-3d-icon-download-in-png-blend-fbx-gltf-file-formats--chatbot-ai-artificial-customer-support-pack-business-icons-10721414.png?f=webp"
        }
        style={{
          height: 240,
          width: 240,
          marginBottom: 16,
          marginTop: heightPercentageToDP(4),
        }}
      />

      <View style={{ padding: 16 }}>
        <RNText font={"M-Regular"} style={{ color: colors.text, fontSize: 36 }}>
          Meet Healix!
        </RNText>
        <RNText font={"M-Bold"} style={{ color: colors.text, fontSize: 36 }}>
          Your {""}
          <RNText font={"M-Bold"} style={{ fontSize: 36, color: colors.green }}>
            AI Assistant
          </RNText>
        </RNText>
        <RNText
          font={"M-Regular"}
          style={{ color: colors.text, fontSize: 18, marginTop: 16 }}
        >
          {hasHistory
            ? "Continue your previous conversation with Healix or start a new one."
            : "Healix is here to assist you with your health queries. You can ask anything related to your health and get instant responses."}
        </RNText>
      </View>
      {hasHistory && (
        <TouchableOpacity
          onPress={() => {
            router.push("/ai");
          }}
          style={{
            marginBottom: 16,
            backgroundColor: colors.opposite,
            padding: 8,
            borderRadius: 8,
            width: "90%",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            shadowColor: colors.text,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
          }}
        >
          <RNText
            font={"M-Bold"}
            style={{ color: colors.background, fontSize: 16 }}
          >
            Continue Previous Conversation
          </RNText>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => {
          // clear chat history
          AsyncStorage.removeItem("chatHistory").then(() => {
            router.push("/ai");
          });
        }}
        style={{
          marginBottom: 16,
          backgroundColor: colors.green,
          padding: 8,
          borderRadius: 8,
          width: "90%",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          shadowColor: colors.text,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
        }}
      >
        <RNText font={"M-Bold"} style={{ color: colors.text, fontSize: 16 }}>
          Start New Conversation
        </RNText>
      </TouchableOpacity>
    </View>
  );
};

export default Symptoms;
