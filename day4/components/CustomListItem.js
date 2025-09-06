import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ListItem, Text, Divider } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import ModalActions from "./ModalActions";

const CustomListItem = ({ info, navigation, id }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const formattedDate = info?.date?.toDate
    ? info.date.toDate().toLocaleDateString()
    : info?.date?.toDate
    ? info.date.toDate().toLocaleDateString()
    : "";

  return (
    <>
      <ListItem onPress={() => setModalVisible(true)} bottomDivider>
        {info.type === "expense" ? (
          <View style={styles.left} key={info.id}>
            <MaterialIcons name="money-off" size={24} color="white" />
          </View>
        ) : (
          <View style={styles.income}>
            <MaterialIcons name="attach-money" size={24} color="white" />
          </View>
        )}

        <ListItem.Content>
          <ListItem.Title
            style={{ fontWeight: "bold", textTransform: "capitalize" }}
          >
            {info.text}
          </ListItem.Title>
          <ListItem.Subtitle style={{ color: "gray" }}>
            {formattedDate}
          </ListItem.Subtitle>
        </ListItem.Content>

        <Text
          style={info.type === "expense" ? styles.right : styles.rightIncome}
        >
          {info.type === "expense" ? "-" : "+"}${info.price}
        </Text>
      </ListItem>

      {/* Modal Component */}

      <ModalActions
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        info={info}
        navigation={navigation}
        id={id}
      />

      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  left: {
    backgroundColor: "#533461",
    borderRadius: 8,
    padding: 10,
  },
  income: {
    backgroundColor: "#61ACB8",
    borderRadius: 8,
    padding: 10,
  },
  right: {
    fontWeight: "bold",
    color: "red",
  },
  rightIncome: {
    fontWeight: "bold",
    color: "green",
  },
});

export default CustomListItem;
