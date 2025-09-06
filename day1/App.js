import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ColorBox from "./src/Comp/ColorBox";
import { ArrayColor } from "./src/Comp/arrayColor";

export default function App() {
  return (
    <View style={styles.constainer}>
      <Text>List Of Colors</Text>
      <FlatList
        data={ArrayColor}
        keyExtractor={(item) => item.hex}
        renderItem={({ item }) => (
          <ColorBox hexValue={item.hex} name={item.name} rgb={item.rgb} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  constainer: {
    padding: 10,
    marginTop: 20,
  },
});
