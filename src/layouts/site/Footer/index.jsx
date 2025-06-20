import React from "react";
import styled from "styled-components";
import Copyright from "./Copyright";
import About from "./About";
import Map from "./Map";
import { LayoutContainer } from "@styles/common/LayoutContainer";

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
  align-items: center;
  background-color: rgb(20, 110, 113);
  flex-direction: column;
`;

const StyledFooterTop = styled.div`
  width: 100%;
  display: flex;
  padding: 20px 10px 20px 10px;
  align-items: center;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const StyledQuarterSpace = styled.div`
  width: 20%;
`;

const StyledSmallSpace = styled.div`
  width: 1%;
`;

export default Footer;
