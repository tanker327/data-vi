import React from "react";

const StatItem = ({ label, value, colorClass = "text-cyan-400" }) => (
    <div>
        <span className={colorClass}>{label}:</span>{" "}
        <span className="font-bold">{value}</span>
    </div>
);

export default function StatsPanel({ stats }) {
    return (
        <div className="absolute top-4 right-4 z-10 bg-black bg-opacity-90 text-white p-4 rounded-xl border border-green-500 shadow-2xl">
            <h4 className="font-bold text-lg mb-2 text-green-300">
                📈 Portfolio Statistics
            </h4>
            <div className="space-y-1 text-sm">
                <StatItem 
                    label="Total Projects" 
                    value={stats.totalProjects}
                    colorClass="text-cyan-400"
                />
                <StatItem 
                    label="Total 2024 Live" 
                    value={`$${stats.total2024Live.toLocaleString()}`}
                    colorClass="text-green-400"
                />
                <StatItem 
                    label="Total 2025 Live" 
                    value={`$${stats.total2025Live.toLocaleString()}`}
                    colorClass="text-blue-400"
                />
                <StatItem 
                    label="RED Projects" 
                    value={stats.redProjects}
                    colorClass="text-red-400"
                />
                <StatItem 
                    label="In Progress" 
                    value={stats.inProgressProjects}
                    colorClass="text-yellow-400"
                />
                <StatItem 
                    label="In Plan" 
                    value={stats.inPlanProjects}
                    colorClass="text-purple-400"
                />
            </div>
        </div>
    );
}