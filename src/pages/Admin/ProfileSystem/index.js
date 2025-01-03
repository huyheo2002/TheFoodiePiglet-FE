import { Fragment, useEffect, useState } from "react";
import Button from "../../../components/Button";
import Heading from "../../../components/Heading";
import Image from "../../../components/Image";
import Modal from "../../../components/Modal";
import * as userServices from "../../../services/userServices";
import InputField from "../../../components/FormControl/InputField";
import InputFile from "../../../components/FormControl/inputFile";
import InputRadio from "../../../components/FormControl/inputRadio";
import * as authServices from "../../../services/authServices";
import { TBUTTON_VARIANT } from "../../../types/button";
import { useAuth } from "../../../contexts/authContext";
import toast from "react-hot-toast";

function ProfileSystem() {
  const { dataUser } = useAuth();
  const [image, setImage] = useState("");
  const [gender, setGender] = useState(-1);
  const [valuesUpdate, setValuesUpdate] = useState({});
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [listUsersDetail, setListUsersDetail] = useState([]);
  const [openModalChangePassword, setOpenModalChangePassword] = useState(false);
  const [valuesChangePassword, setValuesChangePassword] = useState({});

  const inputs = [
    {
      id: 2,
      name: "username",
      type: "text",
      placeholder: "Enter your username",
      label: "username",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      label: "password",
      required: true,
    },
    {
      id: 4,
      name: "email",
      type: "text",
      placeholder: "Enter your email",
      label: "Email",
      // required: true,
    },
    {
      id: 5,
      name: "name",
      type: "text",
      placeholder: "Enter your name",
      label: "Name",
      // required: true,
    },
    {
      id: 6,
      name: "phone",
      type: "text",
      placeholder: "Enter your phone",
      label: "phone",
      // required: true,
    },
    {
      id: 7,
      name: "address",
      type: "text",
      placeholder: "Enter your address",
      label: "address",
      // required: true,
    },
    {
      id: 8,
      name: "gender",
      type: "radio",
      label: "gender",
      required: true,
    },
    {
      id: 12,
      name: "avatar",
      type: "file",
      placeholder: "Enter your avatar",
      label: "avatar",
      accept: "image/png, image/jpeg, image/gif, image/jpg",
    },
  ];

  const inputsChangePassword = [
    {
      id: 1,
      name: "oldPassword",
      type: "password",
      placeholder: "Enter your password",
      label: "Old Pasword",
      errorMessage: "Invalid password please check again",
      pattern: "[A-Za-z0-9]{3,}",
      required: true,
    },
    {
      id: 2,
      name: "newPassword",
      type: "password",
      placeholder: "Enter your password",
      label: "New Pasword",
      errorMessage: "Invalid password please check again",
      pattern: "[A-Za-z0-9]{3,}",
      required: true,
    },
    {
      id: 3,
      name: "confirmPassword",
      type: "password",
      placeholder: "Enter your password",
      label: "Confirm New Password",
      errorMessage: "Invalid password please check again",
      pattern: "[A-Za-z0-9]{3,}",
      required: true,
    },
  ];

  // handle preview image
  const handlePreviewImage = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setImage(file);
  };

  useEffect(() => {
    return () => {
      image && URL.revokeObjectURL(image.preview);
    };
  }, [image]);

  const handleOpenModalUpdate = (id) => {
    setOpenModalUpdate(true);
    let filterUser =
      listUsersDetail.length > 0 &&
      listUsersDetail.filter((item) => item.id === id);

    if (filterUser) {
      filterUser = filterUser.map((user) => {
        const sanitizedUser = {};
        for (const key in user) {
          if (user[key] === null || user[key] === undefined) {
            sanitizedUser[key] = "";
          } else {
            sanitizedUser[key] = user[key];
          }
        }
        return sanitizedUser;
      });
    }

    if (listUsersDetail.length > 0) {
      let dataUserUpdate = { ...filterUser[0], ["password"]: "123" };
      setValuesUpdate(dataUserUpdate);
    }
  };

  const handleCloseModalUpdate = () => {
    setOpenModalUpdate(false);
    setGender(-1);
    setImage("");
  };

  const onChangeInputUpdate = (e) => {
    setValuesUpdate({ ...valuesUpdate, [e.target.name]: e.target.value });
  };

  const inputUpdateClear = (getKey) => {
    setValuesUpdate({ ...valuesUpdate, [getKey]: "" });
  };

  const onChangeInputChangePassword = (e) => {
    setValuesChangePassword({
      ...valuesChangePassword,
      [e.target.name]: e.target.value,
    });
  };

  const inputChangePasswordClear = (getKey) => {
    setValuesChangePassword({ ...valuesChangePassword, [getKey]: "" });
  };

  const onhandleSubmitUpdateUser = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    if (valuesUpdate) {
      data.set("id", valuesUpdate.id);
    }

    try {
      const response = await userServices.handleUpdateUser(data);
      if (response && response.errCode === 0) {
        dataUser.user = response.user;
        handleCloseModalUpdate();
        handleGetAllUsers();
      } else if (response.errCode === 1) {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // handle get api users full
  const handleGetAllUsers = async () => {
    const res = await userServices.getAllUsers("all");
    if (res && res.errCode === 0 && res.users) {
      const dataListUsers = res.users || [];
      if (dataListUsers) {
        setListUsersDetail(dataListUsers);
      }
    }
  };

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  const handleGetValueGender = (currentValue) => {
    setGender(currentValue);
  };

  const handleCloseModalChangePassword = () => {
    setOpenModalChangePassword(false);
    setValuesChangePassword({});
  };

  const onhandleSubmitChangePassword = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    data.set("id", dataUser.user.id);

    try {
      const response = await authServices.handleChangePassword(data);

      if (response && response.errCode === 0) {
        handleCloseModalChangePassword();
        toast.success("Change password successfully");
      } else if (response && response.errCode !== 0) {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <div className="container mx-auto p-4">
        <div className="rounded-lg py-4">
          <div className="flex">
            <div className="w-1/3 p-4">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-center">
                  <Image
                    src={
                      dataUser
                        ? dataUser.user.avatar !== null
                          ? dataUser.user.avatar
                          : ""
                        : ""
                    }
                    className="w-56 h-auto rounded-full mx-auto mb-4"
                  />
                  <h1 className="text-2xl font-bold">
                    {dataUser
                      ? dataUser.user.name || dataUser.user.username
                      : ""}
                  </h1>
                  <p className="text-gray-600 font-semibold text-lg">
                    {dataUser ? dataUser.user.roleName : ""}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-2/3 p-4">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <Heading variant={"primary"}>Personal Information</Heading>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <p className="text-gray-600 font-semibold text-lg mr-3">
                      Username:{" "}
                    </p>
                    <p>{dataUser ? dataUser.user.username : ""}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-gray-600 font-semibold text-lg mr-3">
                      Email:{" "}
                    </p>
                    <p>{dataUser ? dataUser.user.email : ""}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-gray-600 font-semibold text-lg mr-3">
                      Phone:{" "}
                    </p>
                    <p>{dataUser ? dataUser.user.phone : ""}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-gray-600 font-semibold text-lg mr-3">
                      Address:{" "}
                    </p>
                    <p>{dataUser ? dataUser.user.address : ""}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-gray-600 font-semibold text-lg mr-3">
                      Gender:{" "}
                    </p>
                    <p>
                      {dataUser
                        ? dataUser.user.gender === true
                          ? "Male"
                          : "Female"
                        : ""}
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <Button
                    variant={TBUTTON_VARIANT.PRIMARY}
                    onClick={() => setOpenModalChangePassword(true)}
                  >
                    Change Password
                  </Button>
                  <Button
                    variant={TBUTTON_VARIANT.PRIMARY}
                    onClick={() => handleOpenModalUpdate(dataUser.user.id)}
                  >
                    Edit Personal Info
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* change infomation */}
      {openModalUpdate && (
        <Modal open={openModalUpdate} close={handleCloseModalUpdate}>
          <form autoComplete="off" onSubmit={onhandleSubmitUpdateUser}>
            <Heading variant={"primary"}>Update user</Heading>
            <div className="">
              {inputs.map((item, index) => {
                const optionsGender = [
                  { value: "1", label: "Male" },
                  { value: "0", label: "Female" },
                ];

                let genderChecked = null;
                if (valuesUpdate) {
                  if (valuesUpdate.gender === true) {
                    genderChecked = 1;
                  } else {
                    genderChecked = 0;
                  }
                }

                if (item.type === "password") {
                  return (
                    <InputField
                      key={index}
                      onChange={() => {}}
                      hidden={"true"}
                    />
                  );
                }

                if (item.type === "file") {
                  return (
                    <InputFile
                      key={index}
                      onChange={handlePreviewImage}
                      imagePreview={image.preview ?? valuesUpdate[item.name]}
                      {...item}
                    />
                  );
                }

                if (item.type === "radio" && item.name === "gender") {
                  return (
                    <InputRadio
                      key={index}
                      options={optionsGender}
                      checked={gender !== -1 ? gender : genderChecked}
                      onChange={handleGetValueGender}
                      edit
                      {...item}
                      id={Math.floor(Math.random() * 10)}
                    />
                  );
                }

                return (
                  <InputField
                    key={index}
                    onChange={onChangeInputUpdate}
                    value={valuesUpdate[item.name]}
                    clear={() => inputUpdateClear(item.name)}
                    onClick={() => {}}
                    {...item}
                  />
                );
              })}
            </div>
            {/* footer */}
            <div className="flex justify-end">
              <Button variant={TBUTTON_VARIANT.PRIMARY}>Submit</Button>
              <Button
                variant={TBUTTON_VARIANT.PRIMARY}
                onClick={handleCloseModalUpdate}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* change password */}
      <Modal
        open={openModalChangePassword}
        close={handleCloseModalChangePassword}
      >
        <form autoComplete="off" onSubmit={onhandleSubmitChangePassword}>
          <Heading variant={"primary"}>Change Password</Heading>
          <div className="">
            {inputsChangePassword.map((item, index) => {
              return (
                <InputField
                  key={index}
                  onChange={onChangeInputChangePassword}
                  value={valuesChangePassword[item.name]}
                  clear={() => inputChangePasswordClear(item.name)}
                  onClick={() => {}}
                  {...item}
                />
              );
            })}
          </div>
          {/* footer */}
          <div className="flex justify-end">
            <Button variant={TBUTTON_VARIANT.PRIMARY}>Submit</Button>
            <Button
              variant={TBUTTON_VARIANT.PRIMARY}
              onClick={handleCloseModalChangePassword}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </Fragment>
  );
}

export default ProfileSystem;
