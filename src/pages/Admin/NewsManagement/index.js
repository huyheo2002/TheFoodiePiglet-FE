import { Fragment, useEffect, useState } from "react";
import DataTable from "../../../components/DataTable";
import Modal from "../../../components/Modal";
import Heading from "../../../components/Heading";
import InputField from "../../../components/FormControl/InputField";
import InputFile from "../../../components/FormControl/inputFile";
import Button from "../../../components/Button";
import InputRadio from "../../../components/FormControl/inputRadio";
import * as newsServices from "../../../services/newsServices";
import * as genresServices from "../../../services/genresServices";
import TextareaField from "../../../components/FormControl/textAreaField";


function NewsManagement() {
    const [listNews, setListNews] = useState([]);
    const [listNewsFull, setListNewsFull] = useState([]);
    const [listGenres, setListGenres] = useState([]);

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
            placeholder: "Enter your name",
            label: "Name",
            required: true,
        },
        {
            id: 2,
            name: "desc",
            type: "textarea",
            placeholder: "Enter your description",
            label: "Description",
        },
        {
            id: 3,
            name: "genreId",
            type: "radio",
            label: "Category",
            required: true,
        },
        {
            id: 4,
            name: "image",
            type: "file",
            placeholder: "Enter your image",
            label: "Image",
            accept: "image/png, image/jpeg, image/gif, image/jpg",
        },
    ];

    const [valuesCreate, setValuesCreate] = useState({});
    const [dataRead, setDataRead] = useState({});
    const [valuesUpdate, setValuesUpdate] = useState({});
    const [idNewsDelete, setIdNewsDelete] = useState(-1);
    const [categoryIndex, setCategoryIndex] = useState(-1);
    const [image, setImage] = useState("");

    const handleGetlistNewsFull = async () => {
        const res = await newsServices.getAllNews("all");
        // console.log("res", res);
        if (res && res.errCode === 0) {
            // setListNews(res.news);
            const dataListNews = res.news || [];
            let splitFields =
                dataListNews.length > 0 &&
                dataListNews.map((item) => {
                    if (item.Genre) {
                        item.categoryName = item.Genre.name;
                        delete item.Genre;
                    }

                    return item;
                });

            // show full info
            if (splitFields.length > 0) {
                setListNewsFull(splitFields);
            }
        }
    };

    const handleGetlistNews = async () => {
        const res = await newsServices.getAllNews("all");
        // console.log("res", res);
        if (res && res.errCode === 0) {
            // setListNews(res.news);
            const dataListNews = res.news || [];
            let splitFields =
                dataListNews.length > 0 &&
                dataListNews.map((item) => {
                    if (item.Genre) {
                        item.categoryName = item.Genre.name;
                        delete item.Genre;
                    }

                    if (item.desc) {
                        delete item.desc;
                    }

                    delete item.genreId;

                    return item;
                });

            // show full info
            if (splitFields.length > 0) {
                setListNews(splitFields);
            }
        }
    };

    const handleGetlistGenres = async () => {
        const res = await genresServices.getAllGenres();
        console.log("res genres", res);
        if (res && res.errCode === 0) {
            setListGenres(res.genres);
        }
    };

    useEffect(() => {
        handleGetlistNews();
        handleGetlistNewsFull();
        handleGetlistGenres();
    }, [])

    // handle modal show info user
    const handleOpenModalRead = (id) => {
        setOpenModalRead(true);
        let filterNews =
            listNewsFull.length > 0 &&
            listNewsFull.filter((item) => item.id === id);

        if (filterNews) {
            filterNews = filterNews.map((news) => {
                const sanitizedUser = {};
                for (const key in news) {
                    if (news[key] === null || news[key] === undefined) {
                        sanitizedUser[key] = '';
                    } else {
                        sanitizedUser[key] = news[key];
                    }
                }
                return sanitizedUser;
            });
        }

        if (filterNews.length > 0) {
            setDataRead(filterNews[0]);
        }
    };

    const handleCloseModalRead = () => {
        setOpenModalRead(false);
        setCategoryIndex(-1);
    };

    // modal create user
    const handleOpenModalCreate = () => {
        setOpenModalCreate(true);
    };

    const handleCloseModalCreate = () => {
        setOpenModalCreate(false);

        // reset input radio
        setCategoryIndex(-1);

        // reset image
        setImage("");
    };

    // modal update user
    const handleOpenModalUpdate = (id) => {
        setOpenModalUpdate(true);
        let filterNews =
            listNewsFull.length > 0 &&
            listNewsFull.filter((item) => item.id === id);

        if (filterNews) {
            filterNews = filterNews.map((news) => {
                const sanitizedUser = {};
                for (const key in news) {
                    if (news[key] === null || news[key] === undefined) {
                        sanitizedUser[key] = '';
                    } else {
                        sanitizedUser[key] = news[key];
                    }
                }
                return sanitizedUser;
            });
        }

        if (filterNews.length > 0) {
            setValuesUpdate(filterNews[0]);
        }
    };

    const handleCloseModalUpdate = () => {
        setOpenModalUpdate(false);

        // reset input radio
        setCategoryIndex(-1);

        // reset image
        setImage("");
    };

    const handleOpenModalDelete = (id) => {
        setOpenModalDelete(true);
        setIdNewsDelete(id);
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

    const handleGetValueCategory = (currentValue) => {
        setCategoryIndex(currentValue);
    };

    // console.log("listNews", listNews);
    // console.log("listNewsFull", listNewsFull);

    // handle submit
    const onhandleSubmitCreateNews = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        // console.log("data:", data);
        // console.log("data entry:", Object.fromEntries(data.entries()));

        try {
            const respon = await newsServices.handleCreateNews(data);

            if (respon && respon.errCode === 0) {
                handleCloseModalCreate();
                handleGetlistNews();
                handleGetlistNewsFull();
                handleGetlistGenres();
            } else if (respon.errCode !== 0) {
                alert(respon.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onhandleSubmitUpdateNews = async (e) => {
        e.preventDefault();

        const data = new FormData(e.target);
        if (valuesUpdate) {
            data.set("id", valuesUpdate.id)
        }

        console.log("data entry:", Object.fromEntries(data.entries()));
        try {
            const respon = await newsServices.handleUpdateNews(data);

            if (respon && respon.errCode === 0) {
                handleCloseModalUpdate();
                handleGetlistNews();
                handleGetlistNewsFull();
                handleGetlistGenres();
            } else if (respon.errCode !== 0) {
                alert(respon.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onhandleSubmitDeleteNews = async (e) => {
        e.preventDefault();

        try {
            const respon = await newsServices.handleDeleteNews(idNewsDelete);
            if (respon && respon.errCode === 0) {
                handleCloseModalDelete();
                handleGetlistNews();
                handleGetlistNewsFull();
                handleGetlistGenres();
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
                        News Management
                    </h1>
                    {listNews.length > 0 && (
                        <DataTable
                            data={listNews}
                            btnCreateTitle={"Create News"}
                            handleModalCreate={handleOpenModalCreate}
                            handleModalRead={handleOpenModalRead}
                            handleModalEdit={handleOpenModalUpdate}
                            handleModalDelete={handleOpenModalDelete}
                        />
                    )}
                </div>
            </div>

            {/* modal show detail info*/}
            {openModalRead && (
                <Modal open={openModalRead} close={handleCloseModalRead}>
                    <Heading variant={"primary"}>Information news detail</Heading>
                    <div className="">
                        {inputs.map((item, index) => {
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

                            if (item.type === "radio" && item.name === "genreId") {
                                const getDataFromGenres =
                                    listGenres.length > 0 &&
                                    listGenres.map((option) => {
                                        return {
                                            value: option.id,
                                            label: option.name,
                                        };
                                    });

                                let genresChecked = null;
                                if (dataRead) {
                                    let filterRoleIndex =
                                        getDataFromGenres.length > 0 &&
                                        getDataFromGenres.filter(
                                            (role) => role.label == dataRead.categoryName
                                        );
                                    if (filterRoleIndex.length > 0) {
                                        genresChecked = filterRoleIndex[0].value;
                                    }
                                }

                                return (
                                    <InputRadio
                                        key={index}
                                        options={getDataFromGenres}
                                        onChange={() => { }}
                                        checked={genresChecked}
                                        disable
                                        {...item}
                                        id={Math.floor(Math.random() * 10)}
                                    />
                                );
                            }

                            if (item.type === "textarea" && item.name === "desc") {
                                return <TextareaField
                                    key={index}
                                    value={dataRead && dataRead[item.name]}
                                    onChange={() => { }}
                                    onlyRead={"true"}
                                    {...item}
                                />
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

            {/* modal create */}
            {openModalCreate && (
                <Modal open={openModalCreate} close={handleCloseModalCreate}>
                    <form autoComplete="off" onSubmit={onhandleSubmitCreateNews}>
                        <Heading variant={"primary"}>Create news</Heading>
                        <div className="">
                            {inputs.map((item, index) => {
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

                                if (item.type === "radio" && item.name === "genreId") {
                                    const getDataFromGenres =
                                        listGenres.length > 0 &&
                                        listGenres.map((option) => {
                                            return {
                                                value: option.id,
                                                label: option.name,
                                            };
                                        });

                                    return (
                                        <InputRadio
                                            key={index}
                                            options={getDataFromGenres}
                                            onChange={handleGetValueCategory}
                                            {...item}
                                            id={Math.floor(Math.random() * 10)}
                                        />
                                    );
                                }

                                if (item.type === "textarea" && item.name === "desc") {
                                    return <TextareaField
                                        key={index}
                                        value={valuesCreate && valuesCreate[item.name]}
                                        onChange={onChangeInputCreate}
                                        clear={() => inputCreateClear(item.name)}
                                        {...item}
                                    />
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

            {/* modal update */}
            {openModalUpdate && (
                <Modal open={openModalUpdate} close={handleCloseModalUpdate}>
                    <form autoComplete="off" onSubmit={onhandleSubmitUpdateNews}>
                        <Heading variant={"primary"}>Update news</Heading>
                        <div className="">
                            {inputs.map((item, index) => {
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

                                if (item.type === "radio" && item.name === "genreId") {
                                    const getDataFromGenres =
                                        listGenres.length > 0 &&
                                        listGenres.map((option) => {
                                            return {
                                                value: option.id,
                                                label: option.name,
                                            };
                                        });

                                    let genresChecked = null;
                                    if (valuesUpdate) {
                                        let filterRoleIndex =
                                            getDataFromGenres.length > 0 &&
                                            getDataFromGenres.filter(
                                                (role) => role.label == valuesUpdate.categoryName
                                            );
                                        if (filterRoleIndex.length > 0) {
                                            genresChecked = filterRoleIndex[0].value;
                                        }
                                    }

                                    return (
                                        <InputRadio
                                            key={index}
                                            options={getDataFromGenres}
                                            checked={categoryIndex !== -1 ? categoryIndex : genresChecked}
                                            onChange={handleGetValueCategory}
                                            edit
                                            {...item}
                                            id={Math.floor(Math.random() * 10)}
                                        />
                                    );
                                }

                                if (item.type === "textarea" && item.name === "desc") {
                                    return <TextareaField
                                        key={index}
                                        value={valuesUpdate && valuesUpdate[item.name]}
                                        onChange={onChangeInputUpdate}
                                        clear={() => inputCreateClear(item.name)}
                                        {...item}
                                    />
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

            {/* modal delete */}
            {openModalDelete && (
                <Modal open={openModalDelete} close={handleCloseModalDelete}>
                    <form autoComplete="off" onSubmit={onhandleSubmitDeleteNews}>
                        <Heading variant={"primary"}>Confirm DELETE the news</Heading>
                        <div className="my-3 mx-2">
                            <p className="text-xl font-semibold capitalize mb-3">
                                Are you sure delete this news
                            </p>                            
                            <InputField
                                type="text"
                                name="id"
                                hidden="true"
                                value={idNewsDelete}
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

export default NewsManagement;