import React from 'react';
import { banglaDate } from './Header';
import Image from 'next/image';
import logo  from '../../public/assets/bazar-hero.png'
import Link from 'next/link';
const Hero = () => {
    return (
        // Hero section main container 
        <div className='mt-5'>
            {/* Heor section sub container */}
            <div className='container mx-auto border border-transparent rounded-2xl  px-2 py-2 flex flex-wrap-reverse justify-center lg:justify-between items-center bg-white'>
                {/* hero section left side container */}
                <div className='flex flex-col items-center lg:block'>
                    <span className='text-green-700 border-transparent rounded-2xl bg-green-100 py-1 px-2'>{banglaDate}</span>
                    <h2 className='font-semibold text-3xl mt-2'>আজকের বাজারের দাম এক নজরে</h2>
                    <p className='text-wrap text-gray-500 mt-3 mb-8 max-w-150'>চাল, দাল, তেল, সবজি, মাছ, মাংস ও মসলার দাম - বাজারভিত্তিক বিস্তারিত, গর, সরবনিম্ন-সর্বাধিক এবং দমের পরিবর্তন এক জায়গায় ।</p>
                    <Link href='#allProducts' className='btn bg-green-700 text-white'>সব পণ্য দেখুন</Link>
                </div>
                {/* hero right side  */}
                <div>
                    <Image src={logo} alt='hero banner' />
                </div>
            </div>
        </div>
    );
};

export default Hero;