import NotificationCard from "../../components/NotificationCard";
import StatisticelCard from "../../components/StatisticelCard";

function DashBoard() {
  return (
    <div className="pl-3 min-h-[1000px] w-[calc(100%-1rem)]">
      <div className="flex justify-between">
        {/* left */}
        <div className="w-[calc(75%-1rem)] pr-4 ">
          <div className="w-full h-auto bg-white rounded-lg px-3 py-4">
            <h1 className="mb-3 text-2xl font-semibold capitalize">
              Dashboard
            </h1>
            <StatisticelCard />
          </div>
        </div>

        {/* right */}
        <div className="bg-white rounded-lg px-3 py-4 w-1/4">
          <h1 className="mb-3 text-2xl font-semibold capitalize">Update</h1>
          <div className="">
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
