import Image from "../Image";

function ItemSearchResult({ data, onClick, type }) {
  if (type === "User") {
    return (
      <div
        onClick={onClick ? onClick : () => {}}
        className="w-full h-10 leading-10 relative select-none group hover:bg-[#e6f2fe] transition-all duration-300 rounded-lg px-1 cursor-pointer"
      >
        <div className="flex items-center h-full">
          <Image
            src={data ? (data.avatar ? data.avatar : "") : ""}
            className={
              "w-8 h-8 min-w-[2rem] min-h-[2rem] rounded-full overflow-hidden"
            }
          />
          <p className="h-full w-full px-4 inline-flex items-center text-[#4a4a4a] text-sm font-medium tracking-wider capitalize group-hover:text-[#548be6]">
            {data ? data.name || data.username : ""}{" "}
            {data && data.Role.name ? `(${data.Role.name})` : ""}
          </p>
        </div>
      </div>
    );
  }

  return null;
}

export default ItemSearchResult;
