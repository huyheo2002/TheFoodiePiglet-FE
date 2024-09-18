import Button from "../../components/Button";
import ItemCompact from "../../components/ItemCompact";
import Heading from "../../components/Heading";
import Image from "../../components/Image";
import ava from "../../assets/images/logo-pig-smile.png";
import * as userServices from "../../services/userServices";
import { Fragment, useContext, useEffect, useState } from "react";
import InputField from "../../components/FormControl/InputField";
import InputRadio from "../../components/FormControl/inputRadio";
import Modal from "../../components/Modal";
import InputFile from "../../components/FormControl/inputFile";
import clsx from "clsx";
import * as paymentServices from "../../services/paymentServices";
import cartEmpty from "../../assets/images/Base/cart-empty.png";
import WindowScrollTop from "../../utils/windowScroll";
import FormatDateTime from "../../utils/formatDateTime";
import GlobalContext from "../../contexts/globalContext";
import Paypal from "../../components/Paypal";
import TextareaField from "../../components/FormControl/textAreaField";
import Congrat from "../../components/Congrat";
import imgShipper from "../../assets/images/Base/shipper_01.png";
import * as authServices from "../../services/authServices";
import * as productServices from "../../services/productServices";
import { TBUTTON_VARIANT } from "../../types/button";
import { useAuth } from "../../contexts/authContext";
import toast from "react-hot-toast";
import getRandomListItem from "../../utils/getRandomItem";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const { paymentOnlineSuccess, setPaymentOnlineSuccess, showCongrat } =
    useContext(GlobalContext);
  const [roleName, setRoleName] = useState("");
  const [listUsersDetail, setListUsersDetail] = useState([]);
  const [dataRead, setDataRead] = useState({});
  const [image, setImage] = useState("");
  const [gender, setGender] = useState(-1);
  const [openModalRead, setOpenModalRead] = useState(false);
  const [valuesUpdate, setValuesUpdate] = useState({});
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const { dataUser } = useAuth();

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
      required: false,
    },
    {
      id: 5,
      name: "name",
      type: "text",
      placeholder: "Enter your name",
      label: "Name",
      required: false,
    },
    {
      id: 6,
      name: "phone",
      type: "text",
      placeholder: "Enter your phone",
      label: "phone",
      required: false,
    },
    {
      id: 7,
      name: "address",
      type: "text",
      placeholder: "Enter your address",
      label: "address",
      required: false,
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

  // state order
  const [listOrder, setListOrder] = useState([]);
  const [openModalOrdersDetail, setOpenModalOrdersDetail] = useState(false);
  const [dataOrderDetail, setDataOrderDetail] = useState({});
  const [listPurchasedItems, setListPurchasedItems] = useState([]);
  const [refreshPayment, setRefreshPayment] = useState(false);
  const [dataProducts, setDataProducts] = useState([]);

  // cancel order
  const [openModalCancelOrder, setOpenModalCancelOrder] = useState(false);
  const [idDelete, setIdDelete] = useState(null);
  const [openModalDeleteOrderSuccess, setOpenModalDeleteOrderSuccess] =
    useState(false);

  // handle change infomation order
  const [openModalChangeInfoOrder, setOpenModalChangeInfoOrder] =
    useState(false);
  const [openModalChangeInfoOrderSuccess, setOpenModalChangeInfoOrderSuccess] =
    useState(false);

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
    },
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

  const getPaymentOfUser = async () => {
    if (dataUser) {
      setRoleName(dataUser?.user?.roleName ?? "User");
      const responOrder = await paymentServices.getAllPaymentOfUser(
        dataUser.user.id
      );

      if (responOrder && responOrder.errCode === 0) {
        setListOrder(responOrder.payments);
      }
    }
  };

  useEffect(() => {
    getPaymentOfUser();
  }, [refreshPayment, dataUser]);

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
            sanitizedUser[key] = "";
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

  const handleCloseModalRead = () => {
    setOpenModalRead(false);
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

  const onhandleSubmitUpdateUser = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    if (valuesUpdate) {
      data.set("id", valuesUpdate.id);
    }

    try {
      const respon = await userServices.handleUpdateUser(data);
      if (respon && respon.errCode === 0) {
        dataUser.user = respon.user;
        handleCloseModalUpdate();
        handleGetAllUsers();
        toast.success("Updated infomation user successfully");
      } else if (respon.errCode === 1) {
        toast.error(respon.message);
      }
    } catch (error) {
      console.error(error);
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

  const handleOpenModalOrderDetail = (dataItem) => {
    const dateOrder = FormatDateTime(dataItem.createdAt);
    let datePayment = null;
    if (dataItem.paymentDate) {
      datePayment = FormatDateTime(dataItem.paymentDate);
      dataItem.paymentDate = datePayment;
    }
    dataItem.createdAt = dateOrder;
    const purchasedItems = handleListPurchasedItems(dataItem.purchasedItems);
    setListPurchasedItems(purchasedItems);

    setOpenModalOrdersDetail(true);
    setDataOrderDetail(dataItem);
  };

  const handleCloseModalOrderDetail = () => {
    setOpenModalOrdersDetail(false);
    setDataOrderDetail({});
    setListPurchasedItems([]);
    setRefreshPayment(!refreshPayment);
  };

  const handleListPurchasedItems = (inputString) => {
    return inputString
      .split(";")
      .filter(Boolean)
      .map((itemString) => {
        const itemObject = itemString.split("-").reduce((acc, propString) => {
          const [key, value] = propString.split(":");
          acc[key] = value;
          return acc;
        }, {});

        if (Object.keys(itemObject).length > 0) {
          return itemObject;
        }

        return null;
      })
      .filter((item) => item !== null);
  };

  // handle delete orders
  const handleDeletePayment = async (paymentId) => {
    try {
      const respon = await paymentServices.handleDeletePayment(paymentId);
      if (respon && respon.errCode === 0) {
        setOpenModalCancelOrder(false);
        setIdDelete(null);
        setRefreshPayment(!refreshPayment);
        delayCloseModalDeleteOrderSuccess();
        toast.success("Deleted order successfully");
      } else if (respon.errCode === 1) {
        toast.error("Has a fault when deleted order");
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  const handleShowModalCancelOrder = (dataReceived) => {
    setIdDelete(dataReceived.id);
    handleCloseModalOrderDetail();
    setOpenModalCancelOrder(true);
  };

  const handleCloseModalDeleteSuccess = () => {
    setOpenModalDeleteOrderSuccess(false);
  };

  const delayCloseModalDeleteOrderSuccess = () => {
    setOpenModalDeleteOrderSuccess(true);
    setTimeout(() => {
      handleCloseModalDeleteSuccess();
    }, 3000);
  };

  // handle change info order
  const onChangeInputOrderDetail = (e) => {
    setDataOrderDetail({ ...dataOrderDetail, [e.target.name]: e.target.value });
  };

  const handleCloseModalChangeInfoOrder = () => {
    setOpenModalChangeInfoOrder(false);
  };

  const handleClearInput = (getKey) => {
    setDataOrderDetail({ ...dataOrderDetail, [getKey]: "" });
  };

  const handleSubmitChangeInfoOrder = async (e) => {
    e.preventDefault();
    try {
      const respon = await paymentServices.handleUpdateOrder(dataOrderDetail);
      if (respon && respon.errCode === 0) {
        setOpenModalChangeInfoOrder(false);
        setRefreshPayment(!refreshPayment);
        delayCloseModalChangeInfoOrderSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModalChangeInfoSuccess = () => {
    setOpenModalChangeInfoOrderSuccess(false);
  };

  const delayCloseModalChangeInfoOrderSuccess = () => {
    setOpenModalChangeInfoOrderSuccess(true);
    setTimeout(() => {
      handleCloseModalChangeInfoSuccess();
    }, 3000);
  };

  // payment online
  const handleOpenModalPaymentOnline = (dataItem) => {
    const dateOrder = FormatDateTime(dataItem.createdAt);
    let datePayment = null;
    if (dataItem.paymentDate) {
      datePayment = FormatDateTime(dataItem.paymentDate);
      dataItem.paymentDate = datePayment;
    }
    dataItem.createdAt = dateOrder;
    const purchasedItems = handleListPurchasedItems(dataItem.purchasedItems);
    setListPurchasedItems(purchasedItems);

    setOpenModalPaymentOnline(true);
    setDataOrderDetail(dataItem);
    setIdUpdatePayment(dataItem?.id);
    setValues({
      totalPrice: dataItem?.totalPrice,
      deliveryAddress: dataItem?.deliveryAddress,
      contactInfo: dataItem?.contactInfo,
      note: dataItem?.note,
      purchasedItems: dataItem?.purchasedItems,
    });
  };

  const handleCloseModalPaymentOnline = () => {
    setOpenModalPaymentOnline(false);
    setValues({
      totalPrice: "",
      deliveryAddress: "",
      contactInfo: "",
      note: "",
      purchasedItems: "",
    });
    setRefreshPayment(!refreshPayment);
  };

  const handleCloseModalPaymentOnlineSuccess = () => {
    setPaymentOnlineSuccess(false);
  };

  useEffect(() => {
    if (paymentOnlineSuccess) {
      handleCloseModalPaymentOnline();
    }
  }, [paymentOnlineSuccess]);

  // handle order
  const onChangeInputPaymentOnline = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleClearInputPaymentOnline = (getKey) => {
    setValues({ ...values, [getKey]: "" });
  };

  const handleGetCurrentContact = () => {
    if (dataUser && values) {
      setValues({
        ...values,
        contactInfo: `${dataUser.user.email}-${dataUser.user.phone}`,
      });
    } else {
      return null;
    }
  };

  // handle change password
  const onChangeInputChangePassword = (e) => {
    setValuesChangePassword({
      ...valuesChangePassword,
      [e.target.name]: e.target.value,
    });
  };

  const inputChangePasswordClear = (getKey) => {
    setValuesChangePassword({ ...valuesChangePassword, [getKey]: "" });
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
      toast.error(error);
    }
  };

  const fetchListProductsCompact = async () => {
    let respon = (await productServices.getAllProductCompact()) ?? null;
    if (respon) {
      const dataListProduct = respon.products || [];
      let splitFields =
        dataListProduct.length > 0 &&
        dataListProduct.map((item) => {
          if (item.Variants) {
            if (item.Variants.length > 0) {
              let minPrice = item.Variants[0].price;
              let maxPrice = item.Variants[0].price;
              let maxPriceOriginal = item.Variants[0].price;

              let maxDiscountVariant = item.Variants[0].discountVariant;
              for (const variant of item.Variants) {
                let currentVariantPrice =
                  variant.price -
                  (variant.price * variant.discountVariant) / 100;
                if (currentVariantPrice < minPrice) {
                  minPrice = currentVariantPrice;
                }
                if (currentVariantPrice > maxPrice) {
                  maxPrice = currentVariantPrice;
                }

                if (variant.price > maxPriceOriginal) {
                  maxPriceOriginal = variant.price;
                  item.originalPrice = `${maxPriceOriginal} $`;
                }
                if (variant.discountVariant > maxDiscountVariant) {
                  maxDiscountVariant = variant.discountVariant;
                  item.discount = `${maxDiscountVariant} %` ?? `0 %`;
                }
              }

              if (minPrice === maxPrice) {
                item.price = `${Math.round(minPrice * 100) / 100} $` ?? `0 $`;
              } else {
                item.price =
                  `${Math.round(minPrice * 100) / 100} ~ ${
                    Math.round(maxPrice * 100) / 100
                  } $` ?? `0 $`;
              }

              delete item.Variants;
            }
          }

          if (item.Category) {
            item.categoryName = item.Category.name;
            delete item.Category;
          }

          return item;
        });

      if (splitFields.length > 0) {
        const randomItem = getRandomListItem(splitFields, 8);
        setDataProducts(randomItem);
      }
    }
  };

  useEffect(() => {
    fetchListProductsCompact();
  }, []);

  return (
    <Fragment>
      <div className="min-h-screen bg-transparent py-4">
        <div className="relative py-3 w-full">
          <div className="bg-gray-900 shadow-black-rb-0.75 rounded-lg border-rgba-white-0.1 border-solid border-[3px] mx-3 my-4 p-3 overflow-hidden select-none transition-all duration-300 cursor-pointer hover:border-white">
            <div className="w-full">
              <div className="flex items-center space-x-5">
                <div className="h-40 w-40 rounded-full flex flex-shrink-0 justify-center items-center text-white text-2xl font-mono overflow-hidden border-2 border-rgba-white-0.1">
                  <Image
                    className={"w-full h-full"}
                    src={
                      dataUser
                        ? dataUser.user.avatar !== null
                          ? dataUser.user.avatar
                          : " "
                        : " "
                    }
                    fallback={ava}
                  />
                </div>
                <div className="block pl-2 font-semibold text-xl self-center text-gray-700">
                  <h2 className="leading-relaxed text-white font-semibold text-2xl">
                    {dataUser && dataUser.user.name}
                  </h2>
                  <p className="text-sm font-normal leading-relaxed text-white">
                    {roleName}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex">
                <Button
                  variant={TBUTTON_VARIANT.PRIMARY}
                  onClick={() => handleOpenModalUpdate(dataUser.user.id)}
                >
                  Thay đổi thông tin
                </Button>
                <Button
                  variant={TBUTTON_VARIANT.PRIMARY}
                  onClick={() => handleOpenModalRead(dataUser.user.id)}
                >
                  Thông tin chi tiết
                </Button>
                <Button
                  variant={TBUTTON_VARIANT.PRIMARY}
                  onClick={() => setOpenModalChangePassword(true)}
                >
                  Đổi mật khẩu
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full">
          <div className="relative px-4 mx-8 shadow rounded-3xl">
            <Heading line>Đề xuất cho bạn</Heading>
            <div className="flex flex-row flex-wrap">
              {dataProducts.length > 0 &&
                dataProducts.map((item, index) => {
                  return (
                    <ItemCompact
                      key={index}
                      data={item}
                      disabledBtnAdd
                      onHandleProductDetail={() => {
                        WindowScrollTop();
                        navigate(`/product-detail/${item.id}`);
                      }}
                    />
                  );
                })}

            </div>

            <Heading line>Đơn hàng đã mua</Heading>
            <div
              className={clsx("", {
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4":
                  listOrder.length > 0,
                "flex justify-center": listOrder.length <= 0,
              })}
            >
              {listOrder.length > 0 ? (
                listOrder.map((item, index) => {
                  // handle date
                  const dateObject = new Date(item.createdAt);
                  const day = dateObject.getDate();
                  const month = dateObject.getMonth() + 1;
                  const year = dateObject.getFullYear();

                  const formattedDate = `${day}/${month}/${year}`;

                  return (
                    <div className="bg-white p-4 rounded-lg shadow" key={index}>
                      <h2 className="text-xl font-semibold">
                        Đơn hàng #{item.id}
                      </h2>
                      <p className="text-gray-600">
                        Trạng thái đơn hàng:
                        <span
                          className={clsx("ml-2", {
                            "text-gray-500 text-lg font-semibold":
                              item.orderStatus === "Đang xử lý",
                            "text-yellow-500 text-lg font-semibold":
                              item.orderStatus === "Đang chuẩn bị",
                            "text-sky-500 text-lg font-semibold":
                              item.orderStatus === "Đang giao hàng",
                            "text-red-500 text-lg font-semibold":
                              item.orderStatus === "Đã huỷ",
                            "text-green-500 text-lg font-semibold":
                              item.orderStatus === "Hoàn thành",
                          })}
                        >
                          {item.orderStatus}
                        </span>
                      </p>
                      <p className="text-gray-600">
                        Trạng thái thanh toán:
                        <span
                          className={clsx("ml-2", {
                            "text-gray-500 text-lg font-semibold":
                              item.paymentStatus === "Chưa thanh toán",
                            "text-green-500 text-lg font-semibold":
                              item.paymentStatus === "Đã thanh toán",
                          })}
                        >
                          {item.paymentStatus}
                        </span>
                      </p>
                      <p className="text-gray-600 mt-2">
                        Ngày đặt hàng:{" "}
                        {formattedDate ? formattedDate : item.createdAt}
                      </p>
                      <p className="text-gray-600">
                        Tổng tiền: {item.totalPrice}$
                      </p>
                      <div className="flex mt-3">
                        <Button
                          variant={TBUTTON_VARIANT.PRIMARY}
                          onClick={() => {
                            handleOpenModalOrderDetail(item);
                          }}
                        >
                          Xem chi tiết
                        </Button>
                        {item.paymentStatus !== "Đã thanh toán" && (
                          <Button
                            variant={TBUTTON_VARIANT.PRIMARY}
                            onClick={() => handleOpenModalPaymentOnline(item)}
                          >
                            Thanh toán online
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <Image src={cartEmpty} className={"!w-[400px] rounded-lg"} />
                  <h3 className="text-white font-semibold text-xl my-4">
                    Giỏ hàng của bạn đang trống.
                  </h3>
                  <p className="text-gray-400 font-semibold text-base text-center">
                    Có vẻ như bạn chưa thêm bất cứ thứ gì vào giỏ hàng của mình.
                    <br />
                    Hãy tiếp tục và khám phá các sản phẩm của chúng tôi.
                  </p>
                  <div className="flex mt-6 justify-center">
                    <Button
                      variant={TBUTTON_VARIANT.PRIMARY}
                      to={"/"}
                      onClick={() => WindowScrollTop()}
                    >
                      Trang Chủ
                    </Button>
                    <Button
                      variant={TBUTTON_VARIANT.PRIMARY}
                      to={"/menu"}
                      onClick={() => WindowScrollTop()}
                    >
                      Mua sắm ngay
                    </Button>
                  </div>
                </div>
              )}
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
                    onChange={() => {}}
                    hidden={"true"}
                    {...item}
                  />
                );
              }

              if (item.type === "file") {
                return (
                  <InputFile
                    key={index}
                    value={dataRead[item.name]}
                    onChange={() => {}}
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
                    onChange={() => {}}
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
                  onChange={() => {}}
                  onlyRead={"true"}
                  clear={() => {}}
                  {...item}
                />
              );
            })}
          </div>
          <div className="flex justify-end">
            <Button
              variant={TBUTTON_VARIANT.PRIMARY}
              onClick={handleCloseModalRead}
            >
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

      {/* detail order */}
      {openModalOrdersDetail && (
        <Modal open={openModalOrdersDetail} close={handleCloseModalOrderDetail}>
          <div className="bg-white p-4 rounded shadow-lg mb-4">
            <div className="px-4 py-6 order-detail">
              <Heading variant={"primary"}>Chi tiết đơn hàng</Heading>
              <div className="mb-4 mt-3">
                <div className="mb-4 flex">
                  <h3 className="text-lg font-semibold mb-2 mr-6">
                    Mã order:{" "}
                    <span className="text-base text-gray-600 font-medium">
                      #
                      {dataOrderDetail && dataOrderDetail.id
                        ? dataOrderDetail.id
                        : Math.floor(Math.random() * 999)}
                    </span>
                  </h3>
                  <h3 className="text-lg font-semibold mb-2">
                    Ngày đặt hàng:{" "}
                    <span className="text-base text-gray-600 font-medium">
                      {dataOrderDetail && dataOrderDetail.createdAt}
                    </span>
                  </h3>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Phí dịch vụ:{" "}
                    <span className="text-base text-gray-600 font-medium">
                      {dataOrderDetail && dataOrderDetail.servicesFee
                        ? `${dataOrderDetail.servicesFee}$`
                        : "0$"}
                    </span>
                  </h3>
                </div>
                <div className="mb-4 flex-col">
                  <h3 className="text-lg font-semibold mb-2 mr-6">
                    Địa chỉ nhận hàng:{" "}
                    <span className="text-base text-gray-600 font-medium">
                      {dataOrderDetail && dataOrderDetail.deliveryAddress}
                    </span>
                  </h3>
                  <h3 className="text-lg font-semibold mb-2">
                    Thông tin liên hệ:{" "}
                    <span className="text-base text-gray-600 font-medium">
                      {dataOrderDetail && dataOrderDetail.contactInfo}
                    </span>
                  </h3>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Trạng thái đơn hàng:{" "}
                    <span className="text-base text-gray-600 font-medium">
                      {dataOrderDetail && dataOrderDetail.orderStatus}
                    </span>
                  </h3>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Phương thức thanh toán:{" "}
                    <span className="text-base text-gray-600 font-medium">
                      {dataOrderDetail && dataOrderDetail.paymentMethod}
                    </span>
                  </h3>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Trạng thái đơn hàng:{" "}
                    <span className="text-base text-gray-600 font-medium">
                      {dataOrderDetail && dataOrderDetail.paymentStatus}
                    </span>
                  </h3>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Ngày thanh toán:{" "}
                    <span className="text-base text-gray-600 font-medium">
                      {dataOrderDetail && dataOrderDetail.paymentDate
                        ? dataOrderDetail.paymentDate
                        : "Chưa thanh toán"}
                    </span>
                  </h3>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Thông tin shipper:{" "}
                    <span className="text-base text-gray-600 font-medium">
                      Huệ hay hát
                    </span>
                  </h3>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Ghi chú</h3>
                  <p>{dataOrderDetail && dataOrderDetail.note}</p>
                </div>

                <h3 className="text-lg font-semibold mb-2">
                  Chi tiết sản phẩm
                </h3>
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
                    {listPurchasedItems.length > 0 &&
                      listPurchasedItems.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td className="p-2 border">{item.name}</td>
                            <td className="p-2 border">{item.quantity}</td>
                            <td className="p-2 border">{item.size}</td>
                            <td className="p-2 border">{`${item.price}$`}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>

                <div className="my-4 flex justify-end">
                  <h3 className="text-lg font-semibold mb-2">
                    Tổng hóa đơn:{" "}
                    <span className="text-base text-gray-600 font-medium">
                      {dataOrderDetail && `${dataOrderDetail.totalPrice}$`}
                    </span>
                  </h3>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              {dataOrderDetail &&
                dataOrderDetail.orderStatus &&
                dataOrderDetail.orderStatus === "Đang xử lý" && (
                  <Fragment>
                    <Button
                      variant={TBUTTON_VARIANT.PRIMARY}
                      onClick={() =>
                        handleShowModalCancelOrder(dataOrderDetail)
                      }
                    >
                      Huỷ đơn hàng
                    </Button>
                    <Button
                      variant={TBUTTON_VARIANT.PRIMARY}
                      onClick={() => {
                        setOpenModalOrdersDetail(false);
                        setRefreshPayment(!refreshPayment);
                        setOpenModalChangeInfoOrder(true);
                      }}
                    >
                      Thay đổi thông tin nhận hàng
                    </Button>
                  </Fragment>
                )}
              <Button
                variant={TBUTTON_VARIANT.PRIMARY}
                onClick={() => {}}
              >
                Xuất bill
              </Button>
              <Button
                variant={TBUTTON_VARIANT.PRIMARY}
                onClick={handleCloseModalOrderDetail}
              >
                Thoát
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* cancle order */}
      {openModalCancelOrder && (
        <Modal
          open={openModalCancelOrder}
          close={() => setOpenModalCancelOrder(false)}
        >
          <Heading variant={"primary"}>Huỷ đơn hàng</Heading>
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold mr-3">Chú ý!</strong>
            <span className="block sm:inline">
              Bạn có chắc chắn muốn huỷ đơn hàng này không?
            </span>
          </div>
          <div className="flex justify-end mt-3">
            <Button
              variant={TBUTTON_VARIANT.PRIMARY}
              onClick={() => handleDeletePayment(idDelete)}
            >
              Xác nhận
            </Button>
            <Button
              variant={TBUTTON_VARIANT.PRIMARY}
              onClick={() => setOpenModalCancelOrder(false)}
            >
              Thoát
            </Button>
          </div>
        </Modal>
      )}

      {openModalDeleteOrderSuccess && (
        <Modal
          open={openModalDeleteOrderSuccess}
          close={handleCloseModalDeleteSuccess}
        >
          <Heading variant={"primary"}>Huỷ đơn hàng thành công</Heading>
          <div
            className="bg-green-200 border border-green-600 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold mr-3">Thành công!</strong>
            <span className="block sm:inline">
              Đơn hàng của bạn đã được huỷ thành công.
            </span>
          </div>
        </Modal>
      )}

      {/* modal change info  */}
      {openModalChangeInfoOrder && (
        <Modal
          open={openModalChangeInfoOrder}
          close={handleCloseModalChangeInfoOrder}
        >
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
              <Button variant={TBUTTON_VARIANT.PRIMARY}>Xác nhận</Button>
              <Button
                variant={TBUTTON_VARIANT.PRIMARY}
                onClick={handleCloseModalChangeInfoOrder}
              >
                Hủy
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {openModalChangeInfoOrderSuccess && (
        <Modal
          open={openModalChangeInfoOrderSuccess}
          close={handleCloseModalChangeInfoSuccess}
        >
          <Heading variant={"primary"}>Địa chỉ nhận hàng</Heading>
          <div
            className="bg-green-200 border border-green-600 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold mr-3">Thành công!</strong>
            <span className="block sm:inline">
              Địa chỉ nhận hàng của bạn đã được thay đổi thành công.
            </span>
          </div>
        </Modal>
      )}

      {/* payment online */}
      <Modal
        open={openModalPaymentOnline}
        close={handleCloseModalPaymentOnline}
      >
        <form autoComplete="off" onSubmit={() => {}}>
          <Heading variant={"primary"}>Thanh toán online</Heading>
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-8 mb-4"
            role="alert"
          >
            <strong className="font-bold mr-3">Chú ý!</strong>
            <span className="block sm:inline">
              Hãy nhập đầy đủ các dữ liệu trước khi thanh toán
            </span>
          </div>
          <div className="flex flex-wrap justify-between">
            {inputsPaymentOnline.map((item, index) => {
              if (item.name === "note") {
                return (
                  <TextareaField
                    key={index}
                    className={"!w-full mx-8"}
                    value={values[item.name]}
                    onChange={onChangeInputPaymentOnline}
                    onClick={() => {}}
                    {...item}
                  />
                );
              }

              // totalPrice
              if (item.name === "totalPrice") {
                return (
                  <InputField
                    key={index}
                    className={"!w-2/5 mx-8"}
                    onChange={onChangeInputPaymentOnline}
                    value={values[item.name]}
                    onClick={() => {}}
                    clear={() => handleClearInputPaymentOnline(item.name)}
                    onlyRead={"true"}
                    {...item}
                  />
                );
              }

              if (item.name === "contactInfo") {
                return (
                  <InputField
                    key={index}
                    className={"!w-full mx-8"}
                    value={values[item.name]}
                    onChange={onChangeInputPaymentOnline}
                    onClick={() => {}}
                    autoFill={handleGetCurrentContact}
                    clear={() => handleClearInputPaymentOnline(item.name)}
                    {...item}
                  />
                );
              }

              return (
                <InputField
                  key={index}
                  className={"!w-2/5 mx-8"}
                  value={values[item.name]}
                  onChange={onChangeInputPaymentOnline}
                  onClick={() => {}}
                  clear={() => handleClearInputPaymentOnline(item.name)}
                  {...item}
                />
              );
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
                  {listPurchasedItems.length > 0 &&
                    listPurchasedItems.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="p-2 border">{item.name}</td>
                          <td className="p-2 border">{item.quantity}</td>
                          <td className="p-2 border">{item.size}</td>
                          <td className="p-2 border">{`${item.price}$`}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>

          {values.deliveryAddress !== "" && values.contactInfo !== "" && (
            <div className="mt-7">
              <Paypal
                totalPrice={values && values.totalPrice}
                payload={{
                  id: idUpdatePayment,
                  contactInfo: values?.contactInfo,
                  deliveryAddress: values?.deliveryAddress,
                  note: values && values?.note,
                  purchasedItems: values && values?.purchasedItems,
                  userId: dataUser ? dataUser.user.id : null,
                  totalPrice: values && values.totalPrice,
                  paymentDate: new Date(),
                }}
              />
            </div>
          )}
        </form>
      </Modal>

      <Modal
        open={paymentOnlineSuccess}
        custom
        close={handleCloseModalPaymentOnlineSuccess}
      >
        {showCongrat && <Congrat />}
        <div className="flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <p className="text-lg font-semibold text-green-600">
                Thanh toán thành công
              </p>
            </div>
            <Image src={imgShipper} className={"mx-auto mb-4 w-52 my-3"} />
            <div className="mt-4">
              <p className="text-gray-700 text-center">
                Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.
                <br />
                Đơn hàng của bạn đang được xử lý. Vui lòng đợi trong ít phút.
              </p>
            </div>
            <div className="mt-6 flex justify-start">
              <Button
                variant={TBUTTON_VARIANT.PRIMARY}
                to={"/profile"}
                onClick={() => {
                  handleCloseModalPaymentOnlineSuccess();
                  WindowScrollTop();
                }}
              >
                Xem đơn hàng của bạn
              </Button>
              <Button
                variant={TBUTTON_VARIANT.PRIMARY}
                onClick={() => {
                  handleCloseModalPaymentOnlineSuccess();
                  WindowScrollTop();
                }}
              >
                Thoát
              </Button>
            </div>
          </div>
        </div>
      </Modal>

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

export default Profile;
