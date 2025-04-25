import React from "react";
import styled from "styled-components";

const LoginRegister = () => {
  return (
    <LoginRegisterContainer>
      <Login>
        <StyledHeader>GİRİŞ</StyledHeader>
        <StyledForm>
          <ButtonAligner>
            <StyledFormParagraph>
              <StyledLabel>İstifadəçi adı və ya e-poçt ünvanı *</StyledLabel>
              <StyledInput />
            </StyledFormParagraph>
            <StyledFormParagraph>
              <StyledLabel for="password">Parol *</StyledLabel>
              <StyledInput id="password" name="password" />
            </StyledFormParagraph>
            <RememberMe>
              <input type="checkbox" />
              <RememberMeSpan>Məni unutma</RememberMeSpan>
            </RememberMe>
          </ButtonAligner>
          <LoginBottom>
            <ForgetPassword href="https://prosolution.ltd/my-account/lost-password/">
              Parolunuzu unutdunuzmu?
            </ForgetPassword>
            <StyledButton>Giriş</StyledButton>
          </LoginBottom>
        </StyledForm>
      </Login>
      <Register>
        <StyledHeader>QEYDİYYAT</StyledHeader>
        <StyledForm>
          <ButtonAligner>
            <StyledFormParagraph>
              <StyledLabel for="password">E-poçt ünvanı *</StyledLabel>
              <StyledInput name="password" />
            </StyledFormParagraph>
            <ThickerP>
              A link to set a new password will be sent to your email address.
            </ThickerP>
            <ThinnerP>
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our
              <ParagraphSpan> gizlilik siyasəti.</ParagraphSpan>
            </ThinnerP>
          </ButtonAligner>
          <LoginBottom>
            <StyledButton>Qeydiyyat</StyledButton>
          </LoginBottom>
        </StyledForm>
      </Register>
    </LoginRegisterContainer>
  );
};

const LoginBottom = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 0px;
  gap: 15px;
`;

const LoginRegisterContainer = styled.div`
  display: flex;
  max-width: 1000px;
  background-color: #fff;
  @media (max-width: 850px) {
    overflow-y: scroll;
    flex-direction: column;
    width: 500px;
    max-height: 80vh;
    margin: 50px;
  }
`;

const ButtonAligner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
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

const StyledForm = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* gap: 30px; */
`;

const StyledFormParagraph = styled.p`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledLabel = styled.label`
  font-size: 0.9em;
  font-weight: 700;
  margin-bottom: 0.4em;
`;

const RememberMe = styled.label`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const RememberMeSpan = styled.span``;

const StyledButton = styled.button`
  max-width: 100%;
  padding: 10px;
  background-color: #149295;
  color: #fff;
  border: none;
  font-size: 16px;
  font-weight: bolder;
  letter-spacing: 0.03em;
  &:hover {
    background-color: #157778;
  }
`;

const ForgetPassword = styled.a`
  max-width: 50%;
  color: #149295;
  &:hover {
    color: #000;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  appearance: none;
  outline: none;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  color: #333;
  font-size: 0.97em;
  height: 2.507em;
  max-width: 100%;
  padding: 0 0.75em;
`;

const Register = styled.div`
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 50%;
  @media (max-width: 850px) {
    width: 100%;
    height: 50%;
  }
`;

const ThickerP = styled.p`
  color: #777;
  font-size: 90%;
`;

const ThinnerP = styled.p`
  color: #777;
  font-size: 85%;
`;

const ParagraphSpan = styled.span`
  color: #149295;
  cursor: pointer;
  &:hover {
    color: #000;
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

export default LoginRegister;
