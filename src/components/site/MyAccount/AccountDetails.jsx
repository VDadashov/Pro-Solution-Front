import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import styled from "styled-components";

const AccountDetails = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      NewPassword: "",
      ConfirmPassword: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <DetailContainer>
      <AccountText>
        Your account with Shop Pro Solution Aze is using a temporary password.
        We emailed you a link to change your password.
      </AccountText>
      <AccountForm onSubmit={formik.handleSubmit}>
        <FirstFormRow>
          <LabelContainer>
            <AccountLabel>Adınız *</AccountLabel>
            <AccountInput
              id="firstName"
              name="firstName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
          </LabelContainer>
          <LabelContainer>
            <AccountLabel>Soyadınız *</AccountLabel>
            <AccountInput
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />
          </LabelContainer>
        </FirstFormRow>
        <LabelRow>
          <AccountLabel>İstifadəçi adı *</AccountLabel>
          <AccountInput
            id="userName"
            name="userName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userName}
          />
        </LabelRow>
        <LabelRow>
          <AccountLabel>E-poçt ünvanı *</AccountLabel>
          <AccountInput
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </LabelRow>
        <PasswordField>
          <PasswordHeader>Şifrəni dəyişmək</PasswordHeader>
          <LabelRow>
            <AccountLabel>
              Hazırkı şifrə (Dəyişiklik olmasını istəmirsinizsə boş saxlayın)
            </AccountLabel>
            <AccountInput
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
          </LabelRow>
          <LabelRow>
            <AccountLabel>
              Yeni şifrə (Dəyişiklik olmasını istəmirsinizsə boş saxlayın)
            </AccountLabel>
            <AccountInput
              id="NewPassword"
              name="NewPassword"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.NewPassword}
            />
          </LabelRow>
          <LabelRow>
            <AccountLabel>Yeni şifrənin təkrarı</AccountLabel>
            <AccountInput
              id="ConfirmPassword"
              name="ConfirmPassword"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.ConfirmPassword}
            />
          </LabelRow>
          <FormButton>Yadda saxla</FormButton>
        </PasswordField>
      </AccountForm>
    </DetailContainer>
  );
};

const DetailContainer = styled.div`
  color: #777777;
`;

const AccountText = styled.p`
  color: #777777;
`;

const AccountForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
`;

const FirstFormRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 15px 0px 0px;
  @media (max-width: 550px) {
    flex-direction: column;
    gap: 25px;
    p{
      width: 100%;
    }
  }
`;

const LabelContainer = styled.p`
  width: 47%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const LabelRow = styled.p`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const AccountLabel = styled.label`
  color: #222;
  font-weight: 700;
`;

const AccountInput = styled.input`
  appearance: none;
  outline: none;
  border: 1px solid #ddd;
  border-radius: 0;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  color: #333;
  font-size: 0.97em;
  height: 2.507em;
  max-width: 100%;
  padding: 0 0.75em;
  transition: color 0.3s, border 0.3s, background 0.3s, opacity 0.3s;
  vertical-align: middle;
  width: 100%;
`;

const PasswordField = styled.fieldset`
  border: none;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const PasswordHeader = styled.legend`
  border-bottom: 1px solid #f1f1f1;
  font-size: 1em;
  font-weight: 700;
  margin: 30px 0px 25px;
  padding-bottom: 20px;
  text-transform: uppercase;
  width: 100%;
`;

const FormButton = styled.button`
  max-width: 150px;
  background-color: #149295;
  color: #fff;
  border: none;
  border-radius: 0;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 0.97em;
  font-weight: bolder;
  letter-spacing: 0.03em;
  line-height: 2.4em;
  margin-right: 1em;
  margin-top: 0;
  min-height: 2.5em;
  padding: 0 1.2em;
  &:hover {
    box-shadow: inset 0 0 0 100px rgba(0, 0, 0, 0.2);
  }
`;

export default AccountDetails;
