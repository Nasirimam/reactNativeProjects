import React from "react";
import { StyleSheet, Dimensions, TouchableOpacity, Text } from "react-native";
import {
  SQUARE_MARGIN,
  SQUARE_BORDER_WIDTH,
  SQUARE_BORDER_COLOR,
  SQUARE_DEFAULT_COLOR,
  SQUARE_WINNER_COLOR,
  UI_MARGIN,
} from "../Design";

const width = Dimensions.get("window").width;

const Square = ({ value, onClick, isWin }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        styles.square,
        { backgroundColor: isWin ? SQUARE_WINNER_COLOR : SQUARE_DEFAULT_COLOR },
      ]}
      onPress={onClick}
    >
      <Text style={styles.squareText}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  square: {
    flex: 1,
    height: width / 3 - SQUARE_MARGIN - UI_MARGIN,
    textAlign: "center",
    padding: 0,
    margin: SQUARE_MARGIN,
    borderWidth: SQUARE_BORDER_WIDTH,
    borderColor: SQUARE_BORDER_COLOR,
    borderRadius: 2,
  },
  squareText: {
    lineHeight: width / 3 - SQUARE_MARGIN - UI_MARGIN,
    fontSize: width * 0.23,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Square;
