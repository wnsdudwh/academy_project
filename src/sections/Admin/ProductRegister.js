"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import ImagePreview from "./ImagePreview"
import { toast } from "react-hot-toast"
import { Loader2 } from "lucide-react"
import AdminLayout from "./AdminLayout"

const ProductRegister = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const [thumbnail, setThumbnail] = useState(null)
  const [subImages, setSubImages] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 브랜드와 카테고리 목록 (실제로는 API에서 가져올 수 있음)
  const brands = ["Fender", "Gibson", "Ibanez", "Yamaha", "Roland", "Korg", "Pearl"]
  const categories = ["Guitar", "Bass", "Keyboard", "Drums", "Amplifier", "Accessories"]

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

      // 썸네일 이미지 추가
      if (thumbnail) {
        formData.append("thumbnail", thumbnail)
      }

      // 서브 이미지들 추가
      if (subImages.length > 0) {
        subImages.forEach((image) => {
          formData.append("subImages", image)
        })
      }

      // API 호출
      const response = await axios.post("/api/products/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      toast.success("상품이 성공적으로 등록되었습니다!")

      // 폼 초기화
      reset()
      setThumbnail(null)
      setSubImages([])

      console.log("등록 성공:", response.data)
    } catch (error) {
      console.error("상품 등록 실패:", error)
      toast.error("상품 등록에 실패했습니다. 다시 시도해주세요.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AdminLayout>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">상품 등록</h1>

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

          {/* 이미지 업로드 섹션 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 썸네일 이미지 */}
            <div>
              <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-1">
                썸네일 이미지 *
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
              <p className="mt-1 text-xs text-gray-500">메인 썸네일로 사용될 이미지를 선택하세요</p>

              {/* 썸네일 미리보기 */}
              {thumbnail && (
                <div className="mt-2">
                  <ImagePreview images={[thumbnail]} isThumbnail={true} />
                </div>
              )}
            </div>

            {/* 서브 이미지 */}
            <div>
              <label htmlFor="subImages" className="block text-sm font-medium text-gray-700 mb-1">
                서브 이미지
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
              <p className="mt-1 text-xs text-gray-500">
                상세 페이지에 표시될 추가 이미지를 선택하세요 (여러 장 선택 가능)
              </p>

              {/* 서브 이미지 미리보기 */}
              {subImages.length > 0 && (
                <div className="mt-2">
                  <ImagePreview images={subImages} isThumbnail={false} />
                </div>
              )}
            </div>
          </div>

          {/* 제출 버튼 */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  등록 중...
                </>
              ) : (
                "상품 등록"
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

export default ProductRegister