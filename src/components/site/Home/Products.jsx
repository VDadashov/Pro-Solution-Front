import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode, Autoplay } from "swiper/modules";

// Swiper Css Imports
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ProductsCard from "./ProductCard";
import { useGet } from "@utils/hooks/useCustomQuery";
import { ENDPOINTS } from "@utils/constants/Endpoints";
import { LayoutContainer } from "@styles/common/LayoutContainer";

const ProductSection = ({ sectionHeader }) => {
  const { data: categories } = useGet("categories", ENDPOINTS.categories);
  const { data: products } = useGet("products", ENDPOINTS.products);
  console.log(products);
  console.log(categories);

  const getCategoryName = (categoryId) => {
    const category = categories?.find((cat) => cat?.id == categoryId);
    return category ? category?.name : "Unknown Category";
  };

  return (
    <SectionContainer>
      <LayoutContainer>
        <ProductsContainer>
          <ContainerHeader>
            <ContainerSpan>{sectionHeader}</ContainerSpan>
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
                  slidesPerView: 2,
                },
                850: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 5,
                },
              }}
            >
              {products?.map((item) => (
                <SwiperSlide key={item.id}>
                  <ProductsCard item={item} categoryName={getCategoryName} />
                </SwiperSlide>
              ))}
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
    transform: scale(0.7);
  }

  .swiper-button-next:hover,
  .swiper-button-prev:hover {
    color: #149295;
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
