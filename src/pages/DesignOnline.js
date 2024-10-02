import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/designcomponent/sidebar/Sidebar";
import BannerSideSection from "../components/designcomponent/BannerSideSection";
import FilerobotImageEditor, { TABS, TOOLS } from "react-filerobot-image-editor";
import HeaderDesign from "../components/designcomponent/HeaderDesign";
import Toolbar from "../components/designcomponent/Toolbar";

const DesignOnline = () => {
  const [selectedFile, setSelectedFile] = useState([]);
  const [addimage, AddImage] = useState("");
  const [isImgEditorShown, setIsImgEditorShown] = useState(false);

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

  return (
    <>
      <HeaderDesign />
      <Box style={{ display: "flex" }}>
        <Sidebar
          handleImageChange={handleImageChange}
          selectedFile={selectedFile}
          onDeleteImage={handleDeleteImage}
          selectImage={selectImage}
          onTabChange={handleTabChange}
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
          <Toolbar/>
        </Box>
      </Box>
    </>
  );
};

export default DesignOnline;
