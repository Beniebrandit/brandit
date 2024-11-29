import React, { useEffect, useState } from "react";
import "./MegaMenu.css";
import { ProductService } from "../../../services/Product.service";
import { Box } from "@mui/material";

const menuItems = [
  { name: "Home", category: "Home Category" },
  { name: "Large Format", category: "Large Format" },
  { name: "Small Format", category: "Small Format" },
  { name: "Stickers and Decals", category: "Decals" },
  { name: "Flags", category: "Flags" },
  { name: "Sign Holders", category: "Signs" },
];

const MegaMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [allproduct, setAllProduct] = useState([]);
  const [currentImage, setCurrentImage] = useState(""); // Current hover image
  const [defaultImage, setDefaultImage] = useState(""); // Default image fallback

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const fetchAllProducts = async () => {
    try {
      const params = { with: ["images", "productCategory"] };
      const res = await ProductService.ProductList(params);
      setAllProduct(res.data);

      // Set the default image based on the first product
      const initialImage = res.data[0]?.productCategory?.image?.path || "default-category-image.jpg";
      setCurrentImage(initialImage);
      setDefaultImage(initialImage);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const renderCategoryProducts = (categoryName) => {
    const groupedProducts = allproduct
      .filter((product) => product.productCategory.parent_name === categoryName)
      .reduce((acc, product) => {
        const name = product.productCategory.name;
        if (!acc[name]) acc[name] = [];
        acc[name].push(product);
        return acc;
      }, {});

    return (
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box className="stander" sx={{marginBottom:"15px"}}>
          {Object.entries(groupedProducts).map(([subCategory, products], index) => (
            <div key={index} style={{paddingBottom:"10px"}}>
              <h4
                className="row mega-title"
                onMouseEnter={() => setCurrentImage(products[0]?.productCategory?.image?.path || defaultImage)}
                style={{paddingBottom:"7px"}}
              >
                {subCategory}
              </h4>
              {products.map((product, itemIndex) => (
                <li key={itemIndex} style={{paddingBottom:"5px"}} onMouseEnter={() => setCurrentImage(product.images?.[0]?.path || defaultImage)}>
                  <a href="#">{product.name}</a>
                </li>
              ))}
            </div>
          ))}
        </Box>
        <img
          style={{ height: "10rem", width: "10rem" }}
          src={`${process.env.REACT_APP_API_BASE_URL}/${currentImage}`}
          alt="Preview"
        />
      </Box>
    );
  };

  return (
    <div>
      <ul className={`exo-menu ${menuVisible ? "display" : ""}`}>
        {menuItems.map((menu, index) => (
          <li key={index} className="mega-drop-down">
            <a href="#">
              <i className="fa fa-list"></i> {menu.name}
            </a>
            <div
              className="animated fadeIn mega-menu"
              style={{
                maxWidth: "1200px",
                padding: "20px 30px",
                backgroundColor: "#fff",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                zIndex: "100",
                position: "absolute",
              }}
            >
              {menu.name !== "Home" && renderCategoryProducts(menu.category)}
            </div>
          </li>
        ))}
        <a href="#" className="toggle-menu" onClick={toggleMenu}>
          |||
        </a>
      </ul>
    </div>
  );
};

export default MegaMenu;
