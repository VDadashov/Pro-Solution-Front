import React from "react";
import styled from "styled-components";

const StyledLogo = styled.div`
  display: flex;
  max-height: 90px;
`;

const StyledLogoImage = styled.img`
  height: ${({ $height }) => $height || "70px"};
`;

const LayoutLogo = ({ logoScr, imageHeight }) => {
  return (
    <StyledLogo>
      <StyledLogoImage src={logoScr} $height={imageHeight} />
    </StyledLogo>
  );
};

export default LayoutLogo;
