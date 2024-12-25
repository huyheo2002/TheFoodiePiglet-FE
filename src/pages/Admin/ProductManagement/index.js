import { Fragment, useEffect, useState } from "react";
import DataTable from "../../../components/DataTable";
import * as productServices from "../../../services/productServices";
import * as categoryServices from "../../../services/categoryServices";
import { BookOpenIcon, PencilIcon, TrashIcon } from "../../../components/Icons";
import Modal from "../../../components/Modal";
import Heading from "../../../components/Heading";
import InputField from "../../../components/FormControl/InputField";
import InputFile from "../../../components/FormControl/inputFile";
import Button from "../../../components/Button";
import InputRadio from "../../../components/FormControl/inputRadio";
import { useNavigate } from "react-router-dom";
import * as permissionServices from "../../../services/permissionServices";
import { TBUTTON_VARIANT } from "../../../types/button";
import { useAuth } from "../../../contexts/authContext";

function ProductManagement() {
  const navigate = useNavigate();

  const currentPermissionGroup = "quan-ly-san-pham";
  const [listPermissionOfUser, setListPermissionOfUser] = useState([]);
  const [listPermissionCurrentInPage, setListPermissionCurrentInPage] =
    useState([]);
  const { dataUser } = useAuth();

  const [listProducts, setListProducts] = useState([]);
  const [listProductsCompact, setListProductsCompact] = useState([]);
  const [optionCategory, setOptionCategory] = useState([]);
  const [optionProdAvaiable] = useState([
    { label: "Avaiable", value: true },
    { label: "Unavaiable", value: false },
  ]);

  const [valuesCreate, setValuesCreate] = useState({});

  const manyFeatures = [
    {
      name: "read",
      icon: <BookOpenIcon />,
    },
    {
      name: "edit",
      icon: <PencilIcon />,
    },
    {
      name: "delete",
      icon: <TrashIcon />,
    },
    {
      name: "variant",
      icon: <BookOpenIcon />,
    },
  ];

  // inputs products
  const inputProducts = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Enter your name",
      label: "name",
      required: true,
    },
    {
      id: 2,
      name: "desc",
      type: "text",
      placeholder: "Enter your description",
      label: "Description",
      // required: true,
    },
    {
      id: 3,
      name: "size",
      type: "radio",
      label: "Size",
      required: true,
    },
    {
      id: 4,
      name: "price",
      type: "number",
      placeholder: "Enter your price",
      label: "Price",
      required: true,
    },
    {
      id: 5,
      name: "categoryId",
      type: "radio",
      label: "Category",
      required: true,
    },
    {
      id: 6,
      name: "isAvailable",
      type: "radio",
      label: "isAvailable",
      required: true,
    },
    {
      id: 7,
      name: "image",
      type: "file",
      placeholder: "Enter your image",
      label: "Image",
      accept: "image/png, image/jpeg, image/gif, image/jpg",
    },
  ];

  const [openModalRead, setOpenModalRead] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState(-1);
  const [size, setSize] = useState(-1);
  const [isAvailable, setIsAvailable] = useState(-1);

  // data CURD
  const [dataRead, setDataRead] = useState({});
  const [valuesUpdate, setValuesUpdate] = useState({});
  const [idProductDelete, setIdProductDelete] = useState(-1);

  // handle permission
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
    const respon = await permissionServices.getAllPermissionGroup();
    if (respon && respon.errCode == 0) {
      const dataPermissionGroup = respon.permissionGroup || [];

      const filterCurrentPermissionGroup =
        dataPermissionGroup.length > 0 &&
        dataPermissionGroup.filter(
          (item) => item.keyword === currentPermissionGroup
        );
      if (filterCurrentPermissionGroup.length > 0) {
        const responPermission = await permissionServices.getAllPermission();
        if (responPermission && responPermission.errCode == 0) {
          const dataPermission = responPermission.permission || [];

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

  const updatedManyFeatures = manyFeatures.map((feature) => {
    const updatedFeature = {
      ...feature,
      onClick: (id) => {
        if (feature.name === "read") {
          handleOpenModalRead(id);
        } else if (feature.name === "edit") {
          handleOpenModalUpdate(id);
        } else if (feature.name === "delete") {
          handleOpenModalDelete(id);
        } else if (feature.name === "variant") {
          handleOpenPageVariant(id);
        }
      },
    };
    return updatedFeature;
  });

  const fetchListProducts = async () => {
    let respon = (await productServices.getAllProduct()) ?? null;
    if (respon) {
      setListProducts(respon.products);
    }
  };

  const fetchListProductsCompact = async () => {
    let respon = (await productServices.getAllProductCompact()) ?? null;
    if (respon) {
      const dataListProduct = respon.products || [];
      let splitFields =
        dataListProduct.length > 0 &&
        dataListProduct.map((item) => {
          if (item.Variants) {
            if (item.Variants.length > 0) {
              let minPrice = item.Variants[0].price;
              let maxPrice = item.Variants[0].price;

              for (const variant of item.Variants) {
                if (variant.price < minPrice) {
                  minPrice = variant.price;
                }
                if (variant.price > maxPrice) {
                  maxPrice = variant.price;
                }
              }

              if (minPrice === maxPrice) {
                item.price = `${minPrice} $` ?? `0 $`;
              } else {
                item.price = `${minPrice} ~ ${maxPrice} $` ?? `0 $`;
              }

              delete item.Variants;
            }
          }

          if (item.Category) {
            item.categoryName = item.Category.name;
            delete item.Category;
          }

          return item;
        });

      if (splitFields.length > 0) {
        setListProductsCompact(splitFields);
      }
    }
  };

  const optionsCategory = async () => {
    let respon =
      (await categoryServices.getAllorOneCategoryOfProduct("all")) ?? null;
    if (respon) {
      const options = respon.categories || [];
      let splitFields =
        options.length > 0 &&
        options.map((item) => {
          if (item.id && item.name) {
            item.value = item.id;
            item.label = item.name;
          }
          return item;
        });

      if (splitFields.length > 0) {
        setOptionCategory(splitFields);
      }
    }
  };

  useEffect(() => {
    fetchListProducts();
    fetchListProductsCompact();
    optionsCategory();
  }, []);

  // modal create product
  const handleOpenModalCreate = () => {
    setOpenModalCreate(true);
  };

  const handleCloseModalCreate = () => {
    setOpenModalCreate(false);
    setCategoryId(-1);
    setIsAvailable(-1);
    setImage("");
  };

  const [permissionCreate, setPermissionCreate] = useState(false);
  const [permissionRead, setPermissionRead] = useState(false);
  const [permissionUpdate, setPermissionUpdate] = useState(false);
  const [permissionDelete, setPermissionDelete] = useState(false);

  // handle permission
  const handleOpenFeatures = () => {
    if (listPermissionCurrentInPage && listPermissionCurrentInPage.length > 0) {
      listPermissionCurrentInPage.map((item) => {
        // check views
        let strKeyword = item.keyword || "";
        let convertToArray = strKeyword.split("-");
        let getKeyword = convertToArray.length > 0 && convertToArray[0];

        const filterPermission =
          listPermissionOfUser.length > 0 &&
          listPermissionOfUser.filter(
            (itemFilter) => itemFilter.permissionId === item.id
          );
        if (getKeyword === "view") {
          if (filterPermission.length > 0) {
            setPermissionRead(true);
          }
        } else if (getKeyword === "create") {
          if (filterPermission.length > 0) {
            setPermissionCreate(true);
          }
        } else if (getKeyword === "update") {
          if (filterPermission.length > 0) {
            setPermissionUpdate(true);
          }
        } else if (getKeyword === "delete") {
          if (filterPermission.length > 0) {
            setPermissionDelete(true);
          }
        }
      });
    }
  };

  useEffect(() => {
    handleOpenFeatures();
  }, []);

  // modal read
  const handleOpenModalRead = (id) => {
    setOpenModalRead(true);
    let filterProduct =
      listProducts.length > 0 && listProducts.filter((item) => item.id === id);

    if (filterProduct) {
      filterProduct = filterProduct.map((product) => {
        const sanitizedUser = {};
        for (const key in product) {
          if (
            product.Variants &&
            product.Variants.length > 0 &&
            key == "Variants"
          ) {
            sanitizedUser["price"] = product.Variants[0].price;
          }
          if (product[key] === null || product[key] === undefined) {
            sanitizedUser[key] = "";
          } else {
            sanitizedUser[key] = product[key];
          }
        }
        return sanitizedUser;
      });
    }

    if (filterProduct.length > 0) {
      setDataRead(filterProduct[0]);
    }
  };

  const handleCloseModalRead = () => {
    setOpenModalRead(false);

    // reset input radio
    setCategoryId(-1);
    setIsAvailable(-1);
  };

  // modal update
  const handleOpenModalUpdate = (id) => {
    setOpenModalUpdate(true);
    let filterProduct =
      listProducts.length > 0 && listProducts.filter((item) => item.id === id);

    if (filterProduct) {
      filterProduct = filterProduct.map((product) => {
        const sanitizedUser = {};
        for (const key in product) {
          if (product[key] === null || product[key] === undefined) {
            sanitizedUser[key] = "";
          } else {
            sanitizedUser[key] = product[key];
          }
        }
        return sanitizedUser;
      });
    }

    if (listProducts.length > 0) {
      let dataProductUpdate = { ...filterProduct[0] };
      setValuesUpdate(dataProductUpdate);
    }
  };

  const handleCloseModalUpdate = () => {
    setOpenModalUpdate(false);
    setCategoryId(-1);
    setIsAvailable(-1);
    setImage("");
  };

  const handleOpenModalDelete = (id) => {
    setOpenModalDelete(true);
    setIdProductDelete(id);
    // if (permissionDelete) {
    // } else {
    //     alert("Bạn chưa được cấp quyền để thực hiện chức năng này")
    // }
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const handleOpenPageVariant = (id) => {
    navigate(`/system/product/${id}`);
  };

  // handle preview image
  const handlePreviewImage = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setImage(file);
  };

  useEffect(() => {
    return () => {
      image && URL.revokeObjectURL(image.preview);
    };
  }, [image]);

  // onchangeInput
  const onChangeInputCreate = (e) => {
    setValuesCreate({ ...valuesCreate, [e.target.name]: e.target.value });
  };

  const onChangeInputUpdate = (e) => {
    setValuesUpdate({ ...valuesUpdate, [e.target.name]: e.target.value });
  };

  const inputCreateClear = (getKey) => {
    setValuesCreate({ ...valuesCreate, [getKey]: "" });
  };

  const inputUpdateClear = (getKey) => {
    setValuesUpdate({ ...valuesUpdate, [getKey]: "" });
  };

  // radio
  const handleGetValueCategory = (currentValue) => {
    setCategoryId(currentValue);
  };

  const handleGetValueProdAvaialbe = (currentValue) => {
    setIsAvailable(currentValue);
  };

  const handleGetValueSize = (currentValue) => {
    setSize(currentValue);
  };

  // submit
  const onhandleSubmitCreateProduct = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    try {
      const respon = await productServices.handleCreateProduct(data);
      if (respon && respon.errCode === 0) {
        handleCloseModalCreate();
        fetchListProducts();
        fetchListProductsCompact();
      } else if (respon.errCode === 1) {
        alert(respon.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onhandleSubmitUpdateProduct = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    if (valuesUpdate) {
      data.set("id", valuesUpdate.id);
    }

    try {
      const respon = await productServices.handleUpdateProduct(data);

      if (respon && respon.errCode === 0) {
        handleCloseModalUpdate();
        fetchListProducts();
        fetchListProductsCompact();
      } else if (respon.errCode === 1) {
        alert(respon.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onhandleSubmitDeleteProduct = async (e) => {
    e.preventDefault();
    try {
      const respon = await productServices.handleDeleteProduct(idProductDelete);
      if (respon && respon.errCode === 0) {
        handleCloseModalDelete();
        fetchListProducts();
        fetchListProductsCompact();
      } else if (respon.errCode === 1) {
        alert(respon.message);
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
            Products Management
          </h1>
          {listProductsCompact.length > 0 && (
            <DataTable
              data={listProductsCompact}
              btnCreateTitle={"Create Product"}
              manyFeatures={updatedManyFeatures}
              handleModalCreate={handleOpenModalCreate}
              // handleModalRead={handleOpenModalRead}
              // handleModalEdit={handleOpenModalUpdate}
              // handleModalDelete={handleOpenModalDelete}
              // permission
              listPermission={listPermissionOfUser}
              listPermissionCurrentInPage={listPermissionCurrentInPage}
            />
          )}
        </div>
      </div>

      {/* modal create user */}
      {openModalCreate && (
        <Modal open={openModalCreate} close={handleCloseModalCreate}>
          <form autoComplete="off" onSubmit={onhandleSubmitCreateProduct}>
            <Heading variant={"primary"}>Create product</Heading>
            <div className="">
              {inputProducts.map((item, index) => {
                const optionsSize = [
                  { value: "S", label: "S" },
                  { value: "M", label: "M" },
                  { value: "L", label: "L" },
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

                if (item.type === "radio" && item.name === "size") {
                  return (
                    <InputRadio
                      key={index}
                      options={optionsSize}
                      onChange={handleGetValueSize}
                      {...item}
                      id={Math.floor(Math.random() * 10)}
                    />
                  );
                }

                if (item.type === "radio") {
                  switch (item.name) {
                    case "isAvailable": {
                      return (
                        <InputRadio
                          key={index}
                          options={optionProdAvaiable}
                          onChange={handleGetValueProdAvaialbe}
                          {...item}
                          id={Math.floor(Math.random() * 10)}
                        />
                      );
                    }

                    case "categoryId": {
                      return (
                        <InputRadio
                          key={index}
                          options={optionCategory}
                          onChange={handleGetValueCategory}
                          {...item}
                          id={Math.floor(Math.random() * 10)}
                        />
                      );
                    }
                    default:
                      return null;
                  }
                }

                return (
                  <InputField
                    key={index}
                    value={valuesCreate && valuesCreate[item.name]}
                    onChange={onChangeInputCreate}
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

      {/* modal show detail info user*/}
      {openModalRead && (
        <Modal open={openModalRead} close={handleCloseModalRead}>
          <Heading variant={"primary"}>Information product detail</Heading>
          <div className="">
            {inputProducts.map((item, index) => {
              if (item.type === "file") {
                return (
                  <InputFile
                    key={index}
                    value={dataRead[item.name]}
                    onChange={() => {}}
                    onlyRead={"true"}
                    imagePreview={dataRead[item.name]}
                    {...item}
                  />
                );
              }

              if (item.type === "radio" && item.name === "size") {
                return (
                  <InputRadio
                    key={index}
                    hidden={"true"}
                    {...item}
                    id={Math.floor(Math.random() * 10)}
                  />
                );
              }

              // if (item.type === "radio") {
              //   return (
              //     <InputRadio
              //       key={index}
              //       options={optionCategory}
              //       onChange={() => {}}
              //       checked={dataRead.categoryId ?? 1}
              //       disable
              //       {...item}
              //       id={Math.floor(Math.random() * 10)}
              //     />
              //   );
              // }

              if (item.type === "radio") {
                switch (item.name) {
                  case "isAvailable": {
                    return (
                      <InputRadio
                        key={index}
                        options={optionProdAvaiable}
                        onChange={() => {}}
                        checked={dataRead.isAvailable ?? 1}
                        disable
                        {...item}
                        id={Math.floor(Math.random() * 10)}
                      />
                    );
                  }

                  case "categoryId": {
                    return (
                      <InputRadio
                        key={index}
                        options={optionCategory}
                        onChange={() => {}}
                        checked={dataRead.categoryId ?? 1}
                        disable
                        {...item}
                        id={Math.floor(Math.random() * 10)}
                      />
                    );
                  }
                  default:
                    return null;
                }
              }
              //

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

      {/* modal update user */}
      {openModalUpdate && (
        <Modal open={openModalUpdate} close={handleCloseModalUpdate}>
          <form autoComplete="off" onSubmit={onhandleSubmitUpdateProduct}>
            <Heading variant={"primary"}>Update product</Heading>
            <div className="">
              {inputProducts.map((item, index) => {
                if (item.type === "file") {
                  return (
                    <InputFile
                      key={index}
                      onChange={handlePreviewImage}
                      imagePreview={image.preview ?? valuesUpdate[item.name]}
                      {...item}
                    />
                  );
                }

                if (item.type === "radio" && item.name === "size") {
                  return (
                    <InputRadio
                      key={index}
                      hidden={"true"}
                      {...item}
                      id={Math.floor(Math.random() * 10)}
                    />
                  );
                }

                if (item.name === "price") {
                  return (
                    <InputField
                      type="text"
                      name="price"
                      hidden="true"
                      onChange={() => {}}
                    />
                  );
                }

                if (item.type === "radio") {
                  switch (item.name) {
                    case "isAvailable": {
                      return (
                        <InputRadio
                          key={index}
                          options={optionProdAvaiable}
                          checked={
                            isAvailable !== -1
                              ? isAvailable
                              : valuesUpdate.isAvailable
                          }
                          onChange={handleGetValueProdAvaialbe}
                          edit
                          {...item}
                          id={Math.floor(Math.random() * 10)}
                        />
                      );
                    }

                    case "categoryId": {
                      return (
                        <InputRadio
                          key={index}
                          options={optionCategory}
                          checked={
                            categoryId !== -1
                              ? categoryId
                              : valuesUpdate.categoryId
                          }
                          onChange={handleGetValueCategory}
                          edit
                          {...item}
                          id={Math.floor(Math.random() * 10)}
                        />
                      );
                    }
                    default:
                      return null;
                  }
                }

                // if (item.type === "radio") {
                //   return (
                //     <InputRadio
                //       key={index}
                //       options={optionCategory}
                //       checked={
                //         categoryId !== -1 ? categoryId : valuesUpdate.categoryId
                //       }
                //       onChange={handleGetValueCategory}
                //       edit
                //       {...item}
                //       id={Math.floor(Math.random() * 10)}
                //     />
                //   );
                // }

                return (
                  <InputField
                    key={index}
                    onChange={onChangeInputUpdate}
                    value={valuesUpdate[item.name]}
                    clear={() => inputUpdateClear(item.name)}
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

      {/* modal delete user */}
      {openModalDelete && (
        <Modal open={openModalDelete} close={handleCloseModalDelete}>
          <form autoComplete="off" onSubmit={onhandleSubmitDeleteProduct}>
            <Heading variant={"primary"}>Confirm DELETE the product</Heading>
            <div className="my-3 mx-2">
              <p className="text-xl font-semibold capitalize mb-3">
                Are you sure delete this product
              </p>

              {/* input id clone */}
              <InputField
                type="text"
                name="id"
                hidden="true"
                value={idProductDelete}
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

export default ProductManagement;
