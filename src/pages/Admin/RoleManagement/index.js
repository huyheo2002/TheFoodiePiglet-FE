import { Fragment, useEffect, useState } from "react";
import DataTable from "../../../components/DataTable";
import * as roleServices from "../../../services/roleServices";
import * as permissionServices from "../../../services/permissionServices";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import Heading from "../../../components/Heading";
import InputField from "../../../components/FormControl/InputField";
import InputCheckbox from "../../../components/FormControl/inputCheckBox";
import useLocalStorage from "../../../hooks/useLocalStorage";
import * as commonServices from "../../../services/commonServices";
import { TBUTTON_VARIANT } from "../../../types/button";
import { useAuth } from "../../../contexts/authContext";

function RoleManagement() {
    const currentPermissionGroup = "quan-ly-vai-tro";
    const { dataUser } = useAuth();
    const [listPermissionOfUser, setListPermissionOfUser] = useState([]);
    const [listPermissionCurrentInPage, setListPermissionCurrentInPage] = useState([]);

    const [listRole, setListRole] = useState([]);
    const [listPermission, setListPermission] = useState([]);
    const [listPermissionGroup, setListPermissionGroup] = useState([]);
    const [listPermissionSelected, setListPermissionSelected] = useState([]);
    const [listPermissionIdSelected, setListPermissionIdSelected] = useState([]);

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

    const handleGetAllPermission = async () => {
        const respon = await permissionServices.getAllPermission();
        // console.log("respon permission", respon)
        if (respon && respon.errCode == 0) {
            const dataPermission = respon.permission || [];
            let splitFields =
                dataPermission.length > 0 &&
                dataPermission.map((item) => {
                    if (item.createdAt || item.updatedAt) {
                        delete item.createdAt;
                        delete item.updatedAt;
                    }

                    if (item.PermissionGroup) {
                        item.permissionGroupName = item.PermissionGroup.name;
                        delete item.PermissionGroup;
                    }

                    return item;
                })

            // console.log("splitFields", splitFields)
            if (splitFields.length > 0) {
                setListPermission(splitFields);
            }
        }
    }

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
            placeholder: "Enter your name role",
            label: "Name Role",
            required: true,
        },
        {
            id: 2,
            name: "permission",
            type: "checkbox",
            placeholder: "Enter your name role",
            label: "Permission",
        },
    ];

    const [valuesCreate, setValuesCreate] = useState({});
    const [dataRead, setDataRead] = useState({});
    const [valuesUpdate, setValuesUpdate] = useState({});
    const [idRoleDelete, setIdRoleDelete] = useState(-1);

    const handleGetAllRole = async () => {
        const respon = await roleServices.getAllRolesWithPermission();

        const responPermission = await permissionServices.getAllPermission();
        // console.log("respon role", respon);
        if (respon && respon.errCode == 0 && responPermission && responPermission.errCode === 0) {
            const listPermission = responPermission.permission || [];
            const dataRole = respon.roles || [];
            // setListRole(dataRole);
            let splitFields =
                dataRole.length > 0 &&
                dataRole.map((item) => {
                    if (item.createdAt || item.updatedAt) {
                        delete item.createdAt;
                        delete item.updatedAt;
                    }

                    if (listPermission.length > 0) {
                        const listPermissionFilter = item.listPermission || [];
                        const newArrayPermission = listPermissionFilter.length > 0 && listPermissionFilter.reduce((filtered, item) => {
                            const listPermissionFilter = listPermission.filter(itemPermission => item.permissionId === itemPermission.id);

                            if (listPermissionFilter.length > 0) {
                                filtered.push(listPermissionFilter[0].name);
                            }

                            return filtered;
                        }, [])

                        if (newArrayPermission.length > 0) {
                            item.listPermission = newArrayPermission;
                        } else {
                            delete item.listPermission;
                        }
                    }

                    return item;
                })

            if (splitFields.length > 0) {
                setListRole(splitFields);
            }
        }
    }

    const handleGetAllPermissionGroup = async () => {
        const respon = await permissionServices.getAllPermissionGroup();
        if (respon && respon.errCode == 0) {
            setListPermissionGroup(respon.permissionGroup);
        }
    }

    useEffect(() => {
        handleGetAllRole();
        handleGetAllPermission();
        handleGetAllPermissionGroup();
    }, []);

    // -- modal read
    const handleOpenModalRead = (id) => {
        setOpenModalRead(true);
        let filterRole =
            listRole.length > 0 &&
            listRole.filter((item) => item.id === id);

        if (filterRole) {
            filterRole = filterRole.map((item) => {
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

        if (filterRole.length > 0) {
            setDataRead(filterRole[0]);
            setListPermissionSelected(filterRole[0].listPermission);
        }
    };

    const handleCloseModalRead = () => {
        setOpenModalRead(false);
        setListPermissionSelected([]);
    };

    // modal create user
    const handleOpenModalCreate = () => {
        setOpenModalCreate(true);
    };

    const handleCloseModalCreate = () => {
        setOpenModalCreate(false);
        // reset checkbox
        setListPermissionSelected([]);
        setListPermissionIdSelected([]);
    };

    // modal update user
    const handleOpenModalUpdate = (id) => {
        setOpenModalUpdate(true);
        let filterRole =
            listRole.length > 0 &&
            listRole.filter((item) => item.id === id);

        if (filterRole) {
            filterRole = filterRole.map((item) => {
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

        if (filterRole.length > 0) {
            setValuesUpdate(filterRole[0]);
            setListPermissionSelected(filterRole[0].listPermission);
            console.log("filterRole", filterRole[0].listPermission);

            const listPermissionId = listPermission.length > 0 && listPermission.reduce((filtered, item) => {
                const getAllPermissionCurrent = filterRole[0].listPermission || [];
                const filter = getAllPermissionCurrent.filter(permissionCurrent => permissionCurrent === item.name);

                if (filter.length > 0) {
                    filtered.push(item.id);
                }

                return filtered;
            }, [])

            // console.log("listPermissionId", listPermissionId)
            if (listPermissionId.length > 0) {
                setListPermissionIdSelected(listPermissionId)
            }
        }
    };

    // console.log("listPermission", listPermission);

    const handleCloseModalUpdate = () => {
        setOpenModalUpdate(false);
        // reset checkbox
        setListPermissionSelected([]);
        setListPermissionIdSelected([]);
    };

    const handleOpenModalDelete = (id) => {
        setOpenModalDelete(true);
        setIdRoleDelete(id);
    };

    const handleCloseModalDelete = () => {
        setOpenModalDelete(false);

        // reset checkbox
        setListPermissionSelected([]);
        setListPermissionIdSelected([]);
    };

    // console.log("listPermissionIdSelected", listPermissionIdSelected)
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

    const handleGetValuePermissionCheckbox = (currentValue) => {
        // console.log("check box currentValue", currentValue)
        let filterPermission = listPermission.length > 0 && listPermission.filter(item => item.id === currentValue);
        // console.log("filterPermission", filterPermission);
        if (filterPermission.length > 0) {
            let nameToAdd = filterPermission[0].name;

            if (listPermissionSelected.length > 0 && listPermissionSelected.includes(nameToAdd)) {
                // Nếu nameToAdd đã tồn tại trong mảng, thì xóa nó đi.
                const updatedList = listPermissionSelected.filter(name => name !== nameToAdd);
                setListPermissionSelected(updatedList);
                const updatedListWithId = listPermissionIdSelected.filter(id => id !== currentValue);
                setListPermissionIdSelected(updatedListWithId);
            } else {
                // Nếu nameToAdd chưa tồn tại trong mảng, thêm nó vào.
                setListPermissionSelected([...listPermissionSelected, nameToAdd]);
                setListPermissionIdSelected([...listPermissionIdSelected, currentValue]);
            }
        }
    };

    // handle submit
    const onhandleSubmitCreateRole = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        data.set("permission", listPermissionIdSelected);

        // console.log("data:", data);
        // console.log("data entry:", Object.fromEntries(data.entries()));


        try {
            const respon = await roleServices.handleCreateNewRole(data);

            if (respon && respon.errCode === 0) {
                handleCloseModalCreate();
                // reset data
                handleGetAllRole();
                handleGetAllPermission();
                handleGetAllPermissionGroup();
            } else if (respon.errCode !== 0) {
                alert(respon.message);
            } else {
                alert("Tạo vai trò thất bại");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onhandleSubmitUpdateRole = async (e) => {
        e.preventDefault();

        const data = new FormData(e.target);
        if (valuesUpdate) {
            data.set("id", valuesUpdate.id)
        }
        data.set("permission", listPermissionIdSelected);

        try {
            const respon = await roleServices.handleUpdateRole(data);

            if (respon && respon.errCode === 0) {
                handleCloseModalUpdate();
                // reset data
                handleGetAllRole();
                handleGetAllPermission();
                handleGetAllPermissionGroup();
            } else if (respon.errCode !== 0) {
                alert(respon.message);
            } else {
                alert("Sửa vai trò thất bại");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onhandleSubmitDeleteRole = async (e) => {
        e.preventDefault();

        try {
            const respon = await roleServices.handleDeleteRole(idRoleDelete);
            if (respon && respon.errCode === 0) {
                handleCloseModalDelete();
                // reset data
                handleGetAllRole();
                handleGetAllPermission();
                handleGetAllPermissionGroup();
            } else if (respon.errCode !== 0) {
                alert(respon.message);
            } else {
                alert("Xóa vai trò thất bại");
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
                        Role Management
                    </h1>
                    {listRole.length > 0 && (
                        <DataTable
                            data={listRole}
                            btnCreateTitle={"Create Role"}
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
                    <Heading variant={"primary"}>Information role detail</Heading>
                    <div className="">
                        {inputs.map((item, index) => {

                            if (item.type === "checkbox") {
                                const getDataFromPermissionGroup =
                                    listPermissionGroup.length > 0 &&
                                    listPermissionGroup.map((option) => {
                                        return {
                                            id: option.id,
                                            name: option.name,
                                        };
                                    });

                                const getOptionsFromPermission =
                                    listPermission.length > 0 &&
                                    listPermission.map((option) => {
                                        return {
                                            value: option.id,
                                            label: option.name,
                                            idGroup: option.permissionGroupId,
                                        };
                                    });

                                return (
                                    <InputCheckbox
                                        key={index}
                                        listItemSelected={listPermissionSelected}
                                        group={getDataFromPermissionGroup}
                                        options={getOptionsFromPermission}
                                        onChange={() => { }}
                                        {...item}
                                        id={Math.floor(Math.random() * 10)}
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
                    <form autoComplete="off" onSubmit={onhandleSubmitCreateRole}>
                        <Heading variant={"primary"}>Create permission</Heading>
                        <div className="">
                            {inputs.map((item, index) => {
                                if (item.type === "checkbox") {
                                    const getDataFromPermissionGroup =
                                        listPermissionGroup.length > 0 &&
                                        listPermissionGroup.map((option) => {
                                            return {
                                                id: option.id,
                                                name: option.name,
                                            };
                                        });

                                    const getOptionsFromPermission =
                                        listPermission.length > 0 &&
                                        listPermission.map((option) => {
                                            return {
                                                value: option.id,
                                                label: option.name,
                                                idGroup: option.permissionGroupId,
                                            };
                                        });

                                    return (
                                        <InputCheckbox
                                            key={index}
                                            listItemSelected={listPermissionSelected}
                                            group={getDataFromPermissionGroup}
                                            options={getOptionsFromPermission}
                                            onChange={handleGetValuePermissionCheckbox}
                                            {...item}
                                            id={Math.floor(Math.random() * 10)}
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
                    <form autoComplete="off" onSubmit={onhandleSubmitUpdateRole}>
                        <Heading variant={"primary"}>Update role</Heading>
                        <div className="">
                            {inputs.map((item, index) => {
                                if (item.type === "checkbox") {
                                    const getDataFromPermissionGroup =
                                        listPermissionGroup.length > 0 &&
                                        listPermissionGroup.map((option) => {
                                            return {
                                                id: option.id,
                                                name: option.name,
                                            };
                                        });

                                    const getOptionsFromPermission =
                                        listPermission.length > 0 &&
                                        listPermission.map((option) => {
                                            return {
                                                value: option.id,
                                                label: option.name,
                                                idGroup: option.permissionGroupId,
                                            };
                                        });

                                    return (
                                        <InputCheckbox
                                            key={index}
                                            listItemSelected={listPermissionSelected}
                                            group={getDataFromPermissionGroup}
                                            options={getOptionsFromPermission}
                                            onChange={handleGetValuePermissionCheckbox}
                                            {...item}
                                            id={Math.floor(Math.random() * 10)}
                                        />
                                    )

                                }

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
                    <form autoComplete="off" onSubmit={onhandleSubmitDeleteRole}>
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
                                value={idRoleDelete}
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

export default RoleManagement;