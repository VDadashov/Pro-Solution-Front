import React from 'react'
import styled from 'styled-components'

const ActiveFilter = ({ priceRange, onClearMin, onClearMax }) => {
    return (
      <Wrapper>
        <FiltrList>
          {priceRange.min !== null && (
            <li onClick={onClearMin}><i>x</i> Minimum: {priceRange.min} ₼</li>
          )}
          {priceRange.max !== null && (
            <li onClick={onClearMax}><i>x</i> Maximum: {priceRange.max} ₼</li>
          )}
        </FiltrList>
      </Wrapper>
    );
  };
  
  

export default ActiveFilter

const Wrapper=styled.div`
padding-bottom: 15px;
`
const FiltrList=styled.ul`
display: flex;
flex-direction: column;
gap: 10px;
justify-content: center;
li{
    cursor: pointer;
   width: 170px;
    display: flex;
    background-color: #f1f1f1;
    border: 1px solid rgba(0, 0, 0, .1);
    border-radius: 99px;
    font-size: .85em;
    font-weight: 400;
    opacity: .9;
    padding: 2px 10px;
    color: #149295;
gap:10px;
border:1px solid gray;
i{
    color: rgba(118, 118, 118, 0.44);
}
}
`