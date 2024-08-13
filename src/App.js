import "./App.css";
import BannerFeature from "./components/BannerFeature/BannerFeature";
import Bannerslider from "./components/Bannerslider/Bannerslider";
import Detail from "./components/Detail/Detail";
import Faq from "./components/Faq/Faq";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Product from "./components/Product/Product";
import ProductDescription from "./components/ProductDescription/ProductDescription";
import ReviewCard from "./components/ReviewCard/ReviewCard";
import Services from "./components/Services/Services";
function App() {
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
}

export default App;
