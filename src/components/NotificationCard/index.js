import clsx from "clsx";
import Image from "../Image";
import avatar from "../../assets/images/Test/oie_cgCjMMBawAJ3.jpg";

function NotificationCard() {
  return (
    <div className="flex select-none my-3 px-2 py-1 rounded-md hover:bg-[#e6f2fe]">
      {/* avatar */}
      <Image src={avatar} className="w-12 h-12 rounded-full" />
      <div className="w-[calc(100%-48px)] pl-3">
        <p className="text-black font-light text-sm line-clamp-3 leading-4">
          <span className="inline-block font-semibold text-base text-black capitalize pr-1 leading-4">
            title
          </span>
          is simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining essentially
          unchanged
        </p>
        <span className="font-medium text-sm text-gray-700 mt-1 block">25 seconds ago</span>
      </div>
    </div>
  );
}

export default NotificationCard;
