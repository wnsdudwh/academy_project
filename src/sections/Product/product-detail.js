"use client"

import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { Share2, Heart, ShoppingCart, ChevronRight, Clock, ChevronLeft, ChevronRightIcon, ArrowLeft, Loader2 } from "lucide-react"

// static
import Header from "../Common/Header"
import Navbar from "../Common/Navbar"
import ProductTabs from "../../component/product/product-tabs"
import Sidebar from "../Common/Sidebar"
import ServiceForm from "../Common/service-form"
import Footer from "../Common/Footer"
import axiosInstance from "../../api/axiosInstance"
import dummyProducts from "../../data/dummyProducts"

const ProductDetail = () => 
{
  const [quantity, setQuantity] = useState(1)
  const [isImageHovered, setIsImageHovered] = useState(false)

  const { id } = useParams(); // id값 가져오기
  // 상품정보 이미지 (썸네일/서브) 관련 추가
  const [product, setProduct] = useState(null);   // 상품 정보
  const [images, setImages] = useState([]);     // 이미지 배열 (메인 + 서브)
  const [currentImage, setCurrentImage] = useState(0); // 현재 선택된 이미지 인덱스

  const formatPrice = (num) => num?.toLocaleString() + "원";

  const [options, setOptions] = useState([]);

  useEffect(() => 
  {
    const fetchProduct = async () =>
    {
      if (parseInt(id) >= 900)
      {
        // ✅ 더미 제품만 찾아서 넣어줌
        const dummy = dummyProducts.find(p => p.id === parseInt(id));
        if (dummy) 
        {
          const thumbnailUrl = `${dummy.thumbnailUrl}`;
          const subImageUrls = dummy.subImages || [];

          const fullImages = [thumbnailUrl, ...subImageUrls];
          setProduct(dummy);
          setImages(fullImages);
        }
        else 
        {
          console.error("더미 상품이 존재하지 않습니다.");
        }
        return; // 백엔드 요청 skip
      }

      try 
      {
        const res = await axiosInstance.get(`/api/products/${id}`);
        setProduct(res.data);
        setOptions(res.data.options || []);

        console.log("📦 가져온 상품:", res.data); // 👈 이거 추가
        console.log("📦 옵션 목록:", res.data.options);

        // 더미 상품인지 확인
        const isDummy = res.data.id >= 900; // 더미 상품 ID 조건

        const thumbnailUrl = res.data.thumbnailUrl;
        const subImageUrls = res.data.subImages || [];
        const allImages = [thumbnailUrl, ...subImageUrls];

        setImages(allImages);
      } 
      catch (error) 
      {
        console.error("상품 로딩 실패", error);
        // ⭐️ 에러 발생 시 ID 999번 더미 데이터를 대신 보여줍니다.
        const dummy = dummyProducts.find(p => p.id === 999);
        if (dummy) 
        {
            const fullImages = [dummy.thumbnailUrl, ...dummy.subImages];
            setProduct(dummy);
            setImages(fullImages);
        }
      }
    };
    fetchProduct();
  }, [id]);

  // 썸네일 스와이퍼 관련 상태 및 함수
  const [startIndex, setStartIndex] = useState(0)
  const thumbnailsRef = useRef(null)
  const visibleThumbnails = 7 // 한 번에 보여줄 썸네일 개수

  // 이미지 변경 함수
  const changeImage = (direction) => {
    if (direction === "next") {
      const nextIndex = (currentImage + 1) % images.length
      setCurrentImage(nextIndex)

      // 썸네일 슬라이드 로직
      if (images.length > visibleThumbnails) {
        // 현재 이미지가 보이는 범위의 마지막 3개 안에 들어가면 슬라이드
        if (nextIndex >= startIndex + visibleThumbnails - 2) {
          const newStartIndex = Math.min(startIndex + 1, images.length - visibleThumbnails)
          setStartIndex(newStartIndex)
        }
        // 마지막 이미지에서 첫 번째로 갈 때
        if (nextIndex === 0) {
          setStartIndex(0)
        }
      }
    } else {
      const prevIndex = (currentImage - 1 + images.length) % images.length
      setCurrentImage(prevIndex)

      // 썸네일 슬라이드 로직
      if (images.length > visibleThumbnails) {
        // 현재 이미지가 보이는 범위의 처음 3개 안에 들어가면 슬라이드
        if (prevIndex <= startIndex + 2) {
          const newStartIndex = Math.max(startIndex - 1, 0)
          setStartIndex(newStartIndex)
        }
        // 첫 번째 이미지에서 마지막으로 갈 때
        if (prevIndex === images.length - 1) {
          setStartIndex(Math.max(0, images.length - visibleThumbnails))
        }
      }
    }
  }

  // 썸네일 클릭 시 이미지 변경
  const handleThumbnailClick = (index) => {
    setCurrentImage(index)
  }

  // 뒤로가기 함수
  const handleGoBack = () => {
    window.history.back()
  }

  // 보여질 썸네일 계산
  const getVisibleThumbnails = () => {
    if (images.length <= visibleThumbnails) {
      return images.map((img, index) => ({ img, index }))
    }

    const thumbnails = []
    for (let i = 0; i < visibleThumbnails; i++) {
      const index = startIndex + i
      if (index < images.length) {
        thumbnails.push({ img: images[index], index })
      }
    }
    return thumbnails
  }

  
  // null 체크 및 로딩 라이브러리 처리
  if (!product)
  {
    return (
      <div className="flex flex-col items-center justify-center h-60">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
        <span className="text-gray-600 text-lg">상품 정보를 불러오는 중...</span>
      </div>
    )
  }

  return (
    <>
    <Header />
    <Navbar />
    <div className="w-full">
      <div className="max-w-[1440px] mx-auto px-4 py-8">
        {/* 뒤로가기 버튼과 경로 표시 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <button
              onClick={handleGoBack}
              className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="뒤로가기"
            >
              <ArrowLeft className="w-6 h-6 text-black" />
            </button>
            <div className="flex items-center text-sm text-gray-500">
              <a href="#" className="hover:text-gray-700">
                홈
              </a>
              <span className="mx-2">/</span>
              <a href="#" className="hover:text-gray-700">
                High
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 왼쪽: 이미지 섹션 */}
          <div className="space-y-4">
            {/* 메인 이미지 */}
            <div className="border rounded-lg overflow-hidden bg-white relative"
              onMouseEnter={() => setIsImageHovered(true)}
              onMouseLeave={() => setIsImageHovered(false)}
            >
              <div className="relative aspect-square">
                {/* <img src={images[currentImage] || "/placeholder.svg"} alt="STANDARD STRATOCASTER®" className="w-full h-full object-contain"/> */}
                <img src={images[currentImage] || "/placeholder.svg"} alt={product?.name || "상품 이미지"} className="w-full h-full object-contain"/>

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
            {/* 썸네일 한 개 너비가 98px 이라고 가정하고, 7개만 보이도록 너비 고정 98 * 7 = 686px 로 고정하여 정확히 7개만 표시됨 */}
              <div ref={thumbnailsRef} className="overflow-hidden"
                style={{ width: `${visibleThumbnails * 98}px` }} 
              >
                <div className="flex gap-[0.715rem] transition-transform duration-300 ease-out"
                  style={{
                    transform: `translateX(-${startIndex * 98}px)`,
                    width: `${images.length * 98}px`,
                  }}
                >
                  {images.map((img, index) => (
                    <div key={index}
                      className={`border-2 rounded-md overflow-hidden flex-shrink-0 cursor-pointer ${
                        currentImage === index ? "border-rose-500" : "border-gray-200 hover:border-gray-400"
                      }`}
                      // onClick={() => handleThumbnailClick(index)}
                      onClick={() => setCurrentImage(index)}
                      style={{ width: "88px", height: "88px" }}
                    >
                      <img src={img || "/placeholder.svg"}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 상품 정보 섹션 */}
          <div className="space-y-6">
            {/* 상품명 */}
            <h1 className="text-2xl font-bold">{product.name}</h1>

            {/* 가격 정보 */}
            <div className="space-y-3 border-b pb-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">판매가</span>
                <div className="flex items-center">
                  <span className="text-red-500 font-bold mr-2">{product.discountRate}%</span>
                  <span className="text-xl font-bold">{formatPrice(product.discountPrice)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">소비자가</span>
                <span className="text-gray-500 line-through">{formatPrice(product.price)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">적립금</span>
                <span className="text-gray-700">{formatPrice(Math.round(product.discountPrice * 0.05))} ({product.pointRate}%)</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">배송비</span>
                <span className="text-gray-700">{formatPrice(product.shippingFee)}</span>
              </div>
            </div>

            {/* 상품 상세 정보 */}
            <div className="space-y-3 border-b pb-4">
              {/*  */}
              <div className="flex justify-between items-center">
                <span className="text-gray-700">모델</span>
                <span className="text-gray-700">{product.brandName}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">원산지</span>
                <span className="text-gray-700">{product?.productCountry || "인도네시아"}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">제품상품코드</span>
                <span className="text-gray-700">{product?.productCode}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">COLOR</span>
                <div className="relative">
                 <select disabled={options.length === 0} className={`border rounded-md px-4 py-2 pr-8 appearance-none bg-white text-gray-700
                 ${options.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}>
                    <option>- [필수] 옵션을 선택해 주세요 -</option>
                    {options.map((opt, idx) => (
                      <option key={idx} value={opt.optionName}>
                        {opt.optionName} ({opt.optionType}) +{opt.additionalPrice.toLocaleString()}원
                    </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 상품 옵션 정보 있을시에만 등장 */}
{options.length > 0 && (
  <div className="space-y-3 border-b pb-4-6">
    <h4 className="text-lg font-semibold mb-2">옵션</h4>
    <ul className="space-y-2">
      {options.map((opt, index) => (
        <li key={index} className="p-3 border rounded shadow-sm">
          <div><strong>옵션명:</strong> {opt.optionName}</div>
          <div><strong>타입:</strong> {opt.optionType}</div>
          <div><strong>추가 가격:</strong> {opt.additionalPrice?.toLocaleString()}원</div>
          <div><strong>재고:</strong> {opt.stock}</div>
          <div><strong>품절여부:</strong> {opt.soldOut ? '판매중' : '품절'}</div>
        </li>
      ))}
    </ul>
  </div>
)}
{options.length === 0 && (
  <p className="text-gray-500 mt-4">이 상품은 옵션이 없습니다.</p>
)}



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

      {/* 서비스 하이라이트 */}
      <ServiceForm />

      {/* 사이드바 */}
      <Sidebar />
    </div>
    <Footer />
    </>
  )
}

export default ProductDetail