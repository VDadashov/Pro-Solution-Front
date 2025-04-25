import React from "react";
import styled from "styled-components";
import LoginRegister from "@components/site/MyAccount/LoginRegister";

const MyAccount = () => {
  return (
    <AccountPage>
      <PageHeader>My account</PageHeader>
      <PageBottom>
        <LoginRegister />
      </PageBottom>
    </AccountPage>
  );
};

const AccountPage = styled.main`
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageHeader = styled.h1`
  color: #149295;
  padding: 15px 0px;
  text-transform: uppercase;
`;

const PageBottom = styled.div`
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default MyAccount;
