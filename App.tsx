import React, { useState, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { ProblemDisplay } from './components/ProblemDisplay';
import { generateMathProblem } from './services/geminiService';
import { exportProblemsToPdf } from './services/pdfService';
import { Difficulty, Topic, Problem } from './types';
import { XP_PER_PROBLEM } from './constants';

const App: React.FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Medium);
  const [topic, setTopic] = useState<Topic>(Topic.Mixed);
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [userLevel, setUserLevel] = useState<number>(1);
  const [userXp, setUserXp] = useState<number>(0);

  const xpForNextLevel = useMemo(() => 100 * userLevel, [userLevel]);

  const handleGenerateProblem = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setCurrentProblem(null);
    setShowSolution(false);
    try {
      const problem = await generateMathProblem(difficulty, topic);
      setCurrentProblem(problem);
    } catch (err) {
      console.error(err);
      setError("Ein Fehler ist aufgetreten. Bitte versuche es erneut.");
    } finally {
      setIsLoading(false);
    }
  }, [difficulty, topic]);

  const handleShowSolution = useCallback(() => {
    if (!showSolution) {
        setShowSolution(true);
        const newXp = userXp + XP_PER_PROBLEM;
        if (newXp >= xpForNextLevel) {
            setUserLevel(userLevel + 1);
            setUserXp(newXp - xpForNextLevel);
        } else {
            setUserXp(newXp);
        }
    }
  }, [showSolution, userXp, xpForNextLevel, userLevel]);
  
  const handlePdfExport = useCallback(async () => {
    setIsExportingPdf(true);
    setError(null);
    try {
      const problemPromises: Promise<Problem>[] = Array.from({ length: 10 }, () => 
        generateMathProblem(difficulty, topic)
      );
      
      const problems = await Promise.all(problemPromises);
      
      exportProblemsToPdf(problems);
      
    } catch (err) {
      console.error(err);
      setError("PDF-Export fehlgeschlagen. Bitte versuche es erneut.");
    } finally {
      setIsExportingPdf(false);
    }
  }, [difficulty, topic]);


  return (
    <div className="min-h-screen bg-blue-50 text-slate-900 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Header 
          level={userLevel} 
          xp={userXp} 
          xpForNextLevel={xpForNextLevel}
          onExportPdf={handlePdfExport}
          isExportingPdf={isExportingPdf}
        />
        <main className="mt-6">
          <ControlPanel
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            topic={topic}
            setTopic={setTopic}
            onGenerate={handleGenerateProblem}
            isLoading={isLoading || isExportingPdf}
          />
          <div className="mt-6">
            <ProblemDisplay
              problem={currentProblem}
              isLoading={isLoading}
              error={error}
              showSolution={showSolution}
              onShowSolution={handleShowSolution}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;