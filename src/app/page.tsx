import AllProducts from "@/components/AllProducts";
import Hero from "@/components/Hero";
import PriceDownProducts from "@/components/PriceDownProducts";
import PriceUpProducts from "@/components/PriceUpProducts";

export default function Home() {
  return (
    <>
      <Hero />
      <PriceUpProducts />
      <PriceDownProducts/>
      <AllProducts/>
    </>
  );
}
