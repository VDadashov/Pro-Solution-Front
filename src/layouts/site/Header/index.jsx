import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Search from "./Search";
import LayoutLogo from "@styles/common/LayoutLogo";
import ActionButtons from "./ActionButtons";
import { FaBars } from "react-icons/fa6";
import MobileNavbar from "./Navbar/MobileNavbar";
import { Link } from "react-router-dom";
import LoginRegister from "./LoginRegister";
import { LayoutContainer } from "@styles/common/LayoutContainer";

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  background-color: #fff;
  transform: ${(props) =>
    props.$show ? "translateY(0)" : "translateY(-100%)"};
  transition: transform 0.4s ease-in-out;
  box-shadow: ${(props) =>
    props.$show ? "rgba(0, 0, 0, 0.24) 0px 3px 8px" : "none"};
`;


const StyledTopHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0px;
  @media (max-width: 850px) {
    justify-content: center;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const SideBarOpener = styled.a`
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translate(-50%, -50%);
  @media (min-width: 850px) {
    display: none;
  }
`;

const BarIcon = styled(FaBars)`
  font-size: 24px;
`;

const Header = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const openRegister = () => {
    setShowModal(true);
    document.body.style.overflowY = "hidden";
  };

  const closeRegister = () => {
    setShowModal(false);
    document.body.style.overflowY = "auto";
  };

  const closeModal = () => setIsOpenModal(false);
  const openModal = () => setIsOpenModal(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 200 || currentScrollY < 200) {
        setShowHeader(true); // Aşağı scroll: göstər
      } else {
        setShowHeader(false); // Yuxarı scroll: gizlə
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <LoginRegister $showModal={showModal} closeRegister={closeRegister} />
      <StyledHeader $show={showHeader}>
        <MobileNavbar $isOpenModal={isOpenModal} closeModal={closeModal} />
        <LayoutContainer>
          <StyledTopHeader>
            <SideBarOpener onClick={openModal}>
              <BarIcon />
            </SideBarOpener>
            <HeaderLeft>
              <Link to={"/"}>
                <LayoutLogo logoScr={"/images/logo.png"} imageHeight="50px" />
              </Link>
              <Search />
            </HeaderLeft>
            <ActionButtons openRegister={openRegister} />
          </StyledTopHeader>
        </LayoutContainer>
        <Navbar />
      </StyledHeader>
      <div style={{ height: "140px" }} />
    </>
  );
};

export default Header;
