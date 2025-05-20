import React from 'react'
import styled from 'styled-components';
import Authors from "@components/site/Blog/Authors";
import CategoriesSidebar from "@components/site/Blog/CategoriesSidebar";

function SideBar() {
  return (
    <Sidebar>
      <Authors />
      <CategoriesSidebar />
    </Sidebar>
  );
}

export default SideBar

const Sidebar = styled.div`
`