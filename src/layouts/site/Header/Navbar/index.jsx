import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useGet } from "@utils/hooks/useCustomQuery";
import { ENDPOINTS } from "@utils/constants/Endpoints";
import { WishlistContext } from "@Context/wishlistContext";

const Navbar = () => {
  const location = useLocation();
  const [iScrolled, setIsScrolled] = useState(false);
  const { wishlist } = useContext(WishlistContext);
  const { data: categories } = useGet("categories", ENDPOINTS.categories);
  const navigate = useNavigate();

  console.log(categories)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  function toKebabCase(str) {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')       // insert dash between camelCase
      .replace(/[\s_]+/g, '-')                   // replace spaces and underscores with dash
      .toLowerCase();                            // lowercase everything
  }
  const isHomePage = location.pathname === "/";

  return (
    <NavigationBar>
      <StyledNavbarContainer>
        <NavContainer>
          <NavLeft>
            <HeaderNav>
              <ProductsLi>
                <FaBars />
                <Link to={"/category"}> Məhsullarımız</Link>
                <ArrowDown />
                <CategoryListContainer
                  className={iScrolled || !isHomePage ? "hoverable" : ""}
                >
                  <CategoryList>
                    {categories?.$values?.map((item) => (
                      <CategoryElement key={item.name} onClick={() => navigate(`/category/${toKebabCase(item.title)}`)}>
                        {item.title}

                        <ArrowForward />

                        <SubCategoryList>
                          {item?.categoryItems?.$values?.map((categoryItem) => (
                            <SubCategoryElement key={categoryItem.title}
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/product-category/${toKebabCase(item.title)}/${toKebabCase(categoryItem.title)}`
                                );
                              }}>

                              {categoryItem.title}


                            </SubCategoryElement>
                          ))}
                        </SubCategoryList>
                      </CategoryElement>
                    ))}
                  </CategoryList>

                </CategoryListContainer>
              </ProductsLi>
              <StyledNavigationLi>
                <NavbarLink to={"/discount"} activeclassname="active">
                  <SeperaterLine>
                    <SeperatorLineBorder>Endirimlər</SeperatorLineBorder>
                  </SeperaterLine>
                </NavbarLink>
              </StyledNavigationLi>
              <StyledNavigationLi>
                <NavbarLink to={"/blog"} activeclassname="active">
                  <SeperaterLine>
                    <SeperatorLineBorder>Bloq</SeperatorLineBorder>
                  </SeperaterLine>
                </NavbarLink>
              </StyledNavigationLi>
              <StyledNavigationLi>
                <NavbarLink to={"/contact"} activeclassname="active">
                  <SeperaterLine>
                    <SeperatorLineBorder>Əlaqə</SeperatorLineBorder>
                  </SeperaterLine>
                </NavbarLink>
              </StyledNavigationLi>
            </HeaderNav>
          </NavLeft>
          <NavbarLink to={"/wishlist"} activeclassname="active">
            <WishlistButton>
              <WishlistText>
                Seçilmişlər
                {wishlist.length > 0 ? (
                  <WishlistLength>{wishlist.length}</WishlistLength>
                ) : (
                  <></>
                )}
              </WishlistText>
              <HeartIcon />
            </WishlistButton>
          </NavbarLink>
        </NavContainer>
      </StyledNavbarContainer>
    </NavigationBar>
  );
};
const CategoryLink = styled(Link)`
width:"100%";
height:"100%";

`
const NavbarLink = styled(NavLink)`
  &.active {
    color: #fff;
  }
`;

const StyledNavbarContainer = styled.div`
  max-width: 1224px;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  padding: 0 20px;
`;

const NavigationBar = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #149295;
  height: 50px;
  @media (max-width: 850px) {
    display: none;
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const NavLeft = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const HeaderNav = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const ProductsLi = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  gap: 10px;
  color: #fff;
  padding-right: 100px;
  &:hover > div {
    display: block;
  }
`;

const CategoryListContainer = styled.div`
  z-index: 2;
  display: ${({ className }) => (className === "hoverable" ? "none" : "block")};
  position: absolute;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.15);
  color: hsla(0, 0%, 40%, 0.85);
  top: 100%;
  left: 0;
  width: 100%;
  &.hoverable {
    opacity: 0;
    visibility: hidden;
    transition: 0.6s;
  }
  ${ProductsLi}:hover & {
    opacity: 1;
    visibleity: visible;
  }
`;

const CategoryList = styled.ul`
  position: relative;
`;

const CategoryElement = styled.li`
  border-top: 1px solid #ececec;
  background-color: #ffffff;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9em;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }

  &:hover > ul {
    display: block;
  }
`;

const SubCategoryList = styled.ul`
  display: none;
  position: absolute;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.15);
  color: hsla(0, 0%, 40%, 0.85);
  background-color: #ffffff;
  left: 100%;
  top: 0;
  height: 100%;
  width: 100%;
  cursor: default;
`;

const SubCategoryElement = styled.li`
  border-top: 1px solid #ececec;
  font-size: 16px;
  background-color: #ffffff;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const StyledNavigationLi = styled.li`
  height: 100%;
  color: hsla(0, 0%, 100%, 0.8);
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
  a {
    width: 100%;
    height: 100%;
  }
`;

const SeperaterLine = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const SeperatorLineBorder = styled.div`
  padding: 0px 10px;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  border-color: hsla(0, 0%, 100%, 0.2);
`;

const WishlistButton = styled.button`
  position: relative;
  background-color: #149295;
  display: flex;
  align-items: center;
  color: #fff;
  border: none;
  outline: none;
  border-radius: 99px;
  padding: 5px 10px;
  gap: 5px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  cursor: pointer;
  &:hover {
    background-color: #157778;
  }
`;

const WishlistLength = styled.span`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: -6px;
  top: -6px;
  background-color: #d26e4b;
  border-radius: 99px;
  box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.3);
  color: #fff;
  width: 17px;
  height: 17px;
  font-size: 14px;
`;

const WishlistText = styled.span`
  font-weight: bolder;
`;

const ArrowDown = styled(IoIosArrowDown)`
  position: absolute;
  top: 50%;
  right: 2px;
  transform: translate(-50%, -50%);
`;

const ArrowForward = styled(IoIosArrowForward)``;

const HeartIcon = styled(FaRegHeart)`
  height: 100%;
  font-size: 18px;
`;

export default Navbar;
