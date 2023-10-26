import { Fragment, useEffect, useState } from "react";
import DataTable from "../../../components/DataTable";
import * as userServices from "../../../services/userServices";
import Modal from "../../../components/Modal";
import Heading from "../../../components/Heading";
import InputField from "../../../components/FormControl/InputField";
import InputFile from "../../../components/FormControl/inputFile";
import Button from "../../../components/Button";
import InputRadio from "../../../components/FormControl/inputRadio";
import * as roleServices from "../../../services/roleServices";

function UserManagement() {
  const [listUsers, setListUsers] = useState([]);
  const [listUsersDetail, setListUsersDetail] = useState([]);
  const [valuesCreate, setValuesCreate] = useState({});
  const [image, setImage] = useState("");
  const [gender, setGender] = useState(-1);
  const [roleIndex, setRoleIndex] = useState(-1);

  const inputs = [
    // {
    //   id: 1,
    //   name: "id",
    //   type: "text",
    //   placeholder: "Enter your username",
    //   label: "Id",
    //   readOnly: true
    // },
    {
      id: 2,
      name: "username",
      type: "text",
      placeholder: "Enter your username",
      label: "username",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      label: "password",
      required: true,
    },
    {
      id: 4,
      name: "email",
      type: "text",
      placeholder: "Enter your email",
      label: "Email",
      // required: true,
    },
    {
      id: 5,
      name: "name",
      type: "text",
      placeholder: "Enter your name",
      label: "Name",
      // required: true,
    },
    {
      id: 6,
      name: "phone",
      type: "text",
      placeholder: "Enter your phone",
      label: "phone",
      // required: true,
    },
    {
      id: 7,
      name: "address",
      type: "text",
      placeholder: "Enter your address",
      label: "address",
      // required: true,
    },
    {
      id: 8,
      name: "gender",
      type: "radio",
      label: "gender",
      required: true,
    },
    {
      id: 9,
      name: "roleId",
      type: "radio",
      label: "role",
      required: true,
    },
    // {
    //   id: 10,
    //   name: "createdAt",
    //   type: "text",
    //   placeholder: "Enter your createdAt",
    //   label: "createdAt",
    // },
    // {
    //   id: 11,
    //   name: "updatedAt",
    //   type: "text",
    //   placeholder: "Enter your updatedAt",
    //   label: "updatedAt",
    // },
    {
      id: 12,
      name: "avatar",
      type: "file",
      placeholder: "Enter your avatar",
      label: "avatar",
      accept: "image/png, image/jpeg, image/gif, image/jpg",
    },
  ];

  // modal read
  const [openModalRead, setOpenModalRead] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  // roles
  const [listRoles, setListRoles] = useState([]);

  // data CURD
  const [dataRead, setDataRead] = useState({});
  const [valuesUpdate, setValuesUpdate] = useState({});
  const [idUserDelete, setIdUserDelete] = useState(-1);

  // get list roles
  const handleGetlistRoles = async () => {
    const res = await roleServices.getAllRoles("all");
    if (res && res.errCode === 0) {
      setListRoles(res.roles);
    }
  };
  useEffect(() => {
    handleGetlistRoles();
  }, []);

  // handle get api users full
  const handleGetAllUsers = async () => {
    const res = await userServices.getAllUsers("all");
    if (res && res.errCode === 0 && res.users) {
      const dataListUsers = res.users || [];
      let splitFields =
        dataListUsers.length > 0 &&
        dataListUsers.map((item) => {
          if(item.Role) {
            item.roleName = item.Role.name;
            delete item.Role;
          }

          return item;
        });

      // show full info
      if (splitFields.length > 0) {
        setListUsersDetail(splitFields);
      }
    }
  };

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  const handleGetAllUsersCompact = async () => {
    const res = await userServices.getAllUsersCompact("all");
    if (res && res.errCode === 0 && res.users) {
      const dataListUsers = res.users || [];
      let splitFields =
        dataListUsers.length > 0 &&
        dataListUsers.map((item) => {
          if (item.Role) {
            item.roleName = item.Role.name;

            delete item.roleId;
            delete item.Role;
          }

          return item;
        });

      // show full info
      if (splitFields.length > 0) {
        setListUsers(splitFields);
      }
    }
  };

  useEffect(() => {
    handleGetAllUsersCompact();
  }, []);

  // handle modal show info user
  const handleOpenModalRead = (id) => {
    setOpenModalRead(true);
    let filterUser =
      listUsersDetail.length > 0 &&
      listUsersDetail.filter((item) => item.id === id);

    if (filterUser) {
      filterUser = filterUser.map((user) => {
        const sanitizedUser = {};
        for (const key in user) {
          if (user[key] === null || user[key] === undefined) {
            sanitizedUser[key] = '';
          } else {
            sanitizedUser[key] = user[key];
          }
        }
        return sanitizedUser;
      });
    }

    if (listUsersDetail.length > 0) {
      setDataRead(filterUser[0]);
    }
  };

  const handleCloseModalRead = () => {
    setOpenModalRead(false);

    // reset input radio
    setGender(-1);
    setRoleIndex(-1);
  };

  // modal create user
  const handleOpenModalCreate = () => {
    setOpenModalCreate(true);
  };

  const handleCloseModalCreate = () => {
    setOpenModalCreate(false);

    // reset input radio
    setGender(-1);
    setRoleIndex(-1);

    // reset image
    setImage("");
  };

  // modal update user
  const handleOpenModalUpdate = (id) => {
    setOpenModalUpdate(true);
    let filterUser =
      listUsersDetail.length > 0 &&
      listUsersDetail.filter((item) => item.id === id);

    if (filterUser) {
      filterUser = filterUser.map((user) => {
        const sanitizedUser = {};
        for (const key in user) {
          if (user[key] === null || user[key] === undefined) {
            sanitizedUser[key] = '';
          } else {
            sanitizedUser[key] = user[key];
          }
        }
        return sanitizedUser;
      });
    }

    if (listUsersDetail.length > 0) {
      let dataUserUpdate = { ...filterUser[0], ["password"]: "123" };
      setValuesUpdate(dataUserUpdate);
    }
  };

  const handleCloseModalUpdate = () => {
    setOpenModalUpdate(false);

    // reset input radio
    setGender(-1);
    setRoleIndex(-1);

    // reset image
    setImage("");
  };

  const handleOpenModalDelete = (id) => {
    setOpenModalDelete(true);
    setIdUserDelete(id);
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };
  // handle create user
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

  // handle preview image
  const handlePreviewImage = (e) => {
    const file = e.target.files[0];
    // console.log(URL.createObjectURL(file))
    // tự thêm attribute
    file.preview = URL.createObjectURL(file);
    setImage(file);
  };

  useEffect(() => {
    // cleanup
    return () => {
      // xóa ảnh cũ
      image && URL.revokeObjectURL(image.preview);
    };
  }, [image]);

  const handleGetValueGender = (currentValue) => {
    setGender(currentValue);
  };

  const handleGetValueRole = (currentValue) => {
    setRoleIndex(currentValue);
  };

  // handle submit
  const onhandleSubmitCreateUsers = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    // console.log("data:", data);
    // console.log("data entry:", Object.fromEntries(data.entries()));

    try {
      const respon = await userServices.handleCreateUser(data);
      // console.log("respon", respon);

      if (respon && respon.errCode === 0) {
        handleCloseModalCreate();
        handleGetAllUsers();
        handleGetAllUsersCompact();
      } else if (respon.errCode === 1) {
        alert(respon.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onhandleSubmitUpdateUser = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    if (valuesUpdate) {
      data.set("id", valuesUpdate.id)
    }

    console.log("data entry:", Object.fromEntries(data.entries()));
    try {
      const respon = await userServices.handleUpdateUser(data);

      if (respon && respon.errCode === 0) {
        handleCloseModalUpdate();
        handleGetAllUsers();
        handleGetAllUsersCompact();
      } else if (respon.errCode === 1) {
        alert(respon.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onhandleSubmitDeleteUser = async (e) => {
    e.preventDefault();

    try {
      const respon = await userServices.handleDeleteUser(idUserDelete);
      if (respon && respon.errCode === 0) {
        handleCloseModalDelete();
        handleGetAllUsers();
        handleGetAllUsersCompact();
      } else if (respon.errCode === 1) {
        alert(respon.message);
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
            Users Management
          </h1>
          {listUsers.length > 0 && (
            <DataTable
              data={listUsers}
              handleModalRead={handleOpenModalRead}
              handleModalCreate={handleOpenModalCreate}
              handleModalEdit={handleOpenModalUpdate}
              handleModalDelete={handleOpenModalDelete}
            />
          )}
        </div>
      </div>

      {/* modal show detail info user*/}
      {openModalRead && (
        <Modal open={openModalRead} close={handleCloseModalRead}>
          <Heading variant={"primary"}>Information user detail</Heading>
          <div className="">
            {inputs.map((item, index) => {
              const optionsGender = [
                { value: "1", label: "Male" },
                { value: "0", label: "Female" },
              ];

              let genderChecked = null;
              if (dataRead) {
                if (dataRead.gender === true) {
                  genderChecked = 1;
                } else {
                  genderChecked = 0;
                }
              }

              if (item.type === "password") {
                return (
                  <InputField
                    key={index}
                    value={dataRead[item.name]}
                    onChange={() => { }}
                    hidden={"true"}
                    {...item}
                  />
                );
              }

              if (item.type === "file") {
                // console.log("image", dataRead[item.name])
                return (
                  <InputFile
                    key={index}
                    value={dataRead[item.name]}
                    onChange={() => { }}
                    onlyRead={"true"}
                    imagePreview={dataRead[item.name]}
                    {...item}
                  />
                );
              }

              if (item.type === "radio" && item.name === "gender") {
                return (
                  <InputRadio
                    key={index}
                    options={optionsGender}
                    onChange={() => { }}
                    checked={genderChecked}
                    disable
                    {...item}
                    id={Math.floor(Math.random() * 10)}
                  />
                );
              }

              if (item.type === "radio" && item.name === "roleId") {
                const getDataFromRole =
                  listRoles.length > 0 &&
                  listRoles.map((option) => {
                    return {
                      value: option.id,
                      label: option.name,
                    };
                  });
               
                let roleChecked = null;
                if (dataRead) {
                  let filterRoleIndex =
                    getDataFromRole.length > 0 &&
                    getDataFromRole.filter(
                      (role) => role.label == dataRead.roleName
                    );
                  if (filterRoleIndex.length > 0) {
                    roleChecked = filterRoleIndex[0].value;
                  }
                }
                
                return (
                  <InputRadio
                    key={index}
                    options={getDataFromRole}
                    onChange={() => { }}
                    checked={roleChecked}
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

      {/* modal create user */}
      {openModalCreate && (
        <Modal open={openModalCreate} close={handleCloseModalCreate}>
          <form autoComplete="off" onSubmit={onhandleSubmitCreateUsers}>
            <Heading variant={"primary"}>Create user</Heading>
            <div className="">
              {inputs.map((item, index) => {
                const optionsGender = [
                  { value: "1", label: "Male" },
                  { value: "0", label: "Female" },
                ];

                if (item.type === "file") {
                  return (
                    <InputFile
                      key={index}
                      onChange={handlePreviewImage}
                      imagePreview={image.preview}
                      {...item}
                    />
                  );
                }

                if (item.type === "radio" && item.name === "gender") {
                  return (
                    <InputRadio
                      key={index}
                      options={optionsGender}
                      // handleSelected={handleGetValueGender}
                      onChange={handleGetValueGender}
                      {...item}
                      id={Math.floor(Math.random() * 10)}
                    />
                  );
                }

                if (item.type === "radio" && item.name === "roleId") {
                  const getDataFromRole =
                    listRoles.length > 0 &&
                    listRoles.map((option) => {
                      return {
                        value: option.id,
                        label: option.name,
                      };
                    });

                  return (
                    <InputRadio
                      key={index}
                      options={getDataFromRole}
                      onChange={handleGetValueRole}
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

      {/* modal update user */}
      {openModalUpdate && (
        <Modal open={openModalUpdate} close={handleCloseModalUpdate}>
          <form autoComplete="off" onSubmit={onhandleSubmitUpdateUser}>
            <Heading variant={"primary"}>Update user</Heading>
            <div className="">
              {inputs.map((item, index) => {
                const optionsGender = [
                  { value: "1", label: "Male" },
                  { value: "0", label: "Female" },
                ];

                let genderChecked = null;
                if (valuesUpdate) {
                  if (valuesUpdate.gender === true) {
                    genderChecked = 1;
                  } else {
                    genderChecked = 0;
                  }
                }

                if (item.type === "password") {
                  return (
                    <InputField
                      key={index}
                      onChange={() => { }}
                      hidden={"true"}
                    />
                  );
                }

                if (item.type === "file") {
                  return (
                    <InputFile
                      key={index}
                      onChange={handlePreviewImage}
                      // value={valuesUpdate[item.name]}
                      imagePreview={image.preview ?? valuesUpdate[item.name]}
                      {...item}
                    />
                  );
                }

                if (item.type === "radio" && item.name === "gender") {
                  return (
                    <InputRadio
                      key={index}
                      options={optionsGender}
                      checked={gender !== -1 ? gender : genderChecked}
                      onChange={handleGetValueGender}
                      edit
                      {...item}
                      id={Math.floor(Math.random() * 10)}
                    />
                  );
                }

                if (item.type === "radio" && item.name === "roleId") {
                  const getDataFromRole =
                    listRoles.length > 0 &&
                    listRoles.map((option) => {
                      return {
                        value: option.id,
                        label: option.name,
                      };
                    });
                  let roleChecked = null;
                  if (valuesUpdate) {
                    let filterRoleIndex =
                      getDataFromRole.length > 0 &&
                      getDataFromRole.filter(
                        (role) => role.label == valuesUpdate.roleName
                      );
                    if (filterRoleIndex.length > 0) {
                      roleChecked = filterRoleIndex[0].value;
                    }
                  }
                  return (
                    <InputRadio
                      key={index}
                      options={getDataFromRole}
                      checked={roleIndex !== -1 ? roleIndex : roleChecked}
                      onChange={handleGetValueRole}
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

      {/* modal delete user */}
      {openModalDelete && (
        <Modal open={openModalDelete} close={handleCloseModalDelete}>
          <form autoComplete="off" onSubmit={onhandleSubmitDeleteUser}>
            <Heading variant={"primary"}>Confirm DELETE the user</Heading>
            <div className="my-3 mx-2">
              <p className="text-xl font-semibold capitalize mb-3">
                Are you sure delete this user
              </p>
              {listUsersDetail.length > 0 &&
                listUsersDetail
                  .filter((item) => item.id === idUserDelete)
                  .map((itemDelete, index) => {
                    const keys = Object.keys(itemDelete);

                    const username = keys.find(
                      (itemKey) => itemKey === "username"
                    );
                    const email = keys.find((itemKey) => itemKey === "email");

                    return (
                      <Fragment key={index}>
                        {username && (
                          <p className="text-base font-medium capitalize">
                            {username}
                            {": "}
                            <span className="text-base font-semibold ml-2">
                              {itemDelete.username}
                            </span>
                          </p>
                        )}
                        {email && (
                          <p className="text-base font-medium capitalize">
                            {email}
                            {": "}
                            <span className="text-base font-semibold ml-2">
                              {itemDelete.email}
                            </span>
                          </p>
                        )}
                      </Fragment>
                    );
                  })}

              {/* input id clone */}
              <InputField
                type="text"
                name="id"
                hidden="true"
                value={idUserDelete}
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

export default UserManagement;
