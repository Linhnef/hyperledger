import styled from "styled-components";
import { TypographyBase } from "./TypographyBase";

export const Heading4 = styled(TypographyBase).attrs((props) => ({
    variant: "h4",
    ...props,
  }))``