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

function Cart() {
  const dispatch = useDispatch();
  const { reloadCart, setReloadCart } = useContext(GlobalContext);
  const [listItemInCart, setListItemInCart] = useState([]);
  const [valueUserLocal, setValueUserLocal] = useLocalStorage("dataUser", "");

  // console.log("valueUserLocal", valueUserLocal)
  // orders
  const [openModalOrders, setOpenModalOrders] = useState(false);
  const [openModalOrdersSuccess, setOpenModalOrdersSuccess] = useState(false);
  const [values, setValues] = useState({
    totalPrice: "",
    deliveryAddress: "",
    contactInfo: "",
    note: "",
  });
  const [selectedDate, setSelectedDate] = useState(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
    const currentDay = String(currentDate.getDate()).padStart(2, "0");
    const currentDateStr = `${currentYear}-${currentMonth}-${currentDay}`;

    return currentDateStr;
  });

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
      id: 2,
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
      id: 3,
      name: "deliveryAddress",
      type: "text",
      placeholder: "Enter your Delivery Address",
      label: "Delivery Address",
      required: true,
    },
    {
      id: 4,
      name: "contactInfo",
      type: "text",
      placeholder: "Enter your contact infomation",
      label: "Contact",
      required: true,
    },
    {
      id: 5,
      name: "note",
      type: "text",
      placeholder: "You can add notes here",
      label: "Note",
      // required: true,
    }
  ];

  console.log("values in cart", values)
  // handle get current date
  // const minDate = "2023-10-03"
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
  const currentDay = String(currentDate.getDate()).padStart(2, "0");
  const currentDateStr = `${currentYear}-${currentMonth}-${currentDay}`;

  // console.log("reloadCart in cart", reloadCart)
  const fetchListItemInCart = async () => {
    if (valueUserLocal) {
      const responCart = await cartServices.getAllCartItemOfUser(valueUserLocal.dataUser.user.id);
      const responProducts = await productServices.getAllProductCompact() ?? null;

      if (responCart && responProducts) {
        const dataListItemCart = responCart.listItem ?? [];
        const dataListItemProduct = responProducts.products ?? [];
        // console.log("10/10/2023 dataListItemCart 1", dataListItemCart)

        // handleListProductOfUserInCart
        const handleListProductOfUserInCart = (Array.isArray(dataListItemCart) && dataListItemCart.length > 0) ? dataListItemCart.reduce((filtered, product, index) => {
          let filterListItemInCart = dataListItemCart.filter((item) => product.prodId === item.prodId);
          // console.log("10/10/2023 dataListItemCart 2", dataListItemCart)
          // console.log("10/10/2023 filterListItemInCart", filterListItemInCart)
          if (filterListItemInCart.length > 0) {
            filterListItemInCart.map((itemProductInCart, index) => {
              let filterListProduct = dataListItemProduct.filter((item) => item.id === itemProductInCart.prodId);
              // console.log("10/10/2023 filterListProduct", filterListProduct)

              if (filterListProduct.length > 0) {
                itemProductInCart.name = filterListProduct[0].name;
                itemProductInCart.image = filterListProduct[0].image;
                itemProductInCart.Variants = filterListProduct[0].Variants
                if (filterListProduct[0].Variants) {
                  let filterVariants = filterListProduct[0].Variants.filter((variant) => variant.name === product.size);
                  // console.log("10/10/2023 filterVariants", filterVariants)

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
    if (valueUserLocal) {
      dispatch(handleRefreshCartRedux(valueUserLocal.dataUser.user.id));
      setListItemInCart([]);
    } else {
      alert("Bạn phải đăng nhập để sử dụng chức năng này");
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
    if (valueUserLocal && values) {
      setValues({ ...values, contactInfo: `${valueUserLocal.dataUser.user.email}-${valueUserLocal.dataUser.user.phone}`})      
    } else {
      return null;
    }
  }

  const handleOnSubmitBooking = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const dataEntry = Object.fromEntries(data.entries());
    const totalPriceNumber = dataEntry.totalPrice ? parseFloat(dataEntry.totalPrice.replace(/\$/g, "")) : 0;

    // handle 
    const getPurchasedItems = listItemInCart.length > 0 ? listItemInCart.reduce((result, item) => {
      let getDescItems = `name:${item.name}-size:${item.size}-quantity:${item.quantity}-price:${item.price};`;

      return result + getDescItems;
    }, "")
      :
      "";

    console.log("getPurchasedItems", getPurchasedItems)

    data.set("totalPrice", totalPriceNumber)
    data.set("userId", valueUserLocal ? valueUserLocal.dataUser.user.id : null)
    data.set("purchasedItems", getPurchasedItems)

    console.log("data entry:", Object.fromEntries(data.entries()));

    try {
      const respon = await paymentServices.handleCreateNewOrder(data);
      if (respon && respon.errCode === 0) {
        // delayCloseModalOrders();
        // reset data

        setValues(
          {
            totalPrice: "",
            deliveryAddress: "",
            contactInfo: "",
            note: "",
          }
        );        
        await cartServices.handleRefreshCart(valueUserLocal.dataUser.user.id).then(() => setListItemInCart([]));
        handleCloseModalOrders();

        // open modal order success
        setOpenModalOrdersSuccess(true);
        setReloadCart(false);
      } else if (respon.errCode === 1) {
        alert("Hãy kiếm tra lại thông tin")
      }
    } catch (error) {
      console.log("err", error)
    }
  }

  // console.log("listItemInCart", listItemInCart)

  return (
    <div className="flex flex-col items-center justify-center container">
      <Heading line variant={"primary"}>
        Giỏ hàng
      </Heading>
      <div className="w-full flex flex-row flex-wrap justify-center mb-6">
        {listItemInCart.length > 0 ? listItemInCart.map((item, index) => {
          // console.log("2023 10 10 hello tôi là ", item);
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
              Tổng cộng: {`${Math.round(listItemInCart.reduce((total, item) => total + item.price, 0) * 100) / 100}$`}
            </h2>
            <div className="flex">
              <Button variant={"success"}
                onClick={() => handleRefreshCart()}
              >Làm mới giỏ hàng</Button>
              <Button variant={"success"} to={"/menu"} onClick={() => WindowScrollTop()}>Mua tiếp</Button>
              <Button variant={"success"}
                onClick={() => setOpenModalOrders(true)}
              >Đặt hàng</Button>
              <Button variant={"success"}>Thanh toán online</Button>
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
            <Button variant={"primary"} onClick={() => { }}>Submit</Button>
            <Button variant={"primary"} onClick={() => {
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
              <Button variant={"primary"} to={"/profile"}
                onClick={() => WindowScrollTop()}
              >Xem đơn hàng của bạn</Button>
              <Button variant={"primary"} onClick={() => {
                handleCloseModalOrdersSuccess();
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
