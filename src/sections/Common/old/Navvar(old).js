import React from 'react'
import '../../static/css/Navvar.css';

const Navvar = () => {
    return (
        <nav className="w-full bg-green-300" id="navvar">
            <div className="max-w-[1280px] w-full mx-auto h-[60px] flex items-center" id="navvar">
                {/* 햄버거 메뉴 (클릭시 새창? 같은게 열릴예정) */}
                <div className="basis-1/12 text-center">
                    <button className="text-xl">☰</button>
                </div>

                {/* 서브메뉴 */}
                <div className="flex basis-11/12 text-center font-normal text-lg text-slate-800">
                    <div className="basis-1/6 hover:text-rose-600">셔츠/블라우스</div>
                    <div className="basis-1/6">티셔츠</div>
                    <div className="basis-1/6">팬츠</div>
                    <div className="basis-1/6">스커트</div>
                    <div className="basis-1/6">아우터</div>
                    <div className="basis-1/6">아무거나</div>
                </div>
            </div>
        </nav>
    )
}

export default Navvar