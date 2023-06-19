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
import { BellIcon, HotMealIcon } from "../../components/Icons";
import ItemCompact from "../../components/ItemCompact";
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation(["home", "header"]);
  console.log("heading.special", t("heading.special"))
  return (
    <div className="my-8 relative">
      {/* slideshow */}
      <SlideShow />
      {/* product specialities */}
      <Heading iconRight={<HotMealIcon className={"text-[1.5rem]"} />}>
        {t("heading.special")}
      </Heading>
      <div className="flex flex-row flex-wrap">
        <ItemCompact />
        <ItemCompact />
        <ItemCompact />
        <ItemCompact />
        <ItemCompact />
        <ItemCompact />
      </div>
    </div>
  );
}

export default Home;
