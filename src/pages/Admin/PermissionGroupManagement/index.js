import { Fragment, useEffect, useState } from "react";
import DataTable from "../../../components/DataTable";
import * as permissionServices from "../../../services/permissionServices";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import Heading from "../../../components/Heading";
import InputField from "../../../components/FormControl/InputField";

function PermissionGroupManagement() {
    const [listPermissionGroup, setListPermissionGroup] = useState([]);

    // MODAL
    const [openModalRead, setOpenModalRead] = useState(false);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);

    // INPUT 
    const inputs = [
        {
            id: 1,
            name: "name",
            type: "text",
            placeholder: "Enter your name permission group",
            label: "Name Permission Group",
            required: true,
        },
    ];
    const [valuesCreate, setValuesCreate] = useState({});
    const [dataRead, setDataRead] = useState({});
    const [valuesUpdate, setValuesUpdate] = useState({});
    const [idPermissionGroupDelete, setIdPermissionGroupDelete] = useState(-1);

    const handleGetAllPermissionGroup = async () => {
        const respon = await permissionServices.getAllPermissionGroup();
        if (respon && respon.errCode == 0) {
            const dataPermissionGroup = respon.permissionGroup || [];
            let splitFields =
                dataPermissionGroup.length > 0 &&
                dataPermissionGroup.map((item) => {
                    if (item.createdAt || item.updatedAt) {
                        delete item.createdAt;
                        delete item.updatedAt;
                    }

                    return item;
                })

            if (splitFields.length > 0) {
                setListPermissionGroup(splitFields);
            }
        }
    }

    useEffect(() => {
        handleGetAllPermissionGroup();
    }, [])

    // handle MODAL
    // -- modal create
    // modal create user
    const handleOpenModalCreate = () => {
        setOpenModalCreate(true);
    };

    const handleCloseModalCreate = () => {
        setOpenModalCreate(false);
    };

    // -- modal read
    const handleOpenModalRead = (id) => {
        setOpenModalRead(true);
        let filterPermissionGroup =
            listPermissionGroup.length > 0 &&
            listPermissionGroup.filter((item) => item.id === id);

        if (filterPermissionGroup) {
            filterPermissionGroup = filterPermissionGroup.map((item) => {
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

        if (filterPermissionGroup.length > 0) {
            setDataRead(filterPermissionGroup[0]);
        }
    };

    const handleCloseModalRead = () => {
        setOpenModalRead(false);
    };

    // modal update user
    const handleOpenModalUpdate = (id) => {
        setOpenModalUpdate(true);
        let filterPermissionGroup =
            listPermissionGroup.length > 0 &&
            listPermissionGroup.filter((item) => item.id === id);

        if (filterPermissionGroup) {
            filterPermissionGroup = filterPermissionGroup.map((item) => {
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

        if (filterPermissionGroup.length > 0) {
            setValuesUpdate(filterPermissionGroup[0]);
        }
    };

    const handleCloseModalUpdate = () => {
        setOpenModalUpdate(false);
    };

    const handleOpenModalDelete = (id) => {
        setOpenModalDelete(true);
        setIdPermissionGroupDelete(id);
    };

    const handleCloseModalDelete = () => {
        setOpenModalDelete(false);
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

    // handle submit
    const onhandleSubmitCreatePermissionGroup = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        // console.log("data:", data);
        // console.log("data entry:", Object.fromEntries(data.entries()));

        try {
            const respon = await permissionServices.handleCreatePermissionGroup(data);

            if (respon && respon.errCode === 0) {
                handleCloseModalCreate();
                handleGetAllPermissionGroup();
            } else if (respon.errCode !== 0) {
                alert(respon.message);
            } else {
                alert("Tạo nhóm quyền thất bại");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onhandleSubmitUpdatePermissionGroup = async (e) => {
        e.preventDefault();

        const data = new FormData(e.target);
        if (valuesUpdate) {
            data.set("id", valuesUpdate.id)
        }

        try {
            const respon = await permissionServices.handleUpdatePermissionGroup(data);

            if (respon && respon.errCode === 0) {
                handleCloseModalUpdate();
                handleGetAllPermissionGroup();
            } else if (respon.errCode !== 0) {
                alert(respon.message);
            } else {
                alert("Sửa nhóm quyền thất bại");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onhandleSubmitDeletePermissionGroup = async (e) => {
        e.preventDefault();

        try {
            const respon = await permissionServices.handleDeletePermissionGroup(idPermissionGroupDelete);
            if (respon && respon.errCode === 0) {
                handleCloseModalDelete();
                handleGetAllPermissionGroup();
            } else if (respon.errCode !== 0) {
                alert(respon.message);
            } else {
                alert("Xóa nhóm quyền thất bại");
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
                        Permission Group Management
                    </h1>
                    {listPermissionGroup.length > 0 && (
                        <DataTable
                            data={listPermissionGroup}
                            btnCreateTitle={"Create Permission Group"}
                            handleModalCreate={handleOpenModalCreate}
                            handleModalRead={handleOpenModalRead}
                            handleModalEdit={handleOpenModalUpdate}
                            handleModalDelete={handleOpenModalDelete}
                        />
                    )}
                </div>
            </div>

            {/* modal create */}
            {openModalCreate && (
                <Modal open={openModalCreate} close={handleCloseModalCreate}>
                    <form autoComplete="off" onSubmit={onhandleSubmitCreatePermissionGroup}>
                        <Heading variant={"primary"}>Create permission group</Heading>
                        <div className="">
                            {inputs.map((item, index) => {
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
                            <Button variant={"primary"}>Submit</Button>
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
                    <Heading variant={"primary"}>Information permission group detail</Heading>
                    <div className="">
                        {inputs.map((item, index) => {
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
                        <Button variant={"primary"} onClick={handleCloseModalRead}>
                            Cancel
                        </Button>
                    </div>
                </Modal>
            )}

            {/* modal update */}
            {openModalUpdate && (
                <Modal open={openModalUpdate} close={handleCloseModalUpdate}>
                    <form autoComplete="off" onSubmit={onhandleSubmitUpdatePermissionGroup}>
                        <Heading variant={"primary"}>Update permission group</Heading>
                        <div className="">
                            {inputs.map((item, index) => {
                                return (
                                    <InputField
                                        key={index}
                                        onChange={onChangeInputUpdate}
                                        clear={() => inputUpdateClear(item.name)}
                                        value={valuesUpdate[item.name]}
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

            {/* modal delete  */}
            {openModalDelete && (
                <Modal open={openModalDelete} close={handleCloseModalDelete}>
                    <form autoComplete="off" onSubmit={onhandleSubmitDeletePermissionGroup}>
                        <Heading variant={"primary"}>Confirm DELETE the permission group</Heading>
                        <div className="my-3 mx-2">
                            <p className="text-xl font-semibold capitalize mb-3">
                                Are you sure delete this permission group
                            </p>
                            
                            {/* input id clone */}
                            <InputField
                                type="text"
                                name="id"
                                hidden="true"
                                value={idPermissionGroupDelete}
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

export default PermissionGroupManagement;