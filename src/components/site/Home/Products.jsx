import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode, Autoplay } from "swiper/modules";

// Swiper Css Imports
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ProductsCard, { ProductsCardSkeleton } from "./ProductCard";
import { useGet } from "@utils/hooks/useCustomQuery";
import { ENDPOINTS } from "@utils/constants/Endpoints";
import { LayoutContainer } from "@styles/common/LayoutContainer";

const ProductSection = ({ sectionHeader, display, order }) => {
  const { data: products, isLoading } = useGet("getAllFiltered", `${ENDPOINTS.getAllFiltered}?order=${order}&take=20&skip=1`);


  return (
    <SectionContainer>
      <LayoutContainer>
        <ProductsContainer>
          <ContainerHeader style={{ display: display }}>
            <ContainerSpan >{sectionHeader}</ContainerSpan>
          </ContainerHeader>
          <ProductsMenu>
            <Swiper
              loop={true}
              navigation={true}
              spaceBetween={0}
              slidesPerView={3}
              modules={[FreeMode, Navigation, Autoplay, Pagination]}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                400: {
                  slidesPerView: 3,
                },
                850: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 5,
                },
              }}
            >
              {
                isLoading ? (
                  <>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <SwiperSlide ><ProductsCardSkeleton key={index} /></SwiperSlide>
                    ))}
                  </>
                ) : (
                  products?.items?.$values.map((item) => (

                    <SwiperSlide key={item.id}>
                      <ProductsCard item={item} />
                    </SwiperSlide>
                  ))
                )
              }

            </Swiper>
          </ProductsMenu>
        </ProductsContainer>
      </LayoutContainer>
    </SectionContainer>
  );
};

const SectionContainer = styled.section`
  width: 100%;
  padding: 10px 0px 30px;

  .swiper-button-next,
  .swiper-button-prev {
    color: black;
    transition: color 0.3s ease;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
      font-size: 30px; 
    }
  }

  .swiper-button-next:hover,
  .swiper-button-prev:hover {
    color: #149295;
  }

  @media (max-width: 1024px) {
    .swiper-button-next,
    .swiper-button-prev {
      width: 30px;
      height: 30px;
    }

    .swiper-button-next::after,
    .swiper-button-prev::after {
      font-size: 25px;
    }
  }

  @media (max-width: 600px) {
    .swiper-button-next,
    .swiper-button-prev {
      width: 14px;
      height: 14px;
    }

    .swiper-button-next::after,
    .swiper-button-prev::after {
      font-size: 18px;
    }
  }
`;


const ProductsContainer = styled.div`
  width: 100%;
`;

const ProductsMenu = styled.div`
  padding: 10px 0px;
`;

const ContainerHeader = styled.h3`
  max-width: 180px;
  border-bottom: 3px solid #ececec;
  padding: 10px 0px;
  color: #149295;
`;

const ContainerSpan = styled.span``;


export default ProductSection;
