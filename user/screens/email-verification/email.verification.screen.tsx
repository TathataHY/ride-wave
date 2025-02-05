import Button from "@/components/common/button";
import SignInText from "@/components/login/signin.text";
import { commonStyles } from "@/styles/common.style";
import { external } from "@/styles/external.style";
import color from "@/themes/app.colors";
import { windowHeight } from "@/themes/app.constant";
import AuthContainer from "@/utils/container/auth-container";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import OTPTextInput from "react-native-otp-textinput";
import { Toast } from "react-native-toast-notifications";
import { style } from "../verification/style";

export default function EmailVerificationScreen() {
  const [otp, setOtp] = useState("");
  const [loader, setLoader] = useState(false);
  const { user } = useLocalSearchParams() as any;
  const parsedUser = JSON.parse(user);

  const handleSubmit = async () => {
    setLoader(true);
    const otpNumbers = `${otp}`;
    await axios
      .put(`${process.env.EXPO_PUBLIC_SERVER_URI}/email-otp-verify`, {
        token: parsedUser.token,
        otp: otpNumbers,
      })
      .then(async (res: any) => {
        setLoader(false);
        await AsyncStorage.setItem("accessToken", res.data.accessToken);
        router.push("/(tabs)/home");
      })
      .catch((error) => {
        setLoader(false);
        Toast.show(error.message, {
          placement: "bottom",
          type: "danger",
        });
      });
  };

  return (
    <AuthContainer
      topSpace={windowHeight(240)}
      imageShow={true}
      container={
        <View>
          <SignInText
            title={"Email Verification"}
            subtitle={"Check your email address for the otp!"}
          />
          <OTPTextInput
            handleTextChange={(code) => setOtp(code)}
            inputCount={4}
            textInputStyle={style.otpTextInput}
            tintColor={color.subtitle}
            autoFocus={false}
          />
          <View style={[external.mt_30]}>
            <Button
              title="Verify"
              onPress={() => handleSubmit()}
              disabled={loader}
            />
          </View>
          <View style={[external.mb_15]}>
            <View
              style={[
                external.pt_10,
                external.Pb_10,
                { flexDirection: "row", gap: 5, justifyContent: "center" },
              ]}
            >
              <Text style={[commonStyles.regularText]}>Not Received yet?</Text>
              <TouchableOpacity>
                <Text style={[style.signUpText, { color: "#000" }]}>
                  Resend it
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      }
    />
  );
}
