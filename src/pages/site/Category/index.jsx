import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { RiEqualizerLine } from "react-icons/ri";
import PriceFilter from "@components/site/Category/FilterPrice";
import ActiveFilter from "@components/site/Category/ActiveFilter";
import ProcessorSelect from "@components/site/Category/ProcessorSelect";
import CategoriesSidebar from "@components/site/Blog/CategoriesSideBar";
import { useGet } from "@utils/hooks/useCustomQuery";
import { ENDPOINTS } from "@utils/constants/Endpoints";
import CategoryProductCard, { CategoryProductCardSkelaton } from "@components/site/Category/CategoryCard";
import { Helmet } from "react-helmet";
import { useCategory } from "@Context/CategoryContext";

const Category = () => {
  //   const [showFilter, setShowFilter] = useState(false);
  //   const [sortOption, setSortOption] = useState("Standart Sıralama");
  //   const [priceRange, setPriceRange] = useState({ min: null, max: null });
  //   const { data: products, isLoading } = useGet("products", ENDPOINTS.products);

  //   const location= useLocation();
  //  const [filteredItems, setFilteredItems] = useState([]);

  //  const searchParams=new URLSearchParams(location.search);
  //  const slug= searchParams.get("slug") || "";
  //  const search=searchParams.get("search") || "";

  //  useEffect(()=>{
  //   const filtered= products?.$values?.filter((product)=>{
  //     const matchesSlug = slug === "" || product.categorySlug === slug;
  //     const matchesSearch =
  //       search === "" ||
  //       product?.$values?.title.toLowerCase().includes(search.toLowerCase());
  //     return matchesSlug && matchesSearch;
  //   });
  //   setFilteredItems(filtered)
  //  }, [slug,search,products]
  // ) 
  // ;
  //   const handleClearMinPrice = () => {
  //     setPriceRange((prev) => ({ ...prev, min: null }));
  //   };
  //   const handleClearMaxPrice = () => {
  //     setPriceRange((prev) => ({ ...prev, max: null }));
  //   };
  //   const handlePriceChange = (range) => {
  //     setPriceRange(range);
  //   };
  //   const [filterApplied, setFilterApplied] = useState(false);

  //   useEffect(() => {
  //     if (priceRange.min === null && priceRange.max === null) {
  //       setFilterApplied(false);
  //     }
  //   }, [priceRange]);

  //   const parsePrice = (value) => {
  //     if (typeof value === "string") {
  //       return Number(value.replace(/[^\d.]/g, ""));
  //     }
  //     return Number(value);
  //   };
  //   const filteredProducts = products?.$values?.filter((item) => {

  //     const price = parsePrice(item.discountPrice > 0 ? item.discountPrice : item.price);

  //     const minValid = priceRange.min === null || price >= priceRange.min;
  //     const maxValid = priceRange.max === null || price <= priceRange.max;
  //     return minValid && maxValid;
  //   });

  //   const sortedProducts = (filteredProducts || []).sort((a, b) => {
  //     const priceA = parsePrice(a.discountPrice > 0 ? a.discountPrice : a.price);
  //     const priceB = parsePrice(b.discountPrice > 0 ? b.discountPrice : b.price);
  //     switch (sortOption) {
  //       case "Qiymət: aşağıdan yuxarı":
  //         return priceA - priceB;
  //       case "Qiymət: yuxarıdan aşağı":
  //         return priceB - priceA;
  //       case "Ən yüksək reytinq":
  //         return b.rating - a.rating;
  //       case "Ən yenilər":
  //         return new Date(b.createdAt) - new Date(a.createdAt);
  //       case "Populyarlığa görə":
  //         return b.popularity - a.popularity;
  //       default:
  //         return 0;
  //     }
  //   });

  //   const [currentPage, setCurrentPage] = useState(1);
  //   const productsPerPage = 8;
  //   const indexOfLastProduct = currentPage * productsPerPage;
  //   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  //   const currentProducts = sortedProducts.slice(
  //     indexOfFirstProduct,
  //     indexOfLastProduct
  //   );
  //   const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  //   const handlePageChange = (pageNumber) => {
  //     setCurrentPage(pageNumber);
  //   };
  //   useEffect(() => {
  //     setCurrentPage(1);
  //   }, [priceRange, sortOption]);



  const {
    showFilter,
    setShowFilter,
    sortOption,
    setSortOption,
    priceRange,
    setPriceRange,
    handlePriceChange,
    handleClearMinPrice,
    handleClearMaxPrice,
    filterApplied,
    setFilterApplied,
    currentProducts,
    currentPage,
    setCurrentPage,
    totalPages,
    isLoading,
    products,
  } = useCategory();


  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <CategoryWrapper>
        <CategoryContent>
          <CategoryHead>
            <div className="category-links">
              <ul>
                <li>
                  <Link>Əsas səhifə /</Link>
                </li>
                <li>
                  <Link>Noutbuklar</Link>
                </li>
                {
                  products?.categories?.map((item) => (
                    <li key={item.id}>
                      <Link>{item.title}</Link>
                    </li>
                  ))
                }
              </ul>
            </div>
            <ResponsiveFilter onClick={() => setShowFilter(true)}>
              <i>
                <RiEqualizerLine />
              </i>
              <p>Filtr</p>
            </ResponsiveFilter>
            <CategorySelect>
              <p>Lorem ipsum dolor sit amet.</p>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >

                <option value="Standart Sıralama">Standart Sıralama</option>
                <option value="A-dan Z-e">A-dan Z-e</option>
                <option value="Z-den A-ya">Z-den A-ya</option>
                <option value="Populyarlığa görə">Populyarlığa görə sırala</option>
                <option value="Ən yüksək reytinq">Ən yüksək reytinqə görə sırala</option>
                <option value="Ən sonuncular">Ən sonunculara görə sırala</option>
                <option value="Ən yenilər">Ən yenilərə görə sırala</option>
                <option value="Qiymət: aşağıdan yuxarı">
                  Qiymətə görə: aşağıdan yuxarı
                </option>
                <option value="Qiymət: yuxarıdan aşağı">
                  Qiymətə görə: yuxarıdan aşağı
                </option>
              </select>
            </CategorySelect>
          </CategoryHead>

          <CategoryBody>
            {showFilter && (
              <>
                <TransparentBackground
                  onClick={() => setShowFilter(false)}
                  $isOpenModal={showFilter}
                >
                  <ModalButton onClick={() => setShowFilter(false)}>
                    ×
                  </ModalButton>
                </TransparentBackground>
                <SidebarFilter $isOpenModal={showFilter}>
                  {filterApplied && (
                    <ActiveFiltr>
                      <h3>Aktiv Filtrlər</h3>
                      <hr />
                      <ActiveFilter
                        priceRange={priceRange}
                        onClearMin={() => {
                          handleClearMinPrice();
                          if (priceRange.max === null) setFilterApplied(false);
                        }}
                        onClearMax={() => {
                          handleClearMaxPrice();
                          if (priceRange.min === null) setFilterApplied(false);
                        }}
                      />
                    </ActiveFiltr>
                  )}
                  <div className="price-section">
                    <h3>QIYMƏT</h3>
                    <hr />
                    <PriceFilter
                      onChange={handlePriceChange}
                      onSubmit={() => setFilterApplied(true)}
                    />
                  </div>
                  <Processor>
                    <h3>PROSESSOR-AMD</h3>
                    <hr />
                    <select>
                      <option>AMD Ryzen 5tm 5600H</option>
                      <option>AMD Ryzen 7tm 6800H</option>
                    </select>
                  </Processor>
                  <ProcessorSelect />
                  <Categories>
                    <CategoriesSidebar />
                  </Categories>
                </SidebarFilter>
              </>
            )}

            <CategoryCardsWrapper>
              <CategoryCards>
                {isLoading
                  ? Array.from({ length: 8 }).map((_, index) => (
                    <CategoryProductCardSkelaton key={index} />
                  ))
                  : currentProducts?.map((item) => (
                    <CategoryProductCard key={item.$id || item.id} item={item} />
                  ))
                }
              </CategoryCards>

              {totalPages > 1 && (
                <PaginationWrapper>
                  <PageButton
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    hidden={currentPage === 1}
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
                    hidden={currentPage === totalPages}
                  >
                    &raquo;
                  </PageButton>
                </PaginationWrapper>
              )}
            </CategoryCardsWrapper>

            <CategoryFilter>
              {filterApplied && (
                <ActiveFiltr>
                  <h3>Aktiv Filtrlər</h3>
                  <hr />
                  <ActiveFilter
                    priceRange={priceRange}
                    onClearMin={() => {
                      handleClearMinPrice();
                      if (priceRange.max === null) setFilterApplied(false);
                    }}
                    onClearMax={() => {
                      handleClearMaxPrice();
                      if (priceRange.min === null) setFilterApplied(false);
                    }}
                  />
                </ActiveFiltr>
              )}
              <Price>
                <h3>Qiymət</h3>
                <hr />
                <PriceFilter
                  onChange={handlePriceChange}
                  onSubmit={() => setFilterApplied(true)}
                />
              </Price>
              <Processor>
                <h3>PROSESSOR-AMD</h3>
                <hr />
                <select name="" id="">
                  <option value="">AMD Ryzen 5tm 5600H</option>
                  <option value="">AMD Ryzen 7tm 6800H</option>
                </select>
              </Processor>
              <ProcessorSelect />
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

export default Category;

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
  @media (max-width: 950px) {
    width: 100%;
  }
`;
const CategoryHead = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  max-width: 95%;
  padding-bottom: 1rem;
  @media (max-width: 850px) {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  .category-links ul {
    display: flex;
    gap: 10px;
    li a {
      color: hsla(0, 0%, 40%, 0.7);
      font-weight: 400;
      line-height: 1.2;
      text-transform: uppercase;
      font-size: 1.15em;
    }
  }

  .category-select {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  .category-links ul {
    display: flex;
    gap: 10px;
    li a {
      color: hsla(0, 0%, 40%, 0.7);
      font-weight: 400;
      line-height: 1.2;
      text-transform: uppercase;
      font-size: 1.15em;
    }
  }
`;
const CategorySelect = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  color: gray;
  p {
    color: #777;
    line-height: 1.6;
  }
  @media (max-width: 850px) {
    p {
      display: none;
    }
  }

  select {
    color: #777;
    min-width: 280px;
    color: gray;
    width: 200px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #dedede;
    box-shadow: #dedede;
    outline: none;
  }
`;
const TransparentBackground = styled.div`
  visibility: ${({ $isOpenModal }) => ($isOpenModal ? "visible" : "hidden")};
  opacity: ${({ $isOpenModal }) => ($isOpenModal ? "0.6" : "0")};
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: #0b0b0b;
  z-index: 2;
  transition: 0.3s ease;
`;
const CategoryBody = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  @media (max-width: 850px) {
    flex-direction: column-reverse;
  }
`;
const CategoryCardsWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const CategoryCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
  width: 100%;
  @media (max-width: 1093px) {
    justify-content: center;
  }
`;
const ModalButton = styled.button`
  color: rgba(255, 255, 255, 0.51);
  position: absolute;
  right: 5px;
  top: 0px;
  cursor: pointer;
  font-size: 40px;
  font-weight: 100;
  line-height: 40px;
  background-color: transparent;
  border: none;
  z-index: 3;
`;
const SidebarFilter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 280px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 3;
  padding: 20px;
  overflow-y: auto;
  transition: transform 0.5s ease-in-out;
  transform: ${({ $isOpenModal }) =>
    $isOpenModal ? "translateX(0)" : "translateX(-270px)"};
  .price-section {
    padding-top: 1rem;
    padding-bottom: 20px;
    h3 {
      font-size: 1em;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #777;
    }

    hr {
      width: 40px;
      margin: 11px 0;
      border: 2px solid #0000001a;
    }
  }
  select {
    width: 100%;
  }
`;
const CategoryFilter = styled.div`
  width: 28%;
  @media (max-width: 850px) {
    display: none;
  }
`;
const ActiveFiltr = styled.div`
  h3 {
    font-size: 1em;
    font-weight: 600;
    letter-spacing: 0.05em;
    line-height: 1.05;
    text-transform: uppercase;
    color: #777;
  }
  hr {
    width: 40px;
    margin: 11px 0px;
    border: 2px solid #0000001a;
  }
`;
const Price = styled.div`
  padding-bottom: 20px;
  h3 {
    font-size: 1em;
    font-weight: 600;
    letter-spacing: 0.05em;
    line-height: 1.05;
    text-transform: uppercase;
    color: #777;
  }
  hr {
    width: 40px;
    margin: 11px 0px;
    border: 2px solid #0000001a;
  }
`;
const Categories = styled.div``;
const Processor = styled.div`
  margin-bottom: 1rem;
  line-height: 2.5;
  max-width: 300px;
  h3 {
    font-size: 1em;
    font-weight: 600;
    letter-spacing: 0.05em;
    line-height: 1.05;
    text-transform: uppercase;
    color: #777;
  }
  hr {
    width: 40px;
    margin: 11px 0px;
    border: 2px solid #0000001a;
  }

  select {
    display: block;
    width: 100%;
    color: #999;
    background-color: #fff;
    border: 1px solid #aaa;
    border-radius: 4px;
    line-height: 28px;
    font-size: 0.97em;
    padding: 5px 55px 5px 8px;
    outline: none;
    option{
 max-width: 280px !important;

    }
  }
`;
const ResponsiveFilter = styled.div`
  cursor: pointer;
  display: none;
  color: #777777;

  p {
    font-size: 16px;
    font-weight: bolder;
    line-height: 1.2;
    text-transform: uppercase;
  }
  i {
    font-size: 20px;
  }
  @media (max-width: 850px) {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    font-size: 25px;
  }
`;
