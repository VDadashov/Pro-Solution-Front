import React, { useState } from "react";
import styled from "styled-components";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useParams } from "react-router";
import { useFormik } from "formik";
import { usePost } from "@utils/hooks/useCustomMutation";
import { ENDPOINTS } from "@utils/constants/Endpoints";
import { toast } from "react-toastify";

const validatePassword = (password) => {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isLongEnough = password.length >= 8;

  if (!hasUppercase) return "Parol ən az bir böyük hərf içerməlidir.";
  if (!hasLowercase) return "Parol ən az bir kiçik hərf içerməlidir.";
  if (!hasSymbol) return "Parol ən az bir simvol içerməlidir.";
  if (!isLongEnough) return "Parol ən az 8 simvoldan ibarət olmalıdır.";

  return null;
};

const PasswordChange = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const { email, token } = useParams();

  const { mutate: resetPassword } = usePost(
    "resetPasswordRequest",
    ENDPOINTS.resetpassword
  );

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      const error = validatePassword(values.newPassword);

      if (error) {
        toast.error(error);
        return;
      }

      if (values.newPassword !== values.confirmPassword) {
        toast.error("Parollar uyğun gəlmir!");
        return;
      }

      resetPassword(
        {
          email,
          token,
          newPassword: values.newPassword,
        },
        {
          onSuccess: () => {
            toast.success("Parol uğurla dəyişdirildi.");
          },
          onError: () => {
            toast.error("Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.");
              
          },
        }
      );
    },
  });

  return (
    <Container>
      <Title>MY ACCOUNT</Title>
      <Content>
        <InfoText>Yeni parolu aşağıda daxil et.</InfoText>
        <Form onSubmit={formik.handleSubmit}>
          <InputGroup>
            <Label htmlFor="newPassword">Yeni parol *</Label>
            <InputWrapper>
              <Input
                type={showPassword1 ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
              />
              <ToggleIcon
                className="toggle-visibility"
                onClick={() => setShowPassword1((prev) => !prev)}
              >
                {!showPassword1 ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </ToggleIcon>
            </InputWrapper>
          </InputGroup>

          <InputGroup>
            <Label htmlFor="confirmPassword">Yeni parolu bir də daxil et *</Label>
            <InputWrapper>
              <Input
                type={showPassword2 ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
              />
              <ToggleIcon
                className="toggle-visibility"
                onClick={() => setShowPassword2((prev) => !prev)}
              >
                {!showPassword2 ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </ToggleIcon>
            </InputWrapper>
          </InputGroup> 
        </Form>
        <Button type="button" onClick={formik.handleSubmit}>Qeyd et</Button>
      </Content>
    </Container>
  );
};

export default PasswordChange;



const Container = styled.div`
 margin: 0 auto;
`;
const Content=styled.div`
padding:10px 30px ;
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
  margin-bottom: 10px;
  color: #777777;
`;

const Form = styled.form`
  display: flex;
 align-items: center;
  gap: 40px;
  flex-wrap: wrap;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 40%;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 10px;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  &:hover .toggle-visibility {
    opacity: 1;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 40px 10px 10px;
  border: 1px solid #ddd;
  border-radius: 2px;
  outline: none;
  font-size: 16px;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
  &:focus{
 box-shadow: rgba(129, 126, 126, 0.2) 0px 2px 8px 0px;
  }
`;

const ToggleIcon = styled.div`
  position: absolute;
  right: 10px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: #555;

  &.toggle-visibility {
    display: flex;
    align-items: center;
  }
`;

const Button = styled.button`
  background-color: #168a8a;
  color: white;
  padding: 10px 20px;
  border: none;
  margin-top: 20px;
  cursor: pointer;
  font-size: 16px;
`;
