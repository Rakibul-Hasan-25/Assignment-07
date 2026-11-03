import React from 'react';
import { TrendingUp } from "lucide-react";
import AllProductsDataProvider from '@/lib/AllProductsDataProvider';
import { Product } from '@/types/DataTypes';
import ProductCard from './ProductCard';
const PriceUpProducts = async() => {
    const products:Product[] = await AllProductsDataProvider();
    const priceUpProducts:Product[] = products.filter((product)=> product.change.dir === "up");
    const sortedPriceUpProducts = priceUpProducts.sort((a,b)=>b.today-a.today);
    return (
        // main container
        <div className='bg-[#f0f5f0]'>
            {/* sub container */}
            <div className='container mx-auto mt-6 flex flex-col items-center lg:items-start'>
                {/* top part heading  */}
                <div className='flex items-center gap-1 mb-2'>
                    <TrendingUp color='red'/>
                    <span className='font-semibold tracking-wider text-2xl'>আজ দাম বেড়েছে</span>
                </div>
                {/* product cards main container */}
                <div className='flex items-center justify-center gap-2 flex-wrap lg:justify-between'>
                    {sortedPriceUpProducts.slice(0,6).map((product)=>(
                        <div key={product.id}>
                            <ProductCard product={product} ></ProductCard>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PriceUpProducts;