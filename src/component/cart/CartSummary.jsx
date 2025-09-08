"use client"

const CartSummary = ({ totalAmount, itemCount }) => {
  const shippingFee = 3000
  const finalAmount = totalAmount + shippingFee

  const handleOrderClick = () => {
    window.location.href = "/order"
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">주문 요약</h3>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>총 상품 금액 ({itemCount}개)</span>
          <span>₩{totalAmount.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>배송비</span>
          <span>₩{shippingFee.toLocaleString()}</span>
        </div>

        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>결제 예상 금액</span>
            <span className="text-blue-600">₩{finalAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleOrderClick}
        disabled={itemCount === 0}
        className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        주문하기
      </button>

      <div className="mt-4 text-sm text-gray-500 text-center">
        <p>• 무료배송: 50,000원 이상 주문시</p>
        <p>• 당일배송: 오후 2시 이전 주문시</p>
      </div>
    </div>
  )
}

export default CartSummary
