import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaRegHeart } from "react-icons/fa";
import { WishlistContext } from "@Context/wishlistContext";
import { keyframes } from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast, ToastContainer } from 'react-toastify';
import { CiHeart } from "react-icons/ci";
import { useCart } from "../../../providers/CartProvider"; 

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
        <ProductCardHeadImage>
          <LoadingSkeleton height={"100%"} />
        </ProductCardHeadImage>
        <ProductCardBody>
          <LoadingSkeleton height={"10"} width={"40%"} />
          <ProductName>
            <LoadingSkeleton height={"10"} width={"60%"} />
          </ProductName>
          <div style={{ display: "flex", gap: "10px" }}>
            <PriceBox>
              <LoadingSkeleton height={"10"} width="40px" />
            </PriceBox> <PriceBox>
              <LoadingSkeleton height={"10"} width="40px" />
            </PriceBox>
          </div>
          <LoadingSkeleton height={"35px"} width={"100px"} />
        </ProductCardBody>
      </ProductCard>

    </>

  )
}

const ProductsCard = ({ item }) => {
  const { wishlist, addToWishlist } = useContext(WishlistContext);
  const [liked, setLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);
    const { addToCart } = useCart();

  useEffect(() => {
    const isLiked = wishlist.some(x => x.id === item.id);
    setLiked(isLiked);
  }, [wishlist, item]);

  return (
    <ProductCard>
      <ProductCardHeadImage>
        <ProductCardLink to={`/category/${item.detailSlug}`}>
          <img
            src={
              item.images?.$values?.find((img) => img.isMain)?.imagePath || ""
            }
          />
        </ProductCardLink>
        <div
          className="heartIcon"
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
        <CategoryDetail
          className="categoryDetail"
          onClick={() => setShowModal(true)}
        >
          <i class="fa-light fa-eye"></i>
        </CategoryDetail>
      </ProductCardHeadImage>

      <ProductCardBody>
        <span>
          {item.categories?.$values
            ? item.categories.$values[0]?.title
            : item.categories?.[0]?.title}
        </span>
        <Link to={`/category/${item.detailSlug}`}>
          <ProductName>{item?.title}</ProductName>
        </Link>
        <CardButton>
          <PriceBox>
            {item.discountPrice > 0 ? (
              <>
                <OldPrice>{item.price} ₼</OldPrice>
                <NewPrice>{item.discountPrice} ₼</NewPrice>
              </>
            ) : (
              <NewPrice>{item.price} ₼</NewPrice>
            )}
          </PriceBox>
          <CategorySubSection>
            <ButtonLink to={`/category/${item.detailSlug}`}>
              Davamını oxu
            </ButtonLink>
           <BuyButton
                      onClick={() => {
                        addToCart(item);
                        toast.success("Məhsul səbətə əlavə olundu!");
                      }}
                    >
                      <i className="fa-light fa-bag-shopping"></i>
                    </BuyButton>
          </CategorySubSection>
        </CardButton>
      </ProductCardBody>
    </ProductCard>
  );
};

const ProductCard = styled.div`
  border-radius: 8px;
  padding: 10px;
  overflow: hidden;
  background-color: #fff;
  transition: all 0.3s ease;
  cursor: pointer;
  width: 210px;
  margin: 10px 0;
  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
  &:hover img {
    transform: scale(1.1);
  }

  &:hover .categoryDetail {
    opacity: 1;
  }
  @media (max-width: 930px) {
    width: 150px;
  }
  @media (max-width: 1100px) {
    width: 170px;
  }
`;

const ProductName = styled.h5`
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 15px;
  color: #149295;
  margin: 10px 0;
  font-weight: 500;
  overflow: hidden;
  &:hover {
    color: black;
  }
`;
const ProductCardLink = styled(Link)``;
const ProductCardHeadImage = styled.div`
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
    right: 0px;
    top: 0px;
    font-size: 16px;
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
    @media (max-width: 960px) {
      opacity: 1;
    }
  }
  .heartIcon:hover {
    color: white;
    background-color: #b20000;
    border: #b20000;
  }
  ${ProductCard}:hover & .heartIcon {
    opacity: 1;
  }
`;
const ProductCardBody = styled.div`
  padding: 5px;
  @media (max-width: 930px) {
    line-height: 0.9;
    padding: 5px;
  }
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

const CategorySubSection = styled.div`
  display: flex;
  align-items: baseline;
  width: 100%;
  justify-content: space-between;
`;
const ButtonLink = styled(Link)`
  margin-top: 5px;
  width: max-content;
  background-color: #149295;
  color: white;
  border: none;
  padding: 6px;
  border-radius: 5px;
  display: flex;
  font-size: 13px;
  font-family: inherit;
  cursor: pointer;
  justify-content: center;
  &:hover {
    background-color: rgb(16, 114, 116);
  }
  @media (max-width: 1095px) {
    padding: 5px;
    width: 70%;
    font-size: 12px;
  }
  @media (max-width: 1100px) {
    padding: 5px;
    width: 70%;
    font-size: 12px;
  }
`;

const CategoryDetail = styled.div`
  position: absolute;
  top: 35px;
  font-size: 14px;
  right: 0.5px;
  color: gray;
  padding: 5px;
  border: 1px solid gray;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
  background-color: transparent;

  &:hover {
    background-color: #149295;
    color: white;
    border: none;
  }
`;

const BuyButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 25%;
  background-color: white;
  color: rgb(0, 168, 232);
  border: 1px solid rgb(0, 168, 232);
  transition: all 0.4s ease;

  &:hover {
    background-color: rgb(0, 168, 232);
    color: white;
    transition: all 0.4s ease;
  }
`;

export default ProductsCard;


