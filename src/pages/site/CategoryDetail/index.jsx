import { useContext, useEffect, useState } from "react";
import { MdOutlineZoomOutMap } from "react-icons/md";
import styled from "styled-components";
import { CiHeart } from "react-icons/ci";
import {
  FaFacebookF,
  FaTwitter,
  FaPinterest,
  FaLinkedin,
  FaChevronLeft,
  FaChevronRight,
  FaCheckCircle,
} from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { IoCloseOutline } from "react-icons/io5";
import { FiZoomIn } from "react-icons/fi";
import { FaRegHeart, FaXTwitter } from "react-icons/fa6";
import { MdOutlineInventory2 } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { ENDPOINTS } from "@utils/constants/Endpoints";
import ProductDetailTabs from "@components/site/CategoryDetail/ProductDetailTabs";
import { WishlistContext } from "@Context/wishlistContext";
import { FaHeart } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useGet } from "@utils/hooks/useCustomQuery";
import { keyframes } from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import '../../../components/site/Category/productModal.scss'
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

const DetailSkeleton = ({ imageCount }) => (
  <DetailWrapper>
    <Wrapper>
      <DetailHead>
        <Nav>
          <LoadingSkeleton width={100} height={20} />
        </Nav>
      </DetailHead>

      <DetailBody>
        <DetailCard>
          <ThumbnailList>
            {[...Array(imageCount)].map((_, i) => (
              <LoadingSkeleton
                key={i}
                width={60}
                height={60}
                style={{ marginBottom: "10px" }}
              />
            ))}
          </ThumbnailList>

          <MainImageWrapper>
            <LoadingSkeleton height={"100%"} width={"100%"} />
          </MainImageWrapper>
        </DetailCard>

        <DetailInfo>
          <div className="DetailInfoHead">
            <LoadingSkeleton height="100%" width="80%" />
            <hr />
            <div className="price">
              <LoadingSkeleton height={20} width={80} />
            </div>

            <DetailList>
              {[...Array(10)].map((_, i) => (
                <DetailItem key={i}>
                  <LoadingSkeleton height={15} width={"40%"} />
                </DetailItem>
              ))}
            </DetailList>
            <DetailFoot>
              <p>
                <LoadingSkeleton height={15} width={"40%"} />
              </p>
              <Socials>
                <LoadingSkeleton height={15} width={"100%"} />
              </Socials>
            </DetailFoot>
          </div>
        </DetailInfo>
      </DetailBody>
    </Wrapper>
  </DetailWrapper>
);

const CategoryDetail = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [product, setProduct] = useState(null);
  console.log("product", product);
  
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

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
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
    <DetailSkeleton imageCount={product?.images?.$values?.length} />
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
          <DetailCard>
            <ThumbnailList>
              {images?.map((img, i) => (
                <Thumbnail
                  key={img.slug || i}
                  src={img?.imagePath}
                  active={i === selectedIndex}
                  onClick={() => setSelectedIndex(i)}
                />
              ))}
            </ThumbnailList>

            <MainImageWrapper>
              <ImgWrap>
                <MainImage src={images[selectedIndex]?.imagePath} />
              </ImgWrap>
              <HoverIcons>
                <ArrowLeft onClick={prevImage}>
                  <FaChevronLeft />
                </ArrowLeft>
                <ArrowRight onClick={nextImage}>
                  <FaChevronRight />
                </ArrowRight>
                <LikeIcon
                  onClick={() => {
                    addToWishlist(product);
                    if (!liked) {
                      toast.success("Product added to wishlist!");
                    } else {
                      toast.error("Product removed from wishlist.");
                    }
                    setLiked(!liked);
                  }}
                >
                  <CiHeart />
                </LikeIcon>
              </HoverIcons>
              <ZoomIcon onClick={() => setIsModalOpen(true)}>
                <MdOutlineZoomOutMap />
              </ZoomIcon>
            </MainImageWrapper>

            {isModalOpen && (
              <Modal
                onClick={() => {
                  setIsModalOpen(false);
                  setIsZoomed(false);
                }}
              >
                <ModalArrowLeft
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                >
                  <FaChevronLeft />
                </ModalArrowLeft>

                <ModalArrowRight
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                >
                  <FaChevronRight />
                </ModalArrowRight>

                <ModalImage
                  src={images[selectedIndex]?.imagePath}
                  style={{
                    transform: isZoomed ? "scale(1.5)" : "scale(1)",
                    transition: "transform 0.3s ease",
                    cursor: isZoomed ? "zoom-out" : "zoom-in",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsZoomed(!isZoomed);
                  }}
                />
                <ModalBtn onClick={(e) => e.stopPropagation()}>
                  <CloseBtn
                    onClick={() => {
                      setIsModalOpen(false);
                      setIsZoomed(false);
                    }}
                  >
                    <IoCloseOutline />
                  </CloseBtn>
                  <ZoomBtn onClick={() => setIsZoomed(!isZoomed)}>
                    <FiZoomIn />
                  </ZoomBtn>
                </ModalBtn>
              </Modal>
            )}
          </DetailCard>
          
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
                <StockIcon>
                  {product?.inStock ? <FaCheckCircle /> : <MdOutlineInventory2 />}
                </StockIcon>
                <StockText>
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

// Enhanced Styled Components
const DetailWrapper = styled.section`
  min-height: 100vh;
  background-color: #fafafa;
`;

const Wrapper = styled.div`
  padding-top: 2rem;
  @media (max-width: 850px) {
    padding-top: 0;
  }
`;

const DetailHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 77%;
  margin: 0px 0px 2rem 10rem;
  @media (max-width: 850px) {
    width: 100%;
    flex-direction: column;
    text-align: center;
    gap: 10px;
    margin: 0px;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }
`;

const Nav = styled.ul`
  display: flex;
  gap: 10px;
  li a {
    color: hsla(0, 0%, 40%, 0.7);
    font-weight: 400;
    line-height: 1.2;
    text-transform: uppercase;
    font-size: 1.15em;
    transition: color 0.3s ease;
    
    &:hover {
      color: #149295;
    }
  }
`;

const DetailBody = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 0 auto;
  max-width: 80%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  
  @media (max-width: 851px) {
    flex-direction: column;
    margin-top: 2rem;
    gap: 30px;
    margin: 1rem auto;
    padding: 1rem;
  }
`;

const DetailCard = styled.div`
  width: 44%;
  display: flex;
  gap: 30px;
  position: relative;
  @media (max-width: 851px) {
    flex-direction: column-reverse;
    width: 100%;
  }
`;

const DetailInfo = styled.div`
  width: 38%;
  @media (max-width: 851px) {
    width: 100%;
  }
`;

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
  font-size: 16px;
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

const DetailList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DetailItem = styled.li`
  padding: 12px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  line-height: 1.4;
  border-bottom: 1px solid #ecf0f1;
  
  @media (max-width: 851px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
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

const DetailFoot = styled.div`
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #ecf0f1;
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

const Socials = styled.ul`
  display: flex;
  align-items: center;
  gap: 8px;

  li {
    position: relative;
    border: 2px solid #bdc3c7;
    color: #7f8c8d;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      color: white;
      transform: translateY(-2px);
    }

    &::after {
      content: attr(data-tooltip);
      position: absolute;
      bottom: 120%;
      left: 50%;
      transform: translateX(-50%);
      background-color: #2c3e50;
      color: white;
      padding: 8px 12px;
      white-space: nowrap;
      font-size: 12px;
      border-radius: 4px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
      z-index: 1;
    }

    &:hover::after {
      opacity: 1;
    }
  }

  .facebook:hover {
    background-color: #3b5998;
    border-color: #3b5998;
  }

  .twitter:hover {
    background-color: #1da1f2;
    border-color: #1da1f2;
  }

  .email:hover {
    background-color: #34495e;
    border-color: #34495e;
  }

  .pinterest:hover {
    background-color: #bd081c;
    border-color: #bd081c;
  }

  .linkedin:hover {
    background-color: #0077b5;
    border-color: #0077b5;
  }
`;

// Keep all other existing styled components (ThumbnailList, Thumbnail, MainImageWrapper, etc.)
const ThumbnailList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 450px;
  overflow-y: auto;
  padding-right: 7px;
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(240, 240, 240, 0.8);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #149295;
    border-radius: 4px;
  }

  @media (max-width: 851px) {
    flex-direction: row;
    overflow-y: hidden;
    overflow-x: auto;

    &::-webkit-scrollbar {
      height: 4px;
    }
  }
`;

const Thumbnail = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  border: 2px solid ${({ active }) => (active ? "#149295" : "#ecf0f1")};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #149295;
    transform: scale(1.05);
  }
  
  @media (max-width: 851px) {
    width: 80px;
    height: 80px;
  }
`;

const MainImageWrapper = styled.div`
  position: relative;
  width: 450px;
  height: 440px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fafafa;
  border-radius: 12px;
  overflow: hidden;

  &:hover div {
    opacity: 1;
  }

  @media (max-width: 851px) {
    width: 100%;
    height: 400px;
  }
`;

const ZoomIcon = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 15px;
  pointer-events: all;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #bdc3c7;
  color: #7f8c8d;
  background: white;
  padding: 10px;
  font-size: 20px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #149295;
    color: white;
    border-color: #149295;
    transform: scale(1.1);
  }
  
  @media (max-width: 865px) {
    bottom: 10px;
    left: 10px;
  }
`;

const ImgWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const MainImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
`;

const HoverIcons = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 0.3s ease;
  pointer-events: none;
  
  @media (max-width: 851px) {
    opacity: 1;
  }
`;

const ArrowLeft = styled.div`
  pointer-events: all;
  color: white;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  font-size: 24px;
  margin-left: 15px;
  cursor: pointer;
  padding: 12px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(20, 146, 149, 0.9);
    transform: scale(1.1);
  }

  @media (max-width: 851px) {
    margin-left: 10px;
    font-size: 15px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ArrowRight = styled(ArrowLeft)`
  margin-left: 0;
  margin-right: 15px;

  @media (max-width: 851px) {
    margin-right: 10px;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const LikeIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
  font-size: 22px;
  background-color: rgba(255, 255, 255, 0.9);
  border: 2px solid #bdc3c7;
  border-radius: 50%;
  padding: 10px;
  opacity: 0;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: all;
  
  &:hover {
    background-color: #e74c3c;
    color: white;
    border-color: #e74c3c;
    transform: scale(1.1);
  }
  
  @media (max-width: 951px) {
    right: 15px;
    top: 15px;
    opacity: 1;
    background-color: white;
  }
  
  @media (max-width: 565px) {
    right: 10px;
    top: 10px;
    font-size: 18px;
    padding: 8px;
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

const Modal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
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

const ModalBtn = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 15px;
  
  @media (max-width: 951px) {
    top: 20px;
    right: 20px;
    font-size: 20px;
  }
`;

const CloseBtn = styled.div`
  background: rgba(0, 0, 0, 0.5);
  padding: 12px;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(231, 76, 60, 0.8);
    transform: scale(1.1);
  }
`;

const ZoomBtn = styled.div`
  background: rgba(0, 0, 0, 0.5);
  padding: 12px;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(20, 146, 149, 0.8);
    transform: scale(1.1);
  }
`;

const ModalImage = styled.img`
  max-width: 85%;
  max-height: 85%;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
`