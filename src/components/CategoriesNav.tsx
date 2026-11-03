"use client"
import Link from 'next/link';
import { CategoriesNavProps } from '@/types/DataTypes';
import { usePathname } from 'next/navigation';
const CategoriesNav = ({categories}:CategoriesNavProps) => {
    const pathname = usePathname();
    return (
        <div className='flex gap-8 flex-wrap'>
            {categories.map((category) =>(
                <div key={category.id} className="flex  gap-2">
              <span>{category.icon}</span>
              <p className="font-bold hover:text-green-700">
                <Link className={pathname === `/category/${category.slug}` ? "text-green-700" : ""}  href={`/category/${category.slug}`}>
                  {category.nameBn}
                </Link>
              </p>
            </div>
            ))}
        </div>
    );
};

export default CategoriesNav;