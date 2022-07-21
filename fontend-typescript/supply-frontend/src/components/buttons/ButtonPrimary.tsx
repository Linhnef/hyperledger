import styled from "styled-components"
import { color } from "../../theme"
import { ButtonBase } from "./ButtonBase"

export const ButtonPrimary = styled(ButtonBase).attrs((props) => ({
  color: "primary",
  ...props,
}))`
      background-color: ${color.blue} !important;

`