import { useState } from "react";
import Project3DVisualization, { useProjectData } from "./components/Project3DVisualization";
import AIAnalyst from "./components/AIAnalyst";

export default function App() {
    const [currentView, setCurrentView] = useState<'3d' | 'analyst'>('3d');
    const projects = useProjectData();
    
    const toggleView = () => {
        setCurrentView(current => current === '3d' ? 'analyst' : '3d');
    };
    
    return (
        <div style={{ width: "100vw", height: "100vh", margin: 0, padding: 0, position: "relative" }}>
            <button
                onClick={toggleView}
                style={{
                    position: "absolute",
                    top: "20px",
                    left: "20px",
                    zIndex: 1000,
                    padding: "10px 20px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    backgroundColor: "#667eea",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#5a6fd8";
                    e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#667eea";
                    e.currentTarget.style.transform = "translateY(0)";
                }}
            >
                Switch to {currentView === '3d' ? 'AI Analyst' : '3D View'}
            </button>
            
            {currentView === '3d' ? (
                <Project3DVisualization projects={projects} />
            ) : (
                <AIAnalyst />
            )}
        </div>
    );
}
