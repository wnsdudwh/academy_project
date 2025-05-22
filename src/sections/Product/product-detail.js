"use client"

import { useState, useEffect, useRef } from "react"
import { Share2, Heart, ShoppingCart, ChevronRight, Clock, ChevronLeft, ChevronRightIcon } from "lucide-react"

// static
import Header from "../Common/Header"
import Navbar from "../Common/Navbar"
import ProductTabs from "../../component/product/product-tabs"
import Sidebar from "../Common/Sidebar"
import ServiceForm from "../Common/service-form"
import Footer from "../Common/Footer"

const ProductDetail = () => {
  const [currentImage, setCurrentImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isImageHovered, setIsImageHovered] = useState(false)

  // 이미지 목록 - 무한 루프 테스트용
  const images = [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ]

  // 썸네일 스와이퍼 관련 상태 및 함수
  const [startIndex, setStartIndex] = useState(0)
  const thumbnailsRef = useRef(null)
  const visibleThumbnails = 7 // 한 번에 보여줄 썸네일 개수

  // 이미지 변경 함수 (무한 루프 적용)
  const changeImage = (direction) => {
    if (direction === "next") {
      setCurrentImage((prev) => (prev + 1) % images.length)
      // 현재 이미지가 보이는 썸네일 범위를 벗어나면 썸네일 슬라이드
      if (currentImage + 1 >= startIndex + visibleThumbnails) {
        setStartIndex((prev) => Math.min(prev + 1, images.length - visibleThumbnails))
      }
    } else {
      setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
      // 현재 이미지가 보이는 썸네일 범위를 벗어나면 썸네일 슬라이드
      if (currentImage - 1 < startIndex) {
        setStartIndex((prev) => Math.max(prev - 1, 0))
      }
    }
  }

  // 썸네일 슬라이드 함수
  const slideThumbnails = (direction) => {
    if (direction === "next") {
      setStartIndex((prev) => Math.min(prev + 1, images.length - visibleThumbnails))
    } else {
      setStartIndex((prev) => Math.max(prev - 1, 0))
    }
  }

  // 썸네일 클릭 시 이미지 변경
  const handleThumbnailClick = (index) => {
    setCurrentImage(index)
  }

  return (
    <>
    <Header />
    <Navbar />
      <div className="w-full">
        <div className="max-w-[1440px] mx-auto px-4 py-8">
          {/* 경로 표시 */}
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <a href="#" className="hover:text-gray-700">
              홈
            </a>
            <span className="mx-2">/</span>
            <a href="#" className="hover:text-gray-700">
              High
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 왼쪽: 이미지 섹션 */}
            <div className="space-y-4">
              {/* 메인 이미지 */}
              <div
                className="border rounded-lg overflow-hidden bg-white relative"
                onMouseEnter={() => setIsImageHovered(true)}
                onMouseLeave={() => setIsImageHovered(false)}
              >
                <div className="relative aspect-square">
                  <img
                    src={images[currentImage] || "/placeholder.svg"}
                    alt="STANDARD STRATOCASTER®"
                    className="w-full h-full object-contain"
                  />

                  {/* 메인 이미지 좌우 화살표 */}
                  <button
                    className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md transition-opacity ${
                      isImageHovered ? "opacity-80" : "opacity-0"
                    } hover:opacity-100`}
                    onClick={() => changeImage("prev")}
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>

                  <button
                    className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md transition-opacity ${
                      isImageHovered ? "opacity-80" : "opacity-0"
                    } hover:opacity-100`}
                    onClick={() => changeImage("next")}
                  >
                    <ChevronRightIcon className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>

              {/* 썸네일 이미지 슬라이더 */}
              <div className="relative">
                <div ref={thumbnailsRef} className="flex items-center">
                  {/* 왼쪽 화살표 */}
                  {startIndex > 0 && (
                    <button
                      className="absolute left-0 z-10 bg-white/80 rounded-full p-1 shadow-md hover:bg-white"
                      onClick={() => slideThumbnails("prev")}
                    >
                      <ChevronLeft className="w-4 h-4 text-gray-700" />
                    </button>
                  )}

                  {/* 썸네일 컨테이너 */}
                  <div className="flex-1 overflow-hidden mx-6">
                    <div
                      className="flex space-x-2 transition-transform duration-300 ease-out"
                      style={{ transform: `translateX(-${startIndex * (80 + 8)}px)` }}
                    >
                      {images.map((img, index) => (
                        <div
                          key={index}
                          className={`border rounded-md overflow-hidden flex-shrink-0 cursor-pointer transition-all ${
                            currentImage === index
                              ? "border-red-500 shadow-md scale-105"
                              : "border-gray-200 hover:border-gray-400"
                          }`}
                          onClick={() => handleThumbnailClick(index)}
                        >
                          <div className="w-20 h-20">
                            <img
                              src={img || "/placeholder.svg"}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 오른쪽 화살표 */}
                  {startIndex < images.length - visibleThumbnails && (
                    <button
                      className="absolute right-0 z-10 bg-white/80 rounded-full p-1 shadow-md hover:bg-white"
                      onClick={() => slideThumbnails("next")}
                    >
                      <ChevronRightIcon className="w-4 h-4 text-gray-700" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* 오른쪽: 상품 정보 섹션 */}
            <div className="space-y-6">
              {/* 상품명 */}
              <h1 className="text-2xl font-bold">STANDARD STRATOCASTER®</h1>

              {/* 가격 정보 */}
              <div className="space-y-3 border-b pb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">판매가</span>
                  <div className="flex items-center">
                    <span className="text-red-500 font-bold mr-2">20%</span>
                    <span className="text-xl font-bold">999,000원</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">소비자가</span>
                  <span className="text-gray-500 line-through">1,249,000원</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">적립금</span>
                  <span className="text-gray-700">19,980원 (2%)</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">배송비</span>
                  <span className="text-gray-700">2,500원 (50,000원 이상 구매 시 무료)</span>
                </div>
              </div>

              {/* 상품 상세 정보 */}
              <div className="space-y-3 border-b pb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">원산지</span>
                  <span className="text-gray-700">인도네시아</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">모델</span>
                  <span className="text-gray-700">026-0220-571</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">제품상품코드</span>
                  <span className="text-gray-700">FDEG-2819-CND</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">COLOR</span>
                  <div className="relative">
                    <select className="border rounded-md px-4 py-2 pr-8 appearance-none bg-white text-gray-700">
                      <option>- [필수] 옵션을 선택해 주세요 -</option>
                      <option>레드</option>
                      <option>블랙</option>
                      <option>화이트</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 카카오톡 문의 */}
              <div className="flex items-center bg-yellow-50 p-3 rounded-md">
                <div className="bg-yellow-400 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  <span className="text-black font-bold">톡</span>
                </div>
                <div className="flex-1">
                  <span className="text-sm">카카오톡 새로 추가하고 혜택받기</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-500" />
              </div>

              {/* 오늘출발 안내 */}
              <div className="flex items-center bg-red-50 p-3 rounded-md">
                <div className="bg-red-500 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-white">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">오늘출발 상품(오후 12시 전 주문 시)</div>
                  <div className="text-sm text-gray-600">11시간 21분 36초 내에 결제 시 오늘 바로 발송됩니다.</div>
                </div>
              </div>

              {/* 총 상품금액 */}
              <div className="flex justify-between items-center pt-4">
                <span className="font-medium">총 상품금액</span>
                <span className="text-xl font-bold">0</span>
              </div>

              {/* 버튼 그룹 */}
              <div className="grid grid-cols-12 gap-2">
                <button className="col-span-2 border rounded-md p-3 flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
                <button className="col-span-2 border rounded-md p-3 flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <Heart className="h-5 w-5 text-gray-600" />
                </button>
                <button className="col-span-2 border rounded-md p-3 flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <ShoppingCart className="h-5 w-5 text-gray-600" />
                </button>
                <button className="col-span-6 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-md p-3 font-medium shadow-md hover:from-indigo-700 hover:to-blue-600 transition-all whitespace-nowrap">
                  구매하기
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 이벤트 섹션 */}
        <div className="w-full my-10">
          <div className="max-w-[1440px] mx-auto">
            <h2 className="text-xl font-bold px-4 mb-4">이벤트</h2>
            <div className="w-full">
              <img src="/placeholder.svg?height=1600&width=1440" alt="이벤트 배너" className="w-full h-auto" />
            </div>
          </div>
        </div>

        {/* 탭 섹션 */}
        <ProductTabs />

        {/* 사이드바 */}
        <Sidebar />
      </div>
      <ServiceForm />
      <Footer />
  </>
  )
}

export default ProductDetail