import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import iECHO from '../assets/iECHO.png';
import { StatusBar } from 'expo-status-bar';

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('AppNavigator');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={iECHO} style={styles.logo} />
      <StatusBar backgroundColor='#1E1E1E'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#1E1E1E",
  },
  logo: {
    resizeMode: 'contain',
    height: 450,
    width: 450
  },
});
