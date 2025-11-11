import React from "react";
import styled from "styled-components";

import { useFormik } from "formik";
import * as Yup from "yup";
import { usePost } from "@utils/hooks/useCustomMutation";
import { useGet } from "@utils/hooks/useCustomQuery";
import { ENDPOINTS } from "@utils/constants/Endpoints";
import { toast, Bounce } from "react-toastify";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f8f8;
  padding: 20px;
`;

const ContactWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(228, 228, 228);
  padding: 20px;
  width: 1224px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const ContactInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 15px;
  font-weight: 400;
  color: #149295;

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const Title = styled.h2`
  margin-bottom: 5px;
  font-size: 30px;
  font-weight: 400;
`;

const Position = styled.p`
  font-size: 22px;
`;

const Number = styled.a`
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: black;
    transition: color 0.2s ease;
  }
`;

const Email = styled.a`
  text-decoration: none;
  font-size: 20px;
  &:hover {
    color: black;
    transition: color 0.2s ease;
  }
`;

const FormWrapper = styled.div`
  background: white;
  padding: 50px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 50%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    width: 80%;
    margin-top: 20px;
  }
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-top: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  background: teal;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: darkcyan;
  }
`;

const Contact = () => {
  const { mutate: commentMutation } = usePost("contactForm", ENDPOINTS.contact);
  const { data: settingsData, isLoading: settingsLoading } = useGet("settings", ENDPOINTS.settings);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Ad soyad boş buraxıla bilməz")
      .max(100, "100 simvoldan çox ola bilməz"),
    email: Yup.string()
      .email("Düzgün email daxil edin")
      .required("Email boş buraxıla bilməz"),
    phoneNumber: Yup.string()
      .required("Düzgün nömrə daxil edin"),
    heading: Yup.string()
      .required("Başlıq boş buraxıla bilməz")
      .max(100, "Başlıq 100 simvoldan artıq ola bilməz"),
    message: Yup.string().max(500, "İsmarıc 500 simvoldan artıq ola bilməz"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber:"",
      heading: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      const [firstName, ...rest] = values.name.trim().split(" ");
      const lastName = rest.join(" ");

      const finalValues = {
        firstName,
        lastName,
        email: values.email,
        phoneNumber:values.phoneNumber,
        heading: values.heading,
        message: values.message,
      };



      commentMutation(finalValues, {
        onSuccess: () => {
          actions.setSubmitting(false);
          actions.resetForm();
          toast.success("Şərhiniz yaradıldı", {
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
          toast.error("Xəta baş verdi", {
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

  // Extract contact information from settings data
  const getValue = (key) => {
    return settingsData?.$values?.find((item) => item.key === key)?.value || "";
  };

  const salesDirector = getValue('SalesDirector') || 'Teymur Şirəliyev';
  const salesDirectorNumber = getValue('SalesDirectorNumber') || '+994-70-327-90-94';
  const salesDirectorEmail = getValue('SalesDirectorEmail') || 'sh.teymur@prosolution.ltd';
  const salesManager = getValue('SalesManager') || 'Fizuli Tağıyev';
  const salesManagerNumber = getValue('SalesManagerNumber') || '+994-70-329-90-94';
  const salesManagerEmail = getValue('SalesManagerEmail') || 't.fizuli@prosolution.ltd';

  if (settingsLoading) {
    return (
      <Container>
        <ContactWrapper>
          <div style={{ textAlign: 'center', padding: '50px', color: '#149295' }}>
            Yüklənir...
          </div>
        </ContactWrapper>
      </Container>
    );
  }

  return (
    <Container>
      <ContactWrapper>
        <ContactInfoContainer>
          <ContactInfo>
            <Title>{salesDirector}</Title>
            <Position>Satış Direktoru</Position>
            <Number href={`tel:${salesDirectorNumber.replace(/[^0-9+]/g, '')}`}>{salesDirectorNumber}</Number>
            <Email href={`mailto:${salesDirectorEmail}`}>
              {salesDirectorEmail}
            </Email>
          </ContactInfo>
          <ContactInfo>
            <Title>{salesManager}</Title>
            <Position>Satış Meneceri</Position>
            <Number href={`tel:${salesManagerNumber.replace(/[^0-9+]/g, '')}`}>{salesManagerNumber}</Number>
            <Email href={`mailto:${salesManagerEmail}`}>
              {salesManagerEmail}
            </Email>
          </ContactInfo>
        </ContactInfoContainer>
        <FormWrapper>
          <form onSubmit={formik.handleSubmit}>
            <Label htmlFor="name">Ad Soyadınız</Label>
            <Input
              id="name"
              name="name"
              type="text"
              maxLength={100}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <div style={{ color: "red", fontSize: "14px" }}>
                {formik.errors.name}
              </div>
            )}

            <Label htmlFor="email">Sizin email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              maxLength={100}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div style={{ color: "red", fontSize: "14px" }}>
                {formik.errors.email}
              </div>
            )}
            <Label htmlFor="phoneNumber">Telefon nömrəsi</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder=""
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <div style={{ color: "red", fontSize: "14px" }}>
                {formik.errors.phoneNumber}
              </div>
            )}

            <Label htmlFor="heading">Başlıq</Label>
            <Input
              id="heading"
              name="heading"
              type="text"
              onChange={formik.handleChange}
              maxLength={100}
              value={formik.values.heading}
            />
            {formik.touched.heading && formik.errors.heading && (
              <div style={{ color: "red", fontSize: "14px" }}>
                {formik.errors.heading}
              </div>
            )}

            <Label htmlFor="message">İsmarıc (seçimlə)</Label>
            <TextArea
              id="message"
              name="message"
              maxLength={500}
              onChange={formik.handleChange}
              value={formik.values.message}
              rows="4"
            />
            {formik.touched.message && formik.errors.message && (
              <div style={{ color: "red", fontSize: "14px" }}>
                {formik.errors.message}
              </div>
            )}

            <Button type="submit">GÖNDƏR</Button>
          </form>
        </FormWrapper>
      </ContactWrapper>
    </Container>
  );
};

export default Contact;
