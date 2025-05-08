import React from 'react'
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import LoginFooter from '../../sections/Login/LoginFooter'
import LoginHeader from '../../sections/Login/LoginHeader'

import '../../static/css/boardLogin.css'

const Login = () => 
{
    const [userid, setUserid] = useState("");
    const [userpw, setUserpw] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) =>
    {
        e.preventDefault();

        try 
        {
            const response = await axios.post("http://localhost:8080/auth/login", 
                {
                    userid,
                    userpw
                });

                // 🧠 JWT 토큰 저장 (브라우저 로컬스토리지에 저장)
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("nickname", response.data.nickname);

                alert("로그인 성공!");
                navigate("/");  //메인 페이지로 이동 /
        } 
        catch (error) 
        {
            alert(error.response?.data || "로그인 실패");
        }
    }
    
  return (
    <>
        <LoginHeader />
        <div class="loginPage">
            <div class="loginContainer">
                <div class="loginSec"  data-aos="zoom-out">
                    <h2 class="loginTit">LOGIN</h2>
                    <form id="loginForm" onSubmit={handleLogin}>
                        <div class="idForm">
                            <label for="userId">아이디</label>
                            <input type="text" id="userId" name="userId" placeholder="아이디" class="inputId" value={userid} onChange={(e) => setUserid(e.target.value)} required/>
                        </div>
                        <div class="passForm">
                            <label for="password">비밀번호</label>
                            <input type="password" id="password" name="password" placeholder="비밀번호" class="inputPass" value={userpw} onChange={(e) => setUserpw(e.target.value)} required/>
                        </div>
                        <div class="informationAcc">
                            <div class="rememberId">
                                <input type="checkbox" id="remember" name="remember" class="rememberBtn"/>
                                <label for="remember" class="ml-2 block text-sm text-gray-900">아이디 저장</label>
                            </div>
                            <div class="findAccount text-sm">
                                <a href="#">아이디 / 비밀번호 찾기</a>
                            </div>
                        </div>
                        <div>
                            <button type="submit" class="loginSubmit">로그인</button>
                        </div>
                        <div class="n-login__btn-wrap login-sns">
                            <button type="button" onclick="javascript(0)" class="c-btn--round n-login__btn--kakao">
                                <span>카카오 로그인</span>
                            </button>
                            <button type="button" onclick="javascript(0)" class="c-btn--round n-login__btn--naveri">
                                <span>네이버 로그인</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <LoginFooter />
    </>
  )
}

export default Login
