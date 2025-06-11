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
    <StyledAbout>
      <Link to={"/"}>
        {" "}
        <LayoutLogo
          imageHeight = "50px"
          logoScr={whiteLogo || "/images/psa-logo-white.png"}
        />
      </Link>
      <StyledAboutText>Satış şöbəsi :{WorkTime}</StyledAboutText>
      <StyledAboutText>
        {phone}
        <StyledBr />
        <Email href={`mailto:${email}`}>{email}</Email>
      </StyledAboutText>
      <StyledAboutText>{address}</StyledAboutText>
    </StyledAbout>
  );
};

const StyledAbout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0px;
  max-width: 30%;
  height: 40%;
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
