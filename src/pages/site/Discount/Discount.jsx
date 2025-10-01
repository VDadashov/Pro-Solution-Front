
import CategoriesSidebar from '@components/site/Blog/CategoriesSideBar';
import CategoryProductCard, { CategoryProductCardSkelaton } from '@components/site/Category/CategoryCard';
import { ENDPOINTS } from '@utils/constants/Endpoints';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router';
import styled from 'styled-components';

const Discount = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const take = parseInt(searchParams.get("take")) || 8;
  const skip = parseInt(searchParams.get("skip")) || 1;
  const orderParam = searchParams.get("order");
  const order = orderParam !== null && orderParam !== "" ? parseInt(orderParam) : 1;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(skip);

  useEffect(() => {
    setLoading(true);
    const url = `${ENDPOINTS.getAllFiltered}?isDiscount=true&take=${take}&skip=${currentPage}&isDeleted=false&order=${order}`;
    fetch(url)
      .then((res) => res.json())
    .then((data) => {
  setProducts(data.items?.$values || []);
  setTotalPages(data.totalPage || 1);
  setLoading(false);
})

      .catch((err) => {
        console.error("Xəta baş verdi:", err);
        setLoading(false);
      });
  }, [order, take, currentPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);

    const params = new URLSearchParams(location.search);
    params.set("skip", pageNumber);
    navigate(`${location.pathname}?${params.toString()}`);
  };

  useEffect(() => {
    setCurrentPage(skip);
  }, [skip]);

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
                {loading
                  ? Array.from({ length: take }).map((_, index) => (
                      <CategoryProductCardSkelaton key={index} />
                    ))
                  : products.map((item) => (
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

const CategoryWrapper = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 580px) {
    margin-top: 50px;
  }
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