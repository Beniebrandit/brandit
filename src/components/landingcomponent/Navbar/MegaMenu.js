import React, { useEffect, useState } from "react";
import "./MegaMenu.css";
import { ProductService } from "../../../services/Product.service";
import { Box } from "@mui/material";

const menuItems = [
  { name: "Banners", category: "Banners" },
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
  const [selectedCategory, setSelectedCategory] = useState(menuItems[0].category);

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
      //setDefaultImage(initialImage);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    // Dynamically update the initial image based on the selected category
    const filteredProducts = allproduct.filter((product) => product.productCategory?.parent_name === selectedCategory);

    if (filteredProducts.length > 0) {
      const initialProductImage = filteredProducts[0]?.images?.[0]?.path || defaultImage;
      setCurrentImage(initialProductImage);
    }
  }, [selectedCategory, allproduct]);

  const renderMostPopular = (categoryName) => {
    // Filter products for the selected category
    const filteredProducts = allproduct.filter((product) => product.productCategory?.parent_name === categoryName);

    // Group products by their category names
    const groupedBySubCategory = filteredProducts.reduce((acc, product) => {
      const subCategoryName = product.productCategory?.name;
      if (!acc[subCategoryName]) acc[subCategoryName] = [];
      acc[subCategoryName].push(product);
      return acc;
    }, {});

    // Get all subcategories for the current tab
    const subCategories = Object.keys(groupedBySubCategory);

    // Determine the number of products to display
    const limit = subCategories.length > 3 ? 3 : subCategories.length;

    // Collect the first product of each subcategory, up to the limit
    const mostPopularProducts = subCategories.slice(0, limit).map(
      (subCategory) => groupedBySubCategory[subCategory][0] // Get the first product from each subcategory
    );

    return (
      <Box sx={{}}>
        <h4 className="row mega-title" style={{ paddingBottom: "7px", fontSize: "16px", textTransform: "capitalize" }}>
          Most Popular
        </h4>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {mostPopularProducts.map((product, index) => (
            <li
              key={index}
              style={{ paddingBottom: "5px", cursor: "pointer", display: "flex", flexDirection: "column" }}
              onMouseEnter={() => setCurrentImage(product.images?.[0]?.path || defaultImage)}
            >
              <img
                style={{ height: "5rem", width: "7rem", marginBottom: "5px" }}
                src={`${process.env.REACT_APP_API_BASE_URL}/${product.images?.[0]?.path || defaultImage}`}
                alt={product.name || "Default"}
              />
              <a href="#" style={{ width: "7rem", float: "left" }}>
                {product.name}
              </a>
            </li>
          ))}
        </ul>
      </Box>
    );
  };

  const renderCategoryProducts = (categoryName) => {
    const groupedProducts = allproduct
      .filter((product) => product.productCategory.parent_name === categoryName)
      .reduce((acc, product) => {
        const name = product.productCategory.name;
        if (!acc[name]) acc[name] = [];
        acc[name].push(product);
        return acc;
      }, {});

    // Find the product corresponding to the current image
    const currentProduct = allproduct.find((product) => product.images?.[0]?.path === currentImage);

    return (
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {renderMostPopular(categoryName)}
        <Box className="stander" sx={{ marginBottom: "15px" }}>
          {Object.entries(groupedProducts).map(([subCategory, products], index) => (
            <div key={index} style={{ paddingBottom: "10px" }}>
              <h4
                className="row mega-title"
                onMouseEnter={() => setCurrentImage(products[0]?.productCategory?.image?.path || defaultImage)}
                style={{ paddingBottom: "7px",fontSize:"16px",maxWidth:"10rem",textTransform:"capitalize" }}
              >
                {subCategory}
              </h4>
              {products.map((product, itemIndex) => (
                <li
                  key={itemIndex}
                  style={{ paddingBottom: "5px" }}
                  onMouseEnter={() => setCurrentImage(product.images?.[0]?.path || defaultImage)}
                >
                  <a href="#" style={{fontSize:"14px"}}>
                    {product.name}
                  </a>
                </li>
              ))}
            </div>
          ))}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", maxWidth: "15rem" }}>
          {/* Display the current image */}
          <img
            style={{ height: "10rem", width: "15rem" }}
            src={`${process.env.REACT_APP_API_BASE_URL}/${currentImage}`}
            alt="Preview"
          />

          {/* Display product name and description dynamically below the image */}
          {currentProduct && (
            <Box sx={{ marginTop: "10px" }}>
              <h4 style={{ fontSize: "16px",textTransform:"capitalize" }}>{currentProduct.name}</h4>
              <p style={{ fontSize: "14px", width: "100%", float: "left" }}>{currentProduct.description}</p>
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  return (
    <div>
      <ul className={`exo-menu ${menuVisible ? "display" : ""}`}>
        {menuItems.map((menu, index) => (
          <li key={index} className="mega-drop-down" onMouseEnter={() => setSelectedCategory(menu.category)}>
            <a href="#">
              <i className="fa fa-list"></i> {menu.name === "Banners" ? "Home" : menu.name}
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
