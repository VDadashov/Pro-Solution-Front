import React from "react";
import styled from "styled-components";
import { LayoutContainer } from "../../../styles/common/LayoutContainer";
import WishlistTables from "../../../components/site/Wishlist/WishlistTable";

const Wishlist = () => {
  return (
    <WishlistContainer>
      <LayoutContainer>
        <ContainerBox>
          <WishlistTop>Favorilər</WishlistTop>
          <WishlistTables />
        </ContainerBox>
      </LayoutContainer>
    </WishlistContainer>
  );
};

const WishlistContainer = styled.main`
  background-color: #fff;
`;

const ContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px 0px;
`;

const WishlistTop = styled.h2`
  color: #149295;
`;

export default Wishlist;
