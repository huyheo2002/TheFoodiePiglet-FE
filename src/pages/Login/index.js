import Button from "../../components/Button";
import Heading from "../../components/Heading";
import Image from "../../components/Image";
import logoFacebook from "../../assets/images/Base/logo-facebook.png";
import logoGoogle from "../../assets/images/Base/logo-google.png";
import logoTwitter from "../../assets/images/Base/logo-twitter.png";
import logoIos from "../../assets/images/Base/logo-ios.png";
import InputField from "../../components/FormControl/InputField";
import { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import {
  handleLoginRedux,
  handleNoLoginRedux,
} from "../../redux/actions/userAction";
import useLocalStorage from "../../hooks/useLocalStorage";
import { LoadingIcon } from "../../components/Icons";
import * as commonServices from "../../services/commonServices";
import Modal from "../../components/Modal";
import * as authServices from "../../services/authServices";

function Login() {
  const { t } = useTranslation(["auth"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: t("login.input.labelUsername"),
      label: t("login.input.labelUsername"),
      errorMessage: t("login.input.errMsgUsername"),
      // pattern: "[A-Za-z0-9]{3,}",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: t("login.input.labelPassword"),
      label: t("login.input.labelPassword"),
      errorMessage: t("login.input.errMsgPassword"),
      pattern: "[A-Za-z0-9]{3,}",
      required: true,
    },
  ];

  const user = useSelector((state) => state.user);
  // console.log("state user login in login Pages", user)
  const isLoading = useSelector((state) => state.user.isLoading);
  const dataUserRedux = useSelector((state) => state.user.user);
  const isError = useSelector((state) => state.user.isError);
  // console.log("isError", isError);
  // console.log("dataUserRedux", dataUserRedux)
  const [checkError, setCheckError] = useState(false);

  const [valueLocal, setValueLocal] = useLocalStorage("dataUser", "");

  // forgot password 
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [valueEmailFP, setValueEmailFP] = useState("");
  const [valueUsernameFP, setValueUsernameFP] = useState("");
  const [openModalSendRequest, setOpenModalSendRequest] = useState(false);

  const onChangeInput = (e) => {
    // e.target.name lấy key trong obj
    // e.target.value lấy giá trị trong obj
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const inputClear = (getKey) => {
    setValues({ ...values, [getKey]: "" });
  };

  const lockFeatures = useSelector((state) => state.user.isLockFeatures);
  // console.log("lockFeatures home", lockFeatures);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(handleLoginRedux(values.username, values.password));
  };

  const handleBackHome = () => {
    dispatch(handleNoLoginRedux());
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isError) {
        setCheckError(true);
      }

      if (dataUserRedux && dataUserRedux.token && dataUserRedux.auth === true) {
        setValueLocal(dataUserRedux);

        const respon = await commonServices.handleDecoded(dataUserRedux.token);
        console.log("respon.decoded login", respon);
        if (respon && respon.errCode === 0) {
          if (respon.decoded.user.roleName === "User") {
            navigate("/");
          } else {
            navigate("/system");
          }
        }
      }
    };

    fetchData();
  }, [dataUserRedux])

  // LOGIN GOOGLE
  const handleLoginGoogle = async () => {
    window.open(`${process.env.REACT_APP_BACKEND_URL}/api/auth/google`, "_self")
  }

  // handle forgot password
  const handleCloseModalForgotPassword = () => {
    setIsForgotPassword(false);
    inputClearFP();
    inputClearUsernameFP();
  }

  const onChangeInputFP = (e) => {
    setValueEmailFP(e.target.value);
  };

  const inputClearFP = () => {
    setValueEmailFP("");
  };

  const onChangeInputUsernameFP = (e) => {
    setValueUsernameFP(e.target.value);
  };

  const inputClearUsernameFP = () => {
    setValueUsernameFP("");
  };

  const onSubmitForgotPassword = async (e) => {
    e.preventDefault();
    if (!valueEmailFP || !valueUsernameFP) {
      alert("Vui lòng nhập đầy đủ các trường thông tin");
      return;
    }

    const data = new FormData(e.target);
    console.log("data entry:", Object.fromEntries(data.entries()));
    try {
      const respon = await authServices.handleFotgotPassword(data);
      if (respon && respon.errCode === 0) {
        console.log("respon FP", respon);
        handleCloseModalForgotPassword();
        setOpenModalSendRequest(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleCloseModalSendRequest = () => {
    setOpenModalSendRequest(false);
  }

  return (
    <Fragment>
      <div className="flex justify-center items-center w-full h-[100vh] relative">
        <div className="w-1/3 absolute z-20">
          <form
            autoComplete="off"
            className="flex justify-between flex-col w-full min-h-fit max-h-[calc(100vh-64px)] px-4 py-3 rounded-lg bg-white shadow-black-b-0.75"
            onSubmit={handleSubmit}
          >
            <div className="w-full h-full">
              <Heading variant={"modal"}>
                {t("login.heading.login")}
              </Heading>
              {/* form control */}
              <div className="px-4 py-2">
                {inputs.map((item, index) => {
                  return (
                    <InputField
                      key={index}
                      value={values[item.name]}
                      onChange={onChangeInput}
                      onClick={() => {
                        setCheckError(false);
                      }}
                      clear={() => inputClear(item.name)}
                      {...item}
                    />
                  );
                })}
                <span
                  className={clsx("text-sm text-red-500 hidden", {
                    "!inline-block": isError && checkError,
                  })}
                >
                  {isError && checkError && t("login.message.loginFail")}
                </span>
              </div>
              <div className="flex justify-end">
                <Button
                  variant={"primary"}
                  // clone :V
                  iconRight={<LoadingIcon className="opacity-0" />}
                  iconLeft={
                    <LoadingIcon
                      className={clsx(
                        "text-white text-base mr-1 animate-spin opacity-0",
                        {
                          "!opacity-100": isLoading,
                        }
                      )}
                    />
                  }
                >
                  {t("login.button.login")}
                </Button>
                <Button to={"/"} variant={"primary"} onClick={() => handleBackHome()}>
                  {t("login.button.back")}
                </Button>
              </div>
              <div className="flex justify-between px-3 py-2">
                <a className="text-primary font-normal text-base capitalize cursor-pointer hover:text-primary-hover transition-all"
                  onClick={() => setIsForgotPassword(true)}
                >
                  {t("login.other.support")}
                </a>
                <Link className="text-primary font-normal text-base capitalize cursor-pointer hover:text-primary-hover transition-all"
                  to={"/register"}
                >
                  {t("login.other.register")}
                </Link>
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
                  onClick={handleLoginGoogle}
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
            </div>
          </form>
        </div>
      </div>

      {/* modal forgot password */}
      <Modal open={isForgotPassword} close={handleCloseModalForgotPassword}>
        <form autoComplete="off" onSubmit={onSubmitForgotPassword}>
          <Heading variant={"primary"}>Forgot Password</Heading>
          <div className="my-3 mx-2">
            <InputField
              name="username"
              type="text"
              placeholder={t("login.input.labelUsername")}
              label={t("login.input.labelUsername")}
              errorMessage={t("login.input.errMsgUsername")}
              // pattern="/^(?=.{3,}$)(?:(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)|^[a-z]+)$/"
              onChange={onChangeInputUsernameFP}
              clear={inputClearUsernameFP}
              value={valueUsernameFP}
              required={true}
            />

            <InputField
              label="Email"
              type="text"
              placeholder="Enter your email"
              name="email"
              onChange={onChangeInputFP}
              clear={inputClearFP}
              value={valueEmailFP}
              required={true}
              errorMessage="Email không hợp lệ"
              pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
            />
          </div>
          {/* footer */}
          <div className="flex justify-end">
            <Button variant={"primary"}>Submit</Button>
            <Button variant={"primary"} onClick={handleCloseModalForgotPassword}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* modal send req forgot password success */}
      <Modal open={openModalSendRequest} close={handleCloseModalSendRequest}>
        <Heading variant={"primary"}>Password Reset</Heading>
        <div className="mt-4 mx-auto">
          <p className="text-base font-medium text-gray-600 text-center">
            Yêu cầu đổi mật khẩu của bạn đã được gửi thành công!
          </p>
          <p className="text-base font-medium text-gray-600 text-center">
            Vui lòng kiểm tra email của bạn.
          </p>
        </div>

        <div className="flex justify-end">
          <Button variant={"primary"} onClick={handleCloseModalSendRequest}>
            Cancel
          </Button>
        </div>
      </Modal>
    </Fragment>
  );
}

export default Login;
