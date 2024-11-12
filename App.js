import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StatusBar } from 'react-native';
import RootNavigator from './navigators/RootNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#CCCCCC" />
        <RootNavigator />
      </View>
    </NavigationContainer>
  );
}
