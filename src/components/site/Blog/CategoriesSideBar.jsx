import { ENDPOINTS } from "@utils/constants/Endpoints";
import { useGet } from "@utils/hooks/useCustomQuery";
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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

  const CategoriesSkeleton = ({ index }) => {
    const randomWidth = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
    return (
      <SidebarWrapper key={`skleton-${index}`}>
        <CategoriesSection>
          <LoadingSkeleton width={randomWidth} height={20} />
        </CategoriesSection>
      </SidebarWrapper>
    );
  };
const CategoriesSidebar = () => {
  const { data: categories, isLoading } = useGet(
    "categories",
    ENDPOINTS.categories
  );

  

  return (
    <SidebarWrapper>
      <CategoriesHead>
        <h4>KATEQORİYALAR</h4>
        <hr />
      </CategoriesHead>
      <CategoriesSection>
        {isLoading
          ? Array.from({ length: 20 }).map((_, index) => (
              <CategoriesSkeleton key={index} />
            ))
          : categories?.$values?.map((category, index) => (
              <React.Fragment key={index}>
                <button>{category.title}</button>
              </React.Fragment>
            ))}
      </CategoriesSection>
    </SidebarWrapper>
  );
};

export default CategoriesSidebar;

const SidebarWrapper = styled.div`
  // padding: 20px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  h4 {
    color: gray;
    margin-bottom: 10px;
  }
  hr {
    width: 50px;
    border-top: 2px solid #ececec;
  }

  button {
    background-color: transparent;
    border: 1px solid #149295;
    color: #149295;
    border-radius: 3px;
    padding: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
      background-color: #149295;
      color: #fff;
    }
  }
`;

const CategoriesSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 5px;

  height: 90%;
`;

const CategoriesHead = styled.div`
  flex-shrink: 0;
  padding-bottom: 30px;
`;
