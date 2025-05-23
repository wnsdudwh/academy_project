"use client"

import { useState } from "react"
import "../../static/css/Product.css"
import subImg from "../../static/image/Product/dummy/thumb.jpg"

// 카테고리별 상품 데이터 (실제 데이터로 교체 필요)
const productData = {
  electric: [
    {
      id: 1,
      name: "Fender Player Stratocaster",
      image: subImg,
      price: 890000,
      originalPrice: 1050000,
      discount: 15,
      rating: 4.7,
      reviewCount: 86,
      isNew: true,
      isBestseller: true,
    },
    {
      id: 2,
      name: "Gibson Les Paul Studio",
      image: subImg,
      price: 1790000,
      originalPrice: 2100000,
      discount: 14,
      rating: 4.8,
      reviewCount: 64,
      isNew: false,
      isBestseller: true,
    },
    {
      id: 3,
      name: "PRS SE Custom 24",
      image: subImg,
      price: 1250000,
      originalPrice: 1390000,
      discount: 10,
      rating: 4.9,
      reviewCount: 42,
      isNew: true,
      isBestseller: false,
    },
    {
      id: 4,
      name: "Ibanez RG550",
      image: subImg,
      price: 1150000,
      originalPrice: 1290000,
      discount: 11,
      rating: 4.6,
      reviewCount: 38,
      isNew: false,
      isBestseller: false,
    },
  ],
  bass: [
    {
      id: 5,
      name: "Fender Player Jazz Bass",
      image: subImg,
      price: 950000,
      originalPrice: 1100000,
      discount: 14,
      rating: 4.8,
      reviewCount: 52,
      isNew: false,
      isBestseller: true,
    },
    {
      id: 6,
      name: "Ibanez SR500E",
      image: subImg,
      price: 850000,
      originalPrice: 950000,
      discount: 11,
      rating: 4.7,
      reviewCount: 36,
      isNew: true,
      isBestseller: false,
    },
    {
      id: 7,
      name: "Yamaha TRBX504",
      image: subImg,
      price: 720000,
      originalPrice: 790000,
      discount: 9,
      rating: 4.6,
      reviewCount: 28,
      isNew: false,
      isBestseller: false,
    },
    {
      id: 8,
      name: "Sterling by Music Man StingRay",
      image: subImg,
      price: 680000,
      originalPrice: 750000,
      discount: 9,
      rating: 4.5,
      reviewCount: 24,
      isNew: true,
      isBestseller: false,
    },
  ],
  acoustic: [
    {
      id: 9,
      name: "Martin D-15M",
      image: subImg,
      price: 1950000,
      originalPrice: 2200000,
      discount: 11,
      rating: 4.9,
      reviewCount: 48,
      isNew: false,
      isBestseller: true,
    },
    {
      id: 10,
      name: "Taylor 214ce",
      image: subImg,
      price: 1250000,
      originalPrice: 1390000,
      discount: 10,
      rating: 4.8,
      reviewCount: 56,
      isNew: false,
      isBestseller: true,
    },
    {
      id: 11,
      name: "Yamaha FG830",
      image: subImg,
      price: 450000,
      originalPrice: 490000,
      discount: 8,
      rating: 4.7,
      reviewCount: 72,
      isNew: false,
      isBestseller: false,
    },
    {
      id: 12,
      name: "Takamine GD30CE",
      image: subImg,
      price: 580000,
      originalPrice: 650000,
      discount: 11,
      rating: 4.6,
      reviewCount: 34,
      isNew: true,
      isBestseller: false,
    },
  ],
  effects: [
    {
      id: 13,
      name: "Boss GT-1000CORE",
      image: subImg,
      price: 780000,
      originalPrice: 850000,
      discount: 8,
      rating: 4.8,
      reviewCount: 32,
      isNew: true,
      isBestseller: true,
    },
    {
      id: 14,
      name: "Line 6 HX Stomp",
      image: subImg,
      price: 690000,
      originalPrice: 750000,
      discount: 8,
      rating: 4.9,
      reviewCount: 46,
      isNew: false,
      isBestseller: true,
    },
    {
      id: 15,
      name: "Neural DSP Quad Cortex",
      image: subImg,
      price: 1950000,
      originalPrice: 2100000,
      discount: 7,
      rating: 4.9,
      reviewCount: 28,
      isNew: true,
      isBestseller: false,
    },
    {
      id: 16,
      name: "Kemper Profiler Stage",
      image: subImg,
      price: 2350000,
      originalPrice: 2500000,
      discount: 6,
      rating: 4.8,
      reviewCount: 24,
      isNew: false,
      isBestseller: false,
    },
  ],
  accessories: [
    {
      id: 17,
      name: "Elixir Nanoweb 기타 스트링",
      image: subImg,
      price: 15000,
      originalPrice: 18000,
      discount: 17,
      rating: 4.8,
      reviewCount: 124,
      isNew: false,
      isBestseller: true,
    },
    {
      id: 18,
      name: "Dunlop Jazz III 피크 6개입",
      image: subImg,
      price: 8000,
      originalPrice: 10000,
      discount: 20,
      rating: 4.9,
      reviewCount: 186,
      isNew: false,
      isBestseller: true,
    },
    {
      id: 19,
      name: "Fender 프리미엄 기타 케이블",
      image: subImg,
      price: 35000,
      originalPrice: 42000,
      discount: 17,
      rating: 4.7,
      reviewCount: 78,
      isNew: false,
      isBestseller: false,
    },
    {
      id: 20,
      name: "Hercules 기타 스탠드",
      image: subImg,
      price: 45000,
      originalPrice: 52000,
      discount: 13,
      rating: 4.8,
      reviewCount: 64,
      isNew: true,
      isBestseller: false,
    },
  ],
}

// 카테고리 정의
const categories = [
  { id: "electric", name: "일렉기타" },
  { id: "bass", name: "베이스기타" },
  { id: "acoustic", name: "어쿠스틱기타" },
  { id: "effects", name: "멀티이펙터" },
  { id: "accessories", name: "악세서리" },
]

const Product = () => {
  // 현재 선택된 카테고리 (기본값: 일렉기타)
  const [activeCategory, setActiveCategory] = useState("electric")

  // 가격 포맷팅 함수
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"
  }

  // 현재 카테고리의 상품 목록
  const currentProducts = productData[activeCategory] || []

  return (
    <div className="max-w-[1440px] w-full mx-auto py-16 px-4 sm:px-6 lg:px-8">
      {/* 섹션 제목 */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Our Collection</h2>
        <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center">
          전체 상품 보기
          <svg
            className="ml-1 w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>

      {/* 카테고리 버튼 */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === category.id
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* 상품 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* 상품 이미지 */}
            <div className="relative">
              <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-64 object-cover" />
              {/* 배지 */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {product.isNew && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    NEW
                  </span>
                )}
                {product.isBestseller && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    BEST
                  </span>
                )}
              </div>
              {/* 할인율 배지 */}
              {product.discount > 0 && (
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-bold bg-red-500 text-white">
                    {product.discount}% OFF
                  </span>
                </div>
              )}
              {/* 빠른 보기 버튼 */}
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <button className="px-4 py-2 bg-white text-gray-900 rounded-md font-medium hover:bg-indigo-600 hover:text-white transition-colors">
                  빠른 보기
                </button>
              </div>
            </div>

            {/* 상품 정보 */}
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-1 truncate">{product.name}</h3>

              {/* 평점 */}
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <span className="ml-1 text-sm text-gray-500">({product.reviewCount})</span>
              </div>

              {/* 가격 정보 */}
              <div className="flex items-end">
                <p className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</p>
                {product.discount > 0 && (
                  <p className="ml-2 text-sm line-through text-gray-500">{formatPrice(product.originalPrice)}</p>
                )}
              </div>

              {/* 장바구니 버튼 */}
              <button className="mt-4 w-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center">
                <svg
                  className="w-5 h-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                장바구니
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 더보기 버튼 */}
      <div className="text-center mt-10">
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300 font-medium">
          {activeCategory === "electric"
            ? "일렉기타"
            : activeCategory === "bass"
              ? "베이스기타"
              : activeCategory === "acoustic"
                ? "어쿠스틱기타"
                : activeCategory === "effects"
                  ? "멀티이펙터"
                  : "악세서리"}{" "}
          더보기
        </button>
      </div>
    </div>
  )
}

export default Product
