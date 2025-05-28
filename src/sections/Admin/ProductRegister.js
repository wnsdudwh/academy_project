"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import ImagePreview from "./ImagePreview"
import { toast } from "react-hot-toast"
import { Loader2 } from "lucide-react"
import AdminLayout from "./AdminLayout"

const ProductRegister = () => {
  const BASE_URL = process.env.REACT_APP_BACKEND_URL
  const navigate = useNavigate()
  const { register, handleSubmit, reset, formState: { errors }, } = useForm()
  const [thumbnail, setThumbnail] = useState(null)
  const [subImages, setSubImages] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [brandList, setBrandList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [optionList, setOptionList] = useState([]);

  const handleAddOption = () => {
    setOptionList([
      ...optionList,
      {
        optionName: '',
        optionType: '',
        additionalPrice: 0,
        stock: 0,
        soldOut: false,
      },
    ]);
  };
  const handleRemoveOption = (index) => {
    setOptionList(optionList.filter((_, i) => i !== index));
  };
  
  const handleOptionChange = (index, key, value) => {
    const updated = [...optionList];
    updated[index][key] = value;
    setOptionList(updated);
  };

  useEffect(() =>
  {
    axios.get(`${BASE_URL}api/brand`)
    .then(res => setBrandList(res.data))
    .catch(err => console.error("브랜드 목록 로딩 실패 : ", err));

    axios.get(`${BASE_URL}api/category`)
    .then(res => setCategoryList(res.data))
    .catch(err => console.error("카테고리 ㅣ목록 로딩 실패 : ", err))
  }, []);

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

  // form 제출 함수 내부에서 실행되는 부분
  const onSubmit = async (data) => 
  {
    setIsSubmitting(true)
    // 썸네일 미선택 시 사용자에게 경고
    if (!thumbnail) {
      toast.error("썸네일 이미지를 선택해주세요!")
      setIsSubmitting(false)
      return // 등록 진행 막기
    }
// 필수 체크
if (!data.productCode || !data.name || !data.price || !thumbnail || !data.status ||
  data.discount === undefined || data.discountRate === undefined ||
  data.pointRate === undefined || data.stockTotal === undefined ||
  data.brandId === undefined || data.categoryId === undefined ||
  data.shortDescription === undefined) 
{
toast.error("필수 입력값을 모두 채워주세요!");
setIsSubmitting(false);
return;
}

    if (thumbnail && thumbnail.size > 5 * 1024 * 1024) {
      toast.error("썸네일 이미지는 5MB 이하만 가능합니다.")
      setIsSubmitting(false)
      return
    }

    try 
    {
      // FormData 객체 생성
      const formData = new FormData()

      // 문자열 필드
      formData.append("productCode", data.productCode) // 상품 코드 (예: GT-001)
      formData.append("name", data.name) // 상품명
      formData.append("shortDescription", data.shortDescription) // 간략 설명
      formData.append("status", data.status) // 상태 ("AVAILABLE", "SOLD_OUT" 등)

      // 숫자 필드 (필요 시 문자열로 변환 가능)
      formData.append("price", data.price) // 가격
      formData.append("shippingFee", data.shippingFee || 0) // 배송비
      formData.append("stockTotal", data.stockTotal) // 재고 수량

      // 숫자(소수 포함) 필드
      formData.append("discountRate", data.discountRate || 0) // 할인율 (예: 5.0)
      formData.append("pointRate", data.pointRate || 0) // 적립률 (예: 2.5)

      // boolean 필드
      formData.append("discount", data.discount || false) // 할인 여부 (true / false)
      formData.append("visible", data.visible !== false) // 진열 여부 (기본값: true)
      formData.append("newProduct", data.newProduct || false) // 신상품 여부 (기본값: false)

      // 날짜 필드
      if (data.releaseDate) {
        formData.append("releaseDate", data.releaseDate) // 출시일 (yyyy-MM-dd)
      }

      // 태그 필드
      if (data.tags) {
        formData.append("tags", data.tags) // 상품 태그 (콤마 구분)
      }

      // 관계 ID
      formData.append("brandId", data.brandId) // 브랜드 ID (Long)
      formData.append("categoryId", data.categoryId) // 카테고리 ID (Long)

      // 이미지 파일
      formData.append("thumbnail", thumbnail) // 썸네일 이미지 파일 1개
      subImages.forEach((img) => {
        formData.append("subImages", img) // 서브 이미지 여러 장
      })

      // 옵션 목록 (JSON 문자열로 직렬화)
      formData.append("options", JSON.stringify(optionList || [])) // 옵션들 [{optionName, extraPrice}, ...] null일시 빈배열 처리

      // ✅ 디버깅: FormData 전체 콘솔 출력
      for (let [key, value] of formData.entries())
      {
        console.log(`🟡 formData 필드: ${key} →`, value);
      }

      // API 호출 form 전송
      const response = await axios.post(`${BASE_URL}api/products/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      // 등록 성공처리 메시지 및 로그
      toast.success("상품이 성공적으로 등록되었습니다!")
      console.log("상품 등록 성공:", response.data)

      // 폼 초기화 및 화면이동
      reset()
      setThumbnail(null)
      setSubImages([])
      navigate("/admin/products")
    } catch (error) {
      console.error("상품 등록 실패:", error)
      if (error.response?.status === 400) {
        toast.error("요청 형식이 잘못되었습니다. 필수 항목을 확인해주세요.")
      } else {
        toast.error("상품 등록에 실패했습니다. 다시 시도해주세요.")
      }
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
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                상품명 *
              </label>
              <input
                id="name"
                type="text"
                {...register("name", { required: "상품명은 필수입니다" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="상품명을 입력하세요"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
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
              <label htmlFor="stockTotal" className="block text-sm font-medium text-gray-700 mb-1">
                재고 수량 *
              </label>
              <input
                id="stockTotal"
                type="number"
                {...register("stockTotal", {
                  required: "재고 수량은 필수입니다",
                  min: { value: 0, message: "재고는 0개 이상이어야 합니다" },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="재고 수량을 입력하세요"
              />
              {errors.stockTotal && <p className="mt-1 text-sm text-red-600">{errors.stockTotal.message}</p>}
            </div>

            {/* 브랜드 */}
            <div>
              <label htmlFor="brandId" className="block text-sm font-medium text-gray-700 mb-1">브랜드 *</label>
              <select id="brandId" {...register("brandId", { required: "브랜드는 필수입니다" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="">
                <option value="">브랜드를 선택하세요</option>
                {brandList.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
              {errors.brandId && <p className="mt-1 text-sm text-red-600">{errors.brandId.message}</p>}
            </div>

            {/* 카테고리 */}
            <div>
              <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">카테고리 *</label>
              <select id="categoryId"
                {...register("categoryId", { required: "카테고리는 필수입니다" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="">
                <option value="">카테고리를 선택하세요</option>
                {categoryList.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && <p className="mt-1 text-sm text-red-600">{errors.categoryId.message}</p>}
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
                placeholder="배송비를 입력하세요 (기본값: 4,000원)"
                defaultValue={0}
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
                defaultValue={0}
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
                defaultValue={0}
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
          {/* 옵션 등록 섹션 */}
<div className="mt-6">
  <h3 className="text-lg font-semibold mb-2">상품 옵션</h3>

  {optionList.map((option, index) => (
    <div key={index} className="grid grid-cols-2 gap-4 mb-4 border p-3 rounded">
      <input
        type="text"
        placeholder="옵션 이름 (예: Red)"
        value={option.optionName}
        onChange={(e) =>
          handleOptionChange(index, 'optionName', e.target.value)
        }
        className="p-2 border rounded w-full"
      />
      <input
        type="text"
        placeholder="옵션 타입 (예: 색상)"
        value={option.optionType}
        onChange={(e) =>
          handleOptionChange(index, 'optionType', e.target.value)
        }
        className="p-2 border rounded w-full"
      />
      <input
        type="number"
        placeholder="추가 가격 (예: 5000)"
        value={option.additionalPrice}
        onChange={(e) =>
          handleOptionChange(index, 'additionalPrice', e.target.value)
        }
        className="p-2 border rounded w-full"
      />
      <input
        type="number"
        placeholder="재고 수량"
        value={option.stock}
        onChange={(e) =>
          handleOptionChange(index, 'stock', e.target.value)
        }
        className="p-2 border rounded w-full"
      />
      <label className="col-span-2 flex items-center gap-2">
        <input
          type="checkbox"
          checked={option.soldOut}
          onChange={(e) =>
            handleOptionChange(index, 'soldOut', e.target.checked)
          }
        />
        품절 처리
      </label>
      <button
        type="button"
        className="text-red-500 text-sm mt-1"
        onClick={() => handleRemoveOption(index)}
      >
        옵션 삭제
      </button>
    </div>
  ))}

  <button
    type="button"
    className="px-4 py-2 bg-blue-500 text-white rounded"
    onClick={handleAddOption}
  >
    + 옵션 추가
  </button>
</div>


          {/* 체크박스 옵션들 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 진열 여부 */}
            <div className="flex items-center">
              <input
                id="visible"
                type="checkbox"
                {...register("visible")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                defaultChecked={true}
              />
              <label htmlFor="visible" className="ml-2 block text-sm text-gray-700 font-semibold">
                진열 노출
              </label>
            </div>

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

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 상품 태그 */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                상품 태그
              </label>
              <input id="tags" type="text" {...register("tags")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="태그를 콤마(,)로 구분하여 입력하세요 (예: 인기상품, 베스트셀러, 한정판)" />
              <p className="mt-1 text-xs text-gray-500">여러 태그는 콤마(,)로 구분하여 입력하세요</p>
            </div>

            {/* 상태 선택 */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                상품 상태 *
              </label>
              <select id="status" {...register("status", { required: "상품 상태는 필수입니다" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="AVAILABLE">
                <option value="">상태 선택</option>
                <option value="AVAILABLE">판매중</option>
                <option value="SOLD_OUT">품절</option>
              </select>
              {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>}
            </div>
          </div>

          {/* 상품 설명 */}
          <div>
            <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-1">
              상품 설명 *
            </label>
            <textarea
              id="shortDescription"
              {...register("shortDescription", { required: "상품 설명은 필수입니다" })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="상품에 대한 상세 설명을 입력하세요"
            ></textarea>
            {errors.shortDescription && <p className="mt-1 text-sm text-red-600">{errors.shortDescription.message}</p>}
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