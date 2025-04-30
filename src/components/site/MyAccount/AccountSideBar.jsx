import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { myAccount } from "./ControlPanel";

const AccountSideBar = () => {
  return (
    <SideBarWrapper>
      <ProfileContainer>
        <ProfilePicture src="/images/ProfilePhoto.jpg" />
        <UserName>
          123
          <UserID> #66</UserID>
        </UserName>
      </ProfileContainer>
      <AccountNavigation>
        <NavigationItem style={{ border: "none" }}>
          <AccountLink
            exact="true"
            to={"/myaccount/control_panel"}
            activeclassname="active"
          >
            İdarə panelİ
          </AccountLink>
          {/* <VerticalLine /> */}
        </NavigationItem>
        <NavigationItem>
          <AccountLink to={`${myAccount}/orders`}>Sifarişlər</AccountLink>
          {/* <VerticalLine /> */}
        </NavigationItem>
        <NavigationItem>
          <AccountLink to={`${myAccount}/downloads`}>Endirmələr</AccountLink>
          {/* <VerticalLine /> */}
        </NavigationItem>
        <NavigationItem>
          <AccountLink to={`${myAccount}/address`}>Ünvanlar</AccountLink>
          {/* <VerticalLine /> */}
        </NavigationItem>
        <NavigationItem>
          <AccountLink to={`${myAccount}/account_details`}>
            Hesab Detalları
          </AccountLink>
          {/* <VerticalLine /> */}
        </NavigationItem>
        <NavigationItem>
          <AccountLink to={"/wishlist"}>Wishlist</AccountLink>
          {/* <VerticalLine /> */}
        </NavigationItem>
        <NavigationItem>
          <AccountLink to={"/"}>Çıxış</AccountLink>
          {/* <VerticalLine /> */}
        </NavigationItem>
      </AccountNavigation>
    </SideBarWrapper>
  );
};
const SideBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  gap: 15px;
  border-right: 1px solid #ececec;
  @media (max-width: 850px) {
    width: 100%;
    border: none;
  }
`;

const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ProfilePicture = styled.img`
  max-width: 70px;
  max-height: 70px;
  width: 100%;
  border-radius: 100%;
`;

const UserName = styled.span`
  color: #777;
`;

const UserID = styled.em`
  opacity: 0.5;
`;

const AccountNavigation = styled.ul`
  display: flex;
  flex-direction: column;
`;

const NavigationItem = styled.li`
  border-top: 1px solid #ececec;
  display: flex;
  justify-content: space-between;
  width: 100%;
  &:hover {
    a {
      color: hsla(0, 0%, 7%, 0.85);
    }
    span {
      opacity: 1;
    }
  }
`;

const AccountLink = styled(NavLink)`
  display: block;
  padding: 15px 0px;
  width: 100%;
  text-transform: uppercase;
  font-size: 0.8em;
  font-weight: bolder;
  color: hsla(0, 0%, 40%, 0.85);
  letter-spacing: 0.3px;
  &.active {
    color: hsla(0, 0%, 7%, 0.85);
    border-right: 2px solid #149295;
  }
  &:hover {
    border-right: 2px solid #149295;
  }
  /* &:not(.active):hover {
    border-right: 2px solid #149295 !important;
  } */
`;

// const VerticalLine = styled.span`
//   opacity: 0;
//   width: 2px;
//   background-color: #149295;
//   transition: all 0.3s;
// `;

export default AccountSideBar;
