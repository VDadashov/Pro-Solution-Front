import React from "react";
import styled from "styled-components";

const Map = () => {
  return (
    <StyledMapContainer>
      <StyledMapText>Xəritə</StyledMapText>
      <StyledIframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3038.0848950771806!2d49.862044076524086!3d40.406970056232545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDDCsDI0JzI1LjEiTiA0OcKwNTEnNTIuNiJF!5e0!3m2!1sen!2sus!4v1711611326919!5m2!1sen!2sus"
      allowFullScreen="allowfullscreen"
      width={600}
      height={210}
      />
    </StyledMapContainer>
  );
};

const StyledMapContainer = styled.div`
  max-width: 33.3333333333%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 550px){
    max-width: 100% ;
  }
`;

const StyledMapText = styled.h3`
  color: #fff;
  font-family: Manrope-ExtraLight;
`;

const StyledIframe = styled.iframe`
  background-color: green;
  max-width: 100%;
  border: 0;
`;

export default Map;
