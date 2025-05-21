"use client"

import { useState, useEffect } from "react"
import axios from "axios"
// static
import Header from "../Common/Header"
import Navbar from "../Common/Navbar"
import Footer from "../Common/Footer"

import ProductCard from "../../component/product/product-card"
import dummyProducts from "../../data/dummyProducts";

function ProductList() 
{
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => 
  {
    // 상품 데이터를 가져오는 함수 (더미 데이터도 섞었음)
    axios.get("http://localhost:8080/api/products")
    .then((res) => 
    {
      // 더미데이터를 ...로 위에 합쳐줌
      const combined = [...res.data, ...dummyProducts];
      setProducts(res.data);
      setLoading(false);
    })
    .catch((err) => 
    {
      console.error("상품 불러오기 실패", err);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* 카테고리 네비게이션 */}
        <div className="mb-8">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span>HOME</span>
            <span className="mx-2">/</span>
            <span className="font-semibold">SHOP</span>
          </div>

          {/* 필터 옵션 */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-8">
            <div className="border border-gray-200 p-2 flex justify-between items-center">
              <span className="text-xs">어쿠스틱 기타</span>
              <span className="text-xs">▼</span>
            </div>
            <div className="border border-gray-200 p-2 flex justify-between items-center">
              <span className="text-xs">일렉트릭</span>
              <span className="text-xs">▼</span>
            </div>
            <div className="border border-gray-200 p-2 flex justify-between items-center">
              <span className="text-xs">베이스</span>
              <span className="text-xs">▼</span>
            </div>
            <div className="border border-gray-200 p-2 flex justify-between items-center">
              <span className="text-xs">이펙터</span>
              <span className="text-xs">▼</span>
            </div>
            <div className="border border-gray-200 p-2 flex justify-between items-center">
              <span className="text-xs">앰프</span>
              <span className="text-xs">▼</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-8">
            <div className="border border-gray-200 p-2 flex justify-between items-center">
              <span className="text-xs">피크업</span>
              <span className="text-xs">▼</span>
            </div>
            <div className="border border-gray-200 p-2 flex justify-between items-center">
              <span className="text-xs">악세서리</span>
              <span className="text-xs">▼</span>
            </div>
            <div className="border border-gray-200 p-2 flex justify-between items-center">
              <span className="text-xs">스트링</span>
              <span className="text-xs">▼</span>
            </div>
            <div className="border border-gray-200 p-2 flex justify-between items-center">
              <span className="text-xs">케이스/가방</span>
              <span className="text-xs">▼</span>
            </div>
            <div className="border border-gray-200 p-2 flex justify-between items-center">
              <span className="text-xs">교재</span>
              <span className="text-xs">▼</span>
            </div>
          </div>
        </div>

        {/* 신상품 섹션 */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6">NEW ITEMS</h2>

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
        </div>

        {/* 모든 상품 섹션 */}
        <div className="mb-12">
          {/* 전체상품 임시추가 */}
        <h2 className="text-xl font-bold mb-6">전체 상품 보기</h2>  
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <p>상품 불러오는 중...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ProductList