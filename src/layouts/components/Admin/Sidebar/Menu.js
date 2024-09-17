import clsx from "clsx";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import * as permissionServices from "../../../../services/permissionServices";
import { useAuth } from "../../../../contexts/authContext";

function Menu({ data }) {
  const { t } = useTranslation(["admin"]);
  const currentURL = window.location.pathname;
  const [active, setActive] = useState(-1);
  const [listPermissionGroup, setListPermissionGroup] = useState([]);
  const { dataUser } = useAuth();

  const handleCheckPermission = async () => {
    const responPermissionGroup =
      await permissionServices.getAllPermissionGroup();
    if (responPermissionGroup && responPermissionGroup.errCode === 0) {
      setListPermissionGroup(responPermissionGroup.permissionGroup);
    }
  };

  const loadCurrentActive = () => {
    if (data) {
      data.forEach((group) => {
        const items = group.items || [];
        const item = items.filter((item) => item.to === currentURL);
        if (item.length > 0) {
          return setActive(item[0].idItem);
        }
      });
    } else {
      return setActive(-1);
    }
  };

  useEffect(() => {
    handleCheckPermission();
    loadCurrentActive();
  }, []);

  const renderListItems = (listItem) => {
    let subItems = [];

    if (listItem && listItem.length > 0) {
      subItems = listItem;
    }

    return (
      <ul className="list-none w-full">
        {subItems &&
          subItems.map((item, index) => {
            let openFeature = false;

            const newArrayPG =
              listPermissionGroup.length > 0 &&
              listPermissionGroup.reduce((filtered, item, index) => {
                const listPermissionOfUser = dataUser && dataUser.permissions;
                const checkPermission =
                  listPermissionOfUser &&
                  listPermissionOfUser.filter((itemPermission) => {
                    return (
                      itemPermission?.Permission?.permissionGroupId === item.id || itemPermission?.permissionGroupId  === item.id
                    );
                  });

                if (checkPermission && checkPermission.length > 0) {
                  filtered.push(item);
                }

                return filtered;
              }, []);

            const checkPermission =
              newArrayPG.length > 0 &&
              newArrayPG.filter(
                (itemPermission) => itemPermission.keyword == item.keyword
              );

            if (checkPermission.length > 0) {
              openFeature = true;
            }

            return (
              <li
                className={clsx(
                  "w-full h-10 leading-10 relative select-none group hover:bg-[#e6f2fe] transition-all duration-300 rounded-lg",
                  {
                    "!bg-[#e6f2fe]": active === item.idItem,
                    "!hidden": item.keyword && openFeature === false,
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

  return (
    <div className={clsx("px-3 h-full overflow-y-scroll scrollbar")}>
      {data &&
        data.map((item, index) => {
          let itemSubmenu = item.items || [];

          const newArrayPG =
            listPermissionGroup.length > 0 &&
            listPermissionGroup.reduce((filtered, item, index) => {
              const listPermissionOfUser = dataUser && dataUser.permissions;

              const checkPermission =
                listPermissionOfUser.length > 0 &&
                listPermissionOfUser.filter((itemPermission) => {
                  return (
                    itemPermission?.Permission?.permissionGroupId === item.id || itemPermission?.permissionGroupId  === item.id
                  );
                });

              if (checkPermission && checkPermission.length > 0) {
                filtered.push(item);
              }

              return filtered;
            }, []);

          let checkShowHeading =
            itemSubmenu.length > 0 &&
            itemSubmenu.filter((itemSubmenu) => {
              if (!itemSubmenu.keyword) {
                return true;
              } else {
                let openFeatures =
                  newArrayPG.length > 0 &&
                  newArrayPG.filter(
                    (itemPermissionGroup) =>
                      itemPermissionGroup.keyword === itemSubmenu.keyword
                  );

                if (openFeatures.length > 0) {
                  return true;
                } else {
                  return false;
                }
              }
            });

          return (
            <Fragment key={index}>
              <h1
                className={clsx("text-lg font-semibold py-2 select-none", {
                  "!hidden": checkShowHeading && checkShowHeading.length <= 0,
                })}
              >
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
