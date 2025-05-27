"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import axios from "axios"
import ImagePreview from "./ImagePreview"
import { toast } from "react-hot-toast"
import { Loader2, ArrowLeft } from "lucide-react"
import AdminLayout from "./AdminLayout"

const ProductEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm()

  const BASE_URL = process.env.REACT_APP_BACKEND_URL
  const [product, setProduct] = useState(null)
  const [thumbnail, setThumbnail] = useState(null)
  const [subImages, setSubImages] = useState([])
  const [existingImages, setExistingImages] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  // 브랜드와 카테고리 목록
  const brands = ["Fender", "Gibson", "Ibanez", "Yamaha", "Roland", "Korg", "Pearl"]
  const categories = ["Guitar", "Bass", "Keyboard", "Drums", "Amplifier", "Accessories"]

  // 상품 정보 불러오기
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${BASE_URL}api/products/${id}`)
        const productData = response.data

        setProduct(productData)
        setExistingImages(productData.images || [])

        // 폼에 기존 데이터 설정
        setValue("productCode", productData.productCode)
        setValue("productName", productData.productName)
        setValue("price", productData.price)
        setValue("description", productData.description)
        setValue("brand", productData.brand)
        setValue("category", productData.category)
        setValue("stock", productData.stock)
        setValue("visible", productData.visible ?? true)
        setValue("newProduct", productData.newProduct ?? false)
        setValue("releaseDate", productData.releaseDate || "")
        setValue("tags", productData.tags || "")
        setValue("shippingFee", productData.shippingFee || 0)
        setValue("discountRate", productData.discountRate || 0)
        setValue("pointRate", productData.pointRate || 0)
        setValue("discount", productData.discount || false)
      } catch (error) {
        console.error("상품 정보 불러오기 실패:", error)
        toast.error("상품 정보를 불러오는데 실패했습니다.")
        navigate("/admin/products")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id, setValue, navigate])

  const handleThumbnailChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0])
    }
  }

  const handleSubImagesChange = (e) => {
    if (e.target.files) {
      setSubImages(Array.from(e.target.files))
    }
  }

  // 기존 이미지 삭제
  const handleRemoveExistingImage = (imageId) => {
    setExistingImages((prev) => prev.filter((img) => img.id !== imageId))
  }

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true)

      // FormData 객체 생성
      const formData = new FormData()

      // 텍스트 데이터 추가
      formData.append("productName", data.productName)
      formData.append("price", data.price)
      formData.append("description", data.description)
      formData.append("brand", data.brand)
      formData.append("category", data.category)
      formData.append("stock", data.stock)
      formData.append("productCode", data.productCode)

      // 새로운 필드들 추가
      formData.append("visible", data.visible !== false)
      formData.append("newProduct", data.newProduct || false)
      if (data.releaseDate) {
        formData.append("releaseDate", data.releaseDate)
      }
      if (data.tags) {
        formData.append("tags", data.tags)
      }
      formData.append("shippingFee", data.shippingFee || 0)
      formData.append("discountRate", data.discountRate || 0)
      formData.append("pointRate", data.pointRate || 0)
      formData.append("discount", data.discount || false)

      // 삭제할 이미지 ID들 추가
      const deletedImageIds = product.images
        ?.filter((img) => !existingImages.find((existing) => existing.id === img.id))
        .map((img) => img.id)

      if (deletedImageIds && deletedImageIds.length > 0) {
        formData.append("deletedImageIds", JSON.stringify(deletedImageIds))
      }

      // 새 썸네일 이미지 추가
      if (thumbnail) {
        formData.append("thumbnail", thumbnail)
      }

      // 새 서브 이미지들 추가
      if (subImages.length > 0) {
        subImages.forEach((image) => {
          formData.append("subImages", image)
        })
      }

      // API 호출
      const response = await axios.put(`/api/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      toast.success("상품이 성공적으로 수정되었습니다!")
      navigate("/admin/products")

      console.log("수정 성공:", response.data)
    } catch (error) {
      console.error("상품 수정 실패:", error)
      toast.error("상품 수정에 실패했습니다. 다시 시도해주세요.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <span className="ml-2 text-lg text-gray-600">상품 정보를 불러오는 중...</span>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate("/admin/products")}
            className="mr-4 p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">상품 수정</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 상품 코드 */}
            <div>
              <label htmlFor="productCode" className="block text-sm font-medium text-gray-700 mb-1">
                상품 코드 *
              </label>
              <input
                id="productCode"
                type="text"
                {...register("productCode", { required: "상품 코드는 필수입니다" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: GT-001"
              />
              {errors.productCode && <p className="mt-1 text-sm text-red-600">{errors.productCode.message}</p>}
            </div>

            {/* 상품명 */}
            <div>
              <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
                상품명 *
              </label>
              <input
                id="productName"
                type="text"
                {...register("productName", { required: "상품명은 필수입니다" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="상품명을 입력하세요"
              />
              {errors.productName && <p className="mt-1 text-sm text-red-600">{errors.productName.message}</p>}
            </div>

            {/* 가격 */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                가격 (원) *
              </label>
              <input
                id="price"
                type="number"
                {...register("price", {
                  required: "가격은 필수입니다",
                  min: { value: 0, message: "가격은 0원 이상이어야 합니다" },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="가격을 입력하세요"
              />
              {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
            </div>

            {/* 재고 */}
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                재고 수량 *
              </label>
              <input
                id="stock"
                type="number"
                {...register("stock", {
                  required: "재고 수량은 필수입니다",
                  min: { value: 0, message: "재고는 0개 이상이어야 합니다" },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="재고 수량을 입력하세요"
              />
              {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>}
            </div>

            {/* 브랜드 */}
            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                브랜드 *
              </label>
              <select
                id="brand"
                {...register("brand", { required: "브랜드는 필수입니다" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">브랜드 선택</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              {errors.brand && <p className="mt-1 text-sm text-red-600">{errors.brand.message}</p>}
            </div>

            {/* 카테고리 */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                카테고리 *
              </label>
              <select
                id="category"
                {...register("category", { required: "카테고리는 필수입니다" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">카테고리 선택</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
            </div>

            {/* 배송비 */}
            <div>
              <label htmlFor="shippingFee" className="block text-sm font-medium text-gray-700 mb-1">
                배송비 (원)
              </label>
              <input
                id="shippingFee"
                type="number"
                {...register("shippingFee", {
                  min: { value: 0, message: "배송비는 0원 이상이어야 합니다" },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="배송비를 입력하세요 (기본값: 0원)"
              />
              {errors.shippingFee && <p className="mt-1 text-sm text-red-600">{errors.shippingFee.message}</p>}
            </div>

            {/* 할인율 */}
            <div>
              <label htmlFor="discountRate" className="block text-sm font-medium text-gray-700 mb-1">
                할인율 (%)
              </label>
              <input
                id="discountRate"
                type="number"
                step="0.1"
                {...register("discountRate", {
                  min: { value: 0, message: "할인율은 0% 이상이어야 합니다" },
                  max: { value: 100, message: "할인율은 100% 이하여야 합니다" },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="할인율을 입력하세요"
              />
              {errors.discountRate && <p className="mt-1 text-sm text-red-600">{errors.discountRate.message}</p>}
            </div>

            {/* 적립률 */}
            <div>
              <label htmlFor="pointRate" className="block text-sm font-medium text-gray-700 mb-1">
                적립률 (%)
              </label>
              <input
                id="pointRate"
                type="number"
                step="0.1"
                {...register("pointRate", {
                  min: { value: 0, message: "적립률은 0% 이상이어야 합니다" },
                  max: { value: 100, message: "적립률은 100% 이하여야 합니다" },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="적립률을 입력하세요"
              />
              {errors.pointRate && <p className="mt-1 text-sm text-red-600">{errors.pointRate.message}</p>}
            </div>

            {/* 출시일 */}
            <div>
              <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-700 mb-1">
                출시일
              </label>
              <input
                id="releaseDate"
                type="date"
                {...register("releaseDate")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* 상품 설명 */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              상품 설명 *
            </label>
            <textarea
              id="description"
              {...register("description", { required: "상품 설명은 필수입니다" })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="상품에 대한 상세 설명을 입력하세요"
            ></textarea>
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
          </div>

          {/* 상품 태그 */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              상품 태그
            </label>
            <input
              id="tags"
              type="text"
              {...register("tags")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="태그를 콤마(,)로 구분하여 입력하세요 (예: 인기상품, 베스트셀러, 한정판)"
            />
            <p className="mt-1 text-xs text-gray-500">여러 태그는 콤마(,)로 구분하여 입력하세요</p>
          </div>

          {/* 체크박스 옵션들 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 할인 여부 */}
            <div className="flex items-center">
              <input
                id="discount"
                type="checkbox"
                {...register("discount")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="discount" className="ml-2 block text-sm text-gray-700">
                할인 적용
              </label>
            </div>

            {/* 진열 여부 */}
            <div className="flex items-center">
              <input
                id="visible"
                type="checkbox"
                {...register("visible")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="visible" className="ml-2 block text-sm text-gray-700">
                진열 노출
              </label>
            </div>

            {/* 신상품 여부 */}
            <div className="flex items-center">
              <input
                id="newProduct"
                type="checkbox"
                {...register("newProduct")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="newProduct" className="ml-2 block text-sm text-gray-700">
                신상품 뱃지
              </label>
            </div>
          </div>

          {/* 기존 이미지 */}
          {existingImages.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">기존 이미지</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {existingImages.map((image) => (
                  <div key={image.id} className="relative">
                    <img
                      src={image.url || "/placeholder.svg?height=100&width=100"}
                      alt="기존 이미지"
                      className="w-full h-24 object-cover rounded-md border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveExistingImage(image.id)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                    {image.isThumbnail && (
                      <div className="absolute bottom-1 left-1 bg-blue-600 text-white text-xs px-1 rounded">썸네일</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 새 이미지 업로드 섹션 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 새 썸네일 이미지 */}
            <div>
              <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-1">
                새 썸네일 이미지
              </label>
              <div className="mt-1 flex items-center">
                <label className="w-full flex justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer focus:outline-none">
                  <span>파일 선택</span>
                  <input
                    id="thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="sr-only"
                  />
                </label>
              </div>
              <p className="mt-1 text-xs text-gray-500">새 썸네일 이미지를 선택하면 기존 썸네일을 대체합니다</p>

              {/* 새 썸네일 미리보기 */}
              {thumbnail && (
                <div className="mt-2">
                  <ImagePreview images={[thumbnail]} isThumbnail={true} />
                </div>
              )}
            </div>

            {/* 새 서브 이미지 */}
            <div>
              <label htmlFor="subImages" className="block text-sm font-medium text-gray-700 mb-1">
                새 서브 이미지
              </label>
              <div className="mt-1 flex items-center">
                <label className="w-full flex justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer focus:outline-none">
                  <span>파일 선택 (여러 장 가능)</span>
                  <input
                    id="subImages"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleSubImagesChange}
                    className="sr-only"
                  />
                </label>
              </div>
              <p className="mt-1 text-xs text-gray-500">추가할 서브 이미지를 선택하세요 (여러 장 선택 가능)</p>

              {/* 새 서브 이미지 미리보기 */}
              {subImages.length > 0 && (
                <div className="mt-2">
                  <ImagePreview images={subImages} isThumbnail={false} />
                </div>
              )}
            </div>
          </div>

          {/* 제출 버튼 */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  수정 중...
                </>
              ) : (
                "상품 수정"
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

export default ProductEdit