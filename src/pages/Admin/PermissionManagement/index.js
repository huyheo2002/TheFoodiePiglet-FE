import { Fragment, useEffect, useState } from "react";
import DataTable from "../../../components/DataTable";
import * as permissionServices from "../../../services/permissionServices";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import Heading from "../../../components/Heading";
import InputField from "../../../components/FormControl/InputField";
import InputRadio from "../../../components/FormControl/inputRadio";
import { TBUTTON_VARIANT } from "../../../types/button";
import { useAuth } from "../../../contexts/authContext";
import toast from "react-hot-toast";

function PermissionManagement() {
  const currentPermissionGroup = "quan-ly-quyen";
  const { dataUser } = useAuth();
  const [listPermissionOfUser, setListPermissionOfUser] = useState([]);
  const [listPermissionCurrentInPage, setListPermissionCurrentInPage] =
    useState([]);

  const [listPermission, setListPermission] = useState([]);
  const [listPermissionGroup, setListPermissionGroup] = useState([]);

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Enter your name permission",
      label: "Permission",
      required: true,
    },
    {
      id: 2,
      name: "permissionGroupId",
      type: "radio",
      placeholder: "Enter your name permission group",
      label: "Permission Group",
      required: true,
    },
  ];

  const [valuesCreate, setValuesCreate] = useState({});
  const [dataRead, setDataRead] = useState({});
  const [valuesUpdate, setValuesUpdate] = useState({});
  const [idPermissionDelete, setIdPermissionDelete] = useState(-1);
  const [permissionGroupIndex, setPermissionGroupIndex] = useState(-1);

  // MODAL
  const [openModalRead, setOpenModalRead] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const handlePermission = async () => {
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

    if (splitFields.length > 0) {
      setListPermissionOfUser(splitFields);
    }
  };

  const handleGetAllPermissionInPage = async () => {
    const response = await permissionServices.getAllPermissionGroup();
    if (response && response.errCode === 0) {
      const dataPermissionGroup = response.permissionGroup || [];

      const filterCurrentPermissionGroup =
        dataPermissionGroup.length > 0 &&
        dataPermissionGroup.filter(
          (item) => item.keyword === currentPermissionGroup
        );

      if (filterCurrentPermissionGroup.length > 0) {
        const responsePermission = await permissionServices.getAllPermission();
        if (responsePermission && responsePermission.errCode === 0) {
          const dataPermission = responsePermission.permission || [];

          const filterCurrentPermission =
            dataPermission.length > 0 &&
            dataPermission.filter(
              (item) =>
                item.permissionGroupId === filterCurrentPermissionGroup[0].id
            );

          if (filterCurrentPermission.length > 0) {
            setListPermissionCurrentInPage(filterCurrentPermission);
          }
        }
      }
    }
  };

  useEffect(() => {
    handlePermission();
    handleGetAllPermissionInPage();
  }, []);

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
            delete item.permissionGroupId;
          }

          return item;
        });

      if (splitFields.length > 0) {
        setListPermission(splitFields);
      }
    }
  };

  const handleGetAllPermissionGroup = async () => {
    const response = await permissionServices.getAllPermissionGroup();
    if (response && response.errCode === 0) {
      setListPermissionGroup(response.permissionGroup);
    }
  };

  useEffect(() => {
    handleGetAllPermission();
    handleGetAllPermissionGroup();
  }, []);

  const handleOpenModalCreate = () => {
    setOpenModalCreate(true);
  };

  const handleCloseModalCreate = () => {
    setOpenModalCreate(false);
    setPermissionGroupIndex(-1);
  };

  const handleOpenModalRead = (id) => {
    setOpenModalRead(true);
    let filterPermission =
      listPermission.length > 0 &&
      listPermission.filter((item) => item.id === id);

    if (filterPermission) {
      filterPermission = filterPermission.map((item) => {
        const sanitizedUser = {};
        for (const key in item) {
          if (item[key] === null || item[key] === undefined) {
            sanitizedUser[key] = "";
          } else {
            sanitizedUser[key] = item[key];
          }
        }
        return sanitizedUser;
      });
    }

    if (filterPermission.length > 0) {
      setDataRead(filterPermission[0]);
    }
  };

  const handleCloseModalRead = () => {
    setOpenModalRead(false);
    setPermissionGroupIndex(-1);
  };

  const handleOpenModalUpdate = (id) => {
    setOpenModalUpdate(true);
    let filterPermission =
      listPermission.length > 0 &&
      listPermission.filter((item) => item.id === id);

    if (filterPermission) {
      filterPermission = filterPermission.map((item) => {
        const sanitizedUser = {};
        for (const key in item) {
          if (item[key] === null || item[key] === undefined) {
            sanitizedUser[key] = "";
          } else {
            sanitizedUser[key] = item[key];
          }
        }
        return sanitizedUser;
      });
    }

    if (filterPermission.length > 0) {
      setValuesUpdate(filterPermission[0]);
    }
  };

  const handleCloseModalUpdate = () => {
    setOpenModalUpdate(false);
    setPermissionGroupIndex(-1);
  };

  const handleOpenModalDelete = (id) => {
    setOpenModalDelete(true);
    setIdPermissionDelete(id);
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

  // input radio :v
  const handleGetValuePermissionGroup = (currentValue) => {
    setPermissionGroupIndex(currentValue);
  };

  // handle submit
  const onhandleSubmitCreatePermission = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    try {
      const response = await permissionServices.handleCreatePermission(data);
      if (response && response.errCode === 0) {
        handleCloseModalCreate();
        handleGetAllPermission();
        setPermissionGroupIndex(-1);
        toast.success("Create permission successfully");
      } else {
        toast.error("Error when create permission");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onhandleSubmitUpdatePermission = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    if (valuesUpdate) {
      data.set("id", valuesUpdate.id);
    }

    try {
      const response = await permissionServices.handleUpdatePermission(data);
      if (response && response.errCode === 0) {
        handleCloseModalUpdate();
        handleGetAllPermission();
        setPermissionGroupIndex(-1);
        toast.success("Updating permisson successfully");
      } else {
        toast.error("Error when updating permission");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onhandleSubmitDeletePermission = async (e) => {
    e.preventDefault();

    try {
      const response = await permissionServices.handleDeletePermission(
        idPermissionDelete
      );
      if (response && response.errCode === 0) {
        handleCloseModalDelete();
        handleGetAllPermission();
        toast.success("Deleting permission successfully");
      } else {
        toast.error("Error when deleting permisison");
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
            Permission Management
          </h1>
          {listPermission.length > 0 && (
            <DataTable
              data={listPermission}
              btnCreateTitle={"Create Permission"}
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
          <form autoComplete="off" onSubmit={onhandleSubmitCreatePermission}>
            <Heading variant={"primary"}>Create permission</Heading>
            <div className="">
              {inputs.map((item, index) => {
                if (
                  item.type === "radio" &&
                  item.name === "permissionGroupId"
                ) {
                  const getDataFromPermissionGroup =
                    listPermissionGroup.length > 0 &&
                    listPermissionGroup.map((option) => {
                      return {
                        value: option.id,
                        label: option.name,
                      };
                    });

                  return (
                    <InputRadio
                      key={index}
                      options={getDataFromPermissionGroup}
                      onChange={handleGetValuePermissionGroup}
                      {...item}
                      id={Math.floor(Math.random() * 10)}
                    />
                  );
                }

                return (
                  <InputField
                    key={index}
                    onChange={onChangeInputCreate}
                    value={valuesCreate && valuesCreate[item.name]}
                    clear={() => inputCreateClear(item.name)}
                    onClick={() => {}}
                    {...item}
                  />
                );
              })}
            </div>
            {/* footer */}
            <div className="flex justify-end">
              <Button variant={TBUTTON_VARIANT.PRIMARY}>Submit</Button>
              <Button
                variant={TBUTTON_VARIANT.PRIMARY}
                onClick={handleCloseModalCreate}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* modal read */}
      {openModalRead && (
        <Modal open={openModalRead} close={handleCloseModalRead}>
          <Heading variant={"primary"}>Information permission detail</Heading>
          <div className="">
            {inputs.map((item, index) => {
              if (item.type === "radio" && item.name === "permissionGroupId") {
                const getDataFromPermissionGroup =
                  listPermissionGroup.length > 0 &&
                  listPermissionGroup.map((option) => {
                    return {
                      value: option.id,
                      label: option.name,
                    };
                  });

                let permissionGroupChecked = null;
                if (dataRead) {
                  let filterRoleIndex =
                    getDataFromPermissionGroup.length > 0 &&
                    getDataFromPermissionGroup.filter(
                      (permissionGroup) =>
                        permissionGroup.label == dataRead.permissionGroupName
                    );
                  if (filterRoleIndex.length > 0) {
                    permissionGroupChecked = filterRoleIndex[0].value;
                  }
                }

                return (
                  <InputRadio
                    key={index}
                    options={getDataFromPermissionGroup}
                    onChange={handleGetValuePermissionGroup}
                    checked={permissionGroupChecked}
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
                  {...item}
                />
              );
            })}
          </div>
          {/* footer */}
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

      {/* modal update */}
      {openModalUpdate && (
        <Modal open={openModalUpdate} close={handleCloseModalUpdate}>
          <form autoComplete="off" onSubmit={onhandleSubmitUpdatePermission}>
            <Heading variant={"primary"}>Update permission</Heading>
            <div className="">
              {inputs.map((item, index) => {
                if (
                  item.type === "radio" &&
                  item.name === "permissionGroupId"
                ) {
                  const getDataFromPermissionGroup =
                    listPermissionGroup.length > 0 &&
                    listPermissionGroup.map((option) => {
                      return {
                        value: option.id,
                        label: option.name,
                      };
                    });

                  let permissionGroupChecked = null;
                  if (valuesUpdate) {
                    let filterRoleIndex =
                      getDataFromPermissionGroup.length > 0 &&
                      getDataFromPermissionGroup.filter(
                        (permissionGroup) =>
                          permissionGroup.label ==
                          valuesUpdate.permissionGroupName
                      );
                    if (filterRoleIndex.length > 0) {
                      permissionGroupChecked = filterRoleIndex[0].value;
                    }
                  }

                  return (
                    <InputRadio
                      key={index}
                      options={getDataFromPermissionGroup}
                      onChange={handleGetValuePermissionGroup}
                      checked={
                        permissionGroupIndex !== -1
                          ? permissionGroupIndex
                          : permissionGroupChecked
                      }
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
                    clear={() => inputUpdateClear(item.name)}
                    value={valuesUpdate[item.name]}
                    onClick={() => {}}
                    {...item}
                  />
                );
              })}
            </div>
            {/* footer */}
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

      {/* modal delete  */}
      {openModalDelete && (
        <Modal open={openModalDelete} close={handleCloseModalDelete}>
          <form autoComplete="off" onSubmit={onhandleSubmitDeletePermission}>
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
                value={idPermissionDelete}
                onChange={() => {}}
              />
            </div>
            {/* footer */}
            <div className="flex justify-end">
              <Button variant={TBUTTON_VARIANT.PRIMARY}>Submit</Button>
              <Button
                variant={TBUTTON_VARIANT.PRIMARY}
                onClick={handleCloseModalDelete}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </Fragment>
  );
}

export default PermissionManagement;
