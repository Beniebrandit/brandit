import React, { useEffect, useState } from "react";
import Header from "../components/productcomponent/Header";
import ProductDescription from "../components/productcomponent/ProductDescription";
import Services from "../components/productcomponent/Services";
import BannerFeature from "../components/productcomponent/BannerFeature";
import Bannerslider from "../components/productcomponent/Bannerslider";
import Detail from "../components/productcomponent/Detail";
import Faq from "../components/productcomponent/Faq";
import Footer from "../components/productcomponent/Footer";
import Product from "../components/productcomponent/Product";
import Reviews from "../components/common/Reviews";
import AssistanceBanner from "../components/common/AssistanceBanner";
import { useParams } from "react-router-dom";

const ProductPage = () => {
      const params = useParams();
      console.log("params", params.id);
    const [isVisible, setIsVisible] = useState(false);


    useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const threshold = 1100;

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
      <Header />
      <Product productname={params.id} />
      <ProductDescription />
      <Services />
      <BannerFeature />

      <Bannerslider />
      <Detail />
      <Faq />
      <Reviews />
      <Footer />

      {isVisible && <AssistanceBanner />}
    </>
  );
};

export default ProductPage;
