import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import NavBar from "./NavBar";

const StatisticCard = ({ title, statistics }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.statisticsContainer}>
        {statistics.map((stat, index) => (
          <View style={styles.statisticContainer} key={index}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statDescription}>{stat.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

function StatisticsScreen() {
  const userStatistics = [
    {
      title: "MESSAGING",
      statistics: [
        { value: "1,642", description: "Messages Sent" },
        { value: "1,256", description: "Messages Received" },
        { value: "14", description: "New People Met" },
        { value: "4", description: "Groups Joined" },
      ],
    },
    {
      title: "EVENTS",
      statistics: [
        { value: "8", description: "Events Attended" },
        { value: "2", description: "Organizations Joined" },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.userStatisticsTitle}>User Statistics</Text>
          </View>
        </View>
        <Text style={styles.screenTimeTitle}>SCREEN TIME</Text>
        <View style={styles.screenTimeContainer}>
          {/* Include your screen time chart here */}
          <Image
            resizeMode="contain"
            source={{ uri: "{{screen_time_chart_url}}" }}
            style={styles.screenTimeImage}
          />
        </View>
        {userStatistics.map((statistic, index) => (
          <StatisticCard
            title={statistic.title}
            statistics={statistic.statistics}
            key={index}
          />
        ))}
      </View>
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 10,
  },
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  userStatisticsTitle: {
    fontSize: 20, // Adjust the font size as needed
  },
  profileImage: {
    width: 28,
    aspectRatio: 1,
  },
  titleContainer: {
    marginLeft: 10,
  },
  screenTimeTitle: {
    color: "#000",
    fontWeight: "700",
    fontSize: 12,
    marginTop: 10,
    paddingLeft: 40,
  },
  screenTimeContainer: {
    marginTop: 10,
    borderRadius: 30,
    backgroundColor: "#FFF",
    padding: 10,
    alignItems: "center",
  },
  cardContainer: {
    marginTop: 10,
    borderRadius: 30,
    backgroundColor: "#FFF",
    padding: 10,
  },
  cardTitle: {
    fontWeight: "700",
    fontSize: 12,
    marginBottom: 10,
    paddingLeft: 30,
  },
  statisticsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  statisticContainer: {
    flexBasis: "50%",
    marginBottom: 10,
    alignItems: "center",
  },
  statValue: {
    color: "#6CA1FF",
    fontWeight: "700",
    fontSize: 28,
  },
  statDescription: {
    color: "#000",
    fontSize: 12,
  },
});

export default StatisticsScreen;
