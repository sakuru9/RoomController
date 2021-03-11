import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import TextField from "./components/TextInput";
import { getGroups, getScenes } from "./control/index";

export default function App() {
  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
