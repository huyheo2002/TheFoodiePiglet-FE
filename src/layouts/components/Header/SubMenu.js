import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { handleLogoutRedux } from "../../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function SubMenu({ data, className }) {
  const { t, i18n } = useTranslation(["header"]);
  const navigate = useNavigate();

  const changeLanguages = (lng = "vi" || "en" ) => {
    i18n.changeLanguage(lng);
  };

  // USER
  const user = useSelector(state => state.user.user);
  const loginErrorRedux = useSelector(state => state.user.isError);
  const dispatch = useDispatch();
  // using when user login success
  const handleLogout = () => {
    dispatch(handleLogoutRedux());
  }

  useEffect(() => {
    if(user && user.auth === false && loginErrorRedux === true) {
      navigate("/login");
    }
  }, [user])

  console.log("data sub item", data);
  return (
    <ul
      className={clsx(
        className,
        "bg-white shadow-black-rb-0.35 flex-col min-w-[14rem] z-50 absolute top-full hidden rounded-b-lg overflow-hidden",
      )}
    >
      {data &&
        data.length > 0 &&
        data.map((item, index) => {
          let getKeyword = item.keyword || "";
          let findTypeLanguages = getKeyword !== "" && getKeyword.includes("languages");
          let getTypeLanguages = "vi";
          if (findTypeLanguages) {
            let convertToArray = getKeyword.split("-");
            getTypeLanguages = convertToArray.length > 0 && convertToArray[convertToArray.length - 1];            
          }

          return (
            <li
              className="min-w-[10rem] h-full leading-[4rem] relative hover:bg-[#ffe2e8] transition-all duration-300 cursor-pointer"
              key={index}
              onClick={() => {
                if (findTypeLanguages) {
                  changeLanguages(getTypeLanguages)
                }
                
                if(item.keyword === "logout") {
                  handleLogout();
                }
                                
              }}
            >
              {item.href && (
                <a
                  href={item.href}
                  className="px-4 inline-block text-black font-semibold hover:text-primary-hover text-[14px] capitalize w-full h-full"
                >
                  {item.keyword && t(`nav-subItem.${item.keyword}`)}
                </a>
              )}
  
              {item.to && (
                <Link
                  to={item.to}
                  className="px-4 inline-block text-black font-semibold hover:text-primary-hover text-[14px] capitalize w-full h-full"
                >
                  {item.keyword && t(`nav-subItem.${item.keyword}`)}
                </Link>
              )}
  
              {!item.href && !item.to && (
                <div className="px-4 inline-block text-black font-semibold hover:text-primary-hover text-[14px] capitalize w-full h-full">
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
