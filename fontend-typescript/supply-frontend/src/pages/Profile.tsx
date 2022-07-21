import styled from "styled-components";
import { SupplyItem } from "../components/SupplyItem";
import { SupplyLayout } from "../layouts/SupplyLayout";
import homeBackground from "../assets/icons/home.svg";
import { color, palette, spacing } from "../theme";
import { Heading4 } from "../components/typography/Heading4";
import { IconButtonPurple } from "../components/buttons/IconButtonPurple";
import { BackIcon, InformationIcon } from "../assets/icon";
import { ListItem, ListItemIcon, ListItemText, Paper } from "@mui/material";
import { Heading5 } from "../components/typography/Heading5";
import { Box } from "@mui/system";
import { QRCodeSVG } from "qrcode.react";
import { Heading3 } from "../components/typography/Heading3";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useApi } from "../hooks/useApi";
import { useAsync } from "../libraries/use-async";
import { useLink } from "../hooks/useLink";

export const Profile = () => {
  let { id } = useParams();
  const api = useApi();
  const links = useLink();
  const navigator = useNavigate();

  const onBack = () => {
    navigator(links.home());
  };

  const getUser = useAsync(async () => {
    if (id) {
      const rs = await api.getUserById({ id: id });
      if (rs) {
        return rs;
      }
    }
  });

  useEffect(() => {
    getUser.reload();
  }, [id]);
  return (
    <SupplyLayout isCreate={true} title="Profile">
      <ItemWrapper>
        <InformationButton onClick={onBack}>
          <BackIcon />
        </InformationButton>
        <HeadinContainer>
          <Heading4>USER PROFILE</Heading4>
        </HeadinContainer>
        <ProfileContainer>
          <CardItem>
            <InformationContainer>
              <Heading4>INFORMATION</Heading4>
            </InformationContainer>
            <InformationWrapper>
              <CustomHeading5>
                Name : {getUser.result?.Record.UserName}
              </CustomHeading5>
              <CustomHeading5>
                Role : {getUser.result?.Record.UserRole}
              </CustomHeading5>
              <CustomHeading5>
                Email : {getUser.result?.Record.UserEmail}
              </CustomHeading5>
              <CustomHeading5>
                Address : {getUser.result?.Record.Address}
              </CustomHeading5>
            </InformationWrapper>
          </CardItem>
          <CardItem>
            <QRCodeWrapper>
              <Heading4>QR CODE</Heading4>
              <QRCodeContainer>
                <QRCodeSVG size={250} value="https://reactjs.org/" />
              </QRCodeContainer>
            </QRCodeWrapper>
          </CardItem>
        </ProfileContainer>
      </ItemWrapper>
    </SupplyLayout>
  );
};

const CustomHeading5 = styled(Heading5)`
  text-decoration: underline;
`;
const InformationWrapper = styled.div`
  margin: 0 ${spacing.xl};
`;

const InformationContainer = styled.div`
  width: 100%;
  text-align: center;
  margin: ${spacing.xl} 0;
`;

const QRCodeContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: ${spacing.xl} 0;
`;
const QRCodeWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: ${spacing.xl} 0;
  text-align: center;
`;

const CardItem = styled(Box)`
  margin: 0 ${spacing.lx};
  width: 500px;
  height: 400px;
  background-color: ${color.white1};
  border-radius: 12px;
  border: 1px solid ${color.blue};
`;
const HeadinContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const ProfileContainer = styled.div`
  width: 100%;
  display: grid;
  justify-content: center;
  grid-template-columns: 500px 500px;
  grid-column-gap: ${spacing.l};
  grid-row-gap: ${spacing.l};
  margin: ${spacing.xl} 0;
`;

const InformationButton = styled(IconButtonPurple)`
  position: absolute !important;
  left: ${spacing.xxl};
  top: 0;
`;

const ItemWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: ${spacing.xxl} 0;
`;
