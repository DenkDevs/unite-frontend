import React, { useState, useEffect, useRef } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TextInput,
	TouchableOpacity,
} from "react-native";
import {
	collection,
	doc,
	getDoc,
	addDoc,
	onSnapshot,
	orderBy,
	query,
} from "firebase/firestore";
import { FIREBASE_DB, FIREBASE_AUTH } from "../FirebaseConfig"; // Make sure this is correctly imported
// Function to fetch user's first name and last name
const getUserName = async (userId) => {
	const userDocRef = doc(FIREBASE_DB, "users", userId);
	const userDocSnapshot = await getDoc(userDocRef);

	if (userDocSnapshot.exists()) {
		const { fname, lname } = userDocSnapshot.data();
		// console.log(`${fname} ${lname}`);
		return `${fname} ${lname}`;
	} else {
		console.log("No such user!");
		return null;
	}
};

// Modify TextBubble component
const TextBubble = ({ messageText, sentAt, sentBy, currentUser }) => {
	// Convert Firestore timestamp to JavaScript Date object
	const date = sentAt.toDate();

	// Format date as a string
	const formattedDate = `${date.getDate()}/${
		date.getMonth() + 1
	}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

	// Determine bubble style and text color based on sender
	const bubbleStyle =
		sentBy === currentUser ? styles.bubbleRight : styles.bubbleLeft;
	const bubbleColor = sentBy === currentUser ? "#7d65dc" : "#D9D9D9";
	const textColor = sentBy === currentUser ? "#fff" : "#000";

	// Fetch user's first name and last name
	const [userName, setUserName] = useState("");
	useEffect(() => {
		const fetchUserName = async () => {
			const name = await getUserName(sentBy);
			setUserName(name);
			// console.log(userName);
		};

		if (sentBy !== "system") {
			fetchUserName();
		}
	}, [sentBy]);
	return (
		<>
			<View
				style={[
					styles.textBubble,
					bubbleStyle,
					{ backgroundColor: bubbleColor },
				]}>
				<Text style={{ color: textColor }}>{messageText}</Text>
			</View>
			<View
				style={[
					{ flexDirection: "row", opacity: 0.7 },
					sentBy === currentUser ? { alignSelf: "flex-end" } : {},
				]}>
				{sentBy === currentUser ? (
					<Text
						style={{
							fontSize: 12,
							marginRight: 10,
						}}>{`${date.getHours()}:${date.getMinutes()}`}</Text>
				) : (
					<>
						<Text
							style={{
								fontSize: 12,
								marginRight: 10,
							}}>{`${formattedDate}`}</Text>
						<Text style={{ fontSize: 12 }}>{`${userName}`}</Text>
					</>
				)}
			</View>
		</>
	);
};

const ChatScreen = ({ route }) => {
	const currentUser = FIREBASE_AUTH.currentUser.uid;
	const { chatDocId: chatGroupMessagesId } = route.params;
	const [messages, setMessages] = useState([]);
	const [chatTitle, setChatTitle] = useState("");
	const [inputText, setInputText] = useState("");
	const scrollViewRef = useRef();

	useEffect(() => {
		const fetchChatData = async () => {
			const chatDocRef = doc(FIREBASE_DB, "chats", chatGroupMessagesId);
			const chatDocSnapshot = await getDoc(chatDocRef);

			if (chatDocSnapshot.exists()) {
				setChatTitle(chatDocSnapshot.data().chatTitle);
			} else {
				console.log("No such document!");
			}
		};

		fetchChatData();

		const messagesCollectionRef = collection(
			FIREBASE_DB,
			"chatMessages",
			chatGroupMessagesId,
			"messages"
		);

		// Listen for changes in the messages collection
		const unsubscribe = onSnapshot(
			query(messagesCollectionRef, orderBy("sentAt", "asc")), // Order by sentAt in ascending order
			(snapshot) => {
				const messagesData = snapshot.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}));

				setMessages(messagesData);
			}
		);

		// Clean up the listener when the component is unmounted
		return () => unsubscribe();
	}, [chatGroupMessagesId]);

	const handleSending = async (messageText) => {
		const messagesCollectionRef = collection(
			FIREBASE_DB,
			"chatMessages",
			chatGroupMessagesId,
			"messages"
		);

		await addDoc(messagesCollectionRef, {
			messageText,
			sentAt: new Date(),
			sentBy: currentUser,
		});
	};
	return (
		<>
			<Text style={styles.chatTitle}>{chatTitle}</Text>
			<ScrollView
				style={styles.container}
				ref={scrollViewRef}
				onContentSizeChange={() =>
					scrollViewRef.current.scrollToEnd({ animated: true })
				}
				contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}>
				<View style={styles.messagesContainer}>
					<View style={styles.profileContainer}></View>
					{messages.map((msg, index) => (
						<TextBubble
							key={index}
							messageText={msg.messageText}
							sentAt={msg.sentAt}
							sentBy={msg.sentBy}
							currentUser={currentUser}
							backgroundColor={msg.backgroundColor}
							color={msg.color}
						/>
					))}
				</View>
			</ScrollView>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder="Type a message..."
					value={inputText}
					onChangeText={setInputText}
				/>
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						handleSending(inputText);
						setInputText(""); // Clear the input field after sending the message
					}}>
					<Text style={styles.buttonText}>Send</Text>
				</TouchableOpacity>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#FFF",
		paddingVertical: 5,
		paddingHorizontal: 0,
		margin: "auto",
	},
	messagesContainer: {
		paddingHorizontal: 10,
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
	chatTitle: {
		display: "flex",
		textAlign: "center",
		margin: 10,
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
		padding: 15,
		borderRadius: 20,
		marginTop: 10,
	},
	largeFeatureImage: {
		width: "100%",
		height: 200, // Adjusted for better layout
		alignSelf: "center",
	},
	bubbleRight: {
		alignSelf: "flex-end",
		backgroundColor: "#7d65dc",
	},
	bubbleLeft: {
		alignSelf: "flex-start",
		backgroundColor: "#D9D9D9",
	},
	inputContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 25,
		backgroundColor: "#fff",
	},
	input: {
		flex: 1,
		height: 40,
		borderColor: "#000",
		borderWidth: 1,
		marginRight: 10,
		padding: 10,
		borderRadius: 20,
	},
	button: {
		backgroundColor: "#7d65dc",
		padding: 10,
		borderRadius: 5,
	},
	buttonText: {
		color: "#fff",
		textAlign: "center",
	},
});

export default ChatScreen;
