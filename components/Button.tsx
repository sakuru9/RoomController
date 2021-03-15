import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

interface ButtonProps {
  onPress: () => void;
  title: string;
}

const StyledButton = styled.TouchableOpacity<ButtonProps>`
  padding: 20px;
`;

const StyledButtonText = styled.Text`
  color: ${(props) => props.theme.textColorRed1};
  padding: 2px;
  margin: 5px;
  font-size: 17px;
`;

const Button = (props: ButtonProps) => {
  return (
    <StyledButton onPress={props.onPress} title={props.title}>
      <StyledButtonText>{props.title}</StyledButtonText>
    </StyledButton>
  );
};

export default Button;
