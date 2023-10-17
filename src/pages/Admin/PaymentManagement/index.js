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

function PaymentManagement() {
  const navigate = useNavigate();
  const [listPayments, setListPayments] = useState([])
  const [listPaymentsCompact, setListPaymentsCompact] = useState([])
  const [valuesCreate, setValuesCreate] = useState({});

  const manyFeatures = [
    {
      name: "read",
      icon: <BookOpenIcon />,
    },
    {
      name: "edit",
      icon: <PencilIcon />,
    },
    {
      name: "delete",
      icon: <TrashIcon />,
    },
    {
      name: "infoUser",
      icon: <BookOpenIcon />,
    },
  ];

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
    {
      id: 3,
      name: "discountCode",
      type: "text",
      placeholder: "Enter your discount code",
      label: "Discount Code",
      // required: true,
    },
    {
      id: 4,
      name: "serviceFee",
      type: "text",
      placeholder: "Enter your service fee",
      label: "Sercice Fee",
      // required: true,
    },
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
      type: "text",
      placeholder: "Enter your payment method",
      label: "Payment method",
    },
    {
      id: 8,
      name: "paymentStatus",
      type: "text",
      placeholder: "Enter your payment status",
      label: "Payment status",
    },
    {
      id: 9,
      name: "orderStatus",
      type: "text",
      placeholder: "Enter your order status",
      label: "Order status",
    },
    {
      id: 10,
      name: "purchasedItems",
      type: "text",
      placeholder: "Enter your purchased Items",
      label: "Purchased Items",
    },
    {
      id: 11,
      name: "note",
      type: "text",
      placeholder: "Enter your note",
      label: "Note",
    },

  ];

  const [openModalRead, setOpenModalRead] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  // data CURD
  const [dataRead, setDataRead] = useState({});
  const [valuesUpdate, setValuesUpdate] = useState({});
  const [idProductDelete, setIdProductDelete] = useState(-1);

  const updatedManyFeatures = manyFeatures.map((feature) => {
    const updatedFeature = {
      ...feature, onClick: (id) => {
        console.log("updatedFeature id", id)
        if (feature.name === "read") {
          // handleOpenModalRead(id);
        } else if (feature.name === "edit") {
          // handleOpenModalUpdate(id);
        } else if (feature.name === "delete") {
          // handleOpenModalDelete(id);
        } else if (feature.name === "infoUser") {
          // handleOpenPageVariant(id);
        }
      }
    };
    return updatedFeature;
  });

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

  return (
    <Fragment>
      <div className="pl-3 w-[calc(100%-1rem)]">
        <div className="bg-white px-3 py-4 rounded-lg">
          <h1 className="text-2xl font-semibold capitalize">
            Products Management
          </h1>
          {listPaymentsCompact.length > 0 && (
            <DataTable
              data={listPaymentsCompact}
              btnCreateTitle={"Create Payment"}
              manyFeatures={updatedManyFeatures}
              handleModalCreate={handleOpenModalCreate}
            // handleModalRead={handleOpenModalRead}
            // handleModalEdit={handleOpenModalUpdate}
            // handleModalDelete={handleOpenModalDelete}
            />
          )}
        </div>
      </div>

      {openModalCreate && (
        <Modal open={openModalCreate} close={handleCloseModalCreate}>
          <form autoComplete="off" onSubmit={() => { }}>
            <Heading variant={"primary"}>Create payment</Heading>
            <div className="">
              {inputs.map((item, index) => {
                if (item.name == "paymentDate") {
                  return;
                }

                if (item.name == "note") {
                  return (
                    <TextareaField
                      key={index}
                      onChange={onChangeInputCreate}
                      value={valuesCreate && valuesCreate[item.name]}
                      clear={() => inputCreateClear(item.name)}
                      onClick={() => { }}
                      {...item}
                    />
                  )
                }

                return (
                  <InputField
                    key={index}
                    onChange={onChangeInputCreate}
                    value={valuesCreate && valuesCreate[item.name]}
                    clear={() => inputCreateClear(item.name)}
                    onClick={() => { }}
                    {...item}
                  />
                );
              })}
            </div>
            <div className="flex justify-end">
              <Button variant={"primary"}>Submit</Button>
              <Button variant={"primary"} onClick={handleCloseModalCreate}>
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