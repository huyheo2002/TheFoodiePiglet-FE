import { Link } from "react-router-dom";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

function SubMenu({ data, className }) {
  const { t, i18n } = useTranslation(["header"]);

  const changeLanguages = (lng = "vi" || "en" ) => {
    i18n.changeLanguage(lng);
  };

  // console.log("data sub item", data);
  return (
    <ul
      className={clsx(
        className,
        "bg-[#272626] flex-col min-w-[14rem] z-50 absolute top-full hidden rounded-b-lg overflow-hidden",
      )}
    >
      {data &&
        data.length > 0 &&
        data.map((item, index) => {
          // console.log("sub item", item)
          // handle get languages
          let getKeyword = item.keyword || "";
          let findTypeLanguages = getKeyword !== "" && getKeyword.includes("languages");
          // default
          let getTypeLanguages = "vi";
          // console.log("getKeyword", getKeyword);
          if (findTypeLanguages) {
            let convertToArray = getKeyword.split("-");
            getTypeLanguages = convertToArray.length > 0 && convertToArray[convertToArray.length - 1];            
          }
          // console.log("getTypeLanguages", getTypeLanguages)          

          return (
            <li
              className="min-w-[10rem] h-full leading-[4rem] relative hover:bg-[#3b3a3a] transition-all duration-300 cursor-pointer"
              key={index}
              onClick={() => {
                if (findTypeLanguages) {
                  changeLanguages(getTypeLanguages)
                }                  
              }}
            >
              {item.href && (
                <a
                  href={item.href}
                  className="px-4 inline-block text-white text-[14px] capitalize w-full h-full"
                >
                  {item.keyword && t(`nav-subItem.${item.keyword}`)}
                </a>
              )}
  
              {item.to && (
                <Link
                  to={item.to}
                  className="px-4 inline-block text-white text-[14px] capitalize w-full h-full"
                >
                  {item.keyword && t(`nav-subItem.${item.keyword}`)}
                </Link>
              )}
  
              {!item.href && !item.to && (
                <div className="px-4 inline-block text-white text-[14px] capitalize w-full h-full">
                  {item.keyword && t(`nav-subItem.${item.keyword}`)}
                </div>
              )}
            </li>
          )
        })}
    </ul>
  );
}

export default SubMenu;
