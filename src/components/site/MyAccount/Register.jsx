// import { ENDPOINTS } from '@utils/constants/Endpoints';
// import { usePost } from '@utils/hooks/useCustomMutation';
// import { useFormik } from 'formik';
// import React from 'react'
// import styled from "styled-components";
// import { Bounce, toast } from "react-toastify";
// import * as Yup from "yup";

// // 
// const RegisterSection = () => {

// const {mutate: registerMutation} = usePost("register",ENDPOINTS.register);


// const formik = useFormik({
//     initialValues: {
//       email: "",
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().email("Invalid email format").required("Email is required"),
//     }),
//     onSubmit: (values, actions) => {
//       actions.setSubmitting(true);
    
//       registerMutation.mutate(values, {
//         onSuccess: () => {
//           actions.setSubmitting(false);
//           actions.resetForm()
//             toast.success("Qeydiyyat uğurla tamamlandı!", {
//                 position: "top-right",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "colored",
//                 transition: Bounce,
//             });
          
//         },
//         onError: (error) => {
//           actions.setSubmitting(false);

//           toast.error(error, {
//             position: "top-right",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             draggable: true,
//             progress: undefined,
//             theme: "colored",
//             transition: Bounce,
//           });
//         },
//       });
//     },
//   });





//   return (
//    <Register>
//         <StyledHeader>QEYDİYYAT</StyledHeader>
//         <StyledForm onSubmit={formik.handleSubmit}>
//           <ButtonAligner>
//             <StyledFormParagraph>
//            <StyledLabel htmlFor="email">E-poçt ünvanı *</StyledLabel>

//             <StyledInput
//   id="email"
//   name="email"
//   type="email"
//   value={formik.values.email}
//   onChange={formik.handleChange}
//   onBlur={formik.handleBlur}
// />
// {formik.touched.email && formik.errors.email && (
//   <div style={{ color: 'red', fontSize: '0.8em' }}>{formik.errors.email}</div>
// )}

//             </StyledFormParagraph>
//             <ThickerP>
//               A link to set a new password will be sent to your email address.
//             </ThickerP>
//             <ThinnerP>
//               Your personal data will be used to support your experience
//               throughout this website, to manage access to your account, and for
//               other purposes described in our
//               <ParagraphSpan> gizlilik siyasəti.</ParagraphSpan>
//             </ThinnerP>
//           </ButtonAligner>
//           <LoginBottom>
//            <StyledButton type="submit" disabled={formik.isSubmitting}>
//   {formik.isSubmitting ? "Göndərilir..." : "Qeydiyyat"}
// </StyledButton>

//           </LoginBottom> 
//         </StyledForm>
//       </Register>
//   )
// }

// const LoginBottom = styled.div`
//   display: flex;
//   flex-direction: column;
//   padding: 15px 0px;
//   gap: 15px;
// `;


// const ButtonAligner = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   gap: 30px;
// `;


// const StyledHeader = styled.h3`
//   color: #149295;
//   font-size: 1.25em;
//   letter-spacing: 2px;
// `;

// const StyledForm = styled.form`
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   /* gap: 30px; */
// `;

// const StyledFormParagraph = styled.p`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
// `;

// const StyledLabel = styled.label`
//   font-size: 0.9em;
//   font-weight: 700;
//   margin-bottom: 0.4em;
// `;


// const StyledButton = styled.button`
//   max-width: 100%;
//   padding: 10px;
//   background-color: #149295;
//   color: #fff;
//   border: none;
//   font-size: 16px;
//   font-weight: bolder;
//   letter-spacing: 0.03em;
//   &:hover {
//     background-color: #157778;
//   }
// `;



// const StyledInput = styled.input`
//   width: 100%;
//   appearance: none;
//   outline: none;
//   box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
//   border: 1px solid #ddd;
//   color: #333;
//   font-size: 0.97em;
//   height: 2.507em;
//   max-width: 100%;
//   padding: 0 0.75em;
// `;

// const Register = styled.div`
//   padding: 30px 20px;
//   display: flex;
//   flex-direction: column;
//   gap: 15px;
//   width: 50%;
//   @media (max-width: 850px) {
//     width: 100%;
//     height: 50%;
//   }
// `;

// const ThickerP = styled.p`
//   color: #777;
//   font-size: 90%;
// `;

// const ThinnerP = styled.p`
//   color: #777;
//   font-size: 85%;
// `;

// const ParagraphSpan = styled.span`
//   color: #149295;
//   cursor: pointer;
//   &:hover {
//     color: #000;
//   }
// `;


// export default RegisterSection 
