import React, {useEffect, useState } from "react";
import styled from "styled-components";

const PriceFilter = ({ onChange, onSubmit, minPrice, maxPrice, rangeMin, rangeMax }) => {
  const min = rangeMin || 0;
  const max = rangeMax || 10000;
  const [minValue, setMinValue] = useState(minPrice ?? min);
  const [maxValue, setMaxValue] = useState(maxPrice ?? max);
console.log(rangeMin, rangeMax);

  useEffect(() => {
    setMinValue(minPrice ?? min);
    setMaxValue(maxPrice ?? max);
  }, [minPrice, maxPrice, min, max]);

  const getLeft = (value) => {
  if (max === min) return "0%";
  return `${((value - min) / (max - min)) * 100}%`;
};

  const handleMinChange = (value) => {
    const newValue = Math.min(Number(value), maxValue - 100);
    setMinValue(newValue);
  };

  const handleMaxChange = (value) => {
    const newValue = Math.max(Number(value), minValue + 100);
    setMaxValue(newValue);
  };

  const handleSubmit = () => {
    onChange({ min: minValue, max: maxValue });
    onSubmit();
  };

  return (
    <Wrapper>
      <RangeWrapper>
        <Track />
        <Thumb style={{ left: getLeft(minValue) }} />
        <Thumb style={{ left: getLeft(maxValue) }} />
        <RangeInput
          min={min}
          max={max}
          value={minValue}
          onChange={(e) => handleMinChange(e.target.value)}
        />
        <RangeInput
          min={min}
          max={max}
          value={maxValue}
          onChange={(e) => handleMaxChange(e.target.value)}
        />
      </RangeWrapper>

      <FooterRow>
        <Button onClick={handleSubmit}>Filtr</Button>
        <ValueInfo>
          Qiymət: <span>{minValue} ₼</span> — <span>{maxValue} ₼</span>
        </ValueInfo>
      </FooterRow>
    </Wrapper>
  );
};

export default PriceFilter

const Wrapper = styled.div`
  max-width: 280px;
  font-family: sans-serif;
`;


const RangeWrapper = styled.div`
  position: relative;
  height: 40px;
  margin: 1rem 0;
`;

const Track = styled.div`
  position: absolute;
  top: 18px;
  left: 0;
  right: 0;
  height: 4px;
  background: #aaa;
  border-radius: 2px;
  /* z-index: 1; */
`;

const Thumb = styled.span`
  position: absolute;
  top: 10px;
  width: 18px;
  height: 18px;
  background: #444;
  border: 2px solid white;
  border-radius: 50%;
  /* z-index: 2; */
  transform: translateX(-50%);
`;

const RangeInput = styled.input.attrs({ type: "range" })`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background: none;
  pointer-events: none;
  z-index: 3;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    pointer-events: auto;
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    opacity: 0;
  }

  &::-moz-range-thumb {
    pointer-events: auto;
    width: 18px;
    height: 18px;
    opacity: 0;
  }
`;

const FooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ValueInfo = styled.div`
  font-size: 0.9rem;

  color: #777;
  span {
    font-weight: 600;
    
    margin: 0 4px;
  }
`;

const Button = styled.button`
  background: #555;
  color: white;
  font-size: 0.85rem;
  border: none;
  border-radius: 20px;
  padding: 0.4rem 1rem;
  cursor: pointer;
@media (max-width:950px){
  padding: 0.2rem 0.7rem;
}
  &:hover {
    background: #333;
  }
`;


