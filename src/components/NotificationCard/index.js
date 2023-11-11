import Image from "../Image";
import avatar from "../../assets/images/Test/oie_cgCjMMBawAJ3.jpg";
import clsx from "clsx";
import * as userServices from "../../services/userServices";
import { useEffect, useState } from "react";

function NotificationCard({ data, page, onClick }) {
  const [listUser, setListUser] = useState([]);

  const handleGetInfoUser = async () => {
    const respon = await userServices.getAllUsers("all");
    if (respon && respon.errCode === 0) {
      setListUser(respon.users);
    }
  }

  useEffect(() => {
    handleGetInfoUser();
  }, [])

  // console.log("listUser", listUser);

  const filterUser = listUser.length > 0 && data && listUser.filter(item => item.id === data.userId) || [];
  // console.log("filterUser", filterUser);

  let formattedTime = "";

  if (data && data.createdAt) {
    let dateObject = new Date(data.createdAt);

    // Lấy thông tin giờ, phút, ngày, tháng, năm
    let hours = dateObject.getUTCHours();
    let minutes = dateObject.getUTCMinutes();
    let day = dateObject.getUTCDate();
    let month = dateObject.getUTCMonth() + 1; // Tháng bắt đầu từ 0
    let year = dateObject.getUTCFullYear();

    // Định dạng lại chuỗi theo định dạng horse/minutes - DD/MM/YYYY
    formattedTime = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ' - ' + day.toString().padStart(2, '0') + '/' + month.toString().padStart(2, '0') + '/' + year;
  }

  return (
    <div className={clsx("flex select-none px-2 py-3 rounded-md hover:bg-[#e6f2fe]", {
      "!my-0 py-3 rounded-none hover:!bg-[#3b3a3a]": page === "user"
    })}
      onClick={onClick ? onClick : () => {}}
    >
      {/* avatar */}
      {page !== "user" &&
        <Image src={filterUser.length > 0 ? filterUser[0].avatar !== null ? filterUser[0].avatar : "" : ""} className="w-12 h-12 rounded-full" />
      }
      <div className={clsx("w-[calc(100%-48px)] pl-3", {
        "w-full px-3": page === "user"
      })}>
        <p className={clsx("text-black font-light text-sm line-clamp-3 leading-4", {
          "text-white": page === "user"
        })}>
          <span className={clsx("inline-block font-semibold text-base text-black capitalize pr-1 leading-4", {
            "text-primary pr-2": page === "user"
          })}>
            {data && data.title}
          </span>
          {data && data.message}
        </p>
        <span className={clsx("font-medium text-sm text-gray-700 mt-1 block", {
          "text-primary-hover": page === "user"
        })}>{formattedTime}</span>
      </div>
    </div>
  );
}

export default NotificationCard;
