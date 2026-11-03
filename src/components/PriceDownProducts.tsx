import React from 'react';
import { TrendingDown } from "lucide-react";
import AllProductsDataProvider from '@/lib/AllProductsDataProvider';
import { Product } from '@/types/DataTypes';
import ProductCard from './ProductCard';
const PriceDownProducts = async() => {
    const products:Product[] = await AllProductsDataProvider();
    const priceDownProducts:Product[] = products.filter((product)=> product.change.dir === "down");
    const sortedPriceDownProducts = priceDownProducts.toSorted((a,b)=>a.today-b.today);
    return (
        // main container
        <div className='bg-[#f0f5f0]'>
            {/* sub container */}
            <div className='container mx-auto mt-6 flex flex-col items-center lg:items-start'>
                {/* top part heading  */}
                <div className='flex items-center gap-1 mb-2'>
                    <TrendingDown color='green'/>
                    <span className='font-semibold tracking-wider text-2xl'>আজকে দাম কমেছে</span>
                </div>
                {/* product cards main container */}
                <div className='flex items-center justify-center gap-2 flex-wrap lg:justify-between'>
                    {sortedPriceDownProducts.slice(0,6).map((product)=>(
                        <div key={product.id}>
                            <ProductCard product={product} ></ProductCard>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PriceDownProducts;