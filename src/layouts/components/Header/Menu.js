import { Link } from "react-router-dom";
import SubMenu from "./SubMenu";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Fragment } from "react";

function Menu({ data, userLogin }) {
  const { t, i18n } = useTranslation(["header"]);
  // const currentLanguage = i18n.language;
  // console.log("currentLanguage", currentLanguage)

  return (
    <ul className="flex items-center h-full px-6">
      {data &&
        data.length > 0 &&
        data.map((item, index) => {
          if (item.keyword === "login") {
            console.log("userLogin", userLogin);
          }
          return (
            <li className="h-full leading-[4rem] relative group" key={index}>
              {item.href && (
                <Fragment>
                  {userLogin &&
                  userLogin.auth === true &&
                  item.keyword === "login" ? (
                    <a
                      className="h-full px-3 inline-flex items-center text-primary font-semibold uppercase text-sm group-hover:text-white transition-all duration-300"
                    >
                      {!item.onlyShowIcon ? (
                        <Fragment>
                          {t(`userLogin.msgWelcome`) + `, ${userLogin.username}`}
                          {item.icon && (
                            <span className="text-current ml-2">
                              {item.icon}
                            </span>
                          )}
                        </Fragment>
                      ) : (
                        <Fragment>
                          {item.icon && (
                            <span className="text-current ml-2">
                              {item.icon}
                            </span>
                          )}
                        </Fragment>
                      )}
                    </a>
                  ) : (
                    <a
                      href={item.href}
                      className="h-full px-3 inline-flex items-center text-primary font-semibold uppercase text-sm group-hover:text-white transition-all duration-300"
                    >
                      {!item.onlyShowIcon ? (
                        <Fragment>
                          {item.keyword && t(`nav-item.${item.keyword}`)}
                          {item.icon && (
                            <span className="text-current ml-2">
                              {item.icon}
                            </span>
                          )}
                        </Fragment>
                      ) : (
                        <Fragment>
                          {item.icon && (
                            <span className="text-current ml-2">
                              {item.icon}
                            </span>
                          )}
                        </Fragment>
                      )}
                    </a>
                  )}
                </Fragment>                
              )}
              {item.to && (
                <Fragment>
                  {userLogin &&
                  userLogin.auth === true &&
                  item.keyword === "login" ? (
                    <Link className="h-full px-3 inline-flex items-center text-primary font-semibold uppercase text-sm group-hover:text-white transition-all duration-300">
                      {!item.onlyShowIcon ? (
                        <Fragment>
                          {t(`userLogin.msgWelcome`) + `, ${userLogin.username}`}
                          {item.icon && (
                            <span className="text-current ml-2">
                              {item.icon}
                            </span>
                          )}
                        </Fragment>
                      ) : (
                        <Fragment>
                          {item.icon && (
                            <span className="text-current ml-2">
                              {item.icon}
                            </span>
                          )}
                        </Fragment>
                      )}
                    </Link>
                  ) : (
                    <Link
                      to={item.to}
                      className="h-full px-3 inline-flex items-center text-primary font-semibold uppercase text-sm group-hover:text-white transition-all duration-300"
                    >
                      {!item.onlyShowIcon ? (
                        <Fragment>
                          {item.keyword && t(`nav-item.${item.keyword}`)}
                          {item.icon && (
                            <span className="text-current ml-2">
                              {item.icon}
                            </span>
                          )}
                        </Fragment>
                      ) : (
                        <Fragment>
                          {item.icon && (
                            <span className="text-current ml-2">
                              {item.icon}
                            </span>
                          )}
                        </Fragment>
                      )}
                    </Link>
                  )}
                </Fragment>
              )}
              {!item.href && !item.to && (
                <Fragment>
                  <div className="h-full px-3 inline-flex items-center text-primary font-semibold uppercase text-sm group-hover:text-white transition-all duration-300">
                    {!item.onlyShowIcon ? (
                      <Fragment>
                        {item.keyword && t(`nav-item.${item.keyword}`)}
                        {item.icon && (
                          <span className="text-current ml-2">{item.icon}</span>
                        )}
                      </Fragment>
                    ) : (
                      <Fragment>
                        {item.icon && (
                          <span className="text-current ml-2">{item.icon}</span>
                        )}
                      </Fragment>
                    )}
                  </div>

                  {/* <div> no to no href</div> */}
                </Fragment>
              )}
              {item.subNav && userLogin && userLogin.auth === true && item.keyword === "login" && (
                <SubMenu data={item.subNav} className="group-hover:flex" />
              )}

              {item.subNav && item.keyword !== "login" && (
                <SubMenu data={item.subNav} className="group-hover:flex" />
              )}
            </li>
          );
        })}
    </ul>
  );
}

export default Menu;
