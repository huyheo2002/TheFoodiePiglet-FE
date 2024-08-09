import { Fragment, useState } from "react";
import Image from "../Image";

function CompactCard({ data }) {
  let formattedDate = "";
  if (data && data.createdAt) {
    const dateObject = new Date(data.createdAt);

    const year = dateObject.getUTCFullYear();
    const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = dateObject.getUTCDate().toString().padStart(2, "0");

    formattedDate = `${day}-${month}-${year}`;
  }

  return (
    <div className="flex flex-col justify-between w-[calc(25%-1.5rem)] bg-gray-900 shadow-black-rb-0.75 rounded-lg border-rgba-white-0.1 border-solid border-[3px] mx-3 my-4 p-3 overflow-hidden select-none transition-all duration-300 cursor-pointer hover:border-white">
      <Image src={data && data.image} className={"rounded-md h-[250px]"} />
      <h2 className="text-xl font-semibold text-white my-2 line-clamp-1">
        {data && data.name}
      </h2>
      <p className="text-white mt-2 opacity-80 line-clamp-4">
        {data
          ? data.desc
          : `I'm looking for something that can deliver a 50-pound payload of snow on
          a small feminine target. Can you suggest something? Hello...?`}
      </p>
      <div className="my-2 mt-4 flex justify-between items-center">
        <span className="inline-block font-medium text-base text-[#808080]">
          {formattedDate ? formattedDate : "Aug 28, 2023"}
        </span>
        <span className="inline-block font-medium text-base text-[#ffc000] capitalize">
          {data ? data.categoryName : "Sự kiện"}
        </span>
      </div>
    </div>
  );
}

function ItemNews({ data, itemCompact }) {
  return <Fragment>{itemCompact && <CompactCard data={data} />}</Fragment>;
}

export default ItemNews;
