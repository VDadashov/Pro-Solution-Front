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
import CartPanel from "./CartPanel";

const StyledHeader = styled.header`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  position: ${(props) => (props.$isscrolled ? "fixed" : "relative")};
  top: ${(props) => (props.$isscrolled ? "0" : "20px")};
  z-index: 2;
  width: 100%;
  opacity: ${(props) => (props.$isscrolled ? 1 : 1)};
  transform: ${(props) =>
    props.$isscrolled ? "translateY(0)" : "translateY(-20px)"};
  transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out;
  box-shadow: ${({ $isscrolled }) =>
    $isscrolled ? "rgba(0, 0, 0, 0.24) 0px 3px 8px" : "none"};
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
  const [isscrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
const [isCartOpen, setIsCartOpen] = useState(false);
const toggleCart = () => setIsCartOpen(prev => !prev);
  const openRegister = () => {
    setShowModal(true);
    document.body.style.overflowY = "hidden";
  };

  const closeRegister = () => {
    setShowModal(false);
    document.body.style.overflowY = "auto";
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  const handleScroll = () => {
    if (window.scrollY > 150) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
    <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} ></CartPanel>
      <LoginRegister $showModal={showModal} closeRegister={closeRegister} />
      <StyledHeader $isscrolled={isscrolled}>
        <MobileNavbar $isOpenModal={isOpenModal} closeModal={closeModal} />
        <LayoutContainer>
          <StyledTopHeader>
            <SideBarOpener
              onClick={() => openModal()}
              $isOpenModal={isOpenModal}
            >
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
        <Navbar toggleCart={toggleCart}/>
      </StyledHeader>
    </>
  );
};

export default Header;
