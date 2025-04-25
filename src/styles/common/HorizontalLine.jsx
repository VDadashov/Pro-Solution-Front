import React from 'react'
import styled from 'styled-components';
function HorizontalLine({ width, height, color, margin }) {
  return (
    <StyledLine width={width} height={height} color={color} margin={margin} />
  );
}

export default HorizontalLine


const StyledLine = styled.div`
  width: ${(props) => props.width || "30px"};
  border-top: ${(props) => props.height || "2px"} solid
    ${(props) => props.color || "#ececec"};
  margin: ${(props) => props.margin || "20px 0"};
`;