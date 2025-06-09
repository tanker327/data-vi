import React from "react";
import styles from "./Legend.module.css";

interface LegendItemProps {
    icon: string;
    label: string;
    description: string;
    colorClass?: string;
}

const LegendItem: React.FC<LegendItemProps> = ({ icon, label, description, colorClass = styles.labelCyan }) => (
    <div>
        <span className={colorClass}>{icon} {label}:</span> {description}
    </div>
);

export default function Legend() {
    return (
        <div className={styles.legend}>
            <div className={styles.title}>
                🎮 Controls & Legend
            </div>
            <div className={styles.itemsContainer}>
                <LegendItem
                    icon="🖱️"
                    label="Click"
                    description="Select project for details"
                    colorClass={styles.labelCyan}
                />
                <LegendItem
                    icon="🖱️"
                    label="Hover"
                    description="View project information"
                    colorClass={styles.labelPurple}
                />
                <LegendItem
                    icon="🔄"
                    label="Drag"
                    description="Rotate 3D view"
                    colorClass={styles.labelYellow}
                />
                <LegendItem
                    icon="🔍"
                    label="Scroll"
                    description="Zoom in/out"
                    colorClass={styles.labelGreen}
                />
                <LegendItem
                    icon="📦"
                    label="Rotating"
                    description="In Progress projects"
                    colorClass={styles.labelRed}
                />
                <LegendItem
                    icon="💛"
                    label="Yellow cube"
                    description="BC Benefits Level"
                    colorClass={styles.labelBlue}
                />
                <LegendItem
                    icon="🔵"
                    label="Cyan cylinder"
                    description="In Plan projects"
                    colorClass={styles.labelCyan}
                />
            </div>
        </div>
    );
}