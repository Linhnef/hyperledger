import styled from "styled-components";
import { color } from "../../theme";
import { IconButtonBase } from "./IconButtonBase";

export const IconButtonPurpleSmall = styled(IconButtonBase)`
  background-color: ${color.blue};
  & svg {
    width: 24px !important;
    height: 24px !important;
  }
`;
