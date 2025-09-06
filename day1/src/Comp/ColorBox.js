import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ColorBox = (props) => {
  const bgColor = {
    backgroundColor: props.rgb,
  };

  return (
    <View style={[style.box, bgColor]}>
      <Text>Name - {props.name}</Text>
      <Text>Hex - {props.hexValue}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  box: {
    padding: 20,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ColorBox;
