import BestSeller from "@/components/shared/BestSeller";
import Hero from "@/components/shared/Hero";
import Banner from "@/components/shared/home/sections/Banner";
import { getMostSoldProducts } from "@/lib/actions/product";

export default async function Home() {
  const products = await getMostSoldProducts();
  return (
    <div>
      <Hero />
      <Banner />
      <BestSeller products={products} />
    </div>
  );
}
