import {NextRequest, NextResponse} from 'next/server';
import {performCalculation} from '../shared';

const middleware = async (req: NextRequest) => {
  if (req.nextUrl.pathname !== '/api/v1/edge') {
    return;
  }

  const result = performCalculation(200);

  return NextResponse.json({result});
};

export {middleware};
