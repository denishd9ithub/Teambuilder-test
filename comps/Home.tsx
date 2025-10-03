"use client";
import { useState } from "react";
import { BannerDataTypes, ProductsTypes } from "../app/page";
import FooterBanner from "../comps/FooterBanner";
import MainBanner from "./MainBanner";
import Products from "../app/Products";

interface HomeProps {
  products: ProductsTypes[];
  bannerData: BannerDataTypes[];
}

const Home = ({ products, bannerData }: HomeProps) => {
  const [sortOrder, setSortOrder] = useState<"" | "low" | "high">("");
  const [productsData, setProductsData] = useState<ProductsTypes[]>(products);

  const handleSort = (order: "low" | "high" | "") => {
    setSortOrder(order);

    if (!order) {
      setProductsData(products);
      return;
    }

    const sorted = [...products].sort((a, b) =>
      order === "low" ? a.price - b.price : b.price - a.price
    );

    setProductsData(sorted);
  };

  return (
    <main>
      {/* === MAIN BANNER  */}
      <MainBanner banner={bannerData[0]} />

      <section className="  mb-4 flex items-center flex-col">
        <h1
          className=" headTitle px-8 py-4 sm:py-2 sm:text-4xl text-2xl text-secondary
         font-sans font-extrabold sm:rounded-t-3xl"
        >
          Best Selling Headphones
        </h1>
        {/* <p className=" text-base text-secondary">Best in the Market</p> */}
        <div className="flex justify-end w-full px-14">
          <select
            className="px-6 py-3 pr-10 rounded-lg border border-gray-300 bg-white text-base font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 cursor-pointer"
            value={sortOrder}
            onChange={(e) => handleSort(e.target.value as "low" | "high" | "")}
          >
            <option value="">-- Select --</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>
      </section>

      {/* === SHOW PRODUCTS  */}
      <section
        className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3
       lg:mx-20 overflow-hidden
      "
      >
        {/* === MAP PRODUCTS  */}
        {productsData?.map((products: ProductsTypes) => {
          return <Products key={products._id} products={products} />;
        })}
      </section>

      {/* ==== FOOTER BANNER  */}
      <FooterBanner bannerData={bannerData && bannerData[1]} />
    </main>
  );
};

export default Home;
