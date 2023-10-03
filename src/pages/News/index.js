import bgSlider from "../../assets/images/Base/bgNews-4.png";
import Heading from "../../components/Heading";
import Button from "../../components/Button";
import ItemNews from "../../components/ItemNews";
import * as genresServices from "../../services/genresServices";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function News() {
  const { t } = useTranslation(["home", "header"]);
  const [listGenres, setListGenres] = useState([]);
  
  const fetchDataGenres = async () => {
    let respon = await genresServices.getAllGenres() ?? null;

    if(respon) {
      setListGenres(respon.genres)
    }
  }

  useEffect(() => {
    fetchDataGenres();
  }, [])

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
          {t("heading.news")}
        </Heading>

          <div className="flex justify-center items-center mb-3">
            {listGenres.length > 0 && listGenres.map((item, index) => {
              return <Button key={index} variant={"primary"}>{item.name}</Button>
            })}                        
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
