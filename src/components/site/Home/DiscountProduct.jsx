import { ENDPOINTS } from "@utils/constants/Endpoints";
import { useGetOne } from "@utils/hooks/useCustomQuery";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import styled from "styled-components";

const DiscountProductSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const { data: date } = useGetOne(
    "settings",
    ENDPOINTS.setting,
    `f00af3bb-1912-4e99-9ded-dc776a10375b`
  );

  useEffect(() => {
    if (!date?.value) return;

    const [day, month, year] = date.value.split(".").map(Number);
    const targetDate = new Date(year, month - 1, day, 0, 0, 0);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const totalSeconds = Math.floor(difference / 1000);

      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

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
            {timeLeft.days} <StyledStrong>Gün</StyledStrong>
          </TimerBox>
          <TimerBox>
            {timeLeft.hours} <StyledStrong>Saat</StyledStrong>
          </TimerBox>
          <TimerBox>
            {timeLeft.minutes} <StyledStrong>Dəq</StyledStrong>
          </TimerBox>
          <TimerBox>
            {timeLeft.seconds} <StyledStrong>Saniyə</StyledStrong>
          </TimerBox>
        </TimerContainer>
        <Link to={"/discount"}>
          <TextBoxButton>İndi Bax</TextBoxButton>
        </Link>
      </TextBox>
    </SectionContainer>
  );
};

// Stil komponentləri

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
  text-align: center;
`;

const ContainerHeader = styled.h2`
  font-size: 2.9em;
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
  height: 20%;
  @media (max-width: 400px) {
    height: 15%;
  }
`;

const TimerBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 22%;
  background-color: rgba(255, 255, 255, 0.23);
  border-radius: 5px;
  font-size: 180%;
  @media (max-width: 650px) {
    font-size: 130%;
    width: 22%;
  }
  @media (max-width: 400px) {
    font-size: 90%;
    width: 22%;
  }
`;

const StyledStrong = styled.strong`
  opacity: 0.7;
  font-size: 35%;
  margin-top: 4px;
  @media (max-width: 350px) {
    font-size: 25%;
  }
`;

const TextBoxButton = styled.button`
  background-color: rgba(255, 255, 255, 0.23);
  padding: 10px 20px;
  outline: none;
  color: #fff;
  border: none;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #157778;
  }
`;

export default DiscountProductSection;
