
import CategoriesSidebar from '@components/site/Blog/CategoriesSideBar';
import CategoryProductCard, { CategoryProductCardSkelaton } from '@components/site/Category/CategoryCard';
import { ENDPOINTS } from '@utils/constants/Endpoints';
import { useGet } from '@utils/hooks/useCustomQuery';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

const Discount = () => {
  const { data: products, isLoading } = useGet("products", ENDPOINTS.products);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  const productsArray = products?.$values || [];
  const totalPages = Math.ceil(productsArray.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = productsArray.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Helmet>
        <title>Discount</title>
      </Helmet>
      <CategoryWrapper>
        <CategoryContent>
          <CategoryBody>
            <CategoryCardsWrapper>
              <CategoryCards>
                {isLoading
                  ? Array.from({ length: 8 }).map((_, index) => (
                      <CategoryProductCardSkelaton key={index} />
                    ))
                  : currentPosts.map((item) => (
                      <CategoryProductCard key={item.id} item={item} />
                    ))}
              </CategoryCards>

              {totalPages > 1 && (
                <PaginationWrapper>
                  <PageButton
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    &laquo;
                  </PageButton>

                  {[...Array(totalPages)].map((_, index) => (
                    <PageButton
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      active={currentPage === index + 1}
                    >
                      {index + 1}
                    </PageButton>
                  ))}

                  <PageButton
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    &raquo;
                  </PageButton>
                </PaginationWrapper>
              )}
            </CategoryCardsWrapper>

            <CategoryFilter>
              <Categories>
                <CategoriesSidebar />
              </Categories>
            </CategoryFilter>
          </CategoryBody>
        </CategoryContent>
      </CategoryWrapper>
    </>
  );
};

export default Discount;

// Styled Components
const CategoryWrapper = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategoryContent = styled.div`
  min-height: 100vh;
  width: 80%;
  padding: 20px;
  @media (max-width: 980px) {
    width: 100%;
  }
`;

const CategoryBody = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  @media (max-width: 855px) {
    flex-direction: column;
  }
`;

const CategoryCardsWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 855px) {
    width: 100%;
  }
`;

const CategoryCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 30px;
  width: 100%;
  @media (max-width: 833px) {
    justify-content: center;
  }
`;

const CategoryFilter = styled.div`
  width: 25%;
  @media (max-width: 850px) {
    width: 100%;
    margin-top: 20px;
  }
`;

const Categories = styled.div``;

const PageButton = styled.button`
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

  &:hover:not(:disabled) {
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