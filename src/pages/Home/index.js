import React, { useContext, useEffect, useState } from "react";
import SlideShow from "../../components/SlideShow";
import Heading from "../../components/Heading";
import {
  CheckedShieldIcon,
  HotMealIcon,
  OutlineMinusIcon,
  OutlinePlusIcon,
  RefundIcon,
  TrunkIcon,
} from "../../components/Icons";
import ItemCompact from "../../components/ItemCompact";
import { useTranslation } from "react-i18next";
import { homeTypeOfFoods } from "../../data/homeTypeOfFoods";
import underline from "../../assets/images/Base/underlineTitle-home.png";
import clsx from "clsx";
import * as productServices from "../../services/productServices";
import * as variantServices from "../../services/variantServices";
import { getAllorOneCategoryOfProduct } from "../../services/categoryServices";
import Modal from "../../components/Modal";
import InputRadio from "../../components/FormControl/inputRadio";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import WindowScrollTop from "../../utils/windowScroll";
import { useDispatch } from "react-redux";
import { handleAddToCartRedux } from "../../redux/actions/cartAction";
import getRandomListItem from "../../utils/getRandomItem";
import GlobalContext from "../../contexts/globalContext";
import slider1 from "../../assets/images/Base/homeSlider-1.jpeg";
import slider2 from "../../assets/images/Base/homeSlider-2.jpeg";
import slider3 from "../../assets/images/Base/homeSlider-3.jpeg";
import slider4 from "../../assets/images/Base/homeSlider-4.jpeg";
import slider5 from "../../assets/images/Base/homeSlider-5.jpeg";
import slider6 from "../../assets/images/Base/homeSlider-6.jpeg";
import { TBUTTON_VARIANT } from "../../types/button";
import { useAuth } from "../../contexts/authContext";
import toast from "react-hot-toast";
import { useMenuSelected } from "../../contexts/menuSelectedContext";

const DATA_SLIDER = [
  {
    image: slider1,
    title: "Background 1",
    subTitle: "Slogan 3",
    interval: 1500,
  },
  {
    image: slider2,
    title: "Background 2",
    subTitle: "Slogan 3",
    interval: 1500,
  },
  {
    image: slider3,
    title: "Background 3",
    subTitle: "Slogan 3",
    interval: 1500,
  },
  {
    image: slider4,
    title: "Background 4",
    subTitle: "Slogan 3",
    interval: 1500,
  },
  {
    image: slider5,
    title: "Background 5",
    subTitle: "Slogan 3",
    interval: 1500,
  },
  {
    image: slider6,
    title: "Background 6",
    subTitle: "Slogan 3",
    interval: 1500,
  },
];

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setReloadCart } = useContext(GlobalContext);
  const { setCurrentCategory } = useMenuSelected();
  const { dataUser } = useAuth();
  const { t } = useTranslation(["home", "header"]);
  const [typeOfProduct, setTypeOfProduct] = useState(homeTypeOfFoods);
  const [dataProducts, setDataProducts] = useState([]);
  const [openModalAddToCart, setOpenModalAddToCart] = useState(false);
  const [size, setSize] = useState("M");
  const [currentCount, setCurrentCount] = useState(1);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [currentPricePreview, setCurrentPricePreview] = useState(null);
  const [originalPricePreview, setOriginalPricePreview] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [currentIdAddToCart, setCurrentIdAddToCart] = useState(null);
  const [openModalAddToCartSuccess, setOpenModalAddToCartSucess] =
    useState(false);

  const optionsSize = [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
  ];

  const fetchListProductsCompact = async () => {
    let response = (await productServices.getAllProductCompact()) ?? null;
    if (response) {
      const dataListProduct = response.products || [];
      let splitFields =
        dataListProduct.length > 0 &&
        dataListProduct.map((item) => {
          if (item.Variants) {
            if (item.Variants.length > 0) {
              let minPrice = item.Variants[0].price;
              let maxPrice = item.Variants[0].price;
              let maxPriceOriginal = item.Variants[0].price;

              let maxDiscountVariant = item.Variants[0].discountVariant;
              for (const variant of item.Variants) {
                let currentVariantPrice =
                  variant.price -
                  (variant.price * variant.discountVariant) / 100;
                if (currentVariantPrice < minPrice) {
                  minPrice = currentVariantPrice;
                }
                if (currentVariantPrice > maxPrice) {
                  maxPrice = currentVariantPrice;
                }

                if (variant.price > maxPriceOriginal) {
                  maxPriceOriginal = variant.price;
                  item.originalPrice = `${maxPriceOriginal} $`;
                }
                if (variant.discountVariant > maxDiscountVariant) {
                  maxDiscountVariant = variant.discountVariant;
                  item.discount = `${maxDiscountVariant} %` ?? `0 %`;
                }
              }

              if (minPrice === maxPrice) {
                item.price = `${Math.round(minPrice * 100) / 100} $` ?? `0 $`;
              } else {
                item.price =
                  `${Math.round(minPrice * 100) / 100} ~ ${
                    Math.round(maxPrice * 100) / 100
                  } $` ?? `0 $`;
              }

              delete item.Variants;
            }
          }

          if (item.Category) {
            item.categoryName = item.Category.name;
            delete item.Category;
          }

          return item;
        });

      if (splitFields.length > 0) {
        const randomItem = getRandomListItem(splitFields, 16);
        setDataProducts(randomItem);
      }
    }
  };

  const fetchDataTypeOfProduct = async () => {
    let response = (await getAllorOneCategoryOfProduct("all")) ?? null;
    if (response) {
      setTypeOfProduct(response.categories);
    }
  };

  useEffect(() => {
    fetchListProductsCompact();
    fetchDataTypeOfProduct();
  }, []);

  // handle add to cart
  const handleOpenModalAddToCart = async (prodId) => {
    let response = (await variantServices.findVariantInProduct(prodId)) ?? null;
    if (response) {
      const dataProductSelected = response.variant ?? [];
      let filterValue =
        dataProductSelected.length > 0 &&
        dataProductSelected.filter((item) => item.name === size);
      if (filterValue.length > 0) {
        setCurrentPrice(filterValue[0].currentPrice);
        setOriginalPrice(filterValue[0].originalPrice);

        if (filterValue[0].discountVariant === 0) {
          setDiscount(null);
        } else {
          setDiscount(filterValue[0].discountVariant);
        }
      } else {
        setCurrentPrice(0);
        setOriginalPrice(0);
        setDiscount(null);
      }
      setOpenModalAddToCart(true);
    }
  };

  useEffect(() => {
    if (currentIdAddToCart && openModalAddToCart) {
      handleOpenModalAddToCart(currentIdAddToCart);
    }
  }, [currentIdAddToCart, size]);

  const handleCloseModalAddToCart = () => {
    setOpenModalAddToCart(false);
    setSize("M");
    setCurrentPrice(0);
    setOriginalPrice(0);
    setDiscount(null);
    setCurrentCount(1);
    setCurrentPricePreview(null);
    setOriginalPricePreview(null);
  };

  const handleGetValueSize = (currentValue) => {
    setSize(currentValue);
    setCurrentCount(1);
    setCurrentPricePreview(null);
    setOriginalPricePreview(null);
  };

  // handle count when add to cart
  const onHandlePlusItem = (currentCount) => {
    setCurrentCount((currentCount += 1));
    setCurrentPricePreview(currentPrice * currentCount);
    setOriginalPricePreview(originalPrice * currentCount);
  };

  const onHandleMinusItem = (currentCount) => {
    if (currentCount <= 1) {
    } else {
      setCurrentCount((currentCount -= 1));
      setCurrentPricePreview(currentPrice * currentCount);
      setOriginalPricePreview(originalPrice * currentCount);
    }
  };

  const onhandleSubmitAddToCart = (e) => {
    e.preventDefault();
    const data = new FormData();
    let checkAllowAddToCart = true;

    if (dataUser) {
      data.set("userId", dataUser.user.id);
    } else {
      toast.error("You need login to used this feature");
      checkAllowAddToCart = false;
      return;
    }

    data.set("prodId", currentIdAddToCart);
    data.set("quantity", currentCount);
    data.set("size", size);
    data.set(
      "price",
      currentPricePreview
        ? Math.round(currentPricePreview * 100) / 100
        : Math.round(currentPrice * 100) / 100
    );

    try {
      if (checkAllowAddToCart) {
        let responseAddToCartSubmit = null;
        responseAddToCartSubmit = dispatch(handleAddToCartRedux(data));
        if (responseAddToCartSubmit) {
          handleCloseModalAddToCart();
          setOpenModalAddToCartSucess(true);
          setReloadCart(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-8 relative">
      {/* slideshow */}
      <SlideShow data={DATA_SLIDER} />
      <Heading
        line
        iconRight={
          <HotMealIcon
            className={"text-[1.5rem] -translate-y-1 text-primary-hover"}
          />
        }
      >
        {t("heading.special")}
      </Heading>
      <div className="flex flex-row flex-wrap">
        {dataProducts.length > 0 &&
          dataProducts.map((item, index) => {
            return (
              <ItemCompact
                key={index}
                data={item}
                onhandleAddToCart={() => {
                  setCurrentIdAddToCart(item.id);
                  handleOpenModalAddToCart(item.id);
                }}
                onHandleProductDetail={() => {
                  WindowScrollTop();
                  navigate(`/product-detail/${item.id}`);
                }}
              />
            );
          })}
      </div>
      <div className="mt-3">
        <Heading line>{t("heading.menu")}</Heading>
      </div>
      <div className="-mx-16 mt-3">
        {typeOfProduct.length > 0 &&
          typeOfProduct.map((item, index) => {
            return (
              <Link
                key={index}
                to={"/menu"}
                onClick={() => {
                  setCurrentCategory(item.id);
                  WindowScrollTop();
                }}
                className={clsx(
                  "w-full h-64 relative overflow-hidden select-none block",
                  "before:content-[''] before:bg-[rgba(0,0,0,0.4)] before:absolute before:inset-0 before:z-20",
                  {
                    "group hover:before:bg-[rgba(255,255,255,0.05)] hover:after:transition-all hover:after:duration-300 cursor-pointer":
                      item.id !== typeOfProduct[typeOfProduct.length - 1].id,
                  }
                )}
              >
                <div className="absolute z-30 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                  <p
                    className={clsx(
                      "relative capitalize text-white font-semibold text-2xl tracking-widest",
                      {
                        "!text-[rgba(255,255,255,0.3)]":
                          item.id ===
                          typeOfProduct[typeOfProduct.length - 1].id,
                      }
                    )}
                  >
                    {t(`product.${item.keyword}`)}
                  </p>
                  <div
                    className={clsx("w-full h-3 opacity-0", {
                      "group-hover:opacity-100 transition-all duration-300":
                        item.id !== typeOfProduct[typeOfProduct.length - 1].id,
                    })}
                    style={{
                      background: `url(${underline}) center/cover no-repeat`,
                    }}
                  ></div>
                </div>
                <div
                  className={clsx("absolute inset-0 z-10", {
                    "group-hover:scale-125 transition-all duration-500":
                      item.id !== typeOfProduct[typeOfProduct.length - 1].id,
                  })}
                  style={{
                    background: `url(${item.image}) center/cover no-repeat`,
                  }}
                ></div>
                <div
                  className={clsx(
                    "absolute inset-0 z-20 border-4 border-transparent border-solid",
                    {
                      "group-hover:border-white transition-all duration-300":
                        item.id !== typeOfProduct[typeOfProduct.length - 1].id,
                    }
                  )}
                ></div>
              </Link>
            );
          })}
      </div>

      {/* click add to cart */}
      <Modal open={openModalAddToCart} close={handleCloseModalAddToCart}>
        <form autoComplete="off" onSubmit={onhandleSubmitAddToCart}>
          <h1 className="font-semibold text-xl text-black mb-3">Add to cart</h1>
          <InputRadio
            key={Math.floor(Math.random() * 10)}
            id={Math.floor(Math.random() * 10)}
            name="size"
            type="radio"
            label="Size"
            checked={size !== -1 ? size : "M"}
            edit
            row
            options={optionsSize}
            onChange={handleGetValueSize}
          />

          {/* count */}
          <h2 className="capitalize block text-base font-medium text-black tracking-wider mt-3 mb-2">
            Count
          </h2>
          <div className="inline-flex w-32 items-center text-black border-2 border-black rounded-lg overflow-hidden">
            <OutlineMinusIcon
              className={
                "!w-9 !h-9 p-2 flex-grow-0 transition-all hover:bg-black hover:text-primary cursor-pointer"
              }
              onClick={() => onHandleMinusItem(currentCount)}
            />
            <span className="px-4 flex-grow text-center cursor-default">
              {currentCount}
            </span>
            <OutlinePlusIcon
              className={
                "!w-9 !h-9 p-2 flex-grow-0 transition-all hover:bg-black hover:text-primary cursor-pointer"
              }
              onClick={() => onHandlePlusItem(currentCount)}
            />
          </div>

          <div className="flex justify-center items-center mt-3">
            <div className="flex flex-col justify-center items-center mx-3">
              <TrunkIcon
                className={
                  "!w-10 !h-10 p-2 bg-gray-300 text-black rounded-full overflow-hidden"
                }
              />
              <p className="text-sm text-black mt-2 font-semibold w-[150px] text-center">
                Free Delivery
              </p>
            </div>
            <div className="flex flex-col justify-center items-center mx-3">
              <RefundIcon
                className={
                  "!w-10 !h-10 p-2 bg-gray-300 text-black rounded-full overflow-hidden"
                }
              />
              <p className="text-sm text-black mt-2 font-semibold w-[150px] text-center">
                Cancel for a refund
              </p>
            </div>
            <div className="flex flex-col justify-center items-center mx-3">
              <TrunkIcon
                className={
                  "!w-10 !h-10 p-2 bg-gray-300 text-black rounded-full overflow-hidden"
                }
              />
              <p className="text-sm text-black mt-2 font-semibold w-[150px] text-center">
                Huy Delivery
              </p>
            </div>
            <div className="flex flex-col justify-center items-center mx-3">
              <CheckedShieldIcon
                className={
                  "!w-10 !h-10 p-2 bg-gray-300 text-black rounded-full overflow-hidden"
                }
              />
              <p className="text-sm text-black mt-2 font-semibold w-[150px] text-center">
                Certified clean international food
              </p>
            </div>
          </div>

          <div className="mt-4 py-2 border-t-4 border-gray-500 flex items-center">
            <p className="text-lg font-semibold text-black">
              Thành tiền:{" "}
              {currentPricePreview
                ? Math.round(currentPricePreview * 100) / 100
                : Math.round(currentPrice * 100) / 100}
              $
            </p>
            <span className="text-xl line-through opacity-50 font-semibold text-black ml-3">
              {originalPricePreview ?? originalPrice}$
            </span>
            {discount && (
              <span className="productCompact__discountPercent ml-3">
                Save {discount}%
              </span>
            )}
          </div>

          <div className="flex justify-end">
            <Button variant={TBUTTON_VARIANT.PRIMARY}>Add to Cart</Button>
            <Button
              variant={TBUTTON_VARIANT.PRIMARY}
              onClick={handleCloseModalAddToCart}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* add to cart success */}
      <Modal
        open={openModalAddToCartSuccess}
        custom
        close={() => setOpenModalAddToCartSucess(false)}
      >
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <p className="text-lg font-semibold text-green-600">
                Thêm vào giỏ hàng thành công
              </p>
            </div>
            <div className="mt-4">
              <p className="text-gray-600">
                Món ăn của bạn đã được thêm vào giỏ hàng. Bạn có thể tiếp tục
                mua sắm hoặc xem giỏ hàng của mình.
              </p>
            </div>
            <div className="mt-6">
              <Button
                variant={TBUTTON_VARIANT.PRIMARY}
                onClick={() => setOpenModalAddToCartSucess(false)}
              >
                Tiếp tục mua sắm
              </Button>
              <Button
                variant={TBUTTON_VARIANT.PRIMARY}
                to={"/cart"}
                onClick={() => {
                  WindowScrollTop();
                }}
              >
                Vào giỏ hàng
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Home;
