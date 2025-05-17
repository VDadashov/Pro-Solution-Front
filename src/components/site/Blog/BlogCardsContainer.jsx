import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useGet } from "@utils/hooks/useCustomQuery";
import { ENDPOINTS } from "@utils/constants/Endpoints";
import moment from "moment"
// const staticBlogs = [
//   {
//     date: "22",
//     month: "iyl",
//     title: "Ram-nədir?",
//     excerpt: "Ram-nədir?[...]",
//     to: "/blog/ram-nedir",
//     img: "https://i0.wp.com/prosolution.ltd/wp-content/uploads/2024/07/444444444444444.jpg?w=1080&ssl=1",
//   },
//   {
//     date: "13",
//     month: "iyn",
//     title: "CPU-nədir?",
//     excerpt: "CPU-nədir?[...]",
//     to: "/blog/ram-nedir",
//     img: "https://i0.wp.com/prosolution.ltd/wp-content/uploads/2024/06/2222222222222222222222222222222222222.jpg?w=1080&ssl=1",
//   },
//   {
//     date: "13",
//     month: "iyn",
//     title: "CPU-nədir?",
//     excerpt: "CPU-nədir?[...]",
//     to: "/blog/ram-nedir",
//     img: "https://i0.wp.com/prosolution.ltd/wp-content/uploads/2024/06/2222222222222222222222222222222222222.jpg?w=1080&ssl=1",
//   },
//   {
//     date: "13",
//     month: "iyn",
//     title: "CPU-nədir?",
//     excerpt: "CPU-nədir?[...]",
//     to: "/blog/ram-nedir",
//     img: "https://i0.wp.com/prosolution.ltd/wp-content/uploads/2024/06/2222222222222222222222222222222222222.jpg?w=1080&ssl=1",
//   },
//   {
//     date: "13",
//     month: "iyn",
//     title: "CPU-nədir?",
//     excerpt: "CPU-nədir?[...]",
//     to: "/blog/ram-nedir",
//     img: "https://i0.wp.com/prosolution.ltd/wp-content/uploads/2024/06/2222222222222222222222222222222222222.jpg?w=1080&ssl=1",
//   },
//   {
//     date: "13",
//     month: "iyn",
//     title: "CPU-nədir?",
//     excerpt: "CPU-nədir?[...]",
//     to: "/blog/ram-nedir",
//     img: "https://i0.wp.com/prosolution.ltd/wp-content/uploads/2024/06/2222222222222222222222222222222222222.jpg?w=1080&ssl=1",
//   },
//   {
//     date: "13",
//     month: "iyn",
//     title: "CPU-nədir?",
//     excerpt: "CPU-nədir?[...]",
//     to: "/blog/ram-nedir",
//     img: "https://i0.wp.com/prosolution.ltd/wp-content/uploads/2024/06/2222222222222222222222222222222222222.jpg?w=1080&ssl=1",
//   },
// ];

// const BlogListSkeleton= ()=>{
//   return (

//     <div>
//       <BlogCardsContainer>
//         {blogs?.map((blog, index) => (
//           <BlogCard key={index}>
//             <BlogDetail>
//               <BlogDate>
//                 <h3>{blogs.date}</h3>
//                 <p>{blogs.month}</p>
//               </BlogDate>
//               <BlogImg>
//                 <img src={blogs.img} alt={blogs.title} />
//               </BlogImg>
//             </BlogDetail>
//             <BlogContent>
//               <Question to={blogs.to}>{blogs.title}</Question>
//               <hr />
//               <p>{blogs.excerpt}</p>
//             </BlogContent>
//           </BlogCard>
//         ))}
//         {totalPages > 1 && (
//           <PaginationWrapper>
//             <PageButton
//               onClick={() => paginate(currentPage - 1)}
//               disabled={currentPage === 1}
//               hidden={currentPage === 1}
//             >
//               &laquo;
//             </PageButton>

//             {[...Array(totalPages)].map((_, index) => (
//               <PageButton
//                 key={index}
//                 onClick={() => paginate(index + 1)}
//                 active={currentPage === index + 1}
//               >
//                 {index + 1}
//               </PageButton>
//             ))}

//             <PageButton
//               onClick={() => paginate(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               hidden={currentPage === totalPages}
//             >
//               &raquo;
//             </PageButton>
//           </PaginationWrapper>
//         )}
//       </BlogCardsContainer>

//     </div>
//   )
// }

const BlogList = () => {
  const { data: blogs } = useGet("blogs", ENDPOINTS.blogs);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const totalPages = Math.ceil(blogs?.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <BlogCardsContainer>
        {currentPosts?.map((blog, index) => (
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
        ))}
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
    </div>
  );
};

export default BlogList;

const BlogCardsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 130vh;
  padding: 30px 0 30px 0;
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
  gap:10px;
  // background-color:green;
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
  // position: absolute;
  // top: 20px;
  // left: -10px;
  
  @media (max-width: 600px) {
    width: 40px;
    height: 40px;
    top: 50px;
    font-size: 13px;
  }
  /* @media (max-width: 400px) {
    width: 20px;
    height: 20px;
    top: 0px;
    font-size: 6px;
  } */
`;

const BlogImg = styled.div`
  height: 150px;
  width: 80%;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    height: 350px;
    cursor: pointer;
    object-fit: contain;
  }
`;

const BlogCard = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  padding-left: 50px;
  padding-right: 50px;

  // background-color:red; 

  &:hover ${BlogDate} {
    background-color: #149295;
    color: white;
  }
  @media (max-width: 550px) {
    flex-direction: column;
    padding: 0;
    width: 100%;
  }
  @media (max-width: 650px) {
    // gap: 10px;
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
