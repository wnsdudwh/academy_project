import { Link } from "react-router-dom"
import React from 'react'
import '../../static/css/Header.css';
import logo from '../../static/image/test/header/logo.png';

import { FiUser, FiHeart, FiLogIn, FiLogOut } from "react-icons/fi";

const Header = () => 
{
    const token = localStorage.getItem("token");

    return (
        <header className="w-full bg-slate-100 border-b-2 border-b-blue-200 h-[90px]" id="header">
            <div className="header max-w-[1280px] w-full h-full mx-auto flex flex-row justify-between items-center">
                <div className="logo-zone basis-1/4">
                    <a href="#">
                        <img src={logo} alt="로고 이미지" />
                    </a>
                </div>
                {/* 로고 끝 */}

                <div className="search-form basis-1/2 flex justify-center">
                    <form id="searchForm" className="relative max-w-[360px] w-full">
                        <input className="w-full" name="keyword" type="text" placeholder="검색어입력ㄱㄱ"></input>
                        {/* 돋보기 검색 버튼은 after처리? 아니면 여기서 똑같이 input으로 보여주고 값넘기게(submit) 해야하나?*/}
                    </form>
                </div>
                {/* 검색창 끝 */}

                <div className="quick-menu basis-1/4 flex flex-1 justify-end gap-4 items-center">
                    {token 
                        ? (
                            <>
                                <Link to="/mypage"><FiUser /></Link> {/* 마이페이지 */}
                                <FiLogOut onClick={() => 
                                {
                                    localStorage.removeItem("token");
                                    localStorage.removeItem("nickname");
                                    window.location.href = "/";
                                }} />
                                <FiHeart />
                                {/* 출석체크 버튼 - 이제 별도 페이지로 이동합니다 */}
                                <Link to="/attendance/check" className="ml-4">
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">출석체크</button>
                                </Link>
                            </>
                        ) 
                        : (
                            <>
                                <Link to="/login"><FiLogIn /></Link>   {/* 로그인 */}
                                <Link to="/register"><FiUser /></Link> {/* 회원가입 */}
                                <FiHeart />
                            </>
                        )
                    }
                    {/* <FiHeart /> 최근 본 상품은 로그인 여부와 무관하게 항상 보여줌 사용성을 위해 따로 */}
                    </div>
                {/* 퀵메뉴 끝 */}
            </div>

        </header>
        
    )
}

export default Header