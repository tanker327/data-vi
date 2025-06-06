import React from "react";
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
}

const CompactSelect: React.FC<CompactSelectProps> = ({
    icon,
    value,
    onChange,
    options,
    colorClass,
}) => (
    <div style={{ position: 'relative', display: 'inline-block' }}>
        <select
            value={value}
            onChange={onChange}
            style={{
                appearance: 'none',
                backgroundColor: 'rgba(31, 41, 55, 0.8)',
                color: 'white',
                fontSize: '10px',
                padding: '4px 20px 4px 16px',
                border: '1px solid rgba(75, 85, 99, 0.5)',
                borderRadius: '4px',
                cursor: 'pointer',
                minWidth: '65px',
                outline: 'none'
            }}
        >
            {options.map(({ value, label }) => (
                <option
                    key={value}
                    value={value}
                    style={{ backgroundColor: 'rgb(31, 41, 55)' }}
                >
                    {label}
                </option>
            ))}
        </select>
        <div
            style={{
                position: 'absolute',
                left: '4px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '8px',
                pointerEvents: 'none'
            }}
            className={colorClass}
        >
            {icon}
        </div>
        <div
            style={{
                position: 'absolute',
                right: '4px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgb(156, 163, 175)',
                fontSize: '8px',
                pointerEvents: 'none'
            }}
        >
            ▼
        </div>
    </div>
);

interface ControlPanelProps {
    filters: ProjectFilters;
    onFiltersChange: (filters: ProjectFilters) => void;
}

export default function ControlPanel({ filters, onFiltersChange }: ControlPanelProps) {
    const updateFilter = (key: keyof ProjectFilters, value: string) => {
        onFiltersChange({ ...filters, [key]: value });
    };

    const filterOptions = {
        rag: [
            { value: "all", label: "All" },
            { value: "RED", label: "RED" },
            { value: "AMBER", label: "AMB" },
            { value: "GREEN", label: "GRN" },
            { value: "BLUE", label: "BLU" },
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
        <div 
            style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                zIndex: 10
            }}
        >
            <div 
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '8px',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    flexWrap: 'nowrap'
                }}
            >
                {/* Label */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div 
                        style={{
                            width: '6px',
                            height: '6px',
                            backgroundColor: 'rgb(34, 197, 94)',
                            borderRadius: '50%'
                        }}
                    ></div>
                    <span 
                        style={{
                            fontSize: '10px',
                            fontWeight: '500',
                            color: 'rgb(34, 197, 94)',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        Filters
                    </span>
                </div>

                {/* Separator */}
                <div 
                    style={{
                        width: '1px',
                        height: '20px',
                        backgroundColor: 'rgba(75, 85, 99, 0.5)'
                    }}
                ></div>

                {/* All selectors in one row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'nowrap' }}>
                    <CompactSelect
                        icon="🔴"
                        value={filters.rag}
                        onChange={(e) => updateFilter("rag", e.target.value)}
                        options={filterOptions.rag}
                        colorClass="text-red-400"
                    />
                    <CompactSelect
                        icon="⚡"
                        value={filters.executionState}
                        onChange={(e) => updateFilter("executionState", e.target.value)}
                        options={filterOptions.executionState}
                        colorClass="text-green-400"
                    />
                    <CompactSelect
                        icon="🏢"
                        value={filters.organization}
                        onChange={(e) => updateFilter("organization", e.target.value)}
                        options={filterOptions.organization}
                        colorClass="text-blue-400"
                    />
                    <CompactSelect
                        icon="📊"
                        value={filters.benefitsLevel}
                        onChange={(e) => updateFilter("benefitsLevel", e.target.value)}
                        options={filterOptions.benefitsLevel}
                        colorClass="text-purple-400"
                    />
                </div>
            </div>
        </div>
    );
}