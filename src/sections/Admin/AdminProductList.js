"use client"

import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import { Edit, Trash2, Search, RefreshCw, Plus, Eye, EyeOff, Star } from "lucide-react"
import { toast } from "react-hot-toast"
import AdminLayout from "./AdminLayout"

const AdminProductList = () => 
{
  const BASE_URL = process.env.REACT_APP_BACKEND_URL
  const { id } = useParams(); //URL에서 상품 ID 추출
  const [product, setProduct] = useState(null);

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [brandFilter, setBrandFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [visibilityFilter, setVisibilityFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(10)
  
  const [brandList, setBrandList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [optionList, setOptionList] = useState([]);

  const statusOptions = [
    { value: "all", label: "전체" },
    { value: "active", label: "판매중" },
    { value: "inactive", label: "판매중지" },
    { value: "out_of_stock", label: "품절" },
  ]
  const visibilityOptions = [
    { value: "all", label: "전체" },
    { value: "visible", label: "진열중" },
    { value: "hidden", label: "숨김" },
  ]

  useEffect(() =>
    {
      axios.get(`${BASE_URL}api/brand`)
      .then(res => setBrandList(res.data))
      .catch(err => console.error("브랜드 목록 로딩 실패 : ", err));
  
      axios.get(`${BASE_URL}api/category`)
      .then(res => setCategoryList(res.data))
      .catch(err => console.error("카테고리 ㅣ목록 로딩 실패 : ", err))
    }, []);

    useEffect(() => {
      axios.get(`${BASE_URL}api/products/${id}`)
        .then((res) => {
          setProduct(res.data); // ✅ 백엔드 응답으로 product 정보 설정
        })
        .catch((err) => {
          console.error("상품 정보 불러오기 실패:", err);
          toast.error("상품 정보를 불러오는데 실패했습니다.");
        });
    }, [id]);

  // 상품 목록 불러오기
  const fetchProducts = async () => 
  {
    try {
      setLoading(true)
      const response = await axios.get(`${BASE_URL}api/products`)
      setProducts(response.data)
      setError(null)
    } 
    catch (err) 
    {
      console.error("상품 목록 불러오기 실패:", err)
      setError("상품 목록을 불러오는데 실패했습니다.")
      toast.error("상품 목록을 불러오는데 실패했습니다.")
    } 
    finally 
    {
      setLoading(false)
    }
  }

  // 컴포넌트 마운트 시 상품 목록 불러오기
  useEffect(() => {
    fetchProducts()
  }, [])

  // 검색어 변경 핸들러
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // 검색 시 첫 페이지로 이동
  }

  // 상품 삭제 핸들러
  const handleDeleteProduct = async (productId) => {
    if (window.confirm("정말로 이 상품을 삭제하시겠습니까?")) {
      try {
        await axios.delete(`${BASE_URL}api/products/${productId}`)
        toast.success("상품이 성공적으로 삭제되었습니다.")
        fetchProducts() // 목록 새로고침
      } catch (err) {
        console.error("상품 삭제 실패:", err)
        toast.error("상품 삭제에 실패했습니다.")
      }
    }
  }

  // 상품 상태 변경
  const handleStatusChange = async (productId, newStatus) => {
    try {
      await axios.put(`${BASE_URL}api/products/${productId}/status`, { status: newStatus })
      setProducts((prev) =>
        prev.map((product) => (product.id === productId ? { ...product, status: newStatus } : product)),
      )
      toast.success("상품 상태가 변경되었습니다.")
    } catch (err) {
      console.error("상품 상태 변경 실패:", err)
      toast.error("상품 상태 변경에 실패했습니다.")
    }
  }

  // 진열 여부 토글
  const handleVisibilityToggle = async (productId, currentVisibility) => {
    try {
      const newVisibility = !currentVisibility
      await axios.put(`${BASE_URL}api/products/${productId}/visibility`, { visible: newVisibility })
      setProducts((prev) =>
        prev.map((product) => (product.id === productId ? { ...product, visible: newVisibility } : product)),
      )
      toast.success(`상품이 ${newVisibility ? "진열" : "숨김"} 상태로 변경되었습니다.`)
    } catch (err) {
      console.error("진열 상태 변경 실패:", err)
      toast.error("진열 상태 변경에 실패했습니다.")
    }
  }

  // 검색 및 필터링
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.productCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesBrand = brandFilter === "all" || product.brand === brandFilter
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    const matchesStatus = statusFilter === "all" || product.status === statusFilter
    const matchesVisibility =
      visibilityFilter === "all" ||
      (visibilityFilter === "visible" && product.visible) ||
      (visibilityFilter === "hidden" && !product.visible)

    return matchesSearch && matchesBrand && matchesCategory && matchesStatus && matchesVisibility
  })

  // 페이지네이션 계산
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  // 가격 포맷팅 함수
  const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR").format(price) + "원"
  }

  // 상태별 색상
  const getStatusColor = (status, stock) => {
    if (stock === 0) return "bg-red-100 text-red-800"
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "out_of_stock":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status, stock) => {
    if (stock === 0) return "품절"
    switch (status) {
      case "active":
        return "판매중"
      case "inactive":
        return "판매중지"
      case "out_of_stock":
        return "품절"
      default:
        return "알 수 없음"
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">상품 관리</h1>
          <Link
            to="/admin/products/register"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            상품 등록
          </Link>
        </div>

        {/* 검색 및 필터 */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* 검색 */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="상품명, 코드, 브랜드, 태그로 검색..."
              />
            </div>

            {/* 브랜드 필터 */}
            <div>
              <select
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {brandList.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 카테고리 필터 */}
            <div>
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                {categoryList.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 상태 필터 */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 진열 상태 필터 */}
            <div>
              <select
                value={visibilityFilter}
                onChange={(e) => setVisibilityFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {visibilityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              총 {filteredProducts.length}개 상품 (전체 {products.length}개 중)
            </div>
            <button
              onClick={fetchProducts}
              className="flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              새로고침
            </button>
          </div>
        </div>

        {/* 상품 목록 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
              <span className="ml-2 text-lg text-gray-600">상품 목록을 불러오는 중...</span>
            </div>
          ) : error ? (
            <div className="text-center text-red-600 p-4 border border-red-200 rounded-md bg-red-50">{error}</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center text-gray-600 p-4 border border-gray-200 rounded-md bg-gray-50">
              {searchTerm ||
              brandFilter !== "all" ||
              categoryFilter !== "all" ||
              statusFilter !== "all" ||
              visibilityFilter !== "all"
                ? "검색 결과가 없습니다."
                : "등록된 상품이 없습니다."}
            </div>
          ) : (
            <>
              {/* 상품 목록 테이블 */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        썸네일
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        상품 정보
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        가격
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        재고
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        상태
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        진열/뱃지
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        관리
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-16 h-16 rounded-md overflow-hidden border border-gray-200 flex-shrink-0">
                            <img src={`${BASE_URL.replace(/\/$/, '')}${product.thumbnailUrl}`}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                            {product.productName}
                            {product.newProduct && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                NEW
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">코드: {product.productCode}</div>
                          <div className="text-xs text-gray-500">브랜드: {product.brand}</div>
                          <div className="text-xs text-gray-500">카테고리: {product.category}</div>
                          {product.tags && <div className="text-xs text-gray-500">태그: {product.tags}</div>}
                          {product.releaseDate && (
                            <div className="text-xs text-gray-500">출시일: {product.releaseDate}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-medium">{formatPrice(product.price)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              product.stock > 10
                                ? "bg-green-100 text-green-800"
                                : product.stock > 0
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.stock} 개
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(product.status, product.stock)}`}
                          >
                            {getStatusLabel(product.status, product.stock)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleVisibilityToggle(product.id, product.visible)}
                              className={`p-1 rounded-md ${
                                product.visible
                                  ? "text-green-600 hover:text-green-800 bg-green-50"
                                  : "text-gray-400 hover:text-gray-600 bg-gray-50"
                              }`}
                              title={product.visible ? "진열중 (클릭하여 숨김)" : "숨김 (클릭하여 진열)"}
                            >
                              {product.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </button>
                            {product.newProduct && <Star className="w-4 h-4 text-yellow-500" title="신상품" />}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <select
                              value={product.status}
                              onChange={(e) => handleStatusChange(product.id, e.target.value)}
                              className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="active">판매중</option>
                              <option value="inactive">판매중지</option>
                              <option value="out_of_stock">품절</option>
                            </select>
                            <Link
                              to={`/admin/products/edit/${product.id}`}
                              className="text-indigo-600 hover:text-indigo-900 focus:outline-none"
                              title="수정"
                            >
                              <Edit className="w-5 h-5" />
                              <span className="sr-only">수정</span>
                            </Link>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-600 hover:text-red-900 focus:outline-none"
                              title="삭제"
                            >
                              <Trash2 className="w-5 h-5" />
                              <span className="sr-only">삭제</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 페이지네이션 */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-6 pb-6">
                  <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">이전</span>
                      &laquo;
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
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">다음</span>
                      &raquo;
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminProductList