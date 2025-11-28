// "use client";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { getProductById } from "@/api/product";
// import Reviews from "@/components/detail/Reviews";
// import MostProduct from "@/components/detail/MostProduct";
// import Detail from "@/components/detail/DetailProduct";

// const Page = () => {
//   const params = useParams();
//   const productId = Number((params.id as string)?.split("-").pop());

//   const [product, setProduct] = useState([]);

//   const reviewDto = {
//     productId: productId,
//     page: 1,
//     limit: 10,
//   };
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const productData = await getProductById(productId);
//         setProduct(productData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     if (productId) fetchData();
//   }, [productId]);

//   return (
//     <div>
//       <Detail product={product} />
//       <Reviews productId={productId} />
//       <MostProduct />
//     </div>
//   );
// };

// export default Page;
