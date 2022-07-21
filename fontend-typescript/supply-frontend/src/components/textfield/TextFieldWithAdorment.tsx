import { InputAdornment, TextField } from "@mui/material";
import { ReactNode } from "react";
import styled from "styled-components";
import { spacing } from "../../theme";

type TextFieldWithAdornmentProps = {
  starticon?: ReactNode;
  endicon?: ReactNode;
};
export const TextFieldWithAdornment = styled(TextField).attrs(
  (props: TextFieldWithAdornmentProps) => ({
    InputProps: {
      startAdornment: (
        <InputAdornment position="start">{props.starticon}</InputAdornment>
      ),
      endAdornment: (
        <InputAdornment position="end">{props.endicon}</InputAdornment>
      ),
    },
    autoComplete: "off",
    ...props,
  })
)`
  margin: ${spacing.m} 0 !important;
`;
