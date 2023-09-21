import Image from "../Image";
import avatar from "../../assets/images/Test/oie_cgCjMMBawAJ3.jpg";
import clsx from "clsx";

function NotificationCard({ page }) {
  return (
    <div className={clsx("flex select-none my-3 px-2 py-1 rounded-md hover:bg-[#e6f2fe]", {
      "!my-0 py-3 rounded-none hover:!bg-[#3b3a3a]": page === "user"
    })}>
      {/* avatar */}
      {page !== "user" &&
        <Image src={avatar} className="w-12 h-12 rounded-full" />
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
            title
          </span>
          is simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining essentially
          unchanged
        </p>
        <span className={clsx("font-medium text-sm text-gray-700 mt-1 block", {
          "text-primary-hover": page === "user"
        })}>25 seconds ago</span>
      </div>
    </div>
  );
}

export default NotificationCard;
