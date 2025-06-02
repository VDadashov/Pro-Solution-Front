import { WishlistContext } from '@Context/wishlistContext';
import React, { useEffect, useState } from 'react'
import { useContext } from "react";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import styled, { keyframes } from "styled-components";
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

export const CategoryProductCardSkelaton = () => {
  return (

    <>
      <CategoryCard>
        <CategoryCardHeadImage>
          <LoadingSkeleton height={"100%"} />
        </CategoryCardHeadImage>
        <CategoryCardBody>
          <LoadingSkeleton height={"10"} width={"40%"} />
          <ProductName>
            <LoadingSkeleton height={"10"} width={"60%"} />
          </ProductName>
          <div style={{ display: "flex", gap: "10px" }}>

            <PriceBox>
              <LoadingSkeleton height={"10"} width="40px" />
            </PriceBox> 
            
            <PriceBox>
              <LoadingSkeleton height={"10"} width="40px" />
            </PriceBox>
          </div>
          <LoadingSkeleton height={"35px"} width={"100px"} />
        </CategoryCardBody>
      </CategoryCard>

    </>
  )
}

const CategoryProductCard = ({ item }) => {
  const { wishlist, addToWishlist } = useContext(WishlistContext);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const isLiked = wishlist.some(x => x.id === item.id);
    setLiked(isLiked);

  }, [wishlist, item]);



  return (
    <CategoryCard>
      <CategoryCardHeadImage>
        <CategoryCardLink to={`/category/${item.detailSlug}`}>
          <img
            src={
              item.images?.$values?.find((img) => img.isMain)?.imagePath || ""
            }
          />
        </CategoryCardLink>

        <div
          className={`heartIcon ${liked ? "liked" : ""}`}
          onClick={() => {
            addToWishlist(item);
            if (!liked) {
              toast.success("Product added to wishlist!");
            } else {
              toast.error("Product removed from wishlist.");
            }
            setLiked(!liked);
          }}
        >
          <CiHeart />
        </div>
      </CategoryCardHeadImage>

      <CategoryCardBody>
        <span>
          {item.categories?.$values
            ? item.categories.$values[0]?.title
            : item.categories?.[0]?.title}
        </span>

        <Link to={`/category/${item.detailSlug}`}>
          <ProductName>{item?.title} </ProductName>
        </Link>

      </CategoryCardBody>
      <CardButton>        <PriceBox>
          {item.discountPrice > 0 ? (
            <>
              <OldPrice>{item.price} ₼</OldPrice>
              <NewPrice>{item.discountPrice} ₼</NewPrice>
            </>
          ) : (
            <NewPrice>{item.price} ₼</NewPrice>
          )}
        </PriceBox>
        <ButtonLink to={`/category/${item.detailSlug}`}>
          Davamını oxu
        </ButtonLink>
      </CardButton>
    </CategoryCard>
  );
}

export default CategoryProductCard

const CategoryCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 10px;
  overflow: hidden;
  background-color: #fff;
  transition: all 0.3s ease;
  cursor: pointer;
  width: 180px;
  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
  &:hover img {
    transform: scale(1.1);
  }
  @media (max-width: 930px) {
    width: 150px;

  }
  @media (max-width: 1100px) {
    width: 170px;
  }
  @media (min-width: 900px) {
    // height: 280px;
  }
`;

const ProductName = styled.h5`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  font-size: 15px;
  color: #149295;
  margin: 10px 0 0 0;
  font-weight: 500;

  &:hover {
    color: black;
  }
`;

const CategoryCardLink = styled(Link)``;
const CategoryCardHeadImage = styled.div`
  position: relative;
  overflow: hidden;
  padding-top: 10px;
  height: 180px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
    @media (max-width: 1100px) {
      height: 130px;
    }
  }
  @media (max-width: 900px) {
    height: 140px;
  }

  .heartIcon {
    position: absolute;
    right: 10px;
    top: 0px;
    font-size: 24px;
    color: gray;
    background-color: transparent;
    border: 1px solid gray;
    border-radius: 50%;
    padding: 5px;
    opacity: 0;
    transition: opacity 0.3s ease;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 930px) {
      font-size: 18px;
    }
      @media(max-width:960px){
    opacity: 1;
  }
  }
  .heartIcon:hover {
    color: white;
    background-color:#b20000;
    border: #b20000;
  }
  ${CategoryCard}:hover & .heartIcon {
    opacity: 1;
  }
 .heartIcon.liked {
    color: white;
    background-color: #b20000;
    border-color: #b20000;
  }
`;
const CategoryCardBody = styled.div`
  flex-grow: 1;

  padding: 5px;
 
  span {
    font-size: 13px;
    color: gray;
    opacity: 0.7;
    @media (max-width: 997px) {
      font-size: 10px;
      font-weight: 600;
    }
  }

  h5 {
    @media (max-width: 997px) {
      font-size: 12px;
      font-weight: 600;
    }
  }
`;
const CardButton = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction:column;
  align-items: flex-start;
`;
const ButtonLink = styled(Link)`
 margin-top: 5px;
    width: 65%;
    background-color: #149295;
    color: white;
    border: none;
    padding: 5px;
    display: flex;
    font-size: 13px;
    font-family: inherit;
    cursor: pointer;
    &:hover {
      background-color: rgb(16, 114, 116);
    }
    @media (max-width:1095px) {
      padding: 5px;
      width: 70%;
      font-size: 12px;
    }
    @media (max-width: 1100px) {
      padding: 5px;
      width: 70%;
      font-size: 12px;
    }
`
const PriceBox = styled.div`
  display: flex;
  gap: 10px;
  align-items: baseline;
  margin: 8px 0;
`;
const OldPrice = styled.p`
  text-decoration: line-through;
  color: gray;
  font-size: 14px;
  @media (max-width: 1095px) {
    font-size: 11px;
  }
`;
const NewPrice = styled.p`
  color: black;
  font-size: 16px;
  font-weight: bold;
  @media (max-width: 1095px) {
    font-size: 13px;
  }
`;