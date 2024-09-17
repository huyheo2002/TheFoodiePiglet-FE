import { Link } from "react-router-dom";
import itemSelect from "../../assets/images/Menu/base/SidebarItem-active.png";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import WindowScrollTop from "../../utils/windowScroll";
import * as category from "../../services/categoryServices";
import { useMenuSelected } from "../../contexts/menuSelectedContext";

function Sidebar({ getCategorySelected }) {
  const { t } = useTranslation(["home", "header"]);
  const [typeOfFoods, setTypeOfFoods] = useState([]);
  const { currentCategory, setCurrentCategory } = useMenuSelected();

  const fetchDataTypeOfProduct = async () => {
    let respon = (await category.getAllorOneCategoryOfProduct("all")) ?? null;
    if (respon) {
      setTypeOfFoods(respon.categories);

      if (currentCategory) {
        let filterDataCategory =
          respon.categories.length > 0
            ? respon.categories.filter((item) => item.id === currentCategory)
            : [];
        if (filterDataCategory.length > 0) {
          getCategorySelected(filterDataCategory);
        }
      }
    }
  };

  useEffect(() => {
    let filterDataCategory =
      typeOfFoods.length > 0
        ? typeOfFoods.filter((item) => item.id === currentCategory)
        : [];
    if (filterDataCategory.length > 0) {
      getCategorySelected(filterDataCategory);
    }
  }, [currentCategory]);

  useEffect(() => {
    fetchDataTypeOfProduct();
  }, []);

  return (
    <div
      className="w-full h-[calc(100vh-4rem)] overflow-hidden relative py-10 select-none
      after:absolute after:top-0 after:left-[37px] after:contents-[''] after:block after:w-[0.125rem] after:h-full after:bg-[rgba(255,255,255,0.14);]
    "
    >
      {typeOfFoods.length > 0 &&
        typeOfFoods.map((item, index) => {
          if (item.keyword === "vui-long-cho") {
            return (
              <Link
                key={index}
                className={clsx(
                  "pl-[54px] h-14 items-center flex relative pointer-events-none",
                  {
                    "pl-[68px] left-[5px]": currentCategory === item.id,
                    "after:w-2 after:h-2 after:contents-[''] after:absolute after:top-1/2 after:left-[34px] after:bg-white after:rotate-45 after:-translate-y-1/2":
                      currentCategory !== item.id,
                  }
                )}
                style={{
                  backgroundImage:
                    currentCategory === item.id ? `url(${itemSelect})` : "",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <p
                  className={clsx(
                    "text-white text-lg font-medium capitalize tracking-wide",
                    {
                      "text-base font-normal": currentCategory !== item.id,
                    }
                  )}
                >
                  {t(`product.${item.keyword}`)}
                </p>
              </Link>
            );
          }

          return (
            <Link
              key={index}
              onClick={() => {
                if (currentCategory !== item.id) {
                  setCurrentCategory(item.id);
                  WindowScrollTop();
                }
              }}
              className={clsx("pl-[54px] h-14 items-center flex relative", {
                "pl-[68px] left-[5px]": currentCategory === item.id,
                "after:w-2 after:h-2 after:contents-[''] after:absolute after:top-1/2 after:left-[34px] after:bg-white after:rotate-45 after:-translate-y-1/2":
                  currentCategory !== item.id,
              })}
              style={{
                backgroundImage:
                  currentCategory === item.id ? `url(${itemSelect})` : "",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <p
                className={clsx(
                  "text-white text-lg font-medium capitalize tracking-wide",
                  {
                    "text-base font-normal": currentCategory !== item.id,
                  }
                )}
              >
                {t(`product.${item.keyword}`)}
              </p>
            </Link>
          );
        })}
    </div>
  );
}

export default Sidebar;
