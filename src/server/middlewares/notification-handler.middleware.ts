import { getServerSession } from '@roq/nextjs';
import { NextApiRequest } from 'next';
import { NotificationService } from 'server/services/notification.service';
import { convertMethodToOperation, convertRouteToEntityUtil, HttpMethod, generateFilterByPathUtil } from 'server/utils';
import { prisma } from 'server/db';

interface NotificationConfigInterface {
  roles: string[];
  key: string;
  tenantPath: string[];
  userPath: string[];
}

const notificationMapping: Record<string, NotificationConfigInterface> = {
  'api.create': {
    roles: ['app-sec', 'security-analyst'],
    key: 'api-created',
    tenantPath: ['organization', 'api'],
    userPath: [],
  },
  'api.update': {
    roles: ['app-sec', 'security-analyst'],
    key: 'api-updated',
    tenantPath: ['organization', 'api'],
    userPath: [],
  },
  'api.delete': { roles: ['app-sec'], key: 'api-deleted', tenantPath: ['organization', 'api'], userPath: [] },
  'test_run.update': {
    roles: ['app-sec', 'security-analyst'],
    key: 'test-run-completed',
    tenantPath: ['organization', 'api', 'test_run'],
    userPath: [],
  },
  'ci_cd_integration.create': {
    roles: ['app-sec', 'security-analyst'],
    key: 'ci-cd-integration-added',
    tenantPath: ['organization', 'api', 'ci_cd_integration'],
    userPath: [],
  },
};

const ownerRoles: string[] = ['app-sec'];
const customerRoles: string[] = [];
const tenantRoles: string[] = ['security-analyst', 'app-sec'];

const allTenantRoles = tenantRoles.concat(ownerRoles);
export async function notificationHandlerMiddleware(req: NextApiRequest, entityId: string) {
  const session = getServerSession(req);
  const { roqUserId } = session;
  // get the entity based on the request url
  let [mainPath] = req.url.split('?');
  mainPath = mainPath.trim().split('/').filter(Boolean)[1];
  const entity = convertRouteToEntityUtil(mainPath);
  // get the operation based on request method
  const operation = convertMethodToOperation(req.method as HttpMethod);
  const notificationConfig = notificationMapping[`${entity}.${operation}`];

  if (!notificationConfig || notificationConfig.roles.length === 0 || !notificationConfig.tenantPath?.length) {
    return;
  }

  const { tenantPath, key, roles, userPath } = notificationConfig;

  const tenant = await prisma.organization.findFirst({
    where: generateFilterByPathUtil(tenantPath, entityId),
  });

  if (!tenant) {
    return;
  }
  const sendToTenant = () => {
    console.log('sending notification to tenant', {
      notificationConfig,
      roqUserId,
      tenant,
    });
    return NotificationService.sendNotificationToRoles(key, roles, roqUserId, tenant.tenant_id);
  };
  const sendToCustomer = async () => {
    if (!userPath.length) {
      return;
    }
    const user = await prisma.user.findFirst({
      where: generateFilterByPathUtil(userPath, entityId),
    });
    console.log('sending notification to user', {
      notificationConfig,
      user,
    });
    await NotificationService.sendNotificationToUser(key, user.roq_user_id);
  };

  if (roles.every((role) => allTenantRoles.includes(role))) {
    // check if only  tenantRoles + ownerRoles
    await sendToTenant();
  } else if (roles.every((role) => customerRoles.includes(role))) {
    // check if only customer role
    await sendToCustomer();
  } else {
    // both company and user receives
    await Promise.all([sendToTenant(), sendToCustomer()]);
  }
}
