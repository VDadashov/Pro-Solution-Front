import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaRegHeart } from "react-icons/fa";
import { WishlistContext } from "@Context/wishlistContext";
import { keyframes } from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const LoadingSkeleton = styled(Skeleton)`
  width: 100%;
  animation: ${pulse} 1.5s infinite ease-in-out;
`;
export const ProductsCardSkeleton=()=>{
  return (
<>
 <ProductCard>
      <HeightSeperator>
        <ImageContainer>
          <LoadingSkeleton height="100%" width="100%" />
        </ImageContainer>
        <CategoryLi>
          <LoadingSkeleton height="14px" width="60%" />
        </CategoryLi>
        <ProductNameLi>
          <LoadingSkeleton height="16px" width="90%" />
        </ProductNameLi>
        <PriceLi>
          <PriceDel>
            <LoadingSkeleton height="14px" width="50px" />
          </PriceDel>
          <DiscountPrice>
            <LoadingSkeleton height="16px" width="50px" />
          </DiscountPrice>
        </PriceLi>
      </HeightSeperator>
      <LoadingSkeleton height="30px" width="100px" />
    </ProductCard>
</>

  )
}

const ProductsCard = ({ item, categoryName }) => {
  const { addToWishlist } = useContext(WishlistContext);

  return (
    <ProductCard>
      <HeightSeperator>
        <ImageContainer>
          <AddWishlist onClick={() => addToWishlist(item)}>
            <FaRegHeart />
          </AddWishlist>
          <Link to={`/category/${item.id}`}>
            <StyledImage src="/images/laptop.webp" />
          </Link>
        </ImageContainer>
        <CategoryLi>
          <p>{categoryName(item?.categoryId)}</p>
        </CategoryLi>
        <ProductNameLi>
          <Link to={`/category/${item.id}`}>{item.name}</Link>
        </ProductNameLi>
        <PriceLi>
          <PriceDel>{item.price.original}</PriceDel>
          <DiscountPrice>{item.price.current}</DiscountPrice>
        </PriceLi>
      </HeightSeperator>
      <Link to={`/category/${item.id}`}>
        <ProductButton>Davamını oxu</ProductButton>
      </Link>
    </ProductCard>
  );
};

const ProductCard = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  gap: 10px;

`;

const HeightSeperator = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ProductButton = styled.button`
  border: none;
  box-shadow: inset -0.01em -0.1em 0 0 rgba(0, 0, 0, 0.15);
  background-color: #149295;
  color: #fff;
  /* max-width: 50%; */
  padding: 7.5px 10px;
  &:hover {
    background-color: #157778;
  }
`;

const ImageContainer = styled.li`
  overflow: hidden;
  position: relative;
`;

const AddWishlist = styled.button`
  z-index: 1;
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: silver;
  background-color: transparent;
  border: 1px solid silver;
  border-radius: 100%;
  padding: 5px;
  &:hover {
    background-color: #b20000;
    border-color: #b20000;
    color: #fff;
  }
`;

const StyledImage = styled.img`
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    transform: scale(110%);
  }

  @media (max-width: 550px) {
    max-width: 200px;
  }
`;

const CategoryLi = styled.li`
  color: #777;
  font-size: 13px;
`;

const ProductNameLi = styled.li`
  color: #149295;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PriceLi = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PriceDel = styled.del`
  text-decoration: line-through;
  color: #777;
`;

const DiscountPrice = styled.p`
  color: #111111;
`;

export default ProductsCard;
