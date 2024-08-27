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
import Modal from "../../components/Modal";
import InputField from "../../components/FormControl/InputField";
import DatePicker from "../../components/FormControl/datePicker";
import TextareaField from "../../components/FormControl/textAreaField";
import * as paymentServices from "../../services/paymentServices";
import imgShipper from "../../assets/images/Base/shipper_01.png";
import Paypal from "../../components/Paypal";
import Congrat from "../../components/Congrat";
import * as commonServices from "../../services/commonServices";
import toast from "react-hot-toast";
import { TBUTTON_VARIANT } from "../../types/button";
import { useAuth } from "../../contexts/authContext";


function Cart() {
  const dispatch = useDispatch();
  const { setReloadCart, paymentOnlineSuccess, setPaymentOnlineSuccess, showCongrat } = useContext(GlobalContext);
  const [listItemInCart, setListItemInCart] = useState([]);
  const { dataUser } = useAuth();

  const handleProducts = async () => {
    if (dataUser) {
      const responCart = await cartServices.getAllCartItemOfUser(dataUser.user.id);
      const responProducts = await productServices.getAllProductCompact() ?? null;

      if (responCart && responProducts) {
        const dataListItemCart = responCart.listItem ?? [];
        const dataListItemProduct = responProducts.products ?? [];
        const handleListProductOfUserInCart = (Array.isArray(dataListItemCart) && dataListItemCart.length > 0) ? dataListItemCart.reduce((filtered, product, index) => {
          let filterListItemInCart = dataListItemCart.filter((item) => product.prodId === item.prodId);
          if (filterListItemInCart.length > 0) {
            filterListItemInCart.map((itemProductInCart, index) => {
              let filterListProduct = dataListItemProduct.filter((item) => item.id === itemProductInCart.prodId);

              if (filterListProduct.length > 0) {
                itemProductInCart.name = filterListProduct[0].name;
                itemProductInCart.image = filterListProduct[0].image;
                itemProductInCart.Variants = filterListProduct[0].Variants
                if (filterListProduct[0].Variants) {
                  let filterVariants = filterListProduct[0].Variants.filter((variant) => variant.name === product.size);
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

        if (handleListProductOfUserInCart.length > 0) {
          setReloadCart(true);
        } else {
          setReloadCart(false);
        }
      }
    }
  };

  useEffect(() => {
    handleProducts();
  }, [])

  // orders
  const [openModalOrders, setOpenModalOrders] = useState(false);
  const [openModalOrdersSuccess, setOpenModalOrdersSuccess] = useState(false);
  const [values, setValues] = useState({
    totalPrice: "",
    deliveryAddress: "",
    contactInfo: "",
    note: "",
  });

  const [openModalPaymentOnline, setOpenModalPaymentOnline] = useState(false);

  const inputs = [
    // {
    //   id: 1,
    //   name: "paymentDate",
    //   type: "date",
    //   placeholder: "Choose date",
    //   label: "Payment Date",
    //   // required: true,
    // },
    {
      id: 1,
      name: "totalPrice",
      type: "text",
      placeholder: "You can't press :v",
      label: "Total Price",
      required: true,
    },
    // {
    //   id: 3,
    //   name: "discountCode",
    //   type: "text",
    //   placeholder: "Enter your discount code",
    //   label: "Discount Code",
    //   // required: true,
    // },    
    {
      id: 2,
      name: "deliveryAddress",
      type: "text",
      placeholder: "Enter your Delivery Address",
      label: "Delivery Address",
      required: true,
    },
    {
      id: 3,
      name: "contactInfo",
      type: "text",
      placeholder: "Enter your contact infomation",
      label: "Contact",
      required: true,
    },
    {
      id: 4,
      name: "note",
      type: "text",
      placeholder: "You can add notes here",
      label: "Note",
      // required: true,
    }
  ];

  const fetchListItemInCart = async () => {
    if (dataUser) {
      const responCart = await cartServices.getAllCartItemOfUser(dataUser.user.id);
      const responProducts = await productServices.getAllProductCompact() ?? null;

      if (responCart && responProducts) {
        const dataListItemCart = responCart.listItem ?? [];
        const dataListItemProduct = responProducts.products ?? [];
        const handleListProductOfUserInCart = (Array.isArray(dataListItemCart) && dataListItemCart.length > 0) ? dataListItemCart.reduce((filtered, product, index) => {
          let filterListItemInCart = dataListItemCart.filter((item) => product.prodId === item.prodId);
          if (filterListItemInCart.length > 0) {
            filterListItemInCart.map((itemProductInCart, index) => {
              let filterListProduct = dataListItemProduct.filter((item) => item.id === itemProductInCart.prodId);
              if (filterListProduct.length > 0) {
                itemProductInCart.name = filterListProduct[0].name;
                itemProductInCart.image = filterListProduct[0].image;
                itemProductInCart.Variants = filterListProduct[0].Variants
                if (filterListProduct[0].Variants) {
                  let filterVariants = filterListProduct[0].Variants.filter((variant) => variant.name === product.size);

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

        if (handleListProductOfUserInCart.length > 0) {
          setReloadCart(true);
        } else {
          setReloadCart(false);
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
    if (dataUser) {
      dispatch(handleRefreshCartRedux(dataUser.user.id));
      setListItemInCart([]);
      setReloadCart(false);
    } else {
      toast.error("You need login to used this feature");
    }
  }

  // handle order  
  const onChangeInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleClearInput = (getKey) => {
    setValues({ ...values, [getKey]: "" });
  };

  const handleCloseModalOrders = () => {
    setOpenModalOrders(false);
  }

  const handleCloseModalOrdersSuccess = () => {
    setOpenModalOrdersSuccess(false);
  }

  const handleGetCurrentContact = () => {
    if (dataUser && values) {
      setValues({ ...values, contactInfo: `${dataUser.user.email}-${dataUser.user.phone}` })
    } else {
      return null;
    }
  }

  const handleOnSubmitBooking = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const dataEntry = Object.fromEntries(data.entries());
    const totalPriceNumber = dataEntry.totalPrice ? parseFloat(dataEntry.totalPrice.replace(/\$/g, "")) : 0;

    const getPurchasedItems = listItemInCart.length > 0 ? listItemInCart.reduce((result, item) => {
      let getDescItems = `name:${item.name}-size:${item.size}-quantity:${item.quantity}-price:${item.price};`;

      return result + getDescItems;
    }, "")
      :
      "";

    data.set("totalPrice", totalPriceNumber)
    data.set("userId", dataUser ? dataUser.user.id : null)
    data.set("purchasedItems", getPurchasedItems)

    try {
      const respon = await paymentServices.handleCreateNewOrder(data);
      if (respon && respon.errCode === 0) {
        setValues(
          {
            totalPrice: "",
            deliveryAddress: "",
            contactInfo: "",
            note: "",
          }
        );
        await cartServices.handleRefreshCart(dataUser.user.id).then(() => setListItemInCart([]));
        handleCloseModalOrders();

        setOpenModalOrdersSuccess(true);
        setReloadCart(false);
      } else if (respon.errCode === 1) {
        toast.error("Please check information again");
      }
    } catch (error) {
      console.error(error)
    }
  }

  // payment online
  const handleCloseModalPaymentOnline = () => {
    setOpenModalPaymentOnline(false);
    handleReloadItemInCart();
    setValues({
      totalPrice: "",
      deliveryAddress: "",
      contactInfo: "",
      note: "",
    })
  }

  const handleCloseModalPaymentOnlineSuccess = () => {
    setPaymentOnlineSuccess(false);
    handleRefreshCart();
  }

  useEffect(() => {
    if (paymentOnlineSuccess) {
      handleCloseModalPaymentOnline();
    }
  }, [paymentOnlineSuccess])

  return (
    <div className="flex flex-col items-center justify-center container overflow-hidden">
      <Heading line variant={"primary"}>
        Card
      </Heading>
      <div className="w-full flex flex-row flex-wrap justify-center mb-6">
        {listItemInCart.length > 0 ? listItemInCart.map((item, index) => {
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
              <Button variant={TBUTTON_VARIANT.PRIMARY} to={"/"} onClick={() => WindowScrollTop()}>
                Home
              </Button>
              <Button variant={TBUTTON_VARIANT.PRIMARY} to={"/menu"} onClick={() => WindowScrollTop()}>
                Order now
              </Button>
            </div>
          </div>
        }
      </div>

      {listItemInCart.length > 0 &&
        <div className="w-full my-8 bg-[#1e1e1e] shadow-black-b-0.75 border-2 rounded-lg border-rgba-white-0.1">
          <div className="flex justify-between items-center px-6 py-6">
            <h2 className="text-xl font-semibold text-white">
              Total: {`${Math.round(listItemInCart.reduce((total, item) => total + item.price, 0) * 100) / 100}$`}
            </h2>
            <div className="flex">
              <Button variant={TBUTTON_VARIANT.SUCCESS}
                onClick={() => handleRefreshCart()}
              >Refresh Card</Button>
              <Button variant={TBUTTON_VARIANT.SUCCESS} to={"/menu"} onClick={() => WindowScrollTop()}>Mua tiếp</Button>
              <Button variant={TBUTTON_VARIANT.SUCCESS}
                onClick={() => setOpenModalOrders(true)}
              >Order</Button>
              <Button variant={TBUTTON_VARIANT.SUCCESS}
                onClick={() => setOpenModalPaymentOnline(true)}
              >Pay now</Button>
            </div>
          </div>
        </div>
      }

      {/* order */}
      <Modal open={openModalOrders} close={handleCloseModalOrders}>
        <form autoComplete="off" onSubmit={handleOnSubmitBooking}>
          <Heading variant={"primary"}>Đặt hàng</Heading>
          <div className="flex flex-wrap justify-between">
            {inputs.map((item, index) => {
              const getTotalPrice = `${Math.round(listItemInCart.reduce((total, item) => total + item.price, 0) * 100) / 100}$`;
              // console.log("item.name", item.name)
              // if (item.type === "date") {
              //   return <DatePicker
              //     key={index}
              //     className={"!w-2/5 mx-8"}
              //     value={selectedDate}
              //     onChange={handleDateChange}
              //     minDate={currentDateStr}
              //     {...item}
              //   />
              // }

              if (item.name === "note") {
                return <TextareaField
                  key={index}
                  className={"!w-full mx-8"}
                  value={values[item.name]}
                  onChange={onChangeInput}
                  onClick={() => { }}
                  clear={() => handleClearInput(item.name)}
                  {...item}
                />
              }

              // totalPrice
              if (item.name === "totalPrice") {
                return <InputField
                  key={index}
                  className={"!w-2/5 mx-8"}
                  onChange={onChangeInput}
                  value={getTotalPrice}
                  onClick={() => { }}
                  clear={() => handleClearInput(item.name)}
                  onlyRead={"true"}
                  {...item}
                />
              }
              // console.log("values[item.name]", values[item.name])
              if (item.name === "contactInfo") {
                return <InputField
                  key={index}
                  className={"!w-full mx-8"}
                  value={values[item.name]}
                  onChange={onChangeInput}
                  onClick={() => { }}
                  autoFill={handleGetCurrentContact}
                  clear={() => handleClearInput(item.name)}
                  {...item}
                />
              }

              return <InputField
                key={index}
                className={"!w-2/5 mx-8"}
                value={values[item.name]}
                onChange={onChangeInput}
                onClick={() => { }}
                clear={() => handleClearInput(item.name)}
                {...item}
              />
            })}

            {/* table purchasedItems */}
            <div className="mt-6 mx-8 w-full">
              <h3 className="text-lg font-semibold mb-2">Chi tiết sản phẩm</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-2 border">Tên món ăn</th>
                    <th className="p-2 border">Số lượng</th>
                    <th className="p-2 border">Kích cỡ</th>
                    <th className="p-2 border">Giá</th>
                  </tr>
                </thead>
                <tbody>
                  {listItemInCart.length > 0 && listItemInCart.map((item, index) => {

                    return (
                      <tr key={index}>
                        <td className="p-2 border">{item.name}</td>
                        <td className="p-2 border">{item.quantity}</td>
                        <td className="p-2 border">{item.size}</td>
                        <td className="p-2 border">{`${item.price}$`}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end mt-3 w-full">
            <Button variant={TBUTTON_VARIANT.PRIMARY} onClick={() => { }}>Submit</Button>
            <Button variant={TBUTTON_VARIANT.PRIMARY} onClick={() => {
              setValues({
                totalPrice: "",
                deliveryAddress: "",
                contactInfo: "",
                note: "",
              });
              handleCloseModalOrders();
            }}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* order success */}
      <Modal open={openModalOrdersSuccess} custom close={handleCloseModalOrdersSuccess}>
        <div className="flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <p className="text-lg font-semibold text-green-600">Thêm vào giỏ hàng thành công</p>
            </div>
            <Image src={imgShipper} className={"mx-auto mb-4 w-52 my-3"} />
            <div className="mt-4">
              <p className="text-gray-700 text-center">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.
                <br />
                Đơn hàng của bạn đang được xử lý. Vui lòng đợi trong ít phút.
              </p>
            </div>
            <div className="mt-6 flex justify-start">
              <Button variant={TBUTTON_VARIANT.PRIMARY} to={"/profile"}
                onClick={() => WindowScrollTop()}
              >Xem đơn hàng của bạn</Button>
              <Button variant={TBUTTON_VARIANT.PRIMARY} onClick={() => {
                handleCloseModalOrdersSuccess();
                WindowScrollTop();
              }}>Thoát</Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* payment online */}
      <Modal open={openModalPaymentOnline} close={handleCloseModalPaymentOnline}>
        <form autoComplete="off" onSubmit={() => { }}>
          <Heading variant={"primary"}>Thanh toán online</Heading>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-8 mb-4" role="alert">
            <strong className="font-bold mr-3">Chú ý!</strong>
            <span className="block sm:inline">Hãy nhập đầy đủ các dữ liệu trước khi thanh toán</span>
          </div>
          <div className="flex flex-wrap justify-between">
            {inputs.map((item, index) => {
              // console.log("item", item)
              const getTotalPrice = `${Math.round(listItemInCart.reduce((total, item) => total + item.price, 0) * 100) / 100}$`;

              if (item.name === "note") {
                return <TextareaField
                  key={index}
                  className={"!w-full mx-8"}
                  value={values[item.name]}
                  onChange={onChangeInput}
                  onClick={() => { }}
                  {...item}
                />
              }

              // totalPrice
              if (item.name === "totalPrice") {
                return <InputField
                  key={index}
                  className={"!w-2/5 mx-8"}
                  onChange={onChangeInput}
                  value={getTotalPrice}
                  onClick={() => { }}
                  clear={() => handleClearInput(item.name)}
                  onlyRead={"true"}
                  {...item}
                />
              }
              // console.log("values[item.name]", values[item.name])
              if (item.name === "contactInfo") {
                return <InputField
                  key={index}
                  className={"!w-full mx-8"}
                  value={values[item.name]}
                  onChange={onChangeInput}
                  onClick={() => { }}
                  autoFill={handleGetCurrentContact}
                  clear={() => handleClearInput(item.name)}
                  {...item}
                />
              }

              return <InputField
                key={index}
                className={"!w-2/5 mx-8"}
                value={values[item.name]}
                onChange={onChangeInput}
                onClick={() => { }}
                clear={() => handleClearInput(item.name)}
                {...item}
              />
            })}

            {/* table purchasedItems */}
            <div className="mt-6 mx-8 w-full">
              <h3 className="text-lg font-semibold mb-2">Chi tiết sản phẩm</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-2 border">Tên món ăn</th>
                    <th className="p-2 border">Số lượng</th>
                    <th className="p-2 border">Kích cỡ</th>
                    <th className="p-2 border">Giá</th>
                  </tr>
                </thead>
                <tbody>
                  {listItemInCart.length > 0 && listItemInCart.map((item, index) => {

                    return (
                      <tr key={index}>
                        <td className="p-2 border">{item.name}</td>
                        <td className="p-2 border">{item.quantity}</td>
                        <td className="p-2 border">{item.size}</td>
                        <td className="p-2 border">{`${item.price}$`}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {values.deliveryAddress !== "" && values.contactInfo !== "" &&
            <div className="mt-7">
              <Paypal
                totalPrice={listItemInCart.length > 0 ? Math.round(listItemInCart.reduce((total, item) => total + item.price, 0) * 100) / 100 : 0}
                payload={{
                  contactInfo: values?.contactInfo,
                  deliveryAddress: values?.deliveryAddress,
                  note: values && values.note && values.note,
                  purchasedItems: listItemInCart.length > 0 && listItemInCart.reduce((result, item) => {
                    let getDescItems = `name:${item.name}-size:${item.size}-quantity:${item.quantity}-price:${item.price};`;

                    return result + getDescItems;
                  }, ""),
                  userId: dataUser ? dataUser.user.id : null,
                  totalPrice: listItemInCart.length > 0 ? Math.round(listItemInCart.reduce((total, item) => total + item.price, 0) * 100) / 100 : 0,
                  paymentDate: new Date(),
                }}
              />
            </div>
          }
        </form>
      </Modal>

      <Modal open={paymentOnlineSuccess} custom close={handleCloseModalPaymentOnlineSuccess}>
        {showCongrat && <Congrat />}
        <div className="flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <p className="text-lg font-semibold text-green-600">Thanh toán thành công</p>
            </div>
            <Image src={imgShipper} className={"mx-auto mb-4 w-52 my-3"} />
            <div className="mt-4">
              <p className="text-gray-700 text-center">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.
                <br />
                Đơn hàng của bạn đang được xử lý. Vui lòng đợi trong ít phút.
              </p>
            </div>
            <div className="mt-6 flex justify-start">
              <Button variant={TBUTTON_VARIANT.PRIMARY} to={"/profile"}
                onClick={() => {
                  handleCloseModalPaymentOnlineSuccess();
                  WindowScrollTop()
                }}
              >Xem đơn hàng của bạn</Button>
              <Button variant={TBUTTON_VARIANT.PRIMARY} onClick={() => {
                handleCloseModalPaymentOnlineSuccess();
                WindowScrollTop();
              }}>Thoát</Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Cart;
