import RideCard from "@/components/ride/ride.card";
import styles from "@/screens/home/styles";
import color from "@/themes/app.colors";
import { windowHeight } from "@/themes/app.constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function Rides() {
  const [recentRides, setrecentRides] = useState([]);
  const getRecentRides = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const res = await axios.get(
      `${process.env.EXPO_PUBLIC_SERVER_URI}/driver/get-rides`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    setrecentRides(res.data.rides);
  };

  useEffect(() => {
    getRecentRides();
  }, []);

  return (
    <View
      style={[
        styles.rideContainer,
        { backgroundColor: color.lightGray, paddingTop: windowHeight(40) },
      ]}
    >
      <Text
        style={[
          styles.rideTitle,
          { color: color.primaryText, fontWeight: "600" },
        ]}
      >
        Ride History
      </Text>
      <ScrollView>
        {recentRides?.map((item: any, index: number) => (
          <RideCard item={item} key={index} />
        ))}
      </ScrollView>
    </View>
  );
}
