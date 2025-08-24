import React from 'react';
import type { Problem } from '../types';
import { LightBulbIcon } from './Icons';

interface ProblemDisplayProps {
  problem: Problem | null;
  isLoading: boolean;
  error: string | null;
  showSolution: boolean;
  onShowSolution: () => void;
}

const Placeholder: React.FC = () => (
    <div className="text-center p-8 sm:p-12">
        <h2 className="text-xl font-bold text-slate-600">Willkommen bei Math Quest!</h2>
        <p className="mt-2 text-slate-600">Wähle oben eine Schwierigkeit und ein Thema aus und klicke auf "Neue Aufgabe", um loszulegen.</p>
    </div>
);

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center p-12">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
    </div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
    <div className="text-center p-8 sm:p-12 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-lg font-bold text-red-700">Oops!</h3>
        <p className="mt-2 text-red-600">{message}</p>
    </div>
);

const SolutionDisplay: React.FC<{ problem: Problem }> = ({ problem }) => (
    <div className="mt-6 pt-6 border-t-2 border-dashed border-slate-200 animate-fade-in">
        <h3 className="text-lg font-bold text-green-700">Lösungsweg</h3>
        <ul className="mt-2 space-y-2 list-disc list-inside text-slate-600">
            {problem.solutionSteps.map((step, index) => (
                <li key={index}>{step}</li>
            ))}
        </ul>
        <div className="mt-4 p-3 bg-green-100/70 border border-green-200 rounded-lg">
            <p className="font-bold text-green-800">Antwort: {problem.finalAnswer}</p>
        </div>
    </div>
);

export const ProblemDisplay: React.FC<ProblemDisplayProps> = ({ problem, isLoading, error, showSolution, onShowSolution }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-slate-200 min-h-[20rem] flex flex-col justify-center">
            {isLoading ? (
                <LoadingSpinner />
            ) : error ? (
                <ErrorDisplay message={error} />
            ) : !problem ? (
                <Placeholder />
            ) : (
                <div>
                    {problem.svgDiagram && (
                        <div 
                          className="mb-4 p-4 border rounded-lg bg-slate-50 flex justify-center text-slate-700"
                          dangerouslySetInnerHTML={{ __html: problem.svgDiagram }}
                        />
                    )}
                    <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-wrap">{problem.question}</p>
                    
                    {!showSolution && (
                         <div className="mt-8 text-center">
                             <button onClick={onShowSolution} className="bg-green-500 text-white font-bold py-2 px-6 rounded-full hover:bg-green-600 transition-transform hover:scale-105 flex items-center gap-2 mx-auto">
                                <LightBulbIcon className="w-5 h-5" />
                                Antwort anzeigen
                             </button>
                         </div>
                    )}

                    {showSolution && <SolutionDisplay problem={problem} />}
                </div>
            )}
        </div>
    );
};