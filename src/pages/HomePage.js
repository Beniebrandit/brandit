import React, { useEffect, useState } from "react";
import Categories from "../components/landingcomponent/Categories";
import TrendingProducts from "../components/landingcomponent/TrendingProduct";
import WhyBranditSignage from "../components/landingcomponent/WhyBranditSignage";
import HomeFooter from "../components/landingcomponent/HomeFooter";
import Banner from "../components/landingcomponent/Banner";
import Reviews from "../components/common/Reviews";
import AssistanceBanner from "../components/common/AssistanceBanner";
import Navbar from "../components/landingcomponent/Navbar/Navbar";
const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [pricePerProduct, setPricePerProduct] = useState();
  const [hidereviewbtn, setHideReviewBtn] = useState(true);
  const [price, setPrice] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [payload, setPayload] = useState({
    productId: null, // Assuming `id` is the unique identifier for the product
    width: "",
    height: "",
    subCatId: [],
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 900;

      if (scrollPosition > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <Navbar />
      <Banner
        pricePerProduct={pricePerProduct}
        setPricePerProduct={setPricePerProduct}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        price={price}
        setPrice={setPrice}
        payload={payload}
        setPayload={setPayload}
      />
      <Categories />
      <TrendingProducts />
      <WhyBranditSignage />
      <Reviews hidereviewbtn={hidereviewbtn} />
      <HomeFooter />

      {isVisible && (
        <AssistanceBanner
          pricePerProduct={pricePerProduct}
          payload0={payload}
          price={price}
          selectedCategory={selectedCategory}
        />
      )}
    </>
  );
};

export default HomePage;
