import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Address = () => {
  return (
    <AddressContainer>
      <AccountText>
        Aşağıdakı ünvanlar ödəniş səhifəsində standart olaraq istifadə olunacaq.
      </AccountText>
      <AddressesWrapper>
        <AccountContent>
          <AddressHeader>
            <h2>Ünvan və məlumatlarım</h2>
            <AccountLink>Add Ünvan və məlumatlarım</AccountLink>
          </AddressHeader>
          <address>You have not set up this type of address yet.</address>
        </AccountContent>
        <AccountContent>
          <AddressHeader>
            <h2>Çatdırılma ünvanı</h2>
            <AccountLink>Add Çatdırılma ünvanı</AccountLink>
          </AddressHeader>
          <address>You have not set up this type of address yet.</address>
        </AccountContent>
      </AddressesWrapper>
    </AddressContainer>
  );
};

const AddressContainer = styled.div`
  color: #777777;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const AccountText = styled.p``;

const AccountLink = styled(Link)`
  &:hover {
    color: #000000;
  }
`;

const AddressesWrapper = styled.div`
  display: flex;
  gap: 30px;
`;

const AccountContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AddressHeader = styled.header`
  color: #149295;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default Address;
