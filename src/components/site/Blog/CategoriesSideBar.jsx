
import React, { useEffect,useState } from "react";
import styled from "styled-components";
import AuthorsWrapper from "@components/site/Blog/Authors";

const CategoriesSidebar = ({  }) => {
  // const [data,setData]=useState([])


  const categories = [
    { name: "Acer", count: 17 },
    { name: "Aksespointlər", count: 9 },
    { name: "Ana Platalar", count: 45 },
    { name: "Asus", count: 24 },
    { name: "Dell", count: 13 },
    { name: "Flaşkartlar", count: 19 },
    { name: "HDD", count: 9 },
    { name: "HP", count: 59 },
    { name: "HP", count: 12 },
    { name: "Kabel", count: 12 },
    { name: "Kalonkalar", count: 15 },
    { name: "Keyslər", count: 20 },
    { name: "Klaviaturalar", count: 22 },
    { name: "Kompüter Aksesuarları", count: 165 },
    { name: "Kompüter Hissələri", count: 206 },
    { name: "Lenovo", count: 23 },
    { name: "Masaüstü Kompüter", count: 34 },
    { name: "Mauslar", count: 52 },
    { name: "Mobil Cihazlar", count: 88 },
    { name: "Monitorlar", count: 47 },
    { name: "Monobloklar", count: 17 },
    { name: "MousePad", count: 10 },
    { name: "MSI", count: 10 },
    { name: "Məişət Texnikası", count: 26 },
    { name: "Noutbuklar", count: 145 },
    { name: "Operativ Yaddaşlar", count: 26 },
    { name: "Planşetlər", count: 24 },
    { name: "Printerlər", count: 24 },
    { name: "Printer və Skanerlər", count: 31 },
    { name: "Prosessorlar", count: 25 },
    { name: "Qida Blokları", count: 17 },
    { name: "Serverlər", count: 17 },
    { name: "Soyutma Sistemləri", count: 20 },
    { name: "SSD", count: 28 },
    { name: "Sviçlər", count: 19 },
    { name: "Telefonlar", count: 52 },
    { name: "TV", count: 9 },
    { name: "Xarici HDD", count: 13 }, // Added
    { name: "Yaddaş Daşıyıcıları", count: 35 }, // Added
    { name: "Zavod istehsalı", count: 12 }, // Added
    { name: "Çantalar", count: 14 }, // Added
    { name: "Şəbəkə adapterləri", count: 14 }, // Added
    { name: "Şəbəkə Avadanlıqları", count: 50 }, // Added
  ];



  // const [products, setProducts]= useState([])
  // const [categories, setCategories]= useState([])
  //   useEffect(() => {
  //     fetch("http://localhost:3000/products")
  //     .then((res)=>res.json())
  //     .then(data=>{
  //       setProducts(data)
  //     })
  //     ;
  //   }, []);

  //   useEffect(()=>{
  //     fetch("http://localhost:3000/categories")
  //     .then((res)=>res.json())
  //     .then(cat=>{
  //       setCategories(cat)
  //     })
  //   },[])
    
  //  const productCount = products.filter(
  //    (product) => product.categoryId === categories.id
  //  ).length;

  //  const [products, setProducts]=useState([])
  //  const uniqueCategories = [
  //    ...new Set(products.map((product) => product.category)),
  //  ];

   




  return (
    <SidebarWrapper>
      <AuthorsWrapper/>
      <CategoriesHead>
        <h4>KATEQORİYALAR</h4>
        <hr />
      </CategoriesHead>
      <CategoriesSection>
        {categories.map((category, index) => (
          
          <React.Fragment key={index}>
            <button>{category.name} ({category.count})</button>
          </React.Fragment>
        ))}
      </CategoriesSection>
    </SidebarWrapper>
  );
};

export default CategoriesSidebar;

const SidebarWrapper = styled.div`

  width: 250px;
  padding: 20px;
  display:flex;
  align-items:flex-start;
  flex-direction:column;

  height: 100%;

  h4 {
    color: gray;
    margin-bottom: 10px;
  }
  hr{
  width:50px;
  border-top: 2px solid #ececec
  }

  button {
    background-color: transparent;
    border: 1px solid #149295;
    color: #149295;
    border-radius: 3px;
    padding: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
      background-color: #149295;
      color: #fff;
    }

  }
`;

const CategoriesSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  gap: 5px;
  height: 90%;


`;

const CategoriesHead = styled.div`
  flex-shrink: 0;
  padding-bottom: 30px;
`;

// const
