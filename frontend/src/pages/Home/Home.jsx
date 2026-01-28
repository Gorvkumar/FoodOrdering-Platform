import React from 'react'
import Navbar from '../../components/common/Navbar'
import HeroSection from './HeroSection'
import FoodItem from '../../components/common/FoodItem'

import Footer from '../../components/common/Footer'



const Home = () => {
  return (
    <>
     <div>
        <Navbar/>
        <HeroSection/>
        <FoodItem/>
        <Footer/>
     </div>
    </>
  )
}

export default Home;