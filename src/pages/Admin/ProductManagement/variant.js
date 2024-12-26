import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as variantServices from "../../../services/variantServices";
import DataTable from "../../../components/DataTable";
import Modal from "../../../components/Modal";
import InputField from "../../../components/FormControl/InputField";
import InputRadio from "../../../components/FormControl/inputRadio";
import Button from "../../../components/Button";
import Heading from "../../../components/Heading";
import replaceNullUndefinedWithEmptyString from "../../../utils/replaceDataToEmptyString";
import * as permissionServices from "../../../services/permissionServices";
import { TBUTTON_VARIANT } from "../../../types/button";
import { useAuth } from "../../../contexts/authContext";

function VariantManagement() {
    const params = useParams();

    const currentPermissionGroup = "quan-ly-san-pham";
    const {dataUser } = useAuth();
    const [listPermissionOfUser, setListPermissionOfUser] = useState([]);
    const [listPermissionCurrentInPage, setListPermissionCurrentInPage] = useState([]);

    const [dataVariantInProduct, setDataVariantInProduct] = useState([]);

    const inputVariant = [
        {
            id: 1,
            name: "price",
            type: "number",
            placeholder: "Enter your price",
            label: "price",
            required: true,
        },
        {
            id: 2,
            name: "discountVariant",
            type: "number",
            placeholder: "Enter your discount variant",
            label: "Discount Variant",
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
            name: "productId",
            type: "text",
            label: "Product Id",
            required: true,
        },
    ];

    const [openModalRead, setOpenModalRead] = useState(false);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);

    const [size, setSize] = useState(-1);

    // data CURD
    const [valuesCreate, setValuesCreate] = useState({});
    const [dataRead, setDataRead] = useState({});
    const [valuesUpdate, setValuesUpdate] = useState({});
    const [idVariantInProductDelete, setIdVariantInProductDelete] = useState(-1);

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

        // show full info
        if (splitFields.length > 0) {
            setListPermissionOfUser(splitFields)
        }
    };

    const handleGetAllPermissionInPage = async () => {
        const response = await permissionServices.getAllPermissionGroup();
        if (response && response.errCode == 0) {
            const dataPermissionGroup = response.permissionGroup || [];

            const filterCurrentPermissionGroup = dataPermissionGroup.length > 0 && dataPermissionGroup.filter((item) => item.keyword === currentPermissionGroup);
            if (filterCurrentPermissionGroup.length > 0) {
                const responsePermission = await permissionServices.getAllPermission();
                if (responsePermission && responsePermission.errCode == 0) {
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

    const fetchDataVariantInProduct = async () => {
        let response = await variantServices.findVariantInProduct(params.id) ?? null;
        if (response) {
            const dataListVariantInProduct = response.variant || [];
            let splitFields =
                dataListVariantInProduct.length > 0 &&
                dataListVariantInProduct.map((item) => {
                    item.discountVariant = `${item.discountVariant} %`;
                    item.originalPrice = `${item.originalPrice} $`;
                    item.currentPrice = `${item.currentPrice} $`;

                    return item;
                });

            if (splitFields.length > 0) {
                setDataVariantInProduct(splitFields)
            }
        }
    }

    useEffect(() => {
        fetchDataVariantInProduct();
    }, [])

    // radio
    const handleGetValueSize = (currentValue) => {
        setSize(currentValue);
    };

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

    // modal create product
    const handleOpenModalCreate = () => {
        setOpenModalCreate(true);
    };

    const handleCloseModalCreate = () => {
        setOpenModalCreate(false);

        // reset input radio
        setSize(-1);
    };

    // modal read
    const handleOpenModalRead = async (id) => {
        setOpenModalRead(true);
        let response = await variantServices.findOneVariantInProduct(id) ?? null;
        if (response) {
            let filterVariant = replaceNullUndefinedWithEmptyString(response.variant);
            if (filterVariant) {
                setDataRead(filterVariant);
            }
        }
    };

    const handleCloseModalRead = () => {
        setOpenModalRead(false);

        // reset input radio
        setSize(-1);
    };

    // modal update
    const handleOpenModalUpdate = async (id) => {
        setOpenModalUpdate(true);
        let response = await variantServices.findOneVariantInProduct(id) ?? null;
        if (response) {
            let filterVariant = replaceNullUndefinedWithEmptyString(response.variant);
            if (filterVariant) {
                let dataVariantUpdate = { ...filterVariant };
                setValuesUpdate(dataVariantUpdate);
            }
        }
    };

    const handleCloseModalUpdate = () => {
        setOpenModalUpdate(false);

        // reset input radio
        setSize(-1);
    };

    const handleOpenModalDelete = (id) => {
        setOpenModalDelete(true);
        setIdVariantInProductDelete(id);
    };

    const handleCloseModalDelete = () => {
        setOpenModalDelete(false);
    };

    // onhandle submit
    const onhandleSubmitCreateProduct = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        try {
            const response = await variantServices.handleCreateVariant(data);
            if (response && response.errCode === 0) {
                handleCloseModalCreate();
                fetchDataVariantInProduct();
            } else if (response.errCode === 1) {
                alert(response.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onhandleSubmitUpdateVariant = async (e) => {
        e.preventDefault();

        const data = new FormData(e.target);
        if (valuesUpdate) {
            data.set("id", valuesUpdate.id)
        }

        try {
            const response = await variantServices.handleUpdateVariant(data);

            if (response && response.errCode === 0) {
                handleCloseModalUpdate();
                fetchDataVariantInProduct();
            } else if (response.errCode === 1) {
                alert(response.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onhandleSubmitDeleteVariant = async (e) => {
        e.preventDefault();
        try {
            const response = await variantServices.handleDeleteVariant(idVariantInProductDelete);
            if (response && response.errCode === 0) {
                handleCloseModalDelete();
                fetchDataVariantInProduct();
            } else if (response.errCode === 1) {
                alert(response.message);
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
                        Variant Product Management
                    </h1>
                    {dataVariantInProduct.length > 0 && (
                        <DataTable
                            data={dataVariantInProduct}
                            btnCreateTitle={"Create Variant"}
                            btnBack
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
                    <form autoComplete="off" onSubmit={onhandleSubmitCreateProduct}>
                        <Heading variant={"primary"}>Create Variant in product</Heading>
                        <div className="">
                            {inputVariant.map((item, index) => {
                                const optionsSize = [
                                    { value: "S", label: "S" },
                                    { value: "M", label: "M" },
                                    { value: "L", label: "L" },
                                ];

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
                                if (item.name === "productId") {
                                    return (
                                        <InputField
                                            key={index}
                                            type="text"
                                            name="productId"
                                            hidden="true"
                                            value={params.id}
                                            onChange={() => { }}
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

            {/* modal read*/}
            {openModalRead && (
                <Modal open={openModalRead} close={handleCloseModalRead}>
                    <Heading variant={"primary"}>Information product detail</Heading>
                    <div className="">
                        {inputVariant.map((item, index) => {
                            const optionsSize = [
                                { value: "S", label: "S" },
                                { value: "M", label: "M" },
                                { value: "L", label: "L" },
                            ];

                            if (item.type === "radio") {
                                return (
                                    <InputRadio
                                        key={index}
                                        options={optionsSize}
                                        onChange={() => { }}
                                        checked={dataRead.name ?? 1}
                                        disable
                                        {...item}
                                        id={Math.floor(Math.random() * 10)}
                                    />
                                );
                            }

                            if (item.name === "productId") {
                                return (
                                    <InputField
                                        key={index}
                                        type="text"
                                        name="productId"
                                        hidden="true"
                                        // value={params.id}
                                        onChange={() => { }}
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

            {/* modal update */}
            {openModalUpdate && (
                <Modal open={openModalUpdate} close={handleCloseModalUpdate}>
                    <form autoComplete="off" onSubmit={onhandleSubmitUpdateVariant}>
                        <Heading variant={"primary"}>Update variant in product</Heading>
                        <div className="">
                            {inputVariant.map((item, index) => {
                                const optionsSize = [
                                    { value: "S", label: "S" },
                                    { value: "M", label: "M" },
                                    { value: "L", label: "L" },
                                ];

                                if (item.type === "radio") {
                                    return (
                                        <InputRadio
                                            key={index}
                                            options={optionsSize}
                                            checked={size !== -1 ? size : valuesUpdate.name}
                                            onChange={handleGetValueSize}
                                            edit
                                            {...item}
                                            id={Math.floor(Math.random() * 10)}
                                        />
                                    );
                                }

                                if (item.name === "productId") {
                                    return (
                                        <InputField
                                            key={index}
                                            type="text"
                                            name="productId"
                                            hidden="true"
                                            value={params.id}
                                            onChange={() => { }}
                                        />
                                    )
                                }

                                return (
                                    <InputField
                                        key={index}
                                        onChange={onChangeInputUpdate}
                                        value={valuesUpdate[item.name]}
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

            {/* modal delete */}
            {openModalDelete && (
                <Modal open={openModalDelete} close={handleCloseModalDelete}>
                    <form autoComplete="off" onSubmit={onhandleSubmitDeleteVariant}>
                        <Heading variant={"primary"}>Confirm DELETE the variant in product</Heading>
                        <div className="my-3 mx-2">
                            <p className="text-xl font-semibold capitalize mb-3">
                                Are you sure delete this variant in product
                            </p>

                            {/* input id clone */}
                            <InputField
                                type="text"
                                name="id"
                                hidden="true"
                                value={idVariantInProductDelete}
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

export default VariantManagement;