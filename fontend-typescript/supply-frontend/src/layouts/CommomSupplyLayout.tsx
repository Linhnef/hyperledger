import { ReactNode } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import background from "../assets/icons/background.svg";

type CommonLayoutProps = {
  children: ReactNode;
  title: string;
  isCreate: boolean;
};

export const CommomSupplyLayout = (props: CommonLayoutProps) => {
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
  position: relative;
  background: url(${background});
  background-size: cover;
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
`;
