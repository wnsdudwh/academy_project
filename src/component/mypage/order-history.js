"use client"

import { useState } from "react"
import { ArrowLeft, Search } from "lucide-react"

const OrderHistory = ({ onBack }) => {
  const [activeStatus, setActiveStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // 임시 주문 데이터
  const orders = [
    {
      id: "ORDER123456",
      date: "2025-05-10",
      status: "completed",
      statusText: "배송완료",
      items: [
        {
          id: "ITEM001",
          name: "프리미엄 면 티셔츠",
          option: "화이트 / M",
          price: 29000,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
      totalPrice: 29000,
    },
    {
      id: "ORDER123455",
      date: "2025-05-05",
      status: "shipping",
      statusText: "배송중",
      items: [
        {
          id: "ITEM002",
          name: "캐주얼 데님 팬츠",
          option: "블루 / 32",
          price: 59000,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
        {
          id: "ITEM003",
          name: "베이직 후드 집업",
          option: "블랙 / L",
          price: 49000,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
      totalPrice: 108000,
    },
    {
      id: "ORDER123454",
      date: "2025-04-28",
      status: "preparing",
      statusText: "배송준비",
      items: [
        {
          id: "ITEM004",
          name: "울 블렌드 니트 스웨터",
          option: "네이비 / L",
          price: 79000,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
      totalPrice: 79000,
    },
    {
      id: "ORDER123453",
      date: "2025-04-20",
      status: "paid",
      statusText: "결제완료",
      items: [
        {
          id: "ITEM005",
          name: "가죽 크로스백",
          option: "브라운 / 단일사이즈",
          price: 129000,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
      totalPrice: 129000,
    },
  ]

  // 상태별 필터링
  const filteredOrders = orders
    .filter((order) => {
      if (activeStatus === "all") return true
      if (activeStatus === "paid") return order.status === "paid"
      if (activeStatus === "preparing") return order.status === "preparing"
      if (activeStatus === "shipping") return order.status === "shipping"
      if (activeStatus === "completed") return order.status === "completed"
      return true
    })
    .filter((order) => {
      if (!searchTerm) return true
      return (
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    })

  // 상태별 주문 수 계산
  const orderCounts = {
    all: orders.length,
    paid: orders.filter((order) => order.status === "paid").length,
    preparing: orders.filter((order) => order.status === "preparing").length,
    shipping: orders.filter((order) => order.status === "shipping").length,
    completed: orders.filter((order) => order.status === "completed").length,
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">주문 내역</h1>
      </div>

      <div className="mb-6">
        <div className="relative mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="주문번호 또는 상품명으로 검색"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 mb-6">
          <button
            onClick={() => setActiveStatus("all")}
            className={`flex flex-col items-center justify-center p-3 rounded-xl transition-colors ${activeStatus === "all" ? "bg-emerald-50 border-2 border-emerald-500" : "hover:bg-gray-50 border border-gray-200"}`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${activeStatus === "all" ? "bg-emerald-100" : "bg-gray-100"}`}
            >
              <span className={`text-lg font-bold ${activeStatus === "all" ? "text-emerald-600" : "text-gray-700"}`}>
                {orderCounts.all}
              </span>
            </div>
            <span className={`text-sm ${activeStatus === "all" ? "text-emerald-600 font-medium" : "text-gray-600"}`}>
              전체
            </span>
          </button>

          <button
            onClick={() => setActiveStatus("paid")}
            className={`flex flex-col items-center justify-center p-3 rounded-xl transition-colors ${activeStatus === "paid" ? "bg-emerald-50 border-2 border-emerald-500" : "hover:bg-gray-50 border border-gray-200"}`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${activeStatus === "paid" ? "bg-emerald-100" : "bg-gray-100"}`}
            >
              <span className={`text-lg font-bold ${activeStatus === "paid" ? "text-emerald-600" : "text-gray-700"}`}>
                {orderCounts.paid}
              </span>
            </div>
            <span className={`text-sm ${activeStatus === "paid" ? "text-emerald-600 font-medium" : "text-gray-600"}`}>
              결제완료
            </span>
          </button>

          <button
            onClick={() => setActiveStatus("preparing")}
            className={`flex flex-col items-center justify-center p-3 rounded-xl transition-colors ${activeStatus === "preparing" ? "bg-emerald-50 border-2 border-emerald-500" : "hover:bg-gray-50 border border-gray-200"}`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${activeStatus === "preparing" ? "bg-emerald-100" : "bg-gray-100"}`}
            >
              <span
                className={`text-lg font-bold ${activeStatus === "preparing" ? "text-emerald-600" : "text-gray-700"}`}
              >
                {orderCounts.preparing}
              </span>
            </div>
            <span
              className={`text-sm ${activeStatus === "preparing" ? "text-emerald-600 font-medium" : "text-gray-600"}`}
            >
              배송준비
            </span>
          </button>

          <button
            onClick={() => setActiveStatus("shipping")}
            className={`flex flex-col items-center justify-center p-3 rounded-xl transition-colors ${activeStatus === "shipping" ? "bg-emerald-50 border-2 border-emerald-500" : "hover:bg-gray-50 border border-gray-200"}`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${activeStatus === "shipping" ? "bg-emerald-100" : "bg-gray-100"}`}
            >
              <span
                className={`text-lg font-bold ${activeStatus === "shipping" ? "text-emerald-600" : "text-gray-700"}`}
              >
                {orderCounts.shipping}
              </span>
            </div>
            <span
              className={`text-sm ${activeStatus === "shipping" ? "text-emerald-600 font-medium" : "text-gray-600"}`}
            >
              배송중
            </span>
          </button>

          <button
            onClick={() => setActiveStatus("completed")}
            className={`flex flex-col items-center justify-center p-3 rounded-xl transition-colors ${activeStatus === "completed" ? "bg-emerald-50 border-2 border-emerald-500" : "hover:bg-gray-50 border border-gray-200"}`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${activeStatus === "completed" ? "bg-emerald-100" : "bg-gray-100"}`}
            >
              <span
                className={`text-lg font-bold ${activeStatus === "completed" ? "text-emerald-600" : "text-gray-700"}`}
              >
                {orderCounts.completed}
              </span>
            </div>
            <span
              className={`text-sm ${activeStatus === "completed" ? "text-emerald-600 font-medium" : "text-gray-600"}`}
            >
              배송완료
            </span>
          </button>
        </div>
      </div>

      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-gray-50 p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
                  <p className="font-medium">{order.id}</p>
                </div>
                <div className="flex items-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "completed"
                        ? "bg-emerald-100 text-emerald-700"
                        : order.status === "shipping"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "preparing"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.statusText}
                  </span>
                </div>
              </div>

              <div className="p-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex py-3 border-b border-gray-100 last:border-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-500 mb-1">{item.option}</p>
                      <p className="text-sm text-gray-500">{item.quantity}개</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{item.price.toLocaleString()}원</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-4 flex justify-between items-center">
                <span className="font-medium">총 결제금액</span>
                <span className="text-lg font-bold text-emerald-600">{order.totalPrice.toLocaleString()}원</span>
              </div>

              <div className="p-4 flex justify-between border-t border-gray-200">
                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                    주문 상세
                  </button>
                  {order.status === "completed" && (
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                      리뷰 작성
                    </button>
                  )}
                </div>
                {(order.status === "paid" || order.status === "preparing") && (
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                    주문 취소
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-xl">
          <p className="text-gray-500 mb-2">검색 결과가 없습니다.</p>
          <p className="text-sm text-gray-400">다른 검색어를 입력하거나 필터를 변경해보세요.</p>
        </div>
      )}
    </div>
  )
}

export default OrderHistory