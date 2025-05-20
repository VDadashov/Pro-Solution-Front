import { ENDPOINTS } from "@utils/constants/Endpoints";
import { useGet } from "@utils/hooks/useCustomQuery";
import React from "react";
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

const AuthorsSkeleton = ({ index }) => {
  const randomWidth = Math.floor(Math.random() * (100 - 50 + 1)) + 50;

  return (
    <AuthorsSkeletonWrapper key={`skeleton-${index}`}>
      <LoadingSkeleton width={randomWidth} height={20} />
    </AuthorsSkeletonWrapper>
  );
};
function Authors() {
  const { data: blogs, isLoading } = useGet("blogs", ENDPOINTS.blogs);
  return (
    <AuthorsWrapper>
      <CategoriesHead>
        <h4>MÜƏLLİFLƏR</h4>
        <hr />
      </CategoriesHead>
      <AuthorsSection>
        {isLoading
          ? <>{Array.from({ length: 15 }).map((_, index) => <AuthorsSkeleton key={index}/> )}</>
          : blogs?.map((author, index) => (
              <StyledButton key={index} >
                {author.name} {author.surname}
              </StyledButton>
            ))}
      </AuthorsSection>
    </AuthorsWrapper>
  );
}

export default Authors;

const AuthorsSkeletonWrapper = styled.div``;
const AuthorsWrapper = styled.div`
    min-height: 10vh;
    padding-bottom: 30px;
    // padding-top: 20px;
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

    }
  `;
const CategoriesHead = styled.div``;
const AuthorsSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 5px;
  padding-top: 20px;
`;

const StyledButton = styled.button`
  background-color: transparent;
      border: 1px solid #149295;
      color: #149295;
      height: 30px;
      border-radius: 3px;
      padding: 5px;
      &:hover {
        background-color: #149295;
        color: #ffffff;
  `;
