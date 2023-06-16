import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";
import SlideShow from "../../components/SlideShow";
import Heading from "../../components/Heading";
import { BellIcon } from "../../components/Icons";

function Home() {
  return (
    <div>
      {/* Home pages */}
      {/* slideshow */}     
      <SlideShow/> 
      {/* <h1 className="leading-4"></h1> */}
      <Heading iconRight={<BellIcon className={"text-[1.5rem]"}/>}>OUR SPECIALITIES</Heading>
    </div>
  );
}

export default Home;
