import styled from "styled-components";
import { color, spacing } from "../../theme";
import { TextFieldWithAdornment } from "./TextFieldWithAdorment";

export const TextFieldOrange = styled(TextFieldWithAdornment)`
  width: 100%;
  margin-bottom: ${spacing.m};
  .MuiInputBase-root {
    background-color: ${color.orange1};
    border-radius: 12px;
    height: 3.5rem;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: ${spacing.l};
  }

  & .MuiInputBase-input {
    font-size: 16px;
    font-weight: bold;
    line-height: 16px;
    padding: ${spacing.l} ${spacing.l};
  }
  .Mui-focused {
    svg {
      color: ${color.orange2};
      opacity: 1;
    }
  }
  div {
    height: 100%;
    &::before,
    ::after {
      display: none;
    }
    input {
      height: 100%;
      color: ${color.purple1};
      opacity: 0.5;
      font-family: "Manrope";
      font-weight: 700;
      font-size: 16px;
      &:focus {
        color: ${color.orange2};
        opacity: 1;
      }
      &::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: ${color.purple1};
        font-weight: 500;
        opacity: 0.5; /* Firefox */
      }

      &:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: ${color.purple1};
        font-weight: 500;
        opacity: 0.5;
      }

      &::-ms-input-placeholder {
        /* Microsoft Edge */
        color: ${color.purple1};
        font-weight: 500;
        opacity: 0.5;
      }
    }
  }
`;
