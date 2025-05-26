"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { toast } from "react-hot-toast"
import { Save, Trash2, Plus, Loader2 } from "lucide-react"
import AdminLayout from "./AdminLayout"

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("site")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [logoPreview, setLogoPreview] = useState(null)
  const [bannerPreviews, setBannerPreviews] = useState([])
  const [categories, setCategories] = useState([
    { id: 1, name: "Guitar" },
    { id: 2, name: "Bass" },
    { id: 3, name: "Keyboard" },
    { id: 4, name: "Drums" },
    { id: 5, name: "Amplifier" },
    { id: 6, name: "Accessories" },
  ])
  const [brands, setBrands] = useState([
    { id: 1, name: "Fender" },
    { id: 2, name: "Gibson" },
    { id: 3, name: "Ibanez" },
    { id: 4, name: "Yamaha" },
    { id: 5, name: "Roland" },
    { id: 6, name: "Korg" },
    { id: 7, name: "Pearl" },
  ])
  const [newCategory, setNewCategory] = useState("")
  const [newBrand, setNewBrand] = useState("")
  const [admins, setAdmins] = useState([
    { id: 1, username: "admin", email: "admin@example.com", role: "슈퍼관리자", lastLogin: "2024-01-15 14:30:00" },
    { id: 2, username: "manager", email: "manager@example.com", role: "매니저", lastLogin: "2024-01-14 09:15:00" },
  ])
  const [newAdminEmail, setNewAdminEmail] = useState("")
  const [newAdminRole, setNewAdminRole] = useState("매니저")

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  // 설정 데이터 불러오기
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true)
        const response = await axios.get("/api/admin/settings")

        // 실제 API 대신 더미 데이터 사용
        const dummySettings = {
          site_name: "용상의 악기천국",
          site_logo: "/placeholder.svg?height=100&width=200",
          contact_email: "contact@musicstore.com",
          contact_phone: "02-1234-5678",
          customer_service_hours: "평일 09:00-18:00",
          default_shipping_fee: 3000,
          free_shipping_threshold: 50000,
          point_rate: 0.03,
          banners: [
            { id: 1, url: "/placeholder.svg?height=300&width=800", title: "신상품 할인" },
            { id: 2, url: "/placeholder.svg?height=300&width=800", title: "여름 세일" },
          ],
          business_number: "123-45-67890",
          business_address: "서울시 강남구 테헤란로 123",
          payment_methods: ["card", "bank_transfer", "phone"],
          default_shipping_company: "CJ대한통운",
          shipping_description: "주문 후 1-3일 이내 발송",
          return_policy: "상품 수령 후 7일 이내 교환/반품 가능",
          new_member_role: "일반회원",
          allow_guest_order: true,
          allow_duplicate_nickname: false,
          login_fail_limit: 5,
          password_change_cycle: 90,
        }

        // 폼에 데이터 설정
        Object.entries(dummySettings).forEach(([key, value]) => {
          if (typeof value !== "object") {
            setValue(key, value)
          }
        })

        // 로고 미리보기 설정
        setLogoPreview(dummySettings.site_logo)

        // 배너 미리보기 설정
        setBannerPreviews(dummySettings.banners)

        // 결제 수단 체크박스 설정
        dummySettings.payment_methods.forEach((method) => {
          setValue(`payment_method_${method}`, true)
        })

        // 비회원 주문 설정
        setValue("allow_guest_order", dummySettings.allow_guest_order)
        setValue("allow_duplicate_nickname", dummySettings.allow_duplicate_nickname)
      } catch (error) {
        console.error("설정 불러오기 실패:", error)
        toast.error("설정을 불러오는데 실패했습니다.")
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [setValue])

  // 로고 이미지 변경 핸들러
  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setLogoPreview(URL.createObjectURL(file))
    }
  }

  // 배너 이미지 추가 핸들러
  const handleBannerAdd = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const newBanner = {
        id: Date.now(),
        url: URL.createObjectURL(file),
        title: "새 배너",
        file: file,
      }
      setBannerPreviews([...bannerPreviews, newBanner])
    }
  }

  // 배너 삭제 핸들러
  const handleBannerDelete = (bannerId) => {
    setBannerPreviews(bannerPreviews.filter((banner) => banner.id !== bannerId))
  }

  // 카테고리 추가 핸들러
  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const newCategoryObj = {
        id: Date.now(),
        name: newCategory.trim(),
      }
      setCategories([...categories, newCategoryObj])
      setNewCategory("")
    }
  }

  // 카테고리 삭제 핸들러
  const handleDeleteCategory = (categoryId) => {
    setCategories(categories.filter((category) => category.id !== categoryId))
  }

  // 브랜드 추가 핸들러
  const handleAddBrand = () => {
    if (newBrand.trim()) {
      const newBrandObj = {
        id: Date.now(),
        name: newBrand.trim(),
      }
      setBrands([...brands, newBrandObj])
      setNewBrand("")
    }
  }

  // 브랜드 삭제 핸들러
  const handleDeleteBrand = (brandId) => {
    setBrands(brands.filter((brand) => brand.id !== brandId))
  }

  // 관리자 추가 핸들러
  const handleAddAdmin = () => {
    if (newAdminEmail.trim()) {
      const newAdminObj = {
        id: Date.now(),
        username: newAdminEmail.split("@")[0],
        email: newAdminEmail.trim(),
        role: newAdminRole,
        lastLogin: "아직 로그인 없음",
      }
      setAdmins([...admins, newAdminObj])
      setNewAdminEmail("")
      setNewAdminRole("매니저")
    }
  }

  // 관리자 삭제 핸들러
  const handleDeleteAdmin = (adminId) => {
    setAdmins(admins.filter((admin) => admin.id !== adminId))
  }

  // 설정 저장 핸들러
  const onSubmit = async (data) => {
    try {
      setSaving(true)

      // FormData 객체 생성
      const formData = new FormData()

      // 텍스트 데이터 추가
      Object.entries(data).forEach(([key, value]) => {
        if (key.startsWith("payment_method_")) {
          // 결제 수단은 별도 처리
          return
        }
        formData.append(key, value)
      })

      // 결제 수단 배열 생성 및 추가
      const paymentMethods = []
      if (data.payment_method_card) paymentMethods.push("card")
      if (data.payment_method_bank_transfer) paymentMethods.push("bank_transfer")
      if (data.payment_method_phone) paymentMethods.push("phone")
      formData.append("payment_methods", JSON.stringify(paymentMethods))

      // 카테고리 및 브랜드 추가
      formData.append("categories", JSON.stringify(categories))
      formData.append("brands", JSON.stringify(brands))

      // 관리자 목록 추가
      formData.append("admins", JSON.stringify(admins))

      // API 호출
      await axios.post("/api/admin/settings", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      toast.success("설정이 성공적으로 저장되었습니다!")
    } catch (error) {
      console.error("설정 저장 실패:", error)
      toast.error("설정 저장에 실패했습니다. 다시 시도해주세요.")
    } finally {
      setSaving(false)
    }
  }

  // 탭 컨텐츠
  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <span className="ml-2 text-lg text-gray-600">설정을 불러오는 중...</span>
        </div>
      )
    }

    switch (activeTab) {
      case "site":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">사이트 기본 설정</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 쇼핑몰 이름 */}
              <div>
                <label htmlFor="site_name" className="block text-sm font-medium text-gray-700 mb-1">
                  쇼핑몰 이름 *
                </label>
                <input
                  id="site_name"
                  type="text"
                  {...register("site_name", { required: "쇼핑몰 이름은 필수입니다" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.site_name && <p className="mt-1 text-sm text-red-600">{errors.site_name.message}</p>}
              </div>

              {/* 로고 */}
              <div>
                <label htmlFor="site_logo" className="block text-sm font-medium text-gray-700 mb-1">
                  쇼핑몰 로고
                </label>
                <div className="mt-1 flex items-center">
                  <div className="flex-shrink-0 h-16 w-32 bg-gray-100 rounded-md overflow-hidden">
                    {logoPreview && (
                      <img
                        src={logoPreview || "/placeholder.svg"}
                        alt="로고 미리보기"
                        className="h-full w-full object-contain"
                      />
                    )}
                  </div>
                  <label className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none cursor-pointer">
                    로고 변경
                    <input
                      id="site_logo"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="sr-only"
                    />
                  </label>
                </div>
                <p className="mt-1 text-xs text-gray-500">권장 크기: 200 x 50 픽셀</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 대표 이메일 */}
              <div>
                <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700 mb-1">
                  대표 이메일 *
                </label>
                <input
                  id="contact_email"
                  type="email"
                  {...register("contact_email", {
                    required: "대표 이메일은 필수입니다",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "유효한 이메일 주소를 입력하세요",
                    },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.contact_email && <p className="mt-1 text-sm text-red-600">{errors.contact_email.message}</p>}
              </div>

              {/* 대표 연락처 */}
              <div>
                <label htmlFor="contact_phone" className="block text-sm font-medium text-gray-700 mb-1">
                  대표 연락처 *
                </label>
                <input
                  id="contact_phone"
                  type="text"
                  {...register("contact_phone", { required: "대표 연락처는 필수입니다" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 02-1234-5678"
                />
                {errors.contact_phone && <p className="mt-1 text-sm text-red-600">{errors.contact_phone.message}</p>}
              </div>
            </div>

            {/* 고객센터 운영시간 */}
            <div>
              <label htmlFor="customer_service_hours" className="block text-sm font-medium text-gray-700 mb-1">
                고객센터 운영시간
              </label>
              <input
                id="customer_service_hours"
                type="text"
                {...register("customer_service_hours")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 평일 09:00-18:00"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 기본 배송비 */}
              <div>
                <label htmlFor="default_shipping_fee" className="block text-sm font-medium text-gray-700 mb-1">
                  기본 배송비 (원) *
                </label>
                <input
                  id="default_shipping_fee"
                  type="number"
                  {...register("default_shipping_fee", {
                    required: "기본 배송비는 필수입니다",
                    min: { value: 0, message: "0원 이상이어야 합니다" },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.default_shipping_fee && (
                  <p className="mt-1 text-sm text-red-600">{errors.default_shipping_fee.message}</p>
                )}
              </div>

              {/* 무료배송 기준 금액 */}
              <div>
                <label htmlFor="free_shipping_threshold" className="block text-sm font-medium text-gray-700 mb-1">
                  무료배송 기준 금액 (원)
                </label>
                <input
                  id="free_shipping_threshold"
                  type="number"
                  {...register("free_shipping_threshold", {
                    min: { value: 0, message: "0원 이상이어야 합니다" },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.free_shipping_threshold && (
                  <p className="mt-1 text-sm text-red-600">{errors.free_shipping_threshold.message}</p>
                )}
              </div>
            </div>

            {/* 적립금 정책 */}
            <div>
              <label htmlFor="point_rate" className="block text-sm font-medium text-gray-700 mb-1">
                적립금 비율 (%) *
              </label>
              <input
                id="point_rate"
                type="number"
                step="0.1"
                {...register("point_rate", {
                  required: "적립금 비율은 필수입니다",
                  min: { value: 0, message: "0% 이상이어야 합니다" },
                  max: { value: 100, message: "100% 이하여야 합니다" },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">예: 3.0 = 상품가의 3% 적립</p>
              {errors.point_rate && <p className="mt-1 text-sm text-red-600">{errors.point_rate.message}</p>}
            </div>

            {/* 사업자 정보 */}
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-md font-medium text-gray-900 mb-4">사업자 정보</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 사업자등록번호 */}
                <div>
                  <label htmlFor="business_number" className="block text-sm font-medium text-gray-700 mb-1">
                    사업자등록번호 *
                  </label>
                  <input
                    id="business_number"
                    type="text"
                    {...register("business_number", { required: "사업자등록번호는 필수입니다" })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="예: 123-45-67890"
                  />
                  {errors.business_number && (
                    <p className="mt-1 text-sm text-red-600">{errors.business_number.message}</p>
                  )}
                </div>

                {/* 사업장 주소 */}
                <div>
                  <label htmlFor="business_address" className="block text-sm font-medium text-gray-700 mb-1">
                    사업장 주소 *
                  </label>
                  <input
                    id="business_address"
                    type="text"
                    {...register("business_address", { required: "사업장 주소는 필수입니다" })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.business_address && (
                    <p className="mt-1 text-sm text-red-600">{errors.business_address.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )

      case "content":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">UI / 콘텐츠 관리</h3>

            {/* 메인 배너 관리 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-md font-medium text-gray-900">메인 배너 관리</h4>
                <label className="bg-blue-600 text-white py-1 px-3 rounded-md text-sm font-medium hover:bg-blue-700 cursor-pointer">
                  배너 추가
                  <input type="file" accept="image/*" onChange={handleBannerAdd} className="sr-only" />
                </label>
              </div>

              <div className="space-y-4">
                {bannerPreviews.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 border border-gray-200 rounded-md">
                    <p className="text-gray-500">등록된 배너가 없습니다.</p>
                  </div>
                ) : (
                  bannerPreviews.map((banner) => (
                    <div key={banner.id} className="flex items-center p-4 border border-gray-200 rounded-md">
                      <div className="flex-shrink-0 h-20 w-40 bg-gray-100 rounded-md overflow-hidden">
                        <img
                          src={banner.url || "/placeholder.svg"}
                          alt={banner.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <input
                          type="text"
                          value={banner.title}
                          onChange={(e) => {
                            const updatedBanners = bannerPreviews.map((b) =>
                              b.id === banner.id ? { ...b, title: e.target.value } : b,
                            )
                            setBannerPreviews(updatedBanners)
                          }}
                          className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="배너 제목"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleBannerDelete(banner.id)}
                        className="ml-4 text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
              <p className="mt-2 text-xs text-gray-500">권장 크기: 1200 x 400 픽셀</p>
            </div>

            {/* 푸터 정보 */}
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-md font-medium text-gray-900 mb-4">푸터 정보</h4>

              <div className="space-y-4">
                <div>
                  <label htmlFor="footer_info" className="block text-sm font-medium text-gray-700 mb-1">
                    푸터 정보 (HTML 지원)
                  </label>
                  <textarea
                    id="footer_info"
                    rows={5}
                    {...register("footer_info")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="회사 정보, 이용약관 링크 등"
                    defaultValue={`
(주)용상의 악기천국 | 대표: 홍길동 | 사업자등록번호: 123-45-67890
주소: 서울시 강남구 테헤란로 123 | 통신판매업신고: 제2024-서울강남-1234호
개인정보관리책임자: 홍길동 | 호스팅 제공자: (주)용상의 악기천국
고객센터: 02-1234-5678 | 이메일: contact@musicstore.com
                    `.trim()}
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case "product":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">상품 관련 기본 설정</h3>

            {/* 카테고리 관리 */}
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-2">카테고리 관리</h4>

              <div className="flex mb-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="새 카테고리 이름"
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  추가
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                {categories.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-gray-500">등록된 카테고리가 없습니다.</p>
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {categories.map((category) => (
                      <li key={category.id} className="flex justify-between items-center px-4 py-3">
                        <span className="text-gray-900">{category.name}</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteCategory(category.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* 브랜드 관리 */}
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-md font-medium text-gray-900 mb-2">브랜드 관리</h4>

              <div className="flex mb-2">
                <input
                  type="text"
                  value={newBrand}
                  onChange={(e) => setNewBrand(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="새 브랜드 이름"
                />
                <button
                  type="button"
                  onClick={handleAddBrand}
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  추가
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                {brands.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-gray-500">등록된 브랜드가 없습니다.</p>
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {brands.map((brand) => (
                      <li key={brand.id} className="flex justify-between items-center px-4 py-3">
                        <span className="text-gray-900">{brand.name}</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteBrand(brand.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* 재고 알림 설정 */}
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-md font-medium text-gray-900 mb-2">재고 알림 설정</h4>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="stock_notification"
                    type="checkbox"
                    {...register("stock_notification")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="stock_notification" className="ml-2 block text-sm text-gray-900">
                    재고 부족 시 자동 알림 활성화
                  </label>
                </div>

                <div>
                  <label htmlFor="stock_threshold" className="block text-sm font-medium text-gray-700 mb-1">
                    재고 알림 기준 수량
                  </label>
                  <input
                    id="stock_threshold"
                    type="number"
                    {...register("stock_threshold", { min: 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="예: 5"
                    defaultValue={5}
                  />
                  <p className="mt-1 text-xs text-gray-500">재고가 이 수량 이하로 떨어지면 알림이 발송됩니다.</p>
                </div>
              </div>
            </div>

            {/* 상품 등록 기본 설정 */}
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-md font-medium text-gray-900 mb-2">상품 등록 기본 설정</h4>

              <div className="space-y-4">
                <div>
                  <label htmlFor="default_discount_rate" className="block text-sm font-medium text-gray-700 mb-1">
                    기본 할인율 (%)
                  </label>
                  <input
                    id="default_discount_rate"
                    type="number"
                    step="0.1"
                    {...register("default_discount_rate", { min: 0, max: 100 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="예: 10"
                    defaultValue={0}
                  />
                </div>

                <div className="flex items-center">
                  <input
                    id="use_product_code_auto"
                    type="checkbox"
                    {...register("use_product_code_auto")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="use_product_code_auto" className="ml-2 block text-sm text-gray-900">
                    상품 코드 자동 생성 사용
                  </label>
                </div>
              </div>
            </div>
          </div>
        )

      case "payment":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">결제 / 배송 정책 설정</h3>

            {/* 결제 수단 설정 */}
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-2">결제 수단 설정</h4>

              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="payment_method_card"
                    type="checkbox"
                    {...register("payment_method_card")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="payment_method_card" className="ml-2 block text-sm text-gray-900">
                    신용카드 / 체크카드
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="payment_method_bank_transfer"
                    type="checkbox"
                    {...register("payment_method_bank_transfer")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="payment_method_bank_transfer" className="ml-2 block text-sm text-gray-900">
                    무통장 입금
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="payment_method_phone"
                    type="checkbox"
                    {...register("payment_method_phone")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="payment_method_phone" className="ml-2 block text-sm text-gray-900">
                    휴대폰 결제
                  </label>
                </div>
              </div>
            </div>

            {/* 배송 정책 */}
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-md font-medium text-gray-900 mb-2">배송 정책</h4>

              <div className="space-y-4">
                <div>
                  <label htmlFor="default_shipping_company" className="block text-sm font-medium text-gray-700 mb-1">
                    기본 배송사
                  </label>
                  <select
                    id="default_shipping_company"
                    {...register("default_shipping_company")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="CJ대한통운">CJ대한통운</option>
                    <option value="롯데택배">롯데택배</option>
                    <option value="우체국택배">우체국택배</option>
                    <option value="로젠택배">로젠택배</option>
                    <option value="한진택배">한진택배</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="shipping_description" className="block text-sm font-medium text-gray-700 mb-1">
                    배송 안내 문구
                  </label>
                  <textarea
                    id="shipping_description"
                    rows={3}
                    {...register("shipping_description")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="배송 관련 안내 문구를 입력하세요"
                  />
                </div>
              </div>
            </div>

            {/* 반품/교환 정책 */}
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-md font-medium text-gray-900 mb-2">반품/교환 정책</h4>

              <div>
                <label htmlFor="return_policy" className="block text-sm font-medium text-gray-700 mb-1">
                  반품/교환 안내 문구
                </label>
                <textarea
                  id="return_policy"
                  rows={5}
                  {...register("return_policy")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="반품/교환 관련 안내 문구를 입력하세요"
                />
              </div>
            </div>
          </div>
        )

      case "member":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">회원 정책 설정</h3>

            {/* 회원 기본 설정 */}
            <div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="new_member_role" className="block text-sm font-medium text-gray-700 mb-1">
                    신규 가입 시 기본 권한
                  </label>
                  <select
                    id="new_member_role"
                    {...register("new_member_role")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="일반회원">일반회원</option>
                    <option value="VIP회원">VIP회원</option>
                    <option value="판매자">판매자</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    id="allow_guest_order"
                    type="checkbox"
                    {...register("allow_guest_order")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="allow_guest_order" className="ml-2 block text-sm text-gray-900">
                    비회원 주문 허용
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="allow_duplicate_nickname"
                    type="checkbox"
                    {...register("allow_duplicate_nickname")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="allow_duplicate_nickname" className="ml-2 block text-sm text-gray-900">
                    닉네임 중복 허용
                  </label>
                </div>
              </div>
            </div>

            {/* 로그인 보안 설정 */}
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-md font-medium text-gray-900 mb-2">로그인 보안 설정</h4>

              <div className="space-y-4">
                <div>
                  <label htmlFor="login_fail_limit" className="block text-sm font-medium text-gray-700 mb-1">
                    로그인 실패 제한 횟수
                  </label>
                  <input
                    id="login_fail_limit"
                    type="number"
                    {...register("login_fail_limit", { min: 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="예: 5"
                  />
                  <p className="mt-1 text-xs text-gray-500">0으로 설정하면 제한하지 않습니다.</p>
                </div>

                <div>
                  <label htmlFor="password_change_cycle" className="block text-sm font-medium text-gray-700 mb-1">
                    비밀번호 변경 주기 (일)
                  </label>
                  <input
                    id="password_change_cycle"
                    type="number"
                    {...register("password_change_cycle", { min: 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="예: 90"
                  />
                  <p className="mt-1 text-xs text-gray-500">0으로 설정하면 변경 주기를 적용하지 않습니다.</p>
                </div>
              </div>
            </div>

            {/* 회원 등급 설정 */}
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-md font-medium text-gray-900 mb-2">회원 등급 설정</h4>

              <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        등급명
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        최소 구매액
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        적립률 (%)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">일반회원</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0원</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">실버회원</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">100,000원</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">골드회원</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">500,000원</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">VIP회원</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1,000,000원</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">7%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                회원 등급은 현재 기본 설정만 제공됩니다. 추후 업데이트 예정입니다.
              </p>
            </div>
          </div>
        )

      case "security":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">보안 / 관리</h3>

            {/* 관리자 계정 관리 */}
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-2">관리자 계정 관리</h4>

              <div className="bg-white border border-gray-200 rounded-md overflow-hidden mb-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        아이디
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        이메일
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        권한
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        최근 로그인
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        관리
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {admins.map((admin) => (
                      <tr key={admin.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{admin.username}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.lastLogin}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {admin.username !== "admin" && (
                            <button
                              type="button"
                              onClick={() => handleDeleteAdmin(admin.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-end space-x-4">
                <div className="flex-1">
                  <label htmlFor="newAdminEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    새 관리자 이메일
                  </label>
                  <input
                    id="newAdminEmail"
                    type="email"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="example@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="newAdminRole" className="block text-sm font-medium text-gray-700 mb-1">
                    권한
                  </label>
                  <select
                    id="newAdminRole"
                    value={newAdminRole}
                    onChange={(e) => setNewAdminRole(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="매니저">매니저</option>
                    <option value="슈퍼관리자">슈퍼관리자</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={handleAddAdmin}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 접근 로그 */}
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-md font-medium text-gray-900 mb-2">접근 로그</h4>

              <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        관리자
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        IP 주소
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        작업
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        일시
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">admin</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">192.168.1.1</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">로그인</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-01-15 14:30:00</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">admin</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">192.168.1.1</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">상품 등록</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-01-15 14:35:22</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">manager</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">192.168.1.2</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">로그인</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-01-14 09:15:00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs text-gray-500">최근 10개의 로그만 표시됩니다.</p>
            </div>

            {/* 보안 설정 */}
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-md font-medium text-gray-900 mb-2">보안 설정</h4>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="use_two_factor_auth"
                    type="checkbox"
                    {...register("use_two_factor_auth")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="use_two_factor_auth" className="ml-2 block text-sm text-gray-900">
                    관리자 2단계 인증 사용
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="use_ip_restriction"
                    type="checkbox"
                    {...register("use_ip_restriction")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="use_ip_restriction" className="ml-2 block text-sm text-gray-900">
                    IP 접근 제한 사용
                  </label>
                </div>

                <div>
                  <label htmlFor="allowed_ips" className="block text-sm font-medium text-gray-700 mb-1">
                    허용 IP 주소 (한 줄에 하나씩)
                  </label>
                  <textarea
                    id="allowed_ips"
                    rows={3}
                    {...register("allowed_ips")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="예: 192.168.1.1"
                    defaultValue="192.168.1.1"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    IP 접근 제한을 사용할 경우 위 IP에서만 관리자 페이지 접근이 가능합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <AdminLayout>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">관리자 설정</h1>

        {/* 탭 메뉴 */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("site")}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "site"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              사이트 기본 설정
            </button>
            <button
              onClick={() => setActiveTab("content")}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "content"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              UI / 콘텐츠 관리
            </button>
            <button
              onClick={() => setActiveTab("product")}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "product"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              상품 관련 설정
            </button>
            <button
              onClick={() => setActiveTab("payment")}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "payment"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              결제 / 배송 정책
            </button>
            <button
              onClick={() => setActiveTab("member")}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "member"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              회원 정책
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "security"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              보안 / 관리
            </button>
          </nav>
        </div>

        {/* 탭 컨텐츠 */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderTabContent()}

          {/* 저장 버튼 */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {saving ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  저장 중...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  설정 저장
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

export default AdminSettings
