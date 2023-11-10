import { Fragment, useEffect, useState } from "react";
import Button from "../../../components/Button";
import Heading from "../../../components/Heading";
import Image from "../../../components/Image";
import useLocalStorage from "../../../hooks/useLocalStorage";
import * as commonServices from "../../../services/commonServices";
import Modal from "../../../components/Modal";
import * as userServices from "../../../services/userServices";
import InputField from "../../../components/FormControl/InputField";
import InputFile from "../../../components/FormControl/inputFile";
import InputRadio from "../../../components/FormControl/inputRadio";
import * as authServices from "../../../services/authServices";

function ProfileSystem() {
    const [valueLocal, setValueLocal] = useLocalStorage("dataUser", "");
    const [dataUserDecoded, setDataUserDecoded] = useState(null);
    const [image, setImage] = useState("");
    const [gender, setGender] = useState(-1);
    const [valuesUpdate, setValuesUpdate] = useState({});
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [listUsersDetail, setListUsersDetail] = useState([]);
    const [openModalChangePassword, setOpenModalChangePassword] = useState(false);
    const [valuesChangePassword, setValuesChangePassword] = useState({});

    // decoded and handle permission
    const decoded = async () => {
        if (valueLocal) {
            const respon = await commonServices.handleDecoded(valueLocal.token);
            // console.log("respon.decoded", respon)
            if (respon && respon.errCode === 0) {
                setDataUserDecoded(respon.decoded);
            }
        }
    };

    useEffect(() => {
        decoded();
    }, [])

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
        // console.log(URL.createObjectURL(file))
        // tự thêm attribute
        file.preview = URL.createObjectURL(file);
        setImage(file);
    };

    useEffect(() => {
        // cleanup
        return () => {
            // xóa ảnh cũ
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
                        sanitizedUser[key] = '';
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
        setValuesChangePassword({ ...valuesChangePassword, [e.target.name]: e.target.value });
    };

    const inputChangePasswordClear = (getKey) => {
        setValuesChangePassword({ ...valuesChangePassword, [getKey]: "" });
    };

    const onhandleSubmitUpdateUser = async (e) => {
        e.preventDefault();

        const data = new FormData(e.target);
        if (valuesUpdate) {
            data.set("id", valuesUpdate.id)
        }

        console.log("data entry:", Object.fromEntries(data.entries()));
        try {
            const respon = await userServices.handleUpdateUser(data);
            // console.log("respon", respon);
            if (respon && respon.errCode === 0) {
                dataUserDecoded.user = respon.user;
                setValueLocal(dataUserDecoded);
                handleCloseModalUpdate();
                handleGetAllUsers();
            } else if (respon.errCode === 1) {
                alert(respon.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // handle get api users full
    const handleGetAllUsers = async () => {
        const res = await userServices.getAllUsers("all");
        if (res && res.errCode === 0 && res.users) {
            const dataListUsers = res.users || [];
            // show full info
            if (dataListUsers) {
                setListUsersDetail(dataListUsers);
            }
        }
    };

    useEffect(() => {
        handleGetAllUsers();
    }, [])

    const handleGetValueGender = (currentValue) => {
        setGender(currentValue);
    };

    const handleCloseModalChangePassword = () => {
        setOpenModalChangePassword(false);
        setValuesChangePassword({});
    }

    const onhandleSubmitChangePassword = async (e) => {
        e.preventDefault();

        const data = new FormData(e.target);
        data.set("id", dataUserDecoded.user.id)        

        try {
            const respon = await authServices.handleChangePassword(data);

            if (respon && respon.errCode === 0) {
                handleCloseModalChangePassword();           
                alert("Đổi mật khẩu thành công");     
            } else if (respon && respon.errCode !== 0) {
                alert(respon.message);
            }
        } catch (error) {
            console.log(error);
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
                                    <Image src={dataUserDecoded ? dataUserDecoded.user.avatar !== null ? dataUserDecoded.user.avatar : "" : ""} className="w-56 h-auto rounded-full mx-auto mb-4" />
                                    <h1 className="text-2xl font-bold">{dataUserDecoded ? dataUserDecoded.user.name || dataUserDecoded.user.username : ""}</h1>
                                    <p className="text-gray-600 font-semibold text-lg">{dataUserDecoded ? dataUserDecoded.user.roleName : ""}</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-2/3 p-4">
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <Heading variant={"primary"}>Personal Information</Heading>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center">
                                        <p className="text-gray-600 font-semibold text-lg mr-3">Username: </p>
                                        <p>{dataUserDecoded ? dataUserDecoded.user.username : ""}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <p className="text-gray-600 font-semibold text-lg mr-3">Email: </p>
                                        <p>{dataUserDecoded ? dataUserDecoded.user.email : ""}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <p className="text-gray-600 font-semibold text-lg mr-3">Phone: </p>
                                        <p>{dataUserDecoded ? dataUserDecoded.user.phone : ""}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <p className="text-gray-600 font-semibold text-lg mr-3">Address: </p>
                                        <p>{dataUserDecoded ? dataUserDecoded.user.address : ""}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <p className="text-gray-600 font-semibold text-lg mr-3">Gender: </p>
                                        <p>{dataUserDecoded ? dataUserDecoded.user.gender === true ? "Male" : "Female" : ""}</p>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <Button variant={"primary"}
                                        onClick={() => setOpenModalChangePassword(true)}
                                    >Change Password</Button>
                                    <Button variant={"primary"}
                                        onClick={() => handleOpenModalUpdate(dataUserDecoded.user.id)}
                                    >Edit Personal Info</Button>
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
                                            onChange={() => { }}
                                            hidden={"true"}
                                        />
                                    );
                                }

                                if (item.type === "file") {
                                    return (
                                        <InputFile
                                            key={index}
                                            onChange={handlePreviewImage}
                                            // value={valuesUpdate[item.name]}
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
                                        onClick={() => { }}
                                        {...item}
                                    />
                                );
                            })}
                        </div>
                        {/* footer */}
                        <div className="flex justify-end">
                            <Button variant={"primary"}>Submit</Button>
                            <Button variant={"primary"} onClick={handleCloseModalUpdate}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Modal>
            )}

            {/* change password */}
            <Modal open={openModalChangePassword} close={handleCloseModalChangePassword}>
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
                                    onClick={() => { }}
                                    {...item}
                                />
                            );
                        })}
                    </div>
                    {/* footer */}
                    <div className="flex justify-end">
                        <Button variant={"primary"}>Submit</Button>
                        <Button variant={"primary"} onClick={handleCloseModalChangePassword}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </Modal>
        </Fragment>
    );
}

export default ProfileSystem;