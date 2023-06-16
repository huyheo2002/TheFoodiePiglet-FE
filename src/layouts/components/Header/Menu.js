import { Link } from "react-router-dom";
import SubMenu from "./SubMenu";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Fragment } from "react";

function Menu({ data }) {
  const { t, i18n } = useTranslation(["header"]);
  // const currentLanguage = i18n.language;
  // console.log("currentLanguage", currentLanguage)
  return (
    <ul className="flex items-center h-full px-6">
      {data &&
        data.length > 0 &&
        data.map((item, index) => {
          return (
            <li
              className="h-full leading-[4rem] relative group"
              key={index}
            >
              {item.href && (
                <a
                  href={item.href}
                  className="h-full px-3 inline-flex items-center text-gray-200 text-[16px] capitalize group-hover:text-white transition-all duration-300"
                >
                  {!item.onlyShowIcon ? 
                    <Fragment>
                      {item.keyword && t(`nav-item.${item.keyword}`)}
                      {item.icon && (
                        <span className="text-current ml-2">{item.icon}</span>
                      )}
                    </Fragment>
                    :
                    <Fragment>
                      {item.icon && (
                        <span className="text-current ml-2">{item.icon}</span>
                      )}
                    </Fragment>
                  }
                </a>
              )}
              {item.to && (
                <Link
                  to={item.to}
                  className="h-full px-3 inline-flex items-center text-gray-200 text-[16px] capitalize group-hover:text-white transition-all duration-300"
                >
                  {!item.onlyShowIcon ? 
                    <Fragment>
                      {item.keyword && t(`nav-item.${item.keyword}`)}
                      {item.icon && (
                        <span className="text-current ml-2">{item.icon}</span>
                      )}
                    </Fragment>
                    :
                    <Fragment>
                      {item.icon && (
                        <span className="text-current ml-2">{item.icon}</span>
                      )}
                    </Fragment>
                  }                  
                </Link>
              )}
              {!item.href && !item.to && (
                <div className="h-full px-3 inline-flex items-center text-gray-200 text-[16px] capitalize group-hover:text-white transition-all duration-300">
                  {!item.onlyShowIcon ? 
                    <Fragment>
                      {item.keyword && t(`nav-item.${item.keyword}`)}
                      {item.icon && (
                        <span className="text-current ml-2">{item.icon}</span>
                      )}
                    </Fragment>
                    :
                    <Fragment>
                      {item.icon && (
                        <span className="text-current ml-2">{item.icon}</span>
                      )}
                    </Fragment>
                  }
                </div>
              )}
              {item.subNav && (
                <SubMenu data={item.subNav} className="group-hover:flex" />
              )}
            </li>
          );
        })}
    </ul>
  );
}

export default Menu;
