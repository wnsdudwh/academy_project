"use client"

import { useState } from "react"

const CartItem = ({ item, onQuantityChange, onDeleteItem }) => 
{
  // 아이템 개별 로딩 상태를 위한 state
  const [isUpdating, setIsUpdating] = useState(false)

  const handleQuantityChange = async (newQuantity) => 
  {
    if (newQuantity < 1)
    {
      return;
    }

    setIsUpdating(true); // 로딩 시작

    try
    {
      // 부모로부터 받은 onQuantityChange 함수를 호출
      await onQuantityChange(item.cartItemId, newQuantity);
    }
    catch (error)
    {
      console.error("수량 변경 실패(자식):", error);
    }
    finally
    {
      setIsUpdating(false); // 로딩 종료
    }
  }

  // 삭제 핸들러
  const handleDeleteWrapper = async () => 
  {
    // 삭제는 모달을 띄우는 역할만 하므로, 부모 함수를 그대로 호출
    onDeleteItem(item.cartItemId);
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border-b border-gray-200 bg-white">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <img
          src={item.thumbnailUrl || "/placeholder.svg?height=80&width=80&query=guitar"}
          alt={item.productName}
          className="w-20 h-20 object-cover rounded-lg"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 truncate">{item.productName}</h3>
        <p className="text-sm text-gray-600 mt-1">{item.optionName}</p>
        <p className="text-lg font-bold text-blue-600 mt-2">₩{item.price.toLocaleString()}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-3">
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={isUpdating || item.quantity <= 1}
            className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            -
          </button>
          <input type="number"
            value={item.quantity} onChange={(e) => handleQuantityChange(Number.parseInt(e.target.value) || 1)}
            disabled={isUpdating} className="w-16 text-center py-2 border-0 focus:ring-0 disabled:opacity-50" min="1"
          />
          <button onClick={() => handleQuantityChange(item.quantity + 1)} disabled={isUpdating}
            className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>

        {/* Total Price */}
        <div className="text-right min-w-0">
          <p className="text-lg font-bold text-gray-900">₩{item.totalPrice.toLocaleString()}</p>
        </div>

        {/* Delete Button */}
        <button onClick={handleDeleteWrapper} disabled={isUpdating}
          className="p-2 text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          title="상품 삭제" >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default CartItem
