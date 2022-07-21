import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import { color } from "../../theme";

export const BaseCircleProgress = styled(CircularProgress).attrs((props) => ({
  ...props,
}))`
  color: ${color.white1} !important;
`;
