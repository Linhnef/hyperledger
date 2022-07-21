/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { SupplyItem } from "../components/SupplyItem";
import { palette, spacing } from "../theme";
import { Heading4 } from "../components/typography/Heading4";
import { HomeIcon } from "../assets/icon";
import { useAsync } from "../libraries/use-async";
import { useApi } from "../hooks/useApi";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useLink } from "../hooks/useLink";
import { useNavigate } from "react-router-dom";
import { CommonLayout } from "../layouts/CommonLayout";
import { ButtonPrimary } from "../components/buttons/ButtonPrimary";
import { TextFieldOrange } from "../components/textfield/TextFieldOrange";
import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from "../hooks/useDebounce";
import { Product } from "../services/types/Product";
import { SupplyItemUser } from "../components/SupplyItemUser";

export const View = () => {
  const links = useLink();
  const navigator = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const onLogin = () => {
    navigator(links.login());
  };

  const onSignUp = () => {
    navigator(links.signUp());
  };

  const api = useApi();
  const { loading, result, reload } = useAsync(async () => {
    const rs = await api.getAllProduct();
    if (rs) {
      return rs.filter(
        (item) =>
          item.Record.RetailerId.length > 0 &&
          item.Record.Date.Retailer.length > 0
      );
    }
  });

  useEffect(() => {
    reload();
  }, []);

  useEffect(() => {
    if (result) {
      setProducts(result);
    }
  }, [result]);

  useEffect(() => {
    if (debouncedSearch.length > 0 && result) {
      setProducts(
        result.filter((x) => x.Record.ProductId.includes(debouncedSearch))
      );
    }
    if (debouncedSearch.length === 0 && result) {
      setProducts(result);
    }
  }, [debouncedSearch, result]);
  return (
    <CommonLayout title="products">
      <ItemWrapper>
        <Heading4>PRODUCTS</Heading4>
        <HeaderContainer>
          <LoginButton onClick={onLogin}>Login</LoginButton>
          <SignUpButton onClick={onSignUp}>Sign Up</SignUpButton>
          <TextFieldContainer>
            <TextFieldOrange
              id="outlined-basic"
              variant="outlined"
              endicon={<SearchIcon />}
              fullWidth={false}
              onChange={handleChange}
            />
          </TextFieldContainer>
        </HeaderContainer>
        <ItemContainer>
          <IconContainer>
            <HomeIcon />
          </IconContainer>
          <ItemLayout>
            {loading ? (
              <CircularProgress />
            ) : products && products.length > 0 ? (
              products.map((item, index) => (
                <SupplyItemUser
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
      </ItemWrapper>
    </CommonLayout>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 5%;
`;

const TextFieldContainer = styled.div`
  width: 51%;
`;

const SignUpButton = styled(ButtonPrimary)`
  margin: 10px 10px !important;
`;

const LoginButton = styled(ButtonPrimary)`
  margin: 10px 10px !important;
`;

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
