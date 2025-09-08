"use client"
import CartItem from "./CartItem"

const CartList = ({ items, onQuantityChange, onDeleteItem }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">장바구니가 비어있습니다.</h3>
        <p className="text-gray-600 mb-6">원하는 기타를 장바구니에 담아보세요!</p>
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          쇼핑 계속하기
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-900">장바구니 ({items.length}개 상품)</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {items.map((item) => (
          <CartItem key={item.cartItemId} item={item} onQuantityChange={onQuantityChange} onDeleteItem={onDeleteItem} />
        ))}
      </div>
    </div>
  )
}

export default CartList
