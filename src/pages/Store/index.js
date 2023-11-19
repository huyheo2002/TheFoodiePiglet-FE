import Heading from "../../components/Heading";
import store1 from "../../assets/images/store/store-1.jpg";
import store2 from "../../assets/images/store/store-2.jpg";
import store3 from "../../assets/images/store/store-3.jpg";
import store4 from "../../assets/images/store/store-4.jpg";
import store5 from "../../assets/images/store/store-5.jpg";
import store6 from "../../assets/images/store/store-6.jpg";
import Image from "../../components/Image";


function Store() {
    return (
        <div>
            <section className="py-12">
                <div className="container mx-auto">
                    <Heading variant={"primary"} line>Đến thăm chúng tôi</Heading>
                    <div className="embed-responsive aspect-ratio-16/9 w-full h-[450px]">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.9606834806636!2d144.9632703156747!3d-37.814169842594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642f15b61d8eb%3A0x7e2fb2e4b97f13ff!2sMelbourne%20Museum!5e0!3m2!1sen!2sau!4v1648835690409!5m2!1sen!2sau" allowfullscreen
                            className="w-full h-full"
                            title="google map"
                        ></iframe>
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto">
                    <Heading variant={"primary"} line>Không Gian Nhà Hàng</Heading>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <Image src={store1} className="w-full h-56 object-cover" />
                        </div>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <Image src={store2} className="w-full h-56 object-cover" />
                        </div>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <Image src={store3} className="w-full h-56 object-cover" />
                        </div>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <Image src={store4} className="w-full h-56 object-cover" />
                        </div>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <Image src={store5} className="w-full h-56 object-cover" />
                        </div>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <Image src={store6} className="w-full h-56 object-cover" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Store;