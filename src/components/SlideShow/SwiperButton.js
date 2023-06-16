import React, { Fragment } from "react";
import { useSwiper } from "swiper/react";
import { NextIcon, PrevIcon } from "../Icons";

function SwiperButton({type, classNameWrapper, classNameIcon}) {
    const swipper = useSwiper();
    return (  
        <Fragment>
            {type === "next" ?
                <div onClick={() => swipper.slideNext()} className={classNameWrapper}><NextIcon className={classNameIcon} /></div>
                : type === "prev" ?
                <div onClick={() => swipper.slidePrev()} className={classNameWrapper}><PrevIcon className={classNameIcon} /></div>
                : ""
            }
        </Fragment>        
    );
}

export default SwiperButton;