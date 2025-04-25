import React from "react";
import styled from "styled-components";
import { RiVisaLine } from "react-icons/ri";
import { SiMastercard } from "react-icons/si";
import { FaHandHoldingUsd } from "react-icons/fa";
import { LayoutContainer } from "@styles/common/LayoutContainer";
import PaymentIcon from "@styles/common/PaymentIcon";

const CopyrightText = styled.p`
  color: hsla(0, 0%, 100%, 0.5);
  font-size: 14.4px;
  @media (max-width: 850px) {
    margin: auto;
  }
`;

const CopyrightContainer = styled.div`
  background-color: #062a2d;
  width: 100%;
`;

const Seperater = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 0px;
  gap: 20px;

  @media (max-width: 850px) {
    flex-direction: column-reverse;
  }
`;
const PaymentIcons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Links = styled.a`
  &:hover {
    color: #fff;
  }
`;

const StrongTag = styled.strong``;

function Copyright() {
  return (
    <CopyrightContainer>
      <LayoutContainer>
        <Seperater>
          <CopyrightText>
            Copyright 2025 © Powered by
            <StrongTag>
              {" "}
              <Links href="https://service.prosolution.ltd">
                ProSolution AZE{" "}
              </Links>
              | DESIGN BY{" "}
              <Links href="https://devservice.az">DevIT Group</Links>
            </StrongTag>
          </CopyrightText>
          <PaymentIcons>
            <PaymentIcon iconName={RiVisaLine}></PaymentIcon>
            <PaymentIcon iconName={SiMastercard}></PaymentIcon>
            <PaymentIcon iconName={FaHandHoldingUsd}></PaymentIcon>
          </PaymentIcons>
        </Seperater>
      </LayoutContainer>
    </CopyrightContainer>
  );
}

export default Copyright;
