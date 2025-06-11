import React, { useState, useRef, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import Slider from "react-slick";
import styled from "styled-components";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { WishlistContext } from "@Context/wishlistContext";
import { useCart } from "../../../providers/CartProvider";
import { toast } from "react-toastify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./productModal.scss";

const ProductModal = ({ show, onClose, item }) => {
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const modalRootRef = useRef(document.createElement("div"));
  const { wishlist, addToWishlist } = useContext(WishlistContext);
  const { addToCart } = useCart();

  // modal üçün container əlavə/sil
  useEffect(() => {
    const modalRoot = modalRootRef.current;
    document.body.appendChild(modalRoot);
    return () => {
      if (document.body.contains(modalRoot)) {
        document.body.removeChild(modalRoot);
      }
    };
  }, []);

  // like statusu
  useEffect(() => {
    const isLiked = wishlist.some((x) => x.id === item.id);
    setLiked(isLiked);
  }, [wishlist, item]);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (!show) return null;

  return ReactDOM.createPortal(
    <div className="productModal active">
      <div className="productModal-content">
        <span id="productModalClose" onClick={onClose}>
          &times;
        </span>

        <div className="productModal__main">
          {/* === Şəkillər === */}
          <div className="productModal__imageThumbnail">
            <Slider
              dots
              infinite
              speed={400}
              fade
              cssEase="linear"
            >
              {item?.images?.$values?.map((img) => (
                <div className="productModal__image" key={img.imagePath}>
                  <img src={img.imagePath} alt={img.altText} />
                </div>
              ))}
            </Slider>
          </div>

          {/* === Məlumat === */}
          <div className="productModal__text">
            <h2 className="productModal__title">{item.title}</h2>

            <div className="productModal__price">
              <span className="productModal--old-price">{item.price}$</span>
              <span className="productModal--new-price">{item.discountPrice}$</span>
            </div>

            <div className="productModal__info">{item.description}</div>

            <div className="productModal__stock">
              <i className="fa-regular fa-circle-check fa-beat-fade"></i>
              <span style={{ color: "#108043" }}>In stock</span>
            </div>

            <DetailList>
              {item?.featureOptionItems?.$values?.map((feature) => (
                <DetailItem key={feature.id || feature.name}>
                  <p>{feature.featureOption?.name}:</p>
                  <span>{feature.name}</span>
                  <span>{feature.parent?.name}</span>
                </DetailItem>
              ))}

              <WishContainer
                onClick={() => {
                  addToWishlist(item);
                  setLiked(!liked);
                  toast[liked ? "error" : "success"](
                    liked ? "Product removed from wishlist." : "Product added to wishlist!"
                  );
                }}
              >
                <WishIcon>{liked ? <FaHeart style={{ color: "black" }} /> : <FaRegHeart />}</WishIcon>
                <WishText>
                  {liked ? (
                    <>
                      <Gray>Product added</Gray>
                      <BrowseLink to="/wishlist">Browse wishlist</BrowseLink>
                    </>
                  ) : (
                    <Blue>Add to wishlist</Blue>
                  )}
                </WishText>
              </WishContainer>
            </DetailList>

            {/* === Cart Əlavə === */}
            <div className="productModal__add-to-card">
              <div className="productModal__count">
                <button className="productModal__qty-minus" onClick={decrement}>
                  <i className="fa-solid fa-minus"></i>
                </button>
                <input
                  id="productModal--count"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setQuantity(isNaN(value) || value < 1 ? 1 : value);
                  }}
                />
                <button className="productModal__qty-plus" onClick={increment}>
                  <i className="fa-regular fa-plus"></i>
                </button>
              </div>

              <button
                className="productModal__add-to-card__btn"
                onClick={() => {
                  addToCart(item, quantity);
                  toast.success("Məhsul səbətə əlavə olundu!");
                  
                }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    modalRootRef.current
  );
};

export default ProductModal;

// === Styled Components ===
const WishContainer = styled.li`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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

const Gray = styled.span`
  color: #777;
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

const BrowseLink = styled(Link)`
  color: #149295;
  text-decoration: underline;
  margin-left: 8px;
`;
