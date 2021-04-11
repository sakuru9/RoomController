import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import TextField from "./components/TextInput";
import { getGroups, getScenes } from "./control/index";
import { Theme } from "./theme";
import { ThemeProvider } from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ConnectionScreen from "./screens/connection";
import MainScreen from "./screens/main";

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Connection" component={ConnectionScreen} />
            <Stack.Screen name="Main" component={MainScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </>
  );
}
