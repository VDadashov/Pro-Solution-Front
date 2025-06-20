import { ENDPOINTS } from "@utils/constants/Endpoints";
import { usePost } from "@utils/hooks/useCustomMutation";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import styled from "styled-components";

const ResetPassword = () => {
  const { mutate: Forgetpassword } = usePost("forgotPasswordRequest", ENDPOINTS.forgotpassword);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Düzgün email daxil edin").required("Email tələb olunur"),
    }),
    onSubmit: (values, actions) => {
      Forgetpassword(values, {
        onSuccess: () => {
          actions.resetForm();


          
          alert("Şifrə sıfırlama linki göndərildi.");
        },
        onError: () => {
          alert("Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.");
        }
      });
    }
  });

  return (
    <Container>
      <Title>MY ACCOUNT</Title>
      <Content>
        <InfoText>
          Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.
        </InfoText>
        <Form onSubmit={formik.handleSubmit}>
          <InputGroup>
            <Label htmlFor="email">İstifadəçi adı və ya e-poçt *</Label>
            <Input
              type="text"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div style={{ color: 'red', fontSize: '14px' }}>{formik.errors.email}</div>
            )}
          </InputGroup>
          <Button type="submit">Parolu Sıfırla</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default ResetPassword;




const Container = styled.div`
  margin: 0 auto;
 
`;
const Content =styled.div`
padding: 20px 20px;
`
const Title = styled.h2`
display: block;
padding: 20px 0px;
background-color:#f7f7f7;
margin: 0 auto;
  text-align: center;
  color: #168a8a;
  font-size: 24px;
  margin-bottom: 30px;
`;

const InfoText = styled.p`
  text-align: left;
  font-size: 15px;
  color: #666;
  margin-bottom: 25px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InputGroup = styled.div`
width: 50%;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 2px;
  outline: none;
 
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
  &:focus{
 box-shadow: rgba(129, 126, 126, 0.2) 0px 2px 8px 0px;
  }
`;

const Button = styled.button`
  background-color: #168a8a;
  color: white;
  padding: 10px 25px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
margin-bottom: 10px;
  &:hover {
    background-color: #126f6f;
  }
`;
