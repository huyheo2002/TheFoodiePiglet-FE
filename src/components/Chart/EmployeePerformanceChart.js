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

const EmployeePerformanceChart = ({ data }) => {
    const chartData = {
        labels: ['Sự nhanh nhẹn', 'Thái độ phục vụ', 'Hiệu suất', 'Độ chính xác'],
        datasets: data.map((employee) => ({
            label: employee.name,
            data: employee.performance,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
        })),
    };

    return <Radar data={chartData} />;
};

export default EmployeePerformanceChart;
