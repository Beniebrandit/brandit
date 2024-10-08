import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import DesignOnline from "./pages/DesignOnline";
import DesignService from "./pages/DesignService";
import Cart from "./pages/Cart";
import SavedDesign from "./pages/SavedDesign";
function App() {
  //console.log("base_url", process.env.REACT_APP_API_BASE_URL);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/products" element={<ProductPage />}></Route>
        <Route path="/design" element={<DesignOnline />}></Route>
        <Route path="/design-service" element={<DesignService />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/saved-design" element={<SavedDesign />}></Route>
      </Routes>
    </>
  );
}

export default App;
