"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Plus, Eye, EyeOff } from "lucide-react"
import ShoppingAddressModal from "./shopping-address-modal"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom";

import { fetchAddresses, addAddress, updateAddress, deleteAddress } from "../../api/addressApi";

export default function ProfileEdit ({
  userInfo: propUserInfo,
  onBack,
  // addresses: propAddresses,
  // defaultAddressId: propDefaultAddressId,
  // onAddAddress,
  // onUpdateAddress,
  // onDeleteAddress,
  // onSetDefaultAddress,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BACKEND_URL
  const userInfo = propUserInfo || location.state?.userInfo;

  // 주소록 데이터를 prop이 아닌 자체 state로 관리합니다.
  const [addresses, setAddresses] = useState([]);

  // 가져 온 값을 수정 할 때
  const [nickname, setNickname] = useState("");
  // 📱 휴대폰 번호 입력 상태
  const [phone, setPhone] = useState(userInfo?.phone || "");
    // 💬 닉네임 중복 상태 메시지
  const [nicknameCheckMsg, setNicknameCheckMsg] = useState("");
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(null);

  //기존 값 가져와서 출력 할 때
  const [activeSection, setActiveSection] = useState("all-info") // 기본값은 전체 정보
  const [editingAddress, setEditingAddress] = useState(null)
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const loadAddresses = async () => 
  {
    try 
    {
      const data = await fetchAddresses();
      setAddresses(data);
    }
    catch (error)
    {
      alert("배송지 정보를 불러오는 데 실패했습니다.");
    }
  };

  // 컴포넌트가 처음 렌더링될 때 주소록 목록을 불러옵니다.
  useEffect(() => 
  {
    loadAddresses();
  }, []); // 빈 배열을 전달하여 최초 1회만 실행되도록 설정

  const handleBack = () =>
  {
    //이전페이지로 navigate를 이용해서 보내버림
    navigate(-1);
  }

  const handleEditAddress = (address) => 
  {
    // API 응답 데이터(phoneNumber 등)와 모달에서 사용하는 데이터(phone 등)의 이름이 다르므로 변환해줍니다.
    const addressForModal = 
    {
      id: address.id,
      name: address.name,
      recipient: address.recipient,
      phone: address.phoneNumber,
      zipcode: address.zipCode,
      address1: address.address,
      address2: address.detailAddress,
      isDefault: address.default,
    };
    setEditingAddress(addressForModal);
    setShowAddressModal(true);
  };

  const handleSaveAddress = async (addressDataFromModal) => 
  {
      try 
      {
      if (editingAddress) 
      {
        // '수정' 로직
        await updateAddress(editingAddress.id, addressDataFromModal);
        await loadAddresses(); // 목록 새로고침
        alert("배송지가 수정되었습니다.");
      }
      else
      {
        // '추가' 로직
        await addAddress(addressDataFromModal);
        await loadAddresses(); // 목록 새로고침
        alert("새 배송지가 등록되었습니다.");
      }
      setShowAddressModal(false);
      setEditingAddress(null);
    }
    catch (error)
    {
      alert("배송지 저장에 실패했습니다.");
    }
  }

  // ⭐️ 4. handleDeleteAddress 함수를 새로 만듭니다.
  const handleDeleteAddress = async (addressId) => 
  {
    if (window.confirm("정말 이 배송지를 삭제하시겠습니까?"))
    {
      try
      {
        await deleteAddress(addressId);
        await loadAddresses(); // 목록 새로고침
        alert("배송지가 삭제되었습니다.");
      }
      catch (error)
      {
        alert("배송지 삭제에 실패했습니다.");
      }
    }
  };

// 닉네임 변경 제출 함수
const handleSubmitNickname = async () => 
{
  // 중복 확인 안 한 경우
  if (isNicknameAvailable === null)
    {
      alert("닉네임 중복 확인을 먼저 해주세요.");
      return;
    }
  
    // 중복된 닉네임이면 저장 불가
    if (!isNicknameAvailable)
    {
      alert("이미 사용 중인 닉네임입니다.");
      return;
    }

    try 
    {
      const token = localStorage.getItem("token"); // 🔐 로컬 스토리지에서 토큰 꺼냄
  
      // 🔁 닉네임 변경 요청 (백엔드로 PUT 요청 전송)
      await axios.put(BASE_URL + "auth/mypage/update",
      {
        nickname: nickname  // ✏️ 변경할 닉네임 (상태값)
      },
      {
        headers: 
        {
          Authorization: `Bearer ${token}` // 🛡️ 인증 헤더에 토큰 포함
        }
      });
  
      alert("닉네임이 성공적으로 변경되었습니다!");
      window.location.reload();  // 🔄 변경된 값 즉시 반영을 위해 새로고침
      setActiveSection("all-info"); // 📋 다시 전체 정보 페이지로 전환
    } 
    catch (error) 
    {
      alert(error.response?.data || "닉네임 변경 실패");
    }
};

// 닉네임 중복 확인 핸들러
const handleNicknameCheck = async () =>
{
  if (!nickname)
  {
    return setNicknameCheckMsg("닉네임을 입력 해 주세요.")
  }

  // 중복 아니고 확인도 했으면 PATCH 요청
  try 
  {
    const response = await axios.get(BASE_URL + `auth/check-nickname?nickname=${nickname}`);
    const available = response.data;

    if (available)
    {
      setIsNicknameAvailable(true);
      setNicknameCheckMsg("사용 가능한 닉네임입니다.");
    }
    else
    {
      setIsNicknameAvailable(false);
      setNicknameCheckMsg("이미 사용 중인 닉네임입니다.")
    }
  } 
  catch (error) 
  {
    console.error(error);
    setNicknameCheckMsg("닉네임 변경 오류 발생!!");    
  }

}
  // 📤 휴대폰 번호 저장 처리 함수
  const handlePhoneSave = async () =>
  {
    // 1. 유효성 검사 (공통)
    if (!phone.trim())
    {
      alert("휴대폰 번호를 입력 해 주세요.")
      return;
    }

    // 2. 형식 검사
    const regex = /^01[0-9]-\d{3,4}-\d{4}$/;
    if (!regex.test(phone))
    {
      alert("휴대폰 번호 형식이 올바르지 않습니다. (예: 010-1234-5678)");
      return;
    }

    try 
    {
      const token = localStorage.getItem("token");

      // 3. 서버에 저장 요청
      await axios.put(BASE_URL + "auth/mypage/update-phone",
      {
        phone : phone
      },
      {
        headers : 
        {
          Authorization : `Bearer ${token}`
        }
      });
      alert("연락처가 성공적으로 변경되었습니다!");
      window.location.reload();  // 🔄 변경된 값 즉시 반영을 위해 새로고침
      setActiveSection("all-info"); // 📋 다시 전체 정보 페이지로 전환
    }
    catch (error)
    {
      console.error(error);
      alert("휴대폰 번호 저장에 실패했습니다.");
    }
  }

  const handlePhoneChange = (e) =>
    {
      const value = e.target.value;
    
      // 숫자만 추출하고 11자리까지만 제한
      const onlyNums = value.replace(/[^0-9]/g, '').slice(0, 11);
    
      let formatted = onlyNums;
    
      // 11자리면 010-1234-5678 형식
      if (onlyNums.length === 11)
      {
        formatted = onlyNums.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
      }
      // 10자리면 010-123-4567 형식
      else if (onlyNums.length === 10)
      {
        formatted = onlyNums.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
      }
    
      setPhone(formatted);
    }
    

  // 각 섹션으로 이동하는 함수
  const navigateToSection = (section) => {
    setActiveSection(section)
  }

  // 전체 정보 섹션 렌더링
  const renderAllInfoSection = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">전체 정보</h2>

        {/* 프로필 이미지 정보 (보기만 가능) */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <img
            src={userInfo.profileImage || "/placeholder.svg"}
            alt="프로필 이미지"
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
          />
          <div>
            <p className="font-medium">프로필 이미지</p>
            <button
              className="mt-2 text-sm px-3 py-1 bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-md transition-colors"
              onClick={() => navigateToSection("profile-image")}
            >
              이미지 변경
            </button>
          </div>
        </div>

        {/* 닉네임 정보 (보기만 가능) */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">닉네임</p>
              <p className="text-gray-600 mt-1">{userInfo.nickname}</p>
            </div>
            <button
              className="text-sm px-3 py-1 bg-teal-100 text-teal-700 hover:bg-teal-200 rounded-md transition-colors"
              onClick={() => navigateToSection("nickname")}
            >
              닉네임 변경
            </button>
          </div>
        </div>

        {/* 비밀번호 정보 (보기만 가능) */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div>
                <p className="font-medium">비밀번호</p>
                <p className="text-gray-600 mt-1 flex items-center">
                  {showPassword ? "실제비밀번호표시" : "********"}
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </p>
              </div>
            </div>
            <button
              className="text-sm px-3 py-1 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 rounded-md transition-colors"
              onClick={() => navigateToSection("password")}
            >
              비밀번호 변경
            </button>
          </div>
        </div>

        {/* 연락처 정보 (보기만 가능)휴대폰 번호 */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">연락처</p>
              <p className="text-gray-600 mt-1">{userInfo?.phone || "등록된 연락처가 없습니다"}</p>
            </div>
            <button
              className="text-sm px-3 py-1 bg-amber-100 text-amber-700 hover:bg-amber-200 rounded-md transition-colors"
              onClick={() => navigateToSection("contact")}
            >
              연락처 변경
            </button>
          </div>
        </div>

        {/* 배송지 관리 정보 (보기만 가능) */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">배송지</p>
              <p className="text-gray-600 mt-1">
                {addresses.length > 0
                  ? `${addresses.length}개의 배송지가 등록되어 있습니다`
                  : "등록된 배송지가 없습니다"}
              </p>
            </div>
            <button
              className="text-sm px-3 py-1 bg-rose-100 text-rose-700 hover:bg-rose-200 rounded-md transition-colors"
              onClick={() => navigateToSection("address")}
            >
              배송지 관리
            </button>
          </div>
        </div>
      </div>
    )
  }

  // 프로필 이미지 변경 섹션
  const renderProfileImageSection = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">프로필 이미지 변경</h2>
        <div className="flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-lg">
          <img
            src={userInfo.profileImage || "/placeholder.svg"}
            alt="프로필 이미지"
            className="w-24 h-24 rounded-full object-cover border-2 border-purple-200"
          />
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-md transition-colors">
              이미지 업로드
            </button>
            <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors">
              기본 이미지로 변경
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
            onClick={() => setActiveSection("all-info")}
          >
            취소
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded-md transition-colors">
            저장하기
          </button>
        </div>
      </div>
    )
  }

  // 닉네임 변경 섹션
  const renderNicknameSection = () => 
  {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">닉네임 변경</h2>
        <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
          <div>
            <label htmlFor="current-nickname" className="block text-sm font-medium text-gray-700 mb-1">
              현재 닉네임
            </label>
            <input id="current-nickname" type="text" value={userInfo.nickname} disabled
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"/>
          </div>
          <div>
            <label htmlFor="new-nickname" className="block text-sm font-medium text-gray-700 mb-1">
              새 닉네임
            </label>
          <input id="new-nickname" type="text" placeholder="새 닉네임을 입력하세요" value={nickname} onChange={(e) => {setNickname(e.target.value); setIsNicknameAvailable(null); setNicknameCheckMsg("")}}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"/>
                <button type="button" onClick={handleNicknameCheck} className="px-3 py-1 bg-blue-500 text-white rounded-md">중복 확인</button>
          </div>
          {nicknameCheckMsg && (
            <p className={`text-sm mt-1 ${isNicknameAvailable ? "text-green-600" : "text-red-600"}`}>
            {nicknameCheckMsg}</p>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
            onClick={() => setActiveSection("all-info")}>
            취소
          </button>
          <button className="px-4 py-2 bg-teal-600 text-white hover:bg-teal-700 rounded-md transition-colors"
          onClick={handleSubmitNickname}>
            저장하기
          </button>
        </div>
      </div>
    )
  }

  // 비밀번호 변경 섹션
  const renderPasswordSection = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">비밀번호 변경</h2>
        <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
          <div>
            <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">현재 비밀번호</label>
            <div className="relative">
              <input id="current-password" type={showCurrentPassword ? "text" : "password"}
                placeholder="현재 비밀번호를 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}> 
                {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
              새 비밀번호
            </label>
            <div className="relative">
              <input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                placeholder="새 비밀번호를 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
              새 비밀번호 확인
            </label>
            <div className="relative">
              <input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="새 비밀번호를 다시 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
            onClick={() => setActiveSection("all-info")}>취소</button>
          <button className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-md transition-colors">
            저장하기
          </button>
        </div>
      </div>
    )
  }

  // 연락처 변경 섹션
  const renderContactSection = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">연락처 변경</h2>
        <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
          <div>
            <label htmlFor="current-phone" className="block text-sm font-medium text-gray-700 mb-1">
              현재 연락처
            </label>
            {/* ✅ 현재 연락처 (읽기 전용, userInfo에서 가져옴) */}
            <input id="current-phone" type="text" value={userInfo?.phone || "등록된 연락처가 없습니다"} disabled
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            {/* ✅ 새 연락처 (사용자 입력값, 상태변수 phone 사용) */}
            <label htmlFor="new-phone" className="block text-sm font-medium text-gray-700 mb-1">
              새 연락처
            </label>
            <input id="new-phone" type="tel" placeholder="(010-1234-5678) 형식으로 입력 해 주세요." value={phone} onChange={handlePhoneChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
            onClick={() => setActiveSection("all-info")}>취소</button>

          <button className="px-4 py-2 bg-amber-600 text-white hover:bg-amber-700 rounded-md transition-colors"
            onClick={handlePhoneSave}>저장하기</button>
        </div>
      </div>
    )
  }

  // 배송지 관리 섹션
  const renderAddressSection = () =>
  {
    //    렌더링 직전에 주소록 배열을 복사하여 정렬합니다.
    //    b.default가 true(1)이면 a.default가 false(0)일 때보다 앞으로 오게 됩니다.
    const sortedAddresses = [...addresses].sort((a, b) => b.default - a.default);
    
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">배송지 관리 ({addresses.length}/10)</h2>

        {addresses.length > 0 ? (
          <div className="space-y-4">
            {sortedAddresses.map((address) => (
              <div key={address.id} className={`p-4 border rounded-lg relative transition-colors
                ${address.default
                  ? 'border-gray-400 bg-gray-100' // 기본 배송지일 때 스타일
                  : 'border-gray-200'           // 아닐 때 스타일
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{address.name}</span>
                      {address.default && (
                        <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded">기본</span>
                      )}
                    </div>
                    <p className="text-sm mt-1">
                      {address.recipient} | {address.phoneNumber}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {address.address} {address.detailAddress}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      ({address.zipCode})
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-sm px-2 py-1 bg-sky-100 text-sky-700 hover:bg-sky-200 rounded transition-colors"
                      onClick={() => handleEditAddress(address)}
                    >
                      수정
                    </button>
                    <button className="text-sm px-2 py-1 bg-rose-100 text-rose-700 hover:bg-rose-200 rounded transition-colors"
                      onClick={() => handleDeleteAddress(address.id)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">등록된 배송지가 없습니다.</p>
          </div>
        )}

        {/* 배송지가 10개 이하일때만 표시  */}
        {addresses.length < 10 && (
          <button
            className="flex items-center justify-center w-full py-3 border border-dashed border-rose-300 rounded-lg hover:bg-rose-50 transition-colors text-rose-600"
            onClick={() => {
              setEditingAddress(null)
              setShowAddressModal(true)
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            배송지 추가
          </button>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
            onClick={() => setActiveSection("all-info")}
          >
            돌아가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors" onClick={handleBack}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">내 정보 관리</h1>
      </div>

      {/* 활성화된 섹션에 따라 다른 컨텐츠 렌더링 */}
      {activeSection === "all-info" && renderAllInfoSection()}
      {activeSection === "profile-image" && renderProfileImageSection()}
      {activeSection === "nickname" && renderNicknameSection()}
      {activeSection === "password" && renderPasswordSection()}
      {activeSection === "contact" && renderContactSection()}
      {activeSection === "address" && renderAddressSection()}

      {/* 배송지 추가/수정 모달 */}
      {showAddressModal && (
        <ShoppingAddressModal
          onClose={() => {
            setShowAddressModal(false)
            setEditingAddress(null)
          }}
          onSave={handleSaveAddress}
          existingAddresses={addresses}
          address={editingAddress}
        />
      )}
    </div>
  )
}
