import * as React from "react";
import {
	FlatList,
	ScrollView,
	View,
	StyleSheet,
	Image,
	Text,
	TextInput,
	TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB, FIREBASE_AUTH } from "../FirebaseConfig";

const ChatCard = ({ courseName, onPress }) => (
	<TouchableOpacity onPress={onPress} style={styles.chat}>
		<View style={styles.chatContent}>
			<Text style={styles.chatName}>{courseName}</Text>
		</View>
	</TouchableOpacity>
);
// TODO Add navigation to course chat screen
const MessagesScreen = () => {
	const [searchText, setSearchText] = useState("");
	const [coursesData, setCourses] = useState([]);

	useEffect(() => {
		// Fetch events from your database when the component mounts
		fetchCourses();
	}, []);

	const fetchCourses = async () => {
		// const testUser = "uexample3"; // For testing with specific user
        const currentUser = FIREBASE_AUTH.currentUser;
        if (currentUser) {
            const userId = currentUser.uid;
            try {
              const userDocRef = doc(FIREBASE_DB, "users", userId);
              const userDoc = await getDoc(userDocRef);
              if (userDoc.exists()) {
                const userData = userDoc.data();
                const coursesData = userData.courses;
                setCourses(coursesData);
              } else {
                console.log("No such user!");
              }
            } catch (error) {
              console.error("Error fetching data from Firestore:", error);
              return [];
            }
          } else {
            console.log("No user is logged in");
          }
        };
	return (
		<>
			<View style={styles.filterContainers}>
				<View style={styles.chatType}>
					<View style={styles.courseChats}>
						<TouchableOpacity>
							<Text>Course Chats</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.dms}>
						<TouchableOpacity>
							<Text>Direct Messages</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.filterContainers}>
					<TextInput
						style={styles.search}
						value={searchText}
						onChangeText={setSearchText}
						placeholder="Search for a Chat"
					/>
				</View>
			</View>
			<View style={styles.container}>
				<ScrollView style={styles.scrollSection}>
					{coursesData.length > 0 ? (
						// If coursesData is not empty, map through it and render ChatCard components
						coursesData.map((course, index) => (
							// console.log(course),
							<ChatCard
								key={index}
								courseName={course}
								// Add other course properties here
								onPress={() => {
									// navigateToCourse(course)
									console.log(course);
								}}
							/>
						))
					) : (
						// If coursesData is empty, display a message indicating no courses
						<Text>No courses found</Text>
					)}
				</ScrollView>
				<NavBar />
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#FFF",
		display: "flex",
		maxWidth: 480,
		width: "100%",
		flexDirection: "column",
		margin: "0 auto",
		flex: 1,
	},
	filterContainers: {
		alignItems: "center",
		backgroundColor: "#FFF",
		display: "flex",
		width: "100%",
		flexDirection: "column",
	},
	chatType: {
		display: "flex",
		marginTop: 15,
		width: "100%",
		maxWidth: 250,
		alignItems: "center",
		justifyContent: "space-between",
		gap: 20,
		fontSize: 14,
		color: "#000",
		fontWeight: "400",
		flexDirection: "row",
	},
	scrollSection: {
		display: "flex",
		flex: 1,
		width: "100%",
		backgroundColor: "#fff",
	},
	chatName: {
		fontSize: 16,
		color: "#000",
		textAlign: "center",
	},
	courseChats: {
		justifyContent: "center",
		alignItems: "stretch",
		borderRadius: 30,
		borderColor: "rgba(0, 0, 0, 1)",
		borderStyle: "solid",
		borderWidth: 1,
		backgroundColor: "#D4D4D4",
		padding: 10,
	},
	dms: {
		justifyContent: "center",
		alignItems: "stretch",
		borderRadius: 30,
		borderColor: "rgba(0, 0, 0, 1)",
		borderStyle: "solid",
		borderWidth: 1,
		padding: 10,
	},
	search: {
		height: 50,
		margin: 12,
		borderWidth: 1,
		textAlign: "center", // To center the text
		backgroundColor: "#ffffff",
		width: "95%",
		borderRadius: 20,
	},
	chat: {
		borderRadius: 5,
		borderColor: "rgba(0, 0, 0, 1)",
		borderStyle: "solid",
		borderWidth: 1,
		display: "flex",
		flexDirection: "row",
		margin: 0,
		justifyContent: "space-between",
		alignItems: "center",
		padding: 30,
		marginBottom: 1,
		marginHorizontal: 1,
	},
	chatPhoto: {
		backgroundColor: "#D9D9D9",
		borderRadius: "50%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: 71,
		height: 71,
		padding: "50",
	},
	notificationBubble: {
		backgroundColor: "#79C6E7",
		borderRadius: "50%",
		zIndex: "10",
		width: 28,
		flexShrink: 0,
		height: 28,
	},
	chatContent: {
		flex: 1, // Take up all available space
		justifyContent: "center", // Center content vertically
		alignItems: "center", // Center content horizontally
	},
});

export default MessagesScreen;
