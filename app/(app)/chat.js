// import React, { useState, useEffect, useCallback, useContext } from "react";
// import { ActivityIndicator, View } from "react-native";
// import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";

// import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
// import { AuthContext } from "../../context/authcontext";
// import { db } from "../../firebase";
// import {
//   Timestamp,
//   arrayUnion,
//   doc,
//   getDoc,
//   onSnapshot,
//   setDoc,
//   updateDoc,
// } from "firebase/firestore";
// import Colors from "../../constants/Colors";
// import { Button, Chip } from "react-native-paper";
// import { useRouter } from "expo-router";
// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const { user } = useContext(AuthContext);
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     (async () => {
//       const docRef = doc(db, "chats", user?.id);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//       } else {
//         console.log("Creating New Chat");
//         setDoc(doc(db, "chats", user?.id), {
//           chatId: user?.id,
//           lastUpdated: Timestamp.fromDate(new Date()),
//           messages: [],
//           lastMessage: null,
//         });
//       }
//       setLoading(false);
//     })();
//   }, []);

//   useEffect(() => {
//     const docRef = doc(db, "chats", user?.id);
//     const unsubscribe = onSnapshot(docRef, (doc) => {
//       if (doc.exists()) {
//         const { messages } = doc.data();
//         setMessages(messages);
//       }
//     });
//     return unsubscribe;
//   }, []);
//   // rerender the chat component

//   const [hideError, setHideError] = useState(false);

//   const updateDocument = useCallback(async (messages = []) => {
//     const docRef = doc(db, "chats", user?.id);
//     const lastMessage = messages[0];
//     const lastUpdated = new Date().toString();
//     lastMessage.createdAt = lastUpdated;
//     lastMessage.user.name = user.name;
//     lastMessage.text = lastMessage.text + " ";
//     await updateDoc(docRef, {
//       messages: arrayUnion(lastMessage),
//       lastMessage: lastMessage,
//       lastUpdated,
//     });
//   }, []);

//   const hideErrorAlert = () => {
//     setHideError(true);
//   };

//   const onSend = useCallback((messages = []) => {
//     updateDocument(messages);
//   }, []);
//   const renderSend = (props) => {
//     return (
//       <Send {...props}>
//         <View>
//           <MaterialCommunityIcons
//             name="send-circle"
//             style={{ marginBottom: 5, marginRight: 5 }}
//             size={32}
//             color="#000"
//           />
//           {/* {hideErrorAlert()} */}
//         </View>
//       </Send>
//     );
//   };

//   const renderBubble = (props) => {
//     return (
//       <View style={{ marginBottom: 5 }}>
//         <Bubble
//           {...props}
//           wrapperStyle={{
//             right: {
//               backgroundColor: Colors.green,
//               borderWidth: 1,
//             },
//             left: {
//               borderWidth: 1,
//             },
//           }}
//           textStyle={{
//             right: {
//               color: "#000",
//               fontFamily: "M-Medium",
//             },
//             left: {
//               color: "#000",
//               fontFamily: "M-Medium",
//             },
//           }}
//           timeTextStyle={{
//             right: {
//               color: "#000",
//             },
//             left: {
//               color: "#000",
//             },
//           }}
//         />
//       </View>
//     );
//   };

//   const scrollToBottomComponent = () => {
//     return <FontAwesome name="chevron-down" color="#333" />;
//   };

//   if (loading) {
//     return (
//       <View
//         style={{
//           flex: 1,
//           justifyContent: "center",
//         }}
//       >
//         <ActivityIndicator size="large" color={Colors.primary} />
//       </View>
//     );
//   }

//   return (
//     <>
//       {/* {!hideError && (
//         <Chip
//           mode="outlined"
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "10%",
//             width: "100%",
//             zIndex: 1000,
//             textAlign: "center",
//             width: "80%",
//             opacity: 0,
//           }}
//           onPress={() => {
//             router.back();
//           }}
//         >
//           Failed to load. Click to try again.
//         </Chip>
//       )} */}
//       <GiftedChat
//         messages={messages}
//         onSend={(messages) => onSend(messages)}
//         user={{
//           _id: 1,
//           profileUrl: user?.profileUrl,
//         }}
//         inverted={false}
//         renderBubble={renderBubble}
//         alwaysShowSend
//         renderSend={renderSend}
//         scrollToBottom
//         scrollToBottomComponent={scrollToBottomComponent}
//         renderAvatar={() => null}
//       />
//     </>
//   );
// };

// export default Chat;

import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Dimensions,
  ActivityIndicator,
  Animated,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyATmXR9fQQz7euoaznxrd9N_QDmKTxINcI");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
const ActionButton = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.actionButton} onPress={onPress}>
    <Ionicons name={icon} size={20} color="#8E8E93" />
    <Text style={styles.actionButtonText}>{label}</Text>
  </TouchableOpacity>
);
const { width } = Dimensions.get("window");
export default function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    );
    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    );
    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  const generateAIResponse = async (userMessage) => {
    try {
      const prompt = `Respond in simple English with a witty and slightly naughty tone:"${userMessage}"`;
      const result = await model.generateContent(prompt);
      const response = result.response;
      
      return response.text();
    } catch (error) {
      console.error("Error generating AI response:", error);
      return "Oops, my circuits jammed! Try again?";
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      text: inputText.trim(),
      createdAt: new Date(),
      id: Math.random().toString(36).substring(7),
      isUser: true,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText("");
    setIsLoading(true);
    const aiResponse = await generateAIResponse(userMessage.text);
    
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text: aiResponse,
        createdAt: new Date(),
        id: Math.random().toString(36).substring(7),
        isUser: false,
      },
    ]);
    setIsLoading(false);
  };

  const renderResponseText = (text) => {
    const parts = [];
    const regex = /\*([^*]+])*/g;

    let match;
    let lastIndex = 0;
    while ((match = regex.exec(text)) !== null) {
      const before = text.slice(lastIndex, match.index);

      if (before) {
        parts.push(<Text key={lastIndex}>{before}</Text>);
      }
      const boldText = match[1];
      parts.push(
        <Text key={match.index} style={{ fontWeight: "bold" }}>
          {boldText}
        </Text>
      );
      lastIndex = regex.lastIndex;
    }

    const after = text.slice(lastIndex);
    if (after) {
      parts.push(<Text key={lastIndex}>{after}</Text>);
    }
    return parts;
  };

  const renderMessage = ({ item }) => {
    return (
      <View
        style={[
          styles.messageBubble,
          item.isUser ? styles.userMessage : styles.aiMessage,
        ]}
      >
        {item.isUser ? (
          <Text style={styles.messageText}>{item.text}</Text>
        ) : (
          <>
            {renderResponseText(item.text)}
          </>
        )}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.topBar, { opacity: fadeAnim }]}>
        <View style={styles.topBarContent}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="chatbubbles"
              size={24}
              color="#fff"
              style={{
                marginRight: 8,
              }}
            />
            <Text style={styles.appTitle}>Chat with AI</Text>
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color="#8E8E93" />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.mainContainer}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {messages.length === 0 ? (
          <View style={styles.welcomeContainer}>
            <View style={styles.welcomeSection}>
              <Text style={styles.greeting}>
                Welcome to Chat with AI! Ask me anything and I'll do my best to
                help you.
              </Text>
              <Text style={styles.subGreeting}>
                Let's get started! Type your message below.
              </Text>
            </View>
            <View style={styles.actionsContainer}>
              <View style={styles.actionRow}>
                <ActionButton
                  icon="document-text-outline"
                  label="Research"
                  onPress={() => {
                    setMessages([
                      messages,
                      {
                        id: Date.now().toString(),
                        text: "Let's do some research.",
                        isUser: true,
                      },
                    ]);
                  }}
                />

                <ActionButton
                  icon="bulb-outline"
                  label="Brainstorm"
                  onPress={() => {
                    setMessages([
                      ...messages,
                      {
                        id: Date.now().toString(),
                        text: "Let's brainstorm ideas.",
                        isUser: true,
                      },
                    ]);
                  }}
                />
              </View>

              <View style={styles.actionRow}>
                <ActionButton
                  icon="analytics-outline"
                  label="Analyze Data"
                  onPress={() => {
                    setMessages([
                      messages,
                      {
                        id: Date.now().toString(),
                        text: "Let's analyze some data.",
                        isUser: true,
                      },
                    ]);
                  }}
                />
                <ActionButton
                  icon="code-slash-outline"
                  label="Code Help"
                  onPress={() => {
                    setMessages([
                      messages,
                      {
                        id: Date.now().toString(),
                        text: "I can help with coding.",
                        isUser: true,
                      },
                    ]);
                  }}
                />
              </View>
            </View>
          </View>
        ) : (
          <FlatList
            ref={scrollViewRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            style={styles.chatContainer}
            contentContainerStyle={[
              styles.chatContentContainer,
              styles.messageContainer,
            ]}
            inverted
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToOffset({
                animated: true,
              })
            }
            keyboardShouldPersistTaps="handled"
            ListFooterComponent={
              isLoading && (
                <View style={styles.loadingIndicator}>
                  <ActivityIndicator size="small" color="#0A84FF" />
                </View>
              )
            }
          />
        )}
        {/* Input Area */}

        <View style={styles.inputAreaContainer}>
          <View style={styles.inputArea}>
            {/* Input Area */}
            <TouchableOpacity style={styles.attachButton}>
              <Ionicons name="attach" size={24} color="#8E8E93" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Message AI Assistant..."
              placeholderTextColor="#666"
              multiline
              maxHeight={100}
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                !inputText.trim() && styles.sendButtonDisabled,
              ]}
              onPress={sendMessage}
              disabled={!inputText.trim() || isLoading}
            >
              <Ionicons
                name="send"
                size={24}
                color={inputText.trim() && !isLoading ? "#0A84FF" : "#666"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: "#2C2C2E",
    borderBottomWidth: 1,
    borderBottomColor: "#3C3C3E",
  },
  topBarContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  appTitle: {
    fontSize: 29,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  settingsButton: {
    padding: 8,
  },
  chatContainer: {
    flex: 1,
  },
  chatContentContainer: {
    flexGrow: 1,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  welcomeSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  greeting: {
    fontSize: 24,
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
  },
  subGreeting: {
    fontSize: 18,
    color: "#8E8E93",
    textAlign: "center",
  },
  actionsContainer: {
    width: "100%",
    alignItems: "center",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
    width: "100%",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C2C2E",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 5,
    minWidth: width * 0.4,
    justifyContent: "center",
  },
  actionButtonText: {
    color: "#FFFFFF",
    marginLeft: 8,
    fontSize: 16,
  },
  messageContainer: {
    padding: 20,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 20,
    marginBottom: 10,
  },
  userMessage: {
    backgroundColor: "#064E3B",
    alignSelf: "flex-end",
    borderBottomRightRadius: 5,
  },
  aiMessage: {
    backgroundColor: "#E5C07B",
    alignSelf: "flex-start",
    borderBottomRightRadius: 5,
  },
  messageText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  loadingContainer: {
    padding: 10,
    alignItems: "flex-start",
  },

  inputAreaContainer: {
    backgroundColor: "#2C2C2E",
    borderTopWidth: 1,
    borderTopColor: "#3C3C3E",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  inputArea: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C1C1E",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    marginHorizontal: 10,
    maxHeight: 100,
    paddingTop: Platform.OS === "ios" ? 8 : 0,
  },
  attachButton: {
    padding: 4,
  },
  sendButton: {
    padding: 4,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#1C1C1E",
  },
});
