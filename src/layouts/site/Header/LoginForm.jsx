import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import styled from "styled-components";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { usePost } from "@utils/hooks/useCustomMutation";
import { ENDPOINTS } from "@utils/constants/Endpoints";

const LoginForm = ({ closeModal }) => {
  const { mutate: loginMutation } = usePost("login", ENDPOINTS.login);
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  const formik = useFormik({
    initialValues: {
      usernameOrEmail: "",
      password: "",
    },
    validationSchema: Yup.object({
      usernameOrEmail: Yup.string()
        .required("İstifadəçi adı və ya email  tələb olunur"),
      password: Yup.string().required("Parol tələb olunur"),
    }),
    onSubmit: (values, actions) => {
      actions.setSubmitting(true);

      loginMutation(values, {
        onSuccess: (res) => {
          const token = res.token;

          if (rememberMe) {
            Cookies.set("token", token, { expires: new Date(res?.expireTime) });
          } else {
            sessionStorage.setItem("token", token);
          }

          actions.setSubmitting(false);
          actions.resetForm();

          toast.success("Giriş uğurla tamamlandı!", {
            position: "top-right",
            autoClose: 2000,
            theme: "colored",
            transition: Bounce,
          });

          setTimeout(() => {
            navigate("/");
            window.location.reload();
          }, 2000);
        },
        onError: (error) => {
          actions.setSubmitting(false);
          const errorMessage =
            error?.response?.data?.message || "Xəta baş verdi!";
          toast.error(errorMessage, {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
            transition: Bounce,
          });
        },
      });
    },
  });

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <StyledFormParagraph>
        <StyledLabel htmlFor="usernameOrEmail">
          İstifadəçi adı və ya e-poçt ünvanı *
        </StyledLabel>
        <StyledInput
          id="usernameOrEmail"
          name="usernameOrEmail"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.usernameOrEmail}
        />
        {formik.touched.usernameOrEmail && formik.errors.usernameOrEmail && (
          <ErrorText>{formik.errors.usernameOrEmail}</ErrorText>
        )}
      </StyledFormParagraph>

      <StyledFormParagraph>
        <StyledLabel htmlFor="password">Parol *</StyledLabel>
        <StyledInput
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && (
          <ErrorText>{formik.errors.password}</ErrorText>
        )}
      </StyledFormParagraph>

      <RememberMe>
        <input
          type="checkbox"
          id="rememberMe"
          checked={rememberMe}
          onChange={() => setRememberMe(!rememberMe)}
        />
        <RememberMeSpan htmlFor="rememberMe">Məni yadda saxla</RememberMeSpan>
      </RememberMe>

      <StyledButton type="submit" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? "Göndərilir..." : "Giriş"}
      </StyledButton>


      <ForgetPassword to="/forgot-password" onClick={()=>closeModal()}>
        Parolunuzu unutmusunuz?
      </ForgetPassword>
    </StyledForm>
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

const StyledInput = styled.input`
  width: 100%;
  appearance: none;
  outline: none;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  color: #333;
  font-size: 0.97em;
  height: 2.5em;
  padding: 0 0.75em;
`;

const RememberMe = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const RememberMeSpan = styled.label`
  font-size: 0.9em;
  cursor: pointer;
`;

const StyledButton = styled.button`
  max-width: 100%;
  padding: 10px;
  background-color: #149295;
  color: #fff;
  border: none;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.03em;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #157778;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ForgetPassword = styled(Link)`
  max-width: 50%;
  color: #149295;
  text-decoration: none;
  font-size: 0.9em;

  &:hover {
    color: #000;
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: 0.8em;
  margin-top: 0.3em;
`;

export default LoginForm;
