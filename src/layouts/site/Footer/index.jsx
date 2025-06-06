import React from "react";
import styled from "styled-components";
import Copyright from "./Copyright";
import About from "./About";
import Map from "./Map";
import { LayoutContainer } from "@styles/common/LayoutContainer";
import PasswordChange from "@components/site/MyAccount/ChangeParol";

const Footer = () => {
  return (
    <StyledFooter>
      <LayoutContainer>
        <StyledFooterTop>
          <About />
          <StyledQuarterSpace />
          <StyledSmallSpace />
          <Map />
        </StyledFooterTop>
      </LayoutContainer>
      <Copyright />
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(20, 110, 113);
  flex-direction: column;
`;

const StyledFooterTop = styled.div`
  width: 100%;
  display: flex;
  padding: 20px 0px 40px 0px;
  @media (max-width: 550px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const StyledQuarterSpace = styled.div`
  width: 25%;
`;

const StyledSmallSpace = styled.div`
  width: 1%;
`;

export default Footer;
