import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { testBridgeConnection } from "../control/index";
import { HueScene } from "../control/types/scenes";
import { styles } from "../styles";
import TextField from "../components/TextInput";
import { withTheme } from "styled-components";
import { validateIpAddress } from "../utils";
import { pipe } from "fp-ts/lib/function";
import * as E from "fp-ts/lib/Either";
import StatusText from "../components/StatusText";

type IpValidateResult = false | string;

const ConnectionScreen = () => {
  const [connStatus, setConnStatus] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [ip, setIp] = useState("");
  const [connected, setConnected] = useState(false);

  const validateIpString = (ip: string) => {
    return pipe(
      ip,
      validateIpAddress,
      E.map((ip) => ip),
      E.fold(
        (e) => e,
        (r) => r as IpValidateResult
      )
    );
  };

  const checkConnection = async (ipaddr: string) => {
    setStatusMsg("Checking connection..");
    setConnected(false);

    const ipCheck = validateIpString(ipaddr);

    if (ipCheck) {
      const connCheck = pipe(
        await testBridgeConnection(ipCheck),
        E.map((res) => res as IpValidateResult),
        E.fold(
          (e) => {
            setStatusMsg("Connection failed");
            setConnected(false);
            return false;
          },
          (r) => {
            setStatusMsg("Connected successfully!");
            setConnected(true);
            return true;
          }
        )
      );
    } else {
      setStatusMsg("Invalid IP address");
    }
  };

  return (
    <View style={styles.container}>
      {statusMsg.length > 0 && (
        <StatusText type={connected ? "SUCCESS" : "ERROR"} msg={statusMsg} />
      )}
      <TextField onChange={(str) => setIp(str)} />
      <Button title="Check connection" onPress={() => checkConnection(ip)} />
      <StatusBar style="dark" />
    </View>
  );
};

export default ConnectionScreen;
