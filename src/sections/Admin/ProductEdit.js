"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import axios from "axios"
import ImagePreview from "./ImagePreview"
import { toast } from "react-hot-toast"
import { Loader2, ArrowLeft } from "lucide-react"
import AdminLayout from "./AdminLayout"

const ProductEdit = () => 
{
  const { id } = useParams()
  const navigate = useNavigate()
  const { register, handleSubmit, reset, setValue, formState: { errors }, } = useForm()

  const BASE_URL = process.env.REACT_APP_BACKEND_URL
  const [product, setProduct] = useState(null)
  const [thumbnail, setThumbnail] = useState(null)
  const [subImages, setSubImages] = useState([])
  const [existingImages, setExistingImages] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

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

// 1. 브랜드/카테고리 리스트 먼저 가져오기 (최초1회)
useEffect(() => 
{
  const fetchLists = async () => 
  {
    try 
    {
      // ✅ Promise.all로 브랜드와 카테고리 동시 요청
      const [brandRes, categoryRes] = await Promise.all
      ([
        axios.get(`${BASE_URL}api/brand`),
        axios.get(`${BASE_URL}api/category`)
      ]);
      setBrandList(brandRes.data);
      setCategoryList(categoryRes.data);
    } 
    catch (err) 
    {
      toast.error("브랜드/카테고리 목록 불러오기 실패");
    }
  };
  fetchLists();
}, []); // 빈 배열 → 컴포넌트 마운트 시 1회만 실행

  //  2. 브랜드/카테고리 목록 준비된 후 상품 데이터 불러와서 폼에 값 세팅
  useEffect(() => 
  {
    // 아직 id나 브랜드/카테고리 목록이 준비 안 됐다면 skip
    if (!id || brandList.length === 0 || categoryList.length === 0) return;

    // 상품 정보 비동기로 호출
    const fetchProduct = async () => 
    {
      try 
      {
        setLoading(true)  //  로딩 시작(true)
        const response = await axios.get(`${BASE_URL}api/products/${id}`)
        const productData = response.data

        setProduct(productData) //  상품 상태 저장 (필요시 썸네일 등)
        setExistingImages(productData.images || []) //  기존의 이미지 배열을 저장

        // ✅ 아래에서 폼 각 필드에 기존 상품 정보 세팅
        // (react-hook-form의 setValue 활용)
        setValue("productCode", productData.productCode);      // 상품코드
        setValue("name", productData.name);             // 상품명
        setValue("price", productData.price);                  // 판매가
        setValue("shortDescription", productData.shortDescription); // 상품설명
        setValue("brandId", productData.brandId);              // 브랜드 ID (기본 선택값)
        setValue("categoryId", productData.categoryId);        // 카테고리 ID (기본 선택값)
        setValue("stockTotal", productData.stockTotal);             // 재고수량
        setValue("visible", productData.visible ?? true);      // 진열여부
        setValue("newProduct", productData.newProduct ?? false); // 신상품여부
        setValue("releaseDate", productData.releaseDate || ""); // 출시일
        setValue("tags", productData.tags || "");                // 태그
        setValue("shippingFee", productData.shippingFee || 0);   // 배송비
        setValue("discountRate", productData.discountRate || 0); // 할인율
        setValue("pointRate", productData.pointRate || 0);       // 적립률
        setValue("discount", productData.discount || false);     // 할인여부
        setValue("status", productData.status);                  // 상태(AVAILABLE 등)
        // 필요한 추가 필드 계속 setValue로 세팅 가능

        console.log("가져 온 데이터들 [:] ", productData)
      } 
      catch (error) 
      {
        console.error("상품 정보 불러오기 실패:", error)
        toast.error("상품 정보를 불러오는데 실패했습니다.")
        navigate("/admin/products") // 에러시 목록으로 보냄
      } 
      finally 
      {
        setLoading(false)
      }
    };
      fetchProduct();
  }, [id, brandList, categoryList, setValue, navigate]);

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

  const onSubmit = async (data) => 
  {
    try 
    {
      setIsSubmitting(true);
    
      //  FormData 객체 생성
      const formData = new FormData();
    
      //  텍스트 데이터(필드명은 DTO와 정확히 일치)
      formData.append("productCode", data.productCode);      // 상품코드 (PK거나 유니크면 수정 제한 고려)
      formData.append("name", data.name);                    // 상품명
      formData.append("shortDescription", data.shortDescription); // 설명
      formData.append("price", data.price);                  // 가격
      formData.append("stockTotal", data.stockTotal);        // 재고수량
      formData.append("status", data.status);                // 상태(AVAILABLE 등)
      formData.append("brandId", data.brandId);              // 브랜드 ID
      formData.append("categoryId", data.categoryId);        // 카테고리 ID
    
      //  추가 필드
      formData.append("visible", data.visible !== false);    // 진열 여부
      formData.append("newProduct", data.newProduct || false); // 신상품
      if (data.releaseDate) formData.append("releaseDate", data.releaseDate); // 출시일
      if (data.tags) formData.append("tags", data.tags);     // 태그
      formData.append("shippingFee", data.shippingFee || 0); // 배송비
      formData.append("discountRate", data.discountRate || 0); // 할인율
      formData.append("pointRate", data.pointRate || 0);     // 적립률
      formData.append("discount", data.discount || false);   // 할인 여부
    
      //  옵션 목록 (빈 배열도 보내야 에러X)
      formData.append("options", JSON.stringify(optionList || []));
    
      // 삭제할 이미지 ID들 (있을 때만)
      // if (deletedImageIds && deletedImageIds.length > 0) 
      // {
      //   formData.append("deletedImageIds", JSON.stringify(deletedImageIds));
      // }
    
      // 썸네일(수정 시 파일 선택했을 때만)
      if (thumbnail) 
      {
        formData.append("thumbnail", thumbnail);
      }
      // 서브이미지 (수정 시 파일 선택했을 때만)
      if (subImages.length > 0) 
      {
        subImages.forEach((img) => formData.append("subImages", img));
      }
    
      // [디버깅용] 전송 데이터 콘솔로 확인
      for (let [key, value] of formData.entries())
      {
        console.log(`🟡 formData 필드: ${key} →`, value);
      }
    
      // API 호출 - 백엔드 REST 컨벤션에 따라 주소 확인
      const response = await axios.put(
        `${BASE_URL}api/products/update/${id}`, // 이 부분! ("/update/" 누락/경로 일치 여부 확인)
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    
      // 성공 처리
      toast.success("상품이 성공적으로 수정되었습니다!");
      navigate("/admin/products");
      console.log("수정 성공:", response.data);
    } 
    catch (error) 
    {
      // 실패 처리
      console.error("상품 수정 실패:", error);
      if (error.response?.status === 400) 
      {
        toast.error("요청 형식이 잘못되었습니다. 필수 항목을 확인해주세요.");
      } 
      else if (error.response?.status === 404) 
      {
        toast.error("수정하려는 상품이 존재하지 않습니다.");
      } 
      else 
      {
        toast.error("상품 수정에 실패했습니다. 다시 시도해주세요.");
      }
    } 
    finally 
    {
      setIsSubmitting(false);
    }
  }    

  if (loading) 
  {
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
              <label htmlFor="productCode" className="block text-sm font-medium text-gray-700 mb-1">상품 코드 *</label>
              <input id="productCode" type="text" {...register("productCode", { required: "상품 코드는 필수입니다" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: GT-001"
              />
              {errors.productCode && <p className="mt-1 text-sm text-red-600">{errors.productCode.message}</p>}
            </div>

            {/* 상품명 */}
            <div>
              <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">상품명 *</label>
              <input id="productName" type="text" {...register("name", { required: "상품명은 필수입니다" })}
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
                {...register("stockTotal", {
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
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">브랜드 *</label>
              <select id="brandId" {...register("brandId", { required: "브랜드는 필수입니다" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">브랜드를 선택하세요</option>
                {brandList.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
              {errors.brand && <p className="mt-1 text-sm text-red-600">{errors.brand.message}</p>}
            </div>

            {/* 카테고리 */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">카테고리 *</label>
              <select id="categoryId" {...register("categoryId", { required: "카테고리는 필수입니다" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">카테고리를 선택하세요</option>
                {categoryList.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
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
              <input id="shippingFee" type="number" {...register("shippingFee", {
                  min: { value: 0, message: "배송비는 0원 이상이어야 합니다" },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="배송비를 입력하세요 (기본값: 4,000원)"
              />
              {errors.shippingFee && <p className="mt-1 text-sm text-red-600">{errors.shippingFee.message}</p>}
            </div>

            {/* 할인율 */}
            <div>
              <label htmlFor="discountRate" className="block text-sm font-medium text-gray-700 mb-1">
                할인율 (%)
              </label>
              <input id="discountRate" type="number" step="0.1"
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
              <input id="pointRate" type="number" step="0.1"
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
              <input id="visible" type="checkbox" {...register("visible")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
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
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">상품 태그</label>
              <input id="tags" type="text" {...register("tags")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="태그를 콤마(,)로 구분하여 입력하세요 (예: 인기상품, 베스트셀러, 한정판)"
              />
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
                <option value="UNAVAILABLE">판매중지/삭제/숨김</option>
              </select>
              {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>}
            </div>
          </div>

          {/* 상품 설명 */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              상품 설명 *
            </label>
            <textarea id="description" {...register("shortDescription", { required: "상품 설명은 필수입니다" })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="상품에 대한 상세 설명을 입력하세요"
            ></textarea>
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
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