import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { getScenes } from "../control/index";
import { HueScene } from "../control/types/scenes";
import { styles } from "../App";
import TextField from "../components/TextInput";
import { withTheme } from "styled-components";
import { validateIpAddress } from "../utils";
import { pipe } from "fp-ts/lib/function";
import * as E from "fp-ts/lib/Either";
import ErrorText from "../components/ErrorText";

type IpValidateResult = false | string;

const ConnectionScreen = () => {
  const [connStatus, setConnStatus] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [ip, setIp] = useState("");

  const checkConnection = (ipaddr: string) => {
    const validate = pipe(
      ipaddr,
      validateIpAddress,
      E.fold(
        (l) => setErrorMsg("Invalid Ip address"),
        (r) => r as IpValidateResult
      )
    );

    // TODO
    // connect to HUE API
  };

  return (
    <View style={styles.container}>
      {errorMsg.length > 0 && <ErrorText errorMsg={errorMsg} />}
      <TextField onChange={(str) => setIp(str)} />
      <Button title="Check connection" onPress={() => checkConnection(ip)} />
      <StatusBar style="dark" />
    </View>
  );
};

export default ConnectionScreen;
