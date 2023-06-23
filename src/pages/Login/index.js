import Button from "../../components/Button";
import Form from "../../components/Form";
import Heading from "../../components/Heading";
import overlay from "../../assets/images/Base/bg-news2-homepage.jfif";
import Image from "../../components/Image";
import logoFacebook from "../../assets/images/Base/logo-facebook.png";
import logoGoogle from "../../assets/images/Base/logo-google.png";
import logoTwitter from "../../assets/images/Base/logo-twitter.png";
import logoIos from "../../assets/images/Base/logo-ios.png";
import InputField from "../../components/FormControl/InputField";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Login() {
  const { t } = useTranslation(["auth"]);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  // console.log("auth user", t("login.input.nameUsername"))

  const inputs = [
    {
      id: 1,
      name: t("login.input.nameUsername"),
      type: "text",
      placeholder: t("login.input.labelUsername"),
      label: t("login.input.labelUsername"),
      errorMessage: t("login.input.errMsgUsername"),
      pattern: "[A-Za-z0-9_]{3,20}",
      required: true,
    },
    {
      id: 2,
      name: t("login.input.namePassword"),
      type: "password",
      placeholder: t("login.input.labelPassword"),
      label: t("login.input.labelPassword"),
      errorMessage: t("login.input.errMsgPassword"),
      pattern: "[A-Za-z0-9_]{3,20}",
      required: true,
    },
  ];

  const onChangeInput = (e) => {
    // e.target.name lấy key trong obj
    // e.target.value lấy giá trị trong obj
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center w-full h-[100vh] relative">
      <div className="w-1/3 absolute z-20">
        <Form custom>
          <Heading className={"!text-black capitalize font-semibold"}>
            {t("login.heading")}
          </Heading>
          {/* form control */}
          <div className="px-4 py-2">
            {inputs.map((item, index) => {
              return (
                <InputField
                  key={index}
                  value={values[item.name]}
                  onChange={onChangeInput}
                  {...item}
                />
              );
            })}
          </div>
          <div className="flex justify-end">
            <Button viewMore onClick={() => navigate(-1)}>{t("login.button.back")}</Button>
            <Button viewMore>{t("login.button.login")}</Button>
          </div>
          <div className="flex justify-between px-3 py-2">
            <a className="text-[#d3bc8e] font-normal text-base capitalize cursor-pointer hover:text-[#c29e56] transition-all">
              {t("login.other.support")}
            </a>
            <a className="text-[#d3bc8e] font-normal text-base capitalize cursor-pointer hover:text-[#c29e56] transition-all">
              {t("login.other.register")}
            </a>
          </div>
          {/* separate */}
          <div
            className="text-gray-400 flex font-medium text-sm select-none
            before:content-[''] before:border-t-[1px] before:border-t-gray-400 before:grow before:self-center before:mr-2
            after:content-[''] after:border-t-[1px] after:border-t-gray-400 after:grow after:self-center after:ml-2
          "
          >
            {t("login.other.separate")}
          </div>
          {/* social */}
          <div className="flex justify-center mt-3">
            <Image
              src={logoGoogle}
              className="w-[40px] h-[40px] mx-2 my-3 cursor-pointer rounded-full"
            />
            <Image
              src={logoFacebook}
              className="w-[40px] h-[40px] mx-2 my-3 cursor-pointer rounded-full"
            />
            <Image
              src={logoIos}
              className="w-[40px] h-[40px] mx-2 my-3 cursor-pointer rounded-full"
            />
            <Image
              src={logoTwitter}
              className="w-[40px] h-[40px] mx-2 my-3 cursor-pointer rounded-full"
            />
          </div>
        </Form>
      </div>

      {/* overlay */}
      <div
        className="absolute z-10 inset-0"
        style={{
          background: `url(${overlay}) center/cover no-repeat`,
        }}
      >
        <div className="bg-rgba-black-0.50 absolute inset-0"></div>
      </div>
    </div>
  );
}

export default Login;
