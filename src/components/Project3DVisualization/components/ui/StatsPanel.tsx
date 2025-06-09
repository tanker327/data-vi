import React from "react";
import { PortfolioStats } from "../../types/project";
import styles from "./StatsPanel.module.css";

interface StatItemProps {
    label: string;
    value: string | number;
    colorClass?: string;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, colorClass = styles.labelCyan }) => (
    <div>
        <span className={colorClass}>{label}:</span>{" "}
        <span className={styles.statValue}>{value}</span>
    </div>
);

interface StatsPanelProps {
    stats: PortfolioStats;
}

export default function StatsPanel({ stats }: StatsPanelProps) {
    return (
        <div className={styles.panel}>
            <h4 className={styles.title}>
                📈 Portfolio Statistics
            </h4>
            <div className={styles.statsContainer}>
                <StatItem 
                    label="Total Projects" 
                    value={stats.totalProjects}
                    colorClass={styles.labelCyan}
                />
                <StatItem 
                    label="Total 2024 Live" 
                    value={`$${stats.total2024Live.toLocaleString()}`}
                    colorClass={styles.labelGreen}
                />
                <StatItem 
                    label="Total 2025 Live" 
                    value={`$${stats.total2025Live.toLocaleString()}`}
                    colorClass={styles.labelBlue}
                />
                <StatItem 
                    label="RED Projects" 
                    value={stats.redProjects}
                    colorClass={styles.labelRed}
                />
                <StatItem 
                    label="In Progress" 
                    value={stats.inProgressProjects}
                    colorClass={styles.labelYellow}
                />
                <StatItem 
                    label="In Plan" 
                    value={stats.inPlanProjects}
                    colorClass={styles.labelPurple}
                />
            </div>
        </div>
    );
}