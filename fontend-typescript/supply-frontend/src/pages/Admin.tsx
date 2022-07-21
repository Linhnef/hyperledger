import { useState } from "react";
import styled from "styled-components";
import { IconButtonPurple } from "../components/buttons/IconButtonPurple";
import { BaseCircleProgress } from "../components/loadings/BaseCircleProgress";
import { Heading3 } from "../components/typography/Heading3";
import { UserItem } from "../components/UserItem";
import { useApi } from "../hooks/useApi";
import { SupplyLayout } from "../layouts/SupplyLayout";
import { useAsync } from "../libraries/use-async";
import { spacing } from "../theme";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import { Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLink } from "../hooks/useLink";

export const Admin = () => {
  const api = useApi();
  const navigator = useNavigate();
  const links = useLink();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onLogout = () => {
    localStorage.clear();
    navigator(links.login());
  };

  const { loading, result, reload } = useAsync(async () => {
    const rs = await api.getAllUser();
    if (rs) {
      return rs;
    }
  });

  const active = async (id: string) => {
    const rs = await api.active({ id: id });
    if (rs) {
      console.log(rs);
      reload();
    }
  };

  const deActive = async (id: string) => {
    const rs = await api.deActive({ id: id });
    if (rs) {
      reload();
    }
  };
  return (
    <SupplyLayout title="Admin" isCreate={false}>
      <Wrapper>
        <HeaderContainer>
          <Heading3>USERS</Heading3>
          <MenuIcon onClick={handleClick}>
            <MenuSharpIcon />
          </MenuIcon>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={onLogout}>Logout</MenuItem>
          </Menu>
        </HeaderContainer>
        <ItemLayout>
          {loading ? (
            <NoItemContainer>
              <BaseCircleProgress size={24.5} />
            </NoItemContainer>
          ) : result ? (
            result.map((item, index) => (
              <UserItem
                onActive={active}
                onDeActive={deActive}
                key={index}
                id={item.Record.UserId}
                name={item.Record.UserName}
                status={item.Record.Status}
              />
            ))
          ) : (
            <NoItemContainer>
              <em>no item</em>
            </NoItemContainer>
          )}
        </ItemLayout>
      </Wrapper>
    </SupplyLayout>
  );
};

const MenuIcon = styled(IconButtonPurple)`
  position: absolute !important;
  right: ${spacing.xxl};
  top: 0;
`;

const NoItemContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const HeaderContainer = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  margin: ${spacing.xl} 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ItemLayout = styled.div`
  height: 74vh;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;
