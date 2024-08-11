import bgSlider from "../../assets/images/Base/bgNews-4.png";
import Heading from "../../components/Heading";
import Button from "../../components/Button";
import ItemNews from "../../components/ItemNews";
import * as genresServices from "../../services/genresServices";
import * as newsServices from "../../services/newsServices";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import getRandomListItem from "../../utils/getRandomItem";

function News() {
  const { t } = useTranslation(["home", "header"]);
  const [listGenres, setListGenres] = useState([]);
  const [listNews, setListNews] = useState([]);
  const [randomNews, setRandomNews] = useState([]);

  const [categoryCurrent, setCategoryCurrent] = useState("");

  const fetchDataGenres = async () => {
    let respon = await genresServices.getAllGenres() ?? null;

    if (respon) {
      setListGenres(respon.genres)
      setCategoryCurrent(respon.genres[0].name)
    }
  }

  const fetchAllNews = async () => {
    const respon = await newsServices.getAllNews("all") ?? null;

    if (respon && respon.errCode === 0) {
      const dataListNews = respon.news || [];
      let splitFields =
        dataListNews.length > 0 &&
        dataListNews.map((item) => {
          if (item.Genre) {
            item.categoryName = item.Genre.name;
            delete item.Genre;
          }

          return item;
        });

      // show full info
      if (splitFields.length > 0) {
        setListNews(splitFields)
        const randomNews = getRandomListItem(splitFields, 3);
        setRandomNews(randomNews)
      }
    }
  }

  useEffect(() => {
    fetchDataGenres();
    fetchAllNews();
  }, [])

  return (
    <div className="w-full relative">
      {/* sidebar */}
      <div className="w-full relative overflow-hidden">
        <div className="relative inset-0 z-10 flex flex-row flex-wrap w-full justify-around my-6">
          {randomNews.length > 0 && randomNews.map((item, index) => {
            return <ItemNews itemCompact key={index} data={item} />
          })}
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
            return <Button key={index} variant={"primary"}
              onClick={() => setCategoryCurrent(item.name)}
            >{item.name}</Button>
          })}
        </div>
        {/* main content */}
        <div className="flex flex-row flex-wrap">
          {listNews.length > 0 && listNews.map((item, index) => {
            if (item.categoryName === categoryCurrent) {
              return <ItemNews itemCompact data={item} key={index} />
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default News;
