import { Project3DVisualization, useProjectData } from "./components/Project3DVisualization";

export default function App() {
    const projects = useProjectData();
    
    return (
        <div style={{ width: "100vw", height: "100vh", margin: 0, padding: 0 }}>
            <Project3DVisualization projects={projects} />
        </div>
    );
}
