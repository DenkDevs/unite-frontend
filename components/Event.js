import React from "react";
import { View, StyleSheet, Image, Text, Button } from "react-native";

const EventDetails = ({ date, location }) => (
  <View style={styles.detailsContainer}>
    <Text style={styles.detailsText}>
      {date} {"\n"} {location}
    </Text>
  </View>
);

const EventScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <Image
          resizeMode="contain"
          source={{ uri: "imageUri1" }}
          style={styles.eventImage}
        />
        <View style={styles.eventTitleContainer}>
          <Text style={styles.eventTitleText}>
            Valentine’s Day Soldering Workshop
          </Text>
        </View>
        <View style={styles.graphicContainer}>
          <Text style={styles.graphicText}>graphic for event</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => console.log("The Hive Location Clicked")}
              title="The Hive"
              color="#000"
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => console.log("Save Event to Calendar")}
              title="+ Save event to calendar"
              color="#000"
            />
          </View>
        </View>
        <EventDetails
          date="Wednesday, February 14, 6:30 PM - 8:30 PM"
          location="Interdisciplinary Design Commons, 777 Atlantic Dr NW, Atlanta, GA"
        />
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            Learn how to solder your very own Valentine's Day Heart! {"\n"}
            The event is limited to the first 20 sign-ups. {"\n"}
            Please fill out the RSVP form to secure your spot. If you can no
            longer make the event, please update and cancel your RSVP. If you
            are placed on the waitlist, you will be automatically promoted to
            the confirmed attending list if and when a spot opens up.
          </Text>
        </View>
        <View style={styles.rsvpContainer}>
          <Button
            onPress={() => console.log("RSVP Button Clicked")}
            title="RSVP HERE!"
            color="#000"
          />
        </View>
      </View>
      <Image
        resizeMode="contain"
        source={{ uri: "imageUri4" }}
        style={styles.footerImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#FFF",
    alignItems: "center",
    maxWidth: 480,
    paddingTop: 25,
    width: "100%",
    flexDirection: "column",
    marginHorizontal: "auto",
  },
  contentContainer: {
    paddingHorizontal: 49,
    width: "100%",
  },
  eventImage: {
    height: 150,
    marginBottom: 10,
  },
  eventTitleContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  eventTitleText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  graphicContainer: {
    backgroundColor: "#D9D9D9",
    marginTop: 5,
    alignItems: "center",
    paddingVertical: 60,
  },
  graphicText: {
    fontSize: 12,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 11,
    paddingHorizontal: 0,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  detailsContainer: {
    marginTop: 17,
  },
  detailsText: {
    fontSize: 14,
  },
  descriptionContainer: {
    marginTop: 30,
  },
  descriptionText: {
    fontSize: 12,
  },
  rsvpContainer: {
    marginTop: 50,
    backgroundColor: "#D9D9D9",
    padding: 10,
  },
  footerImage: {
    height: 60,
    width: "100%",
    marginTop: 49,
  },
});

export default EventScreen;
