import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";

const ModalActions = ({ visible, onClose, info, navigation, id }) => {
  // ✅ Delete from Firestore
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "expense", id));
      Alert.alert("Deleted", "Transaction has been deleted.");
      onClose();
    } catch (error) {
      console.error("Error deleting transaction:", error);
      Alert.alert("Error", "Failed to delete transaction.");
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <AntDesign name="closecircle" size={24} color="red" />
          </TouchableOpacity>

          {/* Info about transaction */}
          <Text style={styles.modalText}>
            {info?.text || "No title"} {"\n"}
            {info?.price ? `$${info.price}` : ""}
          </Text>

          {/* Action Buttons */}
          <View style={styles.handleIcons}>
            {/* Edit */}
            <TouchableOpacity
              style={styles.pencil}
              onPress={() => {
                onClose();
                navigation.navigate("Update", { id, info });
              }}
            >
              <FontAwesome name="pencil" size={20} color="black" />
            </TouchableOpacity>

            {/* Delete */}
            <TouchableOpacity style={styles.trash} onPress={handleDelete}>
              <FontAwesome name="trash" size={20} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalActions;

const styles = StyleSheet.create({
  pencil: {
    backgroundColor: "aliceblue",
    borderRadius: 10,
    padding: 8,
  },
  trash: {
    backgroundColor: "aliceblue",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  closeIcon: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  handleIcons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
