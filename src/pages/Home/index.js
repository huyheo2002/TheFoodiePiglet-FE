import React, { useRef, useState } from "react";

import SlideShow from "../../components/SlideShow";
import Heading from "../../components/Heading";
import { BellIcon, HotMealIcon, PlusIcon } from "../../components/Icons";
import ItemCompact from "../../components/ItemCompact";
import { useTranslation } from "react-i18next";
import bgNews1 from "../../assets/images/Base/bg-news-homepage.jfif";
import bgNews2 from "../../assets/images/Base/bg-news2-homepage.jfif";
import bgNews3 from "../../assets/images/Base/bg-news3-homepage.jfif";
import Button from "../../components/Button";
import { homeTypeOfFoods } from "../../data/homeTypeOfFoods";

import underline from "../../assets/images/Base/underlineTitle-home.png";
import clsx from "clsx";

function Home() {
  const { t } = useTranslation(["home", "header"]);
  const [typeOfFoods, setTypeOfFoods] = useState(homeTypeOfFoods);

  return (
    <div className="mt-8 relative">
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
      {/* news */}
      <Heading>{t("heading.news")}</Heading>
      <div className="h-[400px] flex mx-10">
        <div className="h-full w-1/2">
          <SlideShow className={"w-full !h-[400px] !rounded-none"} />
        </div>
        <div
          className="h-full w-1/2 relative"
          style={{
            backgroundImage: `url(${bgNews2})`,
            backgroundOrigin: "border-box",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="bg-[rgba(38,18,12,0.62)] absolute inset-0 py-9 px-8">
            <ul className="list-none">
              <li className="font-medium text-xl text-[#ffd49f] px-3 py-2 border-b-[rgba(255,255,255,0.2)] border-b-[3px] tracking-widest select-none">
                {t("heading.lastest")}
              </li>
            </ul>
            <ul className="">
              <li className="border-b-[3px] border-[rgba(255,255,255,0.2)] px-3 py-2 select-none tracking-wider cursor-pointer hover:bg-[rgba(255,212,159,0.06)] transition-all duration-300">
                <a className="inline-flex items-center justify-between w-full">
                  <p className="text-white font-normal text-lg w-4/5 text-left whitespace-nowrap text-ellipsis overflow-hidden">
                    Lastest
                  </p>
                  <span className="w-1/5 text-right text-[rgba(255,255,255,0.45)] text-base font-light capitalize">
                    july 15, 2023{" "}
                  </span>
                </a>
              </li>
              <li className="border-b-[3px] border-[rgba(255,255,255,0.2)] px-3 py-2 select-none tracking-wider cursor-pointer hover:bg-[rgba(255,212,159,0.06)] transition-all duration-300">
                <a className="inline-flex items-center justify-between w-full">
                  <p className="text-white font-normal text-lg w-4/5 text-left whitespace-nowrap text-ellipsis overflow-hidden">
                    Lastest
                  </p>
                  <span className="w-1/5 text-right text-[rgba(255,255,255,0.45)] text-base font-light capitalize">
                    july 15, 2023{" "}
                  </span>
                </a>
              </li>
              <li className="border-b-[3px] border-[rgba(255,255,255,0.2)] px-3 py-2 select-none tracking-wider cursor-pointer hover:bg-[rgba(255,212,159,0.06)] transition-all duration-300">
                <a className="inline-flex items-center justify-between w-full">
                  <p className="text-white font-normal text-lg w-4/5 text-left whitespace-nowrap text-ellipsis overflow-hidden">
                    Lastest
                  </p>
                  <span className="w-1/5 text-right text-[rgba(255,255,255,0.45)] text-base font-light capitalize">
                    july 15, 2023{" "}
                  </span>
                </a>
              </li>
              <li className="border-b-[3px] border-[rgba(255,255,255,0.2)] px-3 py-2 select-none tracking-wider cursor-pointer hover:bg-[rgba(255,212,159,0.06)] transition-all duration-300">
                <a className="inline-flex items-center justify-between w-full">
                  <p className="text-white font-normal text-lg w-4/5 text-left whitespace-nowrap text-ellipsis overflow-hidden">
                    Lastest
                  </p>
                  <span className="w-1/5 text-right text-[rgba(255,255,255,0.45)] text-base font-light capitalize">
                    july 15, 2023{" "}
                  </span>
                </a>
              </li>
              <li className="border-b-[3px] border-[rgba(255,255,255,0.2)] px-3 py-2 select-none tracking-wider cursor-pointer hover:bg-[rgba(255,212,159,0.06)] transition-all duration-300">
                <a className="inline-flex items-center justify-between w-full">
                  <p className="text-white font-normal text-lg w-4/5 text-left whitespace-nowrap text-ellipsis overflow-hidden">
                    Lastest
                  </p>
                  <span className="w-1/5 text-right text-[rgba(255,255,255,0.45)] text-base font-light capitalize">
                    july 15, 2023{" "}
                  </span>
                </a>
              </li>
            </ul>
            <div className="flex justify-end mt-3">
              <Button variant={"primary"} iconRight={<PlusIcon />}>
                {t("button.more")}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* type of foods :v */}
      <div className="mt-3">
        <Heading >{t("heading.menu")}</Heading>
      </div>
      <div className="-mx-16 mt-3">
        {typeOfFoods.length > 0 &&
          typeOfFoods.map((item, index) => {
            return (
              <div
                key={index}
                // "w-full h-64 relative cursor-pointer overflow-hidden group
                //   before:content-[''] before:bg-[rgba(0,0,0,0.4)] before:absolute before:inset-0 before:z-20
                //   hover:before:bg-[rgba(255,255,255,0.05)] hover:after:transition-all hover:after:duration-300                  
                // "
                className={clsx("w-full h-64 relative overflow-hidden select-none",
                  "before:content-[''] before:bg-[rgba(0,0,0,0.4)] before:absolute before:inset-0 before:z-20",
                  {
                    "group hover:before:bg-[rgba(255,255,255,0.05)] hover:after:transition-all hover:after:duration-300 cursor-pointer": item.hover
                  }
                )}                
              >
                <div className="absolute z-30 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                  <p className={clsx("relative capitalize text-white font-semibold text-2xl tracking-widest", {
                    "!text-[rgba(255,255,255,0.3)]": item.hover === false
                  })}
                  
                  >{t(`product.${item.title}`)}</p>
                  <div
                    className={clsx("w-full h-3 opacity-0", {
                      "group-hover:opacity-100 transition-all duration-300": item.hover
                    })}                    
                    style={{
                      background: `url(${underline}) center/cover no-repeat`,
                    }}
                  ></div>
                </div>                                
                {/* overlay */}
                <div
                  className={clsx("absolute inset-0 z-10", {
                    "group-hover:scale-125 transition-all duration-500": item.hover
                  })}
                  style={{
                    background: `url(${item.background}) center/cover no-repeat`,
                  }}
                ></div>
                {/* border overlay */}
                <div className={clsx("absolute inset-0 z-20 border-4 border-transparent border-solid", {
                  "group-hover:border-white transition-all duration-300": item.hover
                })}></div>
              </div>
            );
          })
        }        
      </div>
    </div>
  );
}

export default Home;
