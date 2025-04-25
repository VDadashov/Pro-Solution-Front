import React from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const LoginRegister = ({ $showModal, closeRegister }) => {
  return (
    <>
      {$showModal && (
        <>
          <LoginBackground onClick={closeRegister}></LoginBackground>
          <Modal onClose={closeRegister} />
          <LoginRegisterContainer>
            <Login>
              <StyledHeader>GİRİŞ</StyledHeader>
              <LoginForm />
            </Login>
            <Register>
              <StyledHeader>QEYDİYYAT</StyledHeader>
              <RegisterForm />
            </Register>
          </LoginRegisterContainer>
        </>
      )}
    </>
  );
};

const LoginRegisterContainer = styled.div`
  position: fixed;
  display: flex;
  opacity: 1 !important;
  z-index: 3;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 875px;
  background-color: #fff;
  @media (max-width: 850px) {
    overflow-y: scroll;
    flex-direction: column;
    width: 500px;
    max-height: 80vh;
  }
  @media (max-width: 650px) {
    width: 300px;
  }
  @media (max-width: 400px) {
    width: 200px;
  }
`;

const Login = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 50%;
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  padding: 30px 20px;
  @media (max-width: 850px) {
    width: 100%;
    height: 50%;
  }
`;

const StyledHeader = styled.h3`
  color: #149295;
  font-size: 1.25em;
  letter-spacing: 2px;
`;

const Register = styled.div`
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 50%;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  @media (max-width: 850px) {
    width: 100%;
    height: 50%;
  }
`;

const LoginBackground = styled.div`
  overflow-y: hidden;
  overflow-x: hidden;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  opacity: 0.6;
  height: 100vh;
  width: 100%;
  background-color: #0b0b0b;
  z-index: 3;
  display: flex;
  align-items: start;
`;

const Modal = ({ onClose }) => {
  return (
    <ModalButton onClick={onClose}>
      <IoClose />
    </ModalButton>
  );
};

const ModalButton = styled.button`
  color: rgb(178, 178, 178);
  position: absolute;
  right: 20px;
  top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 40px;
  cursor: pointer;
  z-index: 9;
  &:hover {
    color: #fff;
    cursor: pointer;
    opacity: 1;
    transition: 0.3s;
  }
`;

export default LoginRegister;
