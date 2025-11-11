import React, { useState } from 'react'
import styled from 'styled-components';
import { DetailCard, ThumbnailList, MainImageWrapper } from "@styles/common/categoryDetail";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { FiZoomIn } from "react-icons/fi";


const ProductDetailCard = ({ product }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const imageValues = product?.images?.$values || [];
  const mainImage = imageValues.find((img) => img.isMain);
  const otherImages = imageValues.filter((img) => !img.isMain);
  const images = mainImage ? [mainImage, ...otherImages] : imageValues;
  return (
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
  )
}

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
  font-size: 20px;
  margin-left: 8px;
  cursor: pointer;
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  margin-right: 8px;

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


export default ProductDetailCard