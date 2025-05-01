import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const myAccount = "/myaccount";

const ControlPanel = () => {
  return (
    <PanelController>
      <AccountText>
        Salam <strong>123</strong> (<strong>123</strong> deyilsiniz?{" "}
        <AccountLink>Çıxış</AccountLink>)
      </AccountText>
      <AccountText>
        Şəxsi hesabınızdan{" "}
        <AccountLink to={`${myAccount}/orders`}>
          son sifarişlərinizə{" "}
        </AccountLink>
        baxa bilə,{" "}
        <AccountLink to={`${myAccount}/address`}>ünvanınızı</AccountLink> və
        <AccountLink to={`${myAccount}/account_details`}>
          {" "}
          şifrənizi və hesab məlumatlarınızı{" "}
        </AccountLink>
        dəyişə bilərsiniz.
      </AccountText>
      <ButtonList>
        <ListElement>
          <NavigateButton to={`${myAccount}/orders`}>Sifarişlər</NavigateButton>
        </ListElement>
        <ListElement>
          <NavigateButton to={`${myAccount}/downloads`}>
            Endirmələr
          </NavigateButton>
        </ListElement>
        <ListElement>
          <NavigateButton to={`${myAccount}/address`}>Ünvanlar</NavigateButton>
        </ListElement>
        <ListElement>
          <NavigateButton to={`${myAccount}/account_details`}>
            Hesab Detalları
          </NavigateButton>
        </ListElement>
        <ListElement>
          <NavigateButton>Wishlist</NavigateButton>
        </ListElement>
      </ButtonList>
    </PanelController>
  );
};

const PanelController = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const AccountText = styled.p`
  color: #777777;
`;

const AccountLink = styled(Link)`
  color: #149295;
  &:hover {
    color: #000000;
  }
`;

const ButtonList = styled.ul`
  /* background-color: red; */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  @media (max-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const ListElement = styled.li``;

const NavigateButton = styled(Link)`
  border: 1px solid #ddd;
  border-radius: 5px;
  display: block;
  padding: 20px 0;
  text-align: center;
  transition: all 0.3s;
  color: #149295;
  &:hover {
    background-color: #333;
    color: #fff;
  }
`;

export default ControlPanel;
