import React from "react";
import styled from "styled-components";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { LayoutContainer } from "@styles/common/LayoutContainer";

const ErrorPage = () => {
  return (
    <ErrorSection>
      <LayoutContainer>
        <ErrorContainer>
          <ErrorLeft>
            <ErrorSpan>404</ErrorSpan>
          </ErrorLeft>
          <ErrorRight>
            <PageTitle>Oops! That page can’t be found.</PageTitle>
            <PageParagraph>
              It looks like nothing was found at this location. Maybe try one of
              the links below or a search?
            </PageParagraph>
            <PageSearch>
              <SearchInput placeholder="Axtar..." />
              <SearchIcon>
                <FaMagnifyingGlass />
              </SearchIcon>
            </PageSearch>
          </ErrorRight>
        </ErrorContainer>
      </LayoutContainer>
    </ErrorSection>
  );
};

const ErrorSection = styled.main`
  padding-bottom: 30px;
  padding-top: 20px;
`;

const ErrorContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 50px 0px;
  @media (max-width: 850px) {
    flex-direction: column;
    gap: 40px;
  }
`;

const ErrorLeft = styled.div`
  width: 25%;
  display: flex;
  align-items: center;
`;

const ErrorRight = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ErrorSpan = styled.span`
  font-size: 6em;
  font-weight: bold;
  opacity: 0.3;
  color: #777;
`;

const PageTitle = styled.h1`
  color: #149295;
`;

const PageParagraph = styled.p`
  color: #777;
`;

const PageSearch = styled.div`
  display: flex;
`;

const SearchInput = styled.input`
  color: #333;
  appearance: none;
  outline: none;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 0;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  color: #333;
  font-size: 0.97em;
  height: 2.507em;
  max-width: 100%;
  padding: 0 0.75em;
  transition: color 0.3s, border 0.3s, background 0.3s, opacity 0.3s;
  vertical-align: middle;
  width: 100%;
`;

const SearchIcon = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #149295;
  color: #fff;
  border: none;
  outline: none;
  width: 40px;
  font-size: 19px;
  &:hover {
    box-shadow: inset 0 0 0 100px rgba(0, 0, 0, 0.2);
  }
`;

export default ErrorPage;
