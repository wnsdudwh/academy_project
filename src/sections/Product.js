import React from 'react'
import '../static/css/Product.css';

const Product = () => {
    return (
        <div className="max-w-[1280px] w-full h-[600px] mx-auto bg-rose-300">
            <div className="w-full mb-9 font-semibold text-3xl text-zinc-800">Our Collection</div>
            <div className="button-list flex flex-row justify-between gap-8 text-center text-white">
                <div className="productBtn basis-1/5 h-[40px] rounded-3xl bg-lime-200">디지털낱장</div>
                <div className="productBtn basis-1/5 h-[40px] rounded-3xl bg-lime-200">책자</div>
                <div className="productBtn basis-1/5 h-[40px] rounded-3xl bg-lime-200">옵셋인쇄</div>
                <div className="productBtn basis-1/5 h-[40px] rounded-3xl bg-lime-200">디지털인쇄</div>
                <div className="productBtn basis-1/5 h-[40px] rounded-3xl bg-lime-200">배너</div>
            </div>
        </div>
    )
}

export default Product