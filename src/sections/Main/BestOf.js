import React from 'react'
import '../../static/css/BestOf.css';
import mainImg1 from '../../static/image/Product/dummy/thumb.jpg';
// 이미지 임포트
import subImg1 from "../../static/image/Product/dummy/sub1.jpg"
import subImg2 from "../../static/image/Product/dummy/sub2.jpg"
import subImg3 from "../../static/image/Product/dummy/sub3.jpg"
import subImg4 from "../../static/image/Product/dummy/sub4.jpg"
import subImg5 from "../../static/image/Product/dummy/sub5.jpg"
import subImg6 from "../../static/image/Product/dummy/sub6.jpg"

const BestOf = () => {
    return (
        <div className="max-w-[1280px] w-full py-10 mx-auto">
            <div className="w-full mb-9 font-semibold text-3xl text-zinc-800">Featured Collections</div>

            <div className="w-full mx-auto flex gap-14 text-center">
                {/* 왼쪽 큰카드 */}
                <div className="basis-2/5">
                    <a href="#">
                        <div className="best-main aspect-square">
                            <img src={mainImg1} className="rounded-[150px]" alt="상품 메인 이미지1"/>
                            <div className="mt-4 text-xl font-medium">컬러낱장</div>
                        </div>
                    </a>
                </div>

                {/* 오른쪽 작은 카드 3x2 */}
                <div className="basis-3/5 grid grid-cols-3 gap-8">
                         {/* 카드 6개 */}
                        <a href="#">
                            <div className="aspect-square">
                                <img src={subImg1} className="rounded-[70px]" alt="상품 서브 이미지1"/>
                                <div className="mt-3 text-lg font-normal">옵셋낱장</div>
                            </div>
                        </a>    

                        <a href="#">
                            <div className="aspect-square">
                                <img src={subImg2} className="rounded-[70px]" alt="상품 서브 이미지2"/>
                                <div className="mt-3 text-lg font-normal">배너출력물</div>
                            </div>
                        </a>

                        <a href="#">
                            <div className="aspect-square">
                                <img src={subImg3} className="rounded-[70px]" alt="상품 서브 이미지3"/>
                                <div className="mt-3 text-lg font-normal">명함</div>
                            </div>
                        </a>

                        <a href="#">
                            <div className="aspect-square">
                                <img src={subImg4} className="rounded-[70px]" alt="상품 서브 이미지4"/>
                                <div className="mt-3 text-lg font-normal">전단지</div>
                            </div>
                        </a>

                        <a href="#">
                            <div className="aspect-square">
                                <img src={subImg5} className="rounded-[70px]" alt="상품 서브 이미지5"/>
                                <div className="mt-3 text-lg font-normal">카다로그</div>
                            </div>
                        </a>

                        <a href="#">
                            <div className="aspect-square">
                                <img src={subImg6} className="rounded-[70px]" alt="상품 서브 이미지6"/>
                                <div className="mt-3 text-lg font-normal">명함</div>
                            </div>
                        </a>
                </div>
            </div>
        </div>
    )
}

export default BestOf