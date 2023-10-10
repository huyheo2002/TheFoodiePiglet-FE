import Button from "../../components/Button";
import Heading from "../../components/Heading";
import ItemCompact from "../../components/ItemCompact";
import WindowScrollTop from "../../utils/windowScroll";
import * as cartServices from "../../services/cartServices";
import * as productServices from "../../services/productServices";
import { useContext, useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import Image from "../../components/Image";
import cartEmpty from "../../assets/images/Base/cart-empty.png";
import GlobalContext from "../../contexts/globalContext";
import { useDispatch } from "react-redux";
import { handleRefreshCartRedux } from "../../redux/actions/cartAction";

function Cart() {
  const dispatch = useDispatch();
  const [listItemInCart, setListItemInCart] = useState([]);
  const [valueUserLocal, setValueUserLocal] = useLocalStorage("dataUser", "");

  const fetchListItemInCart = async () => {
    if (valueUserLocal) {
      const responCart = await cartServices.getAllCartItemOfUser(valueUserLocal.dataUser.user.id);
      const responProducts = await productServices.getAllProductCompact() ?? null;

      if (responCart && responProducts) {
        const dataListItemCart = responCart.listItem ?? [];
        const dataListItemProduct = responProducts.products ?? [];
        console.log("10/10/2023 dataListItemCart 1", dataListItemCart)

        // handleListProductOfUserInCart
        const handleListProductOfUserInCart = (Array.isArray(dataListItemCart) && dataListItemCart.length > 0) ? dataListItemCart.reduce((filtered, product, index) => {
          let filterListItemInCart = dataListItemCart.filter((item) => product.prodId === item.prodId);
          console.log("10/10/2023 dataListItemCart 2", dataListItemCart)
          console.log("10/10/2023 filterListItemInCart", filterListItemInCart)
          if (filterListItemInCart.length > 0) {
            filterListItemInCart.map((itemProductInCart, index) => {
              let filterListProduct = dataListItemProduct.filter((item) => item.id === itemProductInCart.prodId);
              console.log("10/10/2023 filterListProduct", filterListProduct)
              
              if (filterListProduct.length > 0) {
                itemProductInCart.name = filterListProduct[0].name;
                itemProductInCart.image = filterListProduct[0].image;
                itemProductInCart.Variants = filterListProduct[0].Variants
                if (filterListProduct[0].Variants) {
                  let filterVariants = filterListProduct[0].Variants.filter((variant) => variant.name === product.size);
                  console.log("10/10/2023 filterVariants", filterVariants)

                  if (filterVariants.length > 0) {
                    itemProductInCart.originalPrice = filterVariants[0].price;
                    itemProductInCart.discount = filterVariants[0].discountVariant;
                  }
                }

                filtered.push(itemProductInCart)
              }
            })
          }

          return [...new Set(filtered)];
        }, []) : [];

        if (Array.isArray(handleListProductOfUserInCart)) {
          setListItemInCart(handleListProductOfUserInCart);
        }
      }
    }
  }

  const handleReloadItemInCart = () => {    
    setListItemInCart([]);
    fetchListItemInCart();
  }

  useEffect(() => {
    fetchListItemInCart();
  }, []);

  const handleRefreshCart = () => {
    if (valueUserLocal) {
      dispatch(handleRefreshCartRedux(valueUserLocal.dataUser.user.id));
      setListItemInCart([]);
    } else {
      alert("Bạn phải đăng nhập để sử dụng chức năng này");
    }
  }

  console.log("render ác");


  return (
    <div className="flex flex-col items-center justify-center container">
      <Heading line variant={"primary"}>
        Giỏ hàng
      </Heading>
      <div className="w-full flex flex-row flex-wrap justify-center mb-6">
        {listItemInCart.length > 0 ? listItemInCart.map((item, index) => {
          console.log("2023 10 10 hello tôi là ", item);
          return <ItemCompact key={index} size={"oneItems-onRows"} type={"cart"} data={item} onHandleRefreshCart={handleReloadItemInCart} />
        })
          :
          <div className="flex flex-col items-center">
            <Image src={cartEmpty} className={"!w-[400px] rounded-lg"} />
            <h3 className="text-white font-semibold text-xl my-4">Giỏ hàng của bạn đang trống.</h3>
            <p className="text-gray-400 font-semibold text-base text-center">
              Có vẻ như bạn chưa thêm bất cứ thứ gì vào giỏ hàng của mình.
              <br />
              Hãy tiếp tục và khám phá các sản phẩm của chúng tôi.
            </p>
            <div className="flex mt-6 justify-center">
              <Button variant={"primary"} to={"/"} onClick={() => WindowScrollTop()}>
                Trang Chủ
              </Button>
              <Button variant={"primary"} to={"/menu"} onClick={() => WindowScrollTop()}>
                Mua sắm ngay
              </Button>
            </div>
          </div>
        }
      </div>

      {listItemInCart.length > 0 &&
        <div className="w-full my-8 bg-[#1e1e1e] shadow-black-b-0.75 border-2 rounded-lg border-rgba-white-0.1">
          <div className="flex justify-between items-center px-6 py-6">
            <h2 className="text-xl font-semibold text-white">
              Tổng cộng: {`${listItemInCart.reduce((total, item) => total + item.currentPrice, 0)}$`}
            </h2>
            <div className="flex">
              <Button variant={"success"}
                onClick={() => handleRefreshCart()}
              >Làm mới giỏ hàng</Button>
              <Button variant={"success"} to={"/menu"} onClick={() => WindowScrollTop()}>Mua tiếp</Button>
              <Button variant={"success"}>Thanh toán trực tiếp</Button>
              <Button variant={"success"}>Thanh toán online</Button>
            </div>
          </div>
        </div>
      }

    </div>
  );
}

export default Cart;
