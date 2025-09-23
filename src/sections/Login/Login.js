"use client"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import LoginFooter from "../../sections/Login/LoginFooter"
import LoginHeader from "../../sections/Login/LoginHeader"

import SocialLogin from "./SnsLogin"

// 기존 CSS 파일은 유지하되, 인라인 스타일로 디자인 개선
import "../../static/css/boardLogin.css"

const Login = () => 
{
  const BASE_URL = process.env.REACT_APP_BACKEND_URL
  const [userid, setUserid] = useState("")
  const [userpw, setUserpw] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(BASE_URL + "auth/login", {
        userid,
        userpw,
      })

      // 로그인 시 JWT 토큰들 저장 (브라우저 로컬스토리지에 저장)
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("nickname", response.data.nickname);
      localStorage.setItem("userRole", response.data.role);

      alert(`${response.data.nickname}님, 환영합니다!`);
      navigate("/") //메인 페이지로 이동 /
    } catch (error) {
      alert(error.response?.data || "로그인에 실패했습니다. 다시 시도해주세요.")
    }
  }

  return (
    <>
      {/* <LoginHeader /> */}
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center" data-aos="zoom-out">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">LOGIN</h2>
            <p className="mt-2 text-sm text-gray-600">계정에 로그인하고 쇼핑을 시작하세요</p>
          </div>

          {/* ==================================== */}
          {/* 1. 일반 로그인 전용 form */}
          {/* ==================================== */}
          <form className="mt-8 space-y-6" id="loginForm" onSubmit={handleLogin}>
            <div className="rounded-md -space-y-px">
              <div className="mb-4">
                <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
                  아이디
                </label>
                <input type="text" id="userId" name="userId" placeholder="아이디를 입력해주세요"
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={userid}
                  onChange={(e) => setUserid(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  비밀번호
                </label>
                <input type="password" id="password" name="password" placeholder="비밀번호를 입력해주세요"
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={userpw}
                  onChange={(e) => setUserpw(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember" name="remember" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                  아이디 저장
                </label>
              </div>

              <div className="text-sm">
                <button  type="button" // form 안에 있으므로 submit을 방지하기 위해 type="button"을 명시
                  onClick={() => alert('준비 중인 기능입니다.')} className="font-medium text-indigo-600 hover:text-indigo-500">
                  아이디 / 비밀번호 찾기
                </button>
              </div>
            </div>

            <div>
              <button type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
                로그인
              </button>
            </div>
            </form>

           {/* ============================================ */}
           {/* 2. 소셜 로그인과 회원가입은 form 바깥으로 이동 */}
           {/* ============================================ */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">소셜 계정으로 로그인</span>
              </div>
            </div>

            <div className="mt-6">
              <SocialLogin />
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              계정이 없으신가요?{" "}
              <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                회원가입
              </a>
            </p>
          </div>
        </div>
      </div>
      {/* <LoginFooter /> */}
    </>
  )
}

export default Login