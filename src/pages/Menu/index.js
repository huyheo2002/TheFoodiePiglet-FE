import React from "react";
// import clsx from "clsx";
import Sidebar from "./Sidebar";
import Image from "../../components/Image";
import Heading from "../../components/Heading";
import ItemCompact from "../../components/ItemCompact";

function Menu() {
  return (
    <div className="w-full relative">
      <div
        className="absolute inset-0 z-0 blur-sm"
        // style={{
        //   background: `url(${bgTest})`,
        //   backgroundRepeat: "no-repeat",
        //   backgroundAttachment: "fixed",
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        // }}
      ></div>
      {/* <div className="absolute z-50 right-8 top-24">
        <img src="https://www.koreandxb.com/images/food5.jpg" />
      </div> */}
      {/* <img src="https://www.koreandxb.com/images/kc2.png"/> */}

      <div
        className="relative w-full flex pt-16 overflow-hidden"
        // style={{
        //   background: `url(${overlay})`,
        //   backgroundRepeat: "no-repeat",
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        // }}
      >
        <div className="w-[325px] min-w-[325px] min-h-[250px] fixed">
          <Sidebar />          
        </div>

        <main className="w-full ml-[325px] min-h-[250px] text-white px-3 py-4">
          {/* slider */}
          <div className="w-full h-[425px]">
            <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkFKzN5NieP2YQ97ARPRLiLR5F5myOHS3YqQ&usqp=CAU"
              className={"w-full h-full"}
            />
          </div>
          {/* content main */}
          <div className="w-full my-5">
            <Heading line>Item category</Heading>
            <div className="flex flex-row flex-wrap">
              <ItemCompact size={"threeItems-onRows"} />
              <ItemCompact size={"threeItems-onRows"} />
              <ItemCompact size={"threeItems-onRows"} />
              <ItemCompact size={"threeItems-onRows"} />
              <ItemCompact size={"threeItems-onRows"} />
              <ItemCompact size={"threeItems-onRows"} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Menu;
