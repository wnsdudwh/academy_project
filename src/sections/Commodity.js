import React from 'react'
import '../static/css/Commodity.css';


import commodityImg1 from '../static/image/Commodity/test/1.png';
import commodityImg2 from '../static/image/Commodity/test/2.png';
import commodityImg3 from '../static/image/Commodity/test/3.png';
import commodityImg4 from '../static/image/Commodity/test/4.png';
import commodityImg5 from '../static/image/Commodity/test/5.png';
import commodityImg6 from '../static/image/Commodity/test/6.png';
import commodityImg7 from '../static/image/Commodity/test/7.png';
import commodityImg8 from '../static/image/Commodity/test/8.png';

const Commodity = () => {
    return (
        <section id="hot-commodity" className="w-full py-16">
            <div className="max-w-[1280px] w-full mx-auto">
                <div className="w-full mb-7 font-semibold text-3xl text-zinc-800 text-center">Hot Picks</div>
                {/*  */}
                    <div className="w-full flex flex-row justify-between mt-7 gap-[4.75rem]">
                        {/* <!-- 상품 아이템들 --> */}
                        <div className="basis-1/4">
                            <img src={commodityImg1} className="w-full object-cover rounded-3xl" alt="상품이미ㅣ지ㅣ1" />
                            <p className="text-center mt-3 text-[#555555] font-medium text-sm">상품1</p>
                            <p className="text-center mt-1 text-[#222222] font-semibold text-lg">가격</p>
                        </div>
                        <div className="basis-1/4">
                            <img src={commodityImg2} className="w-full object-cover rounded-3xl" alt="상품이미ㅣ지ㅣ2" />
                            <p className="text-center mt-3 text-[#555555] font-medium text-sm">상품2</p>
                            <p className="text-center mt-1 text-[#222222] font-semibold text-lg">가격</p>
                        </div>
                        <div className="basis-1/4">
                            <img src={commodityImg3} className="w-full object-cover rounded-3xl" alt="상품이미ㅣ지ㅣ3" />
                            <p className="text-center mt-3 text-[#555555] font-medium text-sm">상품3</p>
                            <p className="text-center mt-1 text-[#222222] font-semibold text-lg">가격</p>
                        </div>
                        <div className="basis-1/4">
                            <img src={commodityImg4} className="w-full object-cover rounded-3xl" alt="상품이미ㅣ지ㅣ4" />
                            <p className="text-center mt-3 text-[#555555] font-medium text-sm">상품4</p>
                            <p className="text-center mt-1 text-[#222222] font-semibold text-lg">가격</p>
                        </div>
                    </div>
                        {/* <!-- 아래 줄 상품 --> */}
                    <div className="w-full flex flex-row justify-between mt-11 gap-[4.75rem]">
                            <div className="basis-1/4">
                                <img src={commodityImg5} className="w-full object-cover rounded-3xl" alt="상품이미ㅣ지ㅣ5" />
                                <p className="text-center mt-3 text-[#555555] font-medium text-sm">상품5</p>
                                <p className="text-center mt-1 text-[#222222] font-semibold text-lg">가격</p>
                            </div>
                            <div className="basis-1/4">
                                <img src={commodityImg6} className="w-full object-cover rounded-3xl" alt="상품이미ㅣ지ㅣ6" />
                                <p className="text-center mt-3 text-[#555555] font-medium text-sm">상품6</p>
                                <p className="text-center mt-1 text-[#222222] font-semibold text-lg">가격</p>
                            </div>
                            <div className="basis-1/4">
                                <img src={commodityImg7} className="w-full object-cover rounded-3xl" alt="상품이미ㅣ지ㅣ7" />
                                <p className="text-center mt-3 text-[#555555] font-medium text-sm">상품7</p>
                                <p className="text-center mt-1 text-[#222222] font-semibold text-lg">가격</p>
                            </div>
                            <div className="basis-1/4">
                                <img src={commodityImg8} className="w-full object-cover rounded-3xl" alt="상품이미ㅣ지ㅣ8" />
                                <p className="text-center mt-3 text-[#555555] font-medium text-sm">상품8</p>
                                <p className="text-center mt-1 text-[#222222] font-semibold text-lg">가격</p>
                            </div>
                    </div>
            </div>
        </section>
    )
}

export default Commodity