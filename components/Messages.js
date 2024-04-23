import * as React from "react";
import {
	ScrollView,
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	Alert,
	Modal,
	Button,
} from "react-native";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { useNavigation } from "@react-navigation/native";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	addDoc,
	setDoc,
	updateDoc,
	arrayUnion,
} from "firebase/firestore";
import { FIREBASE_DB, FIREBASE_AUTH } from "../FirebaseConfig";
const db = FIREBASE_DB;
const auth = FIREBASE_AUTH;

const ChatCard = ({ courseName, onPress, docId }) => (
	<TouchableOpacity onPress={onPress} style={styles.chat}>
		<View style={styles.eventImage}></View>
		<View style={styles.chatContent}>
			<Text style={styles.chatName}>{courseName}</Text>
		</View>
	</TouchableOpacity>
);
const MessagesScreen = () => {
	const [searchText, setSearchText] = useState("");
	const [coursesData, setCourses] = useState([]);
	const [activeTab, setActiveTab] = useState("Course Chats");
	const [users, setUsers] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);

	const navigation = useNavigation();

	useEffect(() => {
		fetchUsers();
	}, []);

	const handleUserSelect = (userId) => {
		createChat(userId);
		setModalVisible(false);
	};
	const fetchUsers = async () => {
		const usersCollectionRef = collection(FIREBASE_DB, "users");
		const snapshot = await getDocs(usersCollectionRef);
		const users = [];

		snapshot.forEach((doc) => {
			const userData = doc.data();
			// Exclude the current user from the list
			if (doc.id !== auth.currentUser.uid) {
				users.push({
					id: doc.id,
					name: `${userData.fname} ${userData.lname}`,
				});
			}
		});

		setUsers(users);
	};
	const createChat = async (userId) => {
		const chatCollectionRef = collection(db, "chats");
		const chatDocRef = await addDoc(chatCollectionRef, {
			chatType: "direct",
			members: [auth.currentUser.uid, userId],
			recentMessages: {
				messageText: "",
				sentAt: new Date(),
				sentBy: "",
			},
		});

		const chatId = chatDocRef.id;

		// Get the users' documents
		const userDocRef = doc(db, "users", auth.currentUser.uid);
		const otherUserDocRef = doc(db, "users", userId);

		// Fetch the other user's data to get their name
		const otherUserData = await getDoc(otherUserDocRef);
		const otherUserFirstName = otherUserData.data().fname;
		const otherUserLastName = otherUserData.data().lname;

		await setDoc(
			chatDocRef,
			{
				chatId: chatId,
				chatTitle: otherUserFirstName + " " + otherUserLastName,
			},
			{ merge: true }
		);

		// Update the users' chats array
		await updateDoc(userDocRef, {
			chats: arrayUnion(chatId),
		});
		await updateDoc(otherUserDocRef, {
			chats: arrayUnion(chatId),
		});
		fetchChats();
	};

	const handleAddChatPress = () => {
		setModalVisible(true);
	};
	useEffect(() => {
		// Fetch events from your database when the component mounts or activeTab changes
		fetchChats();
	}, [activeTab]);

	const navigateToChat = (chatDocId) => {
		// Navigate to event details page, passing the event key as a parameter
		navigation.navigate("Chat", { chatDocId });
	};

	const findChatDocs = async (userChats) => {
		const chatCollectionRef = collection(FIREBASE_DB, "chats");
		const snapshot = await getDocs(chatCollectionRef);
		const filtered = [];

		snapshot.forEach((doc) => {
			const chatData = doc.data();
			if (chatData.chatId && userChats.includes(chatData.chatId)) {
				filtered.push({
					docId: doc.id,
					chatFields: chatData,
				}); // Collect the entire document data if courseId matches
			}
		});
		// console.log(filtered);

		return filtered;
	};

	const fetchChats = async () => {
		const currentUser = FIREBASE_AUTH.currentUser;
		if (currentUser) {
			const userId = currentUser.uid;
			try {
				const userDocRef = doc(FIREBASE_DB, "users", userId);
				const userDoc = await getDoc(userDocRef);
				if (userDoc.exists()) {
					const userData = userDoc.data();
					const userChats = userData.chats;

					let chatDocIds = await findChatDocs(userChats);

					// Filter chats based on activeTab and whether the user's UUID is in the members field
					if (activeTab === "Course Chats") {
						chatDocIds = chatDocIds.filter(
							(chat) => chat.chatFields.chatType === "course"
						);
					} else if (activeTab === "Direct Messages") {
						chatDocIds = chatDocIds.filter(
							(chat) =>
								chat.chatFields.chatType === "direct" &&
								chat.chatFields.members.includes(userId)
						);
					}

					setCourses(chatDocIds);
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
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<ScrollView>
							{users.map((user, index) => (
								<Button
									key={index}
									title={user.name}
									onPress={() => handleUserSelect(user.id)}
								/>
							))}
						</ScrollView>
						<Button
							title="Close"
							onPress={() => setModalVisible(!modalVisible)}
						/>
					</View>
				</View>
			</Modal>
			<View style={styles.filterContainers}>
				<View style={styles.chatType}>
					<View>
						<TouchableOpacity
							style={
								activeTab === "Course Chats" ? styles.tabActive : styles.tab
							}
							onPress={() => {
								setActiveTab("Course Chats");
								(async () => {
									await fetchChats();
								})();
							}}>
							<Text>Course Chats</Text>
						</TouchableOpacity>
					</View>
					<View>
						<TouchableOpacity
							style={
								activeTab === "Direct Messages" ? styles.tabActive : styles.tab
							}
							onPress={() => {
								setActiveTab("Direct Messages");
								(async () => {
									await fetchChats();
								})();
							}}>
							<Text>Direct Messages</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.filterContainers}>
					{activeTab === "Direct Messages" && (
						<TouchableOpacity style={styles.addDm} onPress={handleAddChatPress}>
							<Text> + Chat </Text>
						</TouchableOpacity>
					)}
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
								courseName={course.chatFields.chatTitle}
								// Add other course properties here
								onPress={() => {
									navigateToChat(course.docId);
									console.log(course.docId);
								}}
							/>
						))
					) : (
						// If coursesData is empty, display a message indicating no courses
						<Text>No chats found</Text>
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
		paddingTop: 20,
		display: "flex",
		flex: 1,
		width: "100%",
		backgroundColor: "#fff",
	},
	chatName: {
		fontSize: 16,
		color: "#000",
		textAlign: "center",
		fontWeight: "bold",
	},
	tabActive: {
		justifyContent: "center",
		alignItems: "stretch",
		borderRadius: 30,
		borderColor: "rgba(0, 0, 0, 1)",
		borderStyle: "solid",
		borderWidth: 1,
		backgroundColor: "#D4D4D4",
		padding: 10,
	},
	tab: {
		justifyContent: "center",
		alignItems: "stretch",
		borderRadius: 30,
		borderColor: "rgba(0, 0, 0, 1)",
		borderStyle: "solid",
		backgroundColor: "transparent",
		borderWidth: 1,
		padding: 10,
	},
	addDm: {
		justifyContent: "center",
		alignItems: "center",
		height: 50,
		margin: 12,
		borderWidth: 1,
		textAlign: "center", // To center the text
		backgroundColor: "#d5e3ff",
		width: "95%",
		borderRadius: 20,
	},
	chat: {
		borderRadius: 20,
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
		marginRight: 12,
		marginLeft: 12,
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
	eventImage: {
		backgroundColor: "#9F9F9F",
		borderRadius: 30,
		width: 69,
		flexShrink: 0,
		height: 69,
		margin: "auto 0",
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
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
});

export default MessagesScreen;
