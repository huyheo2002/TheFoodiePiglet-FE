import { Link } from "react-router-dom";
import itemSelect from "../../assets/images/Menu/base/SidebarItem-active.png";
import clsx from "clsx";
import { useState } from "react";
import { homeTypeOfFoods } from "../../data/homeTypeOfFoods";
import { useTranslation } from "react-i18next";
import WindowScrollTop from "../../utils/windowScroll";

function Sidebar() {
  const { t } = useTranslation(["home", "header"]);
  const [typeOfFoods, setTypeOfFoods] = useState(homeTypeOfFoods);
  const [indexActive, setIndexActive] = useState(1);
  return (
    <div
      className="w-full h-[calc(100vh-4rem)] overflow-hidden relative py-10 select-none 
      after:absolute after:top-0 after:left-[37px] after:contents-[''] after:block after:w-[0.125rem] after:h-full after:bg-[rgba(255,255,255,0.14);]
    "
    >
      {typeOfFoods.length > 0 &&
        typeOfFoods.map((item, index) => {
          if(item.title === "comingSoon") {
            return (
              <Link
                key={index}                
                className={clsx("pl-[54px] h-14 items-center flex relative pointer-events-none", {
                  "pl-[68px]": indexActive === index,
                  "after:w-2 after:h-2 after:contents-[''] after:absolute after:top-1/2 after:left-[34px] after:bg-white after:rotate-45 after:-translate-y-1/2": indexActive !== index,                  
                })}
                style={{
                  background: indexActive === index ? `url(${itemSelect})` : "",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <p
                  className={clsx(
                    "text-white text-lg font-medium capitalize tracking-wide",
                    {
                      "text-base font-normal": indexActive !== index,
                    }
                  )}
                >
                  {t(`product.${item.title}`)}
                </p>
              </Link>
            )
          }

          return (
            <Link
              key={index}
              onClick={() => {
                if(indexActive !== index) {
                  setIndexActive(index)
                  WindowScrollTop()
                }
              }}
              className={clsx("pl-[54px] h-14 items-center flex relative", {
                "pl-[68px]": indexActive === index,
                "after:w-2 after:h-2 after:contents-[''] after:absolute after:top-1/2 after:left-[34px] after:bg-white after:rotate-45 after:-translate-y-1/2": indexActive !== index,
              })}
              style={{
                background: indexActive === index ? `url(${itemSelect})` : "",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <p
                className={clsx(
                  "text-white text-lg font-medium capitalize tracking-wide",
                  {
                    "text-base font-normal": indexActive !== index,
                  }
                )}
              >
                {t(`product.${item.title}`)}
              </p>
            </Link>
          );
        })}      
    </div>
  );
}

export default Sidebar;
