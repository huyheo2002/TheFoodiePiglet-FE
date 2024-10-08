import React from "react";
import Header from "../components/Header";
import bg from "../../assets/images/Base/background.png";
import Footer from "../components/Footer";

function FullScreenLayout({ children }) {
  return (
    <div className="w-full relative overflow-hidden">
      <Header />
      <div className="relative">{children}</div>
      <Footer />
      <div
        className="w-full h-[100vh] fixed inset-0 -z-10"
        style={{
          background: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
    </div>
  );
}

export default FullScreenLayout;
