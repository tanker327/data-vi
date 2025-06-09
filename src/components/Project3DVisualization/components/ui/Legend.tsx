import React from "react";

interface LegendItemProps {
    icon: string;
    label: string;
    description: string;
    colorClass?: string;
}

const LegendItem: React.FC<LegendItemProps> = ({ icon, label, description, colorClass = "text-cyan-400" }) => (
    <div>
        <span className={colorClass}>{icon} {label}:</span> {description}
    </div>
);

export default function Legend() {
    return (
        <div className="absolute bottom-4 left-4 z-10 bg-black bg-opacity-90 text-white p-3 rounded-xl border border-yellow-500 shadow-2xl text-xs">
            <div className="font-bold mb-2 text-yellow-300">
                🎮 Controls & Legend
            </div>
            <div className="space-y-1">
                <LegendItem
                    icon="🖱️"
                    label="Click"
                    description="Select project for details"
                    colorClass="text-cyan-400"
                />
                <LegendItem
                    icon="🖱️"
                    label="Hover"
                    description="View project information"
                    colorClass="text-purple-400"
                />
                <LegendItem
                    icon="🔄"
                    label="Drag"
                    description="Rotate 3D view"
                    colorClass="text-yellow-400"
                />
                <LegendItem
                    icon="🔍"
                    label="Scroll"
                    description="Zoom in/out"
                    colorClass="text-green-400"
                />
                <LegendItem
                    icon="📦"
                    label="Rotating"
                    description="In Progress projects"
                    colorClass="text-red-400"
                />
                <LegendItem
                    icon="💛"
                    label="Yellow cube"
                    description="BC Benefits Level"
                    colorClass="text-blue-400"
                />
                <LegendItem
                    icon="🔵"
                    label="Cyan cylinder"
                    description="In Plan projects"
                    colorClass="text-cyan-400"
                />
            </div>
        </div>
    );
}