import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { useDerivedValue } from "react-native-reanimated";
import { Area, CartesianChart, Line, useChartPressState } from "victory-native";
import { Circle, LinearGradient, Text, useFont, vec } from "@shopify/react-native-skia";

const inter = require("../assets/fonts/Inter-Regular.ttf");
const interBold = require("../assets/fonts/Inter-Bold.ttf");

// Function to downsample data
function downsample(array, targetPoints) {
  if (!array || array.length === 0) {
    return [];
  }

  const ratio = Math.ceil(array.length / targetPoints);
  const result = [];

  for (let i = 0; i < targetPoints; i++) {
    const start = i * ratio;
    const end = start + ratio >= array.length ? array.length : start + ratio;
    const window = array.slice(start, end);

    // Calculate average or representative value for the window
    const average = window.reduce((sum, value) => sum + value, 0) / window.length;
    result.push(average);
  }

  return result;
}

export default function Graph({ amplitude, time }) {
  const font = useFont(inter, 8);
  const chartFont = useFont(interBold, 14);

  // State to hold chart data
  const [chartData, setChartData] = useState([]);

  // Effect to update chartData when real data (amplitude, time) changes
  useEffect(() => {
    if (amplitude && time) {
      // Downsample amplitude and time arrays to 100 points
      const downsampledAmplitudes = downsample(amplitude, 100);
      const downsampledTime = downsample(time, 100);

      // Format data for CartesianChart
      const DATA = downsampledTime.map((timePoint, index) => ({
        time: timePoint,
        amplitude: downsampledAmplitudes[index],
      }));

      // Update chartData state
      setChartData(DATA);
    }
  }, [amplitude, time]);

  // Calculate dynamicWidth based on the number of visible data points
  const baseWidthPerDataPoint = 35;
  const dynamicWidth = Math.min(chartData.length * baseWidthPerDataPoint, 10 * baseWidthPerDataPoint);

  const { state, isActive } = useChartPressState({ x: 0, y: { amplitude: 0 } });

  const value = useDerivedValue(() => {
    return state.y.amplitude.value.value.toFixed(8);
  }, [state]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View >
        {/* <ScrollView horizontal style={{ width: dynamicWidth }}> */}
          <View style={[styles.card, { width: dynamicWidth }]}>
          <CartesianChart
            data={chartData}
            xKey="time"
            yKeys={["amplitude"]}
            domainPadding={{ top: 30 }}
            axisOptions={{
              font,
              labelColor: "white",
              lineColor: "white",
              tickCount: {
                x: Math.min(chartData.length, 10),
                y: 7,
              },
            }}
            chartPressState={state}
          >
            {({ points, chartBounds }) => (
              <>
                <Line
                  points={points.amplitude}
                  color="lightgreen"
                  strokeWidth={3}
                  animate={{ type: "timing", duration: 500 }}
                />
                <Area
                  points={points.amplitude}
                  y0={chartBounds.bottom}
                  animate={{ type: "timing", duration: 500 }}
                >
                  <LinearGradient
                    start={vec(chartBounds.bottom, 200)}
                    end={vec(chartBounds.bottom, chartBounds.bottom)}
                    colors={["green", "#90ee9050"]}
                  />
                </Area>
                {isActive ? (
                  <ToolTip
                    x={state.x.position}
                    y={state.y.amplitude.position}
                  />
                ) : null}
              </>
            )}
          </CartesianChart>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

function ToolTip({ x, y }) {
  return <Circle cx={x} cy={y} r={8} color={"grey"} opacity={0.8} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    height: 315,
    margin: 10,
    borderRadius: 20,
  },
});
