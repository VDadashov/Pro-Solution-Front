import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@layouts/site/Header'
import Footer from '@layouts/site/Footer'

const SiteRoot = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default SiteRoot