"use client"

import { useState, useEffect, useRef } from "react"

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState("상품상세")
  const [isSticky, setIsSticky] = useState(false)
  const tabsRef = useRef(null)

  const tabs = [
    { id: "상품상세", label: "상품상세" },
    { id: "구매안내", label: "구매안내" },
    { id: "상품후기", label: "상품후기", count: 0 },
    { id: "상품문의", label: "상품문의", count: 0 },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (tabsRef.current) {
        const tabsPosition = tabsRef.current.getBoundingClientRect().top
        // 헤더(64px) + 네비게이션바(48px) 높이를 고려하여 스티키 위치 조정
        setIsSticky(tabsPosition <= 112)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTab = (tabId) => {
    setActiveTab(tabId)
    const element = document.getElementById(tabId)
    if (element) {
      // 헤더와 네비게이션바, 탭 높이를 고려한 오프셋 조정
      const yOffset = isSticky ? -160 : -220
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  return (
    <>
      <div ref={tabsRef} className={`w-full bg-white ${isSticky ? "sticky top-[112px] z-30 shadow-sm" : ""}`}>
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center justify-between border-b h-[49px]">
            <div className="flex justify-center" style={{ width: "calc(100% - 120px)" }}>
              {tabs.map((tab) => (
                <button key={tab.id}
                  className={`w-[130px] h-full flex items-center justify-center relative ${
                    activeTab === tab.id ? "font-bold" : ""
                  }`}
                  onClick={() => scrollToTab(tab.id)}
                >
                  {tab.label}
                  {tab.count !== undefined && (
                    <span className={`ml-1 inline-flex items-center justify-center w-5 h-5 text-xs rounded-full bg-gray-800 text-white`}>
                      {tab.count}
                    </span>
                  )}
                  {activeTab === tab.id && (
                    <div className="absolute -bottom-[13px] left-[10px] right-[10px] h-[3px] bg-black rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
            {isSticky && (
              <button className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-2 mr-2 rounded shadow-md hover:from-indigo-700 hover:to-blue-600 transition-all whitespace-nowrap">
                구매하기
              </button>
            )}
          </div>
        </div>
      </div>

      <div id="상품상세" className="py-10 border-b">
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">상품상세</h2>
          <div className="space-y-8">
            <img src="/placeholder.svg?height=600&width=1200" alt="기타 상세 이미지" className="w-full h-auto" />

            <div>
              <h3 className="text-xl font-bold mb-4">FEATURES</h3>
              <p className="text-gray-700 mb-4">
                The inspiring sound of a Stratocaster is one of the foundations of Fender. Featuring this classic
                sound—bell-like high end, punchy mids and robust low end, combined with crystal-clear articulation—the
                Player Stratocaster is packed with authentic Fender feel and style. It's ready to serve your musical
                vision, it's versatile enough to handle any style of music and it's the perfect platform for creating
                your own sound.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">SPECIFICATIONS</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold mb-2">BODY</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>
                      <span className="font-medium">Body Material:</span> Alder
                    </li>
                    <li>
                      <span className="font-medium">Body Finish:</span> Gloss Polyester
                    </li>
                    <li>
                      <span className="font-medium">Body Shape:</span> Stratocaster®
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2">NECK</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>
                      <span className="font-medium">Neck Material:</span> Maple
                    </li>
                    <li>
                      <span className="font-medium">Neck Finish:</span> Satin Urethane
                    </li>
                    <li>
                      <span className="font-medium">Neck Shape:</span> "C" Shape
                    </li>
                    <li>
                      <span className="font-medium">Scale Length:</span> 25.5" (648 mm)
                    </li>
                    <li>
                      <span className="font-medium">Fingerboard Material:</span> Maple
                    </li>
                    <li>
                      <span className="font-medium">Fingerboard Radius:</span> 9.5" (241 mm)
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">COLOR</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <img src="/placeholder.svg?height=300&width=300" alt="Red" className="w-full h-auto border" />
                  <p className="text-center font-medium">Red</p>
                </div>
                <div className="space-y-2">
                  <img src="/placeholder.svg?height=300&width=300" alt="Black" className="w-full h-auto border" />
                  <p className="text-center font-medium">Black</p>
                </div>
                <div className="space-y-2">
                  <img src="/placeholder.svg?height=300&width=300" alt="Blue" className="w-full h-auto border" />
                  <p className="text-center font-medium">Blue</p>
                </div>
                <div className="space-y-2">
                  <img src="/placeholder.svg?height=300&width=300" alt="White" className="w-full h-auto border" />
                  <p className="text-center font-medium">White</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="구매안내" className="py-10 border-b">
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">구매안내</h2>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">배송정보</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>배송 방법: 택배</li>
                <li>배송 지역: 전국</li>
                <li>배송 비용: 2,500원 (50,000원 이상 구매 시 무료배송)</li>
                <li>배송 기간: 2~3일 (주말, 공휴일 제외)</li>
                <li>오후 12시 이전 결제완료 시 당일 출고됩니다.</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">교환 및 반품 안내</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>상품 수령 후 7일 이내에 교환/반품 신청이 가능합니다.</li>
                <li>상품이 훼손되었거나 사용한 흔적이 있는 경우 교환/반품이 불가능합니다.</li>
                <li>고객의 단순 변심으로 인한 교환/반품의 경우 왕복 배송비는 고객 부담입니다.</li>
                <li>상품 불량 또는 오배송의 경우 배송비는 판매자가 부담합니다.</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">A/S 안내</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>제품 구매일로부터 1년간 무상 A/S가 가능합니다. (소모품 제외)</li>
                <li>무상 A/S 기간이 지난 후에는 유상으로 A/S가 가능합니다.</li>
                <li>A/S 문의: 02-123-4567 (평일 10:00~18:00)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div id="상품후기" className="py-10 border-b">
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">상품후기 (0)</h2>
          <div className="text-center py-20 bg-gray-50">
            <p className="text-gray-500">등록된 상품후기가 없습니다.</p>
            <button className="mt-4 px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors">
              상품후기 작성하기
            </button>
          </div>
        </div>
      </div>

      <div id="상품문의" className="py-10">
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">상품문의 (0)</h2>
          <div className="text-center py-20 bg-gray-50">
            <p className="text-gray-500">등록된 상품문의가 없습니다.</p>
            <button className="mt-4 px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors">
              상품문의 작성하기
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductTabs