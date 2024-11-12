import { View, Image, StyleSheet, Text } from "react-native";
import React from "react";
import iECHO from "../assets/iECHO.png";
import { ScrollView } from "react-native-gesture-handler";
import companyLogo from "../assets/companyLogo.png";

export default function Info() {
  return (
    <ScrollView style={styles.container}>
      <Image source={companyLogo} style={styles.logo} />
      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>
          <Text style={{ fontWeight: "bold", fontStyle: "italic" }}>
            {" "}
            iECHO Technologies{" "}
          </Text>
          is a company in non-destructive testing (NDT) and structural health
          monitoring. The company specializes in creating advanced impact echo
          testing devices to inspect and evaluate concrete structures without
          causing any damage.
        </Text>
        <View style={styles.deviceContentContainer}>
          <Text style={styles.title}>The iECHO Device</Text>
          <Text style={styles.subtitle}>
            The{" "}
            <Text style={{ fontWeight: "bold", fontStyle: "italic" }}>
              iECHO{" "}
            </Text>
            is a device designed for inspecting concrete structures. It
            effectively detects and analyzes hidden issues such as cracks,
            voids, and internal damage within concrete.
          </Text>
          <Text style={styles.subtitle}>
            Key features of the iECHO include:
          </Text>
          <Text style={styles.featureTitle}>Detection</Text>
          <Text style={styles.featureSubtitle}>
            Accurately identifies defects within concrete.
          </Text>
          <Text style={styles.featureTitle}>Analysis</Text>
          <Text style={styles.featureSubtitle}>
            Provides results of the tests on the structural component.
          </Text>
          <Text style={styles.featureTitle}>Portable Design</Text>
          <Text style={styles.featureSubtitle}>
            iECHO is easily transportable and ideal for on-site inspections.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    // justifyContent: "center",
    // alignContent: "center",
  },
  text: {
    textAlign: "center",
    color: "white",
  },
  logo: {
    resizeMode: "contain",
    height: 450,
    width: 450,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
  },
  contentContainer: {
    marginTop: -60,
    marginBottom: 80
  },
  title: {
    fontSize: 26,
    color: "#FFF",
    fontWeight: "bold",
    marginHorizontal: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#FFF",
    marginHorizontal: 25,
    textAlign: "center",
    // marginVertical: 10,
  },
  deviceContentContainer: {
    flexDirection: "column",
    gap: 5,
    marginVertical: 20,
  },
  featureTitle: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
    marginHorizontal: 20,
    textAlign: "center",
  },
  featureSubtitle: {
    fontSize: 16,
    color: "#FFF",
    marginHorizontal: 25,
    textAlign: "center",
    marginTop: -6,
    marginBottom: 2,
  },
});
