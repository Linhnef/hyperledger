import { ReactNode, useContext, useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import background from "../assets/icons/background.svg";
import { AuthenticationContext } from "../contexts/globalContext";

type CommonLayoutProps = {
  children: ReactNode;
  title: string;
  isCreate: boolean;
};

export const SupplyLayout = (props: CommonLayoutProps) => {
  const { children, title } = props;
  const { setUser, setToken } = useContext(AuthenticationContext);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setToken(token);
      setUser(JSON.parse(user));
    }
  }, []);
  return (
    <Container>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      {children}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  background: url(${background});
  background-size: cover;
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
`;
