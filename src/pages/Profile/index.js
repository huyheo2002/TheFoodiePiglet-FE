import Button from "../../components/Button";
import ItemCompact from "../../components/ItemCompact";
import Heading from "../../components/Heading";
import Image from "../../components/Image";
import ava from "../../assets/images/logo-pig-smile.png";
import * as userServices from "../../services/userServices";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Fragment, useContext, useEffect, useState } from "react";
import InputField from "../../components/FormControl/InputField";
import InputRadio from "../../components/FormControl/inputRadio";
import Modal from "../../components/Modal";
import InputFile from "../../components/FormControl/inputFile";
import clsx from "clsx";
import * as paymentServices from "../../services/paymentServices";
import cartEmpty from "../../assets/images/Base/cart-empty.png";
import WindowScrollTop from "../../utils/windowScroll";
import ExportToPNG from "../../utils/exportToPng";
import html2canvas from "html2canvas";
import FormatDateTime from "../../utils/formatDateTime";
import * as commonServices from "../../services/commonServices";
import GlobalContext from "../../contexts/globalContext";
import Paypal from "../../components/Paypal";
import TextareaField from "../../components/FormControl/textAreaField";
import Congrat from "../../components/Congrat";
import imgShipper from "../../assets/images/Base/shipper_01.png";
import * as authServices from "../../services/authServices";

function Profile() {
    const { paymentOnlineSuccess, setPaymentOnlineSuccess, showCongrat } = useContext(GlobalContext);
    const [valueLocal, setValueLocal] = useLocalStorage("dataUser", "");
    const [dataUserDecoded, setDataUserDecoded] = useState(null);

    const [roleName, setRoleName] = useState("");

    const [listUsersDetail, setListUsersDetail] = useState([]);
    const [dataRead, setDataRead] = useState({});
    const [image, setImage] = useState("");
    const [gender, setGender] = useState(-1);
    const [openModalRead, setOpenModalRead] = useState(false);
    const [valuesUpdate, setValuesUpdate] = useState({});
    const [openModalUpdate, setOpenModalUpdate] = useState(false);

    const inputs = [
        // {
        //   id: 1,
        //   name: "id",
        //   type: "text",
        //   placeholder: "Enter your username",
        //   label: "Id",
        //   readOnly: true
        // },
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
        // {
        //     id: 9,
        //     name: "roleId",
        //     type: "radio",
        //     label: "role",
        //     required: true,
        // },
        // {
        //   id: 10,
        //   name: "createdAt",
        //   type: "text",
        //   placeholder: "Enter your createdAt",
        //   label: "createdAt",
        // },
        // {
        //   id: 11,
        //   name: "updatedAt",
        //   type: "text",
        //   placeholder: "Enter your updatedAt",
        //   label: "updatedAt",
        // },
        {
            id: 12,
            name: "avatar",
            type: "file",
            placeholder: "Enter your avatar",
            label: "avatar",
            accept: "image/png, image/jpeg, image/gif, image/jpg",
        },
    ];

    // state order 
    const [listOrder, setListOrder] = useState([]);
    const [openModalOrdersDetail, setOpenModalOrdersDetail] = useState(false);
    const [dataOrderDetail, setDataOrderDetail] = useState({});
    const [listPurchasedItems, setListPurchasedItems] = useState([]);
    const [refreshPayment, setRefreshPayment] = useState(false);

    // cancel order 
    const [openModalCancelOrder, setOpenModalCancelOrder] = useState(false);
    const [idDelete, setIdDelete] = useState(null);
    const [openModalDeleteOrderSuccess, setOpenModalDeleteOrderSuccess] = useState(false);

    // handle change infomation order 
    const [openModalChangeInfoOrder, setOpenModalChangeInfoOrder] = useState(false);
    const [openModalChangeInfoOrderSuccess, setOpenModalChangeInfoOrderSuccess] = useState(false);

    // payment online 
    const [openModalPaymentOnline, setOpenModalPaymentOnline] = useState(false);
    const [values, setValues] = useState({
        totalPrice: "",
        deliveryAddress: "",
        contactInfo: "",
        note: "",
        purchasedItems: "",
    });
    const [idUpdatePayment, setIdUpdatePayment] = useState(-1);

    const inputsPaymentOnline = [
        {
            id: 1,
            name: "totalPrice",
            type: "text",
            placeholder: "You can't press :v",
            label: "Total Price",
            required: true,
        },
        {
            id: 2,
            name: "deliveryAddress",
            type: "text",
            placeholder: "Enter your Delivery Address",
            label: "Delivery Address",
            required: true,
        },
        {
            id: 3,
            name: "contactInfo",
            type: "text",
            placeholder: "Enter your contact infomation",
            label: "Contact",
            required: true,
        },
        {
            id: 4,
            name: "note",
            type: "text",
            placeholder: "You can add notes here",
            label: "Note",
        }
    ];

    // handle change password 
    const [openModalChangePassword, setOpenModalChangePassword] = useState(false);
    const [valuesChangePassword, setValuesChangePassword] = useState({});

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

    const decoded = async () => {
        if (valueLocal) {
            const respon = await commonServices.handleDecoded(valueLocal.token);
            // console.log("respon.decoded", respon)
            if (respon && respon.errCode === 0) {
                // console.log("respon.decoded.user", respon.decoded.user);
                setRoleName(respon.decoded.user.roleName);
                setDataUserDecoded(respon.decoded);

                // fetchList payment
                const responOrder = await paymentServices.getAllPaymentOfUser(respon.decoded.user.id);
                // console.log("responOrder payment", responOrder);
                if (responOrder && responOrder.errCode === 0) {
                    setListOrder(responOrder.payments);
                }
            }
        }
    };    

    useEffect(() => {
        decoded();
    }, [refreshPayment])

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


    // handle show detail infomation
    const handleOpenModalRead = (id) => {
        setOpenModalRead(true);
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

        if (filterUser.length > 0) {
            setDataRead(filterUser[0]);
        }
    };

    // console.log("dataread", dataRead);
    const handleCloseModalRead = () => {
        setOpenModalRead(false);

        // reset input radio
        setGender(-1);
    };

    // update ~ change infomation
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

        // reset input radio
        setGender(-1);

        // reset image
        setImage("");
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

    const handleGetValueGender = (currentValue) => {
        setGender(currentValue);
    };

    const onChangeInputUpdate = (e) => {
        setValuesUpdate({ ...valuesUpdate, [e.target.name]: e.target.value });
    };

    const inputUpdateClear = (getKey) => {
        setValuesUpdate({ ...valuesUpdate, [getKey]: "" });
    };

    // export to png
    const handleExportClick = () => {
        // Gọi hàm xuất ảnh từ component cha
        exportToPNG();
    };

    const exportToPNG = async () => {
        const content = document.getElementById('export-content');

        try {
            const canvas = await html2canvas(content);
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'exported-image.png';
            link.click();
        } catch (error) {
            console.error('Error exporting to PNG:', error);
        }
    };

    const handleOpenModalOrderDetail = (dataItem) => {
        // console.log("dataItem", dataItem);
        const dateOrder = FormatDateTime(dataItem.createdAt);
        let datePayment = null;
        if (dataItem.paymentDate) {
            datePayment = FormatDateTime(dataItem.paymentDate);
            dataItem.paymentDate = datePayment;
        }
        dataItem.createdAt = dateOrder;
        const purchasedItems = handleListPurchasedItems(dataItem.purchasedItems)
        // console.log("purchasedItems", purchasedItems)
        setListPurchasedItems(purchasedItems)

        setOpenModalOrdersDetail(true)
        setDataOrderDetail(dataItem);
    }

    // console.log("data Order detail", dataOrderDetail)

    const handleCloseModalOrderDetail = () => {
        setOpenModalOrdersDetail(false);
        setDataOrderDetail({});
        setListPurchasedItems([]);
        setRefreshPayment(!refreshPayment);
    }

    const handleListPurchasedItems = (inputString) => {
        return inputString
            .split(';')
            .filter(Boolean)
            .map((itemString) => {
                const itemObject = itemString.split('-').reduce((acc, propString) => {
                    const [key, value] = propString.split(':');
                    acc[key] = value;
                    return acc;
                }, {});

                // Kiểm tra nếu đối tượng có ít nhất một cặp key-value thì thêm nó vào mảng
                if (Object.keys(itemObject).length > 0) {
                    return itemObject;
                }

                return null; // Trả về null cho các phần tử không hợp lệ
            }).filter((item) => item !== null); // Loại bỏ các phần tử null
    };

    // handle delete orders 
    const handleDeletePayment = async (paymentId) => {
        // console.log("paymentId delete", paymentId)
        try {
            const respon = await paymentServices.handleDeletePayment(paymentId);
            if (respon && respon.errCode === 0) {
                // alert("huỷ đơn hàng thành công");
                setOpenModalCancelOrder(false);
                setIdDelete(null);
                setRefreshPayment(!refreshPayment);
                delayCloseModalDeleteOrderSuccess();
            } else if (respon.errCode === 1) {
                alert("Huỷ đơn hàng thất bại")
            }
        } catch (error) {
            console.log("err", error)
        }
    }

    const handleShowModalCancelOrder = (dataReceived) => {
        // console.log("dataReceived", dataReceived)
        setIdDelete(dataReceived.id);
        handleCloseModalOrderDetail();
        setOpenModalCancelOrder(true);
    }

    const handleCloseModalDeleteSuccess = () => {
        setOpenModalDeleteOrderSuccess(false);
    }

    const delayCloseModalDeleteOrderSuccess = () => {
        setOpenModalDeleteOrderSuccess(true);
        setTimeout(() => {
            handleCloseModalDeleteSuccess();
        }, 3000);
    }

    // handle change info order
    const onChangeInputOrderDetail = (e) => {
        setDataOrderDetail({ ...dataOrderDetail, [e.target.name]: e.target.value })
    }

    const handleCloseModalChangeInfoOrder = () => {
        setOpenModalChangeInfoOrder(false);
    }

    const handleClearInput = (getKey) => {
        setDataOrderDetail({ ...dataOrderDetail, [getKey]: "" });
    };

    const handleSubmitChangeInfoOrder = async (e) => {
        e.preventDefault()
        // const data = new FormData();
        // console.log("oke")
        try {
            const respon = await paymentServices.handleUpdateOrder(dataOrderDetail);
            if (respon && respon.errCode === 0) {
                setOpenModalChangeInfoOrder(false);
                setRefreshPayment(!refreshPayment);
                delayCloseModalChangeInfoOrderSuccess();
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleCloseModalChangeInfoSuccess = () => {
        setOpenModalChangeInfoOrderSuccess(false);
    }

    const delayCloseModalChangeInfoOrderSuccess = () => {
        setOpenModalChangeInfoOrderSuccess(true);
        setTimeout(() => {
            handleCloseModalChangeInfoSuccess();
        }, 3000);
    }

    // console.log("dataOrderDetail", dataOrderDetail)
    // console.log("listOrder", listOrder)
    // payment online
    const handleOpenModalPaymentOnline = (dataItem) => {
        const dateOrder = FormatDateTime(dataItem.createdAt);
        let datePayment = null;
        if (dataItem.paymentDate) {
            datePayment = FormatDateTime(dataItem.paymentDate);
            dataItem.paymentDate = datePayment;
        }
        dataItem.createdAt = dateOrder;
        const purchasedItems = handleListPurchasedItems(dataItem.purchasedItems)
        setListPurchasedItems(purchasedItems)

        setOpenModalPaymentOnline(true)
        setDataOrderDetail(dataItem);
        setIdUpdatePayment(dataItem?.id);
        setValues({
            totalPrice: dataItem?.totalPrice,
            deliveryAddress: dataItem?.deliveryAddress,
            contactInfo: dataItem?.contactInfo,
            note: dataItem?.note,
            purchasedItems: dataItem?.purchasedItems
        })
    }

    const handleCloseModalPaymentOnline = () => {
        setOpenModalPaymentOnline(false);
        setValues({
            totalPrice: "",
            deliveryAddress: "",
            contactInfo: "",
            note: "",
            purchasedItems: "",
        })
        setRefreshPayment(!refreshPayment);
    }

    const handleCloseModalPaymentOnlineSuccess = () => {
        setPaymentOnlineSuccess(false);
    }

    useEffect(() => {
        if (paymentOnlineSuccess) {
            // console.log("zo 123");
            handleCloseModalPaymentOnline();
        }
    }, [paymentOnlineSuccess])

    // handle order  
    const onChangeInputPaymentOnline = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleClearInputPaymentOnline = (getKey) => {
        setValues({ ...values, [getKey]: "" });
    };

    const handleGetCurrentContact = () => {
        if (dataUserDecoded && values) {
            setValues({ ...values, contactInfo: `${dataUserDecoded.user.email}-${dataUserDecoded.user.phone}` })
        } else {
            return null;
        }
    }

    // handle change password 
    const onChangeInputChangePassword = (e) => {
        setValuesChangePassword({ ...valuesChangePassword, [e.target.name]: e.target.value });
    };

    const inputChangePasswordClear = (getKey) => {
        setValuesChangePassword({ ...valuesChangePassword, [getKey]: "" });
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

    // console.log("dataUserDecoded", dataUserDecoded);
    return (
        <Fragment>
            <div className="min-h-screen bg-transparent py-4">
                <div className="relative py-3 w-full">
                    <div className="bg-gray-900 shadow-black-rb-0.75 rounded-lg border-rgba-white-0.1 border-solid border-[3px] mx-3 my-4 p-3 overflow-hidden select-none transition-all duration-300 cursor-pointer hover:border-white">
                        <div className="w-full">
                            <div className="flex items-center space-x-5">
                                <div className="h-40 w-40 rounded-full flex flex-shrink-0 justify-center items-center text-white text-2xl font-mono overflow-hidden border-2 border-rgba-white-0.1">
                                    <Image className={"w-full h-full"} src={dataUserDecoded ? dataUserDecoded.user.avatar !== null ? dataUserDecoded.user.avatar : " " : " "} fallback={ava} />
                                </div>
                                <div className="block pl-2 font-semibold text-xl self-center text-gray-700">
                                    <h2 className="leading-relaxed text-white font-semibold text-2xl">{dataUserDecoded && dataUserDecoded.user.name}</h2>
                                    <p className="text-sm font-normal leading-relaxed text-white">{roleName}</p>
                                </div>
                            </div>
                            <div className="mt-4 flex">
                                <Button variant={"primary"}
                                    onClick={() => handleOpenModalUpdate(dataUserDecoded.user.id)}
                                >Thay đổi thông tin</Button>
                                <Button variant={"primary"}
                                    onClick={() => handleOpenModalRead(dataUserDecoded.user.id)}
                                >Thông tin chi tiết</Button>
                                <Button variant={"primary"}
                                    onClick={() => setOpenModalChangePassword(true)}
                                >Đổi mật khẩu</Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative w-full">
                    <div className="relative px-4 mx-8 shadow rounded-3xl">
                        <Heading line>Món ăn yêu thích</Heading>
                        <div className="flex flex-row flex-wrap">
                            <ItemCompact size={"fourItems-onRows"} />
                            <ItemCompact size={"fourItems-onRows"} />
                            <ItemCompact size={"fourItems-onRows"} />
                            <ItemCompact size={"fourItems-onRows"} />
                        </div>

                        <Heading line>Đơn hàng đã mua</Heading>
                        <div className={clsx("", {
                            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4": listOrder.length > 0,
                            "flex justify-center": listOrder.length <= 0
                        })}>
                            {listOrder.length > 0 ?
                                listOrder.map((item, index) => {
                                    // console.log("itemitemitem", item)
                                    // handle date
                                    const dateObject = new Date(item.createdAt); // Chuyển đổi thành đối tượng ngày
                                    const day = dateObject.getDate();
                                    const month = dateObject.getMonth() + 1; // Tháng bắt đầu từ 0 nên cộng thêm 1
                                    const year = dateObject.getFullYear();

                                    const formattedDate = `${day}/${month}/${year}`;

                                    return (
                                        <div className="bg-white p-4 rounded-lg shadow" key={index}>
                                            <h2 className="text-xl font-semibold">Đơn hàng #{item.id}</h2>
                                            <p className="text-gray-600">Trạng thái đơn hàng:
                                                <span className={clsx("ml-2", {
                                                    "text-gray-500 text-lg font-semibold": item.orderStatus === "Đang xử lý",
                                                    "text-yellow-500 text-lg font-semibold": item.orderStatus === "Đang chuẩn bị",
                                                    "text-sky-500 text-lg font-semibold": item.orderStatus === "Đang giao hàng",
                                                    "text-red-500 text-lg font-semibold": item.orderStatus === "Đã huỷ",
                                                    "text-green-500 text-lg font-semibold": item.orderStatus === "Hoàn thành",
                                                })}>{item.orderStatus}</span>
                                            </p>
                                            <p className="text-gray-600">
                                                Trạng thái thanh toán:
                                                <span className={clsx("ml-2", {
                                                    "text-gray-500 text-lg font-semibold": item.paymentStatus === "Chưa thanh toán",
                                                    "text-green-500 text-lg font-semibold": item.paymentStatus === "Đã thanh toán",
                                                })}>{item.paymentStatus}</span>
                                            </p>
                                            <p className="text-gray-600 mt-2">Ngày đặt hàng: {formattedDate ? formattedDate : item.createdAt}</p>
                                            <p className="text-gray-600">Tổng tiền: {item.totalPrice}$</p>
                                            <div className="flex mt-3">
                                                <Button variant={"primary"}
                                                    onClick={() => {
                                                        handleOpenModalOrderDetail(item);
                                                    }}
                                                >Xem chi tiết</Button>
                                                {item.paymentStatus !== "Đã thanh toán" && <Button variant={"primary"}
                                                    onClick={() => handleOpenModalPaymentOnline(item)}
                                                >Thanh toán online</Button>}
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <div className="flex flex-col items-center justify-center">
                                    <Image src={cartEmpty} className={"!w-[400px] rounded-lg"} />
                                    <h3 className="text-white font-semibold text-xl my-4">Giỏ hàng của bạn đang trống.</h3>
                                    <p className="text-gray-400 font-semibold text-base text-center">
                                        Có vẻ như bạn chưa thêm bất cứ thứ gì vào giỏ hàng của mình.
                                        <br />
                                        Hãy tiếp tục và khám phá các sản phẩm của chúng tôi.
                                    </p>
                                    <div className="flex mt-6 justify-center">
                                        <Button variant={"primary"} to={"/"} onClick={() => WindowScrollTop()}>
                                            Trang Chủ
                                        </Button>
                                        <Button variant={"primary"} to={"/menu"} onClick={() => WindowScrollTop()}>
                                            Mua sắm ngay
                                        </Button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* modal infomation detail */}
            {openModalRead && (
                <Modal open={openModalRead} close={handleCloseModalRead}>
                    <Heading variant={"primary"}>Information user detail</Heading>
                    <div className="">
                        {inputs.map((item, index) => {
                            // console.log("item", item);
                            // console.log("dataRead[item.name]", dataRead[item.name])
                            const optionsGender = [
                                { value: "1", label: "Male" },
                                { value: "0", label: "Female" },
                            ];

                            let genderChecked = null;
                            if (dataRead) {
                                if (dataRead.gender === true) {
                                    genderChecked = 1;
                                } else {
                                    genderChecked = 0;
                                }
                            }

                            if (item.type === "password") {
                                return (
                                    <InputField
                                        key={index}
                                        value={dataRead[item.name]}
                                        onChange={() => { }}
                                        hidden={"true"}
                                        {...item}
                                    />
                                );
                            }

                            if (item.type === "file") {
                                // console.log("image", dataRead[item.name])
                                return (
                                    <InputFile
                                        key={index}
                                        value={dataRead[item.name]}
                                        onChange={() => { }}
                                        onlyRead={"true"}
                                        imagePreview={dataRead[item.name]}
                                        {...item}
                                    />
                                );
                            }

                            if (item.type === "radio" && item.name === "gender") {
                                return (
                                    <InputRadio
                                        key={index}
                                        options={optionsGender}
                                        onChange={() => { }}
                                        checked={genderChecked}
                                        disable
                                        {...item}
                                        id={Math.floor(Math.random() * 10)}
                                    />
                                );
                            }

                            return (
                                <InputField
                                    key={index}
                                    value={dataRead[item.name]}
                                    onChange={() => { }}
                                    onlyRead={"true"}
                                    clear={() => { }}
                                    {...item}
                                />
                            );
                        })}
                    </div>
                    {/* footer */}
                    <div className="flex justify-end">
                        <Button variant={"primary"} onClick={handleCloseModalRead}>
                            Cancel
                        </Button>
                    </div>
                </Modal>
            )}

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

            {/* detail order */}
            {openModalOrdersDetail &&
                <Modal open={openModalOrdersDetail} close={handleCloseModalOrderDetail}>
                    <div className="bg-white p-4 rounded shadow-lg mb-4">
                        <ExportToPNG onExportClick={handleExportClick}>
                            <div className="px-4 py-6">
                                <Heading variant={"primary"}>Chi tiết đơn hàng</Heading>
                                <div className="mb-4 mt-3">
                                    <div className="mb-4 flex">
                                        <h3 className="text-lg font-semibold mb-2 mr-6">Mã order: <span className="text-base text-gray-600 font-medium">#{dataOrderDetail && dataOrderDetail.id ? dataOrderDetail.id : Math.floor(Math.random() * 999)}</span></h3>
                                        <h3 className="text-lg font-semibold mb-2">Ngày đặt hàng: <span className="text-base text-gray-600 font-medium">{dataOrderDetail && dataOrderDetail.createdAt}</span></h3>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="text-lg font-semibold mb-2">Phí dịch vụ: <span className="text-base text-gray-600 font-medium">{dataOrderDetail && dataOrderDetail.servicesFee ? `${dataOrderDetail.servicesFee}$` : "0$"}</span></h3>
                                    </div>
                                    <div className="mb-4 flex-col">
                                        <h3 className="text-lg font-semibold mb-2 mr-6">Địa chỉ nhận hàng: <span className="text-base text-gray-600 font-medium">{dataOrderDetail && dataOrderDetail.deliveryAddress}</span></h3>
                                        <h3 className="text-lg font-semibold mb-2">Thông tin liên hệ: <span className="text-base text-gray-600 font-medium">{dataOrderDetail && dataOrderDetail.contactInfo}</span></h3>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="text-lg font-semibold mb-2">Trạng thái đơn hàng: <span className="text-base text-gray-600 font-medium">{dataOrderDetail && dataOrderDetail.orderStatus}</span></h3>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="text-lg font-semibold mb-2">Phương thức thanh toán: <span className="text-base text-gray-600 font-medium">{dataOrderDetail && dataOrderDetail.paymentMethod}</span></h3>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="text-lg font-semibold mb-2">Trạng thái đơn hàng: <span className="text-base text-gray-600 font-medium">{dataOrderDetail && dataOrderDetail.paymentStatus}</span></h3>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="text-lg font-semibold mb-2">Ngày thanh toán: <span className="text-base text-gray-600 font-medium">{dataOrderDetail && dataOrderDetail.paymentDate ? dataOrderDetail.paymentDate : "Chưa thanh toán"}</span></h3>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="text-lg font-semibold mb-2">Thông tin shipper: <span className="text-base text-gray-600 font-medium">Huệ hay hát</span></h3>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="text-lg font-semibold mb-2">Ghi chú</h3>
                                        <p>{dataOrderDetail && dataOrderDetail.note}</p>
                                    </div>

                                    <h3 className="text-lg font-semibold mb-2">Chi tiết sản phẩm</h3>
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr>
                                                <th className="p-2 border">Tên món ăn</th>
                                                <th className="p-2 border">Số lượng</th>
                                                <th className="p-2 border">Kích cỡ</th>
                                                <th className="p-2 border">Giá</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listPurchasedItems.length > 0 && listPurchasedItems.map((item, index) => {
                                                return <tr key={index}>
                                                    <td className="p-2 border">{item.name}</td>
                                                    <td className="p-2 border">{item.quantity}</td>
                                                    <td className="p-2 border">{item.size}</td>
                                                    <td className="p-2 border">{`${item.price}$`}</td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>

                                    <div className="my-4 flex justify-end">
                                        <h3 className="text-lg font-semibold mb-2">Tổng hóa đơn: <span className="text-base text-gray-600 font-medium">{dataOrderDetail && `${dataOrderDetail.totalPrice}$`}</span></h3>
                                    </div>
                                </div>
                            </div>
                        </ExportToPNG>

                        <div className="flex justify-end">
                            {dataOrderDetail && dataOrderDetail.orderStatus && dataOrderDetail.orderStatus === "Đang xử lý" &&
                                <Fragment>
                                    <Button variant={"primary"}
                                        onClick={() => handleShowModalCancelOrder(dataOrderDetail)}
                                    >
                                        Huỷ đơn hàng
                                    </Button>
                                    <Button variant={"primary"}
                                        onClick={() => {
                                            setOpenModalOrdersDetail(false);
                                            setRefreshPayment(!refreshPayment);
                                            setOpenModalChangeInfoOrder(true)
                                        }}
                                    >
                                        Thay đổi thông tin nhận hàng
                                    </Button>
                                </Fragment>
                            }
                            <Button variant={"primary"} onClick={handleExportClick}>
                                Xuất bill
                            </Button>
                            <Button variant={"primary"} onClick={handleCloseModalOrderDetail}>
                                Thoát
                            </Button>
                        </div>
                    </div>
                </Modal>
            }

            {/* cancle order */}
            {openModalCancelOrder &&
                <Modal open={openModalCancelOrder} close={() => setOpenModalCancelOrder(false)}>
                    <Heading variant={"primary"}>
                        Huỷ đơn hàng
                    </Heading>
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold mr-3">Chú ý!</strong>
                        <span className="block sm:inline">Bạn có chắc chắn muốn huỷ đơn hàng này không?</span>
                    </div>
                    <div className="flex justify-end mt-3">
                        <Button variant={"primary"}
                            onClick={() => handleDeletePayment(idDelete)}
                        >Xác nhận</Button>
                        <Button variant={"primary"}
                            onClick={() => setOpenModalCancelOrder(false)}
                        >Thoát</Button>
                    </div>
                </Modal>
            }

            {openModalDeleteOrderSuccess &&
                <Modal open={openModalDeleteOrderSuccess} close={handleCloseModalDeleteSuccess}>
                    <Heading variant={"primary"}>
                        Huỷ đơn hàng thành công
                    </Heading>
                    <div className="bg-green-200 border border-green-600 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold mr-3">Thành công!</strong>
                        <span className="block sm:inline">Đơn hàng của bạn đã được huỷ thành công.</span>
                    </div>
                </Modal>
            }

            {/* modal change info  */}
            {openModalChangeInfoOrder &&
                <Modal open={openModalChangeInfoOrder} close={handleCloseModalChangeInfoOrder}>
                    <form autoComplete="off" onSubmit={handleSubmitChangeInfoOrder}>
                        <Heading variant={"primary"}>Update infomation order</Heading>
                        <InputField
                            onChange={onChangeInputOrderDetail}
                            value={dataOrderDetail.contactInfo}
                            name="contactInfo"
                            type="text"
                            label="Contact info"
                            clear={() => handleClearInput("contactInfo")}
                            placeholder="Enter your contact info"
                        />
                        <InputField
                            onChange={onChangeInputOrderDetail}
                            name="deliveryAddress"
                            value={dataOrderDetail.deliveryAddress}
                            type="text"
                            label="Delivery Address"
                            clear={() => handleClearInput("deliveryAddress")}
                            placeholder="Enter your delivery address"
                        />

                        <div className="flex justify-end mt-3">
                            <Button variant={"primary"}>
                                Xác nhận
                            </Button>
                            <Button variant={"primary"}
                                onClick={handleCloseModalChangeInfoOrder}
                            >
                                Hủy
                            </Button>
                        </div>
                    </form>

                </Modal>
            }

            {openModalChangeInfoOrderSuccess &&
                <Modal open={openModalChangeInfoOrderSuccess} close={handleCloseModalChangeInfoSuccess}>
                    <Heading variant={"primary"}>Địa chỉ nhận hàng</Heading>
                    <div className="bg-green-200 border border-green-600 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold mr-3">Thành công!</strong>
                        <span className="block sm:inline">Địa chỉ nhận hàng của bạn đã được thay đổi thành công.</span>
                    </div>
                </Modal>
            }

            {/* modal payment online */}
            {/* payment online */}
            <Modal open={openModalPaymentOnline} close={handleCloseModalPaymentOnline}>
                <form autoComplete="off" onSubmit={() => { }}>
                    <Heading variant={"primary"}>Thanh toán online</Heading>
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-8 mb-4" role="alert">
                        <strong className="font-bold mr-3">Chú ý!</strong>
                        <span className="block sm:inline">Hãy nhập đầy đủ các dữ liệu trước khi thanh toán</span>
                    </div>
                    <div className="flex flex-wrap justify-between">
                        {inputsPaymentOnline.map((item, index) => {
                            if (item.name === "note") {
                                return <TextareaField
                                    key={index}
                                    className={"!w-full mx-8"}
                                    value={values[item.name]}
                                    onChange={onChangeInputPaymentOnline}
                                    onClick={() => { }}
                                    {...item}
                                />
                            }

                            // totalPrice
                            if (item.name === "totalPrice") {
                                return <InputField
                                    key={index}
                                    className={"!w-2/5 mx-8"}
                                    onChange={onChangeInputPaymentOnline}
                                    value={values[item.name]}
                                    onClick={() => { }}
                                    clear={() => handleClearInputPaymentOnline(item.name)}
                                    onlyRead={"true"}
                                    {...item}
                                />
                            }
                            // console.log("values[item.name]", values[item.name])
                            if (item.name === "contactInfo") {
                                return <InputField
                                    key={index}
                                    className={"!w-full mx-8"}
                                    value={values[item.name]}
                                    onChange={onChangeInputPaymentOnline}
                                    onClick={() => { }}
                                    autoFill={handleGetCurrentContact}
                                    clear={() => handleClearInputPaymentOnline(item.name)}
                                    {...item}
                                />
                            }

                            return <InputField
                                key={index}
                                className={"!w-2/5 mx-8"}
                                value={values[item.name]}
                                onChange={onChangeInputPaymentOnline}
                                onClick={() => { }}
                                clear={() => handleClearInputPaymentOnline(item.name)}
                                {...item}
                            />
                        })}

                        {/* table purchasedItems */}
                        <div className="mt-6 mx-8 w-full">
                            <h3 className="text-lg font-semibold mb-2">Chi tiết sản phẩm</h3>
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="p-2 border">Tên món ăn</th>
                                        <th className="p-2 border">Số lượng</th>
                                        <th className="p-2 border">Kích cỡ</th>
                                        <th className="p-2 border">Giá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listPurchasedItems.length > 0 && listPurchasedItems.map((item, index) => {
                                        return <tr key={index}>
                                            <td className="p-2 border">{item.name}</td>
                                            <td className="p-2 border">{item.quantity}</td>
                                            <td className="p-2 border">{item.size}</td>
                                            <td className="p-2 border">{`${item.price}$`}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {values.deliveryAddress !== "" && values.contactInfo !== "" &&
                        <div className="mt-7">
                            <Paypal
                                totalPrice={values && values.totalPrice}
                                payload={{
                                    id: idUpdatePayment,
                                    contactInfo: values?.contactInfo,
                                    deliveryAddress: values?.deliveryAddress,
                                    note: values && values?.note,
                                    purchasedItems: values && values?.purchasedItems,
                                    userId: dataUserDecoded ? dataUserDecoded.user.id : null,
                                    totalPrice: values && values.totalPrice,
                                    paymentDate: new Date(),
                                }}
                            />
                        </div>
                    }
                </form>
            </Modal>

            <Modal open={paymentOnlineSuccess} custom close={handleCloseModalPaymentOnlineSuccess}>
                {showCongrat && <Congrat />}
                <div className="flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <div className="flex items-center space-x-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <p className="text-lg font-semibold text-green-600">Thanh toán thành công</p>
                        </div>
                        <Image src={imgShipper} className={"mx-auto mb-4 w-52 my-3"} />
                        <div className="mt-4">
                            <p className="text-gray-700 text-center">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.
                                <br />
                                Đơn hàng của bạn đang được xử lý. Vui lòng đợi trong ít phút.
                            </p>
                        </div>
                        <div className="mt-6 flex justify-start">
                            <Button variant={"primary"} to={"/profile"}
                                onClick={() => {
                                    handleCloseModalPaymentOnlineSuccess();
                                    WindowScrollTop()
                                }}
                            >Xem đơn hàng của bạn</Button>
                            <Button variant={"primary"} onClick={() => {
                                handleCloseModalPaymentOnlineSuccess();
                                WindowScrollTop();
                            }}>Thoát</Button>
                        </div>
                    </div>
                </div>
            </Modal>

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

export default Profile;