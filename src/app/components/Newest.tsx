import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import styles from "../card-borders.module.css";
import { simplifiedProduct } from "../interface";

// Fetch product data
async function getData() {
  const query = `*[_type == "product"][0...6] | order(_createdAt desc) {
    _id,
    basePrice,
    name,
    "slug": slug.current,
    "categoryName": category->name,
    "imageUrl": image[0].asset->url,
    weight
  }`;

  return await client.fetch(query);
}

// yahan pr price Calculate ho rhi based on weight
function calculatePrice(basePrice: number, weight: string) {
  const multiplier = weight === "1" ? 1 : weight === "100g" ? 0.1 : 1;
  const finalPrice = basePrice * multiplier;
  return `RP ${finalPrice.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

export default async function Newest() {
  const data: simplifiedProduct[] = await getData();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Our Newest Products
          </h2>
          <Link className="text-primary flex items-center gap-x-1" href="/all">
            See All
            <span>
              <ArrowRight />
            </span>
          </Link>
        </div>

        {/* Product Grid */}
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product) => {
            const weight =
              product.weight && product.weight.length > 0
                ? product.weight[0].label
                : "1kg"; // Default to "1kg" if no weight available
            return (
              <div key={product._id} className={`${styles.card} group relative`}>
                {/* Product Image */}
                <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={`Product image of ${product.name}`}
                      className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                      width={300}
                      height={300}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      No Image Available
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link href={`/product/${product.slug}`}>{product.name}</Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.categoryName || "No Category Available"}
                    </p>
                  </div>

                  <p className="text-sm font-medium text-gray-900">
                    {typeof product.basePrice === "number" && weight ? (
                      <span>{calculatePrice(product.basePrice, weight)}</span>
                    ) : (
                      <span>Price not available</span>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
