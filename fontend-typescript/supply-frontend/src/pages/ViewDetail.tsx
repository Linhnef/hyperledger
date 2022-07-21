/* eslint-disable react-hooks/exhaustive-deps */
import {
  Badge,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  SelectChangeEvent,
  Step,
  StepLabel,
  Stepper,
  Tooltip,
} from "@mui/material";
import styled from "styled-components";
import { SupplyLayout } from "../layouts/SupplyLayout";
import FactoryIcon from "@mui/icons-material/Factory";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import HailIcon from "@mui/icons-material/Hail";
import { spacing } from "../theme";
import { Heading4 } from "../components/typography/Heading4";
import { Heading5 } from "../components/typography/Heading5";
import { QRCodeSVG } from "qrcode.react";
import { Subtitle1 } from "../components/typography/Subtitle1";
import { useNavigate, useParams } from "react-router-dom";
import { useAction } from "../libraries/use-action";
import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import { IconButtonPurple } from "../components/buttons/IconButtonPurple";
import { BackIcon, InformationIcon } from "../assets/icon";
import { useLink } from "../hooks/useLink";
import { useAsync } from "../libraries/use-async";
import { SelectPrimary } from "../components/selects/SelectPrimary";
import LocalShippingSharpIcon from "@mui/icons-material/LocalShippingSharp";
import DriveFileRenameOutlineSharpIcon from "@mui/icons-material/DriveFileRenameOutlineSharp";
import { useSnackbar } from "notistack";
import { ButtonPrimary } from "../components/buttons/ButtonPrimary";
import { IconButtonPurpleSmall } from "../components/buttons/IconButtonPurpleSmall";
import Grid3x3SharpIcon from "@mui/icons-material/Grid3x3Sharp";
import MonetizationOnSharpIcon from "@mui/icons-material/MonetizationOnSharp";
import CoPresentSharpIcon from "@mui/icons-material/CoPresentSharp";
import RotateRightSharpIcon from "@mui/icons-material/RotateRightSharp";
import { BaseCircleProgress } from "../components/loadings/BaseCircleProgress";
import { User } from "../services/types/User";
import { CommonLayout } from "../layouts/CommonLayout";

export const ViewDetail = () => {
  let { id } = useParams();
  const user: User = {
    Record: {
      UserRole: "RETAILER",
      UserName: "USER_SALE",
      UserEmail: "user@gmail.com",
      UserId: "userId",
      Address: "Address",
      Status: "Status",
    },
  };
  const [open, setOpen] = useState(false);
  const [diliveryUser, setDiliveryUser] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigator = useNavigate();
  const links = useLink();
  const api = useApi();

  const product = useAction(async () => {
    if (id) {
      const rs = await api.getProductById({ id: id });
      if (rs) {
        return rs;
      }
    }
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const factory = useAction(async () => {
    if (product.result?.Record.FactoryId) {
      const rs = await api.getUserById({ id: product.result.Record.FactoryId });
      if (rs) {
        return rs;
      }
    }
  });
  const whosale = useAction(async () => {
    if (product.result?.Record.WholesalerId) {
      const rs = await api.getUserById({
        id: product.result.Record.WholesalerId,
      });
      if (rs) {
        return rs;
      }
    }
  });
  const distributor = useAction(async () => {
    if (product.result?.Record.DistributorId) {
      const rs = await api.getUserById({
        id: product.result.Record.DistributorId,
      });
      if (rs) {
        return rs;
      }
    }
  });
  const retailer = useAction(async () => {
    if (product.result?.Record.RetailerId) {
      const rs = await api.getUserById({
        id: product.result.Record.RetailerId,
      });
      if (rs) {
        return rs;
      }
    }
  });

  const getDiliveryUser = useAsync(async () => {
    if (user) {
      if (user.Record.UserRole !== "RETAILER") {
        const rs = await api.getAllUser();
        if (rs) {
          if (user.Record.UserRole === "FACTORY") {
            return rs.filter((item) => item.Record.UserRole === "DISTRIBUTOR");
          } else if (user.Record.UserRole === "WHOLE_SALER") {
            return rs.filter((item) => item.Record.UserRole === "RETAILER");
          } else if (user.Record.UserRole === "DISTRIBUTOR") {
            return rs.filter((item) => item.Record.UserRole === "WHOLE_SALER");
          } else {
            return rs;
          }
        }
      }
    }
  });

  const dilivery = useAction(async () => {
    if (diliveryUser !== null) {
      if (user && id) {
        if (user.Record.UserRole === "FACTORY") {
          const rs = await api.updateProduct({
            method: "SEND_TO_DISTRIBUTOR",
            productId: id,
            userId: diliveryUser,
            date: new Date().getTime().toString(),
            consumerId: diliveryUser,
          });
          if (rs) {
            product.run();
            enqueueSnackbar("Product is being transported !", {
              variant: "success",
            });
            return rs;
          }
          enqueueSnackbar("Dilivery Fail !", { variant: "error" });
        } else if (user.Record.UserRole === "DISTRIBUTOR") {
          const rs = await api.updateProduct({
            method: "SEND_TO_WHOSALE",
            productId: id,
            userId: diliveryUser,
            date: new Date().getTime().toString(),
            consumerId: diliveryUser,
          });
          if (rs) {
            product.run();
            enqueueSnackbar("Product is being transported !", {
              variant: "success",
            });
            return rs;
          }
          enqueueSnackbar("Dilivery Fail !", { variant: "error" });
        } else if (user.Record.UserRole === "WHOLE_SALER") {
          const rs = await api.updateProduct({
            method: "SEND_TO_RETAILER",
            productId: id,
            userId: diliveryUser,
            date: new Date().getTime().toString(),
            consumerId: diliveryUser,
          });
          if (rs) {
            product.run();
            enqueueSnackbar("Product is being transported !", {
              variant: "success",
            });
            return rs;
          }
          enqueueSnackbar("Dilivery Fail !", { variant: "error" });
        }
      }
    }
  });

  const arrived = useAction(async () => {
    console.log(product);
    if (id && user) {
      const rs = await api.updateProduct({
        method: "ARRIVEED",
        productId: id,
        userId: user.Record.UserId,
        date: new Date().getTime().toString(),
        consumerId: user.Record.UserId,
      });
      if (rs) {
        product.run();
        handleClose();
        enqueueSnackbar("Product was arrived !", { variant: "success" });
        return rs;
      }
      handleClose();
      enqueueSnackbar("Something went wrong !", { variant: "error" });
    }
  });

  const onArrived = () => {
    arrived.run();
  };

  const onDilivery = () => {
    dilivery.run();
  };

  const onBack = () => {
    navigator(links.view());
  };

  const onDiliverUserChange = (event: SelectChangeEvent<string | number>) => {
    setDiliveryUser(event.target.value as string);
  };

  useEffect(() => {
    if (id && !product.result) {
      product.run();
    }
    if (
      product.result &&
      product.result.Record &&
      product.result.Record.FactoryId
    ) {
      factory.run();
      whosale.run();
      distributor.run();
      retailer.run();
    }
  }, [id, product.result]);

  useEffect(() => {
    getDiliveryUser.reload();
  }, []);

  return (
    <CommonLayout title="detail">
      {product.result ? (
        <Wrapper>
          <HeaderContainer>
            <IconButtonPurple onClick={onBack}>
              <BackIcon />
            </IconButtonPurple>
            <Heading4>
              {product.result.Record.Name +
                " from " +
                product.result.Record.FactoryId +
                " history"}
            </Heading4>
            <Tooltip title="Delete">
              <IconButtonPurple>
                <InformationIcon />
              </IconButtonPurple>
            </Tooltip>
          </HeaderContainer>
          {factory.result ? (
            <FactoryContainer>
              <BorderControl>
                <Stepper alternativeLabel>
                  <Step>
                    <StepLabel StepIconComponent={FactoryIcon}>
                      <DescriptionWrapper>
                        <QRCodeSVG size={70} value="https://reactjs.org/" />
                        <InformationContainer>
                          <Heading5>{factory.result.Record.UserName}</Heading5>
                          <Subtitle1>
                            {new Date(
                              Number(product.result.Record.Date.Factory)
                            ).toLocaleString()}
                          </Subtitle1>
                        </InformationContainer>
                      </DescriptionWrapper>
                    </StepLabel>
                  </Step>
                </Stepper>
              </BorderControl>
            </FactoryContainer>
          ) : (
            <></>
          )}

          {distributor.result ? (
            product.result.Record.Status === "DELIVER" &&
            user &&
            user.Record.UserRole === "DISTRIBUTOR" &&
            !product.result.Record.WholesalerId ? (
              <DistributorContainer>
                <BorderControl>
                  <Stepper alternativeLabel>
                    <Step>
                      <StepLabel StepIconComponent={LocalShippingSharpIcon}>
                        <DescriptionWrapper>
                          <ButtonPrimary onClick={handleClickOpen}>
                            Confrim Recieve Item
                          </ButtonPrimary>
                        </DescriptionWrapper>
                      </StepLabel>
                    </Step>
                  </Stepper>
                </BorderControl>
              </DistributorContainer>
            ) : (
              <DistributorContainer>
                <BorderControl>
                  <Stepper alternativeLabel>
                    <Step>
                      <StepLabel StepIconComponent={ApartmentIcon}>
                        <DescriptionWrapper>
                          <QRCodeSVG size={70} value="https://reactjs.org/" />
                          <InformationContainer>
                            <Heading5>
                              {distributor.result.Record.UserName}
                            </Heading5>
                            <Subtitle1>
                              {new Date(
                                Number(product.result.Record.Date.Distributor)
                              ).toLocaleString()}
                            </Subtitle1>
                          </InformationContainer>
                        </DescriptionWrapper>
                      </StepLabel>
                    </Step>
                  </Stepper>
                </BorderControl>
              </DistributorContainer>
            )
          ) : (
            product.result.Record.Status !== "DELIVER" &&
            user &&
            user.Record.UserRole === "FACTORY" &&
            getDiliveryUser.result && (
              <DistributorContainer>
                <BorderControl>
                  <SelectContainer>
                    <SelectPrimary
                      handleChange={onDiliverUserChange}
                      label="Choose Distributor"
                      value={diliveryUser}
                    >
                      {getDiliveryUser.result.map((item, index) => (
                        <MenuItem key={index} value={item.Record.UserId}>
                          {item.Record.UserName}
                        </MenuItem>
                      ))}
                    </SelectPrimary>
                    <IconButtonPurple onClick={onDilivery}>
                      <LocalShippingSharpIcon />
                    </IconButtonPurple>
                  </SelectContainer>
                </BorderControl>
              </DistributorContainer>
            )
          )}

          {whosale.result ? (
            product.result.Record.Status === "DELIVER" &&
            user &&
            user.Record.UserRole === "WHOLE_SALER" &&
            !product.result.Record.RetailerId ? (
              <WhosaleContainer>
                <BorderControl>
                  <Stepper alternativeLabel>
                    <Step>
                      <StepLabel StepIconComponent={LocalShippingSharpIcon}>
                        <DescriptionWrapper>
                          <ButtonPrimary onClick={handleClickOpen}>
                            Confrim Recieve Item
                          </ButtonPrimary>
                        </DescriptionWrapper>
                      </StepLabel>
                    </Step>
                  </Stepper>
                </BorderControl>
              </WhosaleContainer>
            ) : (
              <WhosaleContainer>
                <BorderControl>
                  <Stepper alternativeLabel>
                    <Step>
                      <StepLabel StepIconComponent={HomeWorkIcon}>
                        <DescriptionWrapper>
                          <QRCodeSVG size={70} value="https://reactjs.org/" />
                          <InformationContainer>
                            <Heading5>
                              {whosale.result.Record.UserName}
                            </Heading5>
                            <Subtitle1>
                              {new Date(
                                Number(product.result.Record.Date.Wholesaler)
                              ).toLocaleString()}
                            </Subtitle1>
                          </InformationContainer>
                        </DescriptionWrapper>
                      </StepLabel>
                    </Step>
                  </Stepper>
                </BorderControl>
              </WhosaleContainer>
            )
          ) : (
            product.result.Record.Status !== "DELIVER" &&
            user &&
            user.Record.UserRole === "DISTRIBUTOR" &&
            getDiliveryUser.result && (
              <WhosaleContainer>
                <BorderControl>
                  <SelectContainer>
                    <SelectPrimary
                      handleChange={onDiliverUserChange}
                      label="Choose Whosale"
                      value={diliveryUser}
                    >
                      {getDiliveryUser.result.map((item, index) => (
                        <MenuItem key={index} value={item.Record.UserId}>
                          {item.Record.UserName}
                        </MenuItem>
                      ))}
                    </SelectPrimary>
                    <IconButtonPurple onClick={onDilivery}>
                      <LocalShippingSharpIcon />
                    </IconButtonPurple>
                  </SelectContainer>
                </BorderControl>
              </WhosaleContainer>
            )
          )}

          {retailer.result ? (
            product.result.Record.Status === "DELIVER" &&
            user &&
            user.Record.UserRole === "RETAILER" ? (
              <RetailerContainer>
                <BorderControl>
                  <Stepper alternativeLabel>
                    <Step>
                      <StepLabel StepIconComponent={HailIcon}>
                        <DescriptionWrapper>
                          <QRCodeSVG size={70} value="https://reactjs.org/" />
                          <InformationContainer>
                            <Heading5>
                              {retailer.result.Record.UserName}
                            </Heading5>
                            <Subtitle1>
                              {new Date(
                                Number(product.result.Record.Date.Retailer)
                              ).toLocaleString()}
                            </Subtitle1>
                          </InformationContainer>
                        </DescriptionWrapper>
                      </StepLabel>
                    </Step>
                  </Stepper>
                </BorderControl>
              </RetailerContainer>
            ) : (
              <RetailerContainer>
                <BorderControl>
                  <Stepper alternativeLabel>
                    <Step>
                      <StepLabel StepIconComponent={HailIcon}>
                        <DescriptionWrapper>
                          <QRCodeSVG size={70} value="https://reactjs.org/" />
                          <InformationContainer>
                            <Heading5>
                              {retailer.result.Record.UserName}
                            </Heading5>
                            <Subtitle1>
                              {new Date(
                                Number(product.result.Record.Date.Retailer)
                              ).toLocaleString()}
                            </Subtitle1>
                          </InformationContainer>
                        </DescriptionWrapper>
                      </StepLabel>
                    </Step>
                  </Stepper>
                </BorderControl>
              </RetailerContainer>
            )
          ) : (
            <></>
          )}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirm Received Item</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <em>
                  If click agree means that you recieved product. This action
                  can't revert.
                </em>
                <DeliverItemContainer>
                  <DeliverItem>
                    <IconButtonPurpleSmall disabled>
                      <DriveFileRenameOutlineSharpIcon />
                    </IconButtonPurpleSmall>
                    <Subtitle1>{product.result.Record.Name}</Subtitle1>
                  </DeliverItem>
                  <DeliverItem>
                    <IconButtonPurpleSmall disabled>
                      <Grid3x3SharpIcon />
                    </IconButtonPurpleSmall>
                    <Subtitle1>{product.result.Record.ProductId}</Subtitle1>
                  </DeliverItem>
                  <DeliverItem>
                    <IconButtonPurpleSmall disabled>
                      <MonetizationOnSharpIcon />
                    </IconButtonPurpleSmall>
                    <Subtitle1>{product.result.Record.Price}$</Subtitle1>
                  </DeliverItem>
                  <DeliverItem>
                    <IconButtonPurpleSmall disabled>
                      <CoPresentSharpIcon />
                    </IconButtonPurpleSmall>
                    <Subtitle1>{product.result.Record.WholesalerId}</Subtitle1>
                  </DeliverItem>
                  <DeliverItem>
                    <IconButtonPurpleSmall disabled>
                      <RotateRightSharpIcon />
                    </IconButtonPurpleSmall>
                    <Badge badgeContent={"delivering"} color="success" />
                  </DeliverItem>
                </DeliverItemContainer>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <ButtonPrimary onClick={handleClose}>Cancel</ButtonPrimary>
              <AgrreeButton onClick={onArrived}>
                {arrived.running ? <BaseCircleProgress size={24.5} /> : "Agree"}
              </AgrreeButton>
            </DialogActions>
          </Dialog>
        </Wrapper>
      ) : (
        <></>
      )}
    </CommonLayout>
  );
};

const AgrreeButton = styled(ButtonPrimary)`
  min-width: 50px !important;
`;

const DeliverItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const DeliverItem = styled.div`
  display: grid;
  width: 150px;
  grid-template-columns: 40px auto;
  grid-column-gap: ${spacing.m};
  align-items: center;
`;

const SelectContainer = styled.div`
  min-width: 300px;
  min-height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BorderControl = styled.div`
  border: 1px solid black;
  padding: ${spacing.l} ${spacing.l};
  border-radius: 30%;
  background: rgba(255, 255, 255, 0.3);
`;

const HeaderContainer = styled.div`
  width: 80%;
  text-align: center;
  margin-bottom: ${spacing.xl};
  display: flex;
  justify-content: space-between;
  padding: 0 10%;
`;

const InformationContainer = styled.div`
  margin: 0 ${spacing.l};
  border-radius: 50%;
`;
const DescriptionWrapper = styled.div`
  width: 100%;
  display: flex;
  margin: 0 ${spacing.l};
`;

const Wrapper = styled.div`
  padding: ${spacing.l} 0;
  margin: ${spacing.l} 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 200px;
`;

const FactoryContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 75%;
  margin-left: 25%;
  @media (max-width: 768px) {
    width: 90%;
    margin-left: 10%;
  }
`;

const DistributorContainer = styled.div`
  width: 75%;
  margin-right: 25%;
  display: flex;
  justify-content: flex-end;
  @media (max-width: 768px) {
    width: 90%;
    margin-right: 10%;
  }
`;

const WhosaleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 75%;
  margin-left: 25%;
  @media (max-width: 768px) {
    width: 90%;
    margin-left: 10%;
  }
`;

const RetailerContainer = styled.div`
  width: 75%;
  margin-right: 25%;
  display: flex;
  justify-content: flex-end;
  @media (max-width: 768px) {
    width: 90%;
    margin-right: 10%;
  }
`;
