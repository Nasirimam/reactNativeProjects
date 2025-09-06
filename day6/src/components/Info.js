import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Info = ({ score, status }) => {
  return (
    <View>
      <View style={styles.view}>
        <Text style={styles.score}>
          <Text style={styles.scoreTitle}>X:</Text>
          {score.x}
        </Text>
        <Text style={[styles.score, styles.right]}>
          <Text style={styles.scoreTitle}>O:</Text>
          {score.o}
        </Text>
      </View>
      <Text style={styles.status}>{status}</Text>
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({
  view: {
    width: "98%",
    flexDirection: "row",
  },
  scoreTitle: {
    fontWeight: "bold",
    letterSpacing: 5,
  },
  score: {
    width: "50%",
    fontSize: 23,
  },
  right: {
    textAlign: "right",
  },
  status: {
    textAlign: "center",
    padding: 15,
    paddingTop: 35,
    fontSize: 30,
  },
});
