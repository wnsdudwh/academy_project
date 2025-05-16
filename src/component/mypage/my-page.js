"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import {
  ShoppingBag,
  Heart,
  Gift,
  CreditCard,
  MapPin,
  Settings,
  Calendar,
  ChevronRight,
  Bell,
  LogOut,
} from "lucide-react"
import OrderHistory from "./order-history"
import ProfileEdit from "./profile-edit"
import ShoppingAddressModal from "./shopping-address-modal"
import { useNavigate } from "react-router-dom"

export default function MyPage() {
  const [userInfo, setUserInfo] = useState(null)
  const [activeTab, setActiveTab] = useState("profile")
  const [isLoading, setIsLoading] = useState(true)
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [addresses, setAddresses] = useState([])
  const [defaultAddressId, setDefaultAddressId] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true)
        const token = localStorage.getItem("token")

        const response = await axios.get("http://localhost:8080/auth/mypage", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        // 실제 서비스에서는 이런 데이터가 추가로 있을 것입니다
        const enhancedData = {
          ...response.data,
          profileImage: response.data.profileImage || "/placeholder.svg?height=100&width=100",
          level: "골드",
          orderCount: 12,
          wishlistCount: 5,
          coupons: 3,
        }

        setUserInfo(enhancedData)

        // 임시 배송지 데이터
        setAddresses([
          {
            id: "addr1",
            name: "집",
            recipient: "홍길동",
            phone: "010-1234-5678",
            zipcode: "06134",
            address1: "서울특별시 강남구 테헤란로 427",
            address2: "위워크 타워 10층",
            isDefault: true,
          },
        ])
        setDefaultAddressId("addr1")
      } catch (error) {
        console.error("사용자 정보를 불러오는 중 오류가 발생했습니다:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [])

  // 메뉴 아이템 정의
  const menuItems = userInfo
    ? [
        {
          icon: <ShoppingBag className="w-5 h-5" />,
          title: "주문 내역",
          value: `${userInfo.orderCount}건`,
          link: "#",
          onClick: () => setActiveTab("order-history"),
        },
        {
          icon: <Heart className="w-5 h-5" />,
          title: "찜 목록",
          value: `${userInfo.wishlistCount}개`,
          link: "/wishlist",
        },
        {
          icon: <Gift className="w-5 h-5" />,
          title: "쿠폰함",
          value: `${userInfo.coupons}장`,
          link: "/coupons",
        },
        {
          icon: <CreditCard className="w-5 h-5" />,
          title: "포인트",
          value: `${userInfo.point}P`,
          link: "/points",
        },
        {
          icon: <MapPin className="w-5 h-5" />,
          title: "배송지 관리",
          link: "#",
          onClick: () => setActiveTab("profile-edit"),
        },
        {
          icon: <Calendar className="w-5 h-5" />,
          title: "출석체크",
          link: "/attendance/check",
          badge: 1,
        },
        {
          icon: <Bell className="w-5 h-5" />,
          title: "알림 설정",
          link: "/notifications",
        },
        {
          icon: <Settings className="w-5 h-5" />,
          title: "계정 설정",
          link: "#",
          onClick: () => setActiveTab("profile-edit"),
        },
      ]
    : []

  const handleAddAddress = (newAddress) => {
    const newId = `addr${addresses.length + 1}`
    const addressWithId = { ...newAddress, id: newId }

    // 새 주소가 기본 배송지로 설정된 경우 다른 주소들의 기본 배송지 설정 해제
    if (newAddress.isDefault) {
      setAddresses(addresses.map((addr) => ({ ...addr, isDefault: false })).concat(addressWithId))
      setDefaultAddressId(newId)
    } else {
      setAddresses([...addresses, addressWithId])
    }

    setShowAddressModal(false)
  }

  const handleUpdateAddress = (updatedAddress) => {
    // 업데이트된 주소가 기본 배송지로 설정된 경우 다른 주소들의 기본 배송지 설정 해제
    if (updatedAddress.isDefault) {
      setAddresses(
        addresses.map((addr) => (addr.id === updatedAddress.id ? updatedAddress : { ...addr, isDefault: false })),
      )
      setDefaultAddressId(updatedAddress.id)
    } else {
      setAddresses(addresses.map((addr) => (addr.id === updatedAddress.id ? updatedAddress : addr)))

      // 만약 기본 배송지가 업데이트되었고 더 이상 기본 배송지가 아니라면 기본 배송지 ID 초기화
      if (defaultAddressId === updatedAddress.id) {
        setDefaultAddressId(null)
      }
    }
  }

  const handleDeleteAddress = (addressId) => {
    setAddresses(addresses.filter((addr) => addr.id !== addressId))

    // 만약 기본 배송지가 삭제되었다면 기본 배송지 ID 초기화
    if (defaultAddressId === addressId) {
      setDefaultAddressId(null)
    }
  }

  const handleSetDefaultAddress = (addressId) => 
  {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === addressId,
      })),
    )
    setDefaultAddressId(addressId)
  }

  //버튼 클릭시 메인으로 보내기
  const navigate = useNavigate();

  const handleGoBack = () =>
  {
    navigate("/");  //메인으로 ㄱㄱ
  }
  

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-16 w-16 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded mb-3"></div>
          <div className="h-3 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!userInfo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">로그인이 필요합니다</h2>
          <p className="text-gray-500 mb-4">마이페이지를 이용하려면 로그인해주세요.</p>
          <button
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            onClick={() => (window.location.href = "/login")}
          >
            로그인하기
          </button>
        </div>
      </div>
    )
  }

  // 활성 탭에 따라 다른 컴포넌트 렌더링
  if (activeTab === "order-history") {
    return <OrderHistory onBack={() => setActiveTab("profile")} />
  }

  if (activeTab === "profile-edit") {
    return (
      <ProfileEdit
        userInfo={userInfo}
        onBack={() => setActiveTab("profile")}
        addresses={addresses}
        defaultAddressId={defaultAddressId}
        onAddAddress={() => setShowAddressModal(true)}
        onUpdateAddress={handleUpdateAddress}
        onDeleteAddress={handleDeleteAddress}
        onSetDefaultAddress={handleSetDefaultAddress}
      />
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* 헤더 섹션 */}
      <div className="flex items-center mb-6">
        <button className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors" onClick={handleGoBack}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left w-5 h-5" aria-hidden="true">
            <path d="m12 19-7-7 7-7"></path>
            <path d="M19 12H5"></path>
          </svg>
        </button>
      </div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-6">마이페이지</h1>
      </div>

      {/* 프로필 카드 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <img
              src={userInfo.profileImage || "/placeholder.svg"}
              alt="프로필 이미지"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
            />
            <span className="absolute bottom-0 right-0 bg-yellow-400 text-xs font-medium px-2 py-1 rounded-full">
              {userInfo.level}
            </span>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-bold mb-1">{userInfo.nickname} 님</h2>
            <p className="text-gray-500 text-sm mb-3">가입일: {new Date(userInfo.regDate).toLocaleDateString()}</p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
              <button className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                onClick={() => setActiveTab("profile-edit")}
              >프로필 수정
              </button>
              <button className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors flex items-center gap-1">
                <LogOut className="w-3.5 h-3.5" />
                로그아웃
              </button>
            </div>
          </div>

          <div className="hidden md:block bg-gray-50 rounded-lg p-4 min-w-[180px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">포인트</span>
              <span className="font-semibold">{userInfo.point.toLocaleString()}P</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-sm">쿠폰</span>
              <span className="font-semibold">{userInfo.coupons}장</span>
            </div>
          </div>
        </div>
      </div>

      {/* 최근 주문 요약 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">최근 주문 내역</h3>
          <a
            href="#"
            className="text-sm text-gray-500 hover:text-black flex items-center"
            onClick={(e) => {
              e.preventDefault()
              setActiveTab("order-history")
            }}
          >
            전체보기 <ChevronRight className="w-4 h-4 ml-1" />
          </a>
        </div>

        {userInfo.orderCount > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-500 text-sm mb-1">결제완료</p>
              <p className="font-semibold text-lg">2</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-500 text-sm mb-1">배송준비</p>
              <p className="font-semibold text-lg">1</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-500 text-sm mb-1">배송중</p>
              <p className="font-semibold text-lg">3</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-500 text-sm mb-1">배송완료</p>
              <p className="font-semibold text-lg">6</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>최근 주문 내역이 없습니다.</p>
          </div>
        )}
      </div>

      {/* 메뉴 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow relative"
            onClick={(e) => {
              if (item.onClick) {
                e.preventDefault()
                item.onClick()
              }
            }}
          >
            <div className="flex items-center gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">{item.icon}</div>
              <div>
                <h3 className="font-medium">{item.title}</h3>
                {item.value && <p className="text-sm text-gray-500 mt-1">{item.value}</p>}
              </div>
            </div>
            {item.badge && (
              <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-medium px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                {item.badge}
              </span>
            )}
          </a>
        ))}
      </div>

      {/* 배송지 추가 모달 */}
      {showAddressModal && (
        <ShoppingAddressModal
          onClose={() => setShowAddressModal(false)}
          onSave={handleAddAddress}
          existingAddresses={addresses}
        />
      )}
    </div>
  )
}
