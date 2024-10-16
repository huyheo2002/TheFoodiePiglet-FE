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
import { PolarArea } from 'react-chartjs-2';

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


const FoodTypeDistributionChart = ({ data }) => {
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                data: data.values,
                backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)'],
            },
        ],
    };

    return <PolarArea data={chartData} />;
};

export default FoodTypeDistributionChart;
