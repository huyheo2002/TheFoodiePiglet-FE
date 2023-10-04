import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { CheckedShieldIcon, OutlineMinusIcon, OutlinePlusIcon, RefundIcon, StarFillIcon, StarHalfIcon, StarIcon, TrunkIcon } from "../../components/Icons";
import Image from "../../components/Image";
import InputRadio from "../../components/FormControl/inputRadio";
import * as variantServices from "../../services/variantServices";
import * as productServices from "../../services/productServices";
import { useNavigate, useParams } from "react-router-dom";

function ProductDetail() {
    const params = useParams();
    const navigate = useNavigate();
    const [size, setSize] = useState("M");
    const [currentCount, setCurrentCount] = useState(1);
    const [currentPrice, setCurrentPrice] = useState(0);
    const [originalPrice, setOriginalPrice] = useState(0);
    const [currentPricePreview, setCurrentPricePreview] = useState(null);
    const [originalPricePreview, setOriginalPricePreview] = useState(null);
    const [discount, setDiscount] = useState(null);
    const [dataProduct, setDataProduct] = useState(null);
    console.log("dataProduct", dataProduct)

    const optionsSize = [
        { value: "S", label: "S" },
        { value: "M", label: "M" },
        { value: "L", label: "L" },
    ];

    // onhandle getdata
    const fetchApiVariantProduct = async (prodId) => {
        let respon = await variantServices.findVariantInProduct(prodId) ?? null;
        // console.log("respon variant in prod detail", respon)
        if (respon) {
            const dataProductSelected = respon.variant ?? [];
            let filterValue = dataProductSelected.length > 0 && dataProductSelected.filter((item) => item.name === size)
            // console.log("filterValue", filterValue)
            if (filterValue.length > 0) {
                setCurrentPrice(filterValue[0].currentPrice)
                setOriginalPrice(filterValue[0].originalPrice);

                if (filterValue[0].discountVariant === 0) {
                    setDiscount(null)
                } else {
                    setDiscount(filterValue[0].discountVariant)
                }
            } else {
                setCurrentPrice(0);
                setOriginalPrice(0);
                setDiscount(null);
            }
        }
    }

    const fetchApiProduct = async () => {
        let respon = await productServices.findOneProduct(params.prodId) ?? null;
        if(respon) {
            setDataProduct(respon.products)
        }
    }

    useEffect(() => {
        if (params && params.prodId) {
            fetchApiVariantProduct(params.prodId);
        }
    }, [params.prodId, size])

    useEffect(() => {
        fetchApiProduct();
    }, [])

    // onhandle count
    const onHandlePlusItem = (currentCount) => {
        setCurrentCount((currentCount += 1));
        setCurrentPricePreview(currentPrice * currentCount);
        setOriginalPricePreview(originalPrice * currentCount);
    };

    const onHandleMinusItem = (currentCount) => {
        if (currentCount <= 1) {

        } else {
            setCurrentCount((currentCount -= 1));
            setCurrentPricePreview(currentPrice * currentCount);
            setOriginalPricePreview(originalPrice * currentCount);
        }
    };

    // onhandle selected size
    const handleGetValueSize = (currentValue) => {
        setSize(currentValue);
        setCurrentCount(1);
        setCurrentPricePreview(null);
        setOriginalPricePreview(null);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-1 flex flex-col justify-center">
                        <Image src={dataProduct && dataProduct.image} alt="Product Image" className="rounded-lg shadow-md m-7" />
                    </div>
                    <div className="col-span-1 flex flex-col justify-center">
                        {/* name */}
                        <h1 className="text-2xl font-semibold mb-2">{dataProduct ? dataProduct.name : "Product Name"}</h1>
                        {/* rating */}
                        <span className="flex items-center my-3">
                            <StarFillIcon className="text-yellow-300" />
                            <StarFillIcon className="text-yellow-300" />
                            <StarFillIcon className="text-yellow-300" />
                            <StarFillIcon className="text-yellow-300" />
                            {/* <StarHalfIcon className="text-yellow-300" /> */}
                            <StarIcon className="text-yellow-300" />
                            <span className="text-xs ml-2 text-gray-400">20k reviews</span>
                        </span>

                        {/* selected size */}
                        <InputRadio
                            key={Math.floor(Math.random() * 10)}
                            id={Math.floor(Math.random() * 10)}
                            name="size"
                            type="radio"
                            label="Size"
                            checked={size !== -1 ? size : "M"}
                            edit
                            row
                            options={optionsSize}
                            onChange={handleGetValueSize}
                        />

                        {/* selected count */}
                        <div className="flex items-center my-4 select-none">
                            <h2 className="capitalize block text-base font-medium text-black tracking-wider mt-3 mb-2 mr-4">Count: </h2>
                            <div className="inline-flex w-32 items-center text-black border-2 border-black rounded-lg overflow-hidden">
                                <OutlineMinusIcon
                                    className={
                                        "!w-9 !h-9 p-2 flex-grow-0 transition-all hover:bg-black hover:text-primary cursor-pointer"
                                    }
                                    onClick={() => onHandleMinusItem(currentCount)}
                                />
                                <span className="px-4 flex-grow text-center cursor-default">
                                    {currentCount}
                                </span>
                                <OutlinePlusIcon
                                    className={
                                        "!w-9 !h-9 p-2 flex-grow-0 transition-all hover:bg-black hover:text-primary cursor-pointer"
                                    }
                                    onClick={() => onHandlePlusItem(currentCount)}
                                />
                            </div>
                        </div>

                        {/* price */}
                        <div className="flex items-center gap-4 my-3">
                            <span className="flex justify-start items-center">
                                <p className="text-xl font-semibold text-black whitespace-nowrap">Thành tiền: {currentPricePreview ?? currentPrice}$</p>
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="flex justify-start items-center">
                                    <p className="text-lg line-through opacity-50 text-gray-500">{originalPricePreview ?? originalPrice}$</p>
                                </span>
                                {discount && <span className="productCompact__discountPercent ml-3">Save {discount}%</span>}
                            </div>
                        </div>

                        {/* desc */}
                        <p className="text-gray-600 text-sm mb-4 line-clamp-6">
                            {dataProduct ? dataProduct.desc :
                                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."                        
                            }
                        </p>

                        <div className="flex justify-center items-center mt-3 border-b-4 border-gray-400 mb-3 pb-3">
                            <div className="flex flex-col justify-center items-center mx-3">
                                <TrunkIcon className={"!w-10 !h-10 p-2 bg-gray-300 text-black rounded-full overflow-hidden"} />
                                <p className="text-sm text-black mt-2 font-semibold w-[150px] text-center">Free Delivery</p>
                            </div>
                            <div className="flex flex-col justify-center items-center mx-3">
                                <RefundIcon className={"!w-10 !h-10 p-2 bg-gray-300 text-black rounded-full overflow-hidden"} />
                                <p className="text-sm text-black mt-2 font-semibold w-[150px] text-center">Cancel for a refund</p>
                            </div>
                            <div className="flex flex-col justify-center items-center mx-3">
                                <TrunkIcon className={"!w-10 !h-10 p-2 bg-gray-300 text-black rounded-full overflow-hidden"} />
                                <p className="text-sm text-black mt-2 font-semibold w-[150px] text-center">Huy Delivery</p>
                            </div>
                            <div className="flex flex-col justify-center items-center mx-3">
                                <CheckedShieldIcon className={"!w-10 !h-10 p-2 bg-gray-300 text-black rounded-full overflow-hidden"} />
                                <p className="text-sm text-black mt-2 font-semibold w-[150px] text-center">Certified clean international food</p>
                            </div>
                        </div>

                        <div className="flex space-x-4 mb-4">
                            <Button variant={"primary"}>Add to Cart</Button>
                            <Button variant={"primary"}
                                onClick={() => navigate(-1)}
                            >Back</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;