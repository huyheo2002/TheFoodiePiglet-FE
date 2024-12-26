import { useTranslation } from "react-i18next";
import Button from "../Button";
import {
  ArrowDownCircleFillIcon,
  // DollarIcon,
  HeartFillIcon,
  OutlineMinusIcon,
  OutlinePlusIcon,
  StarFillIcon,
  // StarHalfIcon,
  StarIcon,
  TickIcon,
} from "../Icons";
import Image from "../Image";
import clsx from "clsx";
import { useState } from "react";
import {
  handleAddToCartRedux,
  handleRemoveItemInCartRedux,
} from "../../redux/actions/cartAction";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { TBUTTON_VARIANT } from "../../types/button";
import { useAuth } from "../../contexts/authContext";

function ItemInCart({ size, type, data, onHandleRefreshCart }) {
  const { t } = useTranslation(["home"]);
  const dispatch = useDispatch();
  const [currentCount, setCurrentCount] = useState(data && data.quantity);
  const [value, setValue] = useState(data && data.price);
  const [valueOriginal, setValueOriginal] = useState(
    data && data.originalPrice * data.quantity
  );
  const [toggleDropdownSize, setToggleDropdownSize] = useState(false);
  const [currentSize, setCurrentSize] = useState(data ? data.size : null);
  const [discount, setDiscount] = useState(data && data.discount);

  const [changeItem, setChangeItem] = useState(false);
  const { dataUser } = useAuth();

  const onHandlePlusItem = (currentCount) => {
    let priceOneItem = data && parseInt(data.price / data.quantity);

    setCurrentCount((currentCount += 1));
    if (data) {
      setValue(priceOneItem * currentCount);
      setValueOriginal(parseInt(data.originalPrice) * currentCount);

      setChangeItem(true);
    }

    if (data && currentCount === data.quantity && currentSize === data.size) {
      setChangeItem(false);
    } else {
      toast.success("You had plus product successfully");
    }
  };

  const onHandleMinusItem = (currentCount) => {
    let priceOneItem = data && parseInt(data.price / data.quantity);
    if (currentCount <= 1) {
      toast.error("You can't minus this product, if you want let deleted it");
    } else {
      setCurrentCount((currentCount -= 1));
      if (data) {
        setValue(priceOneItem * currentCount);
        setValueOriginal(parseInt(data.originalPrice) * currentCount);

        setChangeItem(true);
      }

      if (data && currentCount === data.quantity && currentSize === data.size) {
        setChangeItem(false);
      } else {
        toast.success("You had minus product successfully");
      }
    }
  };

  const onhandleChangeSize = (size) => {
    let getAllVariant =
      data && data.Variants.filter((item) => item.name === size);
    if (getAllVariant.length > 0) {
      let currentPrice =
        getAllVariant[0].price -
        (getAllVariant[0].price * getAllVariant[0].discountVariant) / 100;
      setValue(Math.round(currentPrice * currentCount));
      setValueOriginal(getAllVariant[0].price * currentCount);
      setDiscount(getAllVariant[0].discountVariant);
      setCurrentSize(size);
      setToggleDropdownSize(false);
      setChangeItem(true);

      if (data && currentCount === data.quantity && size === data.size) {
        setChangeItem(false);
      } else {
        toast.success("You had change size of product successfully");
      }
    }
  };

  const onhandleRemoveItem = () => {
    let responseDeleteItemCurrent = dispatch(
      handleRemoveItemInCartRedux(data.id)
    );
    if (responseDeleteItemCurrent) {
      onHandleRefreshCart();
      toast.success("Deleted product successfully");
    }
  };

  const onhandleSubmitAddToCart = () => {
    const dataSubmit = new FormData();
    let checkAllowAddToCart = true;

    if (dataUser) {
      dataSubmit.set("userId", dataUser.user.id);
    } else {
      toast.error("You need login to open this features");
      checkAllowAddToCart = false;
      return;
    }

    dataSubmit.set("idDelete", data.id);
    dataSubmit.set("prodId", data.prodId);
    dataSubmit.set("quantity", currentCount);
    dataSubmit.set("size", currentSize);
    dataSubmit.set("price", value);

    try {
      if (checkAllowAddToCart) {
        dispatch(handleAddToCartRedux(dataSubmit)).then(() => {
          setChangeItem(false);
          onHandleRefreshCart();
        });

        toast.success("Add products into card successfully");
      }
    } catch (error) {
      toast.error("Error when add products into card");
    }
  };

  return (
    <div
      className={clsx("productCompact group cursor-default h-[275px]", {
        "w-[calc(25%-1.5rem)]": size === "fourItems-onRows",
        "w-[calc(33.33%-1.5rem)]": size === "threeItems-onRows",
        "w-full flex flex-row": size === "oneItems-onRows",
      })}
      onClick={() => {
        setToggleDropdownSize(false);
      }}
    >
      <Image
        src={data ? data.image : "https://www.koreandxb.com/images/food1.jpg"}
        className={"w-[400px]"}
        effectScale
      />
      <div className="p-5 flex flex-col gap-3">
        <h2
          className="productCompact__title"
          title={
            data
              ? data.name
              : "Food Food Food Food Food Food Food Food Food Food"
          }
        >
          {data
            ? data.name
            : "Food Food Food Food Food Food Food Food Food Food"}
        </h2>

        <div className="flex items-center gap-4">
          <span className="flex justify-start items-center">
            <p className="text-xl font-semibold text-white">
              {`${value}$` ?? "400$"}
            </p>
          </span>
          <div className="flex items-center gap-2">
            <span className="flex justify-start items-center">
              <p className="text-lg line-through opacity-50 text-white">
                {`${valueOriginal}$` ?? "500$"}
              </p>
            </span>
            {discount && (
              <span className="productCompact__discountPercent">{`Save up to ${discount}%`}</span>
            )}
          </div>
        </div>

        <div className="flex items-center">
          <div
            className="inline-flex items-center text-white border-2 border-white rounded-lg cursor-pointer mr-6 relative"
            onClick={(e) => {
              e.stopPropagation();
              setToggleDropdownSize(!toggleDropdownSize);
            }}
          >
            <span className="px-4 flex-grow text-center">
              {currentSize ? currentSize : "Change size here"}
            </span>
            <ArrowDownCircleFillIcon
              className={
                "!w-9 !h-9 p-2 flex-grow-0 transition-all hover:bg-white hover:text-black cursor-pointer"
              }
              onClick={() => {}}
            />

            {toggleDropdownSize && data && (
              <div
                className={clsx(
                  "absolute z-50 bg-[#272626] max-h-[120px] min-w-[175px] top-10 w-full rounded-lg shadow-black-rb-0.35 block overflow-hidden",
                  {
                    "overflow-y-scroll scrollbar-primary":
                      data.Variants.length > 3,
                  }
                )}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {data.Variants.length > 0 &&
                  data.Variants.map((item, index) => {
                    return (
                      <div
                        className="py-2 px-3 hover:bg-[#3b3a3a] flex justify-between items-center"
                        onClick={() => onhandleChangeSize(item.name)}
                        key={index}
                      >
                        <span className="text-sm font-semibold">
                          Size: {item.name}
                        </span>
                        {currentSize === item.name && (
                          <TickIcon className={"!w-6 !h-6 text-red-500"} />
                        )}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          {/* count */}
          <div className="inline-flex w-32 items-center text-white border-2 border-white rounded-lg overflow-hidden mr-6">
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

          {/* size */}
          <div className="inline-flex w-9 h-9 justify-center text-center items-center bg-white border-2 border-white rounded-lg overflow-hidden">
            <p className="text-black font-bold text-lg">
              {currentSize ? currentSize : "M"}
            </p>
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

        <div className="mt-5 flex">
          <Button variant={TBUTTON_VARIANT.DELETE} onClick={() => onhandleRemoveItem()}>
            {t("button.delete")}
          </Button>
          {changeItem && (
            <Button variant={TBUTTON_VARIANT.DELETE} onClick={() => onhandleSubmitAddToCart()}>
              Lưu thay đổi
            </Button>
          )}
          <Button
            variant={TBUTTON_VARIANT.DELETE}
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
