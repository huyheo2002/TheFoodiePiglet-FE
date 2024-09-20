import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import InputField from "../../components/FormControl/InputField";
import Button from "../../components/Button";
import { getAllTables } from "../../services/tableServices";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import * as tableServices from "../../services/tableServices";
import Modal from "../../components/Modal";
import DatePicker from "../../components/FormControl/datePicker";
import TimePicker from "../../components/FormControl/timePicker";
import Congrat from "../../components/Congrat";
import WindowScrollTop from "../../utils/windowScroll";
import GlobalContext from "../../contexts/globalContext";
import { TBUTTON_VARIANT } from "../../types/button";
import toast from "react-hot-toast";
import Heading from "../../components/Heading";
import Map from "../../components/Map";
import SearchCommon from "../../components/Search/SearchCommon";

function Orders() {
  const { showCongrat, setShowCongrat } = useContext(GlobalContext);
  const { t } = useTranslation(["order"]);
  const [values, setValues] = useState({});
  const [chooseIdTable, setChooseIdTable] = useState(null);
  const [openModalOrders, setOpenModalOrders] = useState(false);
  const [openModalOrdersFail, setOpenModalOrdersFail] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeStart, setSelectedTimeStart] = useState("");
  const [selectedTimeEnd, setSelectedTimeEnd] = useState("");
  const [openModalOrderSuccess, setOpenModalOrderSuccess] = useState(false);

  // handle get current date
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
  const currentDay = String(currentDate.getDate()).padStart(2, "0");
  const currentDateStr = `${currentYear}-${currentMonth}-${currentDay}`;

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
      required: false,
    },
    {
      id: 5,
      name: "timeStart",
      type: "time",
      placeholder: "Enter your time start",
      label: "Time Start",
      required: false,
    },
    {
      id: 6,
      name: "timeEnd",
      type: "time",
      placeholder: "Enter your time end",
      label: "Time End",
      required: false,
    },
    {
      id: 7,
      name: "idTable",
      type: "text",
      placeholder: "Let choose table",
      label: "Choose table",
      onlyRead: true.toString(),
    },
  ];

  const [dataTable, setDataTable] = useState([]);

  const handleGetAllTable = async () => {
    try {
      let respon = await getAllTables("all");
      if (respon && respon.errCode === 0) {
        setDataTable(respon.tables);
      }
    } catch (error) {
      console.log("err:", error);
    }
  };

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

  const inputClear = (getKey) => {
    setValues({ ...values, [getKey]: "" });
  };

  // handle choose table
  const handleChooseTable = (idTable) => {
    setChooseIdTable(idTable);
  };

  const handleOnSubmitBooking = async (e) => {
    e.preventDefault();

    if (!chooseIdTable) {
      toast.error("Please set a table after complete your infomation");
      return;
    }

    let data = new FormData(e.target);
    let dataEntry = Object.fromEntries(data.entries());
    let getNewDateStart = `${dataEntry.date}T${dataEntry.timeStart}`;
    let getNewDateEnd = `${dataEntry.date}T${dataEntry.timeEnd}`;
    data.delete("timeStart");
    data.delete("timeEnd");
    data.delete("date");

    data.set("dateStart", getNewDateStart);
    data.set("dateEnd", getNewDateEnd);

    try {
      const respon = await tableServices.createReserveTable(data);
      if (respon && respon.errCode === 0) {
        delayCloseModalOrders();
        setValues({});
        setSelectedTimeStart("");
        setSelectedTimeEnd("");
        setSelectedDate("");
        setChooseIdTable(null);
      } else if (respon && respon.errCode === 1) {
        setOpenModalOrdersFail(true);
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  const handleCloseModalOrders = () => {
    setOpenModalOrders(false);
    setOpenModalOrderSuccess(true);
  };

  const handleCloseModalOrderSuccess = () => {
    setOpenModalOrderSuccess(false);
  };

  const handleCloseModalOrdersFail = () => {
    setOpenModalOrdersFail(false);
  };

  const delayCloseModalOrders = () => {
    setOpenModalOrders(true);
    setTimeout(() => {
      handleCloseModalOrders();
    }, 3000);
  };

  const handleTimeStartChange = (valueTimeStart) => {
    setSelectedTimeStart(valueTimeStart);
  };

  const handleTimeEndChange = (valueTimeEnd) => {
    setSelectedTimeEnd(valueTimeEnd);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const timeSlots = useMemo(() => {
    const startTime = 8 * 60;
    const endTime = 21 * 60;
    const interval = 30;

    const slots = [];
    for (let minutes = startTime; minutes <= endTime; minutes += interval) {
      const hours = Math.floor(minutes / 60);
      const minutesPart = minutes % 60;
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutesPart
        .toString()
        .padStart(2, "0")}`;
      slots.push(formattedTime);
    }

    return slots;
  }, []);

  // new map
  const [openModalMap, setOpenModalMap] = useState(false);

  const handleOpenModalMap = () => {
    setOpenModalMap(true);
  };

  const handleCloseModalMap = () => {
    setOpenModalMap(false);
  };

  return (
    <Fragment>
      <div className="container my-6 p-4 flex flex-col bg-gray-400 rounded-md mx-auto relative">
        <h1 className="text-xl font-semibold text-white my-2">Tầng 1</h1>
        <div className="mx-auto">
          <div className="bg-white w-[1280px] p-2 h-[calc(600px+1rem)] flex items-center flex-wrap border-2 border-black">
            <div className="w-[33.33%] h-[200px] relative border-l-4 border-t-4 border-black ">
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

              <div className="absolute top-[60px] left-[calc(20%+20px)] bottom-0 w-[60px] border-l-4 border-t-2 border-b-0 border-r-2 flex justify-center items-center border-black text-sm font-semibold text-black">
                <span className="-rotate-90">{t("other.Reception")}</span>
              </div>

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
                            "bg-red-400 border-red-600":
                              chooseIdTable === item.id,
                          }
                        )}
                      >
                        {t(`table.${item.name.slice(0, 2)}`)}
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
                            "bg-red-400 border-red-600":
                              chooseIdTable === item.id,
                          }
                        )}
                      >
                        {t(`table.${item.name.slice(0, 2)}`)}
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="bg-gray-400 w-[33.33%] h-[200px] relative border-t-4 border-r-4 border-l-4 border-black">
              <div className="w-full absolute z-20 left-1/2 top-1/2 flex justify-center items-center -translate-x-1/2 text-xl font-semibold text-white">
                {t("other.Kitchen")}
              </div>

              <div className="absolute top-[80px] right-[0] w-[45px] h-[70px] border-4 border-r-0 border-black flex text-center items-center text-sm font-semibold text-white">
                {t("other.takeAway")}
              </div>

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
                          {
                            "bg-red-400 border-red-600":
                              chooseIdTable === item.id,
                          }
                        )}
                      >
                        {t(`table.${item.name.slice(0, 2)}`)}
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="bg-sky-400 w-[33.33%] h-[200px] relative border-b-4 border-r-4 border-l-4 border-black">
              <div className="absolute top-0 bottom-0 left-0 w-full h-full border-black border-t-4">
                <div className="w-full h-full flex justify-center items-center text-xl font-semibold text-white">
                  {t("other.WC")}
                </div>
              </div>
              <div className="absolute top-[30px] right-0 w-[60px] h-[40px] border-4 border-r-0 border-black rounded-ss-full"></div>
            </div>
            <div className="bg-amber-300 w-[33.33%] h-[200px] relative border-black border-b-4"></div>
            <div className="bg-amber-500 w-[33.33%] h-[200px] relative border-black border-4">
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
                            "bg-red-400 border-red-600":
                              chooseIdTable === item.id,
                          }
                        )}
                      >
                        {t(`table.${item.name.slice(0, 2)}`)}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <form
        className="w-full mb-6 rounded-lg bg-white px-2 py-3 border-2 border-black flex flex-wrap justify-between"
        autoComplete="off"
        onSubmit={handleOnSubmitBooking}
      >
        {inputs.map((item, index) => {
          if (item.name === "idTable") {
            return (
              <InputField
                key={index}
                className={"!w-2/5 mx-8"}
                onChange={onChangeInput}
                clear={() => inputClear(item.name)}
                value={chooseIdTable ? chooseIdTable : ""}
                onClick={() => {}}
                {...item}
              />
            );
          }

          if (item.type === "date") {
            return (
              <DatePicker
                key={index}
                className={"!w-2/5 mx-8"}
                value={selectedDate}
                onChange={handleDateChange}
                minDate={currentDateStr}
                {...item}
              />
            );
          }

          if (item.type === "time" && item.name === "timeStart") {
            const filterListTimeStart = timeSlots.filter((item) => {
              let currentTime =
                parseInt(item.split(":")[0]) * 60 +
                parseInt(item.split(":")[1]);
              let timeEnd =
                selectedTimeEnd &&
                parseInt(selectedTimeEnd.split(":")[0]) * 60 +
                  parseInt(selectedTimeEnd.split(":")[1]);

              return currentTime < timeEnd;
            });

            return (
              <TimePicker
                key={index}
                onValueInpChange={handleTimeStartChange}
                value={selectedTimeStart}
                listOptions={selectedTimeEnd ? filterListTimeStart : timeSlots}
                className={"!w-2/5 mx-8"}
                {...item}
              />
            );
          }

          if (item.type === "time" && item.name === "timeEnd") {
            const filterListTimeEnd = timeSlots.filter((item) => {
              let currentTime =
                parseInt(item.split(":")[0]) * 60 +
                parseInt(item.split(":")[1]);
              let timeStart =
                selectedTimeStart &&
                parseInt(selectedTimeStart.split(":")[0]) * 60 +
                  parseInt(selectedTimeStart.split(":")[1]);

              return currentTime > timeStart;
            });

            return (
              <TimePicker
                key={index}
                onValueInpChange={handleTimeEndChange}
                value={selectedTimeEnd}
                listOptions={selectedTimeStart ? filterListTimeEnd : timeSlots}
                className={"!w-2/5 mx-8"}
                {...item}
              />
            );
          }

          return (
            <InputField
              key={index}
              className={"!w-2/5 mx-8"}
              onChange={onChangeInput}
              value={values && values[item.name]}
              clear={() => inputClear(item.name)}
              onClick={() => {}}
              {...item}
            />
          );
        })}

        <div className="flex justify-end mt-3 w-full">
          <Button variant={TBUTTON_VARIANT.PRIMARY} onClick={() => {}}>
            Submit
          </Button>
          <Button
            variant={TBUTTON_VARIANT.PRIMARY}
            onClick={() => {
              setValues({});
              setSelectedTimeStart("");
              setSelectedTimeEnd("");
              setSelectedDate("");
              setChooseIdTable(null);
            }}
          >
            Cancel
          </Button>
        </div>
      </form>

      <Button variant={TBUTTON_VARIANT.PRIMARY} onClick={handleOpenModalMap}>
        Test Open Map
      </Button>

      {openModalOrders && (
        <Modal open={openModalOrders} close={handleCloseModalOrders}>
          <form className="bg-white p-6 rounded-lg shadow-lg w-80 mx-auto">
            <div className="mb-4 text-center">
              <svg
                className="animate-spin h-8 w-8 mx-auto text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4c-2.664 0-5.134-1.036-7.016-2.915l2.472-2.472zm7.016-5.868l-2.472 2.472A7.962 7.962 0 0112 4V0c-4.418 0-8 3.582-8 8h4c0-2.664 1.036-5.134 2.915-7.016z"
                ></path>
              </svg>
            </div>
            <div className="text-center text-gray-700">
              Đang xử lý đặt bàn. Vui lòng chờ...
            </div>
          </form>
        </Modal>
      )}

      {openModalOrdersFail && (
        <Modal open={openModalOrdersFail} close={handleCloseModalOrdersFail}>
          <div className="bg-white p-8 rounded shadow-md text-center flex flex-col justify-center items-center w-full">
            <h1 className="text-2xl font-semibold mb-4">Đặt bàn thất bại</h1>
            <p className="text-gray-600 mb-6">
              Rất tiếc, chúng tôi không thể đặt bàn cho bạn vào thời điểm này.
            </p>
            <Button
              variant={TBUTTON_VARIANT.PRIMARY}
              onClick={handleCloseModalOrdersFail}
            >
              Thử lại
            </Button>
          </div>
        </Modal>
      )}

      <Modal
        open={openModalOrderSuccess}
        custom
        close={handleCloseModalOrderSuccess}
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
                Đặt bàn thành công
              </p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-36 h-36 mb-4 my-3 text-green-400 mx-auto"
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
            <div className="mt-4">
              <p className="text-gray-700 text-center">
                Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.
                <br />
                Bàn của bạn đang được xử lý. Vui lòng đợi trong ít phút và kiểm
                tra email của bạn.
              </p>
            </div>
            <div className="mt-6 flex justify-start">
              <Button
                variant={TBUTTON_VARIANT.PRIMARY}
                onClick={() => {
                  handleCloseModalOrderSuccess();
                  WindowScrollTop();
                }}
              >
                Thoát
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        open={openModalMap}
        close={handleCloseModalMap}
        className={"w-[calc(100%-32px)]"}
      >
        <Heading variant={"primary"}>Mapping</Heading>
        <SearchCommon listData={[
          "Hà nội", "Thái lan", "Hàn quốc", "8 Phạm hùng", "Đông anh", "Sóc sơn"
        ]}/>
        <div className="w-full h-[34rem]">
          <Map/>
        </div>
        <div className="flex justify-end">
          <Button variant={TBUTTON_VARIANT.PRIMARY}>Submit</Button>
          <Button
            variant={TBUTTON_VARIANT.PRIMARY}
            onClick={handleCloseModalMap}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </Fragment>
  );
}

export default Orders;
