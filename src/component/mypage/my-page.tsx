"use client"
import React from "react"

import { useEffect, useState } from "react"
import axios from "axios"
import {ShoppingBag,
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

// 사용자 정보 타입 정의
interface UserInfo 
{
  userId: string
  nickname: string
  regDate: string
  point: number
  profileImage?: string
  level?: string
  orderCount?: number
  wishlistCount?: number
  coupons?: number
}

// 메뉴 아이템 타입 정의
interface MenuItem {
  icon: React.ReactNode
  title: string
  value?: string | number
  link: string
  badge?: number
}

export default function MyPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [activeTab, setActiveTab] = useState("profile")
  const [isLoading, setIsLoading] = useState(true)

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
      } catch (error) {
        console.error("사용자 정보를 불러오는 중 오류가 발생했습니다:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [])

  // 메뉴 아이템 정의
  const menuItems: MenuItem[] = userInfo
    ? [
        {
          icon: <ShoppingBag className="w-5 h-5" />,
          title: "주문 내역",
          value: `${userInfo.orderCount}건`,
          link: "/orders",
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
          link: "/addresses",
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
          link: "/settings",
        },
      ]
    : []

  if (isLoading) 
  {
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
          <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors" onClick={() => (window.location.href = "/login")}>
              로그인하기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* 헤더 섹션 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-6">마이페이지</h1>
      </div>

      {/* 프로필 카드 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <img src={userInfo.profileImage || "/placeholder.svg"} alt="프로필 이미지" className="w-24 h-24 rounded-full object-cover border-2 border-gray-200" />
            <span className="absolute bottom-0 right-0 bg-yellow-400 text-xs font-medium px-2 py-1 rounded-full">
              {userInfo.level}
            </span>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-bold mb-1">{userInfo.nickname} 님</h2>
            <p className="text-gray-500 text-sm mb-3">가입일: {new Date(userInfo.regDate).toLocaleDateString()}</p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
              <button className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
                프로필 수정
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
          <a href="/orders" className="text-sm text-gray-500 hover:text-black flex items-center">
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

      {/* 출석체크 모달 (실제로는 별도 컴포넌트로 분리하는 것이 좋습니다) */}
      <div className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">출석체크</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <div
                key={day}
                className={`h-10 flex items-center justify-center rounded-md text-sm
                  ${day <= 15 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-400"}`}
              >
                {day}
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">이번 달 출석일: 15일</p>
            <button className="w-full py-2.5 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
              오늘 출석하기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
