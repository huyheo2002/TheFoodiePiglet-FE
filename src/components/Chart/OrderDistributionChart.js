import React from 'react';
import { Line, Pie, Bar, Radar } from 'react-chartjs-2';
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

const OrderDistributionChart = ({ data }) => {
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: 'Phân phối đơn hàng',
                data: data.values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                ],
            },
        ],
    };

    return <Pie data={chartData} />;
};

export default OrderDistributionChart;
