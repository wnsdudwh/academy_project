import axiosInstance from "./axiosInstance"; // axiosInstance.js 파일의 실제 경로에 맞게 수정해주세요.

/**
 * 내 모든 주소록을 조회하는 API
 * GET /api/addresses
 */
export const fetchAddresses = async () => 
{
    try {
    // 2. 새로 인스턴스를 만들지 않고, import한 axiosInstance를 사용합니다.
    //    baseURL과 인증 헤더는 axiosInstance가 자동으로 처리해줍니다.
    const response = await axiosInstance.get("/api/addresses");
    return response.data;
    } catch (error) {
    console.error("주소록 조회에 실패했습니다.", error);
    throw error;
    }
};

/**
 * 새로운 주소록을 추가하는 API
 * POST /api/addresses
 * @param {object} addressData - 새로 추가할 주소 정보
 */
export const addAddress = async (addressData) =>
{
    // 프론트엔드 데이터 key를 백엔드 DTO key에 맞게 변환
    const payload =
    {
        name: addressData.name,
        recipient: addressData.recipient,
        address: addressData.address1,

        detailAddress: addressData.address2,
        zipCode: addressData.zipcode,
        phoneNumber: addressData.phone,
        isDefault: addressData.isDefault,
  };

  try 
  {
    // 3. 여기도 마찬가지로 import한 axiosInstance를 사용합니다.
    const response = await axiosInstance.post("/api/addresses", payload);
    return response.data;
  }
  catch (error)
  {
    console.error("주소록 추가에 실패했습니다.", error);
    throw error;
  }
};

/**
 * 특정 주소록을 수정하는 API
 * PUT /api/addresses/{addressId}
 * @param {number} addressId - 수정할 주소의 ID
 * @param {object} addressData - 수정할 주소 정보
 */
export const updateAddress = async (addressId, addressData) =>
{
  // 프론트엔드 데이터 key를 백엔드 DTO key에 맞게 변환
  const payload =
  {
    name: addressData.name,
    recipient: addressData.recipient,
    address: addressData.address1,
    detailAddress: addressData.address2,
    zipCode: addressData.zipcode,
    phoneNumber: addressData.phone,
    isDefault: addressData.isDefault,
  };

  try
  {
    const response = await axiosInstance.put(`/api/addresses/${addressId}`, payload);
    return response.data;
  }
  catch (error)
  {
    console.error("주소록 수정에 실패했습니다.", error);
    throw error;
  }
};

/**
 * 특정 주소록을 삭제하는 API
 * DELETE /api/addresses/{addressId}
 * @param {number} addressId - 삭제할 주소의 ID
 */
export const deleteAddress = async (addressId) =>
{
  try
  {
    await axiosInstance.delete(`/api/addresses/${addressId}`);
  }
  catch (error)
  {
    console.error("주소록 삭제에 실패했습니다.", error);
    throw error;
  }
};
