import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useGet } from "@utils/hooks/useCustomQuery";
import { ENDPOINTS } from "@utils/constants/Endpoints";
import { FaBars } from "react-icons/fa6";

import styled from "styled-components";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

const CategoryComponent = () => {
  const location = useLocation();
  const [iscrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  function toKebabCase(str) {
    return str
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[\s_]+/g, "-")
      .toLowerCase();
  }

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { data: categories } = useGet("categories", ENDPOINTS.categories);
  const navigate = useNavigate();

  return (
    <>
      <ProductsLi
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <FaBars />
        <p> Məhsullarımız</p>
        <ArrowDown />
        <CategoryListContainer
          className={iscrolled || !isHomePage ? "hoverable" : ""}
        >
          <CategoryList>
            {categories?.$values?.map((item) => (
              <CategoryElement
                key={item.id}
                onClick={() =>
                  navigate(`/product-category/${item.slug}?slug=${item.slug}`)
                }
              >
                {item.title}
                <ArrowForward />
                <SubCategoryList>
                  {item?.categoryItems?.$values?.map((categoryItem) => (
                    <SubCategoryElement
                      key={categoryItem.title}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(
                          `/product-category/${toKebabCase(
                            item.title
                          )}/${toKebabCase(categoryItem.title)}?slug=${
                            categoryItem.slug
                          }&search=${categoryItem.title}`
                        );
                      }}
                    >
                      {categoryItem.title}
                    </SubCategoryElement>
                  ))}
                </SubCategoryList>
              </CategoryElement>
            ))}
          </CategoryList>
        </CategoryListContainer>
      </ProductsLi>

      {/* Blur Overlay - yalnız body üçün, navbar blur olmur */}
      {isHovered && <BlurOverlay />}
    </>
  );
};

export default CategoryComponent;

// Styled Components
const ProductsLi = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  gap: 10px;
  color: #fff;
  padding-right: 100px;
  z-index: 1001;

  &:hover > div {
    display: block;
  }
`;

const CategoryListContainer = styled.div`
  z-index: 1001;
  display: ${({ className }) => (className === "hoverable" ? "none" : "block")};
  position: absolute;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.15);
  color: hsla(0, 0%, 40%, 0.85);
  top: 100%;
  left: 0;
  width: 100%;

  &.hoverable {
    opacity: 0;
    visibility: hidden;
    transition: 0.6s;
  }

  ${ProductsLi}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;

const CategoryList = styled.ul`
  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #149295;
    border-radius: 3px;
    height: 50px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgb(245, 245, 245);
  }

  overflow-y: scroll;
  height: min-content;
`;

const ArrowDown = styled(IoIosArrowDown)`
  position: absolute;
  top: 50%;
  right: 2px;
  transform: translate(-50%, -50%);
`;

const ArrowForward = styled(IoIosArrowForward)``;

const CategoryElement = styled.li`
  border-top: 1px solid #ececec;
  background-color: #ffffff;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9em;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }

  &:hover > ul {
    display: block;
  }
`;

const SubCategoryList = styled.ul`
  display: none;
  position: absolute;
  padding-top: 15px;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.15);
  color: hsla(0, 0%, 40%, 0.85);
  background-color: #ffffff;
  left: 100%;
  top: 0;
  height: 100%;
  width: 110%;
  cursor: default;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #149295;
    border-radius: 3px;
    height: 50px;
  }
`;

const SubCategoryElement = styled.li`
  border-bottom: 1px solid #ececec;
  font-size: 16px;
  background-color: #ffffff;
  padding: 10px 15px;
  margin: 0 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const BlurOverlay = styled.div`
  position: fixed;
  top: 140px;
  left: 0;
  width: 100%;
  height: calc(100vh - 140px);
  background-color: rgba(0, 0, 0, 0.20);
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1px);
  z-index: 100;
  pointer-events: none;
`;
