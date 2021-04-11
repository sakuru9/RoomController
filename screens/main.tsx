import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HueScene } from "../control/types/scenes";
import { styles } from "../styles";
import TextField from "../components/TextInput";
import { withTheme } from "styled-components";
import { pipe } from "fp-ts/lib/function";
import * as E from "fp-ts/lib/Either";
import StatusText, { StatusMessageType } from "../components/StatusText";
import Button from "../components/Button";
import Toggle from "../components/Toggle";
import Title from "../components/Title";
import { getZones, ZoneResponse } from "../control";
import { HueGroup } from "../control/types/groups";

const MainScreen = () => {
  const [zones, setZones] = useState([] as ZoneResponse);

  useEffect(() => {
    const loadZones = async () => {
      const z = await getZones();
      setZones(z);
    };
    loadZones();
  }, []);

  console.log("zones", zones);
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
    </View>
  );
};

export default MainScreen;
