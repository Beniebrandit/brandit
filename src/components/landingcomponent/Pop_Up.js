import React from "react";
import Modal from "@mui/material/Modal";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { ReactComponent as SearchTemplete } from "../../asset/images/Vector.svg";
import { ReactComponent as DesignOnline } from "../../asset/images/DesignOnline.svg";
import { ReactComponent as UploadFile } from "../../asset/images/UploadFile.svg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1170,
  bgcolor: "background.paper",
  boxShadow: 24,

  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: "#3F5163",
    },
  },
};

const Pop_Up = ({ open, handleClose }) => {
  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="keep-mounted-modal-title"
            variant="h6"
            component="h2"
            sx={{ backgroundColor: "#3F5163", padding: "1rem", color: "white" }}
          >
            Select one of the Following
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              margin: "auto",
              backgroundColor: "#E0CE8F",
            }}
          >
            <Typography id="keep-mounted-modal-description" sx={{ padding: "1rem" }}>
              Type: Banner
            </Typography>
            <Typography id="keep-mounted-modal-description" sx={{ padding: "1rem" }}>
              Size: 72" W x 36" H
            </Typography>
            <Typography id="keep-mounted-modal-description" sx={{ padding: "1rem" }}>
              QTY: 2
            </Typography>
            <Typography id="keep-mounted-modal-description" sx={{ padding: "1rem" }}>
              Price: $39.02 sq/ft
            </Typography>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { md: "1fr 1fr 1fr", sm: "1fr" },
              padding: "1rem",
            }}
          >
            <Button
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "1rem",
                margin: "auto",
                backgroundColor: "#E0CE8F",
                width: "250px",
                height: "150px",
              }}
              href="/design"
            >
              <Box sx={{ margin: "auto", display: "block" }}>
                <Button>
                  <UploadFile />
                </Button>
              </Box>
              <Typography sx={{ textAlign: "center", color: "#3F5163" }}>Upload File</Typography>
            </Button>
            <Button
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "1rem",
                margin: "auto",
                backgroundColor: "#E0CE8F",
                width: "250px",
                height: "150px",
              }}
              href="/design"
            >
              <Box sx={{ margin: "auto", display: "block" }}>
                <Button>
                  <DesignOnline />
                </Button>
              </Box>

              <Typography sx={{ textAlign: "center", color: "#3F5163" }}>Design Online</Typography>
            </Button>
            <Button
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "1rem",
                margin: "auto",
                backgroundColor: "#E0CE8F",
                width: "250px",
                height: "150px",
              }}
            >
              <Box sx={{ margin: "auto", display: "block" }}>
                <SearchTemplete />
              </Box>

              <TextField sx={{ color: "#3F5163", backgroundColor: "white" }} placeholder="Search Template" />
            </Button>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Divider sx={{ flexGrow: 1 }} />
            <Typography sx={{ margin: "0 1rem", whiteSpace: "nowrap", fontSize: "20px" }}>
              <b>OR</b>
            </Typography>
            <Divider sx={{ flexGrow: 1 }} />
          </Box>
          <Box sx={{ padding: "1rem", margin: "auto" }}>
            <Box sx={{ padding: "1rem", margin: "auto", width: "60%" }}>
              <Typography sx={{ textAlign: "center" }}>
                <h2>Lorem Ipsum is simply dummy text</h2>
              </Typography>
              <Typography sx={{ textAlign: "center", marginTop: "0.5rem" }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s
              </Typography>
              <Box sx={{ textAlign: "center", marginTop: "0.5rem" }}>
                <Button
                  sx={{
                    backgroundColor: "#3F5163",
                    padding: "1rem",
                    color: "white",
                    fontSize: "13px",
                    "&:hover": {
                      backgroundColor: "#6888a7",
                    },
                  }}
                  href="/design-service"
                >
                  Submit a Design Request
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Pop_Up;
