import HeadlessTippy from "@tippyjs/react/headless";
import clsx from "clsx";
import { useEffect, useState, useRef, useContext } from "react";
import { SearchIcon, CloseCircleIcon, SpinnerIcon } from "../Icons";
import useDebounce from "../../hooks/useDebounce";
import * as chatServices from "../../services/chatServices";
import GlobalContext from "../../contexts/globalContext";
import { useAuth } from "../../contexts/authContext";

function Search({ ItemSearchResult, type, listData }) {
  const { setIdChatRoom } = useContext(GlobalContext);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);

  const { dataUser } = useAuth();

  const inputRef = useRef();

  const handleClear = () => {
    setSearchResult([]);
    setSearchValue("");
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleClickItem = async () => {
    setSearchResult([]);
    setSearchValue("");
  };

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (searchValue.startsWith(" ")) {
      return;
    }
    setSearchValue(e.target.value);
  };

  const debounced = useDebounce(searchValue, 500);

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }

    setLoading(true);
    const filteredData =
      Array.isArray(listData) &&
      listData.length > 0 &&
      listData.filter((item) => {
        return item.name.toLowerCase().includes(debounced.toLowerCase());
      });

    if (filteredData.length > 0) {
      setSearchResult(filteredData);
      setLoading(false);
    }
  }, [debounced]);

  // USER
  const handleSubmitCreateChatRoom = async (dataItem) => {
    const data = new FormData();
    data.set("name", `${dataItem.name} (${dataItem.Role.name})`);
    data.set("participantId", dataItem.id);
    if (dataUser) {
      data.set("roomCreatorId", dataUser.user.id);
    }

    try {
      const response = await chatServices.handleCreateChatroom(data);
      if (response) {
        setIdChatRoom(response.room.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <HeadlessTippy
      interactive
      visible={showResult && searchResult.length > 0}
      render={(attrs) => (
        <div
          className={clsx(
            "relative top-0 left-0 right-0 min-w-[280px] bg-white p-2 shadow-md"
          )}
          tabIndex="-1"
          {...attrs}
        >
          <h3 className={clsx("font-semibold text-lg mb-2")}>
            Danh sách tìm kiếm
          </h3>
          <ul
            className={clsx(
              "list-none w-full max-h-36 overflow-y-scroll scrollbar"
            )}
          >
            {searchResult.map((result, index) => {
              if (ItemSearchResult && type === "User") {
                return (
                  <ItemSearchResult
                    key={index}
                    type={"User"}
                    data={result}
                    onClick={() => {
                      handleClickItem();
                      handleSubmitCreateChatRoom(result);
                    }}
                  />
                );
              } else {
                return null;
              }
            })}
          </ul>
        </div>
      )}
      onClickOutside={handleHideResult}
    >
      <div
        className={
          "relative my-2 border-[1px] border-solid border-black rounded-lg overflow-hidden flex justify-between items-center"
        }
      >
        <input
          className={clsx("p-2 w-full")}
          type=""
          name=""
          value={searchValue}
          ref={inputRef}
          placeholder="Tìm kiếm"
          onChange={handleChange}
          onFocus={() => setShowResult(true)}
        />
        {searchValue && (
          <div className="h-full flex justify-center items-center">
            {loading && (
              <SpinnerIcon
                className={clsx(
                  "text-gray-500 hover:text-primary-hover !w-5 !h-5 p-1 animate-spin mr-1"
                )}
              />
            )}
            {!loading && (
              <CloseCircleIcon
                className={clsx(
                  "text-gray-500 hover:text-primary-hover !w-5 !h-5 p-1 mr-1"
                )}
                onClick={handleClear}
              />
            )}
            <div
              className={clsx(
                "flex justify-center items-center p-2 border-l-2 border-solid border-[#ccc] cursor-pointer"
              )}
            >
              {
                <SearchIcon
                  className={clsx(
                    "text-gray-500 hover:text-primary-hover !w-5 !h-5 p-1"
                  )}
                />
              }
            </div>
          </div>
        )}
      </div>
    </HeadlessTippy>
  );
}

export default Search;
