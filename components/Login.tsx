import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const LoginComponent: React.FC = () => {
  const handleCreateAccount = () => {
    console.log("Navigate to Create Account Screen");
  };

  const handleLogin = () => {
    console.log("Perform Login Operation");
  };

  return (
    <View style={styles.view1}>
      <Text style={styles.title}>Unite</Text>
      <TouchableOpacity style={styles.inputContainer} onPress={handleLogin}>
        <Text>Username</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.inputContainer} onPress={handleLogin}>
        <Text>Password</Text>
      </TouchableOpacity>
      <Text style={styles.registerPrompt}>Don’t have an account yet?</Text>
      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view1: {
    backgroundColor: "#FFF",
    alignItems: "center",
    fontSize: 20,
    color: "#000",
    fontWeight: "400",
    padding: 30,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    marginVertical: 30,
    fontSize: 50,
    fontFamily: "Inter, sans-serif",
  },
  inputContainer: {
    fontFamily: "Inter, sans-serif",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderColor: "rgba(0, 0, 0, 1)",
    borderWidth: 1,
    width: "80%",
    marginVertical: 10,
    padding: 10,
  },
  registerPrompt: {
    fontFamily: "Inter, sans-serif",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 30,
    padding: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "700",
  },
});

export default LoginComponent;