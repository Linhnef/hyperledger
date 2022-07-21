import {
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ReactNode } from "react";
import styled from "styled-components";

type SelectPrimaryProps = {
  children: ReactNode;
  label: string;
  value: string | number;
  handleChange: (event: SelectChangeEvent<string | number>) => void;
};

export const SelectPrimary = (props: SelectPrimaryProps) => {
  const { children, label, value, handleChange } = props;
  return (
    <Container fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select value={value} label={label} onChange={handleChange}>
        {children}
      </Select>
    </Container>
  );
};

const Container = styled(FormControl)`
  text-align: left !important;
`;
