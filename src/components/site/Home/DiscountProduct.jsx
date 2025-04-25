import React from "react";
import styled from "styled-components";

const DiscountProductSection = () => {
  return (
    <SectionContainer>
      <TextBox>
        <ContainerHeader>
          <strong>
            Endirimlərdən <br /> Yararlanmağa Tələsin
          </strong>
        </ContainerHeader>
        <LeadUpperCase>
          <strong>50%-ə qədər </strong>
          endirimə düşən məhsullar
        </LeadUpperCase>
        <TimerContainer>
          <TimerBox>
            0 <StyledStrong>Hours</StyledStrong>
          </TimerBox>
          <TimerBox>
            0 <StyledStrong>Min</StyledStrong>
          </TimerBox>
          <TimerBox>
            0 <StyledStrong>Sec</StyledStrong>
          </TimerBox>
        </TimerContainer>
        <TextBoxButton>İndi Bax</TextBoxButton>
      </TextBox>
    </SectionContainer>
  );
};

const SectionContainer = styled.section`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #149295;
  color: #fff;
`;

const TextBox = styled.div`
  width: 50%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const ContainerHeader = styled.h2`
  font-size: 2.9em;
  text-align: center;
  @media (max-width: 650px) {
    font-size: 2em;
  }
  @media (max-width: 350px) {
    font-size: 1.5em;
  }
`;

const LeadUpperCase = styled.h4`
  font-size: 1.5em;
  text-transform: uppercase;
  text-align: center;
  @media (max-width: 650px) {
    font-size: 1em;
  }
  @media (max-width: 350px) {
    font-size: 0.8em;
  }
`;

const TimerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 25%;
  @media (max-width: 400px) {
    height: 10%;
  }
  /* background-color: red; */
`;

const TimerBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 32%;
  background-color: rgba(255, 255, 255, 0.23);
  border-radius: 5px;
  font-size: 300%;
  @media (max-width: 650px) {
    font-size: 200%;
  }
  @media (max-width: 400px) {
    font-size: 100%;
  }
`;
const StyledStrong = styled.strong`
  opacity: 0.7;
  font-size: 30%;
  @media (max-width: 350px) {
    font-size: 20%;
  }
`;

const TextBoxButton = styled.button`
  background-color: rgba(255, 255, 255, 0.23);
  padding: 10px 20px;
  outline: none;
  color: #fff;
  border: none;
  font-size: 16px;
  &:hover {
    background-color: #157778;
  }
`;

export default DiscountProductSection;
