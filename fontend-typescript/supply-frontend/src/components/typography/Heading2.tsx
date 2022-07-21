import styled from "styled-components";
import { TypographyBase } from "./TypographyBase";

export const Heading2 = styled(TypographyBase).attrs((props) => ({
  variant: "h2",
  ...props,
}))``;
