"use client"

import Aos from "aos"
import "aos/dist/aos.css"
import { useEffect } from "react"
import { Toaster } from "react-hot-toast"

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Main from "./sections/Main/Main.js"

import Register from "./sections/Login/Register.js"
import Login from "./sections/Login/Login.js"

import AttendanceCheck from "./component/mypage/attendance-check.js"
import MyPage from "./component/mypage/my-page.js"
import MyPageEdit from "./component/mypage/profile-edit.js"

import ProductList from "./sections/Product/product-list.js"
import ProductDetail from "./sections/Product/product-detail.js"

// 관리자 페이지 컴포넌트 import
import AdminDashboard from "./sections/Admin/AdminDashboard.js"
import ProductRegister from "./sections/Admin/ProductRegister"
import AdminProductList from "./sections/Admin/AdminProductList"
import ProductEdit from "./sections/Admin/ProductEdit"
import OrderManagement from "./sections/Admin/OrderManagement"
import UserManagement from "./sections/Admin/UserManagement"
import AdminSettings from "./sections/Admin/AdminSettings"

// 장바구니 페이지
import Cart from "./sections/Cart/Cart.jsx"

// 소셜 로그인
import OAuthRedirectHandler from "./component/auth/OAuthRedirectHandler.jsx"

function App() {
  // Aos 초기화
  useEffect(() => {
    Aos.init({})
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* 기존 라우트 */}
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/attendance/check" element={<AttendanceCheck />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/edit" element={<MyPageEdit />} />
          <Route path="/product" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* 장바구니 페이지 라우트 */}
          <Route path="/cart" element={<Cart />} />

          {/* 관리자 페이지 라우트 */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProductList />} />
          <Route path="/admin/products/register" element={<ProductRegister />} />
          <Route path="/admin/products/edit/:id" element={<ProductEdit />} />
          <Route path="/admin/orders" element={<OrderManagement />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/settings" element={<AdminSettings />} />

          {/* 소셜 로그인 라우트 */}
          <Route path="/oauth-redirect" element={<OAuthRedirectHandler />} />

        </Routes>

        {/* 토스트 알림 컴포넌트 */}
        <Toaster position="top-right" />
      </BrowserRouter>
    </>
  )
}

export default App