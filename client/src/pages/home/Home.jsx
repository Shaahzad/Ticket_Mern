import React from 'react'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import Featured from '../../components/featured/Featured'
import "./home.css"
import Propertylist from '../../components/propertylist/propertylist'
import Featureproperty from '../../components/featuredproperty/featureproperty'
import Maillist from '../../components/mailist/maillist'
import Footer from '../../components/footer/footer'
const Home = () => {
  return (
    <div>
      <Navbar/>
      <Header/>
      <div className="homeContainer">
        <Featured/>
        <h1 className="hometitle">Browse By Property Type</h1>
        <Propertylist/>
        <h1 className="hometitle">Homes guests love</h1>
        <Featureproperty/>
        <Maillist/>
        <Footer/>
      </div>
    </div>
  )
}

export default Home