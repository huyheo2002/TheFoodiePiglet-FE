import Button from "../../components/Button";
import ItemCompact from "../../components/ItemCompact";
import Heading from "../../components/Heading";
import Image from "../../components/Image";
import ava from "../../assets/images/logo-pig-smile.png";

function Profile() {
    return (
        <div className="min-h-screen bg-transparent py-4">
            <div className="relative py-3 w-full">
                <div className="bg-gray-900 shadow-black-rb-0.75 rounded-lg border-rgba-white-0.1 border-solid border-[3px] mx-3 my-4 p-3 overflow-hidden select-none transition-all duration-300 cursor-pointer hover:border-white">
                    <div className="w-full">
                        <div className="flex items-center space-x-5">
                            <div className="h-40 w-40 rounded-full flex flex-shrink-0 justify-center items-center text-white text-2xl font-mono overflow-hidden border-2 border-rgba-white-0.1">
                                <Image src={ava} />
                            </div>
                            <div className="block pl-2 font-semibold text-xl self-center text-gray-700">
                                <h2 className="leading-relaxed text-white font-semibold text-2xl">John Doe</h2>
                                <p className="text-sm font-normal leading-relaxed text-white">Web Developer</p>
                            </div>
                        </div>
                        <div className="mt-4 flex">
                            <Button variant={"primary"}>Thay đổi thông tin</Button>
                            <Button variant={"primary"}>Thông tin chi tiết</Button>
                            <Button variant={"primary"}>Quên mật khẩu</Button>
                        </div>                        
                    </div>
                </div>
            </div>

            <div className="relative w-full">
                <div className="relative px-4 mx-8 shadow rounded-3xl">
                    <Heading line>Món ăn yêu thích</Heading>
                    <div className="flex flex-row flex-wrap">
                        <ItemCompact size={"fourItems-onRows"} />
                        <ItemCompact size={"fourItems-onRows"} />
                        <ItemCompact size={"fourItems-onRows"} />
                        <ItemCompact size={"fourItems-onRows"} />
                    </div>

                    <Heading line>Đơn hàng đã mua</Heading>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h2 className="text-xl font-semibold">Đơn hàng 1</h2>
                            <p className="text-gray-600">Mô tả đơn hàng 1</p>
                            <p className="text-gray-600 mt-2">Ngày đặt hàng: 01/01/2023</p>
                            <p className="text-gray-600">Tổng tiền: $50.00</p>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow">
                            <h2 className="text-xl font-semibold">Đơn hàng 2</h2>
                            <p className="text-gray-600">Mô tả đơn hàng 2</p>
                            <p className="text-gray-600 mt-2">Ngày đặt hàng: 02/01/2023</p>
                            <p className="text-gray-600">Tổng tiền: $75.00</p>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow">
                            <h2 className="text-xl font-semibold">Đơn hàng 3</h2>
                            <p className="text-gray-600">Mô tả đơn hàng 3</p>
                            <p className="text-gray-600 mt-2">Ngày đặt hàng: 03/01/2023</p>
                            <p className="text-gray-600">Tổng tiền: $30.00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;