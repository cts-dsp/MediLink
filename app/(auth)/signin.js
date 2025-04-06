import React, { useContext, useState } from "react";
import { View, Pressable, Alert, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LogoImg from "../../assets/app/login.png";
import Loading from "../../components/Loading";
import { AuthContext } from "../../context/authcontext";
import { useRouter } from "expo-router";
import CustomKeyboardView from "../../components/CustomKeybordView";
import RNText from "../../components/RNText";
import { Image } from "expo-image";
import { Snackbar, TextInput, useTheme } from "react-native-paper";
import RNTextInput from "../../components/RNTextInput";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const SignIn = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [hidePassword, setHidePassword] = useState(true);
  const [visible, setVisible] = useState("");

  const handleSignIn = async () => {
    if (email === "" || password === "") {
      setVisible("Email and Password are required");
      return;
    }

    setLoading(true);

    let response = await login(email, password);

    setLoading(false);
    if (!response.success) {
      setVisible(response.msg);
    }
  };

  const onDismissSnackBar = () => setVisible("");
  const { colors } = useTheme();
  return (
    <CustomKeyboardView>
      <View
        style={{
          paddingTop: hp(10),
          paddingHorizontal: wp(5),
          flex: 1,
          gap: 18,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={LogoImg}
            style={{
              width: wp(80),
              height: hp(30),
            }}
          />

          <RNText
            font={"M-SemiBold"}
            style={{
              fontSize: 31.5,
              marginTop: 14,
              color: colors.text,
            }}
          >
            Welcome Back
          </RNText>
          <RNText
            font={"M-Medium"}
            style={{
              fontSize: 16.5,
              lineHeight: 35,
              color: colors.text,
              textAlign: "center",
            }}
          >
            Login to keep track of your health
          </RNText>
        </View>

        <View
          style={{
            gap: 20,
            marginTop: 20,
            justifyContent: "center",
          }}
        >
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
            left={<TextInput.Icon icon="account" />}
          />

          <View
            style={{
              position: "relative",
            }}
          >
            <RNTextInput
              placeholder="Password"
              mode="outlined"
              secureTextEntry={hidePassword ? true : false}
              value={password}
              onChangeText={setPassword}
              outlineStyle={{
                borderWidth: 1,
                borderColor: "#afbfcf",
                borderRadius: 10,
              }}
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={hidePassword ? "eye" : "eye-off"}
                  onPress={() => setHidePassword(!hidePassword)}
                />
              }
            />

            <Pressable
              onPress={() => {
                router.push("/forgotpassword");
              }}
            >
              <RNText
                style={{
                  textAlign: "right",
                  marginTop: 8,
                  color: colors.text,
                }}
                font={"M-SemiBold"}
              >
                Forgot password?
              </RNText>
            </Pressable>
          </View>
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
              <Pressable
                style={{
                  backgroundColor: Colors.green,
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
                onPress={handleSignIn}
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
                  Sign In
                </RNText>
              </Pressable>
            )}
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 14,
              gap: 8,
            }}
          >
            <RNText style={{ color: colors.text }} font={"M-Medium"}>
              Don't have an account?
            </RNText>
            <TouchableOpacity
              onPress={() => {
                router.push("/signup");
              }}
            >
              <RNText style={{ color: Colors.red }} font={"M-Bold"}>
                Create An Account
              </RNText>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={{
          position: "absolute",
          left: hp(2),
          top: wp(16),
          backgroundColor: Colors.lightGray,
          borderRadius: 50,
          padding: 5,
        }}
        onPress={() => {
          router.push("/onboarding");
        }}
      >
        <Ionicons name="arrow-back-outline" size={30} color="black" />
      </TouchableOpacity>
      <Snackbar
        visible={visible !== ""}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Okay",
        }}
      >
        {visible}
      </Snackbar>
    </CustomKeyboardView>
  );
};

export default SignIn;
