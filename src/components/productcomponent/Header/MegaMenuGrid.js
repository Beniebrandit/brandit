import React, { useEffect, useState } from "react";
import { ProductService } from "../../../services/Product.service";
import { useNavigate } from "react-router-dom";
import dropdown from "../../../asset/images/chevron-down-svgrepo-com.svg"; 
import "./MegaMenuGrid.css";
import { Box } from "@mui/material";

const MegaMenu = () => {
  const navigate = useNavigate();
  const [allProduct, setAllProduct] = useState([]);
  const [currentImage, setCurrentImage] = useState("");
  const [defaultImage, setDefaultImage] = useState("default-category-image.jpg");
  const [selectedCategory, setSelectedCategory] = useState("");

  const menuItems = [
    { name: "Large Format", category: "Large Format" },
    { name: "Stickers and Labels", category: "Decals" },
    { name: "Fabrics", category: "Banners" },
    { name: "Accessories", category: "Signs" },
  ];

  const fetchAllProducts = async () => {
    try {
      const params = { with: ["images", "productCategory"] };
      const res = await ProductService.ProductList(params);
      setAllProduct(res.data);
      const initialImage = res.data[0]?.productCategory?.image?.path || "default-category-image.jpg";
      setCurrentImage(initialImage);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    const filteredProducts = allProduct.filter((product) => product.productCategory?.parent_name === selectedCategory);

    if (filteredProducts.length > 0) {
      const initialProductImage = filteredProducts[0]?.images?.[0]?.path || defaultImage;
      setCurrentImage(initialProductImage);
    }
  }, [selectedCategory, allProduct]);

  const renderMostPopular = (categoryName) => {
    // Filter products for the selected category
    const filteredProducts = allProduct.filter((product) => product.productCategory?.parent_name === categoryName);

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
              onClick={() => ClickProduct(product.id)}
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
    const filteredProducts = allProduct.filter((product) => product.productCategory.parent_name === categoryName);

    const groupedProducts = filteredProducts.reduce((acc, product) => {
      const subCategory = product.productCategory.name;
      if (!acc[subCategory]) acc[subCategory] = [];
      acc[subCategory].push(product);
      return acc;
    }, {});

    const currentProduct = allProduct.find((product) => product.images?.[0]?.path === currentImage);

    return (
      <Box sx={{ display: "flex", justifyContent: "space-between" ,gap:2}}>
        {renderMostPopular(categoryName)}
        <Box className="stander" sx={{ marginBottom: "15px" }}>
          {Object.entries(groupedProducts).map(([subCategory, products], index) => (
            <div key={index} style={{ paddingBottom: "10px" }}>
              <h4
                className="row mega-title"
                onMouseEnter={() => setCurrentImage(products[0]?.productCategory?.image?.path || defaultImage)}
                style={{ paddingBottom: "7px", fontSize: "16px", maxWidth: "10rem", textTransform: "capitalize" }}
              >
                {subCategory}
              </h4>
              <Box>

              {products.map((product, itemIndex) => (
                <li
                  key={itemIndex}
                  style={{ paddingBottom: "5px" }}
                  onMouseEnter={() => setCurrentImage(product.images?.[0]?.path || defaultImage)}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <a href="#" style={{ fontSize: "14px" }}>
                    {product.name}
                  </a>
                </li>
              ))}
              </Box>
            </div>
          ))}
        </Box>
        <Box
          onClick={() => ClickProduct(currentProduct?.id)}
          sx={{ display: "flex", flexDirection: "column", maxWidth: "15rem" }}
        >
          {/* Display the current image */}
          <img
            style={{ height: "10rem", width: "15rem" }}
            src={`${process.env.REACT_APP_API_BASE_URL}/${currentImage}`}
            alt="Preview"
          />

          {/* Display product name and description dynamically below the image */}
          {currentProduct && (
            <Box sx={{ marginTop: "10px" }}>
              <h4 style={{ fontSize: "16px", textTransform: "capitalize" }}>{currentProduct.name}</h4>
              <p style={{ fontSize: "14px", width: "100%", float: "left" }}>{currentProduct.description}</p>
            </Box>
          )}
        </Box>
      </Box>
    );
  };

function ClickProduct(id) {
  navigate(`/product/${id}`);
}
  return (
    <ul className="exo-menu">
      {menuItems.map((menu, index) => (
        <li
          key={index}
          onMouseEnter={() => setSelectedCategory(menu.category)}
          onMouseLeave={() => setSelectedCategory("")}
        >
          <a
            href="#"
            style={{ display: "inline-flex", alignItems: "center" }}
            className={selectedCategory === menu.category ? "active" : ""}
          >
            {menu.name}
            {menu.name !== "Fabrics" && menu.name !== "Accessories" && (
              <img src={dropdown} style={{ height: "auto", width: "22px", paddingLeft: "5px", fontWeight: "900" }} />
            )}
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
            {renderCategoryProducts(menu.category)}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MegaMenu;
