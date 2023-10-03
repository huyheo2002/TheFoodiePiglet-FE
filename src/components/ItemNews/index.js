import { Fragment, useState } from "react";
import Image from "../Image";

function CompactCard({ data }) {
  return (
    <div className="w-[calc(25%-1.5rem)] bg-gray-900 shadow-black-rb-0.75 rounded-lg border-rgba-white-0.1 border-solid border-[3px] mx-3 my-4 p-3 overflow-hidden select-none transition-all duration-300 cursor-pointer hover:border-white">
      <Image
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample87.jpg"
        className={"rounded-md"}
      />
      <h2 className="text-xl font-semibold text-white my-2">Hans Down</h2>
      <p className="text-white mt-2 opacity-80">
        I'm looking for something that can deliver a 50-pound payload of snow on
        a small feminine target. Can you suggest something? Hello...?
      </p>
      <div className="my-2 mt-4 flex justify-between items-center">
        <span className="inline-block font-medium text-base text-[#808080]">
          Aug 28, 2023
        </span>
        <span className="inline-block font-medium text-base text-[#ffc000]">
          Sự kiện
        </span>
      </div>
    </div>
  );
}

function ItemNews({ data, itemCompact }) {
  return <Fragment>{itemCompact && <CompactCard />}</Fragment>;
}

export default ItemNews;
