import Image from "../../components/Image";
import chef1 from "../../assets/images/aboutus/chef1.jpg";
import chef2 from "../../assets/images/aboutus/chef2.jpg";
import chef3 from "../../assets/images/aboutus/chef3.jpg";


function AboutUs() {
    return (
        <div className="my-8">
            <section className="py-12 bg-black rounded-ss-xl rounded-se-xl">
                <div className="container mx-auto p-4">
                    <h2 className="text-3xl font-semibold mb-6 text-white text-center">Giới Thiệu Về Chúng Tôi</h2>
                    <p className="text-gray-300">
                        The Foodie Piglet là một nhà hàng sang trọng và độc đáo tọa lạc tại vị trí cổ điển và thần bí.
                        Chúng tôi tự hào mang đến cho bạn trải nghiệm ẩm thực đỉnh cao với sự kết hợp tài tình giữa hương vị Châu Á và sự sáng tạo độc đáo từ các loại thịt lợn.
                        <br />
                        <br />
                        Chúng tôi khám phá và khai phá vô số hương vị thú vị từ châu Á và trình bày chúng theo cách độc đáo và tinh tế nhất.
                        Đội ngũ đầu bếp chuyên nghiệp và đam mê của chúng tôi luôn tạo ra những món ăn ngon mắt và đầy sáng tạo.
                        <br />
                        <br />
                        Không gian của nhà hàng The Foodie Piglet thể hiện sự sang trọng và ấm cúng, là nơi lý tưởng để bạn tận hưởng bữa tối thú vị cùng gia đình và bạn bè.
                        Chúng tôi cam kết mang đến cho bạn một trải nghiệm ẩm thực đáng nhớ.
                        <br />
                        <br />
                        Hãy đến và khám phá những hương vị mới mẻ và độc đáo tại The Foodie Piglet - nơi ẩm thực trở thành nghệ thuật.
                    </p>
                </div>
            </section>

            <section className="py-12 bg-primary-hover">
                <div className="container mx-auto p-4">
                    <h2 className="text-3xl font-semibold mb-6 text-white text-center">Đội Ngũ Đầu Bếp</h2>
                    <p className="text-gray-100">
                        Tại The Foodie Piglet, chúng tôi tự hào có một đội ngũ đầu bếp tài năng và đam mê. Họ là những nghệ nhân trong việc chế biến các món ăn chất lượng và độc đáo, sáng tạo từ những nguyên liệu tươi ngon nhất.
                        <br />
                        <br />
                        Đầu bếp chúng tôi không chỉ là những đầu bếp thông thạo, mà họ còn là những nghệ sĩ đam mê về ẩm thực. Họ luôn tìm kiếm và sáng tạo những hương vị mới, đưa những ý tưởng độc đáo vào từng món ăn, và luôn đảm bảo rằng bạn sẽ có trải nghiệm ẩm thực không giống ai.
                        <br />
                        <br />
                        Hãy cùng chúng tôi khám phá tài năng và sự đam mê của đội ngũ đầu bếp tại The Foodie Piglet, nơi ẩm thực trở thành nghệ thuật.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                        <div className="flex flex-col justify-center items-center">
                            <Image src={chef1} alt="Chef 1" className="rounded-full w-44 h-44 mx-auto mb-2" />
                            <h3 className="text-white mb-2 font-semibold text-2xl">Đầu Bếp Trưởng</h3>
                            <p className="text-white text-lg">Chuyên gia về món ăn châu Á.</p>
                        </div>

                        <div className="flex flex-col justify-center items-center">
                            <Image src={chef2} alt="Chef 2" className="rounded-full w-44 h-44 mx-auto mb-2" />
                            <h3 className="text-white mb-2 font-semibold text-2xl">Đầu Bếp Sáng Tạo</h3>
                            <p className="text-white text-lg">Nghệ sĩ đam mê về ẩm thực.</p>
                        </div>

                        <div className="flex flex-col justify-center items-center">
                            <Image src={chef3} alt="Chef 3" className="rounded-full w-44 h-44 mx-auto mb-2" />
                            <h3 className="text-white mb-2 font-semibold text-2xl">Đầu Bếp Pha Chế</h3>
                            <p className="text-white text-lg">Chuyên gia về đồ uống độc đáo.</p>
                        </div>
                    </div>
                </div>
            </section>


            <section className="py-12 bg-white rounded-ee-xl rounded-es-xl">
                <div className="container mx-auto p-4">
                    <h2 className="text-3xl font-semibold mb-6 text-black text-center">Tôn Chỉ về Chất Lượng Thực Phẩm và Dịch Vụ</h2>
                    <p className="text-gray-700">
                        Tại The Foodie Piglet, chất lượng thực phẩm và dịch vụ là trái tim của mọi gì chúng tôi làm.
                        Chúng tôi cam kết mang đến trải nghiệm ẩm thực xuất sắc, nơi mọi chi tiết được chăm sóc đặc biệt và không bao giờ bị lơ là.
                        <br/>
                        <br/>
                        Chúng tôi lựa chọn những nguyên liệu tươi ngon và chất lượng cao để tạo ra những món ăn độc đáo và ngon mắt.
                        Đội ngũ đầu bếp của chúng tôi không ngừng sáng tạo và hoàn thiện từng món ăn để đáp ứng sự mong đợi của khách hàng.
                        <br/>
                        <br/>
                        Khách hàng là ưu tiên hàng đầu của chúng tôi, và chúng tôi không ngừng nâng cao chất lượng dịch vụ để đảm bảo bạn có trải nghiệm tuyệt vời.
                        Chúng tôi luôn lắng nghe và học hỏi để mang đến những cải tiến liên tục.
                        <br/>
                        <br/>
                        Hãy đến và cảm nhận sự khác biệt tại The Foodie Piglet, nơi chất lượng thực phẩm và dịch vụ không chỉ là cam kết mà là sứ mệnh của chúng tôi.
                    </p>
                </div>
            </section>

        </div>
    );
}

export default AboutUs;