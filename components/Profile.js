import { useNavigation } from "@react-navigation/native";
import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import NavBar from "./NavBar";
import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB, FIREBASE_AUTH } from "../FirebaseConfig";

const Tag = ({ text, style }) => (
	<View style={[styles.tagView, style]}>
		<Text style={styles.tagText}>{text}</Text>
	</View>
);

const InterestSection = ({ interests }) => (
	<View style={styles.sectionContainer}>
		{interests.map((interest, index) => (
			<Tag key={index} text={interest.text} style={interest.style} />
		))}
	</View>
);

const ProfileScreen = () => {
	const [user, setUser] = useState(null);
	const [courses, setCourses] = useState([]);

	useEffect(() => {
		const fetchUser = async () => {
			const currentUser = FIREBASE_AUTH.currentUser;
			if (currentUser) {
				const userDocRef = doc(FIREBASE_DB, "users", currentUser.uid);
				const userDoc = await getDoc(userDocRef);
				if (userDoc.exists()) {
					const userData = userDoc.data();
					setCourses(
						userData.courses.map((courseName) => ({
							text: courseName,
							style: styles.yellowTag,
						}))
					);
					setUser(userData);
				} else {
					console.log("No such user!");
				}
			}
		};

		fetchUser();
	}, []);

	// const userInterests = [
	// 	{ text: "🎓 4th year", style: styles.yellowTag },
	// 	{ text: "💻 Computer Science", style: styles.yellowTag },
	// 	{ text: "🕹 Games", style: styles.yellowTag },
	// 	{ text: "🎾 Tennis", style: styles.yellowTag },
	// 	{ text: "👍 Looking for Friends!", style: styles.yellowTag },
	// 	{ text: "🎥 Movies", style: styles.yellowTag },
	// ];
	const navigation = useNavigation();

	const handleClick = (path) => {
		navigation.navigate(path);
	};

	return (
		<View style={styles.container}>
			<View style={styles.profileContainer}>
				<View style={styles.profileHeader}>
					<Image
						resizeMode="cover"
						source={{ uri: "{{placeholder}}" }}
						style={styles.profileImage}
					/>
				</View>
				<View style={styles.avatarPlaceholder} />
				<Text style={styles.userName}>
					{user ? `${user.fname} ${user.lname}` : "Loading..."}
				</Text>
				{/* <Text style={styles.sectionTitle}>My Interests</Text>
			<InterestSection interests={userInterests} /> */}
				<Text style={styles.sectionTitle}>My Classes</Text>
				<InterestSection interests={courses} />
				<TouchableOpacity onPress={() => handleClick("Statistics")}>
					<Text style={styles.actionText}>View User Statistics</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => handleClick("Schedule")}>
					<Text style={styles.actionText}>Course Schedule</Text>
				</TouchableOpacity>
				{/* <TouchableOpacity onPress={() => handleIconPress("Edit Profile")}>
				<Text style={styles.actionText}>Edit Profile</Text>
			</TouchableOpacity> */}
			</View>
			<NavBar />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flex: 1,
	},
	profileContainer: {
		backgroundColor: "#FFF",
		maxWidth: 480,
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		margin: "0 auto",
		paddingVertical: 0,
		flex: 1,
	},
	profileHeader: {
		width: "100%",
		justifyContent: "center",
		gap: 0,
		paddingRight: 21,
	},
	profileImage: {
		alignSelf: "start",
		width: 0,
		height: 0,
	},
	avatarPlaceholder: {
		backgroundColor: "#D9D9D9",
		borderRadius: 111,
		marginTop: 25,
		width: 177,
		height: 177,
	},
	userName: {
		marginTop: 30,
		fontSize: 36,
	},
	sectionTitle: {
		textAlign: "center",
		fontWeight: "700",
		marginTop: 30,
	},
	sectionContainer: {
		marginTop: 9,
		alignItems: "stretch",
		gap: 12,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
	},
	tagView: {
		borderRadius: 16.5,
		padding: 8,
		margin: 4,
		alignItems: "center",
		justifyContent: "center",
	},
	yellowTag: {
		backgroundColor: "#FEFAE0",
	},
	tagText: {},
	actionText: {
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 30,
		borderColor: "rgba(0, 0, 0, 1)",
		borderWidth: 1,
		marginTop: 17,
		width: 285,
		padding: 10,
		fontSize: 15,
		textAlign: "center",
	},
});

export default ProfileScreen;
