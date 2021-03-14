import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

type StatusMessageType = "NORMAL" | "ERROR" | "SUCCESS";

interface StatusTextProps {
  msg?: string;
  type: StatusMessageType;
}

const StyledStatusText = styled.Text<StatusTextProps>`
  color: ${(props) =>
    props.type === "SUCCESS"
      ? props.theme.successColor
      : props.type === "ERROR"
      ? props.theme.errorColor
      : props.theme.textColorRed1};
`;

const ErrorText = (props: StatusTextProps) => {
  return <StyledStatusText type={props.type}>{props.msg}</StyledStatusText>;
};

export default ErrorText;
