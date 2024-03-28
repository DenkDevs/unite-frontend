import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import NavBar from "./NavBar";

const EventCard = ({ title, clubName, time, location, description }) => (
  <View style={styles.eventCard}>
    <View style={styles.eventContent}>
      <Text style={styles.eventTitle}>
        {title}
        {"\n"}
        <Text style={styles.clubName}>{clubName}</Text>
      </Text>
      <Text style={styles.eventDetails}>
        {time}
        {"\n"}
        {location}
        {"\n"}
        {"\n"}
        {description}
      </Text>
    </View>
    <View style={styles.eventImage}></View>
  </View>
);

const HomeScreen = () => {
  const eventData = [
    {
      title: "Title of Event",
      clubName: "Club Name",
      time: "Time",
      location: "Location",
      description: "Short Description",
    },
    {
      title: "Title of Event",
      clubName: "Club Name",
      time: "Time",
      location: "Location",
      description: "Short Description",
    },
    {
      title: "Title of Event",
      clubName: "Club Name",
      time: "Time",
      location: "Location",
      description: "Short Description",
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.discoverEventsSection}>
          <Text style={styles.discoverTitle}>Discover Events</Text>
          <View style={styles.tabs}>
            <View style={styles.tabActive}>
              <Text>All Events</Text>
            </View>
            <View style={styles.tab}>
              <Text>For Me</Text>
            </View>
          </View>
          <View style={styles.searchBox}>
            <Text>Search...</Text>
          </View>
          <Text style={styles.dateHeader}>DATE</Text>
          {eventData.map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              clubName={event.clubName}
              time={event.time}
              location={event.location}
              description={event.description}
            />
          ))}
        </View>
      </ScrollView>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 0, // Adjust this value according to your NavBar height
  },
  discoverEventsSection: {
    flex: 1,
    padding: 20,
  },
  discoverTitle: {
    alignSelf: "center",
    fontWeight: "400",
    fontSize: 20,
    fontFamily: "Inter, sans-serif",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "center",
    marginTop: 20,
    fontWeight: "400",
  },
  tabActive: {
    fontFamily: "Inter, sans-serif",
    justifyContent: "center",
    alignItems: "stretch",
    borderRadius: 30,
    borderColor: "rgba(0, 0, 0, 1)",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#D4D4D4",
    padding: 10,
    marginRight: 10,
  },
  tab: {
    fontFamily: "Inter, sans-serif",
    justifyContent: "center",
    alignItems: "stretch",
    borderRadius: 30,
    borderColor: "rgba(0, 0, 0, 1)",
    borderStyle: "solid",
    borderWidth: 1,
    padding: 10,
  },
  searchBox: {
    fontFamily: "Inter, sans-serif",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderColor: "rgba(0, 0, 0, 1)",
    borderStyle: "solid",
    borderWidth: 1,
    marginTop: 15,
    fontWeight: "400",
    whiteSpace: "nowrap",
    padding: 10,
  },
  dateHeader: {
    fontFamily: "Inter, sans-serif",
    fontWeight: "400",
    marginTop: 20,
  },
  eventCard: {
    borderRadius: 30,
    borderColor: "rgba(0, 0, 0, 1)",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#FFF",
    display: "flex",
    marginTop: 30,
    alignItems: "stretch",
    gap: 20,
    fontSize: 12,
    justifyContent: "space-between",
    padding: 22,
  },
  eventContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  eventTitle: {
    fontFamily: "Inter, sans-serif",
    fontWeight: "700",
  },
  clubName: {
    fontWeight: "400",
  },
  eventDetails: {
    fontFamily: "Inter, sans-serif",
    fontWeight: "400",
    marginTop: 16,
  },
  eventImage: {
    backgroundColor: "#9F9F9F",
    borderRadius: 30,
    width: 69,
    flexShrink: 0,
    height: 69,
    margin: "auto 0",
  },
  featuredImage: {
    position: "relative",
    marginTop: 34,
    width: "100%",
    aspectRatio: "5.56",
  },
});

export default HomeScreen;
