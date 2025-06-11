import { useState } from 'react';
import { useProjectData } from '../Project3DVisualization';
import styles from './AIAnalyst.module.css';
import { dataAnalysis } from './utils/Analysis';

interface AnalysisResult {
    answer: {
        text: string;
        visualizations?: Array<{
            type: 'chart' | 'table';
            content: string;
        }>;
    };
}

export default function AIAnalyst() {
    const projects = useProjectData();
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [question, setQuestion] = useState('Summarize the projects');

    const handleAnalysis = async () => {
        if (!question.trim()) {
            setError('Please enter a question about the projects');
            return;
        }
        
        setLoading(true);
        setError(null);
        try {
            const response = await dataAnalysis(question.trim(), JSON.stringify(projects));
            const parsedResponse = JSON.parse(response.content);
            setResult(parsedResponse);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            console.error('Analysis error:', err);
        } finally {
            setLoading(false);
        }
    };

    const renderText = (text: string) => {
        return text.split('\n').map((line, index) => {
            if (line.startsWith('# ')) {
                return <h1 key={index} className={styles.heading1}>{line.slice(2)}</h1>;
            } else if (line.startsWith('## ')) {
                return <h2 key={index} className={styles.heading2}>{line.slice(3)}</h2>;
            } else if (line.startsWith('### ')) {
                return <h3 key={index} className={styles.heading3}>{line.slice(4)}</h3>;
            } else if (line.startsWith('- ')) {
                return <li key={index} className={styles.listItem}>{line.slice(2)}</li>;
            } else if (line.trim() === '') {
                return <br key={index} />;
            } else {
                return <p key={index} className={styles.paragraph}>{line}</p>;
            }
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>AI Data Analyst</h1>
                <div className={styles.querySection}>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Ask a question about the projects..."
                        className={styles.questionInput}
                        onKeyDown={(e) => e.key === 'Enter' && !loading && handleAnalysis()}
                    />
                    <button
                        onClick={handleAnalysis}
                        disabled={loading || !question.trim()}
                        className={styles.analyzeButton}
                    >
                        {loading ? 'Analyzing...' : 'Analyze'}
                    </button>
                </div>
            </div>

            {error && (
                <div className={styles.error}>
                    Error: {error}
                </div>
            )}

            {result && (
                <div className={styles.analysisResult}>
                    <div className={styles.textContent}>
                        {renderText(result.answer.text)}
                    </div>

                    {result.answer.visualizations && result.answer.visualizations.length > 0 && (
                        <div className={styles.visualizations}>
                            {result.answer.visualizations.map((viz, index) => (
                                <div key={index} className={styles.visualization}>
                                    <div
                                        dangerouslySetInnerHTML={{ __html: viz.content }}
                                        className={viz.type === 'chart' ? styles.chart : styles.table}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}