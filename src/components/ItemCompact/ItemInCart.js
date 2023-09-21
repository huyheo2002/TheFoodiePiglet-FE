import { useTranslation } from "react-i18next";
import Button from "../Button";
import {
  // DollarIcon,
  HeartFillIcon,
  OutlineMinusIcon,
  OutlinePlusIcon,
  StarFillIcon,
  // StarHalfIcon,
  StarIcon,
} from "../Icons";
import Image from "../Image";
import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../contexts/globalContext";

function ItemInCart({ size, type, data }) {
  const { t } = useTranslation(["home"]);
  const { totalMoneyToPay, setTotalMoneyToPay } = useContext(GlobalContext);

  const [currentCount, setCurrentCount] = useState(1);
  const [value, setValue] = useState(400);
  const [hidden, setHidden] = useState(false);
  const onHandlePlusItem = (currentCount) => {
    setCurrentCount((currentCount += 1));
    setValue(400 * currentCount)    

  };
  const onHandleMinusItem = (currentCount) => {
    if (currentCount <= 1) {
      setHidden(true);
    }
    setCurrentCount((currentCount -= 1));
    setValue(400 * currentCount)
  };
  const onhandleRemoveItem = () => {
    setHidden(true);
    setValue(0);
  };

  useEffect(() => {
    if(totalMoneyToPay === 0) {
        setTotalMoneyToPay(value)
    } else {
        setTotalMoneyToPay(totalMoneyToPay + value)
    }
    console.log("totalMoneyToPay", totalMoneyToPay)
  }, [value])

  console.log("data item in cart", data)

  return (
    <div
      className={clsx("productCompact group cursor-default", {
        "w-[calc(25%-1.5rem)]": size === "fourItems-onRows",
        "w-[calc(33.33%-1.5rem)]": size === "threeItems-onRows",
        "w-full flex flex-row": size === "oneItems-onRows",
        "!hidden": hidden,
      })}
    >
      <Image src="https://www.koreandxb.com/images/food1.jpg" effectScale />
      <div className="p-5 flex flex-col gap-3">
        <h2
          className="productCompact__title"
          title="Food Food Food Food Food Food Food Food Food Food"
        >
          Food Food Food Food Food Food Food Food Food Food
        </h2>

        <div className="flex items-center gap-4">
          <span className="flex justify-start items-center">
            <p className="text-xl font-semibold text-white">
              {value}$
            </p>
          </span>
          <div className="flex items-center gap-2">
            <span className="flex justify-start items-center">
              <p className="text-lg line-through opacity-50 text-white">500$</p>
            </span>
            <span className="productCompact__discountPercent">save 20%</span>
          </div>
        </div>

        {/* count */}
        <div className="inline-flex w-32 items-center text-white border-2 border-white rounded-lg overflow-hidden">
          <OutlineMinusIcon
            className={
              "!w-9 !h-9 p-2 flex-grow-0 transition-all hover:bg-white hover:text-black cursor-pointer"
            }
            onClick={() => onHandleMinusItem(currentCount)}
          />
          <span className="px-4 flex-grow text-center cursor-default">
            {currentCount}
          </span>
          <OutlinePlusIcon
            className={
              "!w-9 !h-9 p-2 flex-grow-0 transition-all hover:bg-white hover:text-black cursor-pointer"
            }
            onClick={() => onHandlePlusItem(currentCount)}
          />
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

        <div className="mt-5 flex">
          <Button variant="delete" onClick={() => onhandleRemoveItem()}>
            {t("button.delete")}
          </Button>
          <Button
            variant="delete"
            iconLeft={
              <HeartFillIcon className={"flex justify-center items-center"} />
            }
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default ItemInCart;
