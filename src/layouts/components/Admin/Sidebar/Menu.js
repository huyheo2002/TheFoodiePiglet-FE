import clsx from "clsx";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocalStorage } from "react-use";
import * as commonServices from "../../../../services/commonServices";
import * as permissionServices from "../../../../services/permissionServices";

function Menu({ data }) {
  const { t } = useTranslation(["admin"]);
  const currentURL = window.location.pathname;
  const [active, setActive] = useState(-1);
  const toggleSidebar = useSelector(states => states.admin.toggleSidebar)
  const [listPermissionGroup, setListPermissionGroup] = useState([]);

  const [dataUser, setDataUser] = useLocalStorage("dataUser", "");
  const [dataUserDecoded, setDataUserDecoded] = useState(null);

  const decoded = async () => {
    const respon = await commonServices.handleDecoded(dataUser.token);
    // console.log("respon.decoded", respon)
    if (respon && respon.errCode === 0) {
      setDataUserDecoded(respon.decoded);
    }
  };
  // console.log("dataUserDecoded.permissions", dataUserDecoded && dataUserDecoded.permissions);
  // console.log("dataUserDecoded", dataUserDecoded);

  const handleCheckPermission = async () => {
    const responPermissionGroup = await permissionServices.getAllPermissionGroup();
    if (responPermissionGroup && responPermissionGroup.errCode === 0) {
      setListPermissionGroup(responPermissionGroup.permissionGroup);
      // console.log("dataPermissionGroup", dataPermissionGroup);      
    }
  }

  const loadCurrentActive = () => {
    if (data) {
      data.forEach((group) => {
        // console.log("group", group);
        const items = group.items || [];
        const item = items.filter((item) => item.to === currentURL);
        // console.log("item", item);
        if (item.length > 0) {
          return setActive(item[0].idItem);
        }
      });
    } else {
      return setActive(-1);
    }
  }

  useEffect(() => {
    decoded();
    handleCheckPermission();
    loadCurrentActive();
  }, [])

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
            let openFeature = false;

            const newArrayPG = listPermissionGroup.length > 0 && listPermissionGroup.reduce((filtered, item, index) => {
              const listPermissionOfUser = dataUserDecoded && dataUserDecoded.permissions;
              // console.log("listPermissionOfUser", listPermissionOfUser);
              const checkPermission = listPermissionOfUser && listPermissionOfUser.filter(itemPermission => {
                // console.log("itemPermission.Permission.permissionGroupId", itemPermission.Permission.permissionGroupId);

                return itemPermission.Permission.permissionGroupId === item.id;
              });

              // console.log("checkPermission", checkPermission)
              if (checkPermission && checkPermission.length > 0) {
                filtered.push(item);
              }

              return filtered;
            }, [])

            const checkPermission = newArrayPG.length > 0 && newArrayPG.filter(itemPermission => itemPermission.keyword == item.keyword);

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
          let itemSubmenu  = item.items || [];

          const newArrayPG = listPermissionGroup.length > 0 && listPermissionGroup.reduce((filtered, item, index) => {
            const listPermissionOfUser = dataUserDecoded && dataUserDecoded.permissions;
            
            const checkPermission = listPermissionOfUser && listPermissionOfUser.filter(itemPermission => {
      
              return itemPermission.Permission.permissionGroupId === item.id;
            });
      
            if (checkPermission && checkPermission.length > 0) {
              filtered.push(item);
            }
      
            return filtered;
          }, [])

          let checkShowHeading = itemSubmenu.length > 0 && itemSubmenu.filter(itemSubmenu => {
            if(!itemSubmenu.keyword) {
              return true;
            } else {
              let openFeatures = newArrayPG.length > 0 && newArrayPG.filter(itemPermissionGroup => itemPermissionGroup.keyword === itemSubmenu.keyword);

              if(openFeatures.length > 0) {
                return true;
              } else {
                return false;
              }
            }
          })         

          return (
            <Fragment key={index}>
              <h1 className={clsx("text-lg font-semibold py-2 select-none", {
                "!hidden": checkShowHeading && checkShowHeading.length <= 0,
              })}>
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
