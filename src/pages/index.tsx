import axios from 'axios';
import {useEffect, useState} from 'react';
import Results from '../components/Results';

export interface Result {
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
    <main className="max-w-5xl m-auto p-8">
      <h1 className="text-2xl font-extrabold pb-8">
        Edge Functions Comparison
      </h1>
      <p className="pb-8">
        The same request is made {THRESHOLD} times of nodes on a cloud network
        and nodes on an edge network. The duration of the request is then
        measured and recorded.
      </p>
      {cloudResults.length && edgeResults.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Results type="Cloud" results={cloudResults} />
          <Results type="Edge" results={edgeResults} />
        </div>
      ) : (
        <h2>Processing requests...</h2>
      )}
    </main>
  );
};

export default Homepage;
