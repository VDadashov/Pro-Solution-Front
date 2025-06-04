import React from "react";
import styled, { keyframes } from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  FreeMode,
  Autoplay,
} from "swiper/modules";

// Swiper Css Imports
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { LayoutContainer } from "@styles/common/LayoutContainer";
import { useGet } from "@utils/hooks/useCustomQuery";
import { ENDPOINTS } from "@utils/constants/Endpoints";
import { data, Link, useNavigate } from "react-router";
import Skeleton from "react-loading-skeleton";
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
  animation: ${pulse} 1.5s infinite ease-in-out;
`;


const AdjustableSectionSkeleton = () => {
  return (
    <AdjustableContainer>
      <LayoutContainer>
        <BrandBox>
          <BrandsAndPartners>
            <Swiper
              navigation={true}
              spaceBetween={20}
              slidesPerView={6}
              modules={[FreeMode, Navigation, Autoplay, Pagination]}
              breakpoints={{
                0: { slidesPerView: 1 },
                450: { slidesPerView: 2 },
                650: { slidesPerView: 3 },
                850: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
                1200: { slidesPerView: 6 },
              }}
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <SwiperSlide key={index}>
                  <ImageContainer>
                    <LoadingSkeleton width={"100%"} height={"100%"} />
                    <DescriptionContainer>
                      <NameBox>
                        <LoadingSkeleton width={100} height={50} />
                      </NameBox>
                      <CountBox className="countbox">
                        <LoadingSkeleton width={50} height={50} />
                      </CountBox>
                    </DescriptionContainer>
                  </ImageContainer>
                </SwiperSlide>
              ))}
            </Swiper>
          </BrandsAndPartners>
        </BrandBox>
      </LayoutContainer>
    </AdjustableContainer>
  );
};



const AdjustableSection = ({ headerName }) => {
  const { data: brand, isLoading } = useGet("brand", ENDPOINTS.brand);
  console.log(brand?.$values);

  return (
    <AdjustableContainer>
      <LayoutContainer>
        <BrandBox>
          <StyledH2>{headerName}</StyledH2>
          <BrandsAndPartners>
            {isLoading ? (
              <AdjustableSectionSkeleton />
            ) : (
              <Swiper
                navigation={true}
                spaceBetween={20}
                slidesPerView={6}
                loop={true}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                modules={[FreeMode, Navigation, Autoplay, Pagination]}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  450: {
                    slidesPerView: 2,
                  },
                  650: {
                    slidesPerView: 3,
                  },
                  850: {
                    slidesPerView: 4,
                  },
                  1024: {
                    slidesPerView: 5,
                  },
                  1200: {
                    slidesPerView: 6,
                  },
                }}
              >
                {brand?.$values?.map((item) => (
                  <SwiperSlide>
                    <Link
                      to={`/product-category/${item?.slug}?slug=${item?.slug}`}
                    >
                      <ImageContainer key={item.id}>
                        <StyledImage src={item.imagePath} />
                        <DescriptionContainer>
                          <NameBox>{item.title}</NameBox>
                          <CountBox className="countbox">
                            {item.products.length} Məhsullar
                          </CountBox>
                        </DescriptionContainer>
                      </ImageContainer>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </BrandsAndPartners>
        </BrandBox>
      </LayoutContainer>
    </AdjustableContainer>
  );
};

const AdjustableContainer = styled.section`
  padding: 30px 0px;
  .swiper-button-next,
  .swiper-button-prev {
    color: black;
    transition: color 0.3s ease;
    transform: scale(0.7);
  }

  .swiper-button-next:hover,
  .swiper-button-prev:hover {
    color: #149295;
  }

  @media (max-width: 650px) {
    .swiper-button-next,
    .swiper-button-prev {
      font-size: 2rem;
      width: 60px;
      height: 60px;
    }

    .swiper-button-next::after,
    .swiper-button-prev::after {
      font-size: 2rem;
    }
  }
`;

const BrandBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 100%;
  /* height: 100px; */
`;

const StyledH2 = styled.h2`
  font-family: Manrope-Bold;
  text-align: center;
  color: #149295;
`;

const BrandsAndPartners = styled.div``;

const StyledImage = styled.img`
  width: 100%;
`;
const ImageContainer = styled.div`
  position: relative;
  cursor: pointer;
  &:hover > div {
    top: 85%;
  }
  &:hover > div > p {
    opacity: 1;
  }
`;

const DescriptionContainer = styled.div`
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
  transition: 0.3s;
`;

const NameBox = styled.h5`
  color: #fff;
`;

const CountBox = styled.p`
  opacity: 0;
  color: #f1f1f1;
  width: 100%;
  transition: 0.3s;
`;

export default AdjustableSection;
