const mapping: Record<string, string> = {
  apis: 'api',
  'ci-cd-integrations': 'ci_cd_integration',
  organizations: 'organization',
  'test-results': 'test_result',
  'test-runs': 'test_run',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
