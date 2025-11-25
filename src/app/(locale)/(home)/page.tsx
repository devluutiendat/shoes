import { Suspense } from "react";
import dynamic from "next/dynamic";
import Loading from "../loading";
import Banner from "@/components/home/sections/Banner";

const ContactForm = dynamic(
  () => import("@/components/home/sections/Contact"),
  {
    ssr: true,
  }
);
const AboutUs = dynamic(() => import("@/components/home/sections/About"), {
  ssr: true,
});
const Products = dynamic(() => import("@/components/home/sections/Product"), {
  ssr: true,
});

export default function Home() {
  return (
    <div>
      <Banner />
      <Suspense fallback={<Loading />}>
        <Products />
      </Suspense>
      <AboutUs />
      <ContactForm />
    </div>
  );
}
