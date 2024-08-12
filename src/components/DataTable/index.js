import clsx from "clsx";
import {
  BookOpenIcon,
  DotHorizontalIcon,
  ExcelIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "../Icons";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import GlobalContext from "../../contexts/globalContext";
import Pagination from "../Pagination";
import { useTranslation } from "react-i18next";
import Button from "../Button";
import Image from "../Image";
import Modal from "../Modal";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import toast from "react-hot-toast";
import { TBUTTON_VARIANT } from "../../types/button";

function DataTable({
  data,
  manyFeatures,
  handleModalRead,
  handleModalEdit,
  handleModalDelete,
  handleModalCreate,
  btnCreateTitle,
  btnBack,
  listPermission,
  listPermissionCurrentInPage,
}) {
  const navigate = useNavigate();
  const { toggleDataTable, setToggleDataTable } = useContext(GlobalContext);
  const [currentItem, setCurrentItem] = useState(-1);
  const [keyDataPreview, setKeyDataPreview] = useState([]);
  const { t } = useTranslation(["table"]);
  const [toggleFullScreenImage, setToggleFullScreenImage] = useState(false);
  const [linkImage, setLinkImage] = useState(null);
  const [permissionCreate, setPermissionCreate] = useState(false);
  const [permissionRead, setPermissionRead] = useState(false);
  const [permissionUpdate, setPermissionUpdate] = useState(false);
  const [permissionDelete, setPermissionDelete] = useState(false);

  // csv
  const [transformedData, setTransformedData] = useState([]);

  // handle permission
  const handleOpenFeatures = () => {
    if (listPermissionCurrentInPage && listPermissionCurrentInPage.length > 0) {
      listPermissionCurrentInPage.map((item) => {
        // check views
        let strKeyword = item.keyword || "";
        let convertToArray = strKeyword.split("-");
        let getKeyword = convertToArray.length > 0 && convertToArray[0];

        const filterPermission =
          listPermission.length > 0 &&
          listPermission.filter(
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
  }, [listPermissionCurrentInPage]);

  // pages
  const [postPerPage, setPostPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  let indexOfLastPost = 0;
  let indexOfFirstPost = 0;
  let currentPost = [];

  indexOfLastPost = currentPage * postPerPage;
  indexOfFirstPost = indexOfLastPost - postPerPage;
  currentPost = data.slice(indexOfFirstPost, indexOfLastPost);
  const onChangePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleGetKeyDataPreview = () => {
    if (data && data.length > 0) {
      const keys = Object.keys(data[0]);
      if (keys.length > 0) {
        setKeyDataPreview(keys);
      }
    }
  };

  useEffect(() => {
    handleGetKeyDataPreview();
  }, []);

  const handleCloseFullScreenImage = () => {
    setToggleFullScreenImage(false);
    setLinkImage(null);
  };

  // convert to data csv
  const transformData = (data) => {
    const newArray = [];

    if (data.length === 0) {
      return newArray;
    }

    const keys = Object.keys(data[0]);
    newArray.push(keys);

    data.forEach((item) => {
      const newItem = [];
      keys.forEach((key) => {
        if (Array.isArray(item[key])) {
          newItem.push(item[key].join("; "));
        } else {
          newItem.push(item[key]);
        }
      });
      newArray.push(newItem);
    });

    return newArray;
  };

  useEffect(() => {
    let newDataTransformedData = transformData(data);
    setTransformedData(newDataTransformedData);
  }, [data]);

  return (
    <Fragment>
      <div className="flex justify-end my-2">
        {btnBack && (
          <Button
            variant={TBUTTON_VARIANT.PRIMARY}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        )}
        {listPermission && listPermissionCurrentInPage && permissionCreate ? (
          <Fragment>
            <Button
              variant={TBUTTON_VARIANT.EXCEL}
              onClick={() => {}}
              iconLeft={<ExcelIcon className={"!w-6 !h-6"} />}
            >
              <CSVLink data={transformedData} filename={"data.csv"}>
                Export to CSV
              </CSVLink>
            </Button>

            <Button
              variant={TBUTTON_VARIANT.PRIMARY}
              onClick={handleModalCreate && handleModalCreate}
              iconLeft={<PlusIcon className={"!w-6 !h-6"} />}
            >
              {btnCreateTitle ?? "Create User"}
            </Button>
          </Fragment>
        ) : (
          <Button
            variant={TBUTTON_VARIANT.VIEW_MORE}
            onClick={() => {
              toast.error("Bạn chưa được cấp quyền để thực hiện chức năng này");
            }}
            iconLeft={<PlusIcon className={"!w-6 !h-6"} />}
          >
            {btnCreateTitle ?? "Create User"}
          </Button>
        )}
      </div>
      <table className="w-full border border-gray-200 select-none">
        <thead className="rounded-t-lg">
          <tr className="bg-[#548be6] text-white capitalize text-sm font-semibold leading-normal">
            {keyDataPreview.length > 0 &&
              keyDataPreview.map((key, index) => {
                return (
                  <th className="py-3 px-6 text-left" key={index}>
                    {t(`key.${key}`)}
                  </th>
                );
              })}
            <th
              className={clsx("py-3 px-6 text-left", {
                "w-1/12": manyFeatures,
              })}
            >
              {t(`key.action`)}
            </th>
          </tr>
        </thead>
        <tbody className="">
          {currentPost.length > 0 &&
            currentPost.map((item, index) => {
              let getValuesItem = Object.values(item) || [];
              let getKeysItem = Object.keys(item) || [];
              let getIndexOfImage = getKeysItem.indexOf("image") ?? -1;
              return (
                <tr
                  className="bg-white hover:bg-[#e6f2fe] transition-all duration-300 group"
                  key={index}
                >
                  {getValuesItem.length > 0 &&
                    getValuesItem.map((valueItem, indexValue) => {
                      if (Array.isArray(valueItem)) {
                        const strValue = valueItem.join(";\n") || "";
                        return (
                          <td
                            className="py-2 px-6 text-sm font-normal border-b border-gray-200 overflow-hidden max-w-[8rem] text-ellipsis whitespace-nowrap"
                            key={indexValue}
                          >
                            <textarea
                              className="w-full h-32 resize-none border-[1px] border-black text-base font-medium p-1 rounded-md overflow-hidden"
                              value={strValue}
                              readOnly
                              style={{ maxHeight: "10rem", overflowY: "auto" }}
                            />
                          </td>
                        );
                      }

                      return (
                        <td
                          className="py-4 px-6 text-sm font-normal border-b border-gray-200 group-hover:text-[#548be6] transition-all duration-300 overflow-hidden max-w-[8rem] text-ellipsis whitespace-nowrap"
                          key={indexValue}
                        >
                          {indexValue === getIndexOfImage ? (
                            <Image
                              className={"cursor-pointer"}
                              src={valueItem}
                              onClick={() => {
                                setToggleFullScreenImage(true);
                                setLinkImage(valueItem);
                              }}
                            />
                          ) : (
                            valueItem
                          )}
                        </td>
                      );
                    })}
                  <td
                    className={clsx("border-b border-gray-200", {
                      "w-1/12": manyFeatures,
                    })}
                  >
                    {!manyFeatures ? (
                      <div className="flex justify-around">
                        {listPermission &&
                        listPermissionCurrentInPage &&
                        permissionRead ? (
                          <BookOpenIcon
                            className="!w-6 !h-6 text-green-400 hover:text-green-600 transition-all cursor-pointer"
                            onClick={() => {
                              if (handleModalRead) {
                                handleModalRead(item.id);
                              }
                            }}
                          />
                        ) : (
                          <BookOpenIcon
                            className="!w-6 !h-6 text-gray-400 hover:text-gray-600 transition-all cursor-default"
                            onClick={() => {
                              toast.error(
                                "Bạn chưa được cấp quyền để thực hiện chức năng này"
                              );
                            }}
                          />
                        )}

                        {listPermission &&
                        listPermissionCurrentInPage &&
                        permissionUpdate ? (
                          <PencilIcon
                            className="!w-6 !h-6 text-yellow-400 hover:text-yellow-600 transition-all cursor-pointer"
                            onClick={() => {
                              if (handleModalEdit) {
                                handleModalEdit(item.id);
                              }
                            }}
                          />
                        ) : (
                          <PencilIcon
                            className="!w-6 !h-6 text-gray-400 hover:text-gray-600 transition-all cursor-pointer"
                            onClick={() => {
                              toast.error(
                                "Bạn chưa được cấp quyền để thực hiện chức năng này"
                              );
                            }}
                          />
                        )}

                        {listPermission &&
                        listPermissionCurrentInPage &&
                        permissionDelete ? (
                          <TrashIcon
                            className="!w-6 !h-6 text-red-400 hover:text-red-600 transition-all cursor-pointer"
                            onClick={() => {
                              if (handleModalDelete) {
                                handleModalDelete(item.id);
                              }
                            }}
                          />
                        ) : (
                          <TrashIcon
                            className="!w-6 !h-6 text-gray-400 hover:text-gray-600 transition-all cursor-pointer"
                            onClick={() => {
                              toast.error(
                                "Bạn chưa được cấp quyền để thực hiện chức năng này"
                              );
                            }}
                          />
                        )}
                      </div>
                    ) : (
                      <div className="flex justify-around relative">
                        <span
                          className="bg-white rounded-full shadow-black-b-0.35 cursor-pointer hover:bg-[#e6f2fe] transition-all duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            setToggleDataTable(!toggleDataTable);
                            setCurrentItem(index);
                          }}
                        >
                          <DotHorizontalIcon className="!w-8 !h-8 hover:text-[#548be6] transition-all duration-300" />
                        </span>
                        {toggleDataTable && currentItem === index && (
                          <div className="absolute bg-white shadow-black-b-0.35 top-[calc(100%+12px)] right-0 -left-32 z-40 rounded-lg cursor-pointer select-none overflow-hidden">
                            {manyFeatures.length > 0 &&
                              manyFeatures.map((feature, index) => {
                                return (
                                  <div
                                    className="flex items-center px-6 py-4 hover:text-[#548be6] hover:bg-[#e6f2fe] transition-all duration-300"
                                    onClick={() => feature.onClick(item.id)}
                                    key={index}
                                  >
                                    {feature.icon}
                                    <p className="pl-2 text-sm font-semibold leading-normal">
                                      {t(`btnUserAction.${feature.name}`)}
                                    </p>
                                  </div>
                                );
                              })}
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Pagination
        postsPerPage={postPerPage}
        totalPosts={data && data.length}
        paginate={onChangePage}
      />

      <Modal
        open={toggleFullScreenImage}
        close={handleCloseFullScreenImage}
        custom
      >
        <Image src={linkImage} className={"!bg-white !p-5 !overflow-hidden"} />
      </Modal>
    </Fragment>
  );
}

export default DataTable;
