import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import styled from "styled-components";

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
      <StyledForm>
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
        <StyledButton>Giriş</StyledButton>
        <ForgetPassword href="https://prosolution.ltd/my-account/lost-password/">
          Parolunuzu unutdunuzmu?
        </ForgetPassword>
      </StyledForm>
    </>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
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

export default LoginForm;
