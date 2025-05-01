import { WishlistContext } from '@Context/wishlistContext';
import React, { useEffect, useState } from 'react'
import { useContext } from "react";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import styled from "styled-components";

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
        <CategoryCardLink to={`/category/${item.id}`}>
          <img
            src="https://i0.wp.com/prosolution.ltd/wp-content/uploads/2023/10/Untitled-1-32-jpg.webp?zoom=2&resize=247%2C296&ssl=1"
            alt="notebook"
          />
        </CategoryCardLink>
        <div className="heartIcon"
          onClick={() => {
            if (!liked) {
              setLiked(true);
              addToWishlist(item);
              toast.success("Product added to wishlist!");
            } else {
              toast.info("This product is already in your wishlist.");
            }
          }}

        >
          <CiHeart />
        </div>
      </CategoryCardHeadImage>

      <CategoryCardBody>
        <span>{item.category}</span>
        <Link to={`/category/${item.id}`}>
          <ProductName>{item.name}</ProductName>
        </Link>
        <PriceBox>
          <OldPrice>{item.price.original}</OldPrice>
          <NewPrice>{item.price.current}</NewPrice>
        </PriceBox>
        <ButtonLink to={`/category/${item.id}`}>Davamını oxu</ButtonLink>
      </CategoryCardBody>
    </CategoryCard>
  )
}

export default CategoryProductCard

const CategoryCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  transition: all 0.3s ease;
  cursor: pointer;
  width: 200px;

  &:hover img {
    transform: scale(1.1);
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
const CategoryCardLink = styled(Link)``;
const CategoryCardHeadImage = styled.div`
  position: relative;
  overflow: hidden;
  padding-top: 10px;
  img {
    width: 100%;
    height: 180px;
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
  }
  .heartIcon:hover {
    color: white;
    background-color:#b20000;
    border: #b20000;
  }
  ${CategoryCard}:hover & .heartIcon {
    opacity: 1;
  }
`;
const CategoryCardBody = styled.div`
  padding: 10px;
  @media (max-width: 930px) {
    line-height: 0.9;
    padding: 5px;
  }
  span {
    font-size: 13px;
    color: gray;
    opacity: 0.7;
    @media (max-width: 930px) {
      font-size: 10px;
      font-weight: 600;
    }
  }

  h5 {
    @media (max-width: 850px) {
      font-size: 12px;
      font-weight: 600;
    }
  }

`;
const ButtonLink = styled(Link)`
 margin-top: 10px;
    width: 65%;
    background-color: #149295;
    color: white;
    border: none;
    padding: 8px;
    display: flex;
    font-size: 14px;
    font-family: inherit;
    cursor: pointer;
    &:hover {
      background-color: rgb(16, 114, 116);
    }
    @media (max-width: 930px) {
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
  @media (max-width: 930px) {
    font-size: 11px;
  }
`;
const NewPrice = styled.p`
  color: black;
  font-size: 16px;
  font-weight: bold;
  @media (max-width: 930px) {
    font-size: 13px;
  }
`;