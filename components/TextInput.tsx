import React, { Component } from "react";
import { TextInput } from "react-native";
import styled from "styled-components/native";

const StyledTextInput = styled.TextInput`
  height: 60px;
  width: 100%;
  max-width: 300px;
  font-size: 20px;
  padding-left: 10px;
  background-color: rgb(36, 37, 47);
  font-family: arial;
  color: rgb(255, 64, 102);
  border-bottom-color: rgb(238, 111, 135);
  border-width: 3px;
`;

const TextField = () => {
  return (
    <StyledTextInput
      placeholder="Enter your Bridge IP"
      placeholderTextColor="gray"
      keyboardType="default"
    />
  );
};

export default TextField;
