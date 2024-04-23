import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../FirebaseConfig"; // Make sure this is correctly imported

const TextBubble = ({ text, backgroundColor = "#D9D9D9", color = "#000" }) => (
  <View style={[styles.textBubble, { backgroundColor }]}>
    <Text style={{ color }}>{text}</Text>
  </View>
);

const messages = [
  {
    type: "text",
    content: "Did anyone take a picture of the whiteboard? I missed it",
  },
  { type: "text", content: "Me too 😭" },
  { type: "text", content: "Does anyone still need a group?" },
  { type: "text", content: "I do!", backgroundColor: "#7D65DC", color: "#FFF" },
  { type: "text", content: "Looking for Study Partner!" },
];

const ChatScreen = ({ route }) => {
  const { chatDocId } = route.params;
  const [chatData, setChatData] = useState({ messages: [] });

  useEffect(() => {
    const fetchChatData = async () => {
      const chatDocRef = doc(FIREBASE_DB, "chats", chatDocId);
      const chatDoc = await getDoc(chatDocRef);

      if (chatDoc.exists()) {
        setChatData(chatDoc.data());
        console.log(chatDoc.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchChatData();
  }, [chatDocId]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.messagesContainer}>
        <View style={styles.profileContainer}>
          <Image
            resizeMode="cover"
            source={{ uri: "profile_picture_uri" }}
            style={styles.profileImage}
          />
          <Text style={styles.courseCode}>
            {chatData.courseId || "CS 6457"}
          </Text>
          <Image
            resizeMode="cover"
            source={{ uri: "additional_image_uri" }}
            style={styles.additionalImage}
          />
        </View>
        <Image
          resizeMode="cover"
          source={{ uri: "decorative_image_uri" }}
          style={styles.decorativeImage}
        />
        {messages.map((msg, index) => (
          <TextBubble
            key={index}
            text={msg.content}
            backgroundColor={msg.backgroundColor}
            color={msg.color}
          />
        ))}
      </View>
      <Image
        resizeMode="cover"
        source={{ uri: "large_feature_image_uri" }}
        style={styles.largeFeatureImage}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    paddingVertical: 35,
    paddingHorizontal: 0,
    margin: "auto",
  },
  messagesContainer: {
    paddingHorizontal: 31,
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 50, // Adjusted for visibility
    height: 50, // Adjusted for visibility
    borderRadius: 25, // Half of width and height
  },
  courseCode: {
    flexGrow: 1,
    textAlign: "center",
  },
  additionalImage: {
    width: 48,
    height: 48,
  },
  decorativeImage: {
    width: 24,
    height: 24,
    alignSelf: "center",
  },
  textBubble: {
    backgroundColor: "#D9D9D9",
    padding: 13,
    borderRadius: 18,
    marginTop: 12,
  },
  largeFeatureImage: {
    width: "100%",
    height: 200, // Adjusted for better layout
    alignSelf: "center",
  },
});

export default ChatScreen;
