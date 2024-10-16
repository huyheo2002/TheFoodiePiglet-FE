import {
    Chart as ChartJS,
    LineElement,
    BarElement,
    ArcElement,
    RadialLinearScale,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
    LineElement,
    BarElement,
    ArcElement,
    RadialLinearScale,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const RevenueByFoodCategoryChart = ({ data }) => {
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                data: data.values,
                backgroundColor: ['rgba(153, 102, 255, 0.5)', 'rgba(255, 159, 64, 0.5)', 'rgba(255, 205, 86, 0.5)'],
            },
        ],
    };

    return <Doughnut data={chartData} />;
};

export default RevenueByFoodCategoryChart;
