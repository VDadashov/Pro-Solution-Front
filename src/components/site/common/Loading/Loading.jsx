import LayoutLogo from "@styles/common/LayoutLogo";
import React from "react";
import styled, { keyframes } from "styled-components";

const Loading = () => {
  return (
    <LoadingWrapper>
      <LoadingContainer>
        <LayoutLogo logoScr={"/images/logo.png"} imageHeight={"55px"} />
        <Spinner />
      </LoadingContainer>
    </LoadingWrapper>
  );
};

const LoadingWrapper = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 150px;
`;

const Spinner = styled.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid #149295;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

export default Loading;
