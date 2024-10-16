import { useTranslation } from "react-i18next";
import Button from "../Button";
import { StarFillIcon, StarHalfIcon, StarIcon } from "../Icons";
import Image from "../Image";
import clsx from "clsx";
import ItemInCart from "./ItemInCart";
import { TBUTTON_VARIANT } from "../../types/button";

function ItemCompact({
  size,
  type,
  data,
  onhandleAddToCart,
  onHandleProductDetail,
  onHandleRefreshCart,
  disabledBtnAdd = false,
}) {
  const { t } = useTranslation(["home"]);

  if (type === "cart") {
    return (
      <ItemInCart
        size={size}
        data={data}
        onHandleRefreshCart={onHandleRefreshCart}
      />
    );
  }

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <span className="flex items-center mt-1">
        {Array(fullStars)
          .fill()
          .map((_, i) => (
            <StarFillIcon key={i} className="text-yellow-300" />
          ))}
        {hasHalfStar && <StarHalfIcon className="text-yellow-300" />}
        {Array(emptyStars)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className="text-yellow-300" />
          ))}
        <span className="text-xs ml-2 text-gray-400">
          {getRandomReviews(10, 50)} reviews
        </span>
      </span>
    );
  };

  const getRandomReviews = (min, max) => {
    return `${Math.floor(Math.random() * (max - min + 1)) + min}k`;
  };

  const getRandomRating = () => {
    const random = Math.random() * 4.5 + 0.5;
    return Math.round(random * 2) / 2;
  };

  const StarRatingComponent = () => {
    const randomRating = getRandomRating();
    return renderStars(randomRating);
  };

  return (
    <div
      className={clsx("productCompact group relative", {
        "w-[calc(25%-1.5rem)]": size === "fourItems-onRows",
        "w-[calc(33.33%-1.5rem)]": size === "threeItems-onRows",
      })}
    >
      {!data?.isAvailable && (
        <span className="absolute min-w-[140px] max-w-[140px] text-center top-0 left-0 bg-red-500 text-white text-lg font-semibold px-4 py-2 rotate-[-45deg] translate-x-[-30%] translate-y-[30%]">
          Close
        </span>
      )}

      {data.isAvailable === false && <div className="absolute inset-0 bg-black opacity-50 z-10"></div>}

      <Image
        src={data ? data.image : "https://www.koreandxb.com/images/food1.jpg"}
        effectScale
        className={"h-[320px]"}
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
            <p className="text-xl font-semibold text-white whitespace-nowrap">
              {data ? data.price : "400$"}
            </p>
          </span>
          <div className="flex items-center gap-2">
            <span className="flex justify-start items-center">
              <p className="text-lg line-through opacity-50 text-white whitespace-nowrap">
                {data && data.originalPrice ? data.originalPrice : ""}
              </p>
            </span>
            {data && data.discount && (
              <span className="productCompact__discountPercent">
                {data ? `Save up to ${data.discount}` : "save 20%"}
              </span>
            )}
          </div>
        </div>

        {StarRatingComponent()}

        {/* button action */}
        <div className="mt-5 flex justify-end">
          {!disabledBtnAdd && (
            <Button
              variant={TBUTTON_VARIANT.PRIMARY}
              onClick={() => {
                if (onhandleAddToCart && data.isAvailable !== false) {
                  onhandleAddToCart();
                }
              }}
              disabled
            >
              {t("button.addToCart")}
            </Button>
          )}
          <Button
            variant={TBUTTON_VARIANT.PRIMARY}
            onClick={() => {
              if (onHandleProductDetail && data.isAvailable !== false) {
                onHandleProductDetail();
              }
            }}
            disabled
          >
            {t("button.detail")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ItemCompact;
