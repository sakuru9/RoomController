import React from "react";
import styled from "styled-components/native";

type TitleType = "H1" | "H2" | "H3" | "H4";

interface TitleProps {
  type?: TitleType;
  value?: string;
}

const StyledText = styled.Text<TitleProps>`
  color: ${(props) => props.theme.textColorRed1};
  font-size: ${(props) =>
    props.type === "H1"
      ? "48px"
      : props.type === "H2"
      ? "32px"
      : props.type === "H3"
      ? "20px"
      : "18px"};
`;

const Title = (props: TitleProps) => {
  return <StyledText type={props.type}>{props.value}</StyledText>;
};

export default Title;
