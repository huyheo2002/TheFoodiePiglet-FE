import bgSlider from "../../assets/images/Base/bgNews-4.png";
import ItemCompact from "../../components/ItemCompact";
import Heading from "../../components/Heading";
import Button from "../../components/Button";
import Image from "../../components/Image";
import ItemNews from "../../components/ItemNews";

function News() {
  return (
    <div className="w-full relative">
      {/* sidebar */}
      <div className="w-full relative overflow-hidden">
        <div className="relative inset-0 z-10 flex flex-row flex-wrap w-full justify-around my-6">
          <ItemNews itemCompact />
          <ItemNews itemCompact />
          <ItemNews itemCompact />
        </div>

        {/* overlay */}
        <div
          className="inset-0 blur-sm absolute z-0"
          style={{
            background: `url(${bgSlider})`,
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
      {/* main content */}
      <div className="my-3">
        <Heading variant={"primary"} line>
          Hello title
        </Heading>

          <div className="flex justify-center items-center mb-3">
            <Button variant={"primary"}>Hello</Button>
            <Button variant={"primary"}>Hello</Button>
            <Button variant={"primary"}>Hello</Button>
            <Button variant={"primary"}>Hello</Button>
          </div>
        {/* main content */}
        <div className="flex flex-row flex-wrap">
          <ItemNews itemCompact />
          <ItemNews itemCompact />
          <ItemNews itemCompact />
          <ItemNews itemCompact />
          <ItemNews itemCompact />
          <ItemNews itemCompact />
          <ItemNews itemCompact />
          <ItemNews itemCompact />
        </div>
      </div>
    </div>
  );
}

export default News;
