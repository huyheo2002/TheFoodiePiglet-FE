import { Fragment, useEffect, useMemo, useState } from "react";
import DataTable from "../../../components/DataTable";
import * as tableServices from "../../../services/tableServices";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import Heading from "../../../components/Heading";
import InputField from "../../../components/FormControl/InputField";
import InputRadio from "../../../components/FormControl/inputRadio";
import TimePicker from "../../../components/FormControl/timePicker";
import DatePicker from "../../../components/FormControl/datePicker";
import useLocalStorage from "../../../hooks/useLocalStorage";
import * as commonServices from "../../../services/commonServices";
import * as permissionServices from "../../../services/permissionServices";
import { TBUTTON_VARIANT } from "../../../types/button";
import { useAuth } from "../../../contexts/authContext";


function ReserveTableManagement() {
    const currentPermissionGroup = "quan-ly-dat-ban";
    const { dataUser } = useAuth();
    const [listPermissionOfUser, setListPermissionOfUser] = useState([]);
    const [listPermissionCurrentInPage, setListPermissionCurrentInPage] = useState([]);

    const [listReserveTable, setListReserveTable] = useState([]);
    const [listTable, setListTable] = useState([]);

    // create
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTimeStart, setSelectedTimeStart] = useState("");
    const [selectedTimeEnd, setSelectedTimeEnd] = useState("");
    const [idTableIndex, setIdTableIndex] = useState(-1);

    // handle get current date
    // const minDate = "2023-10-03"
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
            name: "timeUse",
            type: "text",
            placeholder: "Enter your time end",
            label: "Time Use",
            // required: true,
        },
        {
            id: 8,
            name: "idTable",
            type: "radio",
            placeholder: "Let choose table",
            label: "Choose table",
        }
    ];

    const [valuesCreate, setValuesCreate] = useState({});
    const [dataRead, setDataRead] = useState({});
    const [valuesUpdate, setValuesUpdate] = useState({});
    const [idReserveTableDelete, setIdReserveTableDelete] = useState(-1);

    // MODAL
    const [openModalRead, setOpenModalRead] = useState(false);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);

    // handle permission
    const handlePermission = async () => {
        // handle permissions
        const dataListPermission = dataUser.permissions || [];
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
        handlePermission();
        handleGetAllPermissionInPage();
    }, [])

    // console.log("listPermissionOfUser", listPermissionOfUser);

    const handleGetAllReserveTable = async () => {
        const respon = await tableServices.getAllReserveTable();
        if (respon && respon.errCode == 0) {
            const dataReserveTable = respon.reserveTable;
            // console.log("respon reserve Table", respon.reserveTable)
            let splitFields =
                dataReserveTable.length > 0 &&
                dataReserveTable.map((item) => {
                    let checkDateStartChange = false;
                    let checkDateEndChange = false;


                    if (item.createdAt || item.updatedAt) {
                        delete item.createdAt;
                        delete item.updatedAt;
                    }

                    if (item.Table) {
                        item.tableCode = item.Table.name;

                        delete item.Table;
                        delete item.idTable;
                    }

                    if (item.dateStart) {
                        const date = new Date(item.dateStart);

                        // Lấy ngày, tháng, năm
                        const day = date.getDate();
                        const month = date.getMonth() + 1; // Tháng trong JavaScript là 0-11, nên cộng thêm 1
                        const year = date.getFullYear();

                        // Lấy giờ và phút
                        const hours = date.getHours();
                        const minutes = date.getMinutes();

                        item.dateStart = `${hours < 10 ? '0' : ''}${hours}h${minutes < 10 ? '0' : ''}${minutes}`;
                        item.date = `${day}-${month < 10 ? '0' : ''}${month}-${year < 10 ? '0' : ''}${year}`;
                        checkDateStartChange = true;
                    }

                    if (item.dateEnd) {
                        const date = new Date(item.dateEnd);

                        // Lấy giờ và phút
                        const hours = date.getHours();
                        const minutes = date.getMinutes();

                        item.dateEnd = `${hours < 10 ? '0' : ''}${hours}h${minutes < 10 ? '0' : ''}${minutes}`;
                        checkDateEndChange = true;
                    }

                    if (checkDateEndChange && checkDateStartChange) {
                        item.timeUse = `${item.dateStart} => ${item.dateEnd}`;

                        delete item.dateStart;
                        delete item.dateEnd;
                    }

                    return item;
                })

            if (splitFields.length > 0) {
                setListReserveTable(splitFields);
            }
        }
    }

    const handleGetAllTable = async () => {
        const respon = await tableServices.getAllTables("all");
        if (respon && respon.errCode === 0) {
            setListTable(respon.tables);
        } else if (respon.errCode !== 0) {
            alert(respon.errMsg);
        }
    }

    console.log("listTable", listTable);
    console.log("listReserveTable", listReserveTable);

    useEffect(() => {
        handleGetAllReserveTable();
        handleGetAllTable();
    }, [])

    // -- modal create
    // modal create user
    const handleOpenModalCreate = () => {
        setOpenModalCreate(true);
    };

    const handleCloseModalCreate = () => {
        setOpenModalCreate(false);
        setValuesCreate({});
        setSelectedTimeStart("");
        setSelectedTimeEnd("");
        setSelectedDate("");
    };

    // -- modal read
    const handleOpenModalRead = (id) => {
        setOpenModalRead(true);
        let filterReserveTable =
            listReserveTable.length > 0 &&
            listReserveTable.filter((item) => item.id === id);

        if (filterReserveTable) {
            filterReserveTable = filterReserveTable.map((item) => {
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
        }

        if (filterReserveTable.length > 0) {
            setDataRead(filterReserveTable[0]);
        }
    };

    const handleCloseModalRead = () => {
        setOpenModalRead(false);
    };

    // modal update user
    const handleOpenModalUpdate = (id) => {
        setOpenModalUpdate(true);
        let filterReserveTable =
            listReserveTable.length > 0 &&
            listReserveTable.filter((item) => item.id === id);

        if (filterReserveTable) {
            filterReserveTable = filterReserveTable.map((item) => {
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
        }

        if (filterReserveTable.length > 0) {
            setValuesUpdate(filterReserveTable[0]);
        }
    };

    const handleCloseModalUpdate = () => {
        setOpenModalUpdate(false);
        setIdTableIndex(-1);
        setValuesUpdate({});
        setSelectedTimeStart("");
        setSelectedTimeEnd("");
        setSelectedDate("");
    };

    const handleOpenModalDelete = (id) => {
        setOpenModalDelete(true);
        setIdReserveTableDelete(id);
    };

    const handleCloseModalDelete = () => {
        setOpenModalDelete(false);
        setIdTableIndex(-1);
        setValuesUpdate({});
        setSelectedTimeStart("");
        setSelectedTimeEnd("");
        setSelectedDate("");
    };
    // handle INPUT
    // -- input create
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

    // handle date
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleTimeStartChange = (valueTimeStart) => {
        // console.log("valueTimeStart", valueTimeStart)
        setSelectedTimeStart(valueTimeStart);
    };

    const handleTimeEndChange = (valueTimeEnd) => {
        // console.log("valueTimeEnd", valueTimeEnd)
        setSelectedTimeEnd(valueTimeEnd);
    };

    // input radio :v
    const handleGetValueTable = (currentValue) => {
        setIdTableIndex(currentValue);
    };

    const timeSlots = useMemo(() => {
        const startTime = 8 * 60; // 8:00 AM tính bằng phút
        const endTime = 21 * 60;  // 9:00 PM tính bằng phút        
        const interval = 30;      // Độ lệch thời gian giữa các khoảng tính bằng phút

        const slots = [];
        for (let minutes = startTime; minutes <= endTime; minutes += interval) {
            const hours = Math.floor(minutes / 60);
            const minutesPart = minutes % 60;
            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutesPart.toString().padStart(2, '0')}`;
            slots.push(formattedTime);
        }

        return slots;
    }, []);

    const handleOnSubmitBooking = async (e) => {
        e.preventDefault();

        let data = new FormData(e.target);
        let dataEntry = Object.fromEntries(data.entries());
        let getNewDateStart = `${dataEntry.date}T${dataEntry.timeStart}`;
        let getNewDateEnd = `${dataEntry.date}T${dataEntry.timeEnd}`;

        data.delete("timeStart");
        data.delete("timeEnd");
        data.delete("date");

        data.set("dateStart", getNewDateStart)
        data.set("dateEnd", getNewDateEnd)

        try {
            const respon = await tableServices.createReserveTable(data);
            if (respon && respon.errCode === 0) {
                handleCloseModalCreate();
                handleGetAllReserveTable();
                handleGetAllTable();
            } else if (respon && respon.errCode === 1) {
                alert(respon.message);
            }
        } catch (error) {
            console.log("err", error)
        }
    }

    const onhandleSubmitUpdateBooking = async (e) => {
        e.preventDefault();

        const data = new FormData(e.target);
        if (valuesUpdate) {
            data.set("id", valuesUpdate.id)
        }

        let dataEntry = Object.fromEntries(data.entries());
        let getNewDateStart = `${dataEntry.date}T${dataEntry.timeStart}`;
        let getNewDateEnd = `${dataEntry.date}T${dataEntry.timeEnd}`;

        data.delete("timeStart");
        data.delete("timeEnd");
        data.delete("date");

        data.set("dateStart", getNewDateStart)
        data.set("dateEnd", getNewDateEnd)

        console.log("data:", data);
        console.log("data entry:", Object.fromEntries(data.entries()));

        try {
            const respon = await tableServices.updateReserveTable(data);

            if (respon && respon.errCode === 0) {
                handleCloseModalUpdate();
                handleGetAllReserveTable();
                handleGetAllTable();
            } else if (respon.errCode !== 0) {
                alert(respon.message);
            } else {
                alert("Cập nhật reserve table thất bại");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onhandleSubmitDeleteReserveTable = async (e) => {
        e.preventDefault();

        try {
            const respon = await tableServices.deleteReserveTable(idReserveTableDelete);
            if (respon && respon.errCode === 0) {
                handleCloseModalDelete();
                handleGetAllReserveTable();
                handleGetAllTable();
            } else if (respon.errCode !== 0) {
                alert(respon.message);
            } else {
                alert("Xóa reserve table thất bại");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Fragment>
            <div className="pl-3 w-[calc(100%-1rem)]">
                <div className="bg-white px-3 py-4 rounded-lg">
                    <h1 className="text-2xl font-semibold capitalize">
                        Reserve Table Management
                    </h1>
                    {listReserveTable.length > 0 && (
                        <DataTable
                            data={listReserveTable}
                            btnCreateTitle={"Create Reserve Table"}
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

            {/* modal read */}
            {openModalRead && (
                <Modal open={openModalRead} close={handleCloseModalRead}>
                    <Heading variant={"primary"}>Information reserve table detail</Heading>
                    <div className="">
                        {inputs.map((item, index) => {
                            if (item.name === "timeStart" || item.name === "timeEnd") {
                                return;
                            }

                            if (item.name === "idTable" && item.type === "radio") {
                                const getDataFromListTable =
                                    listTable.length > 0 &&
                                    listTable.map((option) => {
                                        return {
                                            value: option.id,
                                            label: option.name,
                                        };
                                    });

                                let tableChecked = null;
                                if (dataRead) {
                                    let filterTableIndex =
                                        getDataFromListTable.length > 0 &&
                                        getDataFromListTable.filter(
                                            (table) => table.label == dataRead.tableCode
                                        );
                                    if (filterTableIndex.length > 0) {
                                        tableChecked = filterTableIndex[0].value;
                                    }
                                }

                                return (
                                    <InputRadio
                                        key={index}
                                        row
                                        options={getDataFromListTable}
                                        onChange={handleGetValueTable}
                                        checked={tableChecked}
                                        disable
                                        {...item}
                                        id={Math.floor(Math.random() * 10)}
                                    />
                                )
                            }

                            if (item.name === "date" && item.type === "date") {
                                return (
                                    <InputField
                                        key={index}
                                        value={dataRead && dataRead.date}
                                        onChange={() => { }}
                                        onlyRead={"true"}
                                        {...item}
                                        type={"text"}
                                    />
                                )
                            }

                            return (
                                <InputField
                                    key={index}
                                    value={dataRead[item.name]}
                                    onChange={() => { }}
                                    onlyRead={"true"}
                                    {...item}
                                />
                            );
                        })}
                    </div>
                    {/* footer */}
                    <div className="flex justify-end">
                        <Button variant={TBUTTON_VARIANT.PRIMARY} onClick={handleCloseModalRead}>
                            Cancel
                        </Button>
                    </div>
                </Modal>
            )}

            {/* modal create */}
            {openModalCreate && (
                <Modal open={openModalCreate} close={handleCloseModalCreate}>
                    <form autoComplete="off" onSubmit={handleOnSubmitBooking}>
                        <Heading variant={"primary"}>Create Reserve Table</Heading>
                        <div className="">
                            {inputs.map((item, index) => {
                                if (item.type === "radio" && item.name === "idTable") {
                                    const getDataFromListTable =
                                        listTable.length > 0 &&
                                        listTable.map((option) => {
                                            return {
                                                value: option.id,
                                                label: option.name,
                                            };
                                        });

                                    return (
                                        <InputRadio
                                            key={index}
                                            row
                                            options={getDataFromListTable}
                                            onChange={handleGetValueTable}
                                            {...item}
                                            id={Math.floor(Math.random() * 10)}
                                        />
                                    );
                                }

                                if (item.name === "timeUse") {
                                    return;
                                }

                                if (item.type === "date") {
                                    return <DatePicker
                                        key={index}
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        minDate={currentDateStr}
                                        {...item}
                                    />
                                }

                                if (item.type === "time" && item.name === "timeStart") {
                                    const filterListTimeStart = timeSlots.filter((item) => {
                                        let currentTime = parseInt(item.split(':')[0]) * 60 + parseInt(item.split(':')[1]);
                                        let timeEnd = selectedTimeEnd && parseInt(selectedTimeEnd.split(':')[0]) * 60 + parseInt(selectedTimeEnd.split(':')[1]);

                                        return currentTime < timeEnd;
                                    })

                                    // console.log("filterListTimeStart", filterListTimeStart)

                                    return <TimePicker
                                        key={index}
                                        onValueInpChange={handleTimeStartChange}
                                        value={selectedTimeStart}
                                        listOptions={selectedTimeEnd ? filterListTimeStart : timeSlots}
                                        {...item}
                                    />
                                }

                                if (item.type === "time" && item.name === "timeEnd") {
                                    const filterListTimeEnd = timeSlots.filter((item) => {
                                        let currentTime = parseInt(item.split(':')[0]) * 60 + parseInt(item.split(':')[1]);
                                        let timeStart = selectedTimeStart && parseInt(selectedTimeStart.split(':')[0]) * 60 + parseInt(selectedTimeStart.split(':')[1]);

                                        return currentTime > timeStart;
                                    })

                                    // console.log("filterListTimeEnd", filterListTimeEnd)

                                    return <TimePicker
                                        key={index}
                                        onValueInpChange={handleTimeEndChange}
                                        value={selectedTimeEnd}
                                        listOptions={selectedTimeStart ? filterListTimeEnd : timeSlots}
                                        {...item}
                                    />
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
                        {/* footer */}
                        <div className="flex justify-end">
                            <Button variant={TBUTTON_VARIANT.PRIMARY}>Submit</Button>
                            <Button variant={TBUTTON_VARIANT.PRIMARY} onClick={handleCloseModalCreate}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Modal>
            )}


            {/* modal update */}
            {openModalUpdate && (
                <Modal open={openModalUpdate} close={handleCloseModalUpdate}>
                    <form autoComplete="off" onSubmit={onhandleSubmitUpdateBooking}>
                        <Heading variant={"primary"}>Update reserve table</Heading>
                        <div className="">
                            {inputs.map((item, index) => {
                                if (item.type === "radio" && item.name === "idTable") {
                                    const getDataFromListTable =
                                        listTable.length > 0 &&
                                        listTable.map((option) => {
                                            return {
                                                value: option.id,
                                                label: option.name,
                                            };
                                        });

                                    let tableChecked = null;
                                    if (valuesUpdate) {
                                        let filterTableIndex =
                                            getDataFromListTable.length > 0 &&
                                            getDataFromListTable.filter(
                                                (table) => table.label == valuesUpdate.tableCode
                                            );
                                        if (filterTableIndex.length > 0) {
                                            tableChecked = filterTableIndex[0].value;
                                        }
                                    }

                                    return (
                                        <InputRadio
                                            key={index}
                                            row
                                            options={getDataFromListTable}
                                            onChange={handleGetValueTable}
                                            checked={idTableIndex !== -1 ? idTableIndex : tableChecked}
                                            edit
                                            {...item}
                                            id={Math.floor(Math.random() * 10)}
                                        />
                                    )
                                }

                                if (item.name === "timeUse") {
                                    return;
                                }

                                if (item.type === "date") {
                                    // Chuỗi ngày ban đầu
                                    const dateStr = valuesUpdate[item.name];

                                    const dateParts = dateStr.split("-");
                                    const day = dateParts[0];
                                    const month = dateParts[1];
                                    const year = dateParts[2];

                                    // Định dạng lại thành chuỗi "YYYY/MM/DD"
                                    const formattedDateStr = `${year}-${month}-${day}`;
                                    // console.log("formattedDateStr", formattedDateStr)
                                    // console.log("currentDateStr", currentDateStr)

                                    return <DatePicker
                                        key={index}
                                        value={selectedDate ? selectedDate : formattedDateStr}
                                        onChange={handleDateChange}
                                        minDate={currentDateStr}
                                        {...item}
                                    />
                                }

                                if (item.type === "time" && item.name === "timeStart") {
                                    const filterListTimeStart = timeSlots.filter((item) => {
                                        let currentTime = parseInt(item.split(':')[0]) * 60 + parseInt(item.split(':')[1]);
                                        let timeEnd = selectedTimeEnd && parseInt(selectedTimeEnd.split(':')[0]) * 60 + parseInt(selectedTimeEnd.split(':')[1]);

                                        return currentTime < timeEnd;
                                    })

                                    // console.log("filterListTimeStart", filterListTimeStart)
                                    const timeUse = valuesUpdate && valuesUpdate.timeUse;

                                    // Phân tách chuỗi theo dấu "=>"
                                    const timeParts = timeUse.split(" => ");

                                    // Lấy hai phần tử sau khi đã phân tách
                                    const startTime = timeParts[0].trim().replace("h", ":"); // "08:00"
                                    const endTime = timeParts[1].trim().replace("h", ":");   // "09:00"


                                    if (!selectedTimeStart) {
                                        handleTimeStartChange(startTime)
                                    }

                                    return <TimePicker
                                        key={index}
                                        onValueInpChange={handleTimeStartChange}
                                        value={selectedTimeStart}
                                        listOptions={selectedTimeEnd ? filterListTimeStart : timeSlots}
                                        {...item}
                                    />
                                }

                                if (item.type === "time" && item.name === "timeEnd") {
                                    const filterListTimeEnd = timeSlots.filter((item) => {
                                        let currentTime = parseInt(item.split(':')[0]) * 60 + parseInt(item.split(':')[1]);
                                        let timeStart = selectedTimeStart && parseInt(selectedTimeStart.split(':')[0]) * 60 + parseInt(selectedTimeStart.split(':')[1]);

                                        return currentTime > timeStart;
                                    })

                                    // console.log("filterListTimeEnd", filterListTimeEnd)
                                    // console.log("filterListTimeStart", filterListTimeStart)
                                    const timeUse = valuesUpdate && valuesUpdate.timeUse;

                                    // Phân tách chuỗi theo dấu "=>"
                                    const timeParts = timeUse.split(" => ");

                                    // Lấy hai phần tử sau khi đã phân tách
                                    const startTime = timeParts[0].trim().replace("h", ":"); // "08:00"
                                    const endTime = timeParts[1].trim().replace("h", ":");   // "09:00"

                                    console.log("startTime", startTime);
                                    console.log("endTime", endTime);


                                    if (!selectedTimeEnd) {
                                        handleTimeEndChange(endTime)
                                    }

                                    return <TimePicker
                                        key={index}
                                        onValueInpChange={handleTimeEndChange}
                                        value={selectedTimeEnd}
                                        listOptions={selectedTimeStart ? filterListTimeEnd : timeSlots}
                                        {...item}
                                    />
                                }

                                return (
                                    <InputField
                                        key={index}
                                        onChange={onChangeInputUpdate}
                                        value={valuesUpdate && valuesUpdate[item.name]}
                                        clear={() => inputUpdateClear(item.name)}
                                        onClick={() => { }}
                                        {...item}
                                    />
                                );
                            })}
                        </div>
                        {/* footer */}
                        <div className="flex justify-end">
                            <Button variant={TBUTTON_VARIANT.PRIMARY}>Submit</Button>
                            <Button variant={TBUTTON_VARIANT.PRIMARY} onClick={handleCloseModalUpdate}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Modal>
            )}

            {/* modal delete  */}
            {openModalDelete && (
                <Modal open={openModalDelete} close={handleCloseModalDelete}>
                    <form autoComplete="off" onSubmit={onhandleSubmitDeleteReserveTable}>
                        <Heading variant={"primary"}>Confirm DELETE the permission</Heading>
                        <div className="my-3 mx-2">
                            <p className="text-xl font-semibold capitalize mb-3">
                                Are you sure delete this permission
                            </p>

                            {/* input id clone */}
                            <InputField
                                type="text"
                                name="id"
                                hidden="true"
                                value={idReserveTableDelete}
                                onChange={() => { }}
                            />
                        </div>
                        {/* footer */}
                        <div className="flex justify-end">
                            <Button variant={TBUTTON_VARIANT.PRIMARY}>Submit</Button>
                            <Button variant={TBUTTON_VARIANT.PRIMARY} onClick={handleCloseModalDelete}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Modal>
            )}
        </Fragment>
    );
}

export default ReserveTableManagement;