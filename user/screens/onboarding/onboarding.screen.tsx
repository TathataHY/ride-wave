import { slides } from "@/configs/constants";
import color from "@/themes/app.colors";
import { BackArrow } from "@/utils/icons";
import Images from "@/utils/images";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Swiper from "react-native-swiper";
import { styles } from "./styles";

export default function OnboardingScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: color.whiteColor }}>
      <Swiper
        activeDotStyle={styles.activeStyle}
        removeClippedSubviews={true}
        paginationStyle={styles.paginationStyle}
      >
        {slides.map((slide: (typeof slides)[0], index: number) => (
          <View style={[styles.slideContainer]} key={index}>
            <Image style={styles.imageBackground} source={slide.image} />
            <View style={[styles.imageBgView]}>
              <ImageBackground
                resizeMode="stretch"
                style={styles.img}
                source={Images.bgOnboarding}
              >
                <Text style={styles.title}>{slide.text}</Text>
                <Text style={styles.description}>{slide.description}</Text>
                <TouchableOpacity
                  style={styles.backArrow}
                  onPress={() => router.push("/(routes)/login")}
                >
                  <BackArrow colors={color.whiteColor} width={21} height={21} />
                </TouchableOpacity>
              </ImageBackground>
            </View>
          </View>
        ))}
      </Swiper>
    </View>
  );
}
