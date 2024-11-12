import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function Values({ voltage, freq }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.value}>{freq || '2MHz'}</Text>
        <Text style={styles.valueTitle}>FREQUENCY</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.value}>{voltage || '220v'}</Text>
        <Text style={styles.valueTitle}>VOLTAGE</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  card: {
    height: 135,
    width: 177,
    backgroundColor: '#454545',
    borderRadius: 20,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#F1F3F4',
  },
  valueTitle: {
    fontWeight: 'normal',
    fontSize: 14,
    color: '#F1F3F4',
  },
});
