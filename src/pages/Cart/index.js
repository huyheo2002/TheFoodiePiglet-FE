import Button from "../../components/Button";
import Heading from "../../components/Heading";
import ItemCompact from "../../components/ItemCompact";
import WindowScrollTop from "../../utils/windowScroll";

function Cart() {
  return (
    <div className="container mx-auto mt-10">
      <Heading line variant={"primary"}>
        Giỏ hàng
      </Heading>
      <div className="flex flex-row flex-wrap">
        <ItemCompact size={"oneItems-onRows"} type={"cart"} />
        <ItemCompact size={"oneItems-onRows"} type={"cart"} />
        <ItemCompact size={"oneItems-onRows"} type={"cart"} />
        <ItemCompact size={"oneItems-onRows"} type={"cart"} />
        <ItemCompact size={"oneItems-onRows"} type={"cart"} />
        <ItemCompact size={"oneItems-onRows"} type={"cart"} />
      </div>

      <div className="my-8 bg-[#1e1e1e] shadow-black-b-0.75 border-2 rounded-lg border-rgba-white-0.1">
        <div className="flex justify-between items-center px-6 py-6">
          <h2 className="text-xl font-semibold text-white">
            Tổng cộng: $60.00
          </h2>
          <div className="flex">
            <Button variant={"success"}>Làm mới giỏ hàng</Button>
            <Button variant={"success"} to={"/menu"} onClick={() => WindowScrollTop()}>Mua tiếp</Button>
            <Button variant={"success"}>Thanh toán trực tiếp</Button>
            <Button variant={"success"}>Thanh toán online</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
