import React from 'react';
import {Result} from '../../pages';

interface ResultsProps {
  results: Result[];
  type: string;
}

const Results = ({results, type}: ResultsProps) => {
  return (
    <div className="border border-blue-500 bg-slate-200 dark:bg-slate-800 shadow-lg p-2 rounded-lg">
      <h2 className="text-xl font-bold">{type} Results</h2>
      <p>
        <span className="font-bold">{type} Average:</span>{' '}
        {results.length > 0
          ? results.reduce((prev, cur) => ({
              duration: prev.duration + cur.duration,
              value: -1,
            })).duration / results.length
          : 'ERROR'}{' '}
        ms
      </p>
      {results.map(({value, duration}, i) => {
        return (
          <div key={`cloud-${value}-${i}`} className="flex justify-between">
            <h3 className="font-bold">{i + 1}</h3>
            <div>{duration} ms</div>
          </div>
        );
      })}
    </div>
  );
};

export default Results;
