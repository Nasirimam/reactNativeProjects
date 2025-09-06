import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme, themeColor } from "react-native-rapi-ui";
import { getApps, initializeApp } from "firebase/app";

import Home from "../screens/Home";
import SecondScreen from "../screens/SecondScreen";
import About from "../screens/About";
import Profile from "../screens/Profile";
import TabBarIcon from "../components/TabBarIcon";
import TabBarTaxt from "../components/TabBarText";
import ForgotPassword from "../screens/AuthScreen/ForgotPassword";
import Login from "../screens/AuthScreen/Login";
import Register from "../screens/AuthScreen/Register";
import Loding from "../screens/utils/Loding";
import { AuthContext } from "../AuthContext/AuthProvider";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyC9ZTFTWSRLGLF5yVmFFO4OvIQmazbkgaY",
  authDomain: "reactauth-8782c.firebaseapp.com",
  projectId: "reactauth-8782c",
  storageBucket: "reactauth-8782c.appspot.com", // ✅ fixed
  messagingSenderId: "625318071926",
  appId: "1:625318071926:web:603d7b8377a0866bbd5957",
  measurementId: "G-1GVSX4E4E4",
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

const MainTabs = () => {
  const { isDarkmode } = useTheme();
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: isDarkmode ? themeColor.dark100 : "white",
          backgroundColor: isDarkmode ? themeColor.dark100 : "white",
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: () => <TabBarTaxt title="Home" />,
          tabBarIcon: () => <TabBarIcon icon={"home"} />,
        }}
      />
      <Tabs.Screen
        name="About"
        component={About}
        options={{
          tabBarLabel: () => <TabBarTaxt title="About" />,
          tabBarIcon: () => <TabBarIcon icon={"information-circle"} />,
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: () => <TabBarTaxt title="Profile" />,
          tabBarIcon: () => <TabBarIcon icon={"person"} />,
        }}
      />
    </Tabs.Navigator>
  );
};

const Main = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainTabs" component={MainTabs} />
    <Stack.Screen name="SecondScreen" component={SecondScreen} />
  </Stack.Navigator>
);

const AuthStack = createNativeStackNavigator();

const Auth = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="Register" component={Register} />
    <AuthStack.Screen name="ForgetPassword" component={ForgotPassword} />
  </AuthStack.Navigator>
);

const MainNavigater = () => {
  const { user } = useContext(AuthContext); // ✅ fixed

  return (
    <NavigationContainer>
      {user === null && <Loding />}
      {user === false && <Auth />}
      {user === true && <Main />}
    </NavigationContainer>
  );
};

export default MainNavigater;
