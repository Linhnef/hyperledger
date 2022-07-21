import { ReactNode } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import background from "../assets/icons/login-background.svg";

type CommonLayoutProps = {
  children: ReactNode;
  title: string;
};

export const CommonLayout = (props: CommonLayoutProps) => {
  const { children, title } = props;
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
  background: url(${background});
  background-size: cover;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
