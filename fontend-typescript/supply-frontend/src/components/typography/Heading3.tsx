import styled from "styled-components";
import { TypographyBase } from "./TypographyBase";

export const Heading3 = styled(TypographyBase).attrs((props) => ({
    variant: "h3",
    ...props,
  }))``