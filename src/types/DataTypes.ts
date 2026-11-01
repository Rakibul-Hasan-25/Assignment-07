export interface Categories {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
};
export interface PriceChange {
    dir: "up" | "down" | "flat";
    pct: number;
}

export interface MarketPrice {
    market: string;
    division: string;
    min: number;
    max: number;
}

export interface Product {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: PriceChange;
    markets: MarketPrice[];
}

export interface ProductCardProps {
    product:Product;
}

export interface CategoryProductsProps {
    params: Promise<{slug: string;}>;
}

export interface ProductProps {
    params: Promise<{id:number}>;
}

interface ProductUnit {
    [key:string]:string;
    kg:string;
    litre:string;
    dozen:string;
    piece:string;
}

export default function ConvertUnit(unit:string):string{
    const units:ProductUnit = {
        kg:"কেজি",
        litre:"লিটার",
        dozen:"ডজন",
        piece:"পিছ"
    };
    return units[unit] || unit;
}