import React from 'react'
import styled from 'styled-components';
import Authors from "@components/site/Blog/Authors";
import CategoriesSideBar from "./CategoriesSideBar";

function SideBar() {
  return (
    <Sidebar>
      <Authors />
      <CategoriesSideBar />
    </Sidebar>
  );
}

export default SideBar

const Sidebar = styled.div`
@media (max-width:850px){
padding:30px;
}
`