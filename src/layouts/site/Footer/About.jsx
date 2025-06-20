import LayoutLogo from "@styles/common/LayoutLogo";
import { ENDPOINTS } from "@utils/constants/Endpoints";
import { useGet } from "@utils/hooks/useCustomQuery";
import React from "react";
import { Link } from "react-router";
import styled from "styled-components";

const About = () => {
  const { data } = useGet("settings", ENDPOINTS.settings);
  const getValue = (key) => {
    return data?.$values?.find((item) => item.key === key)?.value || "";
  };
  const WorkTime =getValue("WorkTime")
  const address = getValue("Address");
  const phone = getValue("PhoneNumber");
  const email = getValue("SupportEmail");
  const whiteLogo = getValue("WhiteLogo");

  return (
    <FooterAbout>
    <FooterAboutLogo>
    <Link to={"/"}>
        {" "}
        <LayoutLogo
          imageHeight = "60px"
          logoScr={whiteLogo || "/images/psa-logo-white.png"}
        />
      </Link>
      <StyledAboutText>Satış şöbəsi :{WorkTime}</StyledAboutText>
    </FooterAboutLogo>
 
    <StyledAbout>
     

      <StyledAboutText>
        {phone}
        <StyledBr />
        <StyledBr />
        <Email href={`mailto:${email}`}>{email}</Email> 
        <StyledBr />
        <StyledBr />
      </StyledAboutText>

      <StyledAboutText>{address}</StyledAboutText>
      </StyledAbout>
    </FooterAbout>
  );
};
const FooterAbout = styled.div`
  display: flex;
  padding: 5px 0px;
  align-items: center;
  gap: 1.3rem;
  @media (max-width: 600px) {
    max-width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const FooterAboutLogo=styled.div`
width: 100%;
display: flex;
flex-direction: column;
gap: 20px;
`
const StyledAbout=styled.div`
  flex-direction: column;

`


const StyledAboutText = styled.p`
  color: #f1f1f1;

  /* width: 100%; */
`;

const StyledBr = styled.br``;

const Email = styled.a`
  &:hover {
    color: #ffffff;
  }
`;

export default About;
