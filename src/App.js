import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import DesignOnline from "./pages/DesignOnline";
import DesignService from "./pages/DesignService";
import Cart from "./pages/Cart";
import SavedDesign from "./pages/SavedDesign/SavedDesign";
function App() {
  //console.log("base_url", process.env.REACT_APP_API_BASE_URL);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/design/:id" element={<DesignOnline />} />
        <Route path="/design-service" element={<DesignService />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/saved-design" element={<SavedDesign />} />
      </Routes>
    </>
  );
}

export default App;
