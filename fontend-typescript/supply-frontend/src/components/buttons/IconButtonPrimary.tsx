import styled from "styled-components"
import { color } from "../../theme"
import { IconButtonBase } from "./IconButtonBase"

export const IconButtonPrimary = styled(IconButtonBase)`
  color: ${color.blue};
  position: relative;
  box-shadow: 0px 20px 60px rgba(208, 126, 50, 0.5);
  background-color: currentColor;
  margin: auto;
  outline: 6px solid ${color.blue};
`