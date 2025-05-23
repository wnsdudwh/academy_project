"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Search, Filter, Eye, Package, Truck, CheckCircle, XCircle } from "lucide-react"
import { toast } from "react-hot-toast"
import AdminLayout from "./AdminLayout"

const OrderManagement = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [ordersPerPage] = useState(10)

  // 주문 상태 옵션
  const statusOptions = [
    { value: "all", label: "전체", color: "gray" },
    { value: "pending", label: "결제대기", color: "yellow" },
    { value: "paid", label: "결제완료", color: "blue" },
    { value: "processing", label: "처리중", color: "purple" },
    { value: "shipping", label: "배송중", color: "orange" },
    { value: "delivered", label: "배송완료", color: "green" },
    { value: "cancelled", label: "취소", color: "red" },
  ]

  // 주문 목록 불러오기
  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await axios.get("/api/admin/orders")
      // 실제 API 대신 더미 데이터 사용
      const dummyOrders = [
        {
          id: 1,
          orderNumber: "ORD-2024-001",
          customerName: "김철수",
          customerEmail: "kim@example.com",
          totalAmount: 450000,
          status: "paid",
          orderDate: "2024-01-15T10:30:00",
          items: [{ productName: "Fender Stratocaster", quantity: 1, price: 450000 }],
        },
        {
          id: 2,
          orderNumber: "ORD-2024-002",
          customerName: "이영희",
          customerEmail: "lee@example.com",
          totalAmount: 320000,
          status: "shipping",
          orderDate: "2024-01-14T15:20:00",
          items: [{ productName: "Yamaha P-125", quantity: 1, price: 320000 }],
        },
        {
          id: 3,
          orderNumber: "ORD-2024-003",
          customerName: "박민수",
          customerEmail: "park@example.com",
          totalAmount: 780000,
          status: "delivered",
          orderDate: "2024-01-13T09:15:00",
          items: [{ productName: "Gibson Les Paul", quantity: 1, price: 780000 }],
        },
      ]
      setOrders(response.data || dummyOrders)
    } catch (error) {
      console.error("주문 목록 불러오기 실패:", error)
      toast.error("주문 목록을 불러오는데 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  // 주문 상태 변경
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`/api/admin/orders/${orderId}/status`, { status: newStatus })
      setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
      toast.success("주문 상태가 변경되었습니다.")
    } catch (error) {
      console.error("주문 상태 변경 실패:", error)
      toast.error("주문 상태 변경에 실패했습니다.")
    }
  }

  // 검색 및 필터링
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // 페이지네이션
  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)

  // 상태별 색상 및 아이콘
  const getStatusInfo = (status) => {
    const statusMap = {
      pending: { color: "bg-yellow-100 text-yellow-800", icon: <Package className="w-4 h-4" /> },
      paid: { color: "bg-blue-100 text-blue-800", icon: <CheckCircle className="w-4 h-4" /> },
      processing: { color: "bg-purple-100 text-purple-800", icon: <Package className="w-4 h-4" /> },
      shipping: { color: "bg-orange-100 text-orange-800", icon: <Truck className="w-4 h-4" /> },
      delivered: { color: "bg-green-100 text-green-800", icon: <CheckCircle className="w-4 h-4" /> },
      cancelled: { color: "bg-red-100 text-red-800", icon: <XCircle className="w-4 h-4" /> },
    }
    return statusMap[status] || statusMap.pending
  }

  // 가격 포맷팅
  const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR").format(price) + "원"
  }

  // 날짜 포맷팅
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">주문 관리</h1>

        {/* 검색 및 필터 */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row gap-4">
            {/* 검색 */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="주문번호, 고객명, 이메일로 검색..."
              />
            </div>

            {/* 상태 필터 */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 주문 목록 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-lg text-gray-600">주문 목록을 불러오는 중...</div>
            </div>
          ) : currentOrders.length === 0 ? (
            <div className="text-center text-gray-600 p-8">
              {searchTerm || statusFilter !== "all" ? "검색 결과가 없습니다." : "주문이 없습니다."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      주문 정보
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      고객 정보
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      주문 금액
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      상태
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      관리
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentOrders.map((order) => {
                    const statusInfo = getStatusInfo(order.status)
                    return (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{order.orderNumber}</div>
                            <div className="text-sm text-gray-500">{formatDate(order.orderDate)}</div>
                            <div className="text-xs text-gray-400">
                              {order.items.map((item, index) => (
                                <div key={index}>
                                  {item.productName} × {item.quantity}
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                            <div className="text-sm text-gray-500">{order.customerEmail}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{formatPrice(order.totalAmount)}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}
                          >
                            {statusInfo.icon}
                            <span className="ml-1">
                              {statusOptions.find((opt) => opt.value === order.status)?.label}
                            </span>
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.id, e.target.value)}
                              className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              {statusOptions.slice(1).map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            <button className="text-blue-600 hover:text-blue-900 focus:outline-none" title="상세보기">
                              <Eye className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
              <div className="flex justify-center">
                <nav className="inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    이전
                  </button>

                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === index + 1
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    다음
                  </button>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

export default OrderManagement
