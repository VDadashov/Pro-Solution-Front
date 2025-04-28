import React from "react";
import styled from "styled-components";

const AccountDetails = () => {
  return (
    <DetailContainer>
      <AccountText>
        Your account with Shop Pro Solution Aze is using a temporary password.
        We emailed you a link to change your password.
      </AccountText>
      <AccountForm>
        <FirstFormRow>
          <LabelContainer></LabelContainer>
        </FirstFormRow>
      </AccountForm>
    </DetailContainer>
  );
};

const DetailContainer = styled.div`
  color: #777777;
`;

const AccountText = styled.p`
  color: #777777;
`;

const AccountForm = styled.form`
  display: flex;
`;

const FirstFormRow = styled.div``;

const LabelContainer = styled.p``;

export default AccountDetails;
