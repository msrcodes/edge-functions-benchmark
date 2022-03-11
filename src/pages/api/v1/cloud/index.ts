import type {NextApiRequest, NextApiResponse} from 'next';
import {performCalculation} from '../shared';

interface Data {
  result: number;
}

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== 'GET') {
    return;
  }

  const result = performCalculation(200);

  res.status(200).json({result});
};

export default handler;
