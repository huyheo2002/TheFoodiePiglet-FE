import Heading from "../../components/Heading";
import form from "../../assets/images/Base/form.png";
import Button from "../../components/Button";
import WindowScrollTop from "../../utils/windowScroll";
import Image from "../../components/Image";
import slider from "../../assets/images/introduce/slider.jpg";
import intro1 from "../../assets/images/introduce/intro-1.jpg";
import intro2 from "../../assets/images/introduce/intro-2.jpg";
import intro3 from "../../assets/images/introduce/intro-3.jpg";
import intro4 from "../../assets/images/introduce/intro-4.jpg";
import intro5 from "../../assets/images/introduce/intro-5.jpg";
import { TBUTTON_VARIANT } from "../../types/button";

function Introduce() {
    return (
        <div className="container mx-auto p-4 text-white">
            <section
                id="intro"
                className="bg-cover bg-center bg-fixed h-screen flex flex-col justify-center items-center text-white relative"
                style={{
                    background: `url(${slider})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex flex-col justify-center items-center">
                    <h1 className="text-5xl font-extrabold mb-4 text-center tracking-wide leading-[64px]"
                        style={{ textShadow: '12px 8px 4px rgba(0, 0, 0, 0.5)' }}
                    >
                        Welcome to ours restaurant
                        <br />
                        The Foodie Piglet
                    </h1>
                    <p className="text-3xl">Discover unique flavors from Asia</p>
                    <div className="mt-3">
                        <Button variant={TBUTTON_VARIANT.PRIMARY} to={"/menu"}
                            onClick={() => WindowScrollTop()}
                        >See menu</Button>
                    </div>
                </div>
            </section>

            <div className="my-6">
                <Heading variant={"primary"} line>
                    Introduce about ours Restaurant
                </Heading>

                <div className="h-[500px] w-full relative overflow-hidden my-8">
                    <div className="absolute z-50 top-0 left-0 h-[400px] w-[450px] p-[35px] overflow-hidden"
                        style={{
                            background: `url(${form})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="text-[#654f42] font-semibold text-2xl text-left">Restaurant infomation</div>
                        <ul>
                            <li className="text-[#78604b] font-medium text-base">Address: Ba dinh, Hanoi </li>
                            <li className="text-[#78604b] font-medium text-base">Phone number: 1506 2002</li>
                            <li className="text-[#78604b] font-medium text-base">Contact us vie email: huy12@support.com</li>
                        </ul>
                        <div className="bg-[#654f42] w-full h-[2px] my-2"></div>

                        <div className="text-[#654f42] font-semibold text-2xl text-left">Characteristic outstanding</div>
                        <ul>
                            <li className="text-[#78604b] font-medium text-base">Specializing in unique pork dí</li>
                            <li className="text-[#78604b] font-medium text-base">Team chef have talent and enthuse</li>
                            <li className="text-[#78604b] font-medium text-base">Products quality to prioritize the first</li>
                        </ul>
                    </div>
                    <div className="absolute z-40 right-0 bottom-0 top-[15%] left-[15%] rounded-lg overflow-hidden pr-[15px]">
                        <Image src={intro1} className={"w-full h-full"} />
                    </div>
                </div>
                <div className="h-[500px] w-full relative overflow-hidden my-8">
                    {/* desc */}
                    <div className="absolute z-50 top-0 right-0 h-[400px] w-[450px] p-[35px] overflow-hidden"
                        style={{
                            background: `url(${form})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="text-[#654f42] font-semibold text-2xl text-left">Team Chef of The Foodie Piglet</div>
                        <ul>
                            <li className="text-[#78604b] font-medium text-base">At The Foodie Piglet, chúng tôi tự hào có một đội ngũ đầu bếp tài năng và đam mê.</li>
                            <li className="text-[#78604b] font-medium text-base">Với nhiều năm kinh nghiệm và sự chuyên nghiệp trong việc chế biến các món ăn, họ đã biến những nguyên liệu tươi ngon thành các tác phẩm nghệ thuật ẩm thực.</li>
                            <li className="text-[#78604b] font-medium text-base">Chúng tôi tận hưởng việc nấu ăn và hy vọng rằng bạn cũng sẽ tận hưởng mỗi bữa ăn tại The Foodie Piglet.</li>
                        </ul>
                    </div>
                    F
                    {/* image */}
                    <div className="absolute z-40 left-0 bottom-0 top-[15%] right-[15%] rounded-lg overflow-hidden pl-[15px]">
                        <Image src={intro2} className={"w-full h-full"} />
                    </div>
                </div>

                {/* khong gian nhà hàng */}
                <div className="h-[500px] w-full relative overflow-hidden my-8">
                    {/* desc */}
                    <div className="absolute z-50 top-0 left-0 h-[400px] w-[450px] p-[35px] overflow-hidden"
                        style={{
                            background: `url(${form})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="text-[#654f42] font-semibold text-2xl text-left">Không gian nhà hàng</div>
                        <ul>
                            <li className="text-[#78604b] font-medium text-base">The Foodie Piglet tự hào về không gian độc đáo và thiết kế tinh tế. Nhà hàng được trang trí với sự tôn trọng đối với chi tiết và sự chăm sóc đến từng góc nhỏ.</li>
                            <li className="text-[#78604b] font-medium text-base">Với ánh sáng ấm áp và không gian thoải mái, bạn sẽ tận hưởng bữa ăn trong một môi trường lịch lãm và sang trọng. </li>
                            <li className="text-[#78604b] font-medium text-base">Không gian của chúng tôi đem đến trải nghiệm ẩm thực đáng nhớ cho mọi dịp.</li>
                        </ul>
                    </div>

                    {/* image */}
                    <div className="absolute z-40 right-0 bottom-0 top-[15%] left-[15%] rounded-lg overflow-hidden pr-[15px]">
                        <Image src={intro3} className={"w-full h-full"} />
                    </div>
                </div>

                {/* nhận xét đánh giá */}
                <div className="h-[500px] w-full relative overflow-hidden my-8">
                    {/* desc */}
                    <div className="absolute z-50 top-0 right-0 h-[400px] w-[450px] p-[35px] overflow-hidden"
                        style={{
                            background: `url(${form})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="text-[#654f42] font-semibold text-2xl text-left">Nhận xét và đánh giá của khách hàng</div>
                        <ul>
                            <li className="text-[#78604b] font-medium text-base">"Nhà hàng The Foodie Piglet là một trải nghiệm tuyệt vời. Chất lượng thực phẩm và dịch vụ rất ấn tượng. Tôi đã có một bữa tối đáng nhớ ở đây." - Ngọc Linh.</li>
                            <li className="text-[#78604b] font-medium text-base">"Nhà hàng này là một khoảnh khắc đáng nhớ trong cuộc sống. Mọi món ăn đều ngon và thơm ngon, và tôi không thể quên khẩu vị tuyệt vời từ đây." - Đức Việt.</li>
                        </ul>
                    </div>

                    {/* image */}
                    <div className="absolute z-40 left-0 bottom-0 top-[15%] right-[15%] rounded-lg overflow-hidden pl-[15px]">
                        <Image src={intro4} className={"w-full h-full"} />
                    </div>
                </div>

                {/* chứng nhận và giải thưởng */}
                <div className="h-[500px] w-full relative overflow-hidden my-8">
                    {/* desc */}
                    <div className="absolute z-50 top-0 left-0 h-[400px] w-[450px] p-[35px] overflow-hidden"
                        style={{
                            background: `url(${form})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="text-[#654f42] font-semibold text-2xl text-left">Chứng nhận và giải thưởng</div>
                        <ul>
                            <li className="text-[#78604b] font-medium text-base">Giải "Nhà hàng Chất Lượng Cao": Chúng tôi đã được công nhận bởi Hiệp hội Ẩm Thực quốc gia với giải thưởng danh giá cho việc cung cấp thực phẩm và dịch vụ xuất sắc.</li>
                            <li className="text-[#78604b] font-medium text-base">Chứng Nhận "Thực Đơn Đa Dạng": Thực đơn đa dạng và phong phú của chúng tôi đã được công nhận bởi Hiệp hội Ẩm Thực Quốc Tế.</li>
                            <li className="text-[#78604b] font-medium text-base">Giải "Nhà Hàng Yêu Thích Của Cộng Đồng": Chúng tôi tự hào là lựa chọn hàng đầu của cộng đồng địa phương trong nhiều năm qua.</li>
                        </ul>
                    </div>

                    {/* image */}
                    <div className="absolute z-40 right-0 bottom-0 top-[15%] left-[15%] rounded-lg overflow-hidden pr-[15px]">
                        <Image src={intro5} className={"w-full h-full"} />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Introduce;