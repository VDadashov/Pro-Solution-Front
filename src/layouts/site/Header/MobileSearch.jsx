import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useGet } from "@utils/hooks/useCustomQuery";
import { ENDPOINTS } from "@utils/constants/Endpoints";

const MobileSearch = () => {
  const { data: categories } = useGet("categories", ENDPOINTS.categories);
  const [selected, setSelected] = useState("All");
  const [selectWidth, setSelectWidth] = useState(0);
  const textMeasureRef = useRef(null);

  useEffect(() => {
    if (textMeasureRef.current) {
      setSelectWidth(textMeasureRef.current.offsetWidth + 20);
    }
  }, [selected]);

  return (
    <SearchContainer>
      <SelectWrapper>
        <HiddenText ref={textMeasureRef}>{selected}</HiddenText>
        <SearchCategories
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          style={{ width: `${selectWidth}px` }}
        >
          <option key={"All"} value={"All"}>
            All
          </option>
          {categories?.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </SearchCategories>
        <ArrowIcon />
      </SelectWrapper>
      <SearchBar
        style={{
          width: `calc(100% - ${selectWidth}px - 5px)`,
        }}
      >
        <SearchInput type="search" placeholder="Axtar..." />
        <MagnifyingIcon />
      </SearchBar>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  max-width: 260px;
  padding: 0px 20px;
  margin-bottom: 15px;
`;

const SelectWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchBar = styled.div`
  position: relative;
  height: 100%;
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
  position: absolute;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(119, 119, 119, 1);
  z-index: -1;
`;

export default MobileSearch;
