import clsx from "clsx";
import {
  BellIcon,
  BookOpenIcon,
  DotHorizontalIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "../Icons";
import { Fragment, useContext, useEffect, useState } from "react";
import GlobalContext from "../../contexts/globalContext";
import Pagination from "../Pagination";
import WindowScrollTop from "../../utils/windowScroll";
import { useTranslation } from "react-i18next";
import Button from "../Button";

function DataTable({
  data,
  manyFeatures,
  handleModalRead,
  handleModalEdit,
  handleModalDelete,
  handleModalCreate,
}) {
  const { toggleDataTable, setToggleDataTable } = useContext(GlobalContext);
  const [currentItem, setCurrentItem] = useState(-1);
  const [keyDataPreview, setKeyDataPreview] = useState([]);
  const { t } = useTranslation(["table"]);

  // pages
  const [postPerPage, setPostPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  let indexOfLastPost = 0;
  let indexOfFirstPost = 0;
  let currentPost = [];

  indexOfLastPost = currentPage * postPerPage;
  indexOfFirstPost = indexOfLastPost - postPerPage;
  currentPost = data.slice(indexOfFirstPost, indexOfLastPost);
  // data.slice(indexOfFirstPost, indexOfLastPost)
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

  return (
    <Fragment>
      <div className="flex justify-end my-2">
        <Button
          variant={"baseOrange"}
          onClick={handleModalCreate && handleModalCreate}
          iconLeft={<PlusIcon className={"!w-6 !h-6"}/>}
        >
          Create user
        </Button>
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
              {/* Action */}
            </th>
          </tr>
        </thead>
        <tbody className="">
          {/* display count post */}
          {currentPost.length > 0 &&
            currentPost.map((item, index) => {
              let getValuesItem = Object.values(item) || [];
              // console.log("item currentpost", item);
              return (
                <tr
                  className="bg-white hover:bg-[#e6f2fe] transition-all duration-300 group"
                  key={index}
                >
                  {getValuesItem.length > 0 &&
                    getValuesItem.map((valueItem, indexValue) => {
                      return (
                        <td
                          className="py-4 px-6 text-sm font-normal border-b border-gray-200 group-hover:text-[#548be6] transition-all duration-300 overflow-hidden max-w-[8rem] text-ellipsis whitespace-nowrap"
                          key={indexValue}
                        >
                          {valueItem}
                        </td>
                      );
                    })}
                  {/* action features */}
                  <td
                    className={clsx("border-b border-gray-200", {
                      "w-1/12": manyFeatures,
                    })}
                  >
                    {!manyFeatures ? (
                      <div className="flex justify-around">
                        <BookOpenIcon
                          className="!w-6 !h-6 text-green-400 hover:text-green-600 transition-all cursor-pointer"
                          onClick={() => {
                            if (handleModalRead) {
                              handleModalRead(item.id);
                            }
                          }}
                        />
                        <PencilIcon
                          className="!w-6 !h-6 text-yellow-400 hover:text-yellow-600 transition-all cursor-pointer"
                          onClick={() => {
                            if (handleModalEdit) {
                              handleModalEdit(item.id);
                            }
                          }}
                        />
                        <TrashIcon
                          className="!w-6 !h-6 text-red-400 hover:text-red-600 transition-all cursor-pointer"
                          onClick={() => {
                            if (handleModalDelete) {
                              handleModalDelete(item.id);
                            }
                          }}
                        />
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
                          <div
                            className="absolute bg-white shadow-black-b-0.35 top-[calc(100%+12px)] right-0 z-40 rounded-lg cursor-pointer select-none overflow-hidden"
                            // onClick={e => e.stopPropagation()}
                          >
                            {manyFeatures.length > 0 &&
                              manyFeatures.map((feature, index) => {
                                return (
                                  <div
                                    className="flex items-center px-6 py-4 hover:text-[#548be6] hover:bg-[#e6f2fe] transition-all duration-300"
                                    onClick={feature.onClick}
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
    </Fragment>
  );
}

export default DataTable;
