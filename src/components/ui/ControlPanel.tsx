import React, { useState } from "react";
import { ProjectFilters } from "../../types/project.js";

interface SelectOption {
    value: string;
    label: string;
}

interface CompactSelectProps {
    icon: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: SelectOption[];
    colorClass: string;
    hoverClass: string;
    focusClass: string;
}

const CompactSelect: React.FC<CompactSelectProps> = ({
    icon,
    value,
    onChange,
    options,
    colorClass,
    hoverClass,
    focusClass,
}) => (
    <div className="relative group">
        <select
            value={value}
            onChange={onChange}
            className={`appearance-none bg-gray-800/60 backdrop-blur-sm text-white text-[9px] px-2 py-1 pr-5 rounded border border-gray-600/50 ${hoverClass} ${focusClass} focus:outline-none transition-all duration-200 cursor-pointer w-20 flex-shrink-0`}
        >
            {options.map(({ value, label }) => (
                <option
                    key={value}
                    value={value}
                    className="bg-gray-800 text-[9px]"
                >
                    {label}
                </option>
            ))}
        </select>
        <div
            className={`absolute left-1.5 top-1/2 transform -translate-y-1/2 ${colorClass} text-[8px] pointer-events-none`}
        >
            {icon}
        </div>
        <div className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 text-[8px] pointer-events-none">
            ▼
        </div>
    </div>
);

interface ControlPanelProps {
    filters: ProjectFilters;
    onFiltersChange: (filters: ProjectFilters) => void;
}

export default function ControlPanel({ filters, onFiltersChange }: ControlPanelProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const updateFilter = (key: keyof ProjectFilters, value: string) => {
        onFiltersChange({ ...filters, [key]: value });
    };

    const filterOptions = {
        rag: [
            { value: "all", label: "All" },
            { value: "RED", label: "RED" },
            { value: "AMBER", label: "AMBER" },
            { value: "GREEN", label: "GREEN" },
            { value: "BLUE", label: "BLUE" },
        ],
        executionState: [
            { value: "all", label: "All" },
            { value: "In Progress", label: "Progress" },
            { value: "On Hold", label: "Hold" },
            { value: "Planning", label: "Planning" },
            { value: "Completed", label: "Done" },
        ],
        organization: [
            { value: "all", label: "All" },
            { value: "CORPORATE & INVESTMENT BANKING", label: "CIB" },
            { value: "ASSET & WEALTH MANAGEMENT", label: "AWM" },
            { value: "CONSUMER & COMMUNITY BANKING", label: "CCB" },
            { value: "COMMERCIAL BANK", label: "CB" },
        ],
        benefitsLevel: [
            { value: "all", label: "All" },
            { value: "BC", label: "BC" },
            { value: "IP", label: "IP" },
        ],
    };

    return (
        <div className="absolute top-3 left-3 z-10 min-w-max">
            {/* Compact Header */}
            <div
                className="bg-black/90 backdrop-blur-lg text-white px-2 py-1.5 rounded-lg border border-cyan-400/30 shadow-xl cursor-pointer hover:border-cyan-400/50 transition-all duration-300"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-1.5">
                    <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-medium text-cyan-300">
                        Controls
                    </span>
                    <div
                        className={`text-[8px] text-gray-400 transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                        }`}
                    >
                        ▼
                    </div>
                </div>
            </div>

            {/* Expandable Content */}
            <div
                className={`mt-1 bg-black/95 backdrop-blur-lg rounded-lg border border-gray-600/30 shadow-xl transition-all duration-300 overflow-hidden ${
                    isExpanded ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="p-2 space-y-2 min-w-max">
                    {/* Filters in horizontal row */}
                    <div className="flex gap-1.5 flex-nowrap">
                        <CompactSelect
                            icon="🔴"
                            value={filters.rag}
                            onChange={(e) =>
                                updateFilter("rag", e.target.value)
                            }
                            options={filterOptions.rag}
                            colorClass="text-red-400"
                            hoverClass="hover:border-red-400/70"
                            focusClass="focus:border-red-400"
                        />
                        <CompactSelect
                            icon="⚡"
                            value={filters.executionState}
                            onChange={(e) =>
                                updateFilter("executionState", e.target.value)
                            }
                            options={filterOptions.executionState}
                            colorClass="text-green-400"
                            hoverClass="hover:border-green-400/70"
                            focusClass="focus:border-green-400"
                        />
                        <CompactSelect
                            icon="🏢"
                            value={filters.organization}
                            onChange={(e) =>
                                updateFilter("organization", e.target.value)
                            }
                            options={filterOptions.organization}
                            colorClass="text-blue-400"
                            hoverClass="hover:border-blue-400/70"
                            focusClass="focus:border-blue-400"
                        />
                        <CompactSelect
                            icon="📊"
                            value={filters.benefitsLevel}
                            onChange={(e) =>
                                updateFilter("benefitsLevel", e.target.value)
                            }
                            options={filterOptions.benefitsLevel}
                            colorClass="text-purple-400"
                            hoverClass="hover:border-purple-400/70"
                            focusClass="focus:border-purple-400"
                        />
                    </div>

                    {/* Ultra-compact Legend */}
                    <div className="border-t border-gray-700/50 pt-1.5">
                        <div className="grid grid-cols-3 gap-x-2 gap-y-0.5 text-[8px] text-gray-400">
                            <span>🔴 Timeline</span>
                            <span>🟢 Financials</span>
                            <span>🔵 Organization</span>
                            <span>📦 Budget</span>
                            <span>🎨 State</span>
                            <span>📏 RAG</span>
                        </div>
                        <div className="text-center text-gray-500 text-[7px] mt-1 opacity-75">
                            Click • Drag • Scroll
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
