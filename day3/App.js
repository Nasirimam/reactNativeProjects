import React from "react";
import AppNavigater from "./src/navigater/AppNavigater";
import { ThemeProvider } from "react-native-rapi-ui";
import { AuthProvider } from "./src/AuthContext/AuthProvider";

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppNavigater />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
