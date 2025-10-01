import axiosInstance from "./axiosInstance";

export const checkAttendance = async () => 
{
  try
  {
    const response = await axiosInstance.post("/attendance/check");
    return response.data; // 성공 메시지를 반환
  }
  catch (error)
  {
    // 에러 발생 시, 백엔드가 보낸 에러 메시지를 반환하거나 기본 메시지 반환
    throw new Error(error.response?.data || "출석 체크에 실패했습니다.");
  }
};