import axiosInstance from "./axiosInstance";

// 장바구니 정보 조회 API
export const getCart = async () => {
  try {
    const response = await axiosInstance.get("/api/cart");
    return response.data;
  } catch (error) {
    console.error("장바구니 조회 실패:", error);
    throw error;
  }
};

// 장바구니 상품 수량 변경 API
export const updateCartItemQuantity = async (cartItemId, quantity) => {
  try {
    const response = await axiosInstance.patch(`/api/cart/items/${cartItemId}`, { quantity });
    return response.data;
  } catch (error) {
    console.error("상품 수량 변경 실패:", error);
    throw error;
  }
};

// 장바구니 상품 삭제 API
export const deleteCartItem = async (cartItemId) => {
  try {
    const response = await axiosInstance.delete(`/api/cart/items/${cartItemId}`);
    return response.data;
  } catch (error)
  {
    console.error("장바구니 상품 삭제 실패:", error);
    throw error;
  }
};