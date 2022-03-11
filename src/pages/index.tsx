import axios from 'axios';
import {useEffect, useState} from 'react';

interface Result {
  value: number | String;
  duration: number;
}

const Homepage = () => {
  const [cloudResults, setCloudResults] = useState<Result[]>([]);
  const [edgeResults, setEdgeResults] = useState<Result[]>([]);

  const THRESHOLD = 10;

  useEffect(() => {
    async function makeRequest(route: string) {
      // Get time before
      const start = new Date().getTime();

      // Do request
      const request = await axios.get<{result: number}>(route);

      // Calculate duration
      const end = new Date().getTime();
      const duration = end - start;

      return {request, duration};
    }

    async function makeNRequests(route: string) {
      return await Promise.all(
        new Array(THRESHOLD).fill(0).map(async () => {
          return await makeRequest(route);
        })
      );
    }

    function parseRequests(
      reqs: Awaited<ReturnType<typeof makeNRequests>>
    ): Result[] {
      return reqs.map(
        ({
          duration,
          request: {
            data: {result},
            status,
            statusText,
          },
        }) => {
          if (status !== 200) {
            return {value: statusText, duration};
          } else {
            return {value: result, duration};
          }
        }
      );
    }

    async function makeRequests() {
      const cloudRequests = await makeNRequests('/api/v1/cloud');
      const edgeRequests = await makeNRequests('/api/v1/edge');

      const cloudResults: Result[] = parseRequests(cloudRequests);
      const edgeResults: Result[] = parseRequests(edgeRequests);

      // Return
      setCloudResults(cloudResults);
      setEdgeResults(edgeResults);
    }

    makeRequests();
  }, []);

  return (
    <main>
      <h1>Edge Functions Comparison</h1>
      <h2>Cloud Results</h2>
      <p>
        Cloud Average:{' '}
        {cloudResults.length > 0
          ? cloudResults.reduce((prev, cur) => ({
              duration: prev.duration + cur.duration,
              value: -1,
            })).duration / cloudResults.length
          : 'ERROR'}{' '}
        ms
      </p>
      {cloudResults.map(({value, duration}, i) => {
        return (
          <div key={`cloud-${value}-${i}`}>
            <h3>
              Result {i} ({value})
            </h3>
            <div>{duration} ms</div>
          </div>
        );
      })}
      <h2>Edge Results</h2>
      <p>
        Edge Average:{' '}
        {edgeResults.length > 0
          ? edgeResults.reduce((prev, cur) => ({
              duration: prev.duration + cur.duration,
              value: -1,
            })).duration / edgeResults.length
          : 'ERROR'}{' '}
        ms
      </p>
      {edgeResults.map(({value, duration}, i) => {
        return (
          <div key={`edge-${value}-${i}`}>
            <h3>
              Result {i} ({value})
            </h3>
            <div>{duration} ms</div>
          </div>
        );
      })}
    </main>
  );
};

export default Homepage;
