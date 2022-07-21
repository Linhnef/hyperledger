import styled from "styled-components";
import background from "../assets/icons/footer.svg";
import {
  AddIcon,
  CommunityIcon,
  CourseIcon,
  SettingIcon,
  TentIcon,
} from "../assets/icon";
import { IconButtonOrange } from "./buttons/IconButtonOrange";
import { IconButtonPurple } from "./buttons/IconButtonPurple";
import { useNavigate } from "react-router-dom";
import { useLink } from "../hooks/useLink";

type FooterProps = {
  isCreate: boolean;
};

export const Footer = (props: FooterProps) => {
  const { isCreate } = props;
  const navigator = useNavigate();
  const links = useLink();
  const onAdd = () => {
    navigator(links.createProduct());
  };
  return (
    <Container>
      <Wrapper>
        <SettingIconButton>
          <SettingIcon />
        </SettingIconButton>
        <TentIconButton>
          <TentIcon />
        </TentIconButton>
        {isCreate && (
          <AddIconButton onClick={onAdd}>
            <AddIcon />
          </AddIconButton>
        )}
        <CommunityIconButton>
          <CommunityIcon />
        </CommunityIconButton>
        <ConmunityIconButton>
          <CourseIcon />
        </ConmunityIconButton>
      </Wrapper>
    </Container>
  );
};

const ConmunityIconButton = styled(IconButtonPurple)`
  position: absolute;
  left: 60%;
  top: 35px;
`;

const CommunityIconButton = styled(IconButtonPurple)`
  position: absolute;
  left: 80%;
  top: 35px;
`;

const AddIconButton = styled(IconButtonOrange)`
  position: absolute;
  left: 41.5%;
`;

const SettingIconButton = styled(IconButtonPurple)`
  position: absolute;
  left: 10%;
  top: 35px;
`;

const TentIconButton = styled(IconButtonPurple)`
  position: absolute;
  left: 20%;
  top: 35px;
`;

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const Container = styled.div`
  position: absolute;
  bottom: 0;
  background: url(${background}) no-repeat center center;
  background-size: cover;
  width: 100%;
  min-height: 100px;
`;
