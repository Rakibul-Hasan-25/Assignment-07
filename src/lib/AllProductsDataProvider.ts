import { notFound } from 'next/navigation';

const AllProductsDataProvider = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products');

    if(!res.ok){
        notFound();
    }

    const data = res.json();
    return data;
};

export default AllProductsDataProvider;