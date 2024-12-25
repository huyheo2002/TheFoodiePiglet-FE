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
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',  // Đỏ
                    'rgba(54, 162, 235, 0.6)',  // Xanh dương
                    'rgba(255, 206, 86, 0.6)',  // Vàng
                    'rgba(75, 192, 192, 0.6)',  // Xanh ngọc
                    'rgba(153, 102, 255, 0.6)', // Tím
                    'rgba(255, 159, 64, 0.6)',  // Cam
                    'rgba(201, 203, 207, 0.6)', // Xám nhạt
                    'rgba(100, 181, 246, 0.6)', // Xanh nước nhạt
                    'rgba(255, 138, 101, 0.6)', // Hồng cam
                    'rgba(174, 234, 0, 0.6)',   // Xanh lá nhạt
                ],
            },
        ],
    };

    return <Doughnut data={chartData} />;
};

export default RevenueByFoodCategoryChart;
