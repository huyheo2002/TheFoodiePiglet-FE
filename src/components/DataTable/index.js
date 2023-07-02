import clsx from "clsx";
import {
  BellIcon,
  BookOpenIcon,
  DotHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "../Icons";
import { Fragment, useContext, useEffect, useState } from "react";
import GlobalContext from "../../contexts/globalContext";
import Pagination from "../Pagination";
import WindowScrollTop from "../../utils/windowScroll";

function DataTable({ data, manyFeatures, dataPreview }) {
  const { toggleDataTable, setToggleDataTable } = useContext(GlobalContext);
  const [currentItem, setCurrentItem] = useState(-1);
  const [keyDataPreview, setKeyDataPreview] = useState([]);

  // pages
  const [postPerPage, setPostPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  let indexOfLastPost = 0;
  let indexOfFirstPost = 0;
  let currentPost = [];

  indexOfLastPost = currentPage * postPerPage;
  indexOfFirstPost = indexOfLastPost - postPerPage;
  currentPost = dataPreview.slice(indexOfFirstPost, indexOfLastPost);
  // data.slice(indexOfFirstPost, indexOfLastPost)
  const onChangePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleGetKeyDataPreview = () => {
    if (dataPreview && dataPreview.length > 0) {
      const keys = Object.keys(dataPreview[0]);
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
      <table className="w-full border border-gray-200 select-none">
        <thead className="rounded-t-lg overflow-hidden">
          <tr className="bg-[#548be6] text-white capitalize text-sm font-semibold leading-normal">
            {keyDataPreview.length > 0 &&
              keyDataPreview.map((key, index) => {
                return (
                  <th className="py-3 px-6 text-left" key={index}>
                    {key}
                  </th>
                );
              })}
            <th
              className={clsx("py-3 px-6 text-left", {
                "w-1/12": manyFeatures,
              })}
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="">
          {/* display count post */}
          {currentPost.length > 0 &&
            currentPost.map((item, index) => {
              console.log("item", item);
              let getValuesItem = Object.values(item) || [];
              console.log("getValuesItem", getValuesItem);

              return (
                <tr
                  className="bg-white hover:bg-[#e6f2fe] transition-all duration-300 group"
                  key={index}
                >
                  {getValuesItem.length > 0 &&
                    getValuesItem.map((valueItem, indexValue) => {
                      return (
                        <td className="py-4 px-6 text-sm font-normal border-b border-gray-200 group-hover:text-[#548be6] transition-all duration-300"
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
                        <BookOpenIcon className="!w-6 !h-6 hover:text-[#548be6] transition-all cursor-pointer" />
                        <PencilIcon className="!w-6 !h-6 hover:text-green-400 transition-all cursor-pointer" />
                        <TrashIcon className="!w-6 !h-6 hover:text-red-500 transition-all cursor-pointer" />
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
                                      {feature.name}
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
        totalPosts={dataPreview && dataPreview.length}
        paginate={onChangePage}
      />
    </Fragment>
  );
}

export default DataTable;
