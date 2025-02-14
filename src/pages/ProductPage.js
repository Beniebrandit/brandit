import React, { useEffect, useState } from "react";
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
import { ProductCategoryService } from "../services/ProductCategory.service";
import Navbar from "../components/landingcomponent/Navbar/Navbar";

const ProductPage = () => {
  const params = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const [longdescription, setLongDescription] = useState();
  const [productId, setProductId] = useState();
  const [pricePerProduct, setPricePerProduct] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [price, setPrice] = useState();
  const [payload, setPayload] = useState({
    productId: null,
    width: "",
    height: "",
    subCatId: [],
  });

  const getApi = async (id) => {
    try {
      const res = await ProductCategoryService.ProductDetail(id);
      const response = res.data;
      setSelectedCategory(response.name);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    getApi(params.id);
  }, [params.id]);
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
      <Navbar />
      <Product
        productname={params.id}
        setLongDescription={setLongDescription}
        setProductId={setProductId}
        setPricePerProduct={setPricePerProduct}
        setPayload={setPayload}
        payload={payload}
        setPrice={setPrice}
        price={price}
      />
      <ProductDescription longdescription={longdescription} />
      <Services />
      <BannerFeature />

      <Bannerslider />
      <Detail />
      <Faq />
      <Reviews productId={productId} />
      <Footer />

      {isVisible && (
        <AssistanceBanner
          pricePerProduct={pricePerProduct}
          price={price}
          selectedCategory={selectedCategory}
          payload0={payload}
        />
      )}
    </>
  );
};

export default ProductPage;
