import { Box, Container, Typography, IconButton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Bannerslider_img from "../../asset/images/bannerslider_img.png";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useRef, useState } from "react";
import "./Bannerslider.css";

const Bannerslider = () => {
  let swiperRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <Container sx={{ marginTop: "190px" }}>
        <Box>
          <Typography
            sx={{
              fontSize: "60px",
              color: "#3F5163",
              lineHeight: "auto",
              fontFamily: "Avenir LT Std",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            Banners Image Gallery
          </Typography>
          <Box sx={{ position: "relative", marginTop: "30px" }}>
            <Swiper
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              modules={[Navigation]}
              className="mySwiper"
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              <SwiperSlide>
                <img
                  alt="Bannerslider_img"
                  src={Bannerslider_img}
                  width="100%"
                  height="100%"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  alt="Bannerslider_img"
                  src={Bannerslider_img}
                  width="100%"
                  height="100%"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  alt="Bannerslider_img"
                  src={Bannerslider_img}
                  width="100%"
                  height="100%"
                />
              </SwiperSlide>
            </Swiper>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </Box>

          <Typography
            sx={{
              fontSize: "60px",
              color: "#3F5163",
              lineHeight: "auto",
              fontFamily: "Avenir LT Std",
              textAlign: "center",
              fontWeight: "600",
              marginTop: "80px",
            }}
          >
            Our Video Gallery
          </Typography>

          <Box sx={{ position: "relative", marginTop: "30px",borderRadius:"10px" }}>
            <Swiper
              navigation={{
                nextEl: ".swiper-button-next-video",
                prevEl: ".swiper-button-prev-video",
              }}
              modules={[Navigation]}
              className="mySwiper"
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              <SwiperSlide>
                <Box sx={{ position: "relative" }}>
                  <video
                    ref={videoRef}
                    width="100%"
                    height="100%"
                    poster={Bannerslider_img}
                  >
                    <source
                      src="https://www.w3schools.com/html/mov_bbb.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                  <Box className="play-button-overlay">
                    <IconButton
                      onClick={handlePlayPause}
                      sx={{
                        color: "#fff",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        padding: "10px",
                        borderRadius: "50%",
                      }}
                    >
                      {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                    </IconButton>
                  </Box>
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <Box sx={{ position: "relative" }}>
                  <Box className="play-button-overlay">
                    <Typography>PLAY VIDEO</Typography>
                  </Box>
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <Box sx={{ position: "relative" }}>
                  <img
                    alt="Video Thumbnail"
                    src={Bannerslider_img}
                    width="100%"
                    height="100%"
                  />
                  <Box className="play-button-overlay">
                    <Typography>PLAY VIDEO</Typography>
                  </Box>
                </Box>
              </SwiperSlide>
            </Swiper>
            <div className="swiper-button-prev-video"></div>
            <div className="swiper-button-next-video"></div>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Bannerslider;
