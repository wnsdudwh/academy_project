"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Package, Users, ShoppingCart, DollarSign } from "lucide-react"
import AdminLayout from "./AdminLayout"
import axios from "axios"

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: [],
    salesData: [],
    categoryData: [],
    topProducts: [],
  })
  const [loading, setLoading] = useState(true)

  // 대시보드 데이터 불러오기
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        // 실제로는 여러 API 호출을 병렬로 처리
        const [productsRes, usersRes, ordersRes, salesRes] = await Promise.all([
          axios.get("/api/admin/products/count"),
          axios.get("/api/admin/users/count"),
          axios.get("/api/admin/orders/count"),
          axios.get("/api/admin/sales/summary"),
        ])

        setDashboardData({
          totalProducts: productsRes.data.count || 156,
          totalUsers: usersRes.data.count || 1234,
          totalOrders: ordersRes.data.count || 89,
          totalRevenue: salesRes.data.revenue || 15420000,
          recentOrders: salesRes.data.recentOrders || [
            { id: 1, customerName: "김철수", amount: 450000, status: "배송중", date: "2024-01-15" },
            { id: 2, customerName: "이영희", amount: 320000, status: "결제완료", date: "2024-01-15" },
            { id: 3, customerName: "박민수", amount: 780000, status: "배송완료", date: "2024-01-14" },
          ],
          salesData: [
            { month: "1월", sales: 2400000 },
            { month: "2월", sales: 1800000 },
            { month: "3월", sales: 3200000 },
            { month: "4월", sales: 2800000 },
            { month: "5월", sales: 3600000 },
            { month: "6월", sales: 4200000 },
          ],
          categoryData: [
            { name: "Guitar", value: 35, color: "#8884d8" },
            { name: "Bass", value: 20, color: "#82ca9d" },
            { name: "Keyboard", value: 25, color: "#ffc658" },
            { name: "Drums", value: 15, color: "#ff7300" },
            { name: "Accessories", value: 5, color: "#00ff00" },
          ],
          topProducts: [
            { name: "Fender Stratocaster", sales: 45, revenue: 2250000 },
            { name: "Gibson Les Paul", sales: 32, revenue: 4800000 },
            { name: "Yamaha P-125", sales: 28, revenue: 1680000 },
          ],
        })
      } catch (error) {
        console.error("대시보드 데이터 로딩 실패:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  // 숫자 포맷팅 함수
  const formatNumber = (num) => {
    return new Intl.NumberFormat("ko-KR").format(num)
  }

  const formatCurrency = (num) => {
    return new Intl.NumberFormat("ko-KR").format(num) + "원"
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">대시보드 데이터를 불러오는 중...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">관리자 대시보드</h1>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">총 상품 수</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(dashboardData.totalProducts)}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">총 회원 수</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(dashboardData.totalUsers)}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">총 주문 수</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(dashboardData.totalOrders)}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">총 매출</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(dashboardData.totalRevenue)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* 차트 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 월별 매출 차트 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">월별 매출</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData.salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [formatCurrency(value), "매출"]} />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 카테고리별 상품 분포 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">카테고리별 상품 분포</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dashboardData.categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dashboardData.categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 하단 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 최근 주문 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">최근 주문</h3>
            <div className="space-y-3">
              {dashboardData.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-medium text-gray-900">{order.customerName}</p>
                    <p className="text-sm text-gray-600">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{formatCurrency(order.amount)}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.status === "배송완료"
                          ? "bg-green-100 text-green-800"
                          : order.status === "배송중"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 인기 상품 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">인기 상품</h3>
            <div className="space-y-3">
              {dashboardData.topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">판매량: {product.sales}개</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{formatCurrency(product.revenue)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard
