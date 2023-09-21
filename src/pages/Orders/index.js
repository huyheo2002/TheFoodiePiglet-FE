import { Fragment, useEffect, useState } from "react";
import InputField from "../../components/FormControl/InputField";
import Button from "../../components/Button";
import { getAllTables } from "../../services/tableServices";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import * as tableServices from "../../services/tableServices";
import Modal from "../../components/Modal";

function Orders() {
  const { t } = useTranslation(["order"]);
  const [values, setValues] = useState({});
  const [chooseIdTable, setChooseIdTable] = useState(null);
  const [openModalOrders, setOpenModalOrders] = useState(false);

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Enter your name",
      label: "Username",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "text",
      placeholder: "Enter your email",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "phone",
      type: "text",
      placeholder: "Enter your phone",
      label: "Phone number",
      required: true,
    },
    {
      id: 4,
      name: "date",
      type: "date",
      placeholder: "Enter your date",
      label: "Date",
      // required: true,
    },
    {
      id: 5,
      name: "timeStart",
      type: "time",
      placeholder: "Enter your time start",
      label: "Time Start",
      // required: true,
    },
    {
      id: 6,
      name: "timeEnd",
      type: "time",
      placeholder: "Enter your time end",
      label: "Time End",
      // required: true,
    },
    {
      id: 7,
      name: "idTable",
      type: "text",
      placeholder: "Let choose table",
      label: "Choose table",
      onlyRead: true.toString(),
    }
  ];

  const [dataTable, setDataTable] = useState([]);

  // console.log("dataTable", dataTable)
  const handleGetAllTable = async () => {
    try {
      let respon = await getAllTables("all");
      if (respon && respon.errCode === 0) {
        setDataTable(respon.tables);
      }
      // console.log("respon", respon)
    } catch (error) {
      console.log("err:", error);
    }
  };

  // useEffect(() => {
  //   handleGetAllTable();

  //   let getTableDC = dataTable.length > 0 && dataTable.filter(item => (item.name).toString().indexOf("DC") == 0)
  //   setDataTableDC(getTableDC)
  // }, [])

  useEffect(() => {
    handleGetAllTable();
  }, []);

  // get table with cate
  const getTableDC =
    dataTable.length > 0 &&
    dataTable.filter((item) => item.name.includes("DC"));
  const getTableDR =
    dataTable.length > 0 &&
    dataTable.filter((item) => item.name.includes("DR"));
  const getTableFR =
    dataTable.length > 0 &&
    dataTable.filter((item) => item.name.includes("FR"));
  const getTableSV =
    dataTable.length > 0 &&
    dataTable.filter((item) => item.name.includes("SV"));

  // handle create user
  const onChangeInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // handle choose table
  const handleChooseTable = (idTable) => {
    setChooseIdTable(idTable)
  }

  const handleOnSubmitBooking = async (e) => {
    e.preventDefault();
    let data = new FormData(e.target);
    let dataEntry = Object.fromEntries(data.entries());
    // console.log("dataEntry date", new Date(dataEntry.date))
    // console.log("dataEntry time", new Date(dataEntry.time))
    let getNewDateStart = `${dataEntry.date}T${dataEntry.timeStart}`;
    let getNewDateEnd = `${dataEntry.date}T${dataEntry.timeEnd}`;

    // console.log("getNewDateStart", new Date(getNewDateStart))
    // console.log("getNewDateEnd", new Date(getNewDateEnd))

    // console.log("dataEntry getNewDate", new Date(getNewDate))

    data.delete("timeStart");
    data.delete("timeEnd");
    data.delete("date");

    data.set("dateStart", getNewDateStart)
    data.set("dateEnd", getNewDateEnd)

    console.log("data entry:", Object.fromEntries(data.entries()));

    // try {
    //   const respon = await tableServices.createReserveTable(data);
    //   if (respon && respon.errCode === 0) {
    //     // handleCloseModalOrders(true);
    //     // alert("đặt bàn thành công");
    //   }
    // } catch (error) {
    //   console.log("err", error)
    // }
  }

  const handleCloseModalOrders = () => {
    setOpenModalOrders(false);
  }

  const delayCloseModalOrders = () => {
    setOpenModalOrders(true);
    setTimeout(() => {
      handleCloseModalOrders();
    }, 3000);
  }

  return (
    <Fragment>
      <div className="container my-6 p-4 flex flex-col bg-gray-400 rounded-md overflow-scroll relative">
        <h1 className="text-xl font-semibold text-white my-2">Tầng 1</h1>
        {/* <hr className="h-1 bg-red-500 w-full" /> */}
        <div className="mx-auto">
          <div className="bg-white w-[1280px] p-2 h-[calc(600px+1rem)] flex items-center flex-wrap border-2 border-black">
            <div className="w-[33.33%] h-[200px] relative border-l-4 border-t-4 border-black ">
              {/* bậc thang :v */}
              <div className="absolute left-0 bottom-0 top-0 w-1/5">
                <div className="w-full h-[40px] border-[1px] border-black"></div>
                <div className="w-full h-[20px] border-[1px] border-black"></div>
                <div className="w-full h-[20px] border-[1px] border-black"></div>
                <div className="w-full h-[40px] border-[1px] border-black"></div>
                <div className="w-full h-[20px] border-[1px] border-black"></div>
                <div className="w-full h-[20px] border-[1px] border-black"></div>
                <div className="w-full h-[20px] border-[1px] border-black"></div>
                <div className="w-full h-[20px] border-[1px] border-black"></div>
              </div>

              <div className="absolute top-0 left-[20%] flex">
                <div className="w-[20px] h-[40px] border-[1px] border-black"></div>
                <div className="w-[20px] h-[40px] border-[1px] border-black"></div>
                <div className="w-[20px] h-[40px] border-[1px] border-black"></div>
              </div>

              {/* lễ tân */}
              <div className="absolute top-[60px] left-[calc(20%+20px)] bottom-0 w-[60px] border-l-4 border-t-2 border-b-0 border-r-2 flex justify-center items-center border-black text-sm font-semibold text-black">
                {/* Lễ tân */}
                <span className="-rotate-90">
                  {t("other.Reception")}
                </span>
              </div>

              {/* Cổng vào */}
              <div className="absolute top-0 right-[40px] w-[40px] h-[60px] border-4 border-t-0 border-black rounded-es-full"></div>
              <div className="absolute top-0 right-[80px] w-[40px] h-[60px] border-4 border-t-0 border-black rounded-ee-full"></div>
            </div>
            <div className="bg-amber-300 w-[33.33%] h-[200px] relative border-t-4 border-black">
              <div className="absolute top-[10px] left-0 right-0 flex h-[40px] justify-around items-center">
                {getTableDC.length > 0 &&
                  getTableDC.map((item) => {
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleChooseTable(item.id)}
                        className={clsx(
                          "bg-green-400 font-medium text-white border-4 border-green-600 w-[80px] h-[40px] flex justify-center items-center rounded-md cursor-pointer transition-primary hover:shadow-black-b-0.75",
                          {
                            "bg-red-400 border-red-600": item.taken === true,
                          }
                        )}
                      >
                        {t(`table.${item.name.slice(0, 2)}`)}
                        {/* {item.name} */}
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="bg-amber-500 w-[33.33%] h-[200px] relative border-t-4 border-r-4 border-b-4 border-black">
              <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-around flex-wrap">
                {getTableDR.length > 0 &&
                  getTableDR.map((item) => {
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleChooseTable(item.id)}
                        className={clsx(
                          "relative w-[40px] h-[80px] border-4 flex justify-center items-center my-[5px] mx-[25px] text-sm text-center after:absolute after:w-[2px] after:top-0 after:bottom-0 after:bg-black after:left-[-25px] rounded-md cursor-pointer border-green-600 bg-green-400 font-medium text-white transition-primary hover:shadow-black-b-0.75",
                          {
                            "bg-red-400 border-red-600": item.taken === true,
                          }
                        )}
                      >
                        {/* {item.name} */}
                        {t(`table.${item.name.slice(0, 2)}`)}
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="bg-gray-400 w-[33.33%] h-[200px] relative border-t-4 border-r-4 border-l-4 border-black">
              <div className="w-full absolute z-20 left-1/2 top-1/2 flex justify-center items-center -translate-x-1/2 text-xl font-semibold text-white">
                {/* Khu vực bếp */}
                {t("other.Kitchen")}
              </div>

              {/* khu vực ra đồ */}
              <div className="absolute top-[80px] right-[0] w-[45px] h-[70px] border-4 border-r-0 border-black flex text-center items-center text-sm font-semibold text-white">
                {/* Ra đồ */}
                {t("other.takeAway")}
              </div>

              {/* cửa */}
              <div className="absolute top-0 right-[40px] w-[40px] h-[60px] border-4 border-t-0 border-black rounded-es-full"></div>
            </div>
            <div className="bg-amber-300 w-[33.33%] h-[200px] relative"></div>
            <div className="bg-amber-400 w-[33.33%] h-[200px] relative">
              <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-around items-center flex-wrap py-5 border-r-4 border-black">
                {getTableFR.length > 0 &&
                  getTableFR.map((item) => {
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleChooseTable(item.id)}
                        className={clsx(
                          "w-[80px] mx-5 h-[40px] border-4 flex justify-center items-center rounded-md cursor-pointer border-green-600 bg-green-400 font-medium text-white transition-primary hover:shadow-black-b-0.75",
                          { "bg-red-400 border-red-600": item.taken === true }
                        )}
                      >
                        {/* {item.name} */}
                        {t(`table.${item.name.slice(0, 2)}`)}
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="bg-sky-400 w-[33.33%] h-[200px] relative border-b-4 border-r-4 border-l-4 border-black">
              <div className="absolute top-0 bottom-0 left-0 w-full h-full border-black border-t-4">
                <div className="w-full h-full flex justify-center items-center text-xl font-semibold text-white">
                  {/* Khu vực vệ sinh */}
                  {t("other.WC")}
                </div>
              </div>
              {/* cửa */}
              <div className="absolute top-[30px] right-0 w-[60px] h-[40px] border-4 border-r-0 border-black rounded-ss-full"></div>
            </div>
            <div className="bg-amber-300 w-[33.33%] h-[200px] relative border-black border-b-4"></div>
            <div className="bg-amber-500 w-[33.33%] h-[200px] relative border-black border-4">
              {/* cửa */}
              <div className="absolute top-[30px] left-0 w-[60px] h-[40px] border-4 border-l-0 border-black rounded-ee-full"></div>

              <div className="absolute top-0 left-[40px] right-0 bottom-0 flex justify-around items-center flex-wrap py-5">
                {getTableSV.length > 0 &&
                  getTableSV.map((item) => {
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleChooseTable(item.id)}
                        className={clsx(
                          "w-[80px] mx-8 h-[40px] border-4 flex justify-center items-center rounded-md cursor-pointer border-green-600 bg-green-400 font-medium text-white transition-primary hover:shadow-black-b-0.75",
                          {
                            "bg-red-400 border-red-600": item.taken === true,
                          }
                        )}
                      >
                        {/* {item.name} */}
                        {t(`table.${item.name.slice(0, 2)}`)}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* form */}
      <form
        className="w-full mb-6 rounded-lg bg-white px-2 py-3 border-2 border-black flex flex-wrap justify-between"
        autoComplete="off"
        onSubmit={handleOnSubmitBooking}
      >
        {inputs.map((item, index) => {
          // hidden :v
          if (item.name === "idTable") {
            return <InputField
              key={index}
              className={"!w-2/5 mx-8"}
              onChange={onChangeInput}
              value={chooseIdTable ? chooseIdTable : ""}
              onClick={() => { }}
              {...item}
            />
          }

          return (
            <InputField
              key={index}
              className={"!w-2/5 mx-8"}
              onChange={onChangeInput}
              onClick={() => { }}
              {...item}
            />
          );
        })}

        <div className="flex justify-end mt-3 w-full">
          <Button variant={"primary"} onClick={() => delayCloseModalOrders()}>Submit</Button>
          <Button variant={"primary"} onClick={() => { }}>
            Cancel
          </Button>
        </div>
      </form>

      {openModalOrders &&
        <Modal open={openModalOrders} close={handleCloseModalOrders}>
          <form className="bg-white p-6 rounded-lg shadow-lg w-80 mx-auto">
            <div className="mb-4 text-center">
              <svg className="animate-spin h-8 w-8 mx-auto text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4c-2.664 0-5.134-1.036-7.016-2.915l2.472-2.472zm7.016-5.868l-2.472 2.472A7.962 7.962 0 0112 4V0c-4.418 0-8 3.582-8 8h4c0-2.664 1.036-5.134 2.915-7.016z"></path>
              </svg>
            </div>
            <div className="text-center text-gray-700">Đang xử lý đặt bàn. Vui lòng chờ...</div>
          </form>
        </Modal>
      }

    </Fragment>
  );
}

export default Orders;
