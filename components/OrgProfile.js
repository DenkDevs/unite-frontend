import React from "react";
import { View, Text } from "react-native";

class OrgProfile extends React.Component {
	render() {
		const clubName = "Coding Club";
		const description = "This is a club for coding enthusiasts.";

		return (
			<View>
				<Text style={{ fontSize: 24 }}>{clubName}</Text>
				<Text>{description}</Text>
			</View>
		);
	}
}

export default OrgProfile;
