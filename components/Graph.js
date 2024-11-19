import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDerivedValue } from "react-native-reanimated";
import { CartesianChart, Line, Area, useChartPressState } from "victory-native";
import { LinearGradient, vec, Circle, useFont } from "@shopify/react-native-skia";

// Downsample function to reduce the number of data points for smooth rendering
function downsample(array, targetPoints) {
  const ratio = Math.ceil(array.length / targetPoints);
  const result = [];
  for (let i = 0; i < targetPoints; i++) {
    const start = i * ratio;
    const end = start + ratio >= array.length ? array.length : start + ratio;
    const window = array.slice(start, end);
    const average = window.reduce((sum, value) => sum + value, 0) / window.length;
    result.push(average);
  }
  return result;
}

export default function Graphs() {
  const [result, setResult] = useState("Undamaged");

  const font = useFont(require("../assets/fonts/Inter-Regular.ttf"), 8);
  const chartFont = useFont(require("../assets/fonts/Inter-Bold.ttf"), 14);

  // Sample frequency (e.g., 100 Hz to 10kHz), undamaged, and damaged data
  const frequency = Array.from({ length: 100 }, (_, i) => i * 100); // Frequency array from 0 to 10,000
  const undamaged = frequency.map((f) => 300 * Math.exp(-f / 2000) * Math.sin(f / 500)); // Undamaged data
  const damaged = frequency.map((f) => 250 * Math.exp(-f / 1500) * Math.cos(f / 400)); // Damaged data

  // Dynamically determine the number of points to downsample to based on the length of the data
  const targetPoints = Math.min(frequency.length, 100); // You can customize this logic to decide the target points dynamically
  const downsampledFrequency = downsample(frequency, targetPoints);
  const downsampledUndamaged = downsample(undamaged, targetPoints);
  const downsampledDamaged = downsample(damaged, targetPoints);

  // Prepare datasets for both graphs (undamaged and damaged)
  const undamagedData = downsampledFrequency.map((freq, index) => ({
    x: freq,
    y: downsampledUndamaged[index],
  }));
  const damagedData = downsampledFrequency.map((freq, index) => ({
    x: freq,
    y: downsampledDamaged[index],
  }));

  // Dynamic width based on data size
  const baseWidthPerDataPoint = 35;
  const dynamicWidth = Math.min(downsampledFrequency.length * baseWidthPerDataPoint, 10 * baseWidthPerDataPoint);

  // Chart press state for interactive tooltip
  const { state, isActive } = useChartPressState({ x: 0, y: { amplitude: 0 } });

  const value = useDerivedValue(() => {
    return state.y.amplitude.value.value.toFixed(8);
  }, [state]);

  // Simulate new data arriving (for example, on a database update)
  useEffect(() => {
    // You can set your `result` state based on new data, for example, "Damaged" -> "Undamaged"
    // Assuming we get new data from the database or some API
    // This is just an example of how the result can be updated
    const newResult = "Undamaged"; // Replace with your logic for fetching new data
    setResult(newResult);
  }, []); // Empty dependency array means this runs once on component mount

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={[styles.card, { width: dynamicWidth }]}>
          {/* Conditionally render only the relevant graph */}
          <CartesianChart
            data={result === "Undamaged" ? undamagedData : damagedData}
            xKey="x" // Use frequency (x-axis)
            yKeys={["y"]} // Use amplitude (y-axis)
            domainPadding={{ top: 30 }}
            axisOptions={{
              font,
              labelColor: "white",
              lineColor: "white",
              tickCount: {
                x: Math.min(downsampledFrequency.length, 10),
                y: 7,
              },
            }}
            chartPressState={state}
            key={result} // Force re-render when result changes (this is crucial)
          >
            {({ points, chartBounds }) => (
              <>
                <Line
                  points={points.y}
                  color="lightgreen"
                  strokeWidth={3}
                  animate={{ type: "timing", duration: 500 }}
                />
                <Area
                  points={points.y}
                  y0={chartBounds.bottom}
                  animate={{ type: "timing", duration: 500 }}
                >
                  <LinearGradient
                    start={vec(chartBounds.left, chartBounds.top)}
                    end={vec(chartBounds.left, chartBounds.bottom)}
                    colors={["green", "#90ee9050"]}
                  />
                </Area>
                {isActive ? (
                  <ToolTip x={state.x.position} y={state.y.amplitude.position} />
                ) : null}
              </>
            )}
          </CartesianChart>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

// ToolTip component for showing data point interaction
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
