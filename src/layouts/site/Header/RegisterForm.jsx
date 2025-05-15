import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import styled from "styled-components";
import { ENDPOINTS } from "@utils/constants/Endpoints";
import { usePost } from "@utils/hooks/useCustomMutation";

const RegisterForm = () => {
  const { data: registerMutation } = usePost("register", ENDPOINTS.register);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values, actions) => {
      registerMutation(
        { email: values.email },
        {
          onSuccess: () => {
            actions.resetForm();
            alert("Email göndərildi!");
          },
          onError: (error) => {
            alert("Xəta baş verdi: " + error.message);
          },
        }
      );
    },
  });
  return (
    <>
      <StyledForm onSubmit={formik.handleSubmit}>
        <StyledFormParagraph>
          <StyledLabel for="email">E-poçt ünvanı *</StyledLabel>
          <StyledInput
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </StyledFormParagraph>
        <ThickerP>
          A link to set a new password will be sent to your email address.
        </ThickerP>
        <ThinnerP>
          Your personal data will be used to support your experience throughout
          this website, to manage access to your account, and for other purposes
          described in our
          <ParagraphSpan> gizlilik siyasəti.</ParagraphSpan>
        </ThinnerP>
        <StyledButton type="submit">Qeydiyyat</StyledButton>
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

export default RegisterForm;
