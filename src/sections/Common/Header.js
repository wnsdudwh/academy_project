"use client"

import { useState, useEffect } from "react"
import "../../static/css/Header.css"

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const token = localStorage.getItem("token")

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // 검색 모달 토글
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("nickname")
    window.location.href = "/"
  }

  return (
    <header
      className={`w-full border-b border-gray-200 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "h-16 bg-white" : "h-20 bg-white"
      }`}
      id="header"
    >
      <div className="header max-w-[1280px] w-full h-full mx-auto flex flex-row justify-between items-center px-4">
        {/* 로고 영역 */}
        <div className="logo-zone basis-1/4">
          <a href="/">
            <h1 className="text-2xl font-bold text-indigo-600">GuitarShop</h1>
          </a>
        </div>

        {/* 퀵메뉴 영역 */}
        <div className="quick-menu basis-1/2 flex justify-end gap-6 items-center">
          {/* 검색 버튼 */}
          <button onClick={toggleSearch} className="text-gray-700 hover:text-indigo-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>

          {/* 로그인 상태에 따른 아이콘 표시 */}
          {token ? (
            <>
              {/* 마이페이지 */}
              <a href="/mypage" className="text-gray-700 hover:text-indigo-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
              </a>

              {/* 최근 본 상품 */}
              <a href="/recent" className="text-gray-700 hover:text-indigo-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
              </a>

              {/* 장바구니 */}
              <a href="/cart" className="text-gray-700 hover:text-indigo-600 transition-colors relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  ></path>
                </svg>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </a>

              {/* 로그아웃 */}
              <button onClick={handleLogout} className="text-gray-700 hover:text-indigo-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  ></path>
                </svg>
              </button>

              {/* 출석체크 버튼 - 로그인 시에만 표시 */}
              <a
                href="/attendance"
                className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-md"
              >
                출석체크
              </a>
            </>
          ) : (
            <>
              {/* 로그인 - 더 직관적인 아이콘으로 변경 */}
              <a href="/login" className="text-gray-700 hover:text-indigo-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  ></path>
                </svg>
              </a>

              {/* 회원가입 */}
              <a href="/register" className="text-gray-700 hover:text-indigo-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  ></path>
                </svg>
              </a>

              {/* 최근 본 상품 */}
              <a href="/recent" className="text-gray-700 hover:text-indigo-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
              </a>
            </>
          )}
        </div>
      </div>

      {/* 검색 모달 */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20 animate-fadeIn">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative animate-slideDown">
            <button onClick={toggleSearch} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">검색</h2>
              <form className="relative">
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  className="w-full border border-gray-300 rounded-full py-3 px-5 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </button>
              </form>
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <a href="#" className="hover:text-indigo-600">
                전체 상품
              </a>
              <span>|</span>
              <a href="#" className="hover:text-indigo-600">
                최근 검색어
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header