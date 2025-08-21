import React, { useContext } from "react";
import styled from "styled-components";

import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { NavLink } from "react-router-dom";

import { WishlistContext } from "@Context/wishlistContext";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../../../providers/CartProvider";
import CartPanel from "../CartPanel";
import CategoryComponent from "./CategoryList";
const Navbar = ({ toggleCart }) => {
  const { wishlist } = useContext(WishlistContext);

  const { cartItems } = useCart();

  return (
    <>
      <NavigationBar>
        <StyledNavbarContainer>
          <NavContainer>
            <NavLeft>
              <HeaderNav>
                <CategoryComponent />
                <StyledNavigationLi>
                  <NavbarLink to={"/discount"} activeclassname="active">
                    <SeperaterLine>
                      <SeperatorLineBorder>Endirimlər</SeperatorLineBorder>
                    </SeperaterLine>
                  </NavbarLink>
                </StyledNavigationLi>
                <StyledNavigationLi>
                  <NavbarLink to={"/blog"} activeclassname="active">
                    <SeperaterLine>
                      <SeperatorLineBorder>Bloq</SeperatorLineBorder>
                    </SeperaterLine>
                  </NavbarLink>
                </StyledNavigationLi>
                <StyledNavigationLi>
                  <NavbarLink to={"/contact"} activeclassname="active">
                    <SeperaterLine>
                      <SeperatorLineBorder>Əlaqə</SeperatorLineBorder>
                    </SeperaterLine>
                  </NavbarLink>
                </StyledNavigationLi>
              </HeaderNav>
            </NavLeft>
            <Buttons>
              <NavbarLink to={"/wishlist"} activeclassname="active">
                <WishlistButton>
                  <WishlistText>
                    Seçilmişlər
                    {wishlist.length > 0 ? (
                      <WishlistLength>{wishlist.length}</WishlistLength>
                    ) : (
                      <></>
                    )}
                  </WishlistText>
                  <HeartIcon />
                </WishlistButton>
              </NavbarLink>
              <CartButton onClick={toggleCart}>
                <CartText>
                  Səbət
                  {cartItems.length > 0 && (
                    <CartLength>{cartItems.length}</CartLength>
                  )}
                </CartText>
                <FaShoppingCart style={{ fontSize: "16px" }} />
              </CartButton>
            </Buttons>
          </NavContainer>
        </StyledNavbarContainer>
      </NavigationBar>
    </>
  );
};

const CartButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #149295;
  color: #fff;
  border: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
  margin-left: 10px;
  transition: background-color 0.3s ease;
  align-items: center;
  &:hover {
    background-color: #157778;
  }
`;
const CartText = styled.span`
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  list-style: none;
  text-decoration: none;
  font-family: "Nunito-Regular400";
  font-size: 13px;
  font-weight: bold;
  margin-right: 5px;
`;
const CartLength = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: red;
  color: #fff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;
const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const NavbarLink = styled(NavLink)`
  &.active {
    color: #fff;
  }
`;

const StyledNavbarContainer = styled.div`
  max-width: 1224px;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  padding: 0 20px;
`;

const NavigationBar = styled.nav`
  position: relative;
  // overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #149295;
  height: 50px;
  @media (max-width: 850px) {
    display: none;
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const NavLeft = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const HeaderNav = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const StyledNavigationLi = styled.li`
  height: 100%;
  color: hsla(0, 0%, 100%, 0.8);
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
  a {
    width: 100%;
    height: 100%;
  }
`;

const SeperaterLine = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const SeperatorLineBorder = styled.div`
  padding: 0px 10px;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  border-color: hsla(0, 0%, 100%, 0.2);
`;

const WishlistButton = styled.button`
  position: relative;
  background-color: #149295;
  display: flex;
  align-items: center;
  color: #fff;
  border: none;
  outline: none;
  border-radius: 99px;
  padding: 5px 10px;
  gap: 5px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  cursor: pointer;
  font-size: 13px;
  &:hover {
    background-color: #157778;
  }
`;

const WishlistLength = styled.span`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: -6px;
  top: -6px;
  background-color: #d26e4b;
  border-radius: 99px;
  box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.3);
  color: #fff;
  width: 17px;
  height: 17px;
  font-size: 14px;
`;

const WishlistText = styled.span`
  font-weight: bolder;
`;

const HeartIcon = styled(FaRegHeart)`
  height: 100%;
  font-size: 18px;
`;

export default Navbar;
