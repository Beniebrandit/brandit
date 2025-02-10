import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/designcomponent/sidebar/Sidebar";
import BannerSideSection from "../components/designcomponent/BannerSideSection";
import FilerobotImageEditor, { TABS, TOOLS } from "react-filerobot-image-editor";
import HeaderDesign from "../components/designcomponent/HeaderDesign";
import Toolbar from "../components/designcomponent/Toolbar";
import { ProductService } from "../services/Product.service";
import LoginDialog from "../components/common/LoginDialog";
import CreateAccountDialog from "../components/common/CreateAccountDialog";
import { Rnd } from "react-rnd";
import { PremiumImage } from "../services/PremiumImage.service";
import { ProductCategoryService } from "../services/ProductCategory.service";
import { useLocation, useNavigate, useParams } from "react-router-dom";
//import { jsonImg } from "../components/common/Constant";

const DesignOnline = () => {
  const { id } = useParams();
  const location = useLocation();
  const [storedPayload, setStoredPayload] = useState(null);
  const [value, setValue] = React.useState(1);
  const [isTabOpen, setIsTabOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState([]);
  const [addimage, AddImage] = useState("");
  const [images, setImages] = useState();
  const [vectorimage, setVectorImg] = useState();
  const [isImgEditorShown, setIsImgEditorShown] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [qrimage, setQrImage] = useState(null);
  const [qrSize, setQrSize] = useState({ width: 150, height: 150 });
  const [premiumimg, setPremiumimg] = useState();
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  let [dropdata, setDropData] = React.useState([]);
  const [alldata, setAllData] = useState();
  const [allproduct, setAllProduct] = useState();
  const [showSection, setShowSection] = useState(true);
  const [combinedImages, setCombinedImages] = useState([]);
  const [getid, setgetId] = useState();
  const [productDetails, setProductDetails] = useState({
    width: "",
    height: "",
    quantity: "",
    price: null,
  });

  useEffect(() => {
    const payload = localStorage.getItem("selectedData");

    if (payload) {
      setStoredPayload(JSON.parse(payload));
    } else {
      console.warn("No payload0 found in localStorage");
    }

    // Optionally, you can clear the data from localStorage if it's not needed anymore
    // localStorage.removeItem("payload0");
  }, [id]);

  const APP_KEY = "3astslwrlzfkcvc";

  const handleAccordionToggle = (isOpen) => {
    setIsAccordionOpen(isOpen);
  };

  useEffect(() => {
    getImages();
    getVectorimage();
  }, []);

  const getImages = async () => {
    try {
      const res = await PremiumImage.image();
      const response = res.data;

      const baseURL = `${process.env.REACT_APP_API_BASE_URL}`;

      // Fix image URLs by prepending the base URL
      const fixedImages = response.map((image) => {
        const imageUrl = image?.path || "";
        return {
          ...image,
          url: imageUrl.startsWith("http") ? imageUrl : baseURL + imageUrl,
        };
      });

      setImages(fixedImages);
    } catch (error) {
      console.error("Failed to fetch images:", error);
    }
  };

  const getVectorimage = async () => {
    try {
      const res = await PremiumImage.vectorimage();
      const response = res.data;

      const baseURL = `${process.env.REACT_APP_API_BASE_URL}`;

      // Fix image URLs by prepending the base URL
      const fixedImages = response.map((image) => {
        const imageUrl = image?.path || "";
        return {
          ...image,
          url: imageUrl.startsWith("http") ? imageUrl : baseURL + imageUrl,
        };
      });

      setVectorImg(fixedImages);
    } catch (error) {
      console.error("Failed to fetch images:", error);
    }
  };

  const [tabs, setTabs] = useState([]);

  const handleTabChange = (newTabs) => {
    setTabs(newTabs);
  };

  const openImgEditor = () => {
    setIsImgEditorShown(true);
  };

  const closeImgEditor = () => {
    setIsImgEditorShown(false);
  };

  const handleSave = (editedImageObject, designState) => {
    setIsImgEditorShown(false);
  };

  const handleError = (error) => {
    console.error("Image editor error:", error);
    setIsImgEditorShown(false);
  };

  const convertBlobToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const onDeleteImage = (index, source) => {
    if (source === "upload") {
      // Remove image from selectedFile
      setSelectedFile((prev) => prev.filter((_, i) => i !== index));
    } else if (source === "dropbox") {
      // Ensure dropdata exists and has the index
      if (dropdata && dropdata.length > index) {
        // handleDeleteDropboxFile(index);
      }
    }

    // Update combinedImages to reflect the deletion
    setCombinedImages((prev) => prev.filter((_, i) => i !== index));

    // Update local storage
    localStorage.setItem("uploadedImages", JSON.stringify(combinedImages.filter((_, i) => i !== index)));
  };
  useEffect(() => {
    if (premiumimg) {
      AddImage(premiumimg); // Perform the action when premiumimg updates
      openImgEditor();
    }
  }, [premiumimg]);


  const selectImage = (index, source) => {
    // console.log("source", source)
    // console.log("index", index)
    if (source === "premium") {
      if (premiumimg && premiumimg.length > 0) {
        console.log("premiumimg", premiumimg);
        AddImage(premiumimg);
        openImgEditor();
        return; // useEffect will handle it
      } else {
        console.error("No valid premium image found.");
      }
    } else if (source === "upload" && combinedImages && combinedImages.length > 0) {
      const selectedImage = combinedImages[index].url;
      if (selectedImage) {
        AddImage(selectedImage);
        openImgEditor();
      } else {
        console.error("No valid uploaded image at upload index", index);
      }
    } else if (source === "dropbox" && combinedImages && combinedImages.length > 0) {
      const DropImage = combinedImages[index];
      if (DropImage) {
        AddImage(DropImage.url);
        openImgEditor();
      } else {
        console.error("No valid uploaded image at dropdata index", index);
      }
    } else {
      console.error("No valid image found at the selected index or source");
    }
  };

  const handleClickOpenLogin = () => {
    setLoginOpen(true);
    setOpenSignUp(false);
  };
  const handleCloseLogin = () => setLoginOpen(false);

  const handleClickOpenSignUp = () => {
    setOpenSignUp(true);
    setLoginOpen(false);
  };

  const handleCloseSignUp = () => setOpenSignUp(false);

  const fetchUserData = async (token) => {
    if (!token) {
      console.warn("Token is null or undefined, skipping fetch.");
      return; // Exit the function if the token is null
    }

    try {
      const response = await fetch("https://flagg.devlopix.com/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch user data:", response.status);
        return;
      }

      const data = await response.json();
      setCurrentUser(data.name);
      localStorage.setItem("currentUser", data.name);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getApi = async (id) => {
    try {
      const res = await ProductCategoryService.ProductDetail(id);
      const response = res.data;
      setAllData(response);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const Allproducts = async () => {
    try {
      const res = await ProductService.ProductList();
      const response = res.data;
      setAllProduct(response); // Set product list
      if (response.length > 0) {
        // Automatically set the first product as the default selection
        setgetId(id);
        // console.log("Initial product ID set:", id);
      }
    } catch (error) {
      console.error("Error fetching all products:", error);
    }
  };

  useEffect(() => {
    Allproducts();
  }, []);

  useEffect(() => {
    if (getid) {
      // console.log("getid changed:", getid);
      getApi(getid);
    }
  }, [getid]);


  useEffect(() => {
    const clearLocalStorage = () => {
      localStorage.removeItem("productDetails");
      localStorage.removeItem("selectedCard");
      // console.log("LocalStorage cleared on navigation or page reload");
    };

    // Clear localStorage on page reload
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // This triggers the confirmation dialog
      clearLocalStorage();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup: Remove event listeners
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    // Add a delay to ensure localStorage is updated
    const delay = 3000;
    const timeoutId = setTimeout(() => {
      const storedImageLink = localStorage.getItem("selectedImage");
      if (storedImageLink) {
        AddImage(storedImageLink);
        setIsImgEditorShown(true);
      }
    }, delay);

    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, [location.key]);

  useEffect(() => {
    localStorage.removeItem("productDetails");
    localStorage.removeItem("selectedCard");
    // console.log("LocalStorage cleared on navigation to", location.pathname);
  }, [location.pathname]);

  return (
    <>
      {showSection && <HeaderDesign handleClickOpenLogin={handleClickOpenLogin} />}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
        {showSection && (
          <Sidebar
            combinedImages={combinedImages}
            setCombinedImages={setCombinedImages}
            value={value}
            setValue={setValue}
            setIsTabOpen={setIsTabOpen}
            isTabOpen={isTabOpen}
            setProductDetails={setProductDetails}
            productDetails={productDetails}
            selectedFile={selectedFile}
            onDeleteImage={onDeleteImage}
            selectImage={selectImage}
            onTabChange={handleTabChange}
            images={images}
            vectorimage={vectorimage}
            setImage={setQrImage}
            setPremiumimg={setPremiumimg}
            premiumimg={premiumimg}
            alldata={alldata}
            allproduct={allproduct}
            dropdata={dropdata}
            setgetId={setgetId}
            storedPayload={storedPayload}
            sx={{
              width: { xs: "100px", sm: "100%" },
              position: { xs: "relative", sm: "fixed" },
              left: { sm: 0 },
              top: { xs: 0, sm: "5rem" },
            }}
          />
        )}

        {showSection && (
          <BannerSideSection
            onToggleAccordion={handleAccordionToggle}
            productDetails={productDetails}
            alldata={alldata}
            setShowSection={setShowSection}
            setValue={setValue}
            setIsTabOpen={setIsTabOpen}
            storedPayload={storedPayload}
          />
        )}

        <Box
          sx={{
            minHeight: "78vh",
            width: {
              xs: "100%",
              xl: isAccordionOpen ? "calc(100% - 520px)" : "100%",
              lg: isAccordionOpen ? "calc(100% - 520px)" : "100%",
              sm: isAccordionOpen ? "calc(100% - 25%)" : "100%",
            },
            marginTop: "20px",
            marginLeft: { sm: "197px" },
            padding: { xs: "10px", sm: "20px" },
            position: "relative",
            boxShadow: { sm: "0px 5px 30px -15px" },
            alignItems: "flex-start",
            top: { xs: "5.5rem", sm: "5.5rem" },
            color: "#3F5163",
            borderRadius: "6px",
            zIndex: "2",
          }}
        >
          {!showSection && (
            <Box
              sx={{
                backgroundColor: "#e1e1e1",
                borderRadius: "10px",
                justifyContent: "center",
                alignItems: "center",
                height: "40px",
                display: "flex",
                width: "40px",
                float: "right",
                cursor: "pointer",
              }}
              onClick={() => setShowSection(true)}
            >
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect
                  x="5.75781"
                  y="3.6001"
                  width="21.8113"
                  height="1.94744"
                  transform="rotate(45 5.75781 3.6001)"
                  fill="#333333"
                ></rect>
                <rect
                  x="4.2002"
                  y="19.0229"
                  width="21.8113"
                  height="1.94744"
                  transform="rotate(-45 4.2002 19.0229)"
                  fill="#333333"
                ></rect>
              </svg>
            </Box>
          )}
          <h1>Your Content Here</h1>
          <p style={{ marginTop: "20px" }}>This is your main content area.</p>

          <Box
            sx={{
              maxWidth: {
                xs: "100%",
                sm: "32rem",
                md: isAccordionOpen ? "30rem" : "45rem",
                lg: isAccordionOpen ? "56rem" : "70rem",
                xl: "85rem",
              },
            }}
          >
            {isImgEditorShown && addimage && (
              <FilerobotImageEditor
                source={addimage || null}
                onSave={handleSave}
                onClose={closeImgEditor}
                onError={handleError}
                annotationsCommon={{
                  fill: "#ff0000",
                }}
                Text={{ text: "Filerobot..." }}
                Rotate={{ angle: 90, componentType: "slider" }}
                defaultTabId={TABS.ANNOTATE}
                defaultToolId={TOOLS.TEXT}
                sx={{
                  width: { xs: "100%", sm: "20rem" },
                }}
              />
            )}
          </Box>

          {qrimage && (
            <Box
              sx={{
                mt: 4,
                height: { xs: "20rem", sm: "40rem" },
                width: "auto",
              }}
            >
              <Rnd
                size={{ width: qrSize.width, height: qrSize.height }}
                onResizeStop={(e, direction, ref, delta, position) => {
                  setQrSize({
                    width: ref.style.width,
                    height: ref.style.height,
                  });
                }}
                bounds="parent"
                lockAspectRatio={true}
                style={{
                  border: "1px solid #ddd",
                  display: "inline-block",
                  padding: 10,
                  background: "white",
                }}
              >
                <img src={qrimage} alt="Generated QR Code" style={{ width: "100%", height: "100%" }} />
              </Rnd>
            </Box>
          )}
        </Box>
        <Toolbar />

        <LoginDialog
          open={loginOpen}
          handleClose={handleCloseLogin}
          handleOpenSignUp={handleClickOpenSignUp}
          fetchUserData={fetchUserData}
        />
        <CreateAccountDialog
          open={openSignUp}
          handleClose={handleCloseSignUp}
          setCurrentUser={setCurrentUser}
          handleOpenLogin={handleClickOpenLogin}
        />
      </Box>
    </>
  );
};

export default DesignOnline;
