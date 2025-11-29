import AddCartButton from "@/components/shared/AddCartButton";
import ProductCard from "@/components/shared/ProductCard";
import Thumbnail from "@/components/shared/Thumbnail";
import { getMostSoldProducts, getProductById } from "@/lib/actions/product";
import { productType } from "@/types";

export interface ProductImage {
  id: number;
  productId: number;
  link: string;
  type: string;
}
export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  const detailProduct = await getProductById(id);

  const productsMostSold = await getMostSoldProducts();

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {/* Left side - Images */}
          <Thumbnail images={detailProduct.images} name={detailProduct.name} />

          {/* Right side - Product Info */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {detailProduct.name}
              </h1>
              <p className="text-muted-foreground text-lg">
                {detailProduct.style}
              </p>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-foreground">
              ${detailProduct.price}.00
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-base leading-relaxed">
              {detailProduct.description}
            </p>

            {/* Size Selection */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">
                Select Size
              </h3>
              <div className="flex gap-3 flex-wrap mb-5">
                {[5, 5.5, 6, 6.5, 7].map((size) => (
                  <button
                    key={size}
                    className={`w-12 h-12 rounded-lg border-2 font-medium transition-all ${
                      size === 6.5
                        ? "bg-foreground text-background border-foreground"
                        : "border-border bg-background text-foreground hover:border-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <AddCartButton item={detailProduct} />
            </div>
          </div>
        </div>

        <div className="grid-cols-2 grid lg:grid-cols-5 gap-6">
          <h2 className="text-2xl font-bold text-foreground mt-16 mb-6 col-span-full">
            <div className="h-2 w-100% bg-slate-500 m-10" />
            Most Sold Products
          </h2>
          {productsMostSold.map((product: productType) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </main>
  );
}
