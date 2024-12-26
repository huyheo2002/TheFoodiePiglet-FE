import { Fragment, useEffect, useState } from "react";
import DataTable from "../../../components/DataTable";
import * as roleServices from "../../../services/roleServices";
import * as permissionServices from "../../../services/permissionServices";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import Heading from "../../../components/Heading";
import InputField from "../../../components/FormControl/InputField";
import InputCheckbox from "../../../components/FormControl/inputCheckBox";
import { TBUTTON_VARIANT } from "../../../types/button";
import { useAuth } from "../../../contexts/authContext";
import toast from "react-hot-toast";

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
        const response = await permissionServices.getAllPermissionGroup();
        if (response && response.errCode === 0) {
            const dataPermissionGroup = response.permissionGroup || [];

            const filterCurrentPermissionGroup = dataPermissionGroup.length > 0 && dataPermissionGroup.filter((item) => item.keyword === currentPermissionGroup);
            if (filterCurrentPermissionGroup.length > 0) {
                const responsePermission = await permissionServices.getAllPermission();
                if (responsePermission && responsePermission.errCode === 0) {
                    const dataPermission = responsePermission.permission || [];

                    const filterCurrentPermission = dataPermission.length > 0 && dataPermission.filter(item => item.permissionGroupId === filterCurrentPermissionGroup[0].id)

                    if (filterCurrentPermission.length > 0) {
                        setListPermissionCurrentInPage(filterCurrentPermission);
                    }
                }
            }
        }
    }

    useEffect(() => {
        handlePermission();
        handleGetAllPermissionInPage();
    }, [])

    const handleGetAllPermission = async () => {
        const response = await permissionServices.getAllPermission();
        if (response && response.errCode === 0) {
            const dataPermission = response.permission || [];
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
        const response = await roleServices.getAllRolesWithPermission();

        const responsePermission = await permissionServices.getAllPermission();
        if (response && response.errCode === 0 && responsePermission && responsePermission.errCode === 0) {
            const listPermission = responsePermission.permission || [];
            const dataRole = response.roles || [];
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
        const response = await permissionServices.getAllPermissionGroup();
        if (response && response.errCode == 0) {
            setListPermissionGroup(response.permissionGroup);
        }
    }

    useEffect(() => {
        handleGetAllRole();
        handleGetAllPermission();
        handleGetAllPermissionGroup();
    }, []);

    // modal read
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

            const listPermissionId = listPermission.length > 0 && listPermission.reduce((filtered, item) => {
                const getAllPermissionCurrent = filterRole[0].listPermission || [];
                const filter = getAllPermissionCurrent.filter(permissionCurrent => permissionCurrent === item.name);

                if (filter.length > 0) {
                    filtered.push(item.id);
                }

                return filtered;
            }, [])

            if (listPermissionId.length > 0) {
                setListPermissionIdSelected(listPermissionId)
            }
        }
    };

    const handleCloseModalUpdate = () => {
        setOpenModalUpdate(false);
        setListPermissionSelected([]);
        setListPermissionIdSelected([]);
    };

    const handleOpenModalDelete = (id) => {
        setOpenModalDelete(true);
        setIdRoleDelete(id);
    };

    const handleCloseModalDelete = () => {
        setOpenModalDelete(false);
        setListPermissionSelected([]);
        setListPermissionIdSelected([]);
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

    const handleGetValuePermissionCheckbox = (currentValue) => {
        let filterPermission = listPermission.length > 0 && listPermission.filter(item => item.id === currentValue);
        if (filterPermission.length > 0) {
            let nameToAdd = filterPermission[0].name;

            if (listPermissionSelected.length > 0 && listPermissionSelected.includes(nameToAdd)) {
                const updatedList = listPermissionSelected.filter(name => name !== nameToAdd);
                setListPermissionSelected(updatedList);
                const updatedListWithId = listPermissionIdSelected.filter(id => id !== currentValue);
                setListPermissionIdSelected(updatedListWithId);
            } else {
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

        try {
            const response = await roleServices.handleCreateNewRole(data);

            if (response && response.errCode === 0) {
                handleCloseModalCreate();
                handleGetAllRole();
                handleGetAllPermission();
                handleGetAllPermissionGroup();
                toast.success("Create role successfully");
            } else if (response.errCode !== 0) {
                toast.error(response.message);
            } else {
                toast.error("Create role failed");
            }
        } catch (error) {
            console.error(error);
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
            const response = await roleServices.handleUpdateRole(data);

            if (response && response.errCode === 0) {
                handleCloseModalUpdate();
                handleGetAllRole();
                handleGetAllPermission();
                handleGetAllPermissionGroup();
                toast.success("Edit role successfully");
            } else if (response.errCode !== 0) {
                toast.error(response.message);
            } else {
                toast.error("Edit role failed");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onhandleSubmitDeleteRole = async (e) => {
        e.preventDefault();

        try {
            const response = await roleServices.handleDeleteRole(idRoleDelete);
            if (response && response.errCode === 0) {
                handleCloseModalDelete();
                handleGetAllRole();
                handleGetAllPermission();
                handleGetAllPermissionGroup();
                toast.success("Deleted role successfully");
            } else if (response.errCode !== 0) {
                toast.error(response.message);
            } else {
                toast.error("Deleted role failed");
            }
        } catch (error) {
            console.error(error);
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