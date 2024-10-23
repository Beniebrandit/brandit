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

const DesignOnline = () => {
  const [selectedFile, setSelectedFile] = useState([]);
  const [addimage, AddImage] = useState("");
  const [images, setImages] = useState();
  const [isImgEditorShown, setIsImgEditorShown] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [qrimage, setQrImage] = useState(null);
  const [qrSize, setQrSize] = useState({ width: 150, height: 150 });

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    ProductService.image().then((res) => {
      const response = res.data;
      setImages(response);

      //console.log(response, "response");
    });
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
    console.log("saved", editedImageObject, designState);
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

  const handleDeleteImage = (index) => {
    setSelectedFile((prevFiles) => prevFiles.filter((_, i) => i !== index));
    console.log(index, "index");
  };

  const selectImage = (index) => {
    AddImage(selectedFile[index]);
    openImgEditor();
  };

  console.log(selectedFile, "selectedFile");
  console.log(addimage, "addimage");

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

    console.log("Fetching user data from: https://flagg.devlopix.com/api/user");

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

  return (
    <>
      <HeaderDesign handleClickOpenLogin={handleClickOpenLogin} />
      <Box style={{ display: "flex" }}>
        <Sidebar
          handleImageChange={handleImageChange}
          selectedFile={selectedFile}
          onDeleteImage={handleDeleteImage}
          selectImage={selectImage}
          onTabChange={handleTabChange}
          images={images}
          setImage={setQrImage}
        />
        <Box
          style={{
            height: "100%",
            width: "100%",
            marginLeft: "210px",
            marginRight: "265px",
            padding: "20px",
            position: "relative",
            boxShadow: "0px 5px 30px -15px",
            alignItems: "flex-start",
            top: "5rem",
            color: "#3F5163",
            borderRadius: "6px",
            zIndex: "1",
          }}
        >
          <h1>Your Content Here</h1>
          <p>This is your main content area.</p>
          <BannerSideSection />
          {isImgEditorShown && (
            <FilerobotImageEditor
              source={addimage || null}
              onSave={handleSave}
              onClose={closeImgEditor}
              onError={handleError}
              tabsIds={[]}
              tools={[]}
            />
          )}
          {/* Display the generated QR code image */}
          {qrimage && (
            <Box sx={{ mt: 4, height: "40rem", width: "auto" }}>
              {/*<Typography variant="h6" sx={{ mb: 2 }}>
                Generated QR Code (Drag and Resize):
              </Typography>*/}

              <Rnd
                size={{ width: qrSize.width, height: qrSize.height }}
                onResizeStop={(e, direction, ref, delta, position) => {
                  setQrSize({
                    width: ref.style.width,
                    height: ref.style.height,
                  });
                }}
                bounds="parent"
                lockAspectRatio={true} // Maintain aspect ratio
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
