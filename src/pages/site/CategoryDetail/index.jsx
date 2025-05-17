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
} from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { IoCloseOutline } from "react-icons/io5";
import { FiZoomIn } from "react-icons/fi";
import { FaRegHeart, FaXTwitter } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { ENDPOINTS } from "@utils/constants/Endpoints";
import ProductDetailTabs from "@components/site/CategoryDetail/ProductDetailTabs";
import ProductSection from "@components/site/Home/Products";
import { WishlistContext } from "@Context/wishlistContext";
import { FaHeart } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useGetOne } from "@utils/hooks/useCustomQuery";

const CategoryDetail = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [liked, setLiked] = useState(false);
  const { id } = useParams();
  console.log(id)
  const { data: product,error } = useGetOne("productsId", ENDPOINTS.productsId, id);
    const { data: categories } = useGetOne("categories", ENDPOINTS.categories, id);
  console.log(product?.featureOptionItems); 
  console.log(categories)
  console.log(error)
  const { wishlist, addToWishlist } = useContext(WishlistContext);

  useEffect(() => {
    if (product) {
      const isLiked = wishlist.some(item => item.id === product.id);
      setLiked(isLiked);
    }
  }, [wishlist, product]);

  if (!product) {
    return <div>Product not found</div>;
  }

  const mainImage = product?.images?.find((img) => img.isMain);
const otherImages = product?.images?.filter((img) => !img.isMain);
const images = mainImage ? [mainImage, ...otherImages] : [];

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <DetailWrapper>
      <Wrapper>
        <DetailHead>
          <Nav>
            <li>
            <Link to="/">Əsas səhifə</Link>
            </li>
            {
      product?.categories?.map((item) => (
        <li key={item.id}>
          <Link to=""> / {item.title}</Link>    
        </li>
      ))
    }
           
          </Nav>
          <SwitchProduct>
            <li>
              <Link>
                <FaChevronLeft />
              </Link>
            </li>
            <li>
              <Link>
                <FaChevronRight />
              </Link>
            </li>
          </SwitchProduct>
        </DetailHead>
        <DetailBody>
          <DetailCard>
            <ThumbnailList>
              {images.map((img, i) => (
    <Thumbnail
     key={img.id || i}
      src={img.imagePath}
      active={i === selectedIndex}
      onClick={() => setSelectedIndex(i)}
    />
  ))}
            </ThumbnailList>

            <MainImageWrapper>
            <ImgWrap>
<MainImage  src={images[selectedIndex]?.imagePath}
               />
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
                  onClick={(e) =>{e.stopPropagation();
                    setIsZoomed(!isZoomed)
                  } }
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
              <h2> {product?.description}</h2>
              <hr />
              <div className="price">
              {
                product.discountPrice > 0 ?(
                  <>
                     <p className="old">{product?.price} ₼</p>
                <p className="new">{product.discountPrice} ₼</p>
                  </>
                ): (
                  <p className="new">{product?.price} ₼</p>
                )
              }
              </div>
<DetailList>
{
product?.featureOptionItems?.map((item)=>(
  <DetailItem key={item.id || item.name}>
    <p>{item.parent?.featureOption?.name} :</p>
    <span>{item?.name}</span>
    <span>{item?.parent?.name}</span>
  </DetailItem>
))
}
  <WishContainer onClick={() => {
    setLiked(true);
    addToWishlist(product);
  }}>
    <WishIcon>
      {liked ? <FaHeart style={{ color: "black" }} /> : <FaRegHeart />}
    </WishIcon>

    <WishText>
      {liked ? (
        <>
          <Gray>Product added</Gray>
          <BrowseLink to="/wishlist" onClick={(e) => e.stopPropagation()}>
            Browse wishlist
          </BrowseLink>
        </>
      ) : (
        <Blue>Add to wishlist</Blue>
      )}
    </WishText>
  </WishContainer>
</DetailList>
              <DetailFoot>
                <p>
                  Kateqoriya: {  product?.categories?.map((item)=>(
                    <span>{item.title} </span>
                  ))}
                  
                  {/* <span>Acer,Noutbuklar </span> */}
                </p>
                <Socials>
                  <li className="facebook" data-tooltip="Share on Facebook">
                    <Link>
                      <FaFacebookF />
                    </Link>
                  </li>
                  <li className="twitter" data-tooltip="Share on Twitter">
                    <Link>
                      <FaXTwitter />
                    </Link>
                  </li>
                  <li className="email" data-tooltip="Send via Email">
                    <Link>
                      <TfiEmail />
                    </Link>
                  </li>
                  <li className="pinterest" data-tooltip="Pin it on Pinterest">
                    <Link>
                      <FaPinterest />
                    </Link>
                  </li>
                  <li className="linkedin" data-tooltip="Share on LinkedIn">
                    <Link>
                      <FaLinkedin />
                    </Link>
                  </li>
                </Socials>
              </DetailFoot>
            </div>
          </DetailInfo>
        </DetailBody>
      </Wrapper>
      <ProductDetailTabs />
    </DetailWrapper>
  );
};

export default CategoryDetail;

const DetailWrapper = styled.section`
  min-height: 100vh;
`;
const Wrapper = styled.div`
  padding-top: 2rem;
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
    gap: 10px;
    margin: 0px;
    justify-content: center;
    align-items: center;
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
  }
`;
const SwitchProduct = styled.ul`
  display: flex;
  gap: 5px;
  li {
    display: flex;

    a {
      text-align: center;
      font-size: 12px;
      font-weight: 100;
      color: #c0c0c0;
      padding: 6px;
      border: 2px solid #c0c0c0;
      border-radius: 50%;
    }
  }
`;
const DetailBody = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 0 auto;
  max-width:80%;
  @media (max-width: 851px) {
    flex-direction: column;
    margin-top: 2rem;
    gap: 30px;
  }
 
`;
const DetailCard = styled.div`
width: 45%;
  display: flex;
  gap: 30px;
  position: relative;
  @media (max-width: 851px) {
    flex-direction: column-reverse;
    width: 100%;
  }
`;
const DetailInfo = styled.div`
  width: 32%;
  @media (max-width: 851px) {
    width: 100%;
    padding-left: 1rem;
    h2 {
      font-size: 22px;
      font-weight: 700;
    }
  }

  h2 {
    color: teal;
    font-weight: bold;
    margin-bottom: 15px;
  }
  hr {
    width: 40px;
    border: 2px solid #dede;
    margin-bottom: 5px;
  }
  .price {
    align-items: baseline;
    margin-bottom: 20px;
    display: flex;
    gap: 20px;
    .old {
      text-decoration: line-through;
      color: gray;
      font-weight: 400;
      font-size: 24px;
    }
    .new {
      font-size: 24px;
      color: #111;
      font-weight: 700;
    }
  }
`;
const DetailList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  p{
    font-weight: bolder;
    font-size: 16px;
    color: #777777;
  }
`;
const DetailFoot = styled.div`
  p {
    margin-top: 5px;
    margin-bottom: 15px;
    color: #777777;
    font-size: 12.8px;
  }
  span {
    color: #149295;
    font-size: 12.8px;
  }
`;
const Socials = styled.ul`
  display: flex;
  align-items: center;
  gap: 2px;
  min-height: 3vh;

  li {
    position: relative;
    border: 2px solid #c0c0c0;
    color: #c0c0c0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
      color: white;
    }

    &::after {
      content: attr(data-tooltip);
      position: absolute;
      bottom: 120%;
      left: 50%;
      transform: translateX(-50%);
      background-color: black;
      color: white;
      padding: 6px 10px;
      white-space: nowrap;
      font-size: 12px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
      z-index: 1;
    }

    &::before {
      content: "";
      position: absolute;
      bottom: 97%;
      left: 50%;
      transform: translateX(-50%);
      border-width: 5px;
      border-style: solid;
      border-color: black transparent transparent transparent;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 1;
    }

    &:hover::after,
    &:hover::before {
      opacity: 1;
    }
  }

  .facebook:hover {
    background-color: #446084;
    border-color: #446084;
  }

  .twitter:hover {
    background-color: #000000;
    border-color: #000000;
  }

  .email:hover {
    background-color: #000000;
    border-color: #000000;
  }

  .pinterest:hover {
    background-color: #cf2e2e;
    border-color: #cf2e2e;
  }

  .linkedin:hover {
    background-color: #0693e3;
    border-color: #0693e3;
  }
`;
const WishContainer = styled.li`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding-bottom: 0px;
  gap: 10px;
`;
const WishIcon = styled.i`
  font-size: 20px;
  color: black;
`;
const WishText = styled.span`
  font-size: 16px;
  color: #149295;
  &:hover{
    color:black;
  }
`;

const ThumbnailList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 450px;
  overflow-y: auto;
  padding-right: 7px;
  &::-webkit-scrollbar {
    width: 2px; 
  }

  &::-webkit-scrollbar-track {
    background:rgba(240, 240, 240, 0.8); 
  }

  &::-webkit-scrollbar-thumb {
    background-color:rgba(204, 204, 204, 0.83);
    border-radius: 3px;
  }

  @media (max-width: 851px) {
    flex-direction: row;
    overflow-y: hidden;
    overflow-x: auto;

    &::-webkit-scrollbar {
      height: 6px; 
    }
  }
`;

const Thumbnail = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 1px solid ${({ active }) => (active ? " #666666" : "none")};
  cursor: pointer;
  @media (max-width: 851px) {
    width: 100px;
    height: 100px;
  }
`;
const MainImageWrapper = styled.div`
   position: relative;
  width: 450px;
  height: 440px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover div {
    opacity: 1;
  }

  @media (max-width: 851px) {
    width: 100%;
    height: auto;
  }
`;
const ZoomIcon = styled.div`
  position: absolute;
  bottom: 30px;
  left: 10px;
  pointer-events: all;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #c0c0c0;
  color: #c0c0c0;
  padding: 8px;
  font-size: 24px;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: #149295;
    color: white;
    border: none;
  }
  @media(max-width:565px){
    bottom: 0;
  }
`;
const ImgWrap=styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;

`
const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 6px;
  @media (max-width: 1420px) {
   object-fit: cover;
  }
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
`;
const ArrowLeft = styled.div`
  pointer-events: all;
  color: gray;
  border-radius: 50%;
  font-size: 26px;
  margin-left: 10px;
  cursor: pointer;
  @media (max-width: 851px) {
    margin-left: 20px;
  }
`;
const ArrowRight = styled(ArrowLeft)`
  margin-left: 0;
  margin-right: 10px;
  @media (max-width: 851px) {
    margin-right: 20px;
  }
`;
const LikeIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 0px;
  font-size: 24px;
  background-color: transparent;
  border: 1px solid gray;
  border-radius: 50%;
  padding: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #b20000;
    color: white;
    border-color: #b20000;
  }
  @media (max-width: 951px) {
    right: 60px;

  }
  @media(max-width:565px){
    right: 10px;
    font-size: 20px;
  }
`;

const BrowseLink = styled(Link)`
text-decoration: none;
color:  #149295;
&:hover{
  color: black;
}
`
const Gray = styled.p`
color: gray;
`
const Blue = styled.span`
color:  #149295;
`
const Modal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  @media (max-width: 951px) {
  }
`;
const ModalArrowLeft = styled.div`
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  font-size: 1rem;
  color: white;
  cursor: pointer;
  z-index: 10;
  user-select: none;
  transition: 0.3s;
  @media (max-width: 951px) {
    color: white;
    left: 5px;
  }
`;
const ModalArrowRight = styled(ModalArrowLeft)`
  left: auto;
  right: 20px;

  @media (max-width: 951px) {
    color: white;
    right: 5px;
  }
`;
const ModalBtn = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
  font-size: 28px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const CloseBtn = styled.div``;
const ZoomBtn = styled.div``;
const ModalImage = styled.img`
  max-width: 90%;
  max-height: 90%;
`;

