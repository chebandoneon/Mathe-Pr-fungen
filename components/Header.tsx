import React from 'react';
import { StarIcon, PdfIcon } from './Icons';

interface HeaderProps {
  level: number;
  xp: number;
  xpForNextLevel: number;
  onExportPdf: () => void;
  isExportingPdf: boolean;
}

export const Header: React.FC<HeaderProps> = ({ level, xp, xpForNextLevel, onExportPdf, isExportingPdf }) => {
  const progressPercentage = (xp / xpForNextLevel) * 100;

  return (
    <header className="bg-white rounded-xl shadow-md p-4 border border-slate-200">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Math Quest
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">Zürich Gymi-Prüfungsvorbereitung</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:w-64">
                <div className="flex justify-between items-center mb-1 text-sm font-bold">
                    <span className="text-blue-600">Level {level}</span>
                    <span className="text-slate-600 flex items-center">
                        {xp} / {xpForNextLevel} <StarIcon className="w-4 h-4 text-yellow-400 ml-1" />
                    </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                    <div 
                        className="bg-blue-500 h-3 rounded-full transition-all duration-500" 
                        style={{ width: `${progressPercentage}%` }}>
                    </div>
                </div>
            </div>
             <button
                onClick={onExportPdf}
                disabled={isExportingPdf}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-slate-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
              >
                {isExportingPdf ? (
                  'Exportiere...'
                ) : (
                  <>
                    <PdfIcon className="w-5 h-5"/>
                    PDF Export
                  </>
                )}
            </button>
        </div>
      </div>
    </header>
  );
};