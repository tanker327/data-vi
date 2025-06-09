import Project3DVisualization from "./components/Project3DVisualization";
import { useProjectData } from "./hooks/useProjectData";

export default function App() {
    const projects = useProjectData();
    
    return (
        <div style={{ width: "100vw", height: "100vh", margin: 0, padding: 0 }}>
            <Project3DVisualization projects={projects} />
        </div>
    );
}
