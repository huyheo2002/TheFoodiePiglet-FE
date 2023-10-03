import { useTranslation } from "react-i18next";
import Button from "../Button";
import {
  // DollarIcon,
  // HeartFillIcon,
  StarFillIcon,
  // StarHalfIcon,
  StarIcon,
} from "../Icons";
import Image from "../Image";
import clsx from "clsx";
import ItemInCart from "./ItemInCart";
import { fakeDataProductsOrder } from "../../data/fakeDataProductsOrder";

function ItemCompact({ size, type, data, onhandleAddToCart, onHandleProductDetail }) {
  const { t } = useTranslation(["home"]);

  if (type === "cart") {
    return <ItemInCart size={size} data={fakeDataProductsOrder} />;
  }

  return (
    <div
      className={clsx("productCompact group", {
        "w-[calc(25%-1.5rem)]": size === "fourItems-onRows",
        "w-[calc(33.33%-1.5rem)]": size === "threeItems-onRows",
      })}
    >
      <Image src={data ? data.image : "https://www.koreandxb.com/images/food1.jpg"} effectScale 
        className={"max-h-[320px]"}
      />
      <div className="p-5 flex flex-col gap-3">
        <h2
          className="productCompact__title"
          title="Food Food Food Food Food Food Food Food Food Food"
        >
          {data ? data.name : "Food Food Food Food Food Food Food Food Food Food"}
        </h2>

        <div className="flex items-center gap-4">
          <span className="flex justify-start items-center">
            <p className="text-xl font-semibold text-white">400$</p>
          </span>
          <div className="flex items-center gap-2">
            <span className="flex justify-start items-center">
              <p className="text-lg line-through opacity-50 text-white">500$</p>
            </span>
            <span className="productCompact__discountPercent">save 20%</span>
          </div>
        </div>

        {/* rating */}
        <span className="flex items-center mt-1">
          <StarFillIcon className="text-yellow-300" />
          <StarFillIcon className="text-yellow-300" />
          <StarFillIcon className="text-yellow-300" />
          <StarFillIcon className="text-yellow-300" />
          {/* <StarHalfIcon className="text-yellow-300" /> */}
          <StarIcon className="text-yellow-300" />
          <span className="text-xs ml-2 text-gray-400">20k reviews</span>
        </span>

        {/* button action */}
        <div className="mt-5 flex">
          <Button variant="primary" onClick={() => {
            if(onhandleAddToCart) {
              onhandleAddToCart();
            }
          }}>{t("button.addToCart")}</Button>
          <Button variant="primary" onClick={() => {
            if(onHandleProductDetail) {
              onHandleProductDetail();
            }
          }}>{t("button.detail")}</Button>
        </div>
      </div>
    </div>
  );
}

export default ItemCompact;
