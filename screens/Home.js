import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useFetchFirebase } from "../hooks/useFetchFirebase";
import Analysis from "../components/Analysis";
import Graph from "../components/Graph";
import WarningNote from "../components/warningNote";
import { fetchCSV } from "../components/fetchCSV";

export default function Home() {
  const [currentScan, setCurrentScan] = useState(null);
  const [fftData, setFftData] = useState(null);
  const [fetchingFftData, setFetchingFftData] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { data, loading, error } = useFetchFirebase();

  useEffect(() => {
    if (data) {
      const latestScanKey = Object.keys(data).sort((a, b) => {
        const numA = parseInt(a.split("_")[1]);
        const numB = parseInt(b.split("_")[1]);
        return numB - numA;
      })[0];

      const latestScan = { ...data[latestScanKey], key: latestScanKey };
      setCurrentScan(latestScan);

      // Commenting out identification logic
      // if (latestScan.identification !== undefined) {
      //   setIdentification(latestScan.identification);
      //   if (latestScan.identification === 0) {
      //     setModalVisible(true);
      //   }
      // } else {
      //   setIdentification(1);
      // }
    }
  }, [data]);

  useEffect(() => {
    if (currentScan && currentScan.fftDataURL) {
      setFetchingFftData(true);

      fetchCSV(currentScan.fftDataURL)
        .then((parsedData) => {
          setFftData(parsedData);
        })
        .catch((error) => {
          console.error("Error fetching FFT data:", error);
        })
        .finally(() => {
          setFetchingFftData(false);
        });
    }
  }, [currentScan]);

  const handleReset = () => {
    setCurrentScan(null);
    setFftData(null);
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (error) {
    return <Text style={styles.error}>Error: {error}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>iECHO</Text>
        <View style={styles.sideButtonsContainer}>
          <TouchableOpacity onPress={handleOpenModal}>
            <AntDesign name="exclamationcircle" size={32} color="#ff6500" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.restartButton}
            onPress={handleReset}
          >
            <MaterialIcons
              name="restart-alt"
              size={36}
              color="#ff6500"
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* Commenting out the identification conditional rendering */}
      {/* {identification === 0 && (
        <WarningNote visible={modalVisible} onClose={handleCloseModal} />
      )} */}
      {currentScan && (
        <>
          <View style={styles.signalDataContainer}>
            <View style={styles.graphPlaceholder}>
              {fetchingFftData ? (
                <ActivityIndicator size="large" color="#ffffff" />
              ) : (
                fftData && (
                  <Graph amplitude={fftData.amplitude} time={fftData.time} />
                )
              )}
            </View>
          </View>
          <View style={styles.analysisContainer}>
            <Analysis quality={currentScan.quality} />
          </View>
        </>
      )}
      {!currentScan && (
        <View style={styles.fullScreenCenter}>
          <Text style={styles.noData}>
            No scans available. Please reload or add new scans.
          </Text>
        </View>
      )}
      <WarningNote visible={modalVisible} onClose={handleCloseModal} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 15,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    fontStyle: "italic",
    letterSpacing: 10,
    color: "#F1F3F4",
  },
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    alignContent: "center",
    paddingVertical: 50,
  },
  sideButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
  },
  error: {
    textAlign: "center",
    color: "red",
    marginTop: 20,
    fontSize: 20,
  },
  fullScreenCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    paddingHorizontal: 20,
  },
  noData: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
  qualityTitleContainer: {
    position: "relative",
    margin: 2,
    marginLeft: 20,
  },
  qualityTitle: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 3,
    color: "#F1F3F4",
  },
  graphPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 300,
  },
  analysisContainer: {
    marginHorizontal: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    paddingVertical: 50,
  },
});
