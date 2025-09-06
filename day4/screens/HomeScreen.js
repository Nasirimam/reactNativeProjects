import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-elements";
import { auth, db } from "../firebase";
import { StatusBar } from "expo-status-bar";
import { AntDesign, Feather, FontAwesome5 } from "@expo/vector-icons";
import CustomListItem from "../components/CustomListItem";
import { signOut } from "firebase/auth";
import {
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
} from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  const [income, setIncome] = useState(0);
  const [expence, setExpence] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  // 🔹 Listen only if user exists
  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "expense"),
      where("email", "==", auth.currentUser.email),
      orderBy("date", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setTransactions(docs);
      },
      (error) => {
        console.error("Error fetching transactions:", error);
      }
    );

    return unsubscribe; // ✅ cleanup listener
  }, [auth.currentUser]);

  // 🔹 Calculate totals
  useEffect(() => {
    let totalIncome = 0;
    let totalExpence = 0;

    transactions.forEach((t) => {
      if (t.data.type === "income") {
        totalIncome += Number(t.data.price);
      } else if (t.data.type === "expense") {
        totalExpence += Number(t.data.price);
      }
    });

    setIncome(totalIncome);
    setExpence(totalExpence);
    setTotalBalance(totalIncome - totalExpence);
  }, [transactions]);

  // 🔹 Logout
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        setTransactions([]); // ✅ clear state so no queries with null
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${auth.currentUser?.displayName || "Home"}`,
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
            <Text style={{ fontWeight: "bold" }}>Logout</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.card}>
          <View style={styles.cardTop}>
            <Text style={{ textAlign: "center", color: "white" }}>
              Total Balance
            </Text>
            <Text h3 style={{ textAlign: "center", color: "white" }}>
              $ {totalBalance.toFixed(2)}
            </Text>
          </View>
          <View style={styles.cardBottom}>
            <View>
              <View style={styles.cardBottomSame}>
                <Feather name="arrow-down" size={20} color="green" />
                <Text style={{ textAlign: "center", marginLeft: 5 }}>
                  Income
                </Text>
              </View>
              <Text h4 style={{ textAlign: "center" }}>
                $ {income.toFixed(2)}
              </Text>
            </View>
            <View>
              <View style={styles.cardBottomSame}>
                <Feather name="arrow-up" size={20} color="red" />
                <Text style={{ textAlign: "center", marginLeft: 5 }}>
                  Expense
                </Text>
              </View>
              <Text h4 style={{ textAlign: "center" }}>
                $ {expence.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.recentTitle}>
          <Text h4>Recent Transactions</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("All")}
          >
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {transactions.length > 0 ? (
          <View style={styles.recentTransactions}>
            {transactions.slice(0, 5).map((t) => (
              <CustomListItem
                key={t.id}
                info={t.data}
                navigation={navigation}
                id={t.id}
              />
            ))}
          </View>
        ) : (
          <View style={styles.containerNull}>
            <FontAwesome5 name="list-alt" size={24} />
            <Text h4>No Transactions</Text>
          </View>
        )}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.addButton}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Home")}
        >
          <AntDesign name="home" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Add")}
        >
          <AntDesign name="plus" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("All")}
        >
          <FontAwesome5 name="list-alt" size={24} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 10,
  },
  card: {
    backgroundColor: "black",
    alignItems: "center",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginVertical: 20,
  },
  cardTop: {
    marginBottom: 20,
  },
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    backgroundColor: "#E0D1EA",
    borderRadius: 5,
  },
  cardBottomSame: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  recentTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  recentTransactions: {
    backgroundColor: "white",
    width: "100%",
  },
  seeAll: {
    fontWeight: "bold",
    color: "green",
    fontSize: 16,
  },
  addButton: {
    position: "absolute",
    bottom: 0,
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  containerNull: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%",
  },
});
