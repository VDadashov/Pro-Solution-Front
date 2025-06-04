import React, { useState } from "react";
import "./productModal.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";
import { FaRegHeart } from "react-icons/fa6";


const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 400,
  fade: true,
  cssEase: "linear",
};

const WishContainer = styled.li`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding-bottom: 0px;
  gap: 10px;
`;

const WishText = styled.span`
  font-size: 16px;
  color: #149295;
  &:hover {
    color: black;
  }
`;

const Blue = styled.span`
  color: #149295;
`;

const DetailItem = styled.li`
  padding-bottom: 10px;
  display: flex;
  color: #666666;
  gap: 20px;
  font-size: 0.9em;
  line-height: 1.3;
  border-bottom: 1px solid #ececec;
  text-align: left;
  p {
    font-weight: bolder;
    font-size: 16px;
    color: #777777;
  }
`;

const WishIcon = styled.i`
  font-size: 20px;
  color: black;
`;

const DetailList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProductModal = ({ show, onClose, item }) => {
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (!show) return null;

  return (
    <div className={"productModal " + (show ? "active" : "")}>
      <div className="productModal-content">
        <span id="productModalClose" onClick={onClose}>
          &times;
        </span>
        <div className="productModal__main">
          <div className="productModal__imageThumbnail">
            <Slider {...sliderSettings}>
              {item.images.$values.map((img) => (
                <div className="productModal__image" key={img}>
                  <img src={img.imagePath} alt={img.altText} />
                </div>
              ))}
            </Slider>
          </div>

          <div className="productModal__text">
            {/* <div className="productModal__raiting">
              {[1, 2].map((i) => (
                <span key={i} className="productModal--raiting-star">
                  <i
                    className="fa-solid fa-star"
                    style={{ color: "rgb(255, 164, 34)" }}
                  ></i>
                </span>
              ))}
              {[3, 4, 5].map((i) => (
                <span key={i} className="productModal--raiting-star">
                  <i className="fa-regular fa-star"></i>
                </span>
              ))}
              <span className="productModal--raiting-count">(1)</span>
            </div> */}
            <div className="productModal__title">
              <h2>{item.title}</h2>
            </div>
            <div className="productModal__price">
              <span className="productModal--old-price">{item.price}$</span>
              <span className="productModal--new-price">
                {item.discountPrice}$
              </span>
            </div>
            <div className="productModal__info">{item.description}</div>
            <div className="productModal__stock">
              <i className="fa-regular fa-circle-check fa-beat-fade"></i>
              <span style={{ color: "#108043" }}>In stock</span>
            </div>
            <DetailList>
              {item?.featureOptionItems?.$values?.map((item) => (
                <DetailItem key={item.id || item.name}>
                  <p>{item.featureOption?.name} :</p>
                  <span>{item?.name}</span>
                  <span>{item?.parent?.name}</span>
                </DetailItem>
              ))}
              <WishContainer
                onClick={() => {
                  setLiked(true);
                  addToWishlist(product);
                }}
              >
                <WishIcon>
                  {liked ? (
                    <FaHeart style={{ color: "black" }} />
                  ) : (
                    <FaRegHeart />
                  )}
                </WishIcon>

                <WishText>
                  {liked ? (
                    <>
                      <Gray>Product added</Gray>
                      <BrowseLink
                        to="/wishlist"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Browse wishlist
                      </BrowseLink>
                    </>
                  ) : (
                    <Blue>Add to wishlist</Blue>
                  )}
                </WishText>
              </WishContainer>
            </DetailList>
            <div className="productModal__add-to-card">
              <div className="productModal__count">
                <button className="productModal__qty-minus" onClick={decrement}>
                  <i className="fa-solid fa-minus"></i>
                </button>
                <input
                  id="productModal--count"
                  type="text"
                  pattern="\\d{10}"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <button className="productModal__qty-plus" onClick={increment}>
                  <i className="fa-regular fa-plus"></i>
                </button>
              </div>
              <button className="productModal__add-to-card__btn">
                Add To Card
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
