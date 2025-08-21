import React from "react";
import styled from "styled-components";
import Banner from "@components/site/Home/Banner";
import ProductSection from "@components/site/Home/Products";
import DiscountProductSection from "@components/site/Home/DiscountProduct";
import AdjustableSection from "@components/site/Home/Adjustable";
import AdjustablePartnerSection from "@components/site/Home/AdjustablePartner";
import Loading from "@components/site/common/Loading/Loading";

const Home = () => {
  return (
    <>
      <MainSection>
        <Banner />
        <ProductSection slug={""} sectionHeader={"Ən Çox Satılanlar"}  order={13}  />
        <ProductSection slug={""} sectionHeader={"Təzə Endirimlər"}  order={11} />
        <ProductSection slug={""} sectionHeader={"Yeni Məhsullar"} order={5} />
        <DiscountProductSection />
        <AdjustableSection
          headerName={"Brendlər"}
          imageSrc={"acer_predator.webp"}
        />
        <AdjustablePartnerSection
          headerName={"Partnyorlar"}
          imageSrc={"xerox.webp"}
        />
      </MainSection>
    </>
  );
};

const MainSection = styled.main`
  position: relative;
`;

export default Home;
