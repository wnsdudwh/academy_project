import React from 'react'
import '../static/css/Product.css';
import subImg6 from '../static/image/test/best/sub6.png';

const Product = () => {
    return (
        <div className="max-w-[1280px] w-full h-[600px] mx-auto py-10">
            <div className="w-full mb-7 font-semibold text-3xl text-zinc-800">Our Collection</div>

            <div className="button-list flex flex-row justify-between gap-16 text-center text-white">
                <div className="productBtn basis-1/5 h-[40px] rounded-3xl bg-[#343A40] content-center"><p>디지털낱장</p></div>
                <div className="productBtn basis-1/5 h-[40px] rounded-3xl bg-[#838D96] content-center"><p>책자</p></div>
                <div className="productBtn basis-1/5 h-[40px] rounded-3xl bg-[#838D96] content-center"><p>옵셋인쇄</p></div>
                <div className="productBtn basis-1/5 h-[40px] rounded-3xl bg-[#838D96] content-center"><p>디지털인쇄</p></div>
                <div className="productBtn basis-1/5 h-[40px] rounded-3xl bg-[#838D96] content-center"><p>배너</p></div>
            </div>

            <div className="w-full flex flex-row justify-between gap-20 mt-7">
                <div className="basis-1/4">
                    <div className="product-img">
                        <img src={subImg6} alt="상품이미지1~4" />
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="product-tit text-lg font-bold text-[#222222] my-1 mt-5">마케팅명함</div>
                        <div className="product-tit2 text-sm text-[#333333] my-1">100장</div>
                        <div className="product-tit3 text-base text-primary-900 font-semibold my-1">3,300원</div>
                    </div>
                </div>

                <div className="basis-1/4">
                    <div className="product-img">
                        <img src={subImg6} alt="상품이미지1~4" />
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="product-tit text-lg font-bold text-[#222222] my-1 mt-5">대봉투</div>
                        <div className="product-tit2 text-sm text-[#333333] my-1">100장</div>
                        <div className="product-tit3 text-base text-primary-900 font-semibold my-1">5,500원</div>
                    </div>
                </div>

                <div className="basis-1/4">
                    <div className="product-img">
                        <img src={subImg6} alt="상품이미지1~4" />
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="product-tit text-lg font-bold text-[#222222] my-1 mt-5">칼라박스</div>
                        <div className="product-tit2 text-sm text-[#333333] my-1">10장</div>
                        <div className="product-tit3 text-base text-primary-900 font-semibold my-1">3,500원</div>
                    </div>
                </div>

                <div className="basis-1/4">
                    <div className="product-img">
                        <img src={subImg6} alt="상품이미지1~4" />
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="product-tit text-lg font-bold text-[#222222] my-1 mt-5">바인더</div>
                        <div className="product-tit2 text-sm text-[#333333] my-1">1장</div>
                        <div className="product-tit3 text-base text-primary-900 font-semibold my-1">옵션가격</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product