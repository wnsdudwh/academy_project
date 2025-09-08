"use client"

import { useState, useEffect } from "react"
import CartList from "../../component/cart/CartList"
import CartSummary from "../../component/cart/CartSummary"
import LoadingSpinner from "../../component/common/LoadingSpinner"

import { getCart, updateCartItemQuantity, deleteCartItem } from "../../api/cartApi"

const CartSection = () => 
{
  const [cartData, setCartData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // 장바구니 데이터 조회
  const fetchCartData = async () => 
  {
    try 
    {
      setLoading(true);
      setError(null);
      const data = await getCart(); // 실제 API 호출
      setCartData(data);
    } 
    catch (err) 
    {
      setError("장바구니 데이터를 불러오는데 실패했습니다.");
      console.error(err);
    } 
    finally 
    {
      setLoading(false);
    }
  };

  // 수량 변경 함수를 cartApi를 사용하도록 수정
  const handleQuantityChange = async (cartItemId, newQuantity) => 
  {
    if  (newQuantity < 1) // 수량이 1 미만으로 내려가지 않도록 방지
      {
        return;
      }
    try
    {
      await updateCartItemQuantity(cartItemId, newQuantity); // API 모듈 함수 호출
      await fetchCartData(); // 성공 시 데이터 다시 조회
    } 
    catch (err) 
    {
      alert("수량 변경에 실패했습니다. 다시 시도해주세요.");
    }
  }

  // 삭제 버튼 클릭 시, 바로 삭제하지 않고 모달을 띄우는 함수
  const handleDeleteItem = (cartItemId) => 
  {
    setItemToDelete(cartItemId); // 어떤 아이템을 삭제할지 ID 저장
    setShowConfirmModal(true);   // 확인 모달을 띄움
  };

  // 3. 모달의 '확인' 버튼을 눌렀을 때 실행될 실제 삭제 로직
  const handleConfirmDelete = async () => 
  {
    if (itemToDelete) 
    {
      try 
      {
        // 👇 2. deleteCartItem API 함수를 호출합니다.
        await deleteCartItem(itemToDelete);
        
        // 성공시 장바구니 목록 다시 불러오기
        await fetchCartData();
        
      } 
      catch (err) 
      {
        alert("상품 삭제에 실패했습니다. 다시 시도해주세요.");
      } 
      finally 
      {
        // 성공하든 실패하든 모달을 닫고 상태를 초기화합니다.
        setShowConfirmModal(false);
        setItemToDelete(null);
      }
    }
  };
  
  // 4. 모달의 '취소' 버튼을 눌렀을 때
  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setItemToDelete(null);
  };


  // 컴포넌트 마운트시 데이터 조회
  useEffect(() => {
    fetchCartData()
  }, [])

  // 로딩 상태
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  // 에러 상태
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">오류가 발생했습니다</h3>
            <p className="text-gray-600 mb-6">{error.message}</p>
            <button
              onClick={fetchCartData}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              다시 시도
            </button>
          </div>
        </div>
      </div>
    )
  }

  // 장바구니가 비어있을 시
  if (!cartData || !cartData.items || cartData.items.length === 0)
  {
    return (
    <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-6">장바구니</h1>
        <p className="text-gray-600">장바구니가 비어있습니다.</p>
      </div>
    )
  }

  const items = cartData?.items || []
  const totalAmount = cartData?.totalAmount || 0

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">장바구니</h1>
          <p className="text-gray-600 mt-2">선택한 기타들을 확인하고 주문해보세요.</p>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* 장바구니 목록 (데스크톱: 2/3, 모바일: 전체) */}
          <div className="lg:col-span-2 mb-8 lg:mb-0">
            <CartList items={items} onQuantityChange={handleQuantityChange} onDeleteItem={handleDeleteItem} />
          </div>

          {/* 주문 요약 (데스크톱: 1/3, 모바일: 전체) */}
          <div className="lg:col-span-1">
            <CartSummary totalAmount={totalAmount} itemCount={items.length} />
          </div>
        </div>
      </div>

      {/* ↓↓↓ 5. 모달 UI 추가 ↓↓↓ */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-bold mb-4">정말 삭제하시겠습니까?</h3>
            <p className="mb-6">이 상품을 장바구니에서 삭제합니다.</p>
            <div className="flex justify-end gap-4">
              <button 
                onClick={handleCancelDelete} 
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                취소
              </button>
              <button 
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartSection
