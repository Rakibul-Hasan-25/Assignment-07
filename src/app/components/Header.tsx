import React from 'react';
import { Categories, Product } from '@/types/DataTypes';
import CategoriesDataProvider from '@/lib/CategoriesDataProvider';
import Link from 'next/link';
import { ShoppingCart, TrendingUp, TrendingDown } from "lucide-react";
import AllProductsDataProvider from '@/lib/AllProductsDataProvider';
const today = new Date();

const banglaDate = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
}).format(today);
const Header = async () => {
    const categories: Categories[] = await CategoriesDataProvider();
    const allProducts: Product[] = await AllProductsDataProvider();
    return (
        // main container of the header
        <div className=''>
            {/* header top part container */}
            <div className='container mx-auto mt-5 mb-5'>
                {/* top part sub container */}
                <div className='flex gap-2'>
                    {/* left side logo */}
                    <div className='bg-green-700 flex items-center justify-center border rounded-lg p-2'>
                        <ShoppingCart color="white" size={29} />
                    </div>
                    {/* right side title and date  */}
                    <div>
                        <h2 className='font-extrabold tracking-wider text-2xl'>বাজার দর</h2>
                        <p className='font-light tracking-tighter'>{banglaDate}</p>
                    </div>
                </div>
            </div>
            {/* header category part main container */}
            <div className='container mx-auto mb-4'>
                {/* header category part sub container */}
                <div className='flex gap-8 flex-wrap'>
                    {categories.map((category) => (
                        <div key={category.id} className='flex  gap-2'>
                            <span>{category.icon}</span>
                            <p className='font-bold hover:text-green-700'><Link href=''>{category.nameBn}</Link></p>
                        </div>
                    ))}
                </div>
            </div>
            {/* header bottom moving part main container */}
            <div className="border ">
                <div className="flex w-max animate-infinite-scroll">
                    {[0, 1].map((copy) => (
                        <div key={copy} className="flex gap-2">
                            {allProducts.map((product) => (
                                <Link href='' className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-500" key={`${copy}-${product.id}`}>
                                    <span>{product.id}</span>
                                    <span>{product.categoryIcon}</span>
                                    <span>{product.nameBn}</span>
                                    <span>৳{product.today} টাকা/{product.unit}</span>
                                    {product.change.dir === "up" && (
                                        <span className="flex items-center gap-0.5 text-red-700">
                                            <TrendingUp size={15} />
                                            {product.change.pct}%
                                        </span>
                                    )}
                                    {product.change.dir === "down" && (
                                        <span className="flex items-center gap-0.5 text-green-700">
                                            <TrendingDown size={15} />
                                            {product.change.pct}%
                                        </span>
                                    )}
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Header;