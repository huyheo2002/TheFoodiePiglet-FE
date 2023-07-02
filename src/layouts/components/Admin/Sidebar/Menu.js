import clsx from "clsx";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Menu({ data }) {
  const { t } = useTranslation(["admin"]);
  const [active, setActive] = useState(-1);
  const toggleSidebar = useSelector(states => states.admin.toggleSidebar)

  const renderListItems = (listItem) => {
    let subItems = [];

    if (listItem && listItem.length > 0) {
      subItems = listItem;
    }
    // console.log("subItems", subItems);
    return (
      <ul className="list-none w-full">
        {subItems &&
          subItems.map((item, index) => {
            return (
              <li
                className={clsx(
                  "w-full h-10 leading-10 relative select-none group hover:bg-[#e6f2fe] transition-all duration-300 rounded-lg",
                  {
                    "!bg-[#e6f2fe]": active === item.idItem,
                  }
                )}
                key={index}
                onClick={() => setActive(item.idItem)}
              >
                {item.href && (
                  <a
                    href={item.href}
                    className={clsx(
                      "h-full w-full px-4 inline-flex items-center text-[#4a4a4a] text-sm font-medium tracking-wider capitalize group-hover:text-[#548be6]",
                      {
                        "!text-[#548be6]": active === item.idItem,
                      }
                    )}
                  >
                    {item.icon && (
                      <span className="text-current mr-4">{item.icon}</span>
                    )}
                    {t(`sidebar.nameItems.${item.name}`)}
                  </a>
                )}

                {item.to && (
                  <Link
                    to={item.to}
                    className={clsx(
                      "h-full w-full px-4 inline-flex items-center text-[#4a4a4a] text-sm font-medium tracking-wider capitalize group-hover:text-[#548be6]",
                      {
                        "!text-[#548be6]": active === item.idItem,
                      }
                    )}
                  >
                    {item.icon && (
                      <span className="text-current mr-4">{item.icon}</span>
                    )}
                    {t(`sidebar.nameItems.${item.name}`)}
                  </Link>
                )}

                {!item.to && !item.href && (
                  <div
                    to={item.to}
                    className={clsx(
                      "h-full w-full px-4 inline-flex items-center text-[#4a4a4a] text-sm font-medium tracking-wider capitalize group-hover:text-[#548be6]",
                      {
                        "!text-[#548be6]": active === item.idItem,
                      }
                    )}
                  >
                    {item.icon && (
                      <span className="text-current mr-4">{item.icon}</span>
                    )}
                    {t(`sidebar.nameItems.${item.name}`)}
                  </div>
                )}
              </li>
            );
          })}
      </ul>
    );
  };

  renderListItems();

  return (
    <div className={clsx("px-3 h-full overflow-y-scroll scrollbar")}>
      {data &&
        data.map((item, index) => {
          return (
            <Fragment key={index}>
              <h1 className="text-lg font-semibold py-2 select-none">
                {t(`sidebar.title.${item.title}`)}
              </h1>
              {renderListItems(item.items)}
            </Fragment>
          );
        })}
    </div>
  );
}

export default Menu;
