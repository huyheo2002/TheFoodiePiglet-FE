import Button from "../Button";
import { DollarIcon, HeartFillIcon, StarFillIcon, StarHalfIcon, StarIcon } from "../Icons";
import Image from "../Image";

function ItemCompact() {
    return (  
        <div className="productCompact group">
            <Image src="https://www.koreandxb.com/images/food1.jpg" effectScale/>
            <div className="p-5 flex flex-col gap-3">
                {/* badge */}
                <div className="flex items-center gap-2">
                    <span className="productCompact__badge">stock ready</span>
                    <span className="productCompact__badge">official store</span>
                </div>

                <h2 className="productCompact__title" title="Food Food Food Food Food Food Food Food Food Food">
                    Food Food Food Food Food Food Food Food Food Food
                </h2>

                <div>
                    <span className="flex justify-start items-center">
                        <p className="text-xl font-normal text-white">400$</p>
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="flex justify-start items-center">
                            <p className="text-xs line-through opacity-50 text-white">500$</p>
                        </span>
                        <span className="productCompact__discountPercent">
                            save 20%
                        </span>
                    </div>
                </div>

                {/* rating */}
                <span className="flex items-center mt-1">
                    <StarFillIcon className="text-yellow-300" />
                    <StarFillIcon className="text-yellow-300"/>
                    <StarFillIcon className="text-yellow-300"/>
                    <StarHalfIcon className="text-yellow-300"/>
                    <StarIcon className="text-yellow-300"/>
                    <span className="text-xs ml-2 text-gray-400">
                        20k reviews
                    </span>
                </span>

                {/* button action */}
                <div className="mt-5 flex">
                    <Button primary>Add to cart </Button>
                    <Button primary>Detail</Button>                    
                </div>
            </div>
        </div>
    );
}

export default ItemCompact;