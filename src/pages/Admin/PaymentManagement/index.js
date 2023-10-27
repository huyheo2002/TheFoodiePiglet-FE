import { Fragment, useEffect, useState } from "react";
import DataTable from "../../../components/DataTable";
import * as productServices from "../../../services/productServices";
import * as categoryServices from "../../../services/categoryServices";
import {
  BookOpenIcon,
  DotHorizontalIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "../../../components/Icons";
import Modal from "../../../components/Modal";
import Heading from "../../../components/Heading";
import InputField from "../../../components/FormControl/InputField";
import InputFile from "../../../components/FormControl/inputFile";
import Button from "../../../components/Button";
import InputRadio from "../../../components/FormControl/inputRadio";
import { useNavigate } from "react-router-dom";
import * as paymentServices from "../../../services/paymentServices";
import TextareaField from "../../../components/FormControl/textAreaField";
import DatePicker from "../../../components/FormControl/datePicker";
import useLocalStorage from "../../../hooks/useLocalStorage";
import * as commonServices from "../../../services/commonServices";
import * as permissionServices from "../../../services/permissionServices";

function PaymentManagement() {
  const navigate = useNavigate();

  const currentPermissionGroup = "quan-ly-hoa-don";
  const [dataUser, setDataUser] = useLocalStorage("dataUser", "");
  const [dataUserDecoded, setDataUserDecoded] = useState(null);
  const [listPermissionOfUser, setListPermissionOfUser] = useState([]);
  const [listPermissionCurrentInPage, setListPermissionCurrentInPage] = useState([]);

  const [listPayments, setListPayments] = useState([])
  const [listPaymentsCompact, setListPaymentsCompact] = useState([])
  const [valuesCreate, setValuesCreate] = useState({});

  // inputs products
  const inputs = [
    {
      id: 1,
      name: "paymentDate",
      type: "date",
      placeholder: "Enter your payment date",
      label: "Payment Date",
      // required: true,
    },
    {
      id: 2,
      name: "totalPrice",
      type: "text",
      placeholder: "Enter your total price",
      label: "Total Price",
      required: true,
    },
    // {
    //   id: 3,
    //   name: "discountCode",
    //   type: "text",
    //   placeholder: "Enter your discount code",
    //   label: "Discount Code",
    //   // required: true,
    // },
    // {
    //   id: 4,
    //   name: "serviceFee",
    //   type: "text",
    //   placeholder: "Enter your service fee",
    //   label: "Sercice Fee",
    //   // required: true,
    // },
    {
      id: 5,
      name: "deliveryAddress",
      type: "text",
      placeholder: "Enter your delivery address",
      label: "Delivery Address",
      required: true,
    },
    {
      id: 6,
      name: "contactInfo",
      type: "text",
      placeholder: "Enter your contact infomation",
      label: "Contact Infomation",
      required: true,
    },
    {
      id: 7,
      name: "paymentMethod",
      type: "radio",
      placeholder: "Enter your payment method",
      label: "Payment method",
    },
    {
      id: 8,
      name: "paymentStatus",
      type: "radio",
      placeholder: "Enter your payment status",
      label: "Payment status",
    },
    {
      id: 9,
      name: "orderStatus",
      type: "radio",
      placeholder: "Enter your order status",
      label: "Order status",
    },
    {
      id: 10,
      name: "note",
      type: "text",
      placeholder: "Enter your note",
      label: "Note",
    },
    {
      id: 11,
      name: "purchasedItems",
      type: "text",
      placeholder: "Enter your purchased Items",
      label: "Purchased Items",
    },


  ];

  // list radio
  const listPaymentMethod = ["Thanh toán trực tiếp", "Thanh toán online"];
  const listOrderStatus = ["Đang xử lý", "Đang chuẩn bị", "Đang giao hàng", "Đã hủy", "Hoàn thành"];
  const listPaymentStatus = ["Chưa thanh toán", "Đã thanh toán"];

  const [paymentMethodSelected, setPaymentMethodSelected] = useState("");
  const [orderStatusSelected, setOrderStatusSelected] = useState("");
  const [paymentStatusSelected, setPaymentStatusSelected] = useState("");

  // item purchased
  const [listPurchasedItems, setListPurchasedItems] = useState([]);

  const [openModalRead, setOpenModalRead] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  // data CURD
  const [dataRead, setDataRead] = useState({});
  const [valuesUpdate, setValuesUpdate] = useState({});
  const [idPaymentDelete, setIdPaymentDelete] = useState(-1);

  // decoded and handle permission
  const decoded = async () => {
    const respon = await commonServices.handleDecoded(dataUser.token);
    // console.log("respon.decoded", respon)
    if (respon && respon.errCode === 0) {
      setDataUserDecoded(respon.decoded);

      // handle permissions
      const dataListPermission = respon.decoded.permissions || [];
      let splitFields =
        dataListPermission.length > 0 &&
        dataListPermission.map((item) => {
          if (item.Permission) {
            item.permissionName = item.Permission.name;
            item.permissionGroupId = item.Permission.permissionGroupId;

            delete item.Permission;
          }

          return item;
        });

      // show full info
      if (splitFields.length > 0) {
        setListPermissionOfUser(splitFields)
      }
    }
  };

  const handleGetAllPermissionInPage = async () => {
    const respon = await permissionServices.getAllPermissionGroup();
    // console.log("respon permission group", respon);
    if (respon && respon.errCode == 0) {
      const dataPermissionGroup = respon.permissionGroup || [];

      const filterCurrentPermissionGroup = dataPermissionGroup.length > 0 && dataPermissionGroup.filter((item) => item.keyword === currentPermissionGroup);
      // console.log("filterCurrentPermissionGroup", filterCurrentPermissionGroup);

      if (filterCurrentPermissionGroup.length > 0) {
        const responPermission = await permissionServices.getAllPermission();
        if (responPermission && responPermission.errCode == 0) {
          const dataPermission = responPermission.permission || [];

          const filterCurrentPermission = dataPermission.length > 0 && dataPermission.filter(item => item.permissionGroupId === filterCurrentPermissionGroup[0].id)

          if (filterCurrentPermission.length > 0) {
            setListPermissionCurrentInPage(filterCurrentPermission);
          }
        }
      }
    }
  }

  // console.log("listPermissionCurrentInPage", listPermissionCurrentInPage);

  useEffect(() => {
    decoded();
    handleGetAllPermissionInPage();
  }, [])

  // console.log("listPermissionOfUser", listPermissionOfUser);

  const fetchListPayments = async () => {
    const respon = await paymentServices.getAllPayment() ?? null;
    if (respon) {
      console.log("respon detail payments", respon)
      setListPayments(respon.payments)
    }
  }

  const fetchListPaymentsCompact = async () => {
    const respon = await paymentServices.getAllPaymentCompact() ?? null;
    if (respon && respon.errCode === 0) {
      const dataListPayments = respon.payments || [];
      let splitFields =
        dataListPayments.length > 0 &&
        dataListPayments.map((item) => {
          if (item.totalPrice) {
            item.totalPrice = `${item.totalPrice} $`;
          }

          if (item.paymentDate) {
            item.paymentDate = item.paymentDate;
          } else {
            item.paymentDate = "Chưa thanh toán";
          }

          return item;
        });

      // show full info
      if (splitFields.length > 0) {
        setListPaymentsCompact(splitFields)
      }
    }
  }

  useEffect(() => {
    fetchListPayments();
    fetchListPaymentsCompact();
  }, [])

  // modal create user
  const handleOpenModalCreate = () => {
    setOpenModalCreate(true);
  };

  const handleCloseModalCreate = () => {
    setOpenModalCreate(false);
  };

  const onChangeInputCreate = (e) => {
    setValuesCreate({ ...valuesCreate, [e.target.name]: e.target.value });
  };

  const inputCreateClear = (getKey) => {
    setValuesCreate({ ...valuesCreate, [getKey]: "" });
  };

  // -- input update
  const onChangeInputUpdate = (e) => {
    setValuesUpdate({ ...valuesUpdate, [e.target.name]: e.target.value });
  };

  const inputUpdateClear = (getKey) => {
    setValuesUpdate({ ...valuesUpdate, [getKey]: "" });
  };

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

  // -- modal read
  const handleOpenModalRead = (id) => {
    setOpenModalRead(true);
    let filterPayment =
      listPayments.length > 0 &&
      listPayments.filter((item) => item.id === id);

    if (filterPayment) {
      filterPayment = filterPayment.map((item) => {
        const sanitizedUser = {};
        for (const key in item) {
          if (item[key] === null || item[key] === undefined) {
            sanitizedUser[key] = '';
          } else {
            sanitizedUser[key] = item[key];
          }
        }
        return sanitizedUser;
      });

      const purchasedItems = handleListPurchasedItems(filterPayment[0].purchasedItems)
      // console.log("purchasedItems", purchasedItems)
      setListPurchasedItems(purchasedItems)
    }

    if (filterPayment.length > 0) {
      setDataRead(filterPayment[0]);
    }
  };

  const handleCloseModalRead = () => {
    setOpenModalRead(false);
  };

  // modal update user
  const handleOpenModalUpdate = (id) => {
    setOpenModalUpdate(true);
    let filterPayment =
      listPayments.length > 0 &&
      listPayments.filter((item) => item.id === id);

    if (filterPayment) {
      filterPayment = filterPayment.map((item) => {
        const sanitizedUser = {};
        for (const key in item) {
          if (item[key] === null || item[key] === undefined) {
            sanitizedUser[key] = '';
          } else {
            sanitizedUser[key] = item[key];
          }
        }
        return sanitizedUser;
      });

      const purchasedItems = handleListPurchasedItems(filterPayment[0].purchasedItems)
      // console.log("purchasedItems", purchasedItems)
      setListPurchasedItems(purchasedItems)
    }

    if (filterPayment.length > 0) {
      setValuesUpdate(filterPayment[0]);
    }
  };

  const handleCloseModalUpdate = () => {
    setOpenModalUpdate(false);
    setPaymentMethodSelected("");
    setPaymentStatusSelected("");
    setOrderStatusSelected("");
  };

  const handleOpenModalDelete = (id) => {
    setOpenModalDelete(true);
    setIdPaymentDelete(id);
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  // input radio :v
  const handleGetValuePaymentMethod = (currentValue) => {
    setPaymentMethodSelected(currentValue);
  };

  const handleGetValuePaymentStatus = (currentValue) => {
    setPaymentStatusSelected(currentValue);
  };

  const handleGetValueOrderStatus = (currentValue) => {
    setOrderStatusSelected(currentValue);
  };

  const handleSubmitChangeInfoOrder = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target);
    const dataEntry = Object.fromEntries(data.entries());

    if (valuesUpdate) {
      data.set("id", valuesUpdate.id)
    }

    if (dataEntry.totalPrice) {
      let totalPrice = dataEntry.totalPrice;
      totalPrice = totalPrice.replace("$", "").trim();
      data.set("totalPrice", totalPrice)
    }

    // console.log("data:", data);
    console.log("data entry:", Object.fromEntries(data.entries()));

    try {
      const respon = await paymentServices.handleUpdateOrder(data);
      if (respon && respon.errCode === 0) {
        handleCloseModalUpdate();
        fetchListPayments();
        fetchListPaymentsCompact();
      } else if (respon.errCode !== 0) {
        alert(respon.message);
      }
    } catch (error) {
      console.log(error)
    }
  }

  // handle delete orders 
  const handleDeletePayment = async (e) => {
    e.preventDefault();

    try {
      const respon = await paymentServices.handleDeletePayment(idPaymentDelete);
      if (respon && respon.errCode === 0) {
        handleCloseModalDelete();
        setIdPaymentDelete(-1);
        fetchListPayments();
        fetchListPaymentsCompact();
      } else if (respon.errCode === 1) {
        alert("Huỷ đơn hàng thất bại")
      }
    } catch (error) {
      console.log("err", error)
    }
  }

  return (
    <Fragment>
      <div className="pl-3 w-[calc(100%-1rem)]">
        <div className="bg-white px-3 py-4 rounded-lg">
          <h1 className="text-2xl font-semibold capitalize">
            Payment Management
          </h1>
          {listPaymentsCompact.length > 0 && (
            <DataTable
              data={listPaymentsCompact}
              btnCreateTitle={"Create Payment"}
              handleModalCreate={handleOpenModalCreate}
              handleModalRead={handleOpenModalRead}
              handleModalEdit={handleOpenModalUpdate}
              handleModalDelete={handleOpenModalDelete}
              // permission
              listPermission={listPermissionOfUser}
              listPermissionCurrentInPage={listPermissionCurrentInPage}
            />
          )}
        </div>
      </div>

      {openModalCreate && (
        <Modal open={openModalCreate} close={handleCloseModalCreate}>
          <form autoComplete="off" onSubmit={() => { }}>
            <Heading variant={"primary"}>Create payment</Heading>
            <div className="flex flex-col justify-center items-center mb-4">
              <p className="text-lg font-semibold text-black">Oops!</p>
              <p className="mt-2 text-base font-semibold text-black">Bạn phải đăng nhập với tài khoản User đã được cấp để thực thi chức năng này!</p>
            </div>

            <div className="flex justify-end">
              <Button variant={"primary"} onClick={handleCloseModalCreate}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* modal read */}
      {openModalRead && (
        <Modal open={openModalRead} close={handleCloseModalRead}>
          <Heading variant={"primary"}>Information payment detail</Heading>
          <div className="">
            {inputs.map((item, index) => {
              if (item.name === "paymentDate") {
                if (!dataRead[item.name]) {
                  return (
                    <InputField
                      key={index}
                      value={"Chưa thanh toán"}
                      onClick={() => { }}
                      onChange={() => { }}
                      onlyRead={"true"}
                      {...item}
                      type="text"
                    />
                  );
                } else {
                  // return <DatePicker
                  //   key={index}
                  //   value={dataRead[item.name]}
                  //   onChange={() => {}}
                  //   {...item}
                  // />
                }
              }

              if (item.name === "note") {
                return (
                  <TextareaField
                    key={index}
                    value={dataRead[item.name]}
                    onChange={() => { }}
                    onClick={() => { }}
                    onlyRead={"true"}
                    {...item}
                  />
                )
              }

              if (item.name === "totalPrice") {
                return (
                  <InputField
                    key={index}
                    value={`${dataRead[item.name]} $`}
                    onClick={() => { }}
                    onChange={() => { }}
                    onlyRead={"true"}
                    {...item}
                  />
                );
              }

              if (item.type === "radio" && item.name === "paymentMethod") {
                const getDataFromPayment =
                  listPaymentMethod.length > 0 &&
                  listPaymentMethod.map((option) => {
                    return {
                      value: option,
                      label: option,
                    };
                  });

                let paymentChecked = null;
                if (dataRead) {
                  let filterNamePayment =
                    getDataFromPayment.length > 0 &&
                    getDataFromPayment.filter(
                      (payment) => payment.label == dataRead.paymentMethod
                    );
                  if (filterNamePayment.length > 0) {
                    paymentChecked = filterNamePayment[0].value;
                  }
                }

                return (
                  <InputRadio
                    key={index}
                    options={getDataFromPayment}
                    onChange={handleGetValuePaymentMethod}
                    checked={paymentChecked}
                    disable
                    {...item}
                    id={Math.floor(Math.random() * 10)}
                  />
                );
              }

              if (item.type === "radio" && item.name === "paymentStatus") {
                const getDataFromPayment =
                  listPaymentStatus.length > 0 &&
                  listPaymentStatus.map((option) => {
                    return {
                      value: option,
                      label: option,
                    };
                  });

                let paymentChecked = null;
                if (dataRead) {
                  let filterNamePayment =
                    getDataFromPayment.length > 0 &&
                    getDataFromPayment.filter(
                      (payment) => payment.label == dataRead.paymentStatus
                    );
                  if (filterNamePayment.length > 0) {
                    paymentChecked = filterNamePayment[0].value;
                  }
                }

                return (
                  <InputRadio
                    key={index}
                    options={getDataFromPayment}
                    onChange={handleGetValuePaymentStatus}
                    checked={paymentChecked}
                    disable
                    {...item}
                    id={Math.floor(Math.random() * 10)}
                  />
                );
              }

              if (item.type === "radio" && item.name === "orderStatus") {
                const getDataFromPayment =
                  listOrderStatus.length > 0 &&
                  listOrderStatus.map((option) => {
                    return {
                      value: option,
                      label: option,
                    };
                  });

                let paymentChecked = null;
                if (dataRead) {
                  let filterNamePayment =
                    getDataFromPayment.length > 0 &&
                    getDataFromPayment.filter(
                      (payment) => payment.label == dataRead.orderStatus
                    );
                  if (filterNamePayment.length > 0) {
                    paymentChecked = filterNamePayment[0].value;
                  }
                }

                return (
                  <InputRadio
                    key={index}
                    options={getDataFromPayment}
                    onChange={handleGetValueOrderStatus}
                    checked={paymentChecked}
                    disable
                    {...item}
                    id={Math.floor(Math.random() * 10)}
                  />
                );
              }

              if (item.name === "purchasedItems") {
                return (
                  <div key={index} className="mb-3">
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
                        {listPurchasedItems.length > 0 && listPurchasedItems.map((itemPurchased, indexItem) => {
                          return <tr key={indexItem}>
                            <td className="p-2 border">{itemPurchased.name}</td>
                            <td className="p-2 border">{itemPurchased.quantity}</td>
                            <td className="p-2 border">{itemPurchased.size}</td>
                            <td className="p-2 border">{`${itemPurchased.price}$`}</td>
                          </tr>
                        })}
                      </tbody>
                    </table>
                  </div>
                )
              }

              return (
                <InputField
                  key={index}
                  value={dataRead[item.name]}
                  onClick={() => { }}
                  onChange={() => { }}
                  onlyRead={"true"}
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

      {/* modal update */}
      {openModalUpdate && (
        <Modal open={openModalUpdate} close={handleCloseModalUpdate}>
          <form autoComplete="off" onSubmit={handleSubmitChangeInfoOrder}>
            <Heading variant={"primary"}>Update payment</Heading>
            <div className="">
              {inputs.map((item, index) => {
                console.log("values update", valuesUpdate);
                let checkPaymentStatus = false;
                if (valuesUpdate.paymentStatus === "Đã thanh toán") {
                  checkPaymentStatus = true;
                }
                let checkOrderStatus = false;
                if (valuesUpdate.orderStatus === "Hoàn thành") {
                  checkOrderStatus = true;;
                }

                if (item.name === "paymentDate") {
                  const dateObject = new Date(valuesUpdate[item.name]);

                  const year = dateObject.getUTCFullYear();
                  const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, "0");
                  const day = dateObject.getUTCDate().toString().padStart(2, "0");

                  const formattedDate = `${year}-${month}-${day}`;

                  if (!valuesUpdate[item.name]) {
                    return (
                      <InputField
                        key={index}
                        value={"Chưa thanh toán"}
                        onClick={() => { }}
                        onChange={() => { }}
                        onlyRead={"true"}
                        {...item}
                        type="text"
                      />
                    );
                  } else {
                    return <DatePicker
                      key={index}
                      value={formattedDate}
                      onClick={() => { }}
                      onChange={() => { }}
                      onlyRead={"true"}
                      {...item}
                    />
                  }
                }

                if (item.name === "note") {
                  return (
                    <TextareaField
                      key={index}
                      value={valuesUpdate[item.name]}
                      onChange={() => { }}
                      onClick={() => { }}
                      onlyRead={"true"}
                      {...item}
                    />
                  )
                }

                if (item.name === "totalPrice") {
                  return (
                    <InputField
                      key={index}
                      value={`${valuesUpdate[item.name]} $`}
                      onClick={() => { }}
                      onChange={() => { }}
                      onlyRead={"true"}
                      {...item}
                    />
                  );
                }

                if (item.type === "radio" && item.name === "paymentMethod") {
                  const getDataFromPayment =
                    listPaymentMethod.length > 0 &&
                    listPaymentMethod.map((option) => {
                      return {
                        value: option,
                        label: option,
                      };
                    });

                  let paymentChecked = null;
                  if (valuesUpdate) {
                    let filterNamePayment =
                      getDataFromPayment.length > 0 &&
                      getDataFromPayment.filter(
                        (payment) => payment.label == valuesUpdate.paymentMethod
                      );
                    if (filterNamePayment.length > 0) {
                      paymentChecked = filterNamePayment[0].value;
                    }
                  }

                  return (
                    <InputRadio
                      key={index}
                      options={getDataFromPayment}
                      onChange={handleGetValuePaymentMethod}
                      checked={paymentMethodSelected !== "" ? paymentMethodSelected : paymentChecked}
                      edit={true}
                      disable={checkPaymentStatus ?? false}
                      {...item}
                      id={Math.floor(Math.random() * 10)}
                    />
                  );
                }

                if (item.type === "radio" && item.name === "paymentStatus") {
                  const getDataFromPayment =
                    listPaymentStatus.length > 0 &&
                    listPaymentStatus.map((option) => {
                      return {
                        value: option,
                        label: option,
                      };
                    });

                  let paymentChecked = null;
                  if (valuesUpdate) {
                    let filterNamePayment =
                      getDataFromPayment.length > 0 &&
                      getDataFromPayment.filter(
                        (payment) => payment.label == valuesUpdate.paymentStatus
                      );
                    if (filterNamePayment.length > 0) {
                      paymentChecked = filterNamePayment[0].value;
                    }
                  }

                  return (
                    <InputRadio
                      key={index}
                      options={getDataFromPayment}
                      onChange={handleGetValuePaymentStatus}
                      checked={paymentStatusSelected !== "" ? paymentStatusSelected : paymentChecked}
                      edit={true}
                      disable={checkPaymentStatus ?? false}
                      {...item}
                      id={Math.floor(Math.random() * 10)}
                    />
                  );
                }

                if (item.type === "radio" && item.name === "orderStatus") {
                  const getDataFromPayment =
                    listOrderStatus.length > 0 &&
                    listOrderStatus.map((option) => {
                      return {
                        value: option,
                        label: option,
                      };
                    });

                  let paymentChecked = null;
                  if (valuesUpdate) {
                    let filterNamePayment =
                      getDataFromPayment.length > 0 &&
                      getDataFromPayment.filter(
                        (payment) => payment.label == valuesUpdate.orderStatus
                      );
                    if (filterNamePayment.length > 0) {
                      paymentChecked = filterNamePayment[0].value;
                    }
                  }

                  return (
                    <InputRadio
                      key={index}
                      options={getDataFromPayment}
                      onChange={handleGetValueOrderStatus}
                      checked={orderStatusSelected !== "" ? orderStatusSelected : paymentChecked}
                      edit={true}
                      disable={checkOrderStatus ?? false}
                      {...item}
                      id={Math.floor(Math.random() * 10)}
                    />
                  );
                }

                if (item.name === "purchasedItems") {
                  return (
                    <div key={index} className="mb-3">
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
                          {listPurchasedItems.length > 0 && listPurchasedItems.map((itemPurchased, indexItem) => {
                            return <tr key={indexItem}>
                              <td className="p-2 border">{itemPurchased.name}</td>
                              <td className="p-2 border">{itemPurchased.quantity}</td>
                              <td className="p-2 border">{itemPurchased.size}</td>
                              <td className="p-2 border">{`${itemPurchased.price}$`}</td>
                            </tr>
                          })}
                        </tbody>
                      </table>
                    </div>
                  )
                }

                if (item.name === "deliveryAddress" || item.name === "contactInfo") {
                  return (
                    <InputField
                      key={index}
                      value={valuesUpdate[item.name]}
                      clear={() => inputUpdateClear(item.name)}
                      onChange={onChangeInputUpdate}
                      {...item}
                    />
                  )
                }

                return (
                  <InputField
                    key={index}
                    value={valuesUpdate[item.name]}
                    onClick={() => { }}
                    onChange={() => { }}
                    onlyRead={"true"}
                    {...item}
                  />
                );
              })}
            </div>

            <div className="flex justify-end">
              <Button variant={"primary"}>Submit</Button>
              <Button variant={"primary"} onClick={handleCloseModalUpdate}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* modal delete  */}
      {openModalDelete && (
        <Modal open={openModalDelete} close={handleCloseModalDelete}>
          <form autoComplete="off" onSubmit={handleDeletePayment}>
            <Heading variant={"primary"}>Confirm DELETE the Payment</Heading>
            <div className="my-3 mx-2">
              <p className="text-xl font-semibold capitalize mb-3">
                Are you sure delete this payment
              </p>

              {/* input id clone */}
              <InputField
                type="text"
                name="id"
                hidden="true"
                value={idPaymentDelete}
                onChange={() => { }}
              />
            </div>
            {/* footer */}
            <div className="flex justify-end">
              <Button variant={"primary"}>Submit</Button>
              <Button variant={"primary"} onClick={handleCloseModalDelete}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </Fragment>
  );
}

export default PaymentManagement;