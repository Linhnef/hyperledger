import { Button } from "@mui/material";
import styled from "styled-components";
import { spacing, color } from "../../theme";

export const ButtonBase = styled(Button).attrs((props) => ({
  variant: "contained",
  ...props,
}))`
  border-radius: 8px;
  font-weight: bold;
  font-size: 16px;
  text-transform: none;
  padding: ${spacing.l} 0;
  color: ${color.purple1};
  box-shadow: none;
`;
