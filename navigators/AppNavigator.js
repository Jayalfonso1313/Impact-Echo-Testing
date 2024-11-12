import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather, Fontisto, Entypo, AntDesign } from "@expo/vector-icons";
import Home from "../screens/Home";
import Info from "../screens/Info";
import Help from "../screens/Help";
import { View, Text } from "react-native";

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 80,
    backgroundColor: "#1E1E1E",
  },
};

export default function AppNavigator() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {focused ? (
                <Ionicons name="home" size={22} color="#ff6500" />
              ) : (
                <Ionicons name="home-outline" size={22} color="#9DB2CE" />
              )}
              <Text
                style={{ fontSize: 12, color: focused ? "#ff6500" : "#9DB2CE" }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Info"
        component={Info}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {focused ? (
                // <Fontisto name="player-settings" size={22} color="#ff6500" />
                <Entypo name="info-with-circle" size={22} color="#ff6500" />
              ) : (
                <AntDesign name="infocirlceo" size={22} color="#9DB2CE" />
              )}
              <Text
                style={{ fontSize: 12, color: focused ? "#ff6500" : "#9DB2CE" }}
              >
                Info
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Help"
        component={Help}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {focused ? (
                <Entypo name="help-with-circle" size={22} color="#ff6500" />
              ) : (
                <Feather name="help-circle" size={22} color="#9DB2CE" />
              )}
              <Text
                style={{ fontSize: 12, color: focused ? "#ff6500" : "#9DB2CE" }}
              >
                Help
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
