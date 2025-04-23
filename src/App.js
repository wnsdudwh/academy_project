import React, { useEffect } from 'react'
import Aos from "aos";
import 'aos/dist/aos.css';

import Header from "./sections/Header";
import Navvar from "./sections/Navvar.js";
import Main from "./sections/Main";
import BestOf from "./sections/BestOf";
import Favorite from "./sections/Favorite";
import Product from "./sections/Product";
import Trending from "./sections/Trending";
import Commodity from "./sections/Commodity";
import Footer from "./sections/Footer";

function App() {

  // Aos 초기화
  useEffect(() => {
    Aos.init({});
  }, [])

  return (
    <>
      <Header />
      <Navvar />
      <Main />
      <BestOf />
      <Favorite />
      <Product />
      <Trending />
      <Commodity />
      <Footer />
    </>
  );
}

export default App;
