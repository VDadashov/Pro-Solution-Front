
import styled from "styled-components";
import { RiEqualizerLine } from "react-icons/ri";
import PriceFilter from "@components/site/Category/FilterPrice";
import ActiveFilter from "@components/site/Category/ActiveFilter";
import ProcessorSelect from "@components/site/Category/ProcessorSelectIntel";
import CategoriesSidebar from "@components/site/Blog/CategoriesSideBar";
import CategoryProductCard, {
  CategoryProductCardSkelaton,
} from "@components/site/Category/CategoryCard";

import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ENDPOINTS } from "@utils/constants/Endpoints";
import { Link } from "react-router-dom";
import ProcessorSelectIntel from "@components/site/Category/ProcessorSelectIntel";
import ProsessorSelectAmd from "@components/site/Category/ProsessorSelectAmd";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: null, max: null });
  const [filterApplied, setFilterApplied] = useState(false);
  const [minAvailablePrice, setMinAvailablePrice] = useState(null);
  const [maxAvailablePrice, setMaxAvailablePrice] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { category } = useParams();
  const totalPages = products?.totalPage || 1;
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search") || "";
  const slug = searchParams.get("slug") || "";
  const take = parseInt(searchParams.get("take")) || 8;
  const skip = parseInt(searchParams.get("skip")) || 1;
  const orderParam = searchParams.get("order");
  const order = orderParam !== null && orderParam !== "" ? parseInt(orderParam) : 4;
  const minPriceRaw = searchParams.get("minPrice");
  const maxPriceRaw = searchParams.get("maxPrice");
  const minPrice = minPriceRaw !== null && minPriceRaw !== "undefined" ? parseFloat(minPriceRaw) : null;
  const maxPrice = maxPriceRaw !== null && maxPriceRaw !== "undefined" ? parseFloat(maxPriceRaw) : null;
  const featureId = searchParams.get("featureId") || "";

  useEffect(() => {
    setLoading(true);
    let url = `${ENDPOINTS.getAllFiltered}?slug=${slug}&search=${search}&take=${take}&skip=${skip}&isDeleted=false&isDiscount=false&featureId=${featureId}`;
    if (minPrice !== null) url += `&minPrice=${minPrice}`;
    if (maxPrice !== null) url += `&maxPrice=${maxPrice}`;
    if (order !== null) url += `&order=${order}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);

        if (minPrice === null && maxPrice === null) {
          setMinAvailablePrice(data?.minAvailablePrice || null);
          setMaxAvailablePrice(data?.maxAvailablePrice || null);
        }
      })
      .catch((err) => {
        console.error("Xəta baş verdi:", err);
        setLoading(false);
      });
  }, [slug, search, take, skip, order, minPrice, maxPrice, featureId]);


  useEffect(() => {
    if (priceRange.min === null && priceRange.max === null) {
      setFilterApplied(false);
    }
  }, [priceRange]);

  useEffect(() => {
    setPriceRange({ min: minPrice, max: maxPrice });
    setFilterApplied(minPrice !== null || maxPrice !== null);
  }, [minPrice, maxPrice]);

  const handlePriceChange = (range) => {
    setPriceRange(range);
    const params = new URLSearchParams(location.search);
    if (range.min !== null) params.set("minPrice", range.min);
    else params.delete("minPrice");
    if (range.max !== null) params.set("maxPrice", range.max);
    else params.delete("maxPrice");
    navigate(`${location.pathname}?${params.toString()}`);
    setFilterApplied(true);
  };
  const handleClearMinPrice = () => {
    setPriceRange((prev) => {
      const newRange = { ...prev, min: null };
      const params = new URLSearchParams(location.search);
      params.delete("minPrice");
      navigate(`${location.pathname}?${params.toString()}`);
      if (prev.max === null) setFilterApplied(false);
      return newRange;
    });
  };

  const handleClearMaxPrice = () => {
    setPriceRange((prev) => {
      const newRange = { ...prev, max: null };
      const params = new URLSearchParams(location.search);
      params.delete("maxPrice");
      navigate(`${location.pathname}?${params.toString()}`);
      if (prev.min === null) setFilterApplied(false);
      return newRange;
    });
  };
  const renderActiveFilters = () =>
    filterApplied && (
      <ActiveFiltr>
        <h3>Aktiv Filtrlər</h3>
        <hr />
        <ActiveFilter
          priceRange={priceRange}
          onClearMin={handleClearMinPrice}
          onClearMax={handleClearMaxPrice}
        />
      </ActiveFiltr>
    );
  const getShowingText = () => {
    if (!products?.count) return null;
    const start = take * (skip - 1) + 1;
    const end = Math.min(take * skip, products.count);
    return `${products.count} nəticədən ${start}-${end} nəticə göstərilir`;
  };


  const handlePageChange = (pageNumber) => {
    const newSkip = pageNumber;
    const params = new URLSearchParams(location.search);
    params.set("skip", newSkip);
    navigate(`${location.pathname}?${params.toString()}`);
  };



  return (
    <>
      <Helmet>
        <title>
          {search ? `"${search}" nəticələri - ` : ""}
          {category ? `${category} - ` : ""}
          Məhsullar
        </title>
      </Helmet>

      <CategoryWrapper>
        <CategoryContent>
          <CategoryHead>
            <div className="category-links">
              <ul>
                <li>
                  <Link>Əsas səhifə </Link>
                </li>
                <li>
                  <Link>
                    {category == undefined ? "/" : `/ ${category} /`}{" "}
                  </Link>
                  <Link> {search}</Link>
                </li>

              </ul>
            </div>

            <ResponsiveFilter onClick={() => setShowFilter(true)}>
              <i><RiEqualizerLine /></i>
              <p>Filtr</p>

            </ResponsiveFilter>

            <CategorySelect>
              <p>{getShowingText()}</p>
              <select
                value={order !== null ? order : ""}
                onChange={(e) => {
                  const params = new URLSearchParams(location.search);
                  if (e.target.value === "") {
                    params.delete("order");
                  } else {
                    params.set("order", e.target.value);
                  }
                  navigate(`${location.pathname}?${params.toString()}`);
                }}

              >
                <option value="4">Standart sıralama</option>
                <option value="5">Qiymət: aşağıdan yuxarı</option>
                <option value="6">Qiymət: yuxarıdan aşağı</option>
                <option value="7">Ən yüksək reytinq</option>
                <option value="8">Ən aşağı reytinq</option>
                <option value="2">Ən yenilər</option>
                <option value="9">Populyarlığa görə</option>
                <option value="1">A-dan Z-yə</option>
                <option value="3">Z-dən A-ya</option>
              </select>
            </CategorySelect>
          </CategoryHead>

          <CategoryBody>
            {showFilter && (
              <>
                <TransparentBackground onClick={() => setShowFilter(false)} $isOpenModal={showFilter}>
                  <ModalButton onClick={() => setShowFilter(false)}>×</ModalButton>
                </TransparentBackground>
                <SidebarFilter $isOpenModal={showFilter}>
                  {renderActiveFilters()}
                  <div className="price-section">
                    <h3>QIYMƏT</h3>
                    <hr />
                    <PriceFilter
                      minPrice={products?.minPrice}
                      maxPrice={products?.maxPrice}
                      rangeMin={minAvailablePrice}
                      rangeMax={maxAvailablePrice}
                      onChange={handlePriceChange}
                      onSubmit={() => setFilterApplied(true)}
                    />
                  </div>
                  <ProsessorSelectAmd products={products} />
                  <ProcessorSelectIntel products={products} />
                  <Categories>
                    <CategoriesSidebar />
                  </Categories>
                </SidebarFilter>
              </>
            )}

            <CategoryCardsWrapper>
              <CategoryCards>
                {isLoading
                  ? Array.from({ length: 8 }).map((_, i) => (
                    <CategoryProductCardSkelaton key={i} />
                  ))
                  : products?.items?.$values.length > 0
                    ? products?.items?.$values.map((item) => (
                      <CategoryProductCard key={item.$id || item.id} item={item} />
                    ))
                    : <p style={{ textAlign: "center", width: "100%" }}>Axtarışa uyğun məhsul tapılmadı.</p>
                }
              </CategoryCards>

              {totalPages >= 1 && (
                <PaginationWrapper>
                  <PageButton
                    onClick={() => handlePageChange(skip - 1)}
                    disabled={skip === 1}
                  >
                    &laquo;
                  </PageButton>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PageButton
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      active={skip === i + 1}
                    >
                      {i + 1}
                    </PageButton>
                  ))}
                  <PageButton
                    onClick={() => handlePageChange(skip + 1)}
                    disabled={skip === totalPages}
                  >
                    &raquo;
                  </PageButton>
                </PaginationWrapper>
              )}

            </CategoryCardsWrapper>

            <CategoryFilter>
              {renderActiveFilters()}
              <Price>
                <h3>Qiymət</h3>
                <hr />
                <PriceFilter
                  minPrice={products?.minPrice}
                  maxPrice={products?.maxPrice}
                  rangeMin={minAvailablePrice}
                  rangeMax={maxAvailablePrice}
                  onChange={handlePriceChange}
                  onSubmit={() => setFilterApplied(true)}
                />
              </Price>
              <ProsessorSelectAmd products={products} />
              <ProcessorSelectIntel products={products} />
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
const BoldText = styled.b`
color: black;
`
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
    @media (max-width: 1060px) {
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
  @media (max-width: 1250px) {
    width: 100%;

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
  gap: 15px;
  width: 100%;
  @media (max-width: 930px) {
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
    option {
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
