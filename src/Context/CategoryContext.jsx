import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGet } from "@utils/hooks/useCustomQuery"; 
import { ENDPOINTS } from "@utils/constants/Endpoints";

const CategoryContext = createContext();

export const useCategory = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }) => {
  const location = useLocation();
  const [showFilter, setShowFilter] = useState(false);
  const [sortOption, setSortOption] = useState("Standart Sıralama");
  const [priceRange, setPriceRange] = useState({ min: null, max: null });
  const [filterApplied, setFilterApplied] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: products, isLoading } = useGet("products", ENDPOINTS.products);

  const searchParams = new URLSearchParams(location.search);
  const slug = searchParams.get("slug") || "";
  const search = searchParams.get("search") || "";

  const parsePrice = (value) => {
    if (typeof value === "string") return Number(value.replace(/[^\d.]/g, ""));
    return Number(value);
  };

  const filteredBySlugSearch = products?.$values?.filter((product) => {
    const matchesSlug = slug === "" || product.categorySlug === slug;
    const matchesSearch =
      search === "" ||
      product?.$values?.title.toLowerCase().includes(search.toLowerCase());
    return matchesSlug && matchesSearch;
  });

  const filteredProducts = filteredBySlugSearch?.filter((item) => {
    const price = parsePrice(
      item.discountPrice > 0 ? item.discountPrice : item.price
    );
    const minValid = priceRange.min === null || price >= priceRange.min;
    const maxValid = priceRange.max === null || price <= priceRange.max;
    return minValid && maxValid;
  });

  const sortedProducts = (filteredProducts || []).sort((a, b) => {
    const priceA = parsePrice(a.discountPrice > 0 ? a.discountPrice : a.price);
    const priceB = parsePrice(b.discountPrice > 0 ? b.discountPrice : b.price);
    switch (sortOption) {
      case "Qiymət: aşağıdan yuxarı":
        return priceA - priceB;
      case "Qiymət: yuxarıdan aşağı":
        return priceB - priceA;
      case "Ən yüksək reytinq":
        return b.rating - a.rating;
      case "Ən yenilər":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "Populyarlığa görə":
        return b.popularity - a.popularity;
      default:
        return 0;
    }
  });

  const productsPerPage = 8;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [priceRange, sortOption]);

  useEffect(() => {
    if (priceRange.min === null && priceRange.max === null) {
      setFilterApplied(false);
    }
  }, [priceRange]);

  return (
    <CategoryContext.Provider
      value={{
        showFilter,
        setShowFilter,
        sortOption,
        setSortOption,
        priceRange,
        setPriceRange,
        handlePriceChange: setPriceRange,
        filterApplied,
        setFilterApplied,
        currentPage,
        setCurrentPage,
        currentProducts,
        totalPages,
        isLoading,
        products,
        handleClearMinPrice: () =>
          setPriceRange((prev) => ({ ...prev, min: null })),
        handleClearMaxPrice: () =>
          setPriceRange((prev) => ({ ...prev, max: null })),
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
