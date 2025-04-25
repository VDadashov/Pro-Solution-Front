import LayoutLogo from "@styles/common/LayoutLogo";
import React from "react";
import styled from "styled-components";

const About = () => {
  return (
    <StyledAbout>
      <LayoutLogo logoScr={"/images/psa-logo-white.png"} />
      <StyledAboutText>Satış şöbəsi</StyledAboutText>
      <StyledAboutText>
        +994 70 329 90 94
        <StyledBr />
        <Email href="mailto:sales@prosolution.ltd">sales@prosolution.ltd</Email>
      </StyledAboutText>
      <StyledAboutText>
        Nərimanov rayonu,Əhməd Rəcəbli küçəsi,1963-cü məhəllə
      </StyledAboutText>
    </StyledAbout>
  );
};

const StyledAbout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0px;
  max-width: 25%;
  gap: 1.3rem;
  @media (max-width: 550px) {
    max-width: 100%;
  }
`;

const StyledAboutText = styled.p`
  color: #f1f1f1;
  width: 100%;
`;

const StyledBr = styled.br``;

const Email = styled.a`
  &:hover {
    color: #ffffff;
  }
`;

export default About;
