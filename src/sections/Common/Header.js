import React from 'react'
import '../../static/css/Header.css';
import logo from '../../static/image/test/header/logo.png';

const Header = () => {
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

                <div className="quick-menu basis-1/4 flex flex-1 justify-end">
                    <div className="log-in">
                        <a href="#">
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"/></svg>
                        </a>
                    </div>
                    

                    <div className="my-page">
                        <a href="#">
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>
                        </a>
                    </div>

                    <div className="shopping-cart">
                        <a href="#"><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/></svg>
                        </a>
                    </div>
                    
                </div>
                {/* 퀵메뉴 끝 */}
            </div>
        </header>
    )
}

export default Header