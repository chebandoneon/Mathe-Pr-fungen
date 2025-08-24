import React from 'react';
import { Difficulty, Topic } from '../types';
import { DIFFICULTIES, TOPICS } from '../constants';
import { SparklesIcon, ChevronDownIcon } from './Icons';

interface ControlPanelProps {
  difficulty: Difficulty;
  setDifficulty: (d: Difficulty) => void;
  topic: Topic;
  setTopic: (t: Topic) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  difficulty,
  setDifficulty,
  topic,
  setTopic,
  onGenerate,
  isLoading,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-slate-200">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="difficulty" className="block text-sm font-bold text-slate-600 mb-1">
            Schwierigkeit
          </label>
          <div className="relative">
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty)}
              className="w-full p-2 pl-3 pr-8 rounded-lg bg-blue-600 text-white font-bold appearance-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-400 cursor-pointer"
              disabled={isLoading}
            >
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d} className="text-black bg-white font-normal">
                  {d}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                <ChevronDownIcon className="h-5 w-5" />
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="topic" className="block text-sm font-bold text-slate-600 mb-1">
            Thema
          </label>
          <div className="relative">
            <select
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value as Topic)}
              className="w-full p-2 pl-3 pr-8 rounded-lg bg-blue-600 text-white font-bold appearance-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-400 cursor-pointer"
              disabled={isLoading}
            >
              {TOPICS.map((t) => (
                <option key={t} value={t} className="text-black bg-white font-normal">
                  {t}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                <ChevronDownIcon className="h-5 w-5" />
            </div>
          </div>
        </div>
        <div className="sm:self-end">
          <button
            onClick={onGenerate}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              'Generiere...'
            ) : (
              <>
                <SparklesIcon className="w-5 h-5"/>
                Neue Aufgabe
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};