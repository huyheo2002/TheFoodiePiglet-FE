import { Fragment, useEffect, useState } from "react";
import DataTable from "../../../components/DataTable";
import * as productServices from "../../../services/productServices";
import * as categoryServices from "../../../services/categoryServices";
import {
    BookOpenIcon,
    DotHorizontalIcon,
    PencilIcon,
    PlusIcon,
    TrashIcon,
} from "../../../components/Icons";
import Modal from "../../../components/Modal";
import Heading from "../../../components/Heading";
import InputField from "../../../components/FormControl/InputField";
import InputFile from "../../../components/FormControl/inputFile";
import Button from "../../../components/Button";
import InputRadio from "../../../components/FormControl/inputRadio";
import { useNavigate } from "react-router-dom";

function ProductManagement() {
    const navigate = useNavigate();
    const [listProducts, setListProducts] = useState([])
    const [listProductsCompact, setListProductsCompact] = useState([])
    const [optionCategory, setOptionCategory] = useState([]);
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

    // data CURD
    const [dataRead, setDataRead] = useState({});
    const [valuesUpdate, setValuesUpdate] = useState({});
    const [idProductDelete, setIdProductDelete] = useState(-1);

    const updatedManyFeatures = manyFeatures.map((feature) => {
        const updatedFeature = {
            ...feature, onClick: (id) => {
                console.log("updatedFeature id", id)
                if (feature.name === "read") {
                    handleOpenModalRead(id);
                } else if (feature.name === "edit") {
                    handleOpenModalUpdate(id);
                } else if (feature.name === "delete") {
                    handleOpenModalDelete(id);
                } else if (feature.name === "variant") {
                    handleOpenPageVariant(id);
                }
            }
        };
        return updatedFeature;
    });

    const fetchListProducts = async () => {
        let respon = await productServices.getAllProduct() ?? null;
        if (respon) {
            setListProducts(respon.products)
            console.log("respon detail products", respon)
        }
    }

    const fetchListProductsCompact = async () => {
        let respon = await productServices.getAllProductCompact() ?? null;
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

                            if(minPrice === maxPrice) {
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
                setListProductsCompact(splitFields)
            }
            // console.log("respon prod compact", respon)
        }
    }

    const optionsCategory = async () => {
        let respon = await categoryServices.getAllorOneCategoryOfProduct("all") ?? null;
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
                setOptionCategory(splitFields)
            }
        }
    }

    useEffect(() => {
        fetchListProducts();
        fetchListProductsCompact();
        optionsCategory();
    }, [])

    // modal create product
    const handleOpenModalCreate = () => {
        setOpenModalCreate(true);
    };

    const handleCloseModalCreate = () => {
        setOpenModalCreate(false);

        // reset input radio
        setCategoryId(-1);
        // reset image
        setImage("");
    };

    // modal read 
    const handleOpenModalRead = (id) => {
        // console.log("id modal read", id);
        setOpenModalRead(true);
        let filterProduct =
            listProducts.length > 0 &&
            listProducts.filter((item) => item.id === id);

        if (filterProduct) {
            filterProduct = filterProduct.map((product) => {
                const sanitizedUser = {};
                for (const key in product) {
                    if (product.Variants && product.Variants.length > 0 && key == "Variants") {
                        sanitizedUser["price"] = product.Variants[0].price;
                    }
                    if (product[key] === null || product[key] === undefined) {
                        sanitizedUser[key] = '';
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
    };

    // modal update
    const handleOpenModalUpdate = (id) => {
        setOpenModalUpdate(true);
        let filterProduct =
            listProducts.length > 0 &&
            listProducts.filter((item) => item.id === id);

        if (filterProduct) {
            filterProduct = filterProduct.map((product) => {
                const sanitizedUser = {};
                for (const key in product) {
                    if (product[key] === null || product[key] === undefined) {
                        sanitizedUser[key] = '';
                    } else {
                        sanitizedUser[key] = product[key];
                    }
                }
                return sanitizedUser;
            });
        }

        console.log("filterProduct", filterProduct)

        if (listProducts.length > 0) {
            let dataProductUpdate = { ...filterProduct[0] };
            setValuesUpdate(dataProductUpdate);
        }
    };

    const handleCloseModalUpdate = () => {
        setOpenModalUpdate(false);

        // reset input radio
        setCategoryId(-1);
        // reset image
        setImage("");
    };

    const handleOpenModalDelete = (id) => {
        setOpenModalDelete(true);
        setIdProductDelete(id);
    };

    const handleCloseModalDelete = () => {
        setOpenModalDelete(false);
    };

    const handleOpenPageVariant = (id) => {
        navigate(`/system/product/${id}`)
    }

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

    // onchangeInput
    const onChangeInputCreate = (e) => {
        setValuesCreate({ ...valuesCreate, [e.target.name]: e.target.value });
    };

    const onChangeInputUpdate = (e) => {
        setValuesUpdate({ ...valuesUpdate, [e.target.name]: e.target.value });
    };

    // radio
    const handleGetValueCategory = (currentValue) => {
        setCategoryId(currentValue);
    };

    const handleGetValueSize = (currentValue) => {
        setSize(currentValue);
    };

    // submit 
    const onhandleSubmitCreateProduct = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        // console.log("data:", data);
        // console.log("data entry:", Object.fromEntries(data.entries()));

        try {
            const respon = await productServices.handleCreateProduct(data);
            // console.log("respon", respon);

            if (respon && respon.errCode === 0) {
                handleCloseModalCreate();
                fetchListProducts();
                fetchListProductsCompact();
            } else if (respon.errCode === 1) {
                alert(respon.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onhandleSubmitUpdateProduct = async (e) => {
        e.preventDefault();

        const data = new FormData(e.target);
        if (valuesUpdate) {
            data.set("id", valuesUpdate.id)
        }

        console.log("data entry:", Object.fromEntries(data.entries()));
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
            console.log(error);
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
            console.log(error);
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
                                    return (
                                        <InputRadio
                                            key={index}
                                            options={optionCategory}
                                            // handleSelected={handleGetValueGender}
                                            onChange={handleGetValueCategory}
                                            {...item}
                                            id={Math.floor(Math.random() * 10)}
                                        />
                                    );
                                }

                                return (
                                    <InputField
                                        key={index}
                                        onChange={onChangeInputCreate}
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
                                        onChange={() => { }}
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

                            if (item.type === "radio") {
                                return (
                                    <InputRadio
                                        key={index}
                                        options={optionCategory}
                                        onChange={() => { }}
                                        checked={dataRead.categoryId ?? 1}
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

            {/* modal update user */}
            {openModalUpdate && (
                <Modal open={openModalUpdate} close={handleCloseModalUpdate}>
                    <form autoComplete="off" onSubmit={onhandleSubmitUpdateProduct}>
                        <Heading variant={"primary"}>Update product</Heading>
                        <div className="">
                            {inputProducts.map((item, index) => {
                                // console.log("item update", item)
                                // console.log("item update valuesUpdate", valuesUpdate.categoryId)                                

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
                                            onChange={() => { }}
                                        />
                                    );
                                }

                                if (item.type === "radio") {
                                    return (
                                        <InputRadio
                                            key={index}
                                            options={optionCategory}
                                            checked={categoryId !== -1 ? categoryId : valuesUpdate.categoryId}
                                            onChange={handleGetValueCategory}
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

export default ProductManagement;