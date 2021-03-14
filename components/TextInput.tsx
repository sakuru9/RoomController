import React, { Component } from "react";
import { TextInput, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import styled, { withTheme } from "styled-components/native";

const StyledTextInput = styled.TextInput`
  height: 60px;
  width: 100%;
  max-width: 300px;
  font-size: 20px;
  padding-left: 10px;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColorRed1};
  border-bottom-color: ${(props) => props.theme.textColorRed1};
  border-bottom-width: 2px;
`;

interface TextFieldProps {
  onChange: (e: string) => void;
}

const TextField = (props: TextFieldProps) => {
  return (
    <StyledTextInput
      onChangeText={props.onChange}
      placeholder="Enter your Bridge IP"
      placeholderTextColor="gray"
      keyboardType="default"
      autoFocus={false}
    />
  );
};

export default TextField;
