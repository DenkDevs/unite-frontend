import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const NavBar = () => {
  const navigation = useNavigation();

  const handleIconPress = (path) => {
    // Handle button press here
    navigation.navigate(path);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleIconPress("Home")}
        style={styles.iconButton}
      >
        <Ionicons name="home-outline" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleIconPress("Calendar")}
        style={styles.iconButton}
      >
        <Ionicons name="calendar-outline" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleIconPress("Messages")}
        style={styles.iconButton}
      >
        <Ionicons name="chatbox-outline" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleIconPress("Profile")}
        style={styles.iconButton}
      >
        <Ionicons name="person-outline" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
  },
  iconButton: {
    paddingHorizontal: 10,
  },
});

export default NavBar;
