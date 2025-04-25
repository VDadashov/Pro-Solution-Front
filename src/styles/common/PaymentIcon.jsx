import React from "react";
import styled from "styled-components";

const StyledPaymentIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: hsla(0, 0%, 100%, 0.1);
  border-radius: 5px;
  margin: 3px;
  opacity: 0.6;
  padding: 3px 10px;
  transition: opacity 0.3s;
  &:hover {
    opacity: 1;
  }
`;

const StyledIcon = styled.div`
  font-size: 2rem;
  color: #fff;
`;

function PaymentIcon({ iconName }) {
  return (
    <div>
      <StyledPaymentIcon>
        <StyledIcon as={iconName} />
      </StyledPaymentIcon>
    </div>
  );
}

export default PaymentIcon;
