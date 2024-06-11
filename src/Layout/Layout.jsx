import React from 'react'
import Header from './Header1'
import Footer from './Footer'
const Layout = ({children}) => {
  return (
    <>
    <Header/>
    <main>
    {children}
    </main>
    <Footer/>
    </>
  )
}

export default Layout
