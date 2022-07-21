import styled from "styled-components";
import { palette, spacing } from "../theme";
import { IconButtonPurple } from "./buttons/IconButtonPurple";
import { Badge, Chip, Stack } from "@mui/material";
import { Heading5 } from "./typography/Heading5";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LayersClearIcon from "@mui/icons-material/LayersClear";
import LayersIcon from "@mui/icons-material/Layers";

type UserItemProps = {
  name: string;
  id: string;
  status: string;
  onActive: (data: string) => void;
  onDeActive: (data: string) => void;
};

export const UserItem = (props: UserItemProps) => {
  const { name, status, id, onActive, onDeActive } = props;
  return (
    <Container>
      <ActionContainer>
        <IconButtonPurple disabled>
          <AccountCircleIcon />
        </IconButtonPurple>
      </ActionContainer>
      <TextContainer>
        <Heading5>{name}</Heading5>
        <IconButtonPurple disabled>
          <Stack direction="row" spacing={1}>
            {status === "ACTIVE" ? (
              <Chip label="active" color="success" />
            ) : (
              <Chip label="none-active" color="error" />
            )}
          </Stack>
        </IconButtonPurple>
      </TextContainer>
      {status === "ACTIVE" ? (
        <ActionContainer>
          <IconButtonPurple
            onClick={() => {
              onDeActive(id);
            }}
          >
            <LayersClearIcon />
          </IconButtonPurple>
        </ActionContainer>
      ) : (
        <ActionContainer>
          <IconButtonPurple
            onClick={() => {
              onActive(id);
            }}
          >
            <LayersIcon />
          </IconButtonPurple>
        </ActionContainer>
      )}
    </Container>
  );
};

const ActionContainer = styled.div`
  display: flex;
  padding: 0 ${spacing.l};
`;

const Container = styled.div`
  width: 90%;
  margin: ${spacing.m} 5%;
  background-color: ${palette.white1};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${palette.blue};
`;

const TextContainer = styled.div`
  padding: ${spacing.l} ${spacing.lx};
  width: 100%;
  display: grid;
  grid-template-columns: 35% 55%;
  grid-column-gap: 10%;
  justify-content: center;
  align-items: center;
`;
