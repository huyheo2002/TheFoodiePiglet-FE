import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import InputField from "../../components/FormControl/InputField";
import Heading from "../../components/Heading";
import { useDispatch } from "react-redux";
import { handleNoLoginRedux } from "../../redux/actions/userAction";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import * as userServices from "../../services/userServices";
import { TBUTTON_VARIANT } from "../../types/button";
import toast from "react-hot-toast";
import intro1 from "../../assets/images/introduce/intro-3.jpg";

function Register() {
  const { t } = useTranslation(["auth"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: t("login.input.labelUsername"),
      label: t("login.input.labelUsername"),
      errorMessage: t("login.input.errMsgUsername"),
      pattern: "[A-Za-z0-9]{3,}",
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
    {
      id: 3,
      name: "confirmPassword",
      type: "password",
      placeholder: t("login.input.labelConfirmPassword"),
      label: t("login.input.labelPassword"),
      errorMessage: t("login.input.errMsgConfirmPassword"),
      pattern: "[A-Za-z0-9]{3,}",
      required: true,
    },
  ];

  const onChangeInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const inputClear = (getKey) => {
    setValues({ ...values, [getKey]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    if (values.password !== values.confirmPassword) {
      toast.error("Password is not matching, please try again");
      setValues({
        username: "",
        password: "",
        confirmPassword: "",
      });
      return;
    }

    try {
      const response = await userServices.handleCreateUser(data);
      if (response && response.errCode === 0) {
        toast.success("Register successfully, currently you has login now");
        setValues({
          username: "",
          password: "",
          confirmPassword: "",
        });
      } else if (response.errCode === 1) {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBackHome = () => {
    dispatch(handleNoLoginRedux());
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center w-full h-[100vh] relative bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('${intro1}')`,
      }}
    >
      <div className="w-1/3 absolute z-20">
        <form
          autoComplete="off"
          className="flex justify-between flex-col w-full min-h-fit max-h-[calc(100vh-64px)] px-4 py-3 rounded-lg bg-white shadow-black-b-0.75 relative"
          onSubmit={handleSubmit}
        >
          {/* <img src={logo} className="h-20 h-20 absolute z-20 top-0 right-0 hidden xl:block"/> */}
          <div className="w-full h-full">
            <Heading variant={"modal"}>{t("login.heading.register")}</Heading>
            <div className="px-4 py-2">
              {inputs.map((item, index) => {
                return (
                  <InputField
                    key={index}
                    value={values[item.name]}
                    onChange={onChangeInput}
                    onClick={() => {}}
                    clear={() => inputClear(item.name)}
                    {...item}
                  />
                );
              })}
            </div>
            <div className="flex justify-end">
              <Button variant={TBUTTON_VARIANT.PRIMARY}>
                {t("login.button.register")}
              </Button>
              <Button
                to={"/"}
                variant={TBUTTON_VARIANT.PRIMARY}
                onClick={() => handleBackHome()}
              >
                {t("login.button.back")}
              </Button>
            </div>
            <div className="flex justify-center items-center px-3 py-2">
              <p className="font-normal text-base mr-2">
                Already have an account?
              </p>
              <Link
                className="text-black font-semibold text-lg capitalize cursor-pointer hover:text-primary-hover transition-all"
                to={"/login"}
              >
                Log in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
