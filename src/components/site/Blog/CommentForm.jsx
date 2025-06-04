import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import styled from "styled-components";
import { usePost } from "@utils/hooks/useCustomMutation";
import { ENDPOINTS } from "@utils/constants/Endpoints";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function CommentForm({blogId}) {
  const { mutate: commentMutation } = usePost(
    "blogsReviews",
    ENDPOINTS.blogsReviews
  );

  const maxChars = 500;
  const validationSchema = Yup.object({
    name: Yup.string().required("Ad boş buraxıla bilməz"),
    email: Yup.string()
      .email("Düzgün email daxil edin")
      .required("Email boş buraxıla bilməz"),
    text: Yup.string()
      .required("Şərh boş buraxıla bilməz")
      .max(maxChars, `${maxChars} simvoldan artıq olmamalıdır`),
  });

  const formik = useFormik({
    initialValues: {
      text: "",
      name: "",
      email: "",
      blogId: blogId,
 
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      commentMutation(values, {
        onSuccess: (res) => {
          actions.setSubmitting(false);
          actions.resetForm();
          toast.success("Serhiniz yaradildi", {
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
          actions.resetForm();
          toast.success(error, {
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
    <FormContainer onSubmit={formik.handleSubmit}>
      <h3>Bir cavab yazın </h3>
      <p className="description">
        Sizin e-poçt ünvanınız dərc edilməyəcəkdir. Gərəkli sahələr * ilə
        işarələnmişdir
      </p>

      <label htmlFor="text">Şərh *</label>
      <TextareaWrapper>
        <CharCounter>
          {formik.values.text.length}/{maxChars}
        </CharCounter>
        <textarea
          id="text"
          name="text"
          value={formik.values.text}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows="5"
          maxLength={maxChars}
        />
        {formik.touched.text && formik.errors.text && (
          <div style={{ color: "red", fontSize: "13px" }}>
            {formik.errors.text}
          </div>
        )}
      </TextareaWrapper>

      <FormInputs>
        <div>
          <label htmlFor="name">Ad *</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            maxLength={100}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <div style={{ color: "red", fontSize: "13px" }}>
              {formik.errors.name}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="email">E-poçt *</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            maxLength={100}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div style={{ color: "red", fontSize: "13px" }}>
              {formik.errors.email}
            </div>
          )}
        </div>
      </FormInputs>

      {/* <CheckboxGroup>
        <label>
          <input
            type="checkbox"
            name="saveInfo"
            checked={formik.values.saveInfo}
            onChange={formik.handleChange}
          />{" "}
          Save my name, email, and website in this browser for the next time I
          comment.
        </label>
        <label>
          <input
            type="checkbox"
            name="followUp"
            checked={formik.values.followUp}
            onChange={formik.handleChange}
          />{" "}
          Notify me of follow-up comments by email.
        </label>
        <label>
          <input
            type="checkbox"
            name="newPosts"
            checked={formik.values.newPosts}
            onChange={formik.handleChange}
          />{" "}
          Notify me of new posts by email.
        </label>
      </CheckboxGroup> */}

      <SubmitButton
        type="submit"
        disabled={formik.values.text.length === 0 || formik.isSubmitting}
      >
        ŞƏRH GÖNDƏR
      </SubmitButton>
    </FormContainer>
  );
}

export default CommentForm;

const FormContainer = styled.form`
  background-color: #f3f3f3;
  padding: 20px;
  width: 100%;
  font-family: Arial, sans-serif;

  h3 {
    color: #00796b;
    font-weight: 600;
    margin-bottom: 10px;
  }

  .description {
    color: #666;
    font-size: 14px;
    margin-bottom: 20px;
  }

  label {
    display: block;
    margin: 15px 0 5px;
    font-weight: 600;
  }
`;

const TextareaWrapper = styled.div`
  position: relative;

  textarea {
    width: 100%;
    resize: vertical;
    padding: 10px;
    font-size: 14px;
    box-sizing: border-box;
    outline: none;
    box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
    border: 1px solid lightgrey;
  }
`;

const CharCounter = styled.div`
  position: absolute;
  top: -20px;
  right: 0;
  font-size: 13px;
  color: #999;
`;

const FormInputs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  div {
    flex: 1;
    min-width: 200px;
  }

  input {
    width: 100%;
    padding: 8px;
    font-size: 14px;
    margin-top: 5px;
    outline: none;
    box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
    border: 1px solid lightgrey;
  }
`;

// const CheckboxGroup = styled.div`
//   margin-top: 20px;
//   label {
//     display: block;
//     font-size: 14px;
//     margin-bottom: 8px;
//   }

//   input {
//     margin-right: 8px;
//   }
// `;


const SubmitButton = styled.button`
  background-color: #009688;
  color: white;
  padding: 10px 20px;
  margin-top: 40px;
  border: none;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-transform: uppercase;

  &:hover {
    background-color: #00796b;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
