"use client"

import { useState } from "react"
import { ArrowLeft, Upload, Eye, EyeOff, Plus, Trash, Check, Edit } from "lucide-react"
import ShoppingAddressModal from "./shopping-address-modal"

const ProfileEdit = ({
  userInfo,
  onBack,
  addresses = [],
  defaultAddressId = null,
  onAddAddress,
  onUpdateAddress,
  onDeleteAddress,
  onSetDefaultAddress,
}) => {
  const [profileImage, setProfileImage] = useState(userInfo?.profileImage || "/placeholder.svg?height=100&width=100")
  const [nickname, setNickname] = useState(userInfo?.nickname || "")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [phone, setPhone] = useState(userInfo?.phone || "")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [activeSection, setActiveSection] = useState("all")
  const [editingAddress, setEditingAddress] = useState(null)
  const [showAddressModal, setShowAddressModal] = useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // 실제 구현 시 API 연동
    console.log("프로필 수정 요청:", { nickname, currentPassword, newPassword, phone })
    alert("프로필이 성공적으로 수정되었습니다.")
    onBack()
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

  const handleEditAddress = (address) => {
    setEditingAddress(address)
    setShowAddressModal(true)
  }

  const handleSaveAddress = (addressData) => {
    if (editingAddress) {
      // 기존 주소 업데이트
      onUpdateAddress({ ...addressData, id: editingAddress.id })
    } else {
      // 새 주소 추가
      onAddAddress(addressData)
    }
    setShowAddressModal(false)
    setEditingAddress(null)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">프로필 수정</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          <div className="bg-gray-50 rounded-xl p-4 sticky top-6">
            <button
              onClick={() => setActiveSection("all")}
              className={`w-full text-left px-4 py-3 rounded-lg mb-2 ${activeSection === "all" ? "bg-emerald-500 text-white" : "hover:bg-gray-100"}`}
            >
              전체 정보
            </button>
            <button
              onClick={() => setActiveSection("profile")}
              className={`w-full text-left px-4 py-3 rounded-lg mb-2 ${activeSection === "profile" ? "bg-emerald-500 text-white" : "hover:bg-gray-100"}`}
            >
              프로필 이미지
            </button>
            <button
              onClick={() => setActiveSection("nickname")}
              className={`w-full text-left px-4 py-3 rounded-lg mb-2 ${activeSection === "nickname" ? "bg-emerald-500 text-white" : "hover:bg-gray-100"}`}
            >
              닉네임 변경
            </button>
            <button
              onClick={() => setActiveSection("password")}
              className={`w-full text-left px-4 py-3 rounded-lg mb-2 ${activeSection === "password" ? "bg-emerald-500 text-white" : "hover:bg-gray-100"}`}
            >
              비밀번호 변경
            </button>
            <button
              onClick={() => setActiveSection("contact")}
              className={`w-full text-left px-4 py-3 rounded-lg mb-2 ${activeSection === "contact" ? "bg-emerald-500 text-white" : "hover:bg-gray-100"}`}
            >
              연락처 변경
            </button>
            <button
              onClick={() => setActiveSection("address")}
              className={`w-full text-left px-4 py-3 rounded-lg ${activeSection === "address" ? "bg-emerald-500 text-white" : "hover:bg-gray-100"}`}
            >
              배송지 관리
            </button>
          </div>
        </div>

        <div className="w-full md:w-3/4">
          <form onSubmit={handleSubmit} className="space-y-8">
            {(activeSection === "all" || activeSection === "profile") && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-lg font-medium mb-4">프로필 이미지</h2>
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <img
                      src={profileImage || "/placeholder.svg"}
                      alt="프로필 이미지"
                      className="w-32 h-32 rounded-full object-cover border-2 border-emerald-500"
                    />
                    <label
                      htmlFor="profile-image"
                      className="absolute bottom-0 right-0 bg-emerald-500 text-white p-2 rounded-full cursor-pointer hover:bg-emerald-600 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                    </label>
                    <input
                      type="file"
                      id="profile-image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                  <p className="text-sm text-gray-500 text-center max-w-xs">
                    JPG, PNG 또는 GIF 형식의 이미지를 업로드해주세요. 최대 파일 크기는 5MB입니다.
                  </p>
                </div>
              </div>
            )}

            {(activeSection === "all" || activeSection === "nickname") && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-lg font-medium mb-4">닉네임 변경</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-1">
                      닉네임
                    </label>
                    <input
                      type="text"
                      id="nickname"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                      placeholder="닉네임을 입력해주세요"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    다른 사용자에게 표시되는 이름입니다. 실명이 아닌 별명을 사용하는 것을 권장합니다.
                  </p>
                </div>
              </div>
            )}

            {(activeSection === "all" || activeSection === "password") && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-lg font-medium mb-4">비밀번호 변경</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                      현재 비밀번호
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        id="current-password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                        placeholder="현재 비밀번호를 입력해주세요"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >
                        {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                      새 비밀번호
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        id="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                        placeholder="새 비밀번호를 입력해주세요"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >
                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                      새 비밀번호 확인
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                        placeholder="새 비밀번호를 다시 입력해주세요"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500">
                    안전한 비밀번호를 위해 8자 이상, 영문, 숫자, 특수문자를 조합해주세요.
                  </p>
                </div>
              </div>
            )}

            {(activeSection === "all" || activeSection === "contact") && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-lg font-medium mb-4">연락처 변경</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      휴대폰 번호
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
                  <p className="text-sm text-gray-500">주문 및 배송 관련 정보를 받을 연락처입니다.</p>
                </div>
              </div>
            )}

            {(activeSection === "all" || activeSection === "address") && (
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">배송지 관리</h2>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingAddress(null)
                      setShowAddressModal(true)
                    }}
                    className="px-3 py-1.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    배송지 추가
                  </button>
                </div>

                {addresses.length > 0 ? (
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className={`border ${address.isDefault ? "border-emerald-500" : "border-gray-200"} rounded-lg p-4 relative`}
                      >
                        <div className="flex justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{address.name}</span>
                            {address.isDefault && (
                              <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full">
                                기본 배송지
                              </span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleEditAddress(address)}
                              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => onDeleteAddress(address.id)}
                              className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-full transition-colors"
                            >
                              <Trash className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-2 text-sm text-gray-700">
                          <p className="mb-1">
                            {address.recipient} · {address.phone}
                          </p>
                          <p>{address.zipcode}</p>
                          <p>{address.address1}</p>
                          <p>{address.address2}</p>
                        </div>

                        {!address.isDefault && (
                          <button
                            type="button"
                            onClick={() => onSetDefaultAddress(address.id)}
                            className="mt-3 px-3 py-1.5 border border-emerald-500 text-emerald-500 rounded-lg hover:bg-emerald-50 transition-colors text-sm flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            기본 배송지로 설정
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 border border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-500 mb-2">등록된 배송지가 없습니다.</p>
                    <p className="text-sm text-gray-400 mb-4">배송지를 추가해주세요.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingAddress(null)
                        setShowAddressModal(true)
                      }}
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors inline-flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      배송지 추가
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeSection !== "address" && (
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onBack}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  저장하기
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* 배송지 추가/수정 모달 */}
      {showAddressModal && (
        <ShoppingAddressModal
          onClose={() => {
            setShowAddressModal(false)
            setEditingAddress(null)
          }}
          onSave={handleSaveAddress}
          address={editingAddress}
          existingAddresses={addresses}
        />
      )}
    </div>
  )
}

export default ProfileEdit
