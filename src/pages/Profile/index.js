import Button from "../../components/Button";
import ItemCompact from "../../components/ItemCompact";
import Heading from "../../components/Heading";

function Profile() {
    return (
        <div className="min-h-screen bg-transparent py-4">
            <div className="relative py-3 w-full">
                <div className="bg-gray-900 shadow-black-rb-0.75 rounded-lg border-rgba-white-0.1 border-solid border-[3px] mx-3 my-4 p-3 overflow-hidden select-none transition-all duration-300 cursor-pointer hover:border-white">
                    <div className="max-w-md">
                        <div className="flex items-center space-x-5">
                            <div className="h-14 w-14 bg-blue-500 rounded-full flex flex-shrink-0 justify-center items-center text-white text-2xl font-mono">U</div>
                            <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                                <h2 className="leading-relaxed">John Doe</h2>
                                <p className="text-sm text-gray-500 font-normal leading-relaxed">Web Developer</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Button variant={"primary"}>Thay đổi thông tin</Button>
                            <Button variant={"primary"}>Quên mật khẩu</Button>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <p>Thông tin cá nhân:</p>
                                <div className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                                    <span>Email: john@example.com</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                    </svg>
                                    <span>Số điện thoại: (123) 456-7890</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative w-full">
                <div className="relative px-4 mx-8 shadow rounded-3xl">
                    <Heading line>Món ăn yêu thích</Heading>
                    <div className="flex flex-row flex-wrap">
                        <ItemCompact size={"threeItems-onRows"} />
                        <ItemCompact size={"threeItems-onRows"} />
                        <ItemCompact size={"threeItems-onRows"} />
                        <ItemCompact size={"threeItems-onRows"} />
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