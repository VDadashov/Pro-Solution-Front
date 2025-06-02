import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useGet } from "@utils/hooks/useCustomQuery";
import { ENDPOINTS } from "@utils/constants/Endpoints";
import { useNavigate } from "react-router-dom";

const Search = ({ $isMobile }) => {
  const { data: categories } = useGet("categories", ENDPOINTS.categories);
  const [selected, setSelected] = useState("All");
  const [searchInput, setSearchInput] = useState("");

  const [selectWidth, setSelectWidth] = useState(0);
  const textMeasureRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    const slugParam = selected === "All" ? "" : selected;
    const query = `?slug=${slugParam}&search=${encodeURIComponent(
      searchInput
    )}`;
    navigate(`/product-category/${slugParam}${query}`);
  };

  useEffect(() => {
    if (textMeasureRef.current) {
      setSelectWidth(textMeasureRef.current.offsetWidth + 20);
    }
  }, [selected]);

  return (
    <SearchContainer $isMobile={$isMobile}>
      <SelectWrapper $isMobile={$isMobile}>
        <HiddenText ref={textMeasureRef}>{selected}</HiddenText>
        <SearchCategories
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          $isMobile={$isMobile}
          selectWidth={selectWidth}
        >
          <option key={"All"} value={"All"}>
            All
          </option>
          {categories?.$values?.map((category) => (
            <option key={category.name} value={category.slug}>
              {category.slug}
            </option>
          ))}
        </SearchCategories>
        <ArrowIcon />
      </SelectWrapper>
      <SearchBar $isMobile={$isMobile} selectWidth={selectWidth}>
        <SearchInput
          type="text"
          placeholder="Axtar..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <SearchButton>
          <MagnifyingIcon onClick={handleSearch} />
        </SearchButton>
      </SearchBar>
    </SearchContainer>
  );
};
const SearchButton = styled.button`
  position: absolute;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
`;
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: ${({ $isMobile }) => ($isMobile ? "0 15px " : "")};
  margin-bottom: ${({ $isMobile }) => ($isMobile ? "20px" : "")};
  width: ${({ $isMobile }) => ($isMobile ? "230px" : "450px")};
  @media (max-width: 850px) {
    display: ${({ $isMobile }) => ($isMobile ? "flex" : "none")};
    flex-direction: ${({ $isMobile }) => ($isMobile ? "column" : "")};
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $isMobile, selectWidth }) =>
    $isMobile ? "100%" : `${selectWidth}px`};
`;

const SearchBar = styled.div`
  position: relative;
  height: 100%;
  width: ${({ $isMobile, selectWidth }) =>
    $isMobile ? "" : `calc(100% - ${selectWidth}px - 5px)`};
`;

const SearchInput = styled.input`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.09);
  color: rgba(119, 119, 119, 1);
  outline: none;
  border-radius: 99px;
  padding: 5px 30px 5px 10px;
  font: inherit;
  font-size: 0.97em;
`;

const SearchCategories = styled.select`
  background-color: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.09);
  color: rgba(119, 119, 119, 1);
  outline: none;
  border-radius: 99px;
  appearance: none;
  padding: 5px 10px;
  font: inherit;
  font-size: 0.97em;
  width: ${({ $isMobile, selectWidth }) =>
    $isMobile ? "100%" : `${selectWidth}px`};
`;

const HiddenText = styled.span`
  position: absolute;
  visibility: hidden;
  white-space: nowrap;
  font: inherit;
  padding: 5px 10px;
`;

const ArrowIcon = styled(IoIosArrowDown)`
  position: absolute;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: rgba(119, 119, 119, 1);
`;

const MagnifyingIcon = styled(FaMagnifyingGlass)`
  color: rgba(119, 119, 119, 1);
  z-index: -1;
`;

export default Search;
