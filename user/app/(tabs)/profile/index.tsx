import Button from "@/components/common/button";
import Input from "@/components/common/input";
import { useGetUserData } from "@/hooks/useGetUserData";
import { fontSizes, windowWidth } from "@/themes/app.constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function Profile() {
  const { user, loading } = useGetUserData();

  if (loading) {
    return;
  }

  return (
    <View style={{ paddingTop: 70 }}>
      <Text
        style={{
          textAlign: "center",
          fontSize: fontSizes.FONT30,
          fontWeight: "600",
        }}
      >
        My Profile
      </Text>
      <View style={{ padding: windowWidth(20) }}>
        <Input
          title="Name"
          value={user?.name}
          onChangeText={() => console.log("")}
          placeholder={user?.name!}
        />
        <Input
          title="Email Address"
          value={user?.email}
          onChangeText={() => console.log("")}
          placeholder={user?.email!}
          disabled={true}
        />
        <Input
          title="Phone Number"
          value={user?.phone_number}
          onChangeText={() => console.log("")}
          placeholder={user?.phone_number!}
          disabled={true}
        />
        <View style={{ marginVertical: 25 }}>
          <Button
            onPress={async () => {
              await AsyncStorage.removeItem("accessToken");
              router.push("/(routes)/login");
            }}
            title="Log Out"
            backgroundColor="crimson"
          />
        </View>
      </View>
    </View>
  );
}
