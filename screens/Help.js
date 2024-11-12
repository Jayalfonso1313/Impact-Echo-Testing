import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";

export default function Help() {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>Using the iECHO Device: Quick Guide</Text>
      </View>
      <View style={styles.stepsContainer}>
        <Text style={styles.subtitle}>1. Power On:</Text>
        <Text style={styles.subtitleStep}>
          Plug the device into a 220V wall outlet. Push the power switch at the
          back. The system will boot up.
        </Text>
        <Text style={styles.subtitle}>2. Prepare the Device:</Text>
        <Text style={styles.subtitleStep}>
          Place the device against the concrete surface. Press the top button.
          The red light means it's running; wait for the green light, indicating
          it's ready to record.
        </Text>
        <Text style={styles.subtitle}>3. Start Testing:</Text>
        <Text style={styles.subtitleStep}>
          Use the steel ball near the microphone to create an impact. The green
          light will turn off when the recording is complete.
        </Text>
        <Text style={styles.subtitle}>4. Check Results:</Text>
        <Text style={styles.subtitleStep}>
          On the mobile application, the dashboard will display the
          visualization of the test and indicate if the concrete is “undamaged”
          or “damaged.”
        </Text>
        <Text style={styles.subtitle}>5. App Navigation:</Text>
        <Text style={styles.subtitleStep}>
          Use the application's Home section to view test results, Info for device and
          company details, and Help for operational guidance
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    // justifyContent: "center",
    // alignContent: "center"
  },
  text: {
    textAlign: "center",
    color: "white",
  },
  title: {
    fontSize: 34,
    color: "#FFF",
    fontWeight: "bold",
    marginHorizontal: 20,
    textAlign: "center",
    marginTop: 60,
  },
  subtitle: {
    fontSize: 20,
    color: "#FFF",
    marginHorizontal: 25,
    textAlign: "left",
    fontWeight: "bold",
    marginTop: 10,
  },
  stepsContainer: {
    marginTop: 10,
    marginLeft: 15,
    marginBottom:100
  },
  subtitleStep: {
    fontSize: 18,
    color: "#FFF",
    marginHorizontal: 25,
    textAlign: "left",
    marginLeft: 48,
    marginRight: 40,
  },
});
