import { cardsData } from "../../data/dashboardCardData";
import Card from "./Card";

function StatisticelCard() {
  return (
    <div className="flex gap-3">
      {cardsData.map((item, index) => {
        return (
          <div className="w-full" key={index}>
            <Card data={item} />
          </div>
        );
      })}
    </div>
  );
}

export default StatisticelCard;
