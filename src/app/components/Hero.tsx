import Image from "next/image";
import { client, urlFor } from "@/sanity/lib/client";
import Link from "next/link";

// Define the type for the fetched data
interface HeroImageData {
  Image1: string ;
  Image2: string;
}

async function getData(): Promise<HeroImageData | null> {
  const query = `*[_type == "heroImage"]{
    Image1,
    Image2
  }`;

  const data = await client.fetch(query);
  return data[0] || null; // Return the first item in the array or null if no data
}

export default async function Hero() {
  const data = await getData();

  if (!data) {
    console.error("No data found for Hero section.");
    return <p>No images available. Please check your data source.</p>;
  }

  return (
    <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
      <div className="mb-8 flex flex-wrap justify-between md:mb-16">
        <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
          <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl md:mb-8 md:text-6xl">
            Top Quality for best taste!
          </h1>
          <p className="max-w-md leading-relaxed text-gray-500 xl:text-lg">
            We sell only the most exclusive and high quality products for you.
            We are the best so we serve best.
          </p>
        </div>

        <div className="mb-12 flex w-full md:mb-16 lg:w-2/3">
          {data.Image1 && (
            <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0">
              <Image
                src={urlFor(data.Image1).url()}
                alt="First Hero Image"
                className="h-full w-full object-cover object-center"
                priority
                width={500}
                height={500}
              />
            </div>
          )}

          {data.Image2 && (
            <div className="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
              <Image
                src={urlFor(data.Image2).url()}
                alt="Second Hero Image"
                className="h-full w-full object-cover object-center"
                width={500}
                height={500}
                priority
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex h-12 w-64 divide-x overflow-hidden rounded-lg border">
          <Link
            href="/Spices"
            className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
          >
            Spices
          </Link>
          <Link
            href="/Dryfruits"
            className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
          >
            Dryfruits
          </Link>
          <Link
            href="/Seeds"
            className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
          >
            Seeds
          </Link>
        </div>
      </div>
    </section>
  );
}
