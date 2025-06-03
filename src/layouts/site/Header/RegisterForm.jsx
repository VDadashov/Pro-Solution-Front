import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import styled from "styled-components";
import { ENDPOINTS } from "@utils/constants/Endpoints";
import { usePost } from "@utils/hooks/useCustomMutation";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const { mutate: registerMutation } = usePost("register", ENDPOINTS.register);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("E-poçt formatı yanlışdır")
        .required("E-poçt tələb olunur"),
    }),
    onSubmit: (values, actions) => {
      actions.setSubmitting(true);

      registerMutation(values, {
        onSuccess: () => {
          actions.setSubmitting(false);
          actions.resetForm();

          toast.success("Qeydiyyat uğurla tamamlandı!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        },
        onError: (error) => {
          actions.setSubmitting(false);
          const errorMessage =
            error?.response?.data?.message || "Xəta baş verdi!";
          toast.error(errorMessage, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        },
      });
    },
  });

  return (
    <StyledForm onSubmit={formik.handleSubmit} role="form" aria-label="Qeydiyyat formu">
      <StyledFormParagraph>
        <StyledLabel htmlFor="email">E-poçt ünvanı *</StyledLabel>

        <StyledInput
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <ErrorText>{formik.errors.email}</ErrorText>
        )}
      </StyledFormParagraph>

      <ThickerP>
        Yeni şifrə təyin etmək üçün bir keçid e-poçt ünvanınıza göndəriləcək.
      </ThickerP>
      <ThinnerP>
        Şəxsi məlumatlarınız bu veb sayt üzərindən təcrübənizi dəstəkləmək,
        hesabınıza giriş idarə etmək və{" "}
        <ParagraphSpan>gizlilik siyasətimizdə</ParagraphSpan> təsvir olunan
        digər məqsədlər üçün istifadə olunacaq.
      </ThinnerP>

      <StyledButton type="submit" disabled={formik.isSubmitting || !formik.isValid}>
        {formik.isSubmitting ? "Göndərilir..." : "Qeydiyyat"}
      </StyledButton>
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
  height: 2.507em;
  max-width: 100%;
  padding: 0 0.75em;
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

const ErrorText = styled.div`
  color: red;
  font-size: 0.8em;
  margin-top: 0.3em;
`;

export default RegisterForm;
