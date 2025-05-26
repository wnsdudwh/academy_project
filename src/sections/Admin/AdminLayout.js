import { Link, useLocation } from "react-router-dom"
import { Home, Package, PlusCircle, Users, Settings, ShoppingCart } from "lucide-react"

const AdminLayout = ({ children }) => {
  const location = useLocation()

  // 현재 경로가 관리자 페이지인지 확인
  const isAdminPage = location.pathname.startsWith("/admin")

  // 관리자 페이지가 아니면 children만 렌더링
  if (!isAdminPage) {
    return <>{children}</>
  }

  // 관리자 메뉴 항목
  const menuItems = [
    { path: "/admin/dashboard", label: "대시보드", icon: <Home size={18} /> },
    { path: "/admin/products", label: "상품 관리", icon: <Package size={18} /> },
    { path: "/admin/products/register", label: "상품 등록", icon: <PlusCircle size={18} /> },
    { path: "/admin/orders", label: "주문 관리", icon: <ShoppingCart size={18} /> },
    { path: "/admin/users", label: "회원 관리", icon: <Users size={18} /> },
    { path: "/admin/settings", label: "설정", icon: <Settings size={18} /> },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 관리자 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-gray-900">악기 쇼핑몰 관리자</h1>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
                쇼핑몰 홈
              </Link>
              <span className="text-gray-300">|</span>
              <button className="text-sm text-gray-600 hover:text-gray-900">로그아웃</button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row">
          {/* 사이드바 */}
          <div className="w-full md:w-64 bg-white shadow-sm rounded-lg p-4 mb-6 md:mb-0 md:mr-6">
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === item.path
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* 메인 콘텐츠 */}
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout