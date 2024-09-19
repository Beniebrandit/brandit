import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import BannerSideSection from "../components/BannerSideSection";
import Toolbar from "../components/Toolbar";
import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from 'react-filerobot-image-editor';
import HeaderDesign from "../components/HeaderDesign";



const DesignOnline = () => {

  const [selectedFile, setSelectedFile] = useState([]);
  const [addimage, AddImage] = useState([]);
  // const [editorText, setEditorText] = useState({ text: 'Filerobot...', fontWeight: 'normal', fontStyle: 'normal' });


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setSelectedFile((prevFiles) => [...prevFiles, newImageUrl]);

      // Automatically set the first uploaded image as active if none exists
      // if (addimage === null) {
      //   AddImage(0);
      // }
    }
  };

  const handleDeleteImage = (index) => {
    setSelectedFile((prevFiles) => prevFiles.filter((_, i) => i !== index));
    console.log(index, "index");
  };

  const selectImage = (index) => {
    AddImage(selectedFile[index])
  };

  const editorRef = useRef(null);  // Create a ref to access the editor instance
  const [annotations, setAnnotations] = useState([]);  // Annotations array to hold added texts

  // This will hold the common text style and annotation data
  const [annotationsCommon, setAnnotationsCommon] = useState({
    text: '',  // Initially no text
    fontFamily: 'Arial',
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'normal',
    fill: '#000',
  });

  const handleStyleChange = (style) => {
    setAnnotationsCommon((prev) => ({
      ...prev,
      ...style,
    }));

    // After updating the text style, trigger adding the text to the image
    addTextAnnotation(style.text || "Sample Text");
  };

  const addTextAnnotation = (text) => {
    if (editorRef.current) {
      // Add the text annotation to the editor
      editorRef.current.addAnnotation({
        type: 'text',
        text: text || 'Sample Text',
        ...annotationsCommon,  // Apply the current style
      });
    }
  };

  console.log(annotationsCommon.text,"text");



console.log("addimage",addimage)

  return (
    <>
    <HeaderDesign/>
      <Box style={{ display: "flex" }}>
        <Sidebar
          handleImageChange={handleImageChange}
          selectedFile={selectedFile}
          onDeleteImage={handleDeleteImage}
          selectImage={selectImage}
          onStyleChange={handleStyleChange}
          // AddingImage={selectImage}
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
            zIndex: "1", // Ensure zIndex is properly set
          }}
        >
          <h1>Your Content Here</h1>
          <p>This is your main content area.</p>
          {addimage.length > 0 ? (
            <FilerobotImageEditor
            source={addimage}
            ref={editorRef}  // Attach the ref to access editor methods
            annotationsCommon={annotationsCommon}
        onComplete={(canvas, changed, newAnnotations) => {
          // Store the updated annotations
          setAnnotations(newAnnotations);
        }}
            Rotate={{ angle: 90, componentType: 'slider' }}
            Crop={{
              presetsItems: [
                {
                  titleKey: 'classicTv',
                  descriptionKey: '4:3',
                  ratio: 4 / 3,
                  // icon: CropClassicTv, // optional, CropClassicTv is a React Function component. Possible (React Function component, string or HTML Element)
                },
                {
                  titleKey: 'cinemascope',
                  descriptionKey: '21:9',
                  ratio: 21 / 9,
                  // icon: CropCinemaScope, // optional, CropCinemaScope is a React Function component.  Possible (React Function component, string or HTML Element)
                },
              ],
              presetsFolders: [
                {
                  titleKey: 'socialMedia', // will be translated into Social Media as backend contains this translation key
                  // icon: Social, // optional, Social is a React Function component. Possible (React Function component, string or HTML Element)
                  groups: [
                    {
                      titleKey: 'facebook',
                      items: [
                        {
                          titleKey: 'profile',
                          width: 180,
                          height: 180,
                          descriptionKey: 'fbProfileSize',
                        },
                        {
                          titleKey: 'coverPhoto',
                          width: 820,
                          height: 312,
                          descriptionKey: 'fbCoverPhotoSize',
                        },
                      ],
                    },
                  ],
                },
              ],
            }}
            tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK]} // or {['Adjust', 'Annotate', 'Watermark']}
            defaultTabId={TABS.ANNOTATE} // or 'Annotate'
            defaultToolId={TOOLS.TEXT} // or 'Text'
          />
          ) : (
            <Typography>No image selected</Typography>
          )}
          <Toolbar />
        </Box>

        <BannerSideSection />
      </Box>
    </>
  );
};

export default DesignOnline;
//sjkdfsjkfs