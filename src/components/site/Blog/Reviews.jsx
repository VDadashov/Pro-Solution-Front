import React from 'react'
import styled from 'styled-components';

const Reviews = ({ item }) => {
  return (
    <div>
   
        <Author>
          <h3>{item.name}</h3>
          <p>{item.text}</p>
        </Author>
     
    </div>
  );
};
const Author = styled.div`
  padding: 40px 30px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  color: #149295;

  img {
    border-radius: 50%;
    width: 100px;
  }

  h3 {
    padding: 20px;
  }
`;
export default Reviews