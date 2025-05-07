import React from 'react'
import styled from 'styled-components';
import AuthorsWrapper from "@components/site/Blog/Authors";
import CategoriesSidebar from "@components/site/Blog/CategoriesSidebar";

function SideBar() {
  return (
    <Sidebar>
      <AuthorsWrapper />
      <CategoriesSidebar />
    </Sidebar>
  );
}

export default SideBar

const Sidebar = styled.div`
`