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

const DesignOnline = () => {
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
  const [productDetails, setProductDetails] = useState({
    width: "",
    height: "",
    quantity: 1,
    price: null,
  });

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
      //console.log(fixedImages, "Fixed image URLs");
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
      //console.log(fixedImages, "Fixed image URLs");
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

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64Image = await convertBlobToBase64(file);
      setSelectedFile((prevFiles) => [...prevFiles, base64Image]);
    }
  };

  const onDeleteImage = (index, source) => {
    if (source === "upload") {
      // Remove image from selectedFile
      setSelectedFile((prev) => prev.filter((_, i) => i !== index));
    } else if (source === "dropdata") {
      // Remove image from dropdata
      handleDeleteDropboxFile(dropdata[index].id); // Assume you have a function to delete from Dropbox
    }
  };

  const selectImage = (index, source) => {
    let selectedImageUrl = "";
    if (source === "premium" && premiumimg && premiumimg.length > 0) {
      const selectedImage = premiumimg[index];

      if (selectedImage?.path) {
        selectedImageUrl = `${process.env.REACT_APP_API_BASE_URL}${selectedImage.path}`;
        AddImage(selectedImageUrl); // Use the full URL here
        openImgEditor();
      } else {
        console.error("No valid premium image at premium index", index);
      }
    } else if (source === "upload" && selectedFile && selectedFile.length > 0) {
      const selectedImage = selectedFile[index];
      if (selectedImage) {
        AddImage(selectedImage);
        openImgEditor();
      } else {
        console.error("No valid uploaded image at upload index", index);
      }
    } else if (source === "dropdata" && dropdata && dropdata.length > 0) {
      const DropImage = dropdata[index];
      if (DropImage) {
        AddImage(DropImage.link);
        openImgEditor();
      } else {
        console.error("No valid uploaded image at dropdata index", index);
      }
    } else {
      console.error("No valid image found at the selected index or source");
    }
    //console.log("Selected premium image URL:", selectedImageUrl);
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

  const getApi = async () => {
    ProductService.product().then((res) => {
      const response = res.data;
      setAllData(response);
    });
  };
  const Allproducts = async () => {
    ProductService.Allproduct().then((res) => {
      const response = res.data;
      setAllProduct(response);
    });
  };

  useEffect(() => {
    getApi();
    Allproducts();
  }, []);

  const handleSuccess = (files) => {
    if (files && files.length > 0) {
      const updatedFiles = files.map((file) => {
        const imageUrl = file.link.replace("&dl=0", "&dl=1");
        return {
          name: file.name,
          link: imageUrl,
          thumbnail: file.thumbnailLink,
        };
      });
      setDropData(updatedFiles);
    }
  };

  const handleDeleteDropboxFile = (index) => {
    setDropData(dropdata.filter((_, i) => i !== index));
  };
  return (
    <>
      {showSection && <HeaderDesign handleClickOpenLogin={handleClickOpenLogin} />}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
        {showSection && (
          <Sidebar
            setProductDetails={setProductDetails}
            productDetails={productDetails}
            handleImageChange={handleImageChange}
            selectedFile={selectedFile}
            onDeleteImage={onDeleteImage}
            selectImage={selectImage}
            onTabChange={handleTabChange}
            images={images}
            vectorimage={vectorimage}
            setImage={setQrImage}
            setPremiumimg={setPremiumimg}
            alldata={alldata}
            allproduct={allproduct}
            handleDeleteDropboxFile={handleDeleteDropboxFile}
            handleSuccess={handleSuccess}
            dropdata={dropdata}
            sx={{
              width: { xs: "100px", sm: "100%" }, // Full width on xs, fixed width on sm and up
              position: { xs: "relative", sm: "fixed" },
              left: { sm: 0 },
              top: { xs: 0, sm: "5rem" },
            }}
          />
        )}

        <Box
          sx={{
            minHeight: "78vh",
            width: {
              xs: "100%",
              xl: isAccordionOpen ? "calc(100% - 30%)" : "100%",
              lg: isAccordionOpen ? "calc(100% - 30%)" : "100%",
              sm: isAccordionOpen ? "calc(100% - 25%)" : "100%",
            },
            marginTop: "20px",
            marginLeft: "197px",
            marginRight: { sm: isAccordionOpen ? "265px" : "0px" },
            padding: { xs: "10px", sm: "20px" },
            position: "relative",
            boxShadow: { sm: "0px 5px 30px -15px" },
            alignItems: "flex-start",
            top: { xs: "2rem", sm: "5rem" },
            color: "#3F5163",
            borderRadius: "6px",
            zIndex: "1",
          }}
        >
          {!showSection && (
            <Box
              sx={{
                backgroundColor: "#e1e1e1",
                borderRadius: "10px",
                // margin: "10px 0px 0px 0px",
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
          <p>This is your main content area.</p>
          {showSection && (
            <BannerSideSection
              onToggleAccordion={handleAccordionToggle}
              productDetails={productDetails}
              setShowSection={setShowSection}
            />
          )}
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
                  width: { xs: "100%", sm: "20rem" }, // Ensure FilerobotImageEditor resizes on small screens
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
          <Toolbar />
        </Box>

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
