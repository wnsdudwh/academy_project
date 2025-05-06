import React from 'react'

import LoginFooter from '../../sections/Login/LoginFooter'
import LoginHeader from '../../sections/Login/LoginHeader'

import '../../static/css/boardLogin.css'

const Login = () => {
    
  return (
    <>
        <LoginHeader />
        <div class="loginPage">
            <div class="loginContainer">
                <div class="loginSec"  data-aos="zoom-out">
                    <h2 class="loginTit">LOGIN</h2>
                    <form id="loginForm">
                        <div class="idForm">
                            <label for="userId">아이디</label>
                            <input type="text" id="userId" name="userId" placeholder="아이디" class="inputId" required/>
                        </div>
                        <div class="passForm">
                            <label for="password">비밀번호</label>
                            <input type="password" id="password" name="password" placeholder="비밀번호" class="inputPass" required/>
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
