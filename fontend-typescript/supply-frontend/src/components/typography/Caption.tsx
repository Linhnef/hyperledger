import styled from "styled-components";
import { TypographyBase } from "./TypographyBase";

export const Caption = styled(TypographyBase).attrs((props) => ({
    ...props,
    variant: "caption",
  }))``