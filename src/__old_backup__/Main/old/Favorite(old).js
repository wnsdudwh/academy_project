import React from 'react'
import '../../static/css/Favorite.css';

import subImg1 from '../../static/image/test/best/sub1.png';
import subImg2 from '../../static/image/test/best/sub2.png';
import subImg3 from '../../static/image/test/best/sub3.png';
import subImg4 from '../../static/image/test/best/sub4.png';
import subImg5 from '../../static/image/test/best/sub5.png';

const Favorite = () => {
    return (
        <div className="w-full bg-[#3A5863]">
            <div className="max-w-[1440px] w-full h-[380px] mx-auto bg-[#5A5863]">
            <div className="w-full favorite-tit">
                <div className="mb-9 font-semibold text-3xl text-white text-center py-8">Editor’s Choice</div>
            </div>

                <div className="w-full bg-blue-900 flex flex-row justify-between gap-6">
                    <div className="basis-1/5 bg-primary-300 w-[208px] h-[208px]">
                        <img src={subImg1} alt="FAVOLRITE ITEM 1~5" />
                    </div>
                    <div className="basis-1/5 bg-primary-300 w-[208px] h-[208px]">
                        <img src={subImg2} alt="FAVOLRITE ITEM 1~5" />
                    </div>
                    <div className="basis-1/5 bg-primary-300 w-[208px] h-[208px]">
                        <img src={subImg3} alt="FAVOLRITE ITEM 1~5" />
                    </div>
                    <div className="basis-1/5 bg-primary-300 w-[208px] h-[208px]">
                        <img src={subImg4} alt="FAVOLRITE ITEM 1~5" />
                    </div>
                    <div className="basis-1/5 bg-primary-300 w-[208px] h-[208px]">
                        <img src={subImg5} alt="FAVOLRITE ITEM 1~5" />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Favorite