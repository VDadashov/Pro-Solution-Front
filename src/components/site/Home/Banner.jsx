import React from "react";
import styled from "styled-components";
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

const Banner = () => {
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
              <SwiperSlide>
                <StyledImage src={"./images/maxresdefault.webp"} />
              </SwiperSlide>
              <SwiperSlide>
                <StyledImage src={"./images/maxresdefault-jpg2.webp"} />
              </SwiperSlide>
              <SwiperSlide>
                <StyledImage
                  src={"./images/fcbae5e02653dba533d39dfd3b891a28.webp"}
                />
              </SwiperSlide>
            </Swiper>
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
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 2rem;
    color: #fff;
  }

  .swiper-button-next:hover,
  .swiper-button-prev:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 850px) {
    .swiper-button-next,
    .swiper-button-prev {
      font-size: 1.5rem;
      width: 40px;
      height: 40px;
    }

    .swiper-button-next::after,
    .swiper-button-prev::after {
      font-size: 1.5rem;
    }
  }
`;

const StyledImage = styled.img`
  width: 100%;
`;

export default Banner;
