import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
        <NavigationItem style={{border:"none"}}>
          <AccountLink>İdarə panelİ</AccountLink>
          <VerticalLine />
        </NavigationItem>
        <NavigationItem>
          <AccountLink>Sifarişlər</AccountLink>
          <VerticalLine />
        </NavigationItem>
        <NavigationItem>
          <AccountLink>Endirmələr</AccountLink>
          <VerticalLine />
        </NavigationItem>
        <NavigationItem>
          <AccountLink>Ünvanlar</AccountLink>
          <VerticalLine />
        </NavigationItem>
        <NavigationItem>
          <AccountLink>Hesab Detalları</AccountLink>
          <VerticalLine />
        </NavigationItem>
        <NavigationItem>
          <AccountLink to={"/wishlist"}>Wishlist</AccountLink>
          <VerticalLine />
        </NavigationItem>
        <NavigationItem>
          <AccountLink>Çıxış</AccountLink>
          <VerticalLine />
        </NavigationItem>
      </AccountNavigation>
    </SideBarWrapper>
  );
};
const SideBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 25%;
  gap: 15px;
  border-right: 1px solid #ececec;
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

const AccountLink = styled(Link)`
  display: block;
  padding: 15px 0px;
  width: 100%;
  text-transform: uppercase;
  font-size: 0.8em;
  font-weight: bolder;
  color: hsla(0, 0%, 40%, 0.85);
  letter-spacing: 0.3px;
  transition: all 0.3s;
`;

const VerticalLine = styled.span`
  opacity: 0;
  width: 2px;
  background-color: #149295;
  transition: all 0.3s;
`;

export default AccountSideBar;
