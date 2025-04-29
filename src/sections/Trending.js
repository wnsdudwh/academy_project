import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import '../static/css/Trending.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'

import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import slideImg1 from '../static/image/TrendingNow/slide_test1.png';

const Trending = () => {
    return (
        <section className="w-full bg-[#F5F9FF]  py-12 pb-16" id="trending-now">
            <div className="max-w-[1280px] w-full  mx-auto">
                <div className="w-full mb-7 font-semibold text-3xl text-zinc-800">TRENDING NOW</div>

                <Swiper slidesPerView={1} spaceBetween={30} loop={true} pagination={{ clickable: true, }} navigation={false} autoplay={{delay: 5000, disableOnInteraction: false, }} modules={[Pagination, Navigation, Autoplay]} className="trendingSwiper">
                    <SwiperSlide>
                        <div className="flex items-center justify-between max-h-[364px] overflow-hidden">
                            {/* 왼쪽 텍스트 영역 */}
                            <div className="w-full md:w-1/3 bg-[#EE9046] text-white px-24 py-20 rounded-l-[2.5rem]">
                                <h2 className="text-3xl font-normal mb-1">트렌드를 선두하는</h2>
                                <h2 className="text-3xl font-semibold mb-6">‘디지털 컬러책자’</h2>
                                <p className="text-sm font-light mb-10">학원교재, 절판도서, 보고서, 제안서,<br />대학교재, 소량가다록에 적합합니다.</p>
                                <a href="#" className="font-normal text-sm border-solid-[1px] border-white border-[1px] hover:underline px-6 py-2">자세히보기</a>
                            </div>
                            {/* 왼쪽 텍스트 영역 */}

                            {/* 오른쪽 이미지 슬라이드 영역 */}
                            <div className="w-full md:w-2/3 bg-slate-300 rounded-r-[2.5rem]">
                                <div className="swiper-container">
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide">
                                            <img src={slideImg1} alt="디지털 컬러책자 이미지 테스트1" className="w-full max-h-[364px] object-fill" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 오른쪽 이미지 슬라이드 영역 */}
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="flex items-center justify-between max-h-[364px] overflow-hidden">
                            {/* 왼쪽 텍스트 영역 */}
                            <div className="w-full md:w-1/3 bg-[#EE9046] text-white px-24 py-20 rounded-l-[2.5rem]">
                                <h2 className="text-3xl font-normal mb-1">트렌드를 선두하는</h2>
                                <h2 className="text-3xl font-semibold mb-6">‘디지털 컬러책자’</h2>
                                <p className="text-sm font-light mb-10">학원교재, 절판도서, 보고서, 제안서,<br />대학교재, 소량가다록에 적합합니다.</p>
                                <a href="#" className="font-normal text-sm border-solid-[1px] border-white border-[1px] hover:underline px-6 py-2">자세히보기</a>
                            </div>
                            {/* 왼쪽 텍스트 영역 */}

                            {/* 오른쪽 이미지 슬라이드 영역 */}
                            <div className="w-full md:w-2/3 bg-slate-300 rounded-r-[2.5rem]">
                                <div className="swiper-container">
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide">
                                            <img src={slideImg1} alt="디지털 컬러책자 이미지 테스트1" className="w-full max-h-[364px] object-fill" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 오른쪽 이미지 슬라이드 영역 */}
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="flex items-center justify-between max-h-[364px] overflow-hidden">
                            {/* 왼쪽 텍스트 영역 */}
                            <div className="w-full md:w-1/3 bg-[#EE9046] text-white px-24 py-20 rounded-l-[2.5rem]">
                                <h2 className="text-3xl font-normal mb-1">트렌드를 선두하는</h2>
                                <h2 className="text-3xl font-semibold mb-6">‘디지털 컬러책자’</h2>
                                <p className="text-sm font-light mb-10">학원교재, 절판도서, 보고서, 제안서,<br />대학교재, 소량가다록에 적합합니다.</p>
                                <a href="#" className="font-normal text-sm border-solid-[1px] border-white border-[1px] hover:underline px-6 py-2">자세히보기</a>
                            </div>
                            {/* 왼쪽 텍스트 영역 */}

                            {/* 오른쪽 이미지 슬라이드 영역 */}
                            <div className="w-full md:w-2/3 bg-slate-300 rounded-r-[2.5rem]">
                                <div className="swiper-container">
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide">
                                            <img src={slideImg1} alt="디지털 컬러책자 이미지 테스트1" className="w-full max-h-[364px] object-fill" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 오른쪽 이미지 슬라이드 영역 */}
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="flex items-center justify-between max-h-[364px] overflow-hidden">
                            {/* 왼쪽 텍스트 영역 */}
                            <div className="w-full md:w-1/3 bg-[#EE9046] text-white px-24 py-20 rounded-l-[2.5rem]">
                                <h2 className="text-3xl font-normal mb-1">트렌드를 선두하는</h2>
                                <h2 className="text-3xl font-semibold mb-6">‘디지털 컬러책자’</h2>
                                <p className="text-sm font-light mb-10">학원교재, 절판도서, 보고서, 제안서,<br />대학교재, 소량가다록에 적합합니다.</p>
                                <a href="#" className="font-normal text-sm border-solid-[1px] border-white border-[1px] hover:underline px-6 py-2">자세히보기</a>
                            </div>
                            {/* 왼쪽 텍스트 영역 */}

                            {/* 오른쪽 이미지 슬라이드 영역 */}
                            <div className="w-full md:w-2/3 bg-slate-300 rounded-r-[2.5rem]">
                                <div className="swiper-container">
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide">
                                            <img src={slideImg1} alt="디지털 컬러책자 이미지 테스트1" className="w-full max-h-[364px] object-fill" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 오른쪽 이미지 슬라이드 영역 */}
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    )
}

export default Trending