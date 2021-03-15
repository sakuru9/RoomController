import React, { useState } from "react";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { createBridgeUser, testBridgeConnection } from "../control/index";
import { HueScene } from "../control/types/scenes";
import { styles } from "../styles";
import TextField from "../components/TextInput";
import { withTheme } from "styled-components";
import { validateIpAddress } from "../utils";
import { pipe } from "fp-ts/lib/function";
import * as E from "fp-ts/lib/Either";
import StatusText, { StatusMessageType } from "../components/StatusText";
import Button from "../components/Button";

type IpValidateResult = false | string;

const ConnectionScreen = () => {
  const [connStatus, setConnStatus] = useState(false);
  const [status, setStatus] = useState({ msg: "", type: "NORMAL" as StatusMessageType });
  const [ip, setIp] = useState("");
  const [connected, setConnected] = useState(false);
  const [errorMsg, setError] = useState(false);

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
    setStatus({ msg: "Check connection..", type: StatusMessageType.NORMAL });
    setConnected(false);

    const ipCheck = validateIpString(ipaddr);

    if (ipCheck) {
      const connCheck = pipe(
        await testBridgeConnection(ipCheck),
        E.map((res) => res as IpValidateResult),
        E.fold(
          (e) => {
            setStatus({ msg: "Connection failed", type: StatusMessageType.ERROR });
            setConnected(false);
            return false;
          },
          (r) => {
            setStatus({ msg: "Connected Successfully!", type: StatusMessageType.SUCCESS });
            setConnected(true);
            return true;
          }
        )
      );
    } else {
      setStatus({ msg: "Invalid IP address", type: StatusMessageType.ERROR });
    }
  };

  const createUser = async () => {
    if (connected) {
      const create = await createBridgeUser();

      if (!create.error) {
        setStatus({ msg: create.msg, type: StatusMessageType.SUCCESS });
      } else {
        setStatus({ msg: create.msg, type: StatusMessageType.ERROR });
      }
    }
  };

  return (
    <View style={styles.container}>
      {status.msg.length > 0 && <StatusText type={status.type} msg={status.msg} />}
      <TextField onChange={(str) => setIp(str)} />
      <View style={{ flexDirection: "row" }}>
        <Button title="Check connection" onPress={() => checkConnection(ip)} />
        <Button disabled={!connected} title="Create User" onPress={() => createUser()} />
      </View>
      <StatusBar style="dark" />
    </View>
  );
};

export default ConnectionScreen;
