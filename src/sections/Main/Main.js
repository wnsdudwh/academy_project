import React from 'react'
import '../../static/css/Main.css';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
// import 'swiper/css/navigation';
// import 'swiper/css/scrollbar';

import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import mainImg1 from '../../static/image/test/main/11.jpg';
import mainImg2 from '../../static/image/test/main/22.jpg';
import mainImg3 from '../../static/image/test/main/33.jpg';
import mainImg4 from '../../static/image/test/main/44.jpg';
import mainImg5 from '../../static/image/test/main/55.jpg';
import mainImg6 from '../../static/image/test/main/66.jpg';
import Header from '../Common/Header';
import Navbar from '../Common/Navbar';
import Footer from '../Common/Footer';
import Commodity from '../Main/Commodity';
import Trending from '../Main/Trending';
import Product from '../Main/Product';
import Favorite from '../Main/Favorite';
import BestOf from '../Main/BestOf';

const Main = () => {
    return (
        <>
            <Header />
            <Navbar />

            <main className="max-w-[1440px] w-full h-[400px] relative mx-auto my-10" id="main">
                <div className="main-slider">
                    <Swiper pagination={{ dynamicBullets: true, }} modules={[Pagination, Autoplay, EffectFade]} loop={true}
                        autoplay={{ delay: 2500, disableOnInteraction: false, }} effect={'fade'} spaceBetween={30}
                        className="mySwiper max-h-[400px] rounded-3xl">
                        <SwiperSlide>
                            <div className="image1">
                                <a href="#">
                                    <img src={mainImg1} alt="슬라이드 이미지1" />
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="image2">
                                <a href="#">
                                    <img src={mainImg2} alt="슬라이드 이미지2" />
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="image3">
                                <a href="#">
                                    <img src={mainImg3} alt="슬라이드 이미지3" />
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="image4">
                                <a href="#">
                                    <img src={mainImg4} alt="슬라이드 이미지4" />
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="image5">
                                <a href="#">
                                    <img src={mainImg5} alt="슬라이드 이미지5" />
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="image6">
                                <a href="#">
                                    <img src={mainImg6} alt="슬라이드 이미지6" />
                                </a>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </main>
            
            <BestOf />
            <Favorite />
            <Product />
            <Trending />
            <Commodity />
            <Footer />
        </>
    )
}

export default Main