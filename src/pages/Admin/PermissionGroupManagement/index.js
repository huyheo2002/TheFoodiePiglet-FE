import { Fragment, useEffect, useState } from "react";
import DataTable from "../../../components/DataTable";
import * as permissionServices from "../../../services/permissionServices";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import Heading from "../../../components/Heading";
import InputField from "../../../components/FormControl/InputField";
import { TBUTTON_VARIANT } from "../../../types/button";
import { useAuth } from "../../../contexts/authContext";
import toast from "react-hot-toast";

function PermissionGroupManagement() {
  const currentPermissionGroup = "quan-ly-nhom-quyen";
  const { dataUser } = useAuth();
  const [listPermissionOfUser, setListPermissionOfUser] = useState([]);
  const [listPermissionCurrentInPage, setListPermissionCurrentInPage] =
    useState([]);

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
    if (response && response.errCode == 0) {
      const dataPermissionGroup = response.permissionGroup || [];

      const filterCurrentPermissionGroup =
        dataPermissionGroup.length > 0 &&
        dataPermissionGroup.filter(
          (item) => item.keyword === currentPermissionGroup
        );
      if (filterCurrentPermissionGroup.length > 0) {
        const responsePermission = await permissionServices.getAllPermission();
        if (responsePermission && responsePermission.errCode == 0) {
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

  const handleGetAllPermissionGroup = async () => {
    const response = await permissionServices.getAllPermissionGroup();
    if (response && response.errCode == 0) {
      const dataPermissionGroup = response.permissionGroup || [];
      let splitFields =
        dataPermissionGroup.length > 0 &&
        dataPermissionGroup.map((item) => {
          if (item.createdAt || item.updatedAt) {
            delete item.createdAt;
            delete item.updatedAt;
          }

          return item;
        });

      if (splitFields.length > 0) {
        setListPermissionGroup(splitFields);
      }
    }
  };

  useEffect(() => {
    handleGetAllPermissionGroup();
  }, []);

  const handleOpenModalCreate = () => {
    setOpenModalCreate(true);
  };

  const handleCloseModalCreate = () => {
    setOpenModalCreate(false);
  };

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
            sanitizedUser[key] = "";
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
            sanitizedUser[key] = "";
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

  const onChangeInputCreate = (e) => {
    setValuesCreate({ ...valuesCreate, [e.target.name]: e.target.value });
  };

  const inputCreateClear = (getKey) => {
    setValuesCreate({ ...valuesCreate, [getKey]: "" });
  };

  const onChangeInputUpdate = (e) => {
    setValuesUpdate({ ...valuesUpdate, [e.target.name]: e.target.value });
  };

  const inputUpdateClear = (getKey) => {
    setValuesUpdate({ ...valuesUpdate, [getKey]: "" });
  };

  const onhandleSubmitCreatePermissionGroup = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    try {
      const response = await permissionServices.handleCreatePermissionGroup(data);

      if (response && response.errCode === 0) {
        handleCloseModalCreate();
        handleGetAllPermissionGroup();
        toast.success("Create permission group successfully");
      } else {
        toast.error("Error when create permission group");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onhandleSubmitUpdatePermissionGroup = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    if (valuesUpdate) {
      data.set("id", valuesUpdate.id);
    }

    try {
      const response = await permissionServices.handleUpdatePermissionGroup(data);

      if (response && response.errCode === 0) {
        handleCloseModalUpdate();
        handleGetAllPermissionGroup();
        toast.success("Updating permission group successfully");
      } else {
        toast.error("Error when updating permission group");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onhandleSubmitDeletePermissionGroup = async (e) => {
    e.preventDefault();

    try {
      const response = await permissionServices.handleDeletePermissionGroup(
        idPermissionGroupDelete
      );
      if (response && response.errCode === 0) {
        handleCloseModalDelete();
        handleGetAllPermissionGroup();
        toast.success("Deleting permission group successfully");
      } else {
        toast.error("Error when deleting permission group");
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
              // permission
              listPermission={listPermissionOfUser}
              listPermissionCurrentInPage={listPermissionCurrentInPage}
            />
          )}
        </div>
      </div>

      {openModalCreate && (
        <Modal open={openModalCreate} close={handleCloseModalCreate}>
          <form
            autoComplete="off"
            onSubmit={onhandleSubmitCreatePermissionGroup}
          >
            <Heading variant={"primary"}>Create permission group</Heading>
            <div className="">
              {inputs.map((item, index) => {
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

      {openModalRead && (
        <Modal open={openModalRead} close={handleCloseModalRead}>
          <Heading variant={"primary"}>
            Information permission group detail
          </Heading>
          <div className="">
            {inputs.map((item, index) => {
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

      {openModalUpdate && (
        <Modal open={openModalUpdate} close={handleCloseModalUpdate}>
          <form
            autoComplete="off"
            onSubmit={onhandleSubmitUpdatePermissionGroup}
          >
            <Heading variant={"primary"}>Update permission group</Heading>
            <div className="">
              {inputs.map((item, index) => {
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

      {openModalDelete && (
        <Modal open={openModalDelete} close={handleCloseModalDelete}>
          <form
            autoComplete="off"
            onSubmit={onhandleSubmitDeletePermissionGroup}
          >
            <Heading variant={"primary"}>
              Confirm DELETE the permission group
            </Heading>
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

export default PermissionGroupManagement;
