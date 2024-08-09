import clsx from "clsx";
import { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Modal from "../Modal";
import { CloseOutlineIcon } from "../Icons";
import Chart from "react-apexcharts";

function Card({ data }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="">
      <CompactCard dataItem={data} expanded={() => setExpanded(true)} />
      {expanded && (
        <ExpandedCard dataItem={data} expanded={() => setExpanded(false)} />
      )}
    </div>
  );
}

function CompactCard({ dataItem, expanded }) {
  return (
    <div
      className={clsx(
        "flex flex-1 !h-30 rounded-xl text-white relative cursor-pointer hover:!shadow-none",
        {
          "shadow-lg shadow-[#e0c6f5] bg-gradient-to-b from-[#bb67ff] to-[#c484f3]":
            dataItem.title === "sales",
          "shadow-lg shadow-[#FDC0C7] bg-gradient-to-b from-[#FF919D] to-[#FC929D]":
            dataItem.title === "revenue",
          "shadow-lg shadow-[#F9D59B] bg-gradient-to-b from-[rgb(248,212,154)] to-[rgb(255,202,113)]":
            dataItem.title === "expenses",
        }
      )}
      onClick={expanded}
    >
      <div className="flex flex-col justify-around items-center pl-4 py-2 w-1/3">
        <CircularProgressbar
          value={dataItem.barValue}
          text={`${dataItem.barValue}%`}
        />
        <span className="text-xl font-semibold capitalize pt-2">
          {dataItem && dataItem.title}
        </span>
      </div>
      <div className="flex flex-col justify-between items-end py-3 pr-3 w-2/3">
        {dataItem && dataItem.icon}
        <span className="text-2xl font-semibold">
          {dataItem && dataItem.value}
        </span>
        <span className="capitalize text-sm">last 24 hours</span>
      </div>
    </div>
  );
}

function ExpandedCard({ dataItem, expanded }) {
  const data = {
    options: {
      chart: {
        type: "area",
        height: "auto",
      },

      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "#fff",
        opacity: 0.35,
      },

      fill: {
        colors: ["#fff"],
        type: "gradient",
      },

      dataLabels: {
        enabled: false,
      },

      stroke: {
        curve: "smooth",
        colors: ["#fff"],
      },

      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },

      grid: {
        show: true,
      },

      xaxis: {
        type: "datetime",
        categories: [
          "2023-06-29T00:00:00.000Z",
          "2023-06-29T01:00:00.000Z",
          "2023-06-29T02:00:00.000Z",
          "2023-06-29T03:00:00.000Z",
          "2023-06-29T04:00:00.000Z",
          "2023-06-29T05:00:00.000Z",
          "2023-06-29T06:00:00.000Z",
          "2023-06-29T07:00:00.000Z",
          "2023-06-29T08:00:00.000Z",
          "2023-06-29T09:00:00.000Z",
          "2023-06-29T10:00:00.000Z",
          "2023-06-29T11:00:00.000Z",
          "2023-06-29T12:00:00.000Z",
          "2023-06-29T13:00:00.000Z",
          "2023-06-29T14:00:00.000Z",
          "2023-06-29T15:00:00.000Z",
          "2023-06-29T16:00:00.000Z",
          "2023-06-29T17:00:00.000Z",
          "2023-06-29T18:00:00.000Z",
          "2023-06-29T19:00:00.000Z",
          "2023-06-29T20:00:00.000Z",
          "2023-06-29T21:00:00.000Z",
          "2023-06-29T22:00:00.000Z",
          "2023-06-29T23:00:00.000Z",
          "2023-06-29T24:00:00.000Z",
        ],
      },

      yaxis: {
        opposite: false,
      },
    },
  };

  return (
    <Modal open={expanded} close={expanded}>
      <header className="flex justify-start items-center">
        <h1
          className={clsx("text-2xl font-semibold capitalize tracking-wide", {
            "text-[#bb67ff]": dataItem.title === "sales",
            "text-[#FF919D]": dataItem.title === "revenue",
            "text-[rgb(248,212,154)]": dataItem.title === "expenses",
          })}
        >
          {dataItem.title}
        </h1>
        <span className="p-3 absolute right-0 top-0" onClick={expanded}>
          <CloseOutlineIcon className="!w-8 !h-8 text-red-500 font-semibold hover:animate-spin cursor-pointer" />
        </span>
      </header>
      <section
        className={clsx(
          "flex h-auto w-full justify-center mt-4 rounded-xl text-white relative cursor-pointer hover:!shadow-none",
          {
            "shadow-lg shadow-[#e0c6f5] bg-gradient-to-b from-[#bb67ff] to-[#c484f3]":
              dataItem.title === "sales",
            "shadow-lg shadow-[#FDC0C7] bg-gradient-to-b from-[#FF919D] to-[#FC929D]":
              dataItem.title === "revenue",
            "shadow-lg shadow-[#F9D59B] bg-gradient-to-b from-[rgb(248,212,154)] to-[rgb(255,202,113)]":
              dataItem.title === "expenses",
          }
        )}
      >
        <div className="w-full p-6">
          <Chart series={dataItem.series} type="area" options={data.options} />
        </div>
      </section>
    </Modal>
  );
}

export default Card;
