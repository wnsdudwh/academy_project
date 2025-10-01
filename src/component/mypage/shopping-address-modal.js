"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

const ShoppingAddressModal = ({ onClose, onSave, address = null, existingAddresses = [] }) => {
  const [name, setName] = useState(address ? address.name : "")
  const [recipient, setRecipient] = useState(address ? address.recipient : "")
  const [phone, setPhone] = useState(address ? address.phone : "")
  const [zipcode, setZipcode] = useState(address ? address.zipcode : "")
  const [address1, setAddress1] = useState(address ? address.address1 : "")
  const [address2, setAddress2] = useState(address ? address.address2 : "")
  const [isDefault, setIsDefault] = useState(address ? address.isDefault : existingAddresses.length === 0)

  useEffect(() => {
    // 모달이 열릴 때 스크롤 방지
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    // 필수 필드 검증
    if (!name || !recipient || !phone || !zipcode || !address1) {
      alert("모든 필수 항목을 입력해주세요.")
      return
    }

    // 저장 처리
    onSave({
      name,
      recipient,
      phone,
      zipcode,
      address1,
      address2,
      isDefault,
    })
  }

  const formatPhoneNumber = (value) => {
    if (!value) return value
    const phoneNumber = value.replace(/[^\d]/g, "")
    if (phoneNumber.length < 4) return phoneNumber
    if (phoneNumber.length < 8) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`
  }

  const handlePhoneChange = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value)
    setPhone(formattedPhoneNumber)
  }

  const handleSearchAddress = () => {
    // 실제 구현 시 주소 검색 API 연동
    alert("주소 검색 기능은 실제 구현 시 Daum 우편번호 서비스 등을 연동해주세요.")
    // 임시 데이터
    setZipcode("37764")
    setAddress1("경상북도 포항시 남구 중흥로162번길 37-6 (상도동, 웰빙하우스)")
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center z-10 rounded-t-2xl">
          <h2 className="text-xl font-bold">{address ? "배송지 수정" : "배송지 추가"}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="address-name" className="block text-sm font-medium text-gray-700 mb-1">
                배송지명
              </label>
              <input
                type="text"
                id="address-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                placeholder="예: 집, 회사"
              />
            </div>

            <div>
              <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">
                받는 사람
              </label>
              <input
                type="text"
                id="recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                placeholder="받는 사람 이름"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                연락처
              </label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                placeholder="010-0000-0000"
              />
            </div>

            <div>
              <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700 mb-1">
                우편번호
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="zipcode"
                  value={zipcode}
                  readOnly
                  className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 outline-none"
                  placeholder="우편번호"
                />
                <button
                  type="button"
                  onClick={handleSearchAddress}
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex-1"
                >
                  주소 검색
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="address1" className="block text-sm font-medium text-gray-700 mb-1">
                주소
              </label>
              <input
                type="text"
                id="address1"
                value={address1}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 outline-none mb-2"
                placeholder="주소"
              />
              <input
                type="text"
                id="address2"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                placeholder="상세주소 입력"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="default-address"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
                className="w-4 h-4 text-emerald-500 border-gray-300 rounded focus:ring-emerald-500"
              />
              <label htmlFor="default-address" className="ml-2 text-sm text-gray-700">
                기본 배송지로 설정
              </label>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              저장하기
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ShoppingAddressModal
