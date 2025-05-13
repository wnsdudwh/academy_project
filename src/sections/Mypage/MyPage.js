// import axios from "axios";
// import { useEffect, useState } from "react";

// const MyPage = () =>
// {
//     const [userInfo, setUserInfo] = useState(null);

//     useEffect(() =>
//     {
//         const token = localStorage.getItem("token");    //백에서 token 가져옴

//         axios.get("http://localhost:8080/auth/mypage", 
//         {
//             headers : 
//             {
//                 Authorization : `Bearer ${token}`
//             }
//         })
//         .then(res => setUserInfo(res.data))
//         .catch(err => console.error(err));
//     }, []);

//     if (!userInfo)
//     {
//         return <p>불러오는 중...</p>;
//     }

//     return (
//         <>
//             <div className="mypage-container">
//                 <h2>마이페이지</h2>
//                 <p><strong>아이디:</strong> {userInfo?.userId}</p>
//                 <p><strong>닉네임:</strong> {userInfo?.nickname}</p>
//                 <p><strong>가입일:</strong> {userInfo?.regDate}</p>
//                 <p><strong>포인트:</strong> {userInfo?.point} P</p>

//                 <button onClick={() => alert("출석 모달 띄우기 예정")}>출석 현황판 보기</button>
//             </div>
//         </>
//     );
// }

// export default MyPage;
import MyPage from "../../component/mypage/my-page"

export default function Page() 
{
  return <MyPage />
}