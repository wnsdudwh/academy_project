"use client"

import { useState, useEffect } from "react"
import axios from "axios"
// static
import Header from "../Common/Header"
import Navbar from "../Common/Navbar"
import Footer from "../Common/Footer"

import ProductCard from "../../component/product/product-card"
import dummyProducts from "../../data/dummyProducts"

function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentBrand, setCurrentBrand] = useState("전체")
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12

  useEffect(() => {
    // 상품 데이터를 가져오는 함수 (더미 데이터도 섞었음)
    axios
      .get("http://localhost:8080/api/products")
      .then((res) => {
        // 더미데이터를 ...로 위에 합쳐줌
        const combined = [...res.data, ...dummyProducts].sort((a, b) => b.id - a.id) // id 기준으로 내림차순 (최신순)
        setProducts(combined)
        setLoading(false)
      })
      .catch((err) => {
        console.error("상품 불러오기 실패", err)
        setLoading(false)
      })
  }, [])

  // 브랜드 필터링
  const filteredProducts =
    currentBrand === "전체"
      ? products
      : products.filter((product) => (product.brandName || product.brand) === currentBrand)

  // 페이지네이션
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  // 페이지 번호 배열 생성 (최대 5개)
  const pageNumbers = []
  const startPage = Math.max(1, Math.min(currentPage - 2, totalPages - 4))
  const endPage = Math.min(startPage + 4, totalPages)

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i)
  }

  return (
    <>
      <Header />
      <Navbar />
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 py-8">
          {/* 카테고리 네비게이션 */}
          <div className="mb-8">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span>HOME</span>
              <span className="mx-2">/</span>
              <span className="font-semibold">SHOP</span>
            </div>

            {/* 브랜드 필터 버튼 */}
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                className={`border border-gray-200 px-5 py-2.5 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors ${currentBrand === "전체" ? "bg-gray-100 border-gray-400 font-bold" : ""}`}
                onClick={() => setCurrentBrand("전체")}
              >
                전체
              </button>
              <button
                className={`border border-gray-200 px-5 py-2.5 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors ${currentBrand === "Fender" ? "bg-gray-100 border-gray-400 font-bold" : ""}`}
                onClick={() => setCurrentBrand("Fender")}
              >
                Fender
              </button>
              <button
                className={`border border-gray-200 px-5 py-2.5 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors ${currentBrand === "Ibanez" ? "bg-gray-100 border-gray-400 font-bold" : ""}`}
                onClick={() => setCurrentBrand("Ibanez")}
              >
                Ibanez
              </button>
              <button
                className={`border border-gray-200 px-5 py-2.5 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors ${currentBrand === "Ernie Ball" ? "bg-gray-100 border-gray-400 font-bold" : ""}`}
                onClick={() => setCurrentBrand("Ernie Ball")}
              >
                Ernie Ball
              </button>
              <button
                className={`border border-gray-200 px-5 py-2.5 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors ${currentBrand === "Strandberg" ? "bg-gray-100 border-gray-400 font-bold" : ""}`}
                onClick={() => setCurrentBrand("Strandberg")}
              >
                Strandberg
              </button>
              <button
                className={`border border-gray-200 px-5 py-2.5 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors ${currentBrand === "Music Man" ? "bg-gray-100 border-gray-400 font-bold" : ""}`}
                onClick={() => setCurrentBrand("Music Man")}
              >
                Music Man
              </button>
            </div>
          </div>

          {/* 신상품 섹션 - 전체 필터일 때만 표시 */}
          {currentBrand === "전체" && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-red-500"
                >
                  <path d="m12 2 2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6L12 2z" />
                </svg>
                <h2 className="text-xl font-bold text-red-600">이달의 신상품</h2>
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <p>로딩 중...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {products
                    .filter((product) => product.isNew)
                    .slice(0, 4)
                    .map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              )}
              <div className="border-b border-gray-200 opacity-50 mt-8"></div>
            </div>
          )}

          {/* 모든 상품 섹션 */}
          <div className="mb-12">
            {/* 전체상품 임시추가 */}
            <h2 className="text-xl font-bold mb-6">
              {currentBrand === "전체" ? "전체 상품 보기" : `${currentBrand} 상품`}
            </h2>
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <p>상품 불러오는 중...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

          {/* 페이지네이션 */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center items-center mt-10 mb-6">
              <nav className="flex items-center gap-1">
                <button
                  className="px-2 py-1 border rounded-md text-sm hover:bg-gray-100"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  <span className="sr-only">처음으로</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="11 17 6 12 11 7"></polyline>
                    <polyline points="18 17 13 12 18 7"></polyline>
                  </svg>
                </button>
                <button
                  className="px-2 py-1 border rounded-md text-sm hover:bg-gray-100"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <span className="sr-only">이전</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>

                <div className="flex items-center gap-1 mx-1">
                  {pageNumbers.map((page) => (
                    <button
                      key={page}
                      className={`w-8 h-8 flex items-center justify-center rounded-md text-sm ${page === currentPage ? "bg-gray-800 text-white" : "hover:bg-gray-100"}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  className="px-2 py-1 border rounded-md text-sm hover:bg-gray-100"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <span className="sr-only">다음</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
                <button
                  className="px-2 py-1 border rounded-md text-sm hover:bg-gray-100"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  <span className="sr-only">마지막으로</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="13 17 18 12 13 7"></polyline>
                    <polyline points="6 17 11 12 6 7"></polyline>
                  </svg>
                </button>
              </nav>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </>
  )
}

export default ProductList
