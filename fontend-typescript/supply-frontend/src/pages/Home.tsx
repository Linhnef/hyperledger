/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { SupplyItem } from "../components/SupplyItem";
import { SupplyLayout } from "../layouts/SupplyLayout";
import { palette, spacing } from "../theme";
import { Heading4 } from "../components/typography/Heading4";
import { IconButtonPurple } from "../components/buttons/IconButtonPurple";
import { AddIcon, HomeIcon } from "../assets/icon";
import { useAsync } from "../libraries/use-async";
import { useApi } from "../hooks/useApi";
import { CircularProgress, Menu, MenuItem } from "@mui/material";
import { useEffect, useContext, useState } from "react";
import { AuthenticationContext } from "../contexts/globalContext";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import { useLink } from "../hooks/useLink";
import { useNavigate } from "react-router-dom";
import { IconButtonOrange } from "../components/buttons/IconButtonOrange";

export const Home = () => {
  const { user } = useContext(AuthenticationContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const links = useLink();
  const navigator = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onGotoProfile = () => {
    navigator(`${links.profile()}/${user?.Record.UserId}`);
  };

  const onLogout = () => {
    localStorage.clear();
    navigator(links.login());
  };

  const onAdd = () => {
    navigator(links.createProduct());
  };
  const api = useApi();
  const { loading, result,reload } = useAsync(async () => {
    const rs = await api.getAllProduct();
    if (rs && user) {
      if (user.Record.UserRole === "FACTORY") {
        return rs.filter(
          (item) => item.Record.FactoryId === user.Record.UserId && user.Record.Status !== "NONE_ACTIVE"
        );
      } else if (user.Record.UserRole === "WHOLE_SALER") {
        return rs.filter(
          (item) => item.Record.WholesalerId === user.Record.UserId && user.Record.Status !== "NONE_ACTIVE"
        );
      } else if (user.Record.UserRole === "RETAILER") {
        return rs.filter(
          (item) => item.Record.RetailerId === user.Record.UserId && user.Record.Status !== "NONE_ACTIVE"
        );
      } else if (user.Record.UserRole === "DISTRIBUTOR") {
        return rs.filter(
          (item) => item.Record.DistributorId === user.Record.UserId && user.Record.Status !== "NONE_ACTIVE"
        );
      } else {
        return rs;
      }
    }
  });
  const { setUser, setToken } = useContext(AuthenticationContext);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setToken(token);
      setUser(JSON.parse(user));
    }
  }, []);
  
  useEffect(() => {
    reload()
  }, [user]);
  return user ? (
    <SupplyLayout isCreate={true} title="Home">
      <ItemWrapper>
        <InformationButton onClick={handleClick}>
          <MenuSharpIcon />
        </InformationButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={onGotoProfile}>Profile</MenuItem>
          <MenuItem onClick={onLogout}>Logout</MenuItem>
          {user.Record.UserRole === "FACTORY" && (
            <MenuItem onClick={onAdd}>Add Product</MenuItem>
          )}
        </Menu>
        <Heading4>PRODUCTS</Heading4>
        <ItemContainer>
          <IconContainer>
            <HomeIcon />
          </IconContainer>
          <ItemLayout>
            {loading ? (
              <CircularProgress />
            ) : result && result.length > 0 ? (
              result.map((item, index) => (
                <SupplyItem
                  key={index}
                  name={item.Record.Name}
                  productId={item.Record.ProductId}
                  status={item.Record.Status}
                />
              ))
            ) : (
              <em>No item</em>
            )}
          </ItemLayout>
        </ItemContainer>
        {user.Record.UserRole === "FACTORY" && (
          <IconButtonOrange onClick={onAdd}>
            <AddIcon />
          </IconButtonOrange>
        )}
      </ItemWrapper>
    </SupplyLayout>
  ) : (
    <></>
  );
};
const IconContainer = styled.div`
  @media (max-width: 768px) {
   display: none;
  }
`;

const ItemLayout = styled.div`
  height: 458px;
  overflow-x: hidden;
  overflow-y: auto;
`;

const InformationButton = styled(IconButtonPurple)`
  position: absolute !important;
  right: ${spacing.xxl};
  top: 0;
`;

const ItemWrapper = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  margin: ${spacing.xxl} 0;
`;

const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  width: 90%;
  padding: ${spacing.lx} 0;
  margin: ${spacing.lx} 5%;
  box-shadow: ${palette.purple1Transparent3} 0px 3px 5px;
  @media (max-width: 768px) {
    grid-template-columns: 100%;
  }
`;
