import { BellIcon } from "../components/Icons"

export const cardsData = [
    {
        title: "sales",
        barValue: 70,
        value: "25.970",
        icon: <BellIcon className="!w-6 !h-6"/>,
        series: [
            {
                name: "sales",
                data: [31, 40, 28, 51, 42, 109, 100, 31, 40, 28, 51, 42, 109, 100, 31, 40, 28, 51, 42, 109, 100, 31, 23, 87]
            }
        ]
    },
    {
        title: "revenue",
        barValue: 80,
        value: "14.270",
        icon: <BellIcon className="!w-6 !h-6"/>,
        series: [
            {
                name: "revenue",
                data: [10, 100, 50, 70, 80, 30, 40, 10, 100, 50, 70, 80, 30, 40, 10, 100, 50, 70, 80, 30, 40, 40, 60, 80]
            }
        ]
    },
    {
        title: "expenses",
        barValue: 60,
        value: "4.270",
        icon: <BellIcon className="!w-6 !h-6"/>, 
        series: [
            {
                name: "expenses",
                data: [10, 25, 15, 30, 12, 15, 20, 10, 25, 15, 30, 12, 15, 20, 10, 25, 15, 30, 12, 15, 20, 40, 60, 80]
            }
        ]
    }
]