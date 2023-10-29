import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "../../../components/Icons";
import Image from "../../../components/Image";
import logo from "../../../assets/images/Base/logo.jpg";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation(["footer"]);

  return (
    <div className="w-full select-none relative z-[99]">
      {/* footer top social */}
      <div className="bg-[#151515] text-white w-full flex px-16 border-b-2 border-[#1a1a1a]">
        <a className="pr-6 py-3 block">
          <FacebookIcon className="text-[#999] w-8 h-8 text-4xl hover:text-white transition-all" />
        </a>
        <a className="pr-6 py-3 block">
          <InstagramIcon className="text-[#999] w-8 h-8 text-4xl hover:text-white transition-all" />
        </a>
        <a className="pr-6 py-3 block">
          <YoutubeIcon className="text-[#999] w-8 h-8 text-4xl hover:text-white transition-all" />
        </a>
        <a className="pr-6 py-3 block">
          <TwitterIcon className="text-[#999] w-8 h-8 text-4xl hover:text-white transition-all" />
        </a>
      </div>
      <div className="bg-black text-white px-16 w-full h-full pt-6 pb-10 flex">
        <div className="w-1/4">
          <h2 className="font-semibold text-lg mb-3 capitalize">{t("title.introduce")}</h2>
          <ul className="list-none">
            <li className="py-1">
              <a className="text-[#999] hover:text-white cursor-pointer text-sm capitalize">
                {t("subContent.aboutUs")}
              </a>
            </li>
            <li className="py-1">
              <a className="text-[#999] hover:text-white cursor-pointer text-sm capitalize">
                {t("subContent.products")}
              </a>
            </li>
            <li className="py-1">
              <a className="text-[#999] hover:text-white cursor-pointer text-sm capitalize">
                {t("subContent.promotion")}
              </a>
            </li>
            <li className="py-1">
              <a className="text-[#999] hover:text-white cursor-pointer text-sm capitalize">
                {t("subContent.store")}
              </a>
            </li>
          </ul>
        </div>
        <div className="w-1/4">
          <h2 className="font-semibold text-lg mb-3 capitalize">{t("title.rules")}</h2>
          <ul className="list-none">
            <li className="py-1">
              <a className="text-[#999] hover:text-white cursor-pointer text-sm capitalize">
                {t("subContent.termOfUse")}
              </a>
            </li>
            <li className="py-1">
              <a className="text-[#999] hover:text-white cursor-pointer text-sm capitalize">
                {t("subContent.infoPrivate")}
              </a>
            </li>
          </ul>
        </div>
        <div className="w-1/4">
          <h2 className="font-semibold text-lg mb-3 capitalize">{t("title.order")}</h2>
          <ul className="list-none">
            <li className="py-1">
              <a className="text-[#999] hover:text-white cursor-pointer text-sm capitalize">
                {t("subContent.botchat")}
              </a>
            </li>
            <li className="py-1">
              <a className="text-[#999] hover:text-white cursor-pointer text-sm capitalize">
                {t("subContent.orderHome")}
              </a>
            </li>
          </ul>
          <h2 className="font-semibold text-lg my-3">{t("title.contact")}</h2>
          <ul className="list-none">
            <li className="py-1">
              <a className="text-[#999] hover:text-white cursor-pointer text-sm capitalize">
                {t("subContent.hotline")}: 1506 2002{" "}
              </a>
            </li>
            <li className="py-1">
              <a className="text-[#999] hover:text-white cursor-pointer text-sm">
                {t("subContent.email")}: huy12@support.com
              </a>
            </li>
          </ul>
        </div>
        <div className="w-1/4 flex items-center justify-center">
          <Image src={logo} />
          {/* <Image src={"https://scontent.fhan14-1.fna.fbcdn.net/v/t1.15752-9/368426111_259349003674501_1649132107272678005_n.png?_nc_cat=105&ccb=1-7&_nc_sid=ae9488&_nc_ohc=JR3EoCaRzloAX-fzIEn&_nc_ht=scontent.fhan14-1.fna&oh=03_AdS8O9UYzIMs_bxovxTcIB_Mu6PPTwmFXKjGSkqN3-DojQ&oe=65103B1E"} className="w-full"/>           */}
        </div>
      </div>
    </div>
  );
}

export default Footer;
