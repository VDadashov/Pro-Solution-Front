import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import SideBar from "@components/site/Blog/SideBar";

const Blog = () => {
  return (
    <BlogWrapper>
      <ContentArea>
        <ScrollContent>
          <Outlet />
        </ScrollContent>
        <VerticalLine></VerticalLine>
        <SidebarContainer>
          <SideBar/>
        </SidebarContainer>
      </ContentArea>
    </BlogWrapper>
  );
};

export default Blog;


const BlogWrapper = styled.div`
  // height: 140vh !important;

  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;




const SidebarContainer = styled.div`
  width: 21%;
  @media (max-width: 850px) {
    width: 100%;
  }

`;

const VerticalLine = styled.div`
  height: 90%;
  border-left: 1px solid #ececec;
  @media (max-width: 850px) {
    display: none;
  }
`;

const ScrollContent = styled.div`
  width: 70%;
  height: 100%;
  padding-right: 20px;
  /* overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrolllbar {
    display: none;

  } */
  @media (max-width: 850px) {
    /* height: 1000px; */
    width: 100%;
    padding: 0 20px;

  }
`;
const ContentArea = styled.div`
  display: flex;
  height: 90%;

  /* width: 90%; */
  width: 100%;
  max-width: 1224px;
  /* border: 1px solid #f2f2f2; */
  @media (max-width: 850px) {
    flex-direction: column;
  }

`;
