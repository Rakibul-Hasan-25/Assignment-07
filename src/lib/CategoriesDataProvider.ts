import { Categories } from "@/types/DataTypes";
import { notFound } from "next/navigation";

const CategoriesDataProvider = async():Promise<Categories[]> => {
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/categories');
    if(!res.ok){
        notFound();
    }
    else{
        const data = await res.json();
        return data;
    }
};

export default CategoriesDataProvider;
