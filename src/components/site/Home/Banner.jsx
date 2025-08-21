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

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { LayoutContainer } from "@styles/common/LayoutContainer";
import { ENDPOINTS } from "@utils/constants/Endpoints";
import { useGet } from "@utils/hooks/useCustomQuery";
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

const BannerSkeleton = () => {
  return (
    <BannerSection>
      <LayoutContainer>
        <BannerContainer>
          <SwiperContainer>
            <Swiper
              navigation={true}
              pagination={{ clickable: true }}
              loop={true}
              spaceBetween={0}
              slidesPerView={1}
              modules={[FreeMode, Navigation, Autoplay, Pagination]}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
            >
              {Array.from({ length: 1 }).map((_, index) => (
                <SwiperSlide key={index}>
                  <LoadingSkeleton width={"100%"} height={"100%"} />
                </SwiperSlide>
              ))}
            </Swiper>
          </SwiperContainer>
        </BannerContainer>
      </LayoutContainer>
    </BannerSection>
  );
};

const Banner = () => {
  const { data: sliders, isLoading } = useGet("sliders", ENDPOINTS.sliders);

  return (
    <BannerSection>
      <LayoutContainer>
        <BannerContainer>
          <SwiperContainer>
            {isLoading || !sliders?.$values?.length ? (
              <BannerSkeleton />
            ) : (
              <Swiper
                navigation={true}
                pagination={{ clickable: true }}
                loop={true}
                spaceBetween={0}
                slidesPerView={1}
                modules={[FreeMode, Navigation, Pagination]}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
              >
                {sliders.$values.map((item) => (
                  <SwiperSlide key={item.id}>
                    <StyledImage src={item.imagePath} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </SwiperContainer>
        </BannerContainer>
      </LayoutContainer>
    </BannerSection>
  );
};

const BannerSection = styled.section`
  padding: 20px 0px;
`;

const BannerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  @media (max-width: 850px) {
    justify-content: center;
  }
`;

const SwiperContainer = styled.div`
  max-width: 75%;
  @media (max-width: 850px) {
    max-width: 100%;
  }
  .swiper-pagination-bullet {
    background-color: transparent;
    border: 1px solid #ffffff;
  }

  .swiper-pagination-bullet-active {
    background-color: #ffffff;
    border-color: #ffffff;
  }

  .swiper-button-next,
  .swiper-button-prev {
    font-size: 2rem;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 2rem;
    color: rgba(0, 0, 0, 0.3);
  }

  .swiper-button-next:hover,
  .swiper-button-prev:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }


  @media (max-width: 850px) {
    .swiper-button-next,
    .swiper-button-prev {
      font-size: 1.2rem;
      width: 35px;
      height: 35px;
    }

    .swiper-button-next::after,
    .swiper-button-prev::after {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 480px) {
    .swiper-button-next,
    .swiper-button-prev {
      font-size: 1rem;
      width: 20px;
      height: 28px;
    }

    .swiper-button-next::after,
    .swiper-button-prev::after {
      font-size: 0.8rem;
    }
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: contain;
`;

export default Banner;
