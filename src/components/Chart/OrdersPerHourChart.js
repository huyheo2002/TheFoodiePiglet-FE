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

const OrdersPerHourChart = ({ data }) => {
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: 'Số lượng đơn hàng',
                data: data.values,
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default OrdersPerHourChart;
