import React from "react";
import styled from "styled-components/native";

type NormalStatus = "NORMAL";
type ErrorStatus = "ERROR";
type SuccessStatus = "SUCCESS";
type StatusMessageType = "NORMAL" | "ERROR" | "SUCCESS";

interface StatusTextProps {
  msg: string;
  type: StatusMessageType;
}

const StyledStatusText = styled.Text<StatusTextProps>`
  color: ${(props) =>
    props.type === "NORMAL"
      ? props.theme.textColorRed1
      : props.type === "ERROR"
      ? props.theme.errorColor
      : props.theme.textColorRed1};
`;

const ErrorText = (props: StatusTextProps) => {
  return <StyledStatusText>{props.msg}</StyledStatusText>;
};

export default ErrorText;
