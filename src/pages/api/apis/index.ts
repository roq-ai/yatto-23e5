import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import {
  authorizationValidationMiddleware,
  errorHandlerMiddleware,
  notificationHandlerMiddleware,
} from 'server/middlewares';
import { apiValidationSchema } from 'validationSchema/apis';
import { convertQueryToPrismaUtil, getOrderByOptions, parseQueryParams } from 'server/utils';
import { getServerSession } from '@roq/nextjs';
import { GetManyQueryOptions } from 'interfaces';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getApis();
    case 'POST':
      return createApi();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getApis() {
    const {
      limit: _limit,
      offset: _offset,
      order,
      ...query
    } = parseQueryParams(req.query) as Partial<GetManyQueryOptions>;
    const limit = parseInt(_limit as string, 10) || 20;
    const offset = parseInt(_offset as string, 10) || 0;
    const response = await prisma.api
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findManyPaginated({
        ...convertQueryToPrismaUtil(query, 'api'),
        take: limit,
        skip: offset,
        ...(order?.length && {
          orderBy: getOrderByOptions(order),
        }),
      });
    return res.status(200).json(response);
  }

  async function createApi() {
    await apiValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.ci_cd_integration?.length > 0) {
      const create_ci_cd_integration = body.ci_cd_integration;
      body.ci_cd_integration = {
        create: create_ci_cd_integration,
      };
    } else {
      delete body.ci_cd_integration;
    }
    if (body?.test_run?.length > 0) {
      const create_test_run = body.test_run;
      body.test_run = {
        create: create_test_run,
      };
    } else {
      delete body.test_run;
    }
    const data = await prisma.api.create({
      data: body,
    });
    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
