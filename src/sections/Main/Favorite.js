"use client"

import { useState } from "react"
import "../../static/css/Favorite.css"

// 이미지 임포트
import subImg1 from "../../static/image/Product/dummy/sub1.jpg"
import subImg2 from "../../static/image/Product/dummy/sub2.jpg"
import subImg3 from "../../static/image/Product/dummy/sub3.jpg"
import subImg4 from "../../static/image/Product/dummy/sub4.jpg"
import subImg5 from "../../static/image/Product/dummy/sub5.jpg"

// 상품 데이터 (실제 데이터로 교체 필요)
const products = [
  {
    id: 1,
    name: "Fender Stratocaster",
    image: subImg1,
    originalPrice: 1200000,
    salePrice: 980000,
    discount: 18,
    rating: 4.8,
    reviewCount: 127,
    soldCount: 352,
    badge: "베스트셀러",
    tag: "일렉기타",
  },
  {
    id: 2,
    name: "Gibson Les Paul Standard",
    image: subImg2,
    originalPrice: 2500000,
    salePrice: 2100000,
    discount: 16,
    rating: 4.9,
    reviewCount: 98,
    soldCount: 215,
    badge: "인기상품",
    tag: "일렉기타",
  },
  {
    id: 3,
    name: "Ibanez RG550",
    image: subImg3,
    originalPrice: 950000,
    salePrice: 760000,
    discount: 20,
    rating: 4.7,
    reviewCount: 84,
    soldCount: 189,
    badge: "가성비추천",
    tag: "일렉기타",
  },
  {
    id: 4,
    name: "Fender Jazz Bass",
    image: subImg4,
    originalPrice: 1350000,
    salePrice: 1150000,
    discount: 15,
    rating: 4.8,
    reviewCount: 76,
    soldCount: 142,
    badge: "MD추천",
    tag: "베이스기타",
  },
  {
    id: 5,
    name: "Taylor 214ce",
    image: subImg5,
    originalPrice: 1100000,
    salePrice: 890000,
    discount: 19,
    rating: 4.9,
    reviewCount: 112,
    soldCount: 231,
    badge: "인기상품",
    tag: "어쿠스틱기타",
  },
]

const Favorite = () => {
  const [hoveredItem, setHoveredItem] = useState(null)

  // 가격 포맷팅 함수
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"
  }

  return (
    <div className="w-full bg-gradient-to-b from-[#2C3E50] to-[#1A2530] py-16">
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-3">Editor's Choice</h2>
          <div className="flex items-center justify-center">
            <div className="h-0.5 w-12 bg-yellow-400"></div>
            <p className="text-gray-300 mx-4">가장 많은 사랑을 받은 인기 상품</p>
            <div className="h-0.5 w-12 bg-yellow-400"></div>
          </div>
        </div>

        {/* 상품 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="relative bg-white rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              onMouseEnter={() => setHoveredItem(product.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* 인기 배지 */}
              <div className="absolute top-3 left-3 z-10">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500 text-white">
                  {product.badge}
                </span>
              </div>

              {/* 판매량 배지 */}
              <div className="absolute top-3 right-3 z-10">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-500 text-white">
                  {product.soldCount}명 구매
                </span>
              </div>

              {/* 상품 이미지 */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                  style={{
                    transform: hoveredItem === product.id ? "scale(1.1)" : "scale(1)",
                  }}
                />

                {/* 호버 시 나타나는 오버레이 */}
                {hoveredItem === product.id && (
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300">
                    <button className="px-4 py-2 bg-white text-gray-900 rounded-md font-medium hover:bg-yellow-400 transition-colors">
                      상세보기
                    </button>
                  </div>
                )}
              </div>

              {/* 상품 정보 */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-medium text-gray-500">{product.tag}</span>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span className="ml-1 text-sm font-medium text-gray-700">{product.rating}</span>
                    <span className="ml-1 text-xs text-gray-500">({product.reviewCount})</span>
                  </div>
                </div>

                <h3 className="text-sm font-semibold text-gray-900 mb-2 truncate">{product.name}</h3>

                <div className="flex items-end">
                  <p className="text-lg font-bold text-gray-900">{formatPrice(product.salePrice)}</p>
                  <p className="ml-2 text-sm line-through text-gray-500">{formatPrice(product.originalPrice)}</p>
                  <p className="ml-2 text-sm font-medium text-red-600">{product.discount}%</p>
                </div>

                {/* 인기도 표시 바 */}
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-gradient-to-r from-yellow-400 to-red-500 h-1.5 rounded-full"
                      style={{ width: `${Math.min(100, product.soldCount / 4)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">인기도</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 더보기 버튼 */}
        <div className="text-center mt-10">
          <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-md hover:bg-white hover:text-gray-900 transition-colors duration-300 font-medium">
            인기 상품 더보기
          </button>
        </div>

      </div>
    </div>
  )
}

export default Favorite
