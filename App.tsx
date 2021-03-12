import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import TextField from "./components/TextInput";
import { getGroups, getScenes } from "./control/index";
import { Theme } from "./theme";
import { ThemeProvider } from "styled-components/native";

export default function App() {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <View style={styles.container}>
          <TextField />
          <Button
            title="test11"
            onPress={async () => {
              const zones = await getScenes();
              zones.forEach((item) => console.log(item.colorString));
            }}
          />
          <StatusBar style="auto" />
        </View>
      </ThemeProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
  },
});
