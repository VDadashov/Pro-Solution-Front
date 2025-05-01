import React, { useState } from 'react';
import styled from 'styled-components';
import { IoStar } from "react-icons/io5";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
const ProductDetailTabs = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [rating, setRating] = useState(0);

  const ReviewSchema = Yup.object().shape({
    review: Yup.string()
      .max(500, 'Ən çox 500 hərf yaza bilərsiniz')
      .required('Rəy yazmaq məcburidir'),
    name: Yup.string().required('Ad tələb olunur'),
    email: Yup.string().email('Düzgün e-poçt deyil').required('E-poçt tələb olunur'),
    save: Yup.boolean()
  });
  return (
    <Container>
      <Tabs>
        <TabButton active={activeTab === 'info'} onClick={() => setActiveTab('info')}>
          ƏLAVƏ MƏLUMAT
        </TabButton>
        <TabButton active={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')}>
          RƏYLƏR (0)
        </TabButton>
      </Tabs>
      {activeTab === 'info' && (
        <InfoTable>
          <tbody>
            <tr><th>PROSESSOR - INTEL</th><td>Intel® Core™ i3-1215U</td></tr>
            <tr><th>RAM - SDDDR4</th><td>8 GB</td></tr>
            <tr><th>SSD M.2</th><td>512 GB</td></tr>
            <tr><th>EKRAN</th><td>15.6″ ▪ FHD (1920x1080p) ▪ IPS</td></tr>
            <tr><th>VİDEO KART - INTEL</th><td>Intel® UHD Graphics</td></tr>
            <tr><th>ƏMƏLİYYAT SİSTEMİ</th><td>FreeDOS</td></tr>
            <tr><th>ÇƏKİSİ</th><td>1.70 kg</td></tr>
            <tr><th>WEB-KAMERA</th><td>Var</td></tr>
            <tr><th>ZƏMANƏT</th><td>1 – il</td></tr>
          </tbody>
        </InfoTable>
      )}
      {activeTab === 'reviews' && (
        <>
          <Review>
            <h2>Rəylər</h2>
            <p>Hələ ki, rəy yoxdur.</p>
          </Review>
          <Formik
            initialValues={{
              review: '',
              name: '',
              email: '',
              save: false
            }}
            validationSchema={ReviewSchema}
            onSubmit={(values, actions) => {
              const formData = {
                ...values,
                rating: rating
              };
              console.log('Form dəyərləri:', formData);
              actions.resetForm();
              setRating(0);
            }}
          >
            {() => (
              <ReviewForm as={Form}>
                <h3>Be the first to review “Acer Aspire 3 A315-59 Slim (NX.K6SER.002-N)”</h3>

                <label>Sizin reytinqiniz *</label>
                <Stars>
                  {[1, 2, 3, 4, 5].map((starValue) => (
                    <Star
                      key={starValue}
                      onClick={() => setRating(starValue)}
                      active={rating >= starValue}
                    >
                      <IoStar />
                    </Star>
                  ))}
                </Stars>


                <label>Sizin rəyiniz *</label>
                <Field as="textarea" name="review" rows="5" />
                <ErrorMessage name="review" component="div" style={{ color: 'red', fontSize: '0.9rem' }} />

                <InputRow>
                  <div>
                    <label>Ad *</label>
                    <Field type="text" name="name" />
                    <ErrorMessage name="name" component="div" style={{ color: 'red', fontSize: '0.9rem' }} />
                  </div>
                  <div>
                    <label>E-poçt *</label>
                    <Field type="email" name="email" />
                    <ErrorMessage name="email" component="div" style={{ color: 'red', fontSize: '0.9rem' }} />
                  </div>
                </InputRow>

                <CheckboxRow>
                  <Field type="checkbox" name="save" id="save" />
                  <label htmlFor="save">
                    Save my name, email, and website in this browser for the next time I comment.
                  </label>
                </CheckboxRow>

                <SubmitButton type="submit">GÖNDƏR</SubmitButton>
              </ReviewForm>
            )}
          </Formik>
        </>
      )}


    </Container>
  );
};

export default ProductDetailTabs;


const Container = styled.div`
  max-width: 1255px;
  margin: 30px auto; 
  padding: 30px;
`;

const Tabs = styled.div`
  display: flex;
  border-top: 2px solid #e0e0e0;
  margin-bottom: 20px;
  @media (max-width:800px){
flex-direction: column;
align-items: flex-start;
  }
`;

const TabButton = styled.button`
  background: none;
  border: none;
  font-size: 13px;
  padding: 10px 20px;
  font-weight: bold;
  cursor: pointer;
  border-top: 2.5px solid ${({ active }) => (active ? '#00979e' : 'transparent')};
  color: ${({ active }) => (active ? '#121212D9' : '#666666D9')};
  @media (max-width: 550px) {
    width: 100%;
    text-align: left;
  }
`;

const InfoTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: sans-serif;

  th {
    border-bottom: 1px solid #e0e0e0; 
    text-align: left;
    font-weight: bold;
    padding: 20px 10px;
    letter-spacing: .05em;
    line-height: 1.05;
    text-transform: uppercase;
    color: #777777;
    width: 40%;
  }

  td {

    border-bottom: 1px solid #e0e0e0; 
    padding: 10px;
    color: #666666;
  }
`;

const Review = styled.div`
line-height: 2;
padding-bottom: 3rem;
h2{
    font-weight: 700;
    font-family: Manrope, sans-serif;
    color: #149295;
    font-size: 1.25em;
}
p{
    color: #777;
}
`

const ReviewForm = styled.form`

padding: 30px 30px 70px 30px;
border : 2px solid  #00979e;
  h3 {
    color: #007878;
    margin-bottom: 20px;
  }

  label {
    font-size: 14px;
    display: block;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 5px;
  }

  textarea {
    width: 100%;
    padding: 10px;
    resize: vertical;
    border: 1px solid #ccc;
    outline: none;
    box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
    &:hover{
        box-shadow: none;
    }
    &:focus {
        box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
  }
  }
`;

const Stars = styled.div`
  font-size: 20px;
  color: #ccc;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  @media (max-width:850px){
justify-content: center;
align-items: center;
  }
 
`;

const Star = styled.div`
  cursor: pointer;
  font-size: 24px;
  color: ${({ active }) => (active ? '#F0BF4C' : '#ddd')};
  transition: color 0.2s ease;

  &:hover {
    color: #F0BF4C;
  }
`;


const InputRow = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  @media (max-width:600px){
    flex-direction: column;
  }
  div{
    width: 100%;
  }

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    outline: none;
    box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
    &:hover{
        box-shadow: none;
    }
    &:focus {
        box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
  }
  }
`;

const CheckboxRow = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
  gap: 10px;

  label {
    margin: 0;
    font-weight: bold;
    font-size: 14px;

  }
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  background-color: #00979e;
  color: white;
  border: none;
  padding: 12px 25px;
  font-weight: bold;
  cursor: pointer;
`;


