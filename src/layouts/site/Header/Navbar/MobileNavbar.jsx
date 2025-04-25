import React, { useEffect } from "react";
import styled from "styled-components";
import MobileSearch from "../MobileSearch";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const MobileNavbar = ({ $isOpenModal, closeModal }) => {
  useEffect(() => {
    if ($isOpenModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [$isOpenModal]);
  return (
    <>
      <TransparentBackground
        onClick={() => closeModal()}
        $isOpenModal={$isOpenModal}
      >
        <ModalButton onClick={() => closeModal()}>
          <IoClose />
        </ModalButton>
      </TransparentBackground>
      <MobileNavContainer $isOpenModal={$isOpenModal}>
        <MainMenu>
          <MobileSearch />
          <MenuComponent>
            <Link to={"/"}>
              <LinkText>Endirimlər</LinkText>
            </Link>
          </MenuComponent>
          <MenuComponent>
            <Link to={"/blog"}>
              <LinkText>Bloq</LinkText>
            </Link>
          </MenuComponent>
          <MenuComponent>
            <Link to={"/contact"}>
              <LinkText>Əlaqə</LinkText>
            </Link>
          </MenuComponent>
          <MenuComponent>
            <Link to={"/myaccount"}>
              <LinkText>Giriş</LinkText>
            </Link>
          </MenuComponent>
        </MainMenu>
      </MobileNavContainer>
    </>
  );
};

const MobileNavContainer = styled.nav`
  display: flex;
  position: fixed;
  background-color: hsla(0, 0%, 100%, 1);
  bottom: 0;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  top: 0;
  transform: ${({ $isOpenModal }) =>
    $isOpenModal ? "" : "translateX(-270px)"};
  transition: transform 0.5s;
  width: 260px;
  height: 100vh;
  z-index: 3;
`;

const MainMenu = styled.ul`
  padding: 30px 0px;
`;

const MenuComponent = styled.li`
  border-top: 1px solid #ececec;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  &:hover > a {
    color: hsla(0, 0%, 7%, 0.85);
  }
`;

const LinkText = styled.span`
  display: flex;
  color: hsla(0, 0%, 40%, 0.85);
  padding: 15px 20px;
  font-weight: bolder;
  width: 100%;
  height: 100%;
  a {
    display: flex;
    width: 100%;
    height: 100%;
  }
`;

const TransparentBackground = styled.div`
  visibility: ${({ $isOpenModal }) => ($isOpenModal ? "visible" : "hidden")};
  opacity: ${({ $isOpenModal }) => ($isOpenModal ? "0.6" : "0")};
  /* visibility: visible; */
  position: fixed;
  top: 0;
  left: 0;
  /* opacity: 0.6; */
  height: 100vh;
  width: 100%;
  background-color: #0b0b0b;
  z-index: 3;
  /* display: flex; */
  align-items: start;
  transition: 0.3s;
`;

const ModalButton = styled.button`
  color: rgb(178, 178, 178);
  position: absolute;
  right: 20px;
  top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 40px;
  cursor: pointer;
  z-index: 9;
  &:hover {
    color: #fff;
    cursor: pointer;
    opacity: 1;
    transition: 0.3s;
  }
`;

export default MobileNavbar;
