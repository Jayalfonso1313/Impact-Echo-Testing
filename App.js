import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StatusBar } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query'; // Import for the older version of react-query
import RootNavigator from './navigators/RootNavigator';

// Create a QueryClient instance
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor="#CCCCCC" />
          <RootNavigator />
        </View>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
