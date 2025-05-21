import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGet } from "@utils/hooks/useCustomQuery";
import { ENDPOINTS } from "@utils/constants/Endpoints";
import moment from "moment"
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

  const BlogSkeleton= ({index})=>{
    return (
      <BlogCardsContainer key={`skeleton-${index}`}>
        <BlogCard>
          <BlogDetail>
            <div>
              <LoadingSkeleton width={"50px"} height={"50px"} />
            </div>
            <BlogImg>
              <LoadingSkeleton width={"250px"} height={"150px"} />
            </BlogImg>
          </BlogDetail>
          <BlogContent>
            <Question>
              <LoadingSkeleton width={"100px"} height={20} />
            </Question>
            <hr />
            <LoadingSkeleton width={"100px"} height={20} />
          </BlogContent>
        </BlogCard>
      </BlogCardsContainer>
    );
  }

const BlogList = () => {
  const { data: blogs, isLoading } = useGet("blogs", ENDPOINTS.blogs);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const totalPages = Math.ceil(blogs?.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <BlogCardsContainer>
        {isLoading ? (
          <>
            {Array.from({ length: 3 }).map((_, index) => (
              <BlogSkeleton key={index}/>
            ))}
          </>
        ) : (
          currentPosts?.map((blog, index) => (
            <BlogCard key={index}>
              <BlogDetail>
                <BlogDate>
                  <h3>{moment(blog?.createdAt).format("MM")}</h3>
                  <p>{moment(blog?.createdAt).format("MMMM")}</p>
                </BlogDate>
                <BlogImg>
                  <img src={blog.imageUrl} alt={blog.title} loading="lazy" />
                </BlogImg>
              </BlogDetail>
              <BlogContent>
                <Question to={blog.id}>{blog.title}</Question>
                <hr />
                <p>{blog.title}</p>
              </BlogContent>
            </BlogCard>
          ))
        )}
        {totalPages > 1 && (
          <PaginationWrapper>
            <PageButton
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              hidden={currentPage === 1}
            >
              &laquo;
            </PageButton>

            {[...Array(totalPages)].map((_, index) => (
              <PageButton
                key={index}
                onClick={() => paginate(index + 1)}
                active={currentPage === index + 1}
              >
                {index + 1}
              </PageButton>
            ))}

            <PageButton
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              hidden={currentPage === totalPages}
            >
              &raquo;
            </PageButton>
          </PaginationWrapper>
        )}
      </BlogCardsContainer>
    </>
  );
};

export default BlogList;

const BlogCardsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 30vh;
  gap:50px;
  // background-color:green;

    @media (max-width:850px){
  display:flex;
  justify-content:center;
  align-items:center;
  gap:100px;

  }
`;

const BlogContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
// background-color:green;
width:200px;
  hr {
    width: 30px;
    border-top: 3px solid lightgray;
  }
  p {
    color: gray;
    font-size: 13px;
  }
`;
const BlogDetail = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  gap: 10px;
  // background-color: green;
  @media (max-width: 600px) {
    width: 100%;
  }
    
`;
const BlogDate = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 45px;
  height: 45px;
  border: 2px solid #149295;
  background-color: transparent;
  color: #149295;
  transition: all 0.3s ease;
  position: absolute;
  top: 5px;
  left: -30px;

  @media (max-width: 600px) {
    width: 40px;
    height: 40px;
    top: 0px;
    font-size: 13px;
    left: 0px;
  }
  /* @media (max-width: 400px) {
    width: 20px;
    height: 20px;
    top: 0px;
    font-size: 6px;
  } */
  @media (max-width: 550px) {
  }
  // @media (max-width: 1240px) {
  //   position: absolute;
  //   left: 2000px px;
  // }
`;

const BlogImg = styled.div`
  // height: 200px;
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background-color: blue;
  img {
    width: 100%;
    height: 100%;
    cursor: pointer;
    object-fit: cover;
  }
`;

const BlogCard = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  padding-left: 50px;
  padding-right: 50px;
  position:relative;
  // background-color:yellow; 

  &:hover ${BlogDate} {
    background-color: #149295;
    color: white;
  }
  @media (max-width: 550px) {
    flex-direction: column;
    padding: 0;
    width: 100%;
    display:flex;
    justify-content:center;
    align-items:center;

  }
  @media (max-width: 650px) {
    gap: 10px;
    width: 100%;
  }
`;

const Question = styled(Link)`
  color: #149295;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: #000000;
    transition: all 0.1s ease;
  }
`;

const PageButton = styled.button`
  display: ${(props) => (props.hidden ? "none" : "inline-block")};
  background: ${(props) => (props.active ? "#00A6A6" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#333")};
  border: 1px solid #ddd;
  padding: 8px 14px;
  border-radius: 50%;
  font-weight: bold;
  font-size: 16px;
  min-width: 40px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled):not([hidden]) {
    background-color: #00a6a6;
    color: #fff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
  gap: 10px;
`;
