import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useGet } from "@utils/hooks/useCustomQuery";
import { ENDPOINTS } from "@utils/constants/Endpoints";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";

const renderSkeleton = () => (
  <SkeletonItem>
    <Skeleton width={30} height={30} style={{ marginRight: "15px" }} />
    <div style={{ flex: 1 }}>
      <Skeleton height={20} width="80%" />
      <Skeleton height={16} width="60%" />
    </div>
  </SkeletonItem>
);
const Search = ({ $isMobile }) => {
  const { data: categories } = useGet("categories", ENDPOINTS.categories);
  const [selected, setSelected] = useState("Hamısı");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectWidth, setSelectWidth] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const textMeasureRef = useRef(null);
  const navigate = useNavigate();
  const handleSearch = () => {
    setSearchInput("");
    setShowDropdown(false);
    const slugParam = selected === "Hamısı" ? "" : selected;
    const query = `?slug=${slugParam}&search=${encodeURIComponent(
      searchInput
    )}`;
    navigate(`/product-category/${slugParam}${query}`);
  };

  useEffect(() => {
    if (searchInput.length > 0) {
      console.log(searchInput);
      const fetchSuggestions = async () => {
        setLoading(true); // Start loading
        const slugParam = selected === "Hamısı" ? "" : selected;

        try {
          const { data } = await axios.get(
            `${
              ENDPOINTS.getAllFiltered
            }?slug=${slugParam}&order=${4}&search=${searchInput}&take=${100}&skip=${1}&isDeleted=false&isDiscount=false`
          );
          setSuggestions(data);
          // console.log(data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false); // Stop loading
        }
      };

      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchInput, selected]);

  useEffect(() => {
    if (textMeasureRef.current) {
      setSelectWidth(textMeasureRef.current.offsetWidth + 20);
    }
  }, [selected]);

  const handleItemClick = (slug) => {
    setSearchInput("");
    setShowDropdown(false);
    navigate(`/category/${slug}`);
  };

  const highlightMatch = (text, query) => {
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text;
    return (
      <>
        {text.slice(0, index)}
        <strong>{text.slice(index, index + query.length)}</strong>
        {text.slice(index + query.length)}
      </>
    );
  };  

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
          <option key={"Hamısı"} value={"Hamısı"}>
            Hamısı
          </option>
          {categories?.$values?.map((category) => (
            <option key={category.id} value={category.slug}>
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
          onChange={(e) => {
            setSearchInput(e.target.value);
            setShowDropdown(e.target.value.trim().length > 0);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <SearchButton>
          <MagnifyingIcon onClick={handleSearch} />
        </SearchButton>

        {showDropdown && (
          <Dropdown>
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <li key={index}>{renderSkeleton()}</li>
                ))
              : suggestions?.items?.$values?.map((suggestion, index) => (
                  <DropdownItem
                    key={index}
                    onClick={() => handleItemClick(suggestion?.detailSlug)}
                  >
                    <ItemLogo
                      src={suggestion.images?.$values[0]?.imagePath}
                      alt={suggestion.title}
                    />
                    <ItemDetails>
                      <ItemTitle>
                        {highlightMatch(suggestion.title, searchInput)}
                        {suggestion.lastVersion &&
                          ` -v${suggestion?.lastVersion}`}
                      </ItemTitle>
                      <ItemCategory>{suggestion.subTitle}</ItemCategory>
                    </ItemDetails>
                  </DropdownItem>
                ))}
          </Dropdown>
        )}
      </SearchBar>
    </SearchContainer>
  );
};
const SkeletonItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 20px;
`;
const Dropdown = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  position: absolute;
  top: 100%;
  left: 0;
  background: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  z-index: 1000;
  max-height: 250px;
  overflow-y: auto;
`;

const DropdownItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ItemLogo = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 15px;
  object-fit: contain;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemTitle = styled.span`
  font-size: 14px;
  color: #333;
  font-family: Nunito-Regular400;
`;

const ItemCategory = styled.span`
  font-size: 12px;
  color: #999;
`;

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
