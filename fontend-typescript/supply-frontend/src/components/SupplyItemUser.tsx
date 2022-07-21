import styled from "styled-components";
import { palette, spacing } from "../theme";
import Inventory2SharpIcon from "@mui/icons-material/Inventory2Sharp";
import { ArrowRightIcon } from "../assets/icon";
import { IconButtonPurple } from "./buttons/IconButtonPurple";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";
import { Heading5 } from "./typography/Heading5";
import { useNavigate } from "react-router-dom";
import { useLink } from "../hooks/useLink";

type SupplyItemProps = {
  name: string;
  productId: string;
  status: string;
};

export const SupplyItemUser = (props: SupplyItemProps) => {
  const { name, productId, status } = props;
  const navigator = useNavigate();
  const links = useLink();
  const goToRoad = () => {
    navigator(links.viewDetail() + "/" + productId);
  };
  return (
    <Container>
      <ActionContainer>
        <IconButtonPurple disabled>
          <Inventory2SharpIcon />
        </IconButtonPurple>
      </ActionContainer>
      <TextContainer>
        <ProductName>{name}</ProductName>
        <ProductId>{productId}</ProductId>
        <IconButtonPurple disabled>
          <Badge
            badgeContent={
              status === "ARRIVEED" ? "arrived" : status.toLowerCase()
            }
            color="primary"
          />
        </IconButtonPurple>
      </TextContainer>
      <ActionContainer>
        <IconButtonPurple onClick={goToRoad}>
          <ArrowRightIcon />
        </IconButtonPurple>
      </ActionContainer>
    </Container>
  );
};

const ProductName = styled(Heading5)`
  font-size: 17px !important;
`;

const ProductId = styled(Heading5)`
  font-size: 18px !important;
`;

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
  grid-template-columns: 30% 45% 15%;
  grid-column-gap: 5%;
  justify-content: center;
  align-items: center;
`;
