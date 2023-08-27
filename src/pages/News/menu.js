
import { EarthIcon, UserIcon } from "../../components/Icons";
import Image from "../../components/Image";
function Menu() {
        const Sidebar_Data = [{
                id: 1,
                title: 'Tin Nổi Bật',
                iteam: [{
                        idIteam: 1,
                        name: 'Yêu thích',
                        Icon: <EarthIcon className='h-2' />

                },
                {
                        idIteam: 1,
                        name: 'Lượt đọc',
                        Icon: <EarthIcon className='h-2' />

                }
                ]
        }]
        return (
                <div className="w-[1300px] bg-purple-500 relative h-[1250px]  ">
                        {/* BREAKING New */}
                        <div className="w-full bg-yellow-300 h-[40px] flex ">
                                <div className=" w-[150px]  text-white bg-green-500 text-center p-2 ">
                                        BREAKING NEW
                                </div>
                                <div>
                                        jsjajs
                                </div>
                        </div>
                        <div className="bg-green-400 flex h-[400px] mt-5 ">

                                {/* <!-- First Block --> */}
                                <div className=" w-1/2 bg-blue-500 ">
                                        <p className="text-white">Large Block</p>
                                        
                                </div>
                                {/*<!-- Second Block --> */}
                                <div className="w-1/2 h-full  bg-gray-300 flex flex-col">
                                        <div className="flex h-1/2  ">
                                                <div className="w-1/2 bg-green-300 flex items-center justify-center  ">
                                                        <p >Small Block 1</p>
                                                </div>
                                                <div className="w-1/2 bg-yellow-300 flex items-center justify-center ">
                                                        <p>Small Block 2</p>
                                                </div>
                                        </div>
                                        <div className="flex h-1/2">
                                                <div className="w-1/2 bg-red-300 flex items-center justify-center">
                                                        <p>Small Block 3</p>
                                                </div>
                                                <div className="w-1/2 bg-purple-300 flex items-center justify-center">
                                                        <p>Small Block 4</p>
                                                </div>
                                        </div>
                                </div>
                        </div>
                        {/* Don't Miss */}
                        <div className="w-[1300px] h-[300px] mt-16 bg-slate-800">

                                <div className=" w-[180px]  text-black bg-green-300 text-center p-2 font-extrabold text-2xl">
                                        <a> DON'T MISS</a>
                                </div>
                                <div className=" w-full h-80 mt-6  text-black bg-green-100  p-2 font-extrabold text-2xl flex ">
                                        <div className="w-1/4 h-full bg-red-100 mr-5">
                                                block1
                                        </div>
                                        <div className="w-1/4 h-full bg-red-200 mr-5">
                                                block2
                                        </div>
                                        <div className="w-1/4 h-full bg-red-300 mr-5">
                                                block3
                                        </div>
                                        <div className="w-1/4 h-full bg-red-400 mr-5">
                                                block4
                                        </div>

                                </div>



                        </div>
                </div>









        );
}

export default Menu;