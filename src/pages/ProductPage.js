import React from "react";
import Header from "../components/Header";
import Product from "../components/Product";
import ProductDescription from "../components/ProductDescription";
import Services from "../components/Services";
import BannerFeature from "../components/BannerFeature";
import Bannerslider from "../components/Bannerslider";
import Detail from "../components/Detail";
import Faq from "../components/Faq";
import ReviewCard from "../components/ReviewCard";
import Footer from "../components/Footer";

const ProductPage = () => {
  return (
    <>
      <Header />
      <Product />
      <ProductDescription />
      <Services />
      <BannerFeature />

      {/* <Bannerslider />
      <Detail />
      <Faq />
      <ReviewCard />
      <Footer /> */}
    </>
  );
};

export default ProductPage;
