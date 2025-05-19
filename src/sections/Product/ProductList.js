"use client"

import { useState, useEffect } from "react"
import Header from "../Common/Header"
import Navbar from "../Common/Navbar"
import Footer from "../Common/Footer"
import ProductCard from "../../component/product/product-card.js"

function Shop() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 상품 데이터를 가져오는 함수 (실제로는 API 호출 등으로 대체)
    const fetchProducts = () => {
      // 임시 상품 데이터
      const dummyProducts = [
        {
          id: 1,
          name: "AMERICAN PROFESSIONAL II STRATOCASTER",
          brand: "Fender",
          price: 2350000,
          discountRate: 20,
          discountPrice: 1880000,
          image: "/placeholder.svg?height=300&width=200",
          isNew: true,
          isSale: true,
        },
        {
          id: 2,
          name: "SUB SERIES STINGRAY BASS",
          brand: "Sterling",
          price: 675000,
          discountRate: 10,
          discountPrice: 607500,
          image: "/placeholder.svg?height=300&width=200",
          isNew: false,
          isSale: true,
        },
        {
          id: 3,
          name: "MONSTER MASTER METALLIC TELECASTER",
          brand: "Fender",
          price: 3500000,
          discountRate: 25,
          discountPrice: 2625000,
          image: "/placeholder.svg?height=300&width=200",
          isNew: false,
          isSale: true,
        },
        {
          id: 4,
          name: "PIVOT CAPO",
          brand: "Dunlop",
          price: 45000,
          discountRate: 20,
          discountPrice: 36000,
          image: "/placeholder.svg?height=300&width=200",
          isNew: false,
          isSale: true,
        },
        {
          id: 5,
          name: "TIM HENSON SIGNATURE ELECTRIC GUITAR 3 TONES 6-38 GAUGE",
          brand: "Ernie Ball",
          price: 15000,
          discountRate: 0,
          discountPrice: 15000,
          image: "/placeholder.svg?height=300&width=200",
          isNew: true,
          isSale: false,
        },
        {
          id: 6,
          name: "TIM HENSON SIGNATURE STRINGS AND PICKS BUNDLE",
          brand: "Ernie Ball",
          price: 162000,
          discountRate: 30,
          discountPrice: 113400,
          image: "/placeholder.svg?height=300&width=200",
          isNew: false,
          isSale: true,
        },
        {
          id: 7,
          name: "TIM HENSON SIGNATURE CLASSICAL GUITAR STRINGS - MEDIUM TENSION",
          brand: "Ernie Ball",
          price: 35000,
          discountRate: 20,
          discountPrice: 28000,
          image: "/placeholder.svg?height=300&width=200",
          isNew: false,
          isSale: true,
        },
        {
          id: 8,
          name: "EARTHWOOD 80/20 BRONZE ACOUSTIC GUITAR 6 STRINGS",
          brand: "Ernie Ball",
          price: 25000,
          discountRate: 20,
          discountPrice: 20000,
          image: "/placeholder.svg?height=300&width=200",
          isNew: false,
          isSale: true,
        },
        {
          id: 9,
          name: "DELUXE STRATOCASTER JAPAN TEXAS MAPLE FADED FIESTA RED",
          brand: "Fender",
          price: 1413000,
          discountRate: 20,
          discountPrice: 1130400,
          image: "/placeholder.svg?height=300&width=200",
          isNew: false,
          isSale: true,
        },
        {
          id: 10,
          name: "2023 PACKAGE STERLING BASS",
          brand: "Sterling",
          price: 576000,
          discountRate: 20,
          discountPrice: 460800,
          image: "/placeholder.svg?height=300&width=200",
          isNew: true,
          isSale: true,
        },
        {
          id: 11,
          name: "2023 PACKAGE STERLING CT24",
          brand: "Sterling",
          price: 482000,
          discountRate: 20,
          discountPrice: 385600,
          image: "/placeholder.svg?height=300&width=200",
          isNew: true,
          isSale: true,
        },
        {
          id: 12,
          name: "POLYPRO GUITAR STRAP BLACK",
          brand: "Dunlop",
          price: 18000,
          discountRate: 20,
          discountPrice: 14400,
          image: "/placeholder.svg?height=300&width=200",
          isNew: false,
          isSale: true,
        },
        {
          id: 13,
          name: "GB651",
          brand: "Ibanez",
          price: 110000,
          discountRate: 20,
          discountPrice: 88000,
          image: "/placeholder.svg?height=300&width=200",
          isNew: false,
          isSale: true,
        },
        {
          id: 14,
          name: "STINGRAY SPECIAL H-H, OKOUME",
          brand: "Music Man",
          price: 3450000,
          discountRate: 20,
          discountPrice: 2760000,
          image: "/placeholder.svg?height=300&width=200",
          isNew: true,
          isSale: true,
        },
        {
          id: 15,
          name: "STINGRAY SPECIAL H-H, VINTAGE BLUE",
          brand: "Music Man",
          price: 3230000,
          discountRate: 20,
          discountPrice: 2584000,
          image: "/placeholder.svg?height=300&width=200",
          isNew: true,
          isSale: true,
        },
        {
          id: 16,
          name: "STINGRAY 5 H CUSTOM IVORY LAKEWOOD",
          brand: "Music Man",
          price: 3450000,
          discountRate: 20,
          discountPrice: 2760000,
          image: "/placeholder.svg?height=300&width=200",
          isNew: true,
          isSale: true,
        },
      ]

      setProducts(dummyProducts)
      setLoading(false)
    }

    fetchProducts()
  }, [])

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
              <p>Loading...</p>
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
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <p>Loading...</p>
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

export default Shop