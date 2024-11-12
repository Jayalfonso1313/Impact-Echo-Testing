import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Analysis({ quality }) {
  const qualityText = quality || "UNDAMAGED"; // Use 'UNDAMAGED' if quality is not provided
  const isUndamaged = quality === "UNDAMAGED";

  return (
    <View style={styles.container}>
      <View style={styles.qualityTitleContainer}>
        <Text style={styles.qualityTitle}>Result</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.content}>
        <View style={styles.mark}>
            {isUndamaged ? (
              <AntDesign name="checkcircle" size={60} color="#00DF87" />
            ) : (
              <AntDesign name="closecircle" size={60} color="#FF6347" />
            )}
          </View>
          <View style={styles.qualitywrap}>
            <Text style={styles.qualitySubtitle}>{qualityText}</Text>
          </View>
        </View>
        <Text style={styles.resultText}>
          {qualityText === "UNDAMAGED"
            ? "No damage detected within the impact area."
            : "Damage detected within the impact area."}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  card: {
    height: 250,
    width: 380, // Adjust as necessary
    marginHorizontal: 10,
    marginTop: 5,
    backgroundColor: "#454545",
    borderRadius: 20,
    marginBottom: 150,
    padding: 20,
    flexDirection: "column",
    justifyContent: "space-between",
    // justifyContent: "center",
  },
  content: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  qualitywrap: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  qualityTitle: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 3,
    color: "#F1F3F4",
  },
  qualitySubtitle: {
    fontSize: 35,
    color: "#F1F3F4",
    fontWeight: "bold",
  },
  mark: {
   marginBottom: 10
  },
  resultText: {
    fontSize: 26,
    color: "#F1F3F4",
    // fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 20,
  },
  qualityTitleContainer: {
    position: "relative",
    right: 150, 
    marginTop: 30,
    marginBottom: 5
  },
});
