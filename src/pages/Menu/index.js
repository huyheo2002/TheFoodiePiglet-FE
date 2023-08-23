import React from "react";
import clsx from "clsx";
import Sidebar from "./Sidebar";
import bgTest from "../../assets/images/Menu/base/bg-seafood1.jpg";
import bgTest2 from "../../assets/images/Menu/base/bg-seafood2.jpg";
import overlay from "../../assets/images/Menu/base/clippath-overlay.jpg";

function Menu() {
  return (
    <div className="w-full h-[100vh] relative bg-black">
      <div
        className="absolute inset-0 z-0 blur-sm"
        style={{
          background: `url(${bgTest})`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      {/* <div className="absolute z-50 right-8 top-24">
        <img src="https://www.koreandxb.com/images/food5.jpg" />
      </div> */}
      {/* <img src="https://www.koreandxb.com/images/kc2.png"/> */}

      <div
        className="relative w-full h-[100vh] max-h-[100vh] flex pt-16 overflow-hidden"
        style={{
          background: `url(${overlay})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-[325px] min-w-[325px] min-h-[250px]">
          <Sidebar />          
        </div>

        <div className="w-full min-h-[250px]">aloooooo ^o^</div>
      </div>
    </div>
  );
}

export default Menu;
