import React from "react";
import Header from "../components/productcomponent/Header";
import ProductDescription from "../components/productcomponent/ProductDescription";
import Services from "../components/productcomponent/Services";
import BannerFeature from "../components/productcomponent/BannerFeature";
import Bannerslider from "../components/productcomponent/Bannerslider";
import Detail from "../components/productcomponent/Detail";
import Faq from "../components/productcomponent/Faq";
import ReviewCard from "../components/common/ReviewCard";
import Footer from "../components/productcomponent/Footer";
import Product from "../components/productcomponent/Product";

const ProductPage = () => {
  return (
    <>
      <Header />
      <Product />
      <ProductDescription />
      <Services />
      <BannerFeature />

      <Bannerslider />
      <Detail />
      <Faq />
      <ReviewCard />
      <Footer />
    </>
  );
};

export default ProductPage;
