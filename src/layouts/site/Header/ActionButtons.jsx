import React from "react";
import styled from "styled-components";

const ActionButtons = ({ openRegister }) => {
  return (
    <ButtonContainer>
      <StyledLinkContainer>
        <StyledLinkButton
          href="https://service.prosolution.ltd"
          target="_blank"
          rel="noopener noreferrer"
        >
          İT Servis Mərkəzi
        </StyledLinkButton>
      </StyledLinkContainer>
      <StyledLoginContainer>
        <StyledLoginButton onClick={openRegister}>Giriş</StyledLoginButton>
      </StyledLoginContainer>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.ul`
  display: flex;
`;

const StyledLinkContainer = styled.li`
  padding: 0px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 850px) {
    flex-direction: column-reverse;
    display: none;
  }
`;

const StyledLinkButton = styled.a`
  background-color: #149295;
  border: 1px solid #149295;
  border-radius: 99px;
  border: none;
  box-shadow: inset 0 1.2em 0 0 hsla(0, 0%, 100%, 0.1);
  color: #fff;
  padding: 6px 15px;
  font-size: 0.97em;
  &:hover {
    background-color: #157778;
  }
`;

const StyledLoginContainer = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  @media (max-width: 850px) {
    display: none;
  }
`;

const StyledLoginButton = styled.button`
  border: 1px solid silver;
  color: silver;
  padding: 6px 15px;
  background-color: transparent;
  border-radius: 99px;
  font-size: 0.97em;
  &:hover {
    background-color: #149295;
    color: #fff;
    border-color: #149295;
  }
`;

export default ActionButtons;
