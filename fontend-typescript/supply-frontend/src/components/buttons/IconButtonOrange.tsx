import styled from "styled-components";
import { color } from "../../theme";
import { IconButtonBase } from "./IconButtonBase";

export const IconButtonOrange = styled(IconButtonBase)`
  position: relative;
  margin: auto;
  outline: 6px solid ${color.blue};
  background-color: ${color.blue} !important;
`;
