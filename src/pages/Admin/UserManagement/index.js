import { Fragment, useEffect, useState } from "react";
import DataTable from "../../../components/DataTable";
import { dataUser } from "../../../data/fakeDataUser";
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
    //   required: true,
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

  // roles
  const [listRoles, setListRoles] = useState([]);

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
          if (item.roleId) {
            if (item.roleId === 1) {
              item.roleName = "Admin";
            } else if (item.roleId === 2) {
              item.roleName = "Manager";
            } else if (item.roleId === 3) {
              item.roleName = "Staff";
            } else if (item.roleId === 4) {
              item.roleName = "User";
            }
            delete item.roleId;
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
          if (item.roleId) {
            if (item.roleId === 1) {
              item.roleName = "Admin";
            } else if (item.roleId === 2) {
              item.roleName = "Manager";
            } else if (item.roleId === 3) {
              item.roleName = "Staff";
            } else if (item.roleId === 4) {
              item.roleName = "User";
            }
            delete item.roleId;
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

  // handle show modal
  const handleOpenModalRead = (id) => {
    setOpenModalRead(true);
    // console.log("id modal", id)
    // let filterUser =
    //   listUsersDetail.length > 0 &&
    //   listUsersDetail.filter((item) => item.id === id);
  };

  const handleCloseModalRead = () => {
    setOpenModalRead(false);
  };

  // modal create
  const handleOpenModalCreate = () => {
    setOpenModalCreate(true);
  };

  const handleCloseModalCreate = () => {
    setOpenModalCreate(false);

    // reset image
    setImage("");
  };

  // handle create user
  const onChangeInputCreate = (e) => {
    setValuesCreate({ ...valuesCreate, [e.target.name]: e.target.value });
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
  // console.log("gender", gender);

  // handle submit
  const onhandleSubmitCreateUsers = async (e) => {
    e.preventDefault();
    let newObj = { ...valuesCreate, roleId: roleIndex, gender: gender };       
    try {
      const respon = await userServices.handleCreateUser(newObj);      
      // console.log("respon", respon);

      if(respon && respon.errCode === 0) {
        handleCloseModalCreate();
      } else if(respon.errCode === 1) {
        alert(respon.message);
      }
    } catch (error) {
      console.log(error)
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
            />
          )}
        </div>
      </div>

      {/* modal show detail info user*/}
      {openModalRead && (
        <div></div>
        // <Modal open={openModalRead} close={handleCloseModalRead}>
        //   <Heading variant={"modal"}>
        //     Information user detail
        //   </Heading>
        //   <div className="">
        //     {inputs.map((item, index) => {
        //       if (item.type === "file") {
        //         return (
        //           <InputFile
        //             key={index}
        //             value={values[item.name]}
        //             onChange={onChangeInput}
        //             onlyRead={"true"}
        //             {...item}
        //           />
        //         );
        //       }

        //       return (
        //         <InputField
        //           key={index}
        //           value={values[item.name]}
        //           onChange={onChangeInput}
        //           onClick={() => {}}
        //           onlyRead={"true"}
        //           {...item}
        //         />
        //       );
        //     })}
        //   </div>
        //   {/* footer */}
        //   <div className="flex justify-end">
        //     <Button variant={"baseOrange"}>Submit</Button>
        //     <Button variant={"baseOrange"} onClick={handleCloseModalRead}>
        //       Cancel
        //     </Button>
        //   </div>
        // </Modal>
      )}

      {/* modal create user */}
      {openModalCreate && (
        <Modal open={openModalCreate} close={handleCloseModalCreate}>
          <form autoComplete="off" onSubmit={onhandleSubmitCreateUsers}>
            <Heading variant={"modal"}>Create user</Heading>
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
                      handleSelected={handleGetValueGender}
                      {...item}
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
                      handleSelected={handleGetValueRole}
                      {...item}
                    />
                  );
                }

                return (
                  <InputField
                    key={index}
                    onChange={onChangeInputCreate}
                    onClick={() => {}}
                    {...item}
                  />
                );
              })}
            </div>
            {/* footer */}
            <div className="flex justify-end">
              <Button variant={"baseOrange"}>Submit</Button>
              <Button variant={"baseOrange"} onClick={handleCloseModalCreate}>
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
