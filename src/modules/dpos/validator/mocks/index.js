import { rest } from 'msw';
import { API_VERSION, LIMIT } from 'src/const/config';
import {
  mockDelegates,
  mockSentVotes,
  mockReceivedVotes,
  mockUnlocks,
  mockValidators,
  mockGenerator,
} from '@dpos/validator/__fixtures__';
import composeMockList from 'src/modules/common/utils/composeMockList';
import { mockDposConstants } from '../__fixtures__/mockDposConstants';

export const delegates = rest.get(`*/api/${API_VERSION}/dpos/delegates`, async (req, res, ctx) =>
  composeMockList({
    req,
    res,
    ctx,
    mockData: mockDelegates,
  })
);

export const sentVotes = rest.get(`*/api/${API_VERSION}/dpos/votes/sent`, async (req, res, ctx) => {
  const limit = Number(req.url.searchParams.get('limit') || LIMIT);
  const offset = Number(req.url.searchParams.get('offset') || 0);
  const response = {
    data: {
      ...mockSentVotes.data,
      votes: mockSentVotes.data.votes.slice(offset, offset + limit),
    },
    meta: {
      ...mockSentVotes.meta,
      count: limit,
      offset,
    },
  };
  return res(ctx.delay(20), ctx.json(response));
});

export const receivedVotes = rest.get(
  `*/api/${API_VERSION}/dpos/votes/received`,
  async (req, res, ctx) => {
    const limit = Number(req.url.searchParams.get('limit') || LIMIT);
    const offset = Number(req.url.searchParams.get('offset') || 0);
    const response = {
      data: {
        ...mockReceivedVotes.data,
        votes: mockReceivedVotes.data.votes.slice(offset, offset + limit),
      },
      meta: {
        ...mockReceivedVotes.meta,
        count: limit,
        offset,
      },
    };
    return res(ctx.delay(20), ctx.json(response));
  }
);

export const unlocks = rest.get(`*/api/${API_VERSION}/dpos/unlocks`, async (req, res, ctx) => {
  const limit = Number(req.url.searchParams.get('limit') || LIMIT);
  const offset = Number(req.url.searchParams.get('offset') || 0);
  const response = {
    data: {
      ...mockUnlocks.data,
      unlocking: mockUnlocks.data.unlocking.slice(offset, offset + limit),
    },
    meta: {
      ...mockUnlocks.meta,
      count: limit,
      offset,
    },
  };
  return res(ctx.delay(20), ctx.json(response));
});

export const validator = rest.get(`*/api/${API_VERSION}/validator`, async (req, res, ctx) =>
  res(ctx.delay(20), ctx.json(mockValidators))
);

export const generators = rest.get(`*/api/${API_VERSION}/generators`, async (req, res, ctx) => {
  const limit = Number(req.url.searchParams.get('limit') || LIMIT);
  const offset = Number(req.url.searchParams.get('offset') || 0);
  const response = {
    data: mockGenerator.data.slice(offset, offset + limit),
    meta: {
      ...mockGenerator.meta,
      count: limit,
      offset,
    },
  };
  return res(ctx.delay(20), ctx.json(response));
});

export const dposConstants = rest.get(
  `*/api/${API_VERSION}/dpos/constants`,
  async (req, res, ctx) => res(ctx.delay(20), ctx.json(mockDposConstants))
);
