import React, { Fragment, useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Image from "../../components/Image";
import Heading from "../../components/Heading";
import ItemCompact from "../../components/ItemCompact";
import { useTranslation } from "react-i18next";
import * as productServices from "../../services/productServices";
import * as variantServices from "../../services/variantServices";
import rosaSad from "../../assets/images/Base/rosa-sad-600x600.png";
import WindowScrollTop from "../../utils/windowScroll";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import InputRadio from "../../components/FormControl/inputRadio";
import {
  CheckedShieldIcon,
  OutlineMinusIcon,
  OutlinePlusIcon,
  RefundIcon,
  TrunkIcon,
} from "../../components/Icons";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { handleAddToCartRedux } from "../../redux/actions/cartAction";
import GlobalContext from "../../contexts/globalContext";
import { TBUTTON_VARIANT } from "../../types/button";
import { useAuth } from "../../contexts/authContext";
import toast from "react-hot-toast";

function Menu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setReloadCart } = useContext(GlobalContext);
  const { t } = useTranslation(["home", "header"]);
  const [dataCategory, setDataCategory] = useState(null);
  const [listProducts, setListProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState([]);

  // add to Cart
  const [openModalAddToCart, setOpenModalAddToCart] = useState(false);
  const [size, setSize] = useState("M");
  const [currentCount, setCurrentCount] = useState(1);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [currentPricePreview, setCurrentPricePreview] = useState(null);
  const [originalPricePreview, setOriginalPricePreview] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [currentIdAddToCart, setCurrentIdAddToCart] = useState(null);
  const { dataUser } = useAuth();

  // modal add to cart success
  const [openModalAddToCartSuccess, setOpenModalAddToCartSucess] =
    useState(false);

  const optionsSize = [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
  ];

  const handleGetDataCategorySelected = (data) => {
    console.log("data", data);
    setDataCategory(data);
  };

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

                // discount variant
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
        setListProducts(splitFields);

        let dataFilterCategory = null;
        if (dataCategory) {
          dataFilterCategory = splitFields.filter(
            (prod) => prod.categoryName === dataCategory[0].name
          );
        } else {
          dataFilterCategory = splitFields.filter(
            (prod) => prod.categoryName === "Món khai vị"
          );
        }

        if (dataFilterCategory) {
          setFilterCategory(dataFilterCategory);
        }
      }
    }
  };

  useEffect(() => {
    fetchListProductsCompact();
  }, [dataCategory]);

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
    <Fragment>
      <div className="w-full relative">
        <div className="relative w-full flex pt-16 overflow-hidden">
          <div className="w-[325px] min-w-[325px] min-h-[250px] fixed">
            <Sidebar getCategorySelected={handleGetDataCategorySelected} />
          </div>

          <main className="w-full ml-[325px] min-h-[250px] text-white px-3 py-4">
            <div className="w-full my-5">
              <Heading line>
                {dataCategory
                  ? t(`product.${dataCategory[0].keyword}`)
                  : t("product.mon-khai-vi")}
              </Heading>
              <div className="flex flex-row flex-wrap">
                {listProducts.length > 0 && filterCategory.length > 0 ? (
                  listProducts.map((item, index) => {
                    if (dataCategory) {
                      if (item.categoryName === dataCategory[0].name) {
                        return (
                          <ItemCompact
                            size={"threeItems-onRows"}
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
                      }
                    } else {
                      if (item.categoryName === "Món khai vị") {
                        return (
                          <ItemCompact
                            size={"threeItems-onRows"}
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
                      }
                    }
                  })
                ) : (
                  <div className="flex items-center justify-center w-full mb-12">
                    <div className="bg-transparent p-6 text-center w-full">
                      <h1 className="text-2xl font-semibold mb-4">
                        Xin lỗi, thể loại này hiện tại chưa có sản phẩm nào.
                      </h1>
                      <p className="text-white text-sm">
                        Chúng tôi đang cập nhật danh sách sản phẩm, vui lòng
                        quay lại sau.
                      </p>
                      <div className="flex justify-center">
                        <div className="w-[300px] h-[300px]">
                          <Image src={rosaSad} className={"my-5"} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* click add to cart */}
      <Modal open={openModalAddToCart} close={handleCloseModalAddToCart}>
        <form onSubmit={onhandleSubmitAddToCart} autoComplete="off">
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
    </Fragment>
  );
}

export default Menu;
