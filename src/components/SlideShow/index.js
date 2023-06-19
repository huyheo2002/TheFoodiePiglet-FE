import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Comp
import SwiperButton from "./SwiperButton";
import clsx from "clsx";

const FAKE_DATA = [
  {
    image: "https://wallpaperaccess.com/full/3838496.jpg",
    title: "Background 1",
    subTitle: "Slogan 3",
    interval: 1500,
  },
  {
    image:
      "https://img6.thuthuatphanmem.vn/uploads/2022/07/05/anh-anime-4k-tuyet-dep_043710401.jpg",
    title: "Background 2",
    subTitle: "Slogan 3",
    interval: 1500,
  },
  {
    image:
      "https://duhocchaudaiduong.edu.vn/hinh-nen-may-tinh-anime-4k/imager_2725.jpg",
    title: "Background 3",
    subTitle: "Slogan 3",
    interval: 1500,
  },
  {
    image:
      "https://tophinhanhdep.com/wp-content/uploads/2021/11/Live-Anime-4K-Wallpapers.jpg",
    title: "Background 4",
    subTitle: "Slogan 3",
    interval: 1500,
  },
  {
    image:
      "https://img4.thuthuatphanmem.vn/uploads/2020/05/07/hinh-anh-anh-nen-anime-4k-dep_094210852.jpg",
    title: "Background 5",
    subTitle: "Slogan 3",
    interval: 1500,
  },
  {
    image:
      "https://images.hdqwalls.com/download/anime-girl-moescape-alone-standing-4k-nz-1920x1080.jpg",
    title: "Background 6",
    subTitle: "Slogan 3",
    interval: 1500,
  },
];

function SlideShow() {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return (
        '<span class="' +
        clsx(
          className,
          "!w-6 !h-6 text-center leading-6 select-none text-[18px] text-white"
        ) +
        '">' +
        (index + 1) +
        "</span>"
      );
    },
  };

  const swiperRefLocal = useRef();
  const handleMouseEnter = () => {
    swiperRefLocal?.current?.swiper?.autoplay?.stop();
  };
  const handleMouseLeave = () => {
    swiperRefLocal?.current?.swiper?.autoplay?.start();
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="mb-3">
      <Swiper
        ref={swiperRefLocal}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={pagination}
        scrollbar={{ draggable: true }}
        loop
        grabCursor
        autoplay={{
          delay: 3000,
          // disableOnInteraction: false,
          // pauseOnMouseEnter: true,
        }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
      >
        {FAKE_DATA.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="w-full h-[600px] relative rounded-xl overflow-hidden select-none">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full absolute inset-0 rounded-xl"
                />
              </div>
            </SwiperSlide>
          );
        })}
        <SwiperButton
          type="next"
          classNameWrapper="absolute top-1/2 right-1 font-[70px] z-50 translate-y-[-50%] cursor-pointer p-2 bg-white rounded-full hover:bg-[#ccc] transition-all duration-300 group"
          classNameIcon="!w-8 !h-8 text-black group-hover:text-white transition-all duration-300"
        />
        <SwiperButton
          type="prev"
          classNameWrapper="absolute top-1/2 left-1 font-[70px] z-50 translate-y-[-50%] cursor-pointer p-2 bg-white rounded-full hover:bg-[#ccc] transition-all duration-300 group"
          classNameIcon="!w-8 !h-8 text-black group-hover:text-white transition-all duration-300"
        />
      </Swiper>
    </div>
  );
}

export default SlideShow;
