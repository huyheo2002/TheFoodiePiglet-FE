import React, { useContext, useEffect } from "react";
import Header from "../components/Header";
import bg from "../../assets/images/Base/background.png";
import Footer from "../components/Footer";
import Congrat from "../../components/Congrat";
import GlobalContext from "../../contexts/globalContext";

// only header
const DefaultLayout = ({ children }) => {
  const { showCongrat, setShowCongrat } = useContext(GlobalContext);
  const delayCloseCongrat = () => {
    setShowCongrat(true);
    setTimeout(() => {
      setShowCongrat(false);
    }, 5000);
  }

  useEffect(() => {
    if(showCongrat === true) {
      delayCloseCongrat();
    }
  }, [showCongrat]);

  return (
    <div className="w-full relative overflow-hidden">
      {/* {showCongrat && <Congrat />} */}
      <Header />
      {/* <Sidebar /> */}
      <div className="mx-16 relative pt-20">{children}</div>
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
};

export default DefaultLayout;
