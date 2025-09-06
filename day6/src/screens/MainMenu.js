import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Constants from "expo-constants";
import { useFonts, Lobster_400Regular } from "@expo-google-fonts/lobster";
import * as localization from "expo-localization";
import { ACTIVE_OPACITY } from "../Design";
import i18n from "../Localization";

const MainMenu = ({ setPlay }) => {
  const [value, setValue] = useState("");
  const [fontLoaded] = useFonts({
    Lobster_400Regular,
  });

  const playGame = () => {
    setPlay(true);
  };

  if (!fontLoaded) {
    return null;
  }

  return (
    <View style={styles.mainMenuView}>
      <Text style={[styles.title, { fontFamily: "Lobster_400Regular" }]}>
        {i18n.t("title")}
      </Text>
      <TouchableOpacity
        activeOpacity={ACTIVE_OPACITY}
        style={styles.button}
        onPress={playGame}
      >
        <Text style={styles.text}>{i18n.t("play")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainMenu;

const styles = StyleSheet.create({
  mainMenuView: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    letterSpacing: 5,
    marginBottom: 65,
  },
  button: { borderRadius: 5, backgroundColor: "green" },
  text: {
    color: "white",
    fontSize: 20,
    paddingVertical: 8,
    paddingHorizontal: 35,
  },
});
