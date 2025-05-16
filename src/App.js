import Aos from "aos";
import 'aos/dist/aos.css';
import React, { useEffect } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from "./sections/Main/Main.js";

import Register from './sections/Login/Register.js';
import Login from "./sections/Login/Login.js";

import AttendanceCheck from "./component/mypage/attendance-check.jsx";
import MyPage from "./component/mypage/my-page.js"
import MyPageEdit from "./component/mypage/profile-edit.js"

function App() 
{
  // Aos 초기화
  useEffect(() => 
  {
    Aos.init({});
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/attendance/check" element={<AttendanceCheck />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/edit" element={<MyPage />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
