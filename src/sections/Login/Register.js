"use client"

import axios from "axios"
import { useRef, useState } from "react"

const Register = () => {
  const server = process.env.REACT_APP_BACKEND_URL

  const idRef = useRef(null)
  const pwRef = useRef(null)
  const pwCheckRef = useRef(null)
  const nameRef = useRef(null)
  const nickNameRef = useRef(null)

  const [errorMsg, setErrorMsg] = useState("") // 에러 메세지 상태

  const [nickname, setNickname] = useState("") // 닉네임 상태 리셋
  const [nicknameMsg, setNicknameMsg] = useState("") // 닉네임 중복 상태감지 메세지
  const [isNickAvailable, setIsNickAvailable] = useState(true) // 닉네임 중복 상태감지

  // 비밀번호 표시/숨김 상태 추가
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordCheck, setShowPasswordCheck] = useState(false)

  // 입력 필드 유효성 상태 추가
  const [idValid, setIdValid] = useState(true)
  const [pwValid, setPwValid] = useState(true)
  const [pwCheckValid, setPwCheckValid] = useState(true)

  const handleCheckNickname = async () => {
    if (!nickname.trim()) {
      setNicknameMsg("닉네임을 입력해주세요.")
      setIsNickAvailable(false)
      return
    }

    try {
      const resp = await axios.get(`${process.env.REACT_APP_BACKEND_URL}auth/check-nickname?nickname=${nickname}`)
      if (resp.data === true) {
        setNicknameMsg("사용 가능한 닉네임입니다.")
        setIsNickAvailable(true)
      } else {
        setNicknameMsg("이미 사용 중인 닉네임입니다.")
        setIsNickAvailable(false)
      }
    } catch (err) {
      setNicknameMsg("서버 에러 발생")
      setIsNickAvailable(false)
      console.error(err)
    }
  }

  // 아이디 유효성 검사 함수 추가
  const validateId = (id) => {
    const isValid = id.length >= 4 && id.length <= 16
    setIdValid(isValid)
    return isValid
  }

  // 비밀번호 유효성 검사 함수 추가
  const validatePassword = (pw) => {
    const isValid = pw.length >= 6 && pw.length <= 32
    setPwValid(isValid)
    return isValid
  }

  // 비밀번호 확인 검사 함수 추가
  const validatePasswordCheck = () => {
    const isValid = pwRef.current.value === pwCheckRef.current.value
    setPwCheckValid(isValid)
    return isValid
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMsg("") // 초기화

    const id = idRef.current.value.trim()
    const pw = pwRef.current.value.trim()
    const pwCheck = pwCheckRef.current.value.trim()
    const name = nameRef.current.value.trim()
    const nick = nickNameRef.current.value.trim()

    // 1. 필드 유효성 검사
    if (id.length < 4 || id.length > 16) return setErrorMsg("아이디는 4~16자로 입력해주세요.")
    if (pw.length < 6 || pw.length > 32) return setErrorMsg("비밀번호는 6~32자로 입력해주세요.")
    if (pw !== pwCheck) return setErrorMsg("비밀번호가 일치하지 않습니다.")
    if (name.length < 1) return setErrorMsg("이름을 입력해주세요.")
    if (nick.length < 2 || nick.length > 16) return setErrorMsg("닉네임은 2~16자로 입력해주세요.")
    if (!isNickAvailable) return setErrorMsg("닉네임 중복 확인을 해주세요.") // 닉네임 중복 감지. 별도로 빼서 주석해둠.

    // 2. 전송
    axios
      .post(server + "auth/register", {
        userid: id,
        userpw: pw,
        username: name,
        nickname: nick,
      })
      .then((resp) => {
        alert(resp.data)
        window.location.href = "/"
      })
      .catch((error) => {
        console.error(error)
        setErrorMsg("서버 오류가 발생했습니다.")
      })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">회원가입</h2>
          <p className="mt-2 text-sm text-gray-600">계정을 만들고 서비스를 이용하세요</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* 아이디 입력 필드 */}
          <div>
            <label htmlFor="userid" className="block text-sm font-medium text-gray-700 mb-1">
              아이디 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                ref={idRef}
                id="userid"
                placeholder="4~16자 영문, 숫자"
                minLength="4"
                maxLength="16"
                className={`appearance-none relative block w-full px-3 py-3 border ${!idValid ? "border-red-300" : "border-gray-300"} placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                onChange={(e) => validateId(e.target.value)}
              />
              {!idValid && <p className="mt-1 text-xs text-red-500">아이디는 4~16자로 입력해주세요.</p>}
            </div>
          </div>

          {/* 비밀번호 입력 필드 */}
          <div>
            <label htmlFor="userpw" className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                ref={pwRef}
                id="userpw"
                placeholder="6~32자 영문, 숫자, 특수문자"
                minLength="6"
                maxLength="32"
                className={`appearance-none relative block w-full px-3 py-3 border ${!pwValid ? "border-red-300" : "border-gray-300"} placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                onChange={(e) => validatePassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
              {!pwValid && <p className="mt-1 text-xs text-red-500">비밀번호는 6~32자로 입력해주세요.</p>}
            </div>
          </div>

          {/* 비밀번호 확인 입력 필드 */}
          <div>
            <label htmlFor="pwCheck" className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호 확인 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPasswordCheck ? "text" : "password"}
                ref={pwCheckRef}
                id="pwCheck"
                placeholder="비밀번호를 다시 입력해주세요"
                minLength="6"
                maxLength="32"
                className={`appearance-none relative block w-full px-3 py-3 border ${!pwCheckValid ? "border-red-300" : "border-gray-300"} placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                onChange={validatePasswordCheck}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                onClick={() => setShowPasswordCheck(!showPasswordCheck)}
              >
                {showPasswordCheck ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                    <path strokeLinecap="round" strokeLinejoin="round"
                      strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
              {!pwCheckValid && <p className="mt-1 text-xs text-red-500">비밀번호가 일치하지 않습니다.</p>}
            </div>
          </div>

          {/* 이름 입력 필드 */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              이름 <span className="text-red-500">*</span>
            </label>
            <input type="text" ref={nameRef} id="name" placeholder="이름을 입력해주세요" minLength="1" maxLength="16"
              className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
          </div>

          {/* 닉네임 입력 필드 */}
          <div>
            <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-1">
              닉네임 <span className="text-red-500">*</span>
            </label>
            <div className="relative flex">
              <input type="text" ref={nickNameRef} id="nickname" placeholder="2~16자 닉네임" minLength="2" maxLength="16" value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
              <button type="button" onClick={handleCheckNickname}
                className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
                중복 확인
              </button>
            </div>
            {nicknameMsg && (
              <p className={`mt-1 text-xs ${isNickAvailable ? "text-green-500" : "text-red-500"}`}>{nicknameMsg}</p>
            )}
          </div>

          {/* 에러 메시지 표시 */}
          {errorMsg && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{errorMsg}</p>
                </div>
              </div>
            </div>
          )}

          {/* 회원가입 버튼 */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              회원가입
            </button>
          </div>

          {/* 로그인 링크 */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              이미 계정이 있으신가요?{" "}
              <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                로그인
              </a>
            </p>
          </div>
        </form>

        {/* 개인정보 처리 안내 - 추가된 부분 */}
        <div className="mt-6 border-t border-gray-200 pt-4">
          <p className="text-xs text-gray-500 text-center">
            회원가입 시{" "}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              이용약관
            </a>
            과{" "}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              개인정보처리방침
            </a>
            에 동의하게 됩니다.
          </p>
        </div>

        <p className="mt-5 mb-3 text-center text-sm text-gray-500">© 2025 ㅈㅈㅇ</p>
      </div>
    </div>
  )
}

export default Register