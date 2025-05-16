"use client"

import { useState, useEffect, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "../../static/css/Navbar.css"

// 브랜드 데이터
const brandData = {
  electric: [
    { name: "Fender", image: "https://images.unsplash.com/photo-1550985616-10810253b84d?w=500&h=350&fit=crop" },
    { name: "Gibson", image: "https://images.unsplash.com/photo-1556449895-a33c9dba33dd?w=500&h=350&fit=crop" },
    { name: "Ibanez", image: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=500&h=350&fit=crop" },
    { name: "PRS", image: "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=500&h=350&fit=crop" },
    { name: "Strandberg", image: "https://images.unsplash.com/photo-1519508234439-4f23643125c1?w=500&h=350&fit=crop" },
  ],
  bass: [
    { name: "Fender", image: "https://images.unsplash.com/photo-1445985543470-41fba5c3144a?w=500&h=350&fit=crop" },
    { name: "Music Man", image: "https://images.unsplash.com/photo-1460036521480-ff49c08c2781?w=500&h=350&fit=crop" },
    { name: "Ibanez", image: "https://images.unsplash.com/photo-1558098329-a11cff621064?w=500&h=350&fit=crop" },
    { name: "Warwick", image: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=500&h=350&fit=crop" },
    { name: "Yamaha", image: "https://images.unsplash.com/photo-1471560090527-d1af5e4e6eb6?w=500&h=350&fit=crop" },
  ],
  acoustic: [
    { name: "Martin", image: "https://images.unsplash.com/photo-1485278537138-e3d104ef8c17?w=500&h=350&fit=crop" },
    { name: "Taylor", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&h=350&fit=crop" },
    { name: "Gibson", image: "https://images.unsplash.com/photo-1555221573-85b5c7b76f38?w=500&h=350&fit=crop" },
    { name: "Yamaha", image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=500&h=350&fit=crop" },
    { name: "Takamine", image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=500&h=350&fit=crop" },
  ],
  effects: [
    { name: "Boss", image: "https://images.unsplash.com/photo-1527865118650-b28bc059d09a?w=500&h=350&fit=crop" },
    { name: "Strymon", image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=500&h=350&fit=crop" },
    { name: "Line 6", image: "https://images.unsplash.com/photo-1567595747138-a862213ad6b8?w=500&h=350&fit=crop" },
    { name: "Kemper", image: "https://images.unsplash.com/photo-1519508551149-8b27a61d5e36?w=500&h=350&fit=crop" },
    { name: "Neural DSP", image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=500&h=350&fit=crop" },
  ],
  accessories: [
    { name: "Elixir", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=350&fit=crop" },
    { name: "Dunlop", image: "https://images.unsplash.com/photo-1516747773440-e92290b8c1b5?w=500&h=350&fit=crop" },
    { name: "Ernie Ball", image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=500&h=350&fit=crop" },
    { name: "D'Addario", image: "https://images.unsplash.com/photo-1556449895-a33c9dba33dd?w=500&h=350&fit=crop" },
    { name: "Levy's", image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=500&h=350&fit=crop" },
  ],
}

// 메인 메뉴 데이터
const menuItems = [
  {
    id: "electric",
    name: "일렉기타",
    featured: [
      {
        name: "Fender Stratocaster",
        image: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=500&h=500&fit=crop",
        description: "최고의 음색과 플레이감을 경험해보세요",
      },
      {
        name: "Gibson Les Paul",
        image: "https://images.unsplash.com/photo-1550985616-10810253b84d?w=500&h=500&fit=crop",
        description: "풍부한 서스테인과 깊은 울림의 클래식 기타",
      },
      {
        name: "PRS Custom 24",
        image: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=500&h=500&fit=crop",
        description: "완벽한 밸런스와 다재다능한 톤의 프리미엄 기타",
      },
    ],
  },
  {
    id: "bass",
    name: "베이스기타",
    featured: [
      {
        name: "Fender Jazz Bass",
        image: "https://images.unsplash.com/photo-1445985543470-41fba5c3144a?w=500&h=500&fit=crop",
        description: "다양한 장르에 적합한 베이스 기타",
      },
      {
        name: "Music Man StingRay",
        image: "https://images.unsplash.com/photo-1558098329-a11cff621064?w=500&h=500&fit=crop",
        description: "강력한 사운드와 뛰어난 연주감",
      },
      {
        name: "Ibanez SR Premium",
        image: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=500&h=500&fit=crop",
        description: "가벼운 무게와 빠른 연주감의 프리미엄 베이스",
      },
    ],
  },
  {
    id: "acoustic",
    name: "어쿠스틱기타",
    featured: [
      {
        name: "Martin D-28",
        image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&h=500&fit=crop",
        description: "풍부한 울림과 깊은 저음의 드레드넛 기타",
      },
      {
        name: "Taylor 814ce",
        image: "https://images.unsplash.com/photo-1485278537138-e3d104ef8c17?w=500&h=500&fit=crop",
        description: "밝고 선명한 음색의 그랜드 오디토리움 기타",
      },
      {
        name: "Gibson J-45",
        image: "https://images.unsplash.com/photo-1555221573-85b5c7b76f38?w=500&h=500&fit=crop",
        description: "따뜻하고 풍부한 음색의 클래식 어쿠스틱 기타",
      },
    ],
  },
  {
    id: "effects",
    name: "이펙터",
    featured: [
      {
        name: "Strymon Big Sky",
        image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=500&h=500&fit=crop",
        description: "최고급 리버브 이펙터",
      },
      {
        name: "Boss GT-1000CORE",
        image: "https://images.unsplash.com/photo-1527865118650-b28bc059d09a?w=500&h=500&fit=crop",
        description: "다양한 이펙트를 하나로 통합한 멀티 이펙터",
      },
      {
        name: "Kemper Profiler",
        image: "https://images.unsplash.com/photo-1519508551149-8b27a61d5e36?w=500&h=500&fit=crop",
        description: "최고의 앰프 모델링 시스템",
      },
    ],
  },
  {
    id: "accessories",
    name: "악세서리",
    featured: [
      {
        name: "Premium Guitar Strings",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=500&fit=crop",
        description: "최고급 기타 스트링",
      },
      {
        name: "Professional Guitar Picks",
        image: "https://images.unsplash.com/photo-1516747773440-e92290b8c1b5?w=500&h=500&fit=crop",
        description: "다양한 두께와 재질의 기타 피크",
      },
      {
        name: "Premium Guitar Straps",
        image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=500&h=500&fit=crop",
        description: "편안하고 스타일리시한 기타 스트랩",
      },
    ],
  },
]

const Navbar = () => {
  const [hoveredMenu, setHoveredMenu] = useState(null)
  const [isHamburgerModalOpen, setIsHamburgerModalOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("electric")
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHamburgerActive, setIsHamburgerActive] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSlideIndices, setActiveSlideIndices] = useState({})
  const submenuRef = useRef(null)
  const menuItemRefs = useRef({})
  const submenuTimeoutRef = useRef(null)
  const swiperRef = useRef(null)

  // 반응형 처리
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

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

  // 햄버거 메뉴 모달 토글
  const toggleHamburgerModal = () => {
    setIsHamburgerModalOpen(!isHamburgerModalOpen)
    setIsHamburgerActive(!isHamburgerActive)
  }

  // 메뉴 호버 핸들러
  const handleMenuHover = (menuId) => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current)
    }
    setHoveredMenu(menuId)
  }

  // 메뉴 호버 아웃 핸들러
  const handleMenuLeave = (menuId) => {
    // 서브메뉴로 이동하는 시간을 주기 위해 타임아웃 설정
    submenuTimeoutRef.current = setTimeout(() => {
      // 서브메뉴에 마우스가 있는지 확인
      if (!submenuRef.current || !submenuRef.current.matches(":hover")) {
        setHoveredMenu(null)
      }
    }, 100)
  }

  // 서브메뉴 마우스 이벤트 핸들러
  const handleSubmenuMouseEnter = () => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current)
    }
  }

  const handleSubmenuMouseLeave = () => {
    setHoveredMenu(null)
  }

  // 모바일 메뉴 토글
  const toggleMobileMenu = () => setIsMenuOpen(!isMenuOpen)

  // 카테고리 변경 핸들러
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId)
  }

  // 서브메뉴 렌더링 함수
  const renderSubmenu = (menuId) => {
    const menu = menuItems.find((item) => item.id === menuId)
    const featuredItems = menu?.featured || []

    return (
      <div
        ref={submenuRef}
        className="absolute left-0 right-0 top-full bg-white shadow-lg z-20 border-t border-gray-200 animate-fadeIn"
        onMouseEnter={handleSubmenuMouseEnter}
        onMouseLeave={handleSubmenuMouseLeave}
      >
        <div className="max-w-[1280px] mx-auto flex">
          {/* 왼쪽 이미지 영역 - 슬라이더 */}
          <div className="w-1/4 p-6 bg-amber-100 relative overflow-hidden">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                type: "bullets",
              }}
              className="h-full"
              onSwiper={(swiper) => {
                swiperRef.current = swiper
              }}
              onSlideChange={(swiper) => {
                setActiveSlideIndices((prev) => ({
                  ...prev,
                  [menuId]: swiper.realIndex % featuredItems.length,
                }))
              }}
            >
              {featuredItems.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="h-full flex flex-col">
                    <div className="aspect-square bg-white rounded-lg overflow-hidden mb-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        draggable="false"
                      />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* 수동 인디케이터 추가 */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
              {featuredItems.map((_, index) => (
                <button
                  key={index}
                  className={`transition-all duration-300 rounded-full ${
                    activeSlideIndices[menuId] === index ? "bg-indigo-600 w-4 h-2" : "bg-gray-300 w-2 h-2"
                  }`}
                  onClick={() => {
                    if (swiperRef.current) {
                      swiperRef.current.slideToLoop(index)
                    }
                  }}
                  aria-label={`슬라이드 ${index + 1}로 이동`}
                />
              ))}
            </div>
          </div>

          {/* 오른쪽 메뉴 영역 */}
          <div className="w-3/4 p-6">
            <div className="grid grid-cols-4 gap-6">
              {/* 첫 번째 컬럼 - 카테고리 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{menu?.name}</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 hover:text-indigo-600 hover:bg-gray-100 px-2 py-1 rounded block transition-colors"
                    >
                      베스트셀러
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 hover:text-indigo-600 hover:bg-gray-100 px-2 py-1 rounded block transition-colors"
                    >
                      신상품
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 hover:text-indigo-600 hover:bg-gray-100 px-2 py-1 rounded block transition-colors"
                    >
                      특가 상품
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 hover:text-indigo-600 hover:bg-gray-100 px-2 py-1 rounded block transition-colors"
                    >
                      전체 보기
                    </a>
                  </li>
                </ul>
              </div>

              {/* 두 번째 컬럼 - 브랜드 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">브랜드</h3>
                <ul className="space-y-2">
                  {brandData[menuId].slice(0, 5).map((brand, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="text-gray-700 hover:text-indigo-600 hover:bg-gray-100 px-2 py-1 rounded block transition-colors"
                      >
                        {brand.name}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href="#" className="text-indigo-600 font-medium hover:underline">
                      모든 브랜드 보기
                    </a>
                  </li>
                </ul>
              </div>

              {/* 세 번째 컬럼 - 추천 상품 */}
              <div className="col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">추천 상품</h3>
                <div className="grid grid-cols-2 gap-4">
                  {brandData[menuId].slice(0, 4).map((brand, index) => (
                    <a key={index} href="#" className="group">
                      <div className="aspect-video bg-gray-100 rounded overflow-hidden mb-2">
                        <img
                          src={brand.image || "/placeholder.svg"}
                          alt={brand.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h4 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                        {brand.name}
                      </h4>
                      <p className="text-sm text-gray-500">최고의 품질</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* 헤더 고정에 따른 여백 - 스크롤 시 높이 조정 */}
      <div className={`transition-all duration-300 ${isScrolled ? "h-16" : "h-20"}`}></div>

      <nav
        className={`w-full bg-white shadow-md z-40 sticky transition-all duration-300 ${
          isScrolled ? "top-[64px]" : "top-20"
        } left-0 right-0`}
      >
        <div className="max-w-[1280px] w-full mx-auto">
          <div className="hidden md:block">
            <div className="flex items-center h-12">
              {/* 햄버거 메뉴 */}
              <div className="relative px-4 h-full flex items-center">
                <button
                  onClick={toggleHamburgerModal}
                  className={`hamburger-menu-icon ${isHamburgerActive ? "active" : ""}`}
                  aria-label="전체 카테고리 메뉴"
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>

              {/* 메인 메뉴 아이템 */}
              <div className="flex-1 flex justify-around">
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    className="relative h-full"
                    ref={(el) => (menuItemRefs.current[item.id] = el)}
                    onMouseEnter={() => handleMenuHover(item.id)}
                    onMouseLeave={() => handleMenuLeave(item.id)}
                  >
                    <a
                      href={`/category/${item.id}`}
                      className={`h-full flex items-center px-4 text-sm font-medium transition-colors ${
                        hoveredMenu === item.id ? "text-indigo-600" : "text-gray-700 hover:text-indigo-600"
                      }`}
                    >
                      {item.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 드롭다운 메뉴 */}
          {hoveredMenu && renderSubmenu(hoveredMenu)}

          {/* 모바일 햄버거 버튼 */}
          <div className="md:hidden flex justify-between items-center h-12 px-4">
            <button className="text-gray-700 hover:text-indigo-600" onClick={toggleMobileMenu}>
              <div className={`hamburger-icon ${isMenuOpen ? "open" : ""}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
            <div className="text-sm font-medium text-gray-700">메뉴</div>
          </div>
        </div>
      </nav>
      {/* 햄버거 메뉴 모달 */}
      {isHamburgerModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20 animate-fadeIn">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[80vh] overflow-y-auto animate-slideDown">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">전체 카테고리</h2>
              <button
                onClick={toggleHamburgerModal}
                className="text-gray-500 hover:text-gray-700"
                aria-label="모달 닫기"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <div className="flex">
              {/* 왼쪽 카테고리 목록 */}
              <div className="w-1/4 border-r p-4">
                <ul className="space-y-3">
                  {menuItems.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => handleCategoryChange(item.id)}
                        className={`w-full text-left py-2 px-3 rounded-md transition-colors ${
                          activeCategory === item.id
                            ? "text-gray-900 font-medium"
                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 오른쪽 세부 카테고리 */}
              <div className="w-3/4 p-4">
                <div className="grid grid-cols-4 gap-4">
                  {/* 브랜드 목록 */}
                  <div className="col-span-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">브랜드</h3>
                    <div className="grid grid-cols-5 gap-4">
                      {brandData[activeCategory].map((brand, index) => (
                        <a
                          key={index}
                          href="#"
                          className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 px-3 py-2 rounded transition-colors"
                        >
                          {brand.name}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* 카테고리별 세부 항목 */}
                  <div className="col-span-4 mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">세부 카테고리</h3>
                    <div className="grid grid-cols-5 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">고버우드</h4>
                        <ul className="space-y-1">
                          <li>
                            <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm">
                              헥스
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm">
                              크래프터
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm">
                              콜트
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">고버우드</h4>
                        <ul className="space-y-1">
                          <li>
                            <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm">
                              헥스
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm">
                              크래프터
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm">
                              콜트
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">고버우드</h4>
                        <ul className="space-y-1">
                          <li>
                            <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm">
                              헥스
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm">
                              크래프터
                            </a>
                          </li>
                          <li>
                            <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm">
                              콜트
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 모바일 메뉴 */}
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto pt-16 animate-fadeIn">
          <div className="p-4">
            <button onClick={toggleMobileMenu} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <details className="group">
                    <summary className="flex items-center justify-between p-3 font-medium text-gray-700 rounded-md cursor-pointer hover:bg-gray-100">
                      {item.name}
                      <svg
                        className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <ul className="pl-6 mt-2 space-y-1">
                      {brandData[item.id].map((brand, index) => (
                        <li key={index}>
                          <a
                            href="#"
                            className="block p-2 text-sm text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
                          >
                            {brand.name}
                          </a>
                        </li>
                      ))}
                      <li>
                        <a
                          href="#"
                          className="block p-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-md"
                        >
                          모든 브랜드 보기
                        </a>
                      </li>
                    </ul>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar