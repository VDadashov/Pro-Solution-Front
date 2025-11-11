import React, { useState, useRef, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import Slider from "react-slick";
import styled from "styled-components";
import { FaRegHeart, FaHeart, FaCheckCircle } from "react-icons/fa";
import { MdOutlineInventory2 } from "react-icons/md";
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

  useEffect(() => {
    const modalRoot = modalRootRef.current;
    document.body.appendChild(modalRoot);
    return () => {
      if (document.body.contains(modalRoot)) {
        document.body.removeChild(modalRoot);
      }
    };
  }, []);

  useEffect(() => {
    const isLiked = wishlist.some((x) => x.id === item.id);
    setLiked(isLiked);
  }, [wishlist, item]);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (!show) return null;

  console.log(item);
  

  return ReactDOM.createPortal(
    <div className="productModal active">
      <div className="productModal-content">
        <span id="productModalClose" onClick={onClose}>
          &times;
        </span>

        <div className="productModal__main">
          {/* === Şəkillər === */}
          <div className="productModal__imageThumbnail">
            <Slider dots infinite speed={400} fade cssEase="linear">
              {item?.images?.$values?.map((img) => (
                <div className="productModal__image" key={img.imagePath}>
                  <img src={img.imagePath} alt={img.altText} />
                </div>
              ))}
            </Slider>
          </div>

          {/* === Məlumat === */}
          <div className="productModal__text">
            <ProductHeader>
              <h2>{item.title}</h2>
              {item?.brandName && (
                <BrandBadge>
                  <span>{item.brandName}</span>
                </BrandBadge>
              )}
            </ProductHeader>

            {item?.description && (
              <DetailDesc>{item.description}</DetailDesc>
            )}

            <StockStatus inStock={item?.inStock}>
              <StockIcon inStock={item?.inStock}>
                {item?.inStock ? <FaCheckCircle /> : <MdOutlineInventory2 />}
              </StockIcon>
              <StockText inStock={item?.inStock}>
                {item?.inStock ? "Stokda mövcuddur" : "Stokda yoxdur"}
              </StockText>
            </StockStatus>

            <hr style={{ margin: "15px 0", border: "none", borderTop: "1px solid #ecf0f1" }} />

            <PriceSection>
              {item?.discountPrice > 0 ? (
                <>
                  <OriginalPrice>{item.price} ₼</OriginalPrice>
                  <CurrentPrice>{item.discountPrice} ₼</CurrentPrice>
                  <DiscountBadge>
                    -{Math.round(((item.price - item.discountPrice) / item.price) * 100)}%
                  </DiscountBadge>
                </>
              ) : (
                <CurrentPrice>{item.price} ₼</CurrentPrice>
              )}
            </PriceSection>

            <DetailList>
              {item?.featureOptionItems?.$values?.map((feature) => (
                <DetailItem key={feature.id || feature.name}>
                  <FeatureLabel>{feature.featureOption?.name}:</FeatureLabel>
                  <FeatureValue>
                    {feature?.name} {feature?.parent?.name}
                  </FeatureValue>
                </DetailItem>
              ))}

              <ActionSection>
                <WishContainer
                  onClick={() => {
                    setLiked(!liked);
                    addToWishlist(item);
                    toast[liked ? "info" : "success"](
                      liked ? "Məhsul istək siyahısından çıxarıldı" : "Məhsul istək siyahısına əlavə olundu!"
                    );
                  }}
                >
                  <WishIcon>
                    {liked ? <FaHeart style={{ color: "#e74c3c" }} /> : <FaRegHeart />}
                  </WishIcon>
                  <WishText>
                    {liked ? (
                      <>
                        <Gray>Məhsul əlavə edildi</Gray>
                        <BrowseLink to="/wishlist" onClick={(e) => e.stopPropagation()}>
                          istək siyahısına baxın
                        </BrowseLink>
                      </>
                    ) : (
                      <Blue>istək siyahısına əlavə edin</Blue>
                    )}
                  </WishText>
                </WishContainer>

                <CartSection>
                  <QuantityControl>
                    <QuantityButton onClick={decrement}>
                      <i className="fa-solid fa-minus"></i>
                    </QuantityButton>
                    <QuantityInput
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setQuantity(isNaN(value) || value < 1 ? 1 : value);
                      }}
                    />
                    <QuantityButton onClick={increment}>
                      <i className="fa-regular fa-plus"></i>
                    </QuantityButton>
                  </QuantityControl>

                  <AddToCartButton
                    disabled={!item?.inStock}
                    onClick={() => {
                      if (item?.inStock) {
                        addToCart(item, quantity);
                        toast.success("Məhsul səbətə əlavə olundu!");
                      } else {
                        toast.error("Məhsul stokda mövcud deyil!");
                      }
                    }}
                  >
                    {item?.inStock ? "Səbətə əlavə et" : "Stokda yoxdur"}
                  </AddToCartButton>
                </CartSection>
              </ActionSection>
            </DetailList>
          </div>
        </div>
      </div>
    </div>,
    modalRootRef.current
  );
};

export default ProductModal;

// === Styled Components ===
const ProductHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 15px;
  
  h2 {
    color: #2c3e50;
    font-weight: 700;
    font-size: 24px;
    line-height: 1.3;
    margin: 0;
  }
`;

const BrandBadge = styled.div`
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  
  span {
    background: linear-gradient(135deg, #149295 0%, #0f7a7c 100%);
    color: white;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 0 2px 8px rgba(20, 146, 149, 0.3);
  }
`;

const DetailDesc = styled.p`
  color: #666666;
  font-weight: 500;
  margin-bottom: 15px;
  line-height: 1.6;
  font-size: 14px;
`;

const StockStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 8px;
  margin: 12px 0;
  background: ${props => props.inStock
    ? 'linear-gradient(135deg, #e8f5e8 0%, #d4f1d4 100%)'
    : 'linear-gradient(135deg, #ffeaea 0%, #ffe0e0 100%)'};
  border-left: 4px solid ${props => props.inStock ? '#27ae60' : '#e74c3c'};
`;

const StockIcon = styled.div`
  color: ${props => props.inStock ? '#27ae60' : '#e74c3c'};
  font-size: 14px;
  display: flex;
  align-items: center;
`;

const StockText = styled.span`
  color: ${props => props.inStock ? '#27ae60' : '#e74c3c'};
  font-weight: 600;
  font-size: 13px;
`;

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 15px 0;
  flex-wrap: wrap;
`;

const OriginalPrice = styled.p`
  text-decoration: line-through;
  color: #95a5a6;
  font-weight: 400;
  font-size: 18px;
  margin: 0;
`;

const CurrentPrice = styled.p`
  font-size: 24px;
  color: #2c3e50;
  font-weight: 700;
  margin: 0;
`;

const DiscountBadge = styled.span`
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
`;

const DetailList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const DetailItem = styled.li`
  padding: 10px 0;
  display: flex;
  gap: 15px;
  border-bottom: 1px solid #ececec;
  align-items: center;
`;

const FeatureLabel = styled.p`
  font-weight: 600;
  color: #34495e;
  margin: 0;
  min-width: 120px;
  font-size: 14px;
`;

const FeatureValue = styled.span`
  color: #7f8c8d;
  font-weight: 500;
  font-size: 14px;
`;

const ActionSection = styled.div`
  margin-top: 20px;
  padding-top: 15px;
  border-top: 2px solid #ecf0f1;
`;

const WishContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 20px;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

const WishIcon = styled.i`
  font-size: 20px;
  color: #e74c3c;
`;

const WishText = styled.span`
  font-size: 15px;
  font-weight: 500;
`;

const CartSection = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid #ecf0f1;
  border-radius: 8px;
  overflow: hidden;
`;

const QuantityButton = styled.button`
  background: #f8f9fa;
  border: none;
  padding: 10px 12px;
  cursor: pointer;
  color: #495057;
  font-size: 13px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #149295;
    color: white;
  }
`;

const QuantityInput = styled.input`
  border: none;
  padding: 10px 12px;
  text-align: center;
  width: 50px;
  font-size: 15px;
  font-weight: 600;
  
  &:focus {
    outline: none;
  }
`;

const AddToCartButton = styled.button`
  background: ${props => props.disabled
    ? 'linear-gradient(135deg, #bdc3c7 0%, #95a5a6 100%)'
    : 'linear-gradient(135deg, #149295 0%, #0f7a7c 100%)'};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(20, 146, 149, 0.3);
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(20, 146, 149, 0.4);
  }
`;

const Gray = styled.span`
  color: #7f8c8d;
  font-weight: 500;
`;

const Blue = styled.span`
  color: #149295;
  font-weight: 600;
`;

const BrowseLink = styled(Link)`
  text-decoration: none;
  color: #149295;
  font-weight: 600;
  margin-left: 5px;
  
  &:hover {
    color: #0f7a7c;
    text-decoration: underline;
  }
`;