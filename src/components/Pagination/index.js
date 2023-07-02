import clsx from "clsx";
import { BellIcon, NextIcon, PrevIcon } from "../Icons";
import { useEffect, useState } from "react";

function Pagination({ postsPerPage, totalPosts, paginate }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [btnNextDisable, setBtnNextDisable] = useState(false);
  const [btnPrevDisable, setBtnPrevDisable] = useState(true);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const [pageNumbersCompact, setPageNumbersCompact] = useState([1, 2, 3, 4, 5]);

  const handleNextPage = () => {
    let checkNextPage =
      pageNumbers.length > 0 &&
      pageNumbers.filter((item) => item > currentPage);

    if (checkNextPage.length > 0) {
      setCurrentPage(currentPage + 1);
      setBtnPrevDisable(false);
      if (checkNextPage.length === 1) {
        setBtnNextDisable(true);
      }
    } else {
      setBtnNextDisable(true);
    }
  };

  const handlePrevPage = () => {
    let checkPrevPage =
      pageNumbers.length > 0 &&
      pageNumbers.filter((item) => item < currentPage);

    if (checkPrevPage.length > 0) {
      setCurrentPage(currentPage - 1);
      setBtnNextDisable(false);
      if (checkPrevPage.length === 1) {
        setBtnPrevDisable(true);
      }
    } else {
      setBtnPrevDisable(true);
    }
  };

  const handleUpdatePagesCompact = (currentPage) => {
    let listPagesUpdate = [];
    if (pageNumbers.length > 10) {
      if (currentPage <= 2) {
        listPagesUpdate = pageNumbers.slice(0, 5);
      } else if (pageNumbers[pageNumbers.length - 1] - currentPage <= 2) {
        listPagesUpdate = pageNumbers.slice(
          pageNumbers[pageNumbers.length - 6],
          pageNumbers[pageNumbers.length]
        );
      } else {
        listPagesUpdate = pageNumbers.slice(currentPage - 3, currentPage + 2);
      }
    }

    setPageNumbersCompact(listPagesUpdate);
  };

  useEffect(() => {
    if(pageNumbers.length > 10) {
      handleUpdatePagesCompact(currentPage)
    }
  }, [currentPage])

  return (
    <div className="flex items-center w-full flex-wrap mt-3 select-none">
      <span
        className={clsx(
          "h-8 w-8 mx-2 my-2 bg-sky-400 rounded-sm hover:bg-sky-700 transition-all duration-300 flex justify-center items-center cursor-pointer",
          {
            "!bg-gray-500 !cursor-not-allowed": btnPrevDisable,
          }
        )}
        onClick={handlePrevPage}
      >
        <PrevIcon className="text-white !h-6 !w-6" />
      </span>
      {pageNumbers.length > 10
        ? pageNumbersCompact.map((number, index) => {
            return (
              <span
                key={index}
                className={clsx(
                  "bg-sky-400 rounded-sm h-8 w-8 p-1 mx-2 my-2 text-white flex justify-center items-center cursor-pointer hover:bg-sky-700 transition-all duration-300 text-sm",
                  {
                    "!bg-sky-700": currentPage === number,
                  }
                )}
                onClick={() => {
                  paginate(number);
                  setCurrentPage(number);
                  // handleUpdatePagesCompact(number);
                  if (pageNumbers.length > 0 && pageNumbers[0] === number) {
                    setBtnPrevDisable(true);
                    setBtnNextDisable(false);
                  } else if (
                    pageNumbers.length > 0 &&
                    pageNumbers[pageNumbers.length - 1] === number
                  ) {
                    setBtnNextDisable(true);
                    setBtnPrevDisable(false);
                  } else {
                    setBtnNextDisable(false);
                    setBtnPrevDisable(false);
                  }
                }}
              >
                {number}
              </span>
            );
          })
        : pageNumbers.map((number, index) => {
            return (
              <span
                key={index}
                className={clsx(
                  "bg-sky-400 rounded-sm h-8 w-8 p-1 mx-2 my-2 text-white flex justify-center items-center cursor-pointer hover:bg-sky-700 transition-all duration-300 text-sm",
                  {
                    "!bg-sky-700": currentPage === number,
                  }
                )}
                onClick={() => {
                  paginate(number);
                  setCurrentPage(number);
                  if (pageNumbers.length > 0 && pageNumbers[0] === number) {
                    setBtnPrevDisable(true);
                    setBtnNextDisable(false);
                  } else if (
                    pageNumbers.length > 0 &&
                    pageNumbers[pageNumbers.length - 1] === number
                  ) {
                    setBtnNextDisable(true);
                    setBtnPrevDisable(false);
                  } else {
                    setBtnNextDisable(false);
                    setBtnPrevDisable(false);
                  }
                }}
              >
                {number}
              </span>
            );
          })}
      <span
        className={clsx(
          "h-8 w-8 mx-2 my-2 bg-sky-400 rounded-sm hover:bg-sky-700 transition-all duration-300 flex justify-center items-center cursor-pointer",
          {
            "!bg-gray-500 !cursor-not-allowed": btnNextDisable,
          }
        )}
        onClick={handleNextPage}
      >
        <NextIcon className="text-white !h-6 !w-6" />
      </span>
    </div>
  );
}

export default Pagination;
