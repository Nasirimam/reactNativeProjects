import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

const UpdateScreen = ({ route, navigation }) => {
  // ✅ Get id + info object from params
  const { id, info } = route.params;

  // ✅ Destructure safely from info
  const { text, price, type, date } = info;

  // ✅ Initialize states with existing values
  const [input, setInput] = useState(text || "");
  const [amount, setAmount] = useState(price?.toString() || "");
  const [selected, setSelected] = useState(type || "");
  const [pickedDate, setPickedDate] = useState(
    date?.toDate ? date.toDate() : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleUpdate = async () => {
    if (!input || !amount || !selected) {
      Alert.alert("Validation", "Please fill all fields.");
      return;
    }

    try {
      const expenseRef = doc(db, "expense", id);
      await updateDoc(expenseRef, {
        text: input,
        price: Number(amount),
        type: selected,
        date: Timestamp.fromDate(pickedDate), // ✅ Store Firestore timestamp
      });

      Alert.alert("Success", "Expense updated!");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating expense:", error);
      Alert.alert("Error", "Failed to update expense.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Expense</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Title"
          style={styles.input}
          value={input}
          onChangeText={setInput}
        />

        <TextInput
          placeholder="Amount"
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        <Picker
          selectedValue={selected}
          style={styles.input}
          onValueChange={(itemValue) => setSelected(itemValue)}
        >
          <Picker.Item label="Select type" value="" />
          <Picker.Item label="Income" value="income" />
          <Picker.Item label="Expense" value="expense" />
        </Picker>

        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>{pickedDate.toLocaleDateString()}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={pickedDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setPickedDate(selectedDate);
            }}
          />
        )}

        <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
          <Text style={styles.saveText}>Update</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: "gray" }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.saveText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpdateScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 20,
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  dateButton: {
    height: 50,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "gray",
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: "black",
  },
  saveButton: {
    backgroundColor: "#533461",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  saveText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
