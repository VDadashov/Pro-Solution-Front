import React from "react";
import styled from "styled-components";
import LoginRegister from "@components/site/MyAccount/LoginRegister";
import { LayoutContainer } from "@styles/common/LayoutContainer";
import AccountSideBar from "@components/site/MyAccount/AccountSideBar";
import { Outlet } from "react-router-dom";

const MyAccount = () => {
  return (
    <AccountPage>
      <PageHeader>My account</PageHeader>
      <PageBottom>
        {/* <LoginRegister /> */}
        <AccountInfo>
          <LayoutContainer>
            <AccountConfiguration>
              <AccountSideBar />
              <AccountTab>
                <Outlet />
              </AccountTab>
            </AccountConfiguration>
          </LayoutContainer>
        </AccountInfo>
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
  max-width: 1224px;
  width: 100%;
  color: #149295;
  padding: 15px 20px;
  text-transform: uppercase;
  text-align: left;
`;

const PageBottom = styled.div`
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AccountInfo = styled.div`
  width: 100%;
  padding: 30px 0px;
`;

const AccountConfiguration = styled.div`
  width: 100%;
  display: flex;
  @media (max-width: 850px) {
    flex-direction: column;
    gap: 50px;
  }
`;

const AccountTab = styled.div`
  width: 75%;
  padding-left: 30px;
  @media (max-width: 850px) {
    padding: 0;
    width: 100%;
  }
`;

export default MyAccount;
