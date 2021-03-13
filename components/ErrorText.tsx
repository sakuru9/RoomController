import React from "react";
import styled from "styled-components/native";

const StyledErrorText = styled.Text`
  color: ${(props) => props.theme.errorColor};
`;

interface ErrorTextProps {
  errorMsg: string;
}

const ErrorText = (props: ErrorTextProps) => {
  return <StyledErrorText>{props.errorMsg}</StyledErrorText>;
};

export default ErrorText;
