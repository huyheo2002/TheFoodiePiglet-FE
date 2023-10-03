import React, { useEffect, useState } from "react";
import SlideShow from "../../components/SlideShow";
import Heading from "../../components/Heading";
import { HotMealIcon } from "../../components/Icons";
import ItemCompact from "../../components/ItemCompact";
import { useTranslation } from "react-i18next";
import { homeTypeOfFoods } from "../../data/homeTypeOfFoods";
import underline from "../../assets/images/Base/underlineTitle-home.png";
import clsx from "clsx";
import { getAllProduct } from "../../services/productServices";
import { getAllorOneCategoryOfProduct } from "../../services/categoryServices";
import Modal from "../../components/Modal";
import InputRadio from "../../components/FormControl/inputRadio";
import Button from "../../components/Button";

function Home() {
  const { t } = useTranslation(["home", "header"]);
  const [typeOfProduct, setTypeOfProduct] = useState(homeTypeOfFoods);
  const [dataProducts, setDataProducts] = useState([]);
  const [openModalAddToCart, setOpenModalAddToCart] = useState(false);
  const [size, setSize] = useState("M");
  const optionsSize = [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
  ];

  const fetchDataProduct = async () => {
    let respon = await getAllProduct() ?? null;

    console.log("respon prod", respon);
    if (respon) {
      setDataProducts(respon.products)
    }
  }

  const fetchDataTypeOfProduct = async () => {
    let respon = await getAllorOneCategoryOfProduct("all") ?? null;
    if (respon) {
      setTypeOfProduct(respon.categories);
    }
  }

  useEffect(() => {
    fetchDataProduct();
    fetchDataTypeOfProduct();
  }, [])

  // handle add to cart
  const handleOpenModalAddToCart = () => {
    setOpenModalAddToCart(true);
  }

  const handleCloseModalAddToCart = () => {
    setOpenModalAddToCart(false);
    setSize("M");
  }

  const handleGetValueSize = (currentValue) => {
    setSize(currentValue);
  };

  return (
    <div className="mt-8 relative">
      {/* slideshow */}
      <SlideShow />
      {/* product specialities */}
      <Heading line iconRight={<HotMealIcon className={"text-[1.5rem] -translate-y-1 text-primary-hover"} />}>
        {t("heading.special")}
      </Heading>
      <div className="flex flex-row flex-wrap">
        {dataProducts.length > 0 && dataProducts.map((item, index) => {
          return <ItemCompact key={index} data={item} />
        })}

        <ItemCompact onhandleAddToCart={handleOpenModalAddToCart} />
        <ItemCompact onhandleAddToCart={handleOpenModalAddToCart} />
        <ItemCompact onhandleAddToCart={handleOpenModalAddToCart} />
        <ItemCompact onhandleAddToCart={handleOpenModalAddToCart} />
        <ItemCompact onhandleAddToCart={handleOpenModalAddToCart} />
      </div>
      {/* type of foods :v */}
      <div className="mt-3">
        <Heading line>{t("heading.menu")}</Heading>
      </div>
      <div className="-mx-16 mt-3">
        {typeOfProduct.length > 0 &&
          typeOfProduct.map((item, index) => {
            return (
              <div
                key={index}
                // "w-full h-64 relative cursor-pointer overflow-hidden group
                //   before:content-[''] before:bg-[rgba(0,0,0,0.4)] before:absolute before:inset-0 before:z-20
                //   hover:before:bg-[rgba(255,255,255,0.05)] hover:after:transition-all hover:after:duration-300                  
                // "
                className={clsx("w-full h-64 relative overflow-hidden select-none",
                  "before:content-[''] before:bg-[rgba(0,0,0,0.4)] before:absolute before:inset-0 before:z-20",
                  {
                    "group hover:before:bg-[rgba(255,255,255,0.05)] hover:after:transition-all hover:after:duration-300 cursor-pointer": item.id !== typeOfProduct[typeOfProduct.length - 1].id
                  }
                )}
              >
                <div className="absolute z-30 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                  <p className={clsx("relative capitalize text-white font-semibold text-2xl tracking-widest", {
                    "!text-[rgba(255,255,255,0.3)]": item.id === typeOfProduct[typeOfProduct.length - 1].id
                  })}

                  >
                    {t(`product.${item.keyword}`)}
                  </p>
                  <div
                    className={clsx("w-full h-3 opacity-0", {
                      "group-hover:opacity-100 transition-all duration-300": item.id !== typeOfProduct[typeOfProduct.length - 1].id
                    })}
                    style={{
                      background: `url(${underline}) center/cover no-repeat`,
                    }}
                  ></div>
                </div>
                {/* overlay */}
                <div
                  className={clsx("absolute inset-0 z-10", {
                    "group-hover:scale-125 transition-all duration-500": item.id !== typeOfProduct[typeOfProduct.length - 1].id
                  })}
                  style={{
                    background: `url(${item.image}) center/cover no-repeat`,
                  }}
                ></div>
                {/* border overlay */}
                <div className={clsx("absolute inset-0 z-20 border-4 border-transparent border-solid", {
                  "group-hover:border-white transition-all duration-300": item.id !== typeOfProduct[typeOfProduct.length - 1].id
                })}></div>
              </div>
            );
          })
        }
      </div>

      {/* click add to cart */}
      <Modal open={openModalAddToCart} close={handleCloseModalAddToCart}>
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

        <div className="mt-2">Thành tiền: 156$</div>

        <div className="flex justify-end">
          <Button variant={"primary"}>Add to Cart</Button>
          <Button variant={"primary"} onClick={handleCloseModalAddToCart}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Home;
