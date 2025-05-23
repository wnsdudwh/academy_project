"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Search, Filter, Edit, Trash2, Mail, Phone } from "lucide-react"
import { toast } from "react-hot-toast"
import AdminLayout from "./AdminLayout"

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(10)

  // 회원 상태 옵션
  const statusOptions = [
    { value: "all", label: "전체" },
    { value: "active", label: "활성" },
    { value: "inactive", label: "비활성" },
    { value: "suspended", label: "정지" },
  ]

  // 회원 목록 불러오기
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await axios.get("/api/admin/users")
      // 실제 API 대신 더미 데이터 사용
      const dummyUsers = [
        {
          id: 1,
          username: "kim_chulsu",
          email: "kim@example.com",
          name: "김철수",
          phone: "010-1234-5678",
          status: "active",
          joinDate: "2024-01-10T09:00:00",
          lastLogin: "2024-01-15T14:30:00",
          orderCount: 5,
          totalSpent: 1250000,
        },
        {
          id: 2,
          username: "lee_younghee",
          email: "lee@example.com",
          name: "이영희",
          phone: "010-2345-6789",
          status: "active",
          joinDate: "2024-01-08T11:20:00",
          lastLogin: "2024-01-14T16:45:00",
          orderCount: 3,
          totalSpent: 890000,
        },
        {
          id: 3,
          username: "park_minsu",
          email: "park@example.com",
          name: "박민수",
          phone: "010-3456-7890",
          status: "inactive",
          joinDate: "2024-01-05T15:10:00",
          lastLogin: "2024-01-12T10:20:00",
          orderCount: 1,
          totalSpent: 450000,
        },
      ]
      setUsers(response.data || dummyUsers)
    } catch (error) {
      console.error("회원 목록 불러오기 실패:", error)
      toast.error("회원 목록을 불러오는데 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // 회원 상태 변경
  const handleStatusChange = async (userId, newStatus) => {
    try {
      await axios.put(`/api/admin/users/${userId}/status`, { status: newStatus })
      setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)))
      toast.success("회원 상태가 변경되었습니다.")
    } catch (error) {
      console.error("회원 상태 변경 실패:", error)
      toast.error("회원 상태 변경에 실패했습니다.")
    }
  }

  // 회원 삭제
  const handleDeleteUser = async (userId) => {
    if (window.confirm("정말로 이 회원을 삭제하시겠습니까?")) {
      try {
        await axios.delete(`/api/admin/users/${userId}`)
        setUsers((prev) => prev.filter((user) => user.id !== userId))
        toast.success("회원이 삭제되었습니다.")
      } catch (error) {
        console.error("회원 삭제 실패:", error)
        toast.error("회원 삭제에 실패했습니다.")
      }
    }
  }

  // 검색 및 필터링
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // 페이지네이션
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

  // 상태별 색상
  const getStatusColor = (status) => {
    const statusMap = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      suspended: "bg-red-100 text-red-800",
    }
    return statusMap[status] || statusMap.inactive
  }

  // 가격 포맷팅
  const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR").format(price) + "원"
  }

  // 날짜 포맷팅
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ko-KR")
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">회원 관리</h1>

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
                placeholder="아이디, 이메일, 이름으로 검색..."
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

        {/* 회원 목록 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-lg text-gray-600">회원 목록을 불러오는 중...</div>
            </div>
          ) : currentUsers.length === 0 ? (
            <div className="text-center text-gray-600 p-8">
              {searchTerm || statusFilter !== "all" ? "검색 결과가 없습니다." : "회원이 없습니다."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      회원 정보
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      연락처
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      가입일
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      주문 정보
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
                  {currentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">@{user.username}</div>
                          <div className="text-xs text-gray-400 flex items-center">
                            <Mail className="w-3 h-3 mr-1" />
                            {user.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          {user.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm text-gray-900">{formatDate(user.joinDate)}</div>
                          <div className="text-xs text-gray-500">최근 로그인: {formatDate(user.lastLogin)}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm text-gray-900">주문 {user.orderCount}회</div>
                          <div className="text-xs text-gray-500">{formatPrice(user.totalSpent)}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}
                        >
                          {statusOptions.find((opt) => opt.value === user.status)?.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <select
                            value={user.status}
                            onChange={(e) => handleStatusChange(user.id, e.target.value)}
                            className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {statusOptions.slice(1).map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <button className="text-blue-600 hover:text-blue-900 focus:outline-none" title="수정">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-900 focus:outline-none"
                            title="삭제"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
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

export default UserManagement
