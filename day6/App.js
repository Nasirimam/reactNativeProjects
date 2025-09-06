import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Board from "./src/components/Board";
import MainMenu from "./src/screens/MainMenu";

export default function App() {
  const [isPlay, setPlay] = useState(false);

  return (
    <View style={styles.container}>
      {isPlay ? <Board setPlay={setPlay} /> : <MainMenu setPlay={setPlay} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
