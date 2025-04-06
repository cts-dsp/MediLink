import React, { useState, useEffect } from "react";
import { View } from "react-native";
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useTheme } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI("AIzaSyATmXR9fQQz7euoaznxrd9N_QDmKTxINcI");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const ChatScreen = () => {
  const { colors } = useTheme();
  const [messages, setMessages] = useState([]);

  // Load previous chat history on mount
  useEffect(() => {
    loadChatHistory();
  }, []);

  // Function to load chat history
  const loadChatHistory = async () => {
    try {
      const savedMessages = await AsyncStorage.getItem("chatHistory");
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages);
        setMessages(parsedMessages.reverse());
      }
    } catch (error) {
      console.error("Failed to load chat history", error);
    }
  };

  // save message to async storage
  const saveMessage = async (message) => {
    try {
      const existingMessages = await AsyncStorage.getItem("chatHistory");
      const updatedMessages = existingMessages
        ? JSON.parse(existingMessages).concat(message)
        : [message];
      await AsyncStorage.setItem(
        "chatHistory",
        JSON.stringify(updatedMessages)
      );
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  // Function to send user message to AI
  const sendMessage = async (newMessages = []) => {
    const userMessage = newMessages[0];

    saveMessage(userMessage); // Save user message to async storage

    // Update UI with user message
    setMessages((prevMessages) =>
      GiftedChat.append(prevMessages, [userMessage])
    );

// create a chat history string to pass to the AI model both user and AI messages 
    const chatHistory = messages

      .concat(newMessages)
      .map((msg) => `${msg.user.name}: ${msg.text}`)
      .join("\n");
    const conversationHistory = chatHistory.replace(/You: /g, "User: ");
    console.log(conversationHistory);
    
    


    const prompt = `You are a medical assistant. Keep the conversation in context and provide helpful responses. Here is the chat history:\n\n${conversationHistory}\n\n 
    Answer the following question base on the chat history:\n\n User: ${userMessage.text}\n\n
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const aiMessageText = response.text();

      const aiMessage = {
        _id: Math.random().toString(36).substring(7),
        text: aiMessageText,
        createdAt: new Date(),
        user: { _id: 2, name: "AI Bot" },
      };

      saveMessage(aiMessage); // Save AI message to async storage

      // Update state with AI response
      setMessages((prevMessages) =>
        GiftedChat.append(prevMessages, [aiMessage])
      );

      // Save updated chat history
    } catch (error) {
      console.error("Error generating AI response:", error);
    }
  };
  const renderBubble = (props) => {
    return (
      <View style={{ marginBottom: 5 }}>
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: colors.green,
              borderWidth: 1.5,
            },
            left: {
              backgroundColor: colors.yellow,
              borderWidth: 1.5,
            },
          }}
          textStyle={{
            right: {
              color: "#000",
              fontFamily: "M-Bold",
            },
            left: {
              color: "#000",
              fontFamily: "M-Bold",
            },
          }}
          timeTextStyle={{
            right: {
              color: "#000",
            },
            left: {
              color: "#000",
            },
          }}
        />
      </View>
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialIcons
            name="send"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };
  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: colors.card, // 🔥 Background color for dark theme
          borderTopWidth: 1,
          borderTopColor: colors.background, // Darker border color
          padding: 5,
          color: colors.text,
        }}
        primaryStyle={{ alignItems: "center" }}
        textInputStyle={{
          color: colors.text,
          fontFamily: "M-Medium",
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => sendMessage(messages)}
        user={{ _id: 1, name: "You" }}
        renderAvatar={null} // Hide avatars
        placeholder="Type your message..."
        alwaysShowSend={true}
        scrollToBottom={true}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        inverted={true}
        renderSend={renderSend}
      />
    </View>
  );
};

export default ChatScreen;
