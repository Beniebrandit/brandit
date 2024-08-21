import { Box, Container, Typography, IconButton, Grid } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Bannerslider_img from "../asset/images/bannerslider_img.png";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useRef, useState } from "react";
import { Navigation } from "swiper";

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
            <div className="swiper-container-wrapper">
              <Swiper
                navigation={true}
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

              {/* Custom Prev Button */}
              <div className="swiper-button-prev">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 80 81"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M34.2887 47.7867L27.606 41.1324C27.5561 41.0839 27.5099 41.0315 27.468 40.9757L27.594 41.1204C27.531 41.0583 27.4749 40.9904 27.4263 40.918C27.4051 40.8852 27.3845 40.8513 27.3653 40.8165C27.3496 40.7892 27.3353 40.7608 27.3221 40.7319C27.31 40.7041 27.2983 40.6762 27.2876 40.6478C27.2765 40.6202 27.2669 40.5919 27.2583 40.5634C27.2283 40.4627 27.2093 40.357 27.2035 40.2477C27.2016 40.2235 27.2009 40.1998 27.2009 40.176L27.2068 40.1066L27.2138 39.9951C27.2234 39.9243 27.2386 39.8553 27.2588 39.7886C27.267 39.7601 27.2765 39.7318 27.2871 39.704C27.2983 39.6758 27.31 39.6479 27.3226 39.6205C27.3353 39.5912 27.3496 39.5628 27.3649 39.5349C27.3845 39.5007 27.4051 39.4668 27.4272 39.4339C27.4394 39.4144 27.4531 39.3952 27.4673 39.3764C27.5061 39.3256 27.5477 39.2777 27.5925 39.2329L27.594 39.2316L34.2887 32.5653C34.5484 32.3056 34.8899 32.1758 35.2296 32.1758C35.5711 32.1758 35.9144 32.3056 36.1741 32.5689C36.6934 33.0918 36.6916 33.9348 36.1705 34.4542L31.7654 38.842L51.0742 38.842C51.8106 38.842 52.4082 39.4397 52.4082 40.176C52.4082 40.9124 51.8106 41.51 51.0742 41.51L31.7654 41.51L36.1705 45.8978C36.6916 46.4172 36.6934 47.2602 36.174 47.7831C35.6547 48.3061 34.8116 48.3061 34.2887 47.7867Z"
                    fill="#191D1E"
                  />
                  <circle
                    opacity="0.2"
                    cx="40"
                    cy="40"
                    r="39"
                    transform="matrix(1 1.74846e-07 1.74846e-07 -1 0 80.1758)"
                    stroke="#191D1E"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              <div className="swiper-button-next">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 80 81"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M45.7113 47.7867L52.394 41.1324C52.4439 41.0839 52.4901 41.0315 52.532 40.9757L52.406 41.1204C52.469 41.0583 52.5251 40.9904 52.5737 40.918C52.5949 40.8852 52.6155 40.8513 52.6347 40.8165C52.6504 40.7892 52.6647 40.7608 52.6779 40.7319C52.69 40.7041 52.7017 40.6762 52.7124 40.6478C52.7235 40.6202 52.7331 40.5919 52.7417 40.5634C52.7717 40.4627 52.7907 40.357 52.7965 40.2477C52.7984 40.2235 52.7991 40.1998 52.7991 40.176L52.7932 40.1066L52.7862 39.9951C52.7766 39.9243 52.7614 39.8553 52.7412 39.7886C52.733 39.7601 52.7235 39.7318 52.7129 39.704C52.7017 39.6758 52.69 39.6479 52.6774 39.6205C52.6647 39.5912 52.6504 39.5628 52.6351 39.5349C52.6155 39.5007 52.5949 39.4668 52.5728 39.4339C52.5606 39.4144 52.5469 39.3952 52.5327 39.3764C52.4939 39.3256 52.4523 39.2777 52.4075 39.2329L52.406 39.2316L45.7113 32.5653C45.4516 32.3056 45.1101 32.1758 44.7704 32.1758C44.4289 32.1758 44.0856 32.3056 43.8259 32.5689C43.3066 33.0918 43.3084 33.9348 43.8295 34.4542L48.2346 38.842L28.9258 38.842C28.1894 38.842 27.5918 39.4397 27.5918 40.176C27.5918 40.9124 28.1894 41.51 28.9258 41.51L48.2346 41.51L43.8295 45.8978C43.3084 46.4172 43.3066 47.2602 43.826 47.7831C44.3453 48.3061 45.1884 48.3061 45.7113 47.7867Z"
                    fill="#191D1E"
                  />
                  <circle
                    opacity="0.2"
                    cx="40"
                    cy="40"
                    r="39"
                    transform="matrix(1 1.74846e-07 1.74846e-07 -1 0 80.1758)"
                    stroke="#191D1E"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
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

          <Box
            sx={{
              position: "relative",
              marginTop: "30px",
              borderRadius: "10px",
            }}
          >
            <Box
              sx={{
                position: "relative",
                marginTop: "30px",
                borderRadius: "10px",
                overflow: "hidden",
                height: "500px",
              }}
            >
              <video
                ref={videoRef}
                width="100%"
                height="100%"
                poster={Bannerslider_img}
                style={{ objectFit: "cover" }}
              >
                <source
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <IconButton
                  onClick={handlePlayPause}
                  sx={{
                    color: "#fff",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: "20px",
                    borderRadius: "50%",
                  }}
                >
                  {isPlaying ? (
                    <PauseIcon sx={{ fontSize: 40 }} />
                  ) : (
                    <PlayArrowIcon sx={{ fontSize: 40 }} />
                  )}
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Bannerslider;
