"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) 
{
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price) => 
  {
    if (price === null || price === undefined) return "0";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const navigate = useNavigate();
  
  return (
    <div className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      con onClick={() => navigate(`/product/${product.id}`)}>
      {/* 상품 이미지 */}
      <div className="relative overflow-hidden bg-gray-100 mb-3 aspect-square">
        <img src={product.thumbnailUrl || "/placeholder.svg"} // ✅ 썸네일 연동
          alt="" className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw" fill />

        {/* 호버 아이콘 */}
        {isHovered && (
          <div className="absolute top-2 right-2 flex flex-col gap-2 z-10 transition-opacity duration-300">
            <HoverIcon icon="heart" />
            <HoverIcon icon="shopping-cart" />
            <HoverIcon icon="eye" />
          </div>
        )}

        {/* 세일 태그 */}
        {product.discountRate > 0 && (
          <div className="absolute top-0 left-0 bg-black text-white text-xs font-bold px-2 py-1">SALE</div>
        )}
      </div>

      {/* 브랜드명 */}
      <div className="h-6 mb-1 text-sm font-semibold text-gray-600">{product.brandName || product.brand}</div>

      {/* 상품명 */}
      <h3 className="text-base font-semibold mb-2 line-clamp-2 h-10">{product.name}</h3>

      {/* 가격 */}
      <div className="mt-auto">
        {product.discountRate > 0 ? (
          <>
            <div className="flex items-center gap-2">
              <span className="text-red-500 font-bold text-sm">{product.discountRate}%</span>
              <span className="text-gray-400 line-through text-sm">{formatPrice(product.price)}원</span>
            </div>
            <div className="font-bold">{formatPrice(product.discountPrice)}원</div>
          </>
        ) : (
          <div className="font-bold">{formatPrice(product.price)}원</div>
        )}
      </div>

      {/* 장바구니 버튼 */}
      <div className="mt-3">
        <button className="w-full bg-white border border-gray-300 text-xs py-1 px-3 rounded hover:bg-gray-50 transition-colors">
          장바구니
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

// 🔁 아이콘 공통 컴포넌트
function HoverIcon({ icon }) {
  const icons = {
    heart: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart" >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
    ),
    "shopping-cart": (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
    ),
    eye: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
    ),
  };

  return (
    <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
      {icons[icon]}
    </button>
  );
}