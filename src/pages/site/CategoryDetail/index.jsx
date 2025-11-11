import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
  FaFacebookF,
  FaPinterest,
  FaLinkedin,
  FaCheckCircle,
} from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { FaRegHeart, FaXTwitter } from "react-icons/fa6";
import { MdOutlineInventory2 } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { ENDPOINTS } from "@utils/constants/Endpoints";
import ProductDetailTabs from "@components/site/CategoryDetail/ProductDetailTabs";
import { WishlistContext } from "@Context/wishlistContext";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { useGet } from "@utils/hooks/useCustomQuery";
import '../../../components/site/Category/productModal.scss'
import { useCart } from "../../../providers/CartProvider";
import ProductDetailSkeleton from "@components/site/CategoryDetail/ProductDetailSkeleton";
import { DetailWrapper, Wrapper, DetailHead, Nav, DetailBody, DetailItem, DetailInfo, DetailList, DetailFoot, Socials } from "@styles/common/categoryDetail";
import ProductDetailCard from "@components/site/CategoryDetail/ProductDetailCard";

const CategoryDetail = () => {
  const [liked, setLiked] = useState(false);
  const [product, setProduct] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();
  const { wishlist, addToWishlist } = useContext(WishlistContext);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${ENDPOINTS.productsSlug}/${slug}`);
        const data = await res.json();

        setProduct(data);
      } catch (error) {
        console.error("Product fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  useEffect(() => {
    if (product) {
      const isLiked = wishlist.some((item) => item && item.id === product.id);
      setLiked(isLiked);
    }
  }, [wishlist, product]);

  const imageValues = product?.images?.$values || [];
  const mainImage = imageValues.find((img) => img.isMain);
  const otherImages = imageValues.filter((img) => !img.isMain);
  const images = mainImage ? [mainImage, ...otherImages] : imageValues;

  const { data } = useGet("settings", ENDPOINTS.settings);

  const getValue = (key) => {
    return data?.$values?.find((item) => item.key === key)?.value || "";
  };

  function toKebabCase(str) {
    return str
      ?.replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[\s_]+/g, "-")
      .toLowerCase();
  }

  const getCategoryBreadcrumbs = (array) => {
    if (!Array.isArray(array)) return [];
    const result = [];

    array.forEach((element) => {
      const part = toKebabCase(element.title);
      result.push({
        label: element?.title,
        slug: element?.slug,
        searchTerm: part
      });
    });
    return result;
  };

  const breadcrumbs = getCategoryBreadcrumbs(product?.categories?.$values);

  return isLoading ? (
    <ProductDetailSkeleton imageCount={product?.images?.$values?.length} />
  ) : (
    <DetailWrapper>
      <Wrapper>
        <DetailHead>
          <Nav>
            <li>
              <Link to="/">Əsas səhifə</Link> /
            </li>
            <li>
              <Link
                to={{
                  pathname: `/product-category/${breadcrumbs[0]?.slug}`,
                  search: `?slug=${breadcrumbs[0]?.slug}&search=${breadcrumbs[0]?.searchTerm}`,
                }}
              >
                {breadcrumbs[0]?.label}
              </Link>
            </li>
          </Nav>
        </DetailHead>

        <DetailBody>
          <ProductDetailCard product={product} />
          <DetailInfo>
            <div className="DetailInfoHead">
              <ProductHeader>
                <h2>{product?.title}</h2>
                {product?.brandName && (
                  <BrandBadge>
                    <span>{product.brandName}</span>
                  </BrandBadge>
                )}
              </ProductHeader>

              {product?.description && (
                <DetailDesc>{product?.description}</DetailDesc>
              )}

              <StockStatus inStock={product?.inStock}>
                <StockIcon inStock={product?.inStock}>
                  {product?.inStock ? <FaCheckCircle /> : <MdOutlineInventory2 />}
                </StockIcon>
                <StockText inStock={product?.inStock}>
                  {product?.inStock ? "Stokda mövcuddur" : "Stokda yoxdur"}
                </StockText>
              </StockStatus>

              <hr />

              <PriceSection>
                {product?.discountPrice > 0 ? (
                  <>
                    <OriginalPrice>{product?.price} ₼</OriginalPrice>
                    <CurrentPrice>{product.discountPrice} ₼</CurrentPrice>
                    <DiscountBadge>
                      -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                    </DiscountBadge>
                  </>
                ) : (
                  <CurrentPrice>{product?.price} ₼</CurrentPrice>
                )}
              </PriceSection>

              <DetailList>
                {product?.featureOptionItems?.$values?.map((item) => (
                  <DetailItem key={item.id || item.name}>
                    <FeatureLabel>{item.featureOption?.name}:</FeatureLabel>
                    <FeatureValue>
                      {item?.name} {item?.parent?.name}
                    </FeatureValue>
                  </DetailItem>
                ))}

                <ActionSection>
                  <WishContainer
                    onClick={() => {
                      setLiked(true);
                      addToWishlist(product);
                    }}
                  >
                    <WishIcon>
                      {liked ? (
                        <FaHeart style={{ color: "#e74c3c" }} />
                      ) : (
                        <FaRegHeart />
                      )}
                    </WishIcon>
                    <WishText>
                      {liked ? (
                        <>
                          <Gray>Məhsul əlavə edildi</Gray>
                          <BrowseLink
                            to="/wishlist"
                            onClick={(e) => e.stopPropagation()}
                          >
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
                      disabled={!product?.inStock}
                      onClick={() => {
                        if (product?.inStock) {
                          addToCart(product, quantity);
                          toast.success("Məhsul səbətə əlavə olundu!");
                        } else {
                          toast.error("Məhsul stokda mövcud deyil!");
                        }
                      }}
                    >
                      {product?.inStock ? "Səbətə əlavə et" : "Stokda yoxdur"}
                    </AddToCartButton>
                  </CartSection>
                </ActionSection>
              </DetailList>

              <DetailFoot>
                <CategoryInfo>
                  Kateqoriya:{" "}
                  <span>
                    {getCategoryBreadcrumbs(product?.categories?.$values).map((item, idx, arr) => {
                      const isLast = idx === arr.length - 1;
                      const linkTo = {
                        pathname: `/product-category/${item.slug}`,
                        search: isLast
                          ? `?slug=${item.slug}&search=${item.searchTerm}`
                          : `?slug=${item.slug}`
                      };

                      return (
                        <span key={idx}>
                          <Link to={linkTo}>{item.label}</Link>
                          {idx < arr.length - 1 && ", "}
                        </span>
                      );
                    })}
                  </span>
                </CategoryInfo>

                <Socials>
                  <li className="facebook" data-tooltip="Share on Facebook">
                    <Link to={getValue("FacebookLink") || "#"} target="_blank">
                      <FaFacebookF />
                    </Link>
                  </li>
                  <li className="twitter" data-tooltip="Share on Twitter">
                    <Link to="#" target="_blank">
                      <FaXTwitter />
                    </Link>
                  </li>
                  <li className="email" data-tooltip="Send via Email">
                    <Link to={`mailto:${getValue("SupportEmail") || "support@example.com"}`} target="_blank">
                      <TfiEmail />
                    </Link>
                  </li>
                  <li className="pinterest" data-tooltip="Pin it on Pinterest">
                    <Link to="#" target="_blank">
                      <FaPinterest />
                    </Link>
                  </li>
                  <li className="linkedin" data-tooltip="Share on LinkedIn">
                    <Link to={getValue("LinkedInLink") || "#"} target="_blank">
                      <FaLinkedin />
                    </Link>
                  </li>
                </Socials>
              </DetailFoot>
            </div>
          </DetailInfo>
        </DetailBody>
      </Wrapper>
      <ProductDetailTabs product={product} />
    </DetailWrapper>
  );
};

export default CategoryDetail;

const ProductHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 15px;
  
  h2 {
    color: #2c3e50;
    font-weight: 700;
    font-size: 28px;
    line-height: 1.3;
    word-break: break-word;
    white-space: normal;
    margin: 0;
    
    @media (max-width: 851px) {
      font-size: 22px;
    }
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
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 0 2px 8px rgba(20, 146, 149, 0.3);
  }
`;
const StockStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 8px;
  margin: 15px 0;
  background: ${props => props.inStock
    ? 'linear-gradient(135deg, #e8f5e8 0%, #d4f1d4 100%)'
    : 'linear-gradient(135deg, #ffeaea 0%, #ffe0e0 100%)'};
  border-left: 4px solid ${props => props.inStock ? '#27ae60' : '#e74c3c'};
`;

const StockIcon = styled.div`
  color: ${props => props.inStock ? '#27ae60' : '#e74c3c'};
  font-size: 15px;
  margin-top: 4px;
`;

const StockText = styled.span`
  color: ${props => props.inStock ? '#27ae60' : '#e74c3c'};
  font-weight: 600;
  font-size: 14px;
`;

const DetailDesc = styled.p`
  color: #666666;
  font-weight: 500;
  margin-bottom: 20px;
  line-height: 1.6;
  word-break: break-word;
  white-space: normal;
`;

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 20px 0;
  flex-wrap: wrap;
`;

const OriginalPrice = styled.p`
  text-decoration: line-through;
  color: #95a5a6;
  font-weight: 400;
  font-size: 20px;
  margin: 0;
`;

const CurrentPrice = styled.p`
  font-size: 28px;
  color: #2c3e50;
  font-weight: 700;
  margin: 0;
`;

const DiscountBadge = styled.span`
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`;

const FeatureLabel = styled.p`
  font-weight: 600;
  color: #34495e;
  margin: 0;
  min-width: 140px;
`;

const FeatureValue = styled.span`
  color: #7f8c8d;
  font-weight: 500;
`;

const ActionSection = styled.div`
  margin-top: 30px;
  padding-top: 20px;
  border-top: 2px solid #ecf0f1;
`;

const WishContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 25px;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

const WishIcon = styled.i`
  font-size: 22px;
  color: #e74c3c;
`;

const WishText = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const CartSection = styled.div`
  display: flex;
  gap: 15px;
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
  padding: 12px 15px;
  cursor: pointer;
  color: #495057;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #149295;
    color: white;
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const QuantityInput = styled.input`
  border: none;
  padding: 12px 15px;
  text-align: center;
  width: 60px;
  font-size: 16px;
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
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(20, 146, 149, 0.3);
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(20, 146, 149, 0.4);
  }
`;

const CategoryInfo = styled.p`
  margin-bottom: 20px;
  color: #7f8c8d;
  font-size: 14px;
  font-weight: 500;
  
  span a {
    color: #149295;
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
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

const Gray = styled.span`
  color: #7f8c8d;
  font-weight: 500;
`;

const Blue = styled.span`
  color: #149295;
  font-weight: 600;
`;

const ModalArrowLeft = styled.div`
  position: absolute;
  top: 50%;
  left: 30px;
  transform: translateY(-50%);
  font-size: 24px;
  color: white;
  cursor: pointer;
  z-index: 10;
  user-select: none;
  transition: all 0.3s ease;
  background: rgba(0, 0, 0, 0.5);
  padding: 15px;
  border-radius: 50%;
  
  &:hover {
    background: rgba(20, 146, 149, 0.8);
    transform: translateY(-50%) scale(1.1);
  }
  
  @media (max-width: 951px) {
    left: 10px;
    font-size: 20px;
    padding: 12px;
  }
`;

const ModalArrowRight = styled(ModalArrowLeft)`
  left: auto;
  right: 30px;

  @media (max-width: 951px) {
    right: 10px;
  }
`;

