import React, { useContext, useState } from "react";
import {
  View,
  Button,
  Alert,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SvgXml } from "react-native-svg";
import loginImg from "../../assets/svg/login";
import Loading from "../../components/Loading";
import { AuthContext } from "../../context/authcontext";
import { useRouter } from "expo-router";
import RNText from "../../components/RNText";
import ForgotPass from "../../assets/app/forgot-password.png";
import { Image } from "expo-image";
import RNTextInput from "../../components/RNTextInput";
import { Snackbar, TextInput, useTheme } from "react-native-paper";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useContext(AuthContext);
  const router = useRouter();
  const [visible, setVisible] = useState("");

  const handleResetPassword = async () => {
    // check if email is valid
    if (email === "") {
      setVisible("Email is required");
      return;
    }
    // add email regex check
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setVisible("Invalid email");
      return;
    }

    setLoading(true);
    const status = await resetPassword(email);
    setLoading(false);

    if (status.success) {
      setVisible("Password Reset Email Sent");
    } else {
      setVisible(status.message);
    }
  };
  const onDismissSnackBar = () => setVisible("");
  const { colors } = useTheme();
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <TouchableOpacity
        style={{
          position: "absolute",
          zIndex: 1,
          left: hp(2),
          top: wp(16),
          backgroundColor: Colors.lightGray,
          borderRadius: 50,
          padding: 5,
        }}
        onPress={() => {
          router.back();
        }}
      >
        <Ionicons name="arrow-back-outline" size={30} color="black" />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          gap: 14,
          height: hp(100),
        }}
      >
        <View
          style={{
            paddingTop: hp(8),
            maxHeight: hp(40),
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={ForgotPass}
            style={{ width: wp(80), height: hp(40) }}
          />
        </View>
        <View
          style={{
            paddingHorizontal: wp(5),
            paddingTop: hp(2),
            flex: 1,
            gap: hp(3.5),
          }}
        >
          <RNText
            font={"M-ExtraBold"}
            style={{
              fontSize: 31.5,
              lineHeight: 35,
              marginTop: 7,
              textAlign: "center",
              color: colors.text,
            }}
          >
            Forgot Password
          </RNText>
          <RNTextInput
            placeholder="Email address"
            mode="outlined"
            value={email}
            onChangeText={setEmail}
            outlineStyle={{
              borderWidth: 1,
              borderColor: "#afbfcf",

              borderRadius: 10,
            }}
            left={<TextInput.Icon icon="email" />}
          />
          <RNText
            font={"M-Medium"}
            style={{
              textAlign: "center",

              color: colors.text,
            }}
          >
            Please enter your registered email address to receive a password
            reset link to create a new password.
          </RNText>
          <View>
            {loading ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Loading size={hp(6.5)} />
              </View>
            ) : (
              <>
                <Pressable
                  style={{
                    backgroundColor: colors.text,
                    borderRadius: 5,
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
                  onPress={handleResetPassword}
                >
                  <RNText
                    font={"M-ExtraBold"}
                    style={{
                      fontSize: hp(2.2),
                      color: colors.background,
                      textAlign: "center",
                      padding: 7,
                      borderRadius: 5,
                    }}
                  >
                    Reset
                  </RNText>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </View>
      <Snackbar
        visible={visible !== ""}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Okay",
        }}
      >
        {visible}
      </Snackbar>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;
