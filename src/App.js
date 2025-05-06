import Aos from "aos";
import 'aos/dist/aos.css';
import React, { useEffect } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from "./sections/Main/Main.js";

import Register from './sections/Login/Register.js';
import Login from "./sections/Login/Login.js";


function App() {

  // Aos 초기화
  useEffect(() => {
    Aos.init({});
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>



    </>
  );
}

export default App;
