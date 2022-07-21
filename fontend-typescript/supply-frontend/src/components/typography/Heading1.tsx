import styled from "styled-components"
import { TypographyBase } from "./TypographyBase"

export const Heading1 = styled(TypographyBase).attrs((props) => ({
  ...props,
  variant: "h1",
}))``