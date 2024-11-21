"use client";
import { useEffect, useState } from "react";
import AddToBag from "@/app/components/AddToBag";
import CheckoutNow from "@/app/components/CheckoutNow";
import { fullProduct, WeightOption } from "@/app/interface"; // Import the types
import { client, urlFor } from "@/sanity/lib/client";
import { Truck } from "lucide-react";
import styles from "@/app/loader.module.css"
import Image from "next/image";

async function fetchData(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug]{
    _id,
    name,
    basePrice,
    "images": image[].asset->url,
    weight[]
  }`;
  const data = await client.fetch(query, { slug });
  return data[0];
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<fullProduct | null>(null);
  const [selectedWeight, setSelectedWeight] = useState<WeightOption | null>(null);

  useEffect(() => {
    async function loadData() {
      const productData = await fetchData(params.slug);
      setData(productData);
      if (productData?.weight && productData.weight.length > 0) {
        setSelectedWeight(productData.weight[0]);
      }
    }
    loadData();
  }, [params.slug]);

  // Show loader if data is not loaded
  if (!data) {
    return (
        <div className="flex items-center justify-center p-10">
      <div className={styles.loader}>
        <div className={styles.loader__bar}></div>
        <div className={styles.loader__bar}></div>
        <div className={styles.loader__bar}></div>
        <div className={styles.loader__bar}></div>
        <div className={styles.loader__bar}></div>
        <div className={styles.loader__ball}></div>
      </div>
      </div>
    );
  }

  // Calculate price based on the selected weight multiplier
  const calculatedPrice = selectedWeight
    ? data.basePrice * selectedWeight.multiplier
    : data.basePrice;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {data.images && (
            <Image
              src={data.images[0]} 
              alt={data.name}
              className="w-full h-auto object-cover"
            />
          )}
          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-500">
                {data.categoryName}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {data.name}
              </h2>
            </div>
            <div className="mb-4">
              <label htmlFor="weight-select" className="text-sm font-medium">
                Select Weight:
              </label>
              <select
                id="weight-select"
                className="ml-2 p-2 border"
                value={selectedWeight?.label || ""}
                onChange={(e) => {
                  const selected = data.weight.find(
                    (w) => w.label === e.target.value
                  );
                  setSelectedWeight(selected || null);
                }}
              >
                {data.weight.map((option) => (
                  <option key={option._key} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-gray-800 md:text-2xl">
                  Rs {calculatedPrice.toFixed(2)}
                </span>
              </div>
              <span className="text-sm text-gray-500">Incl. VAT plus shipping</span>
            </div>
            <div className="mb-6 flex items-center gap-2 text-gray-500">
              <Truck className="w-6 h-6" />
              <span className="text-sm">2-4 Day Shipping</span>
            </div>
            <div className="flex gap-2.5">
              <AddToBag
                currency="PKR"
                description={data.description}
                image={urlFor(data.images[0]).url()}
                name={data.name}
                price={calculatedPrice}
                key={data._id}
                price_id={""}
              />
              <CheckoutNow
                currency="PKR"
                description={data.description}
                image={urlFor(data.images[0]).url()}
                name={data.name}
                price={calculatedPrice}
                key={data._id}
                price_id={""}
              />
            </div>
            <p className="mt-12 text-base text-gray-500 tracking-wide">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
