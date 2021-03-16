import React from "react";
import styled from "styled-components/native";
import { Switch, View } from "react-native";
import { Theme } from "../theme";

interface ToggleProps {
  value: boolean;
  onValueChange: () => void;
}

const StyledToggle = styled.Switch<ToggleProps>``;

const Toggle = (props: ToggleProps) => {
  return (
    <StyledToggle
      value={props.value}
      onValueChange={props.onValueChange}
      style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
      trackColor={{ true: Theme.textColorRed1, false: "grey" }}
    />
  );
};

export default Toggle;
