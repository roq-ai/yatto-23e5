interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['App Sec'],
  customerRoles: [],
  tenantRoles: ['Security Analyst', 'App Sec'],
  tenantName: 'Organization',
  applicationName: 'YATTO',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: [
    'Manage Organizations',
    'Invite Security Analysts to Organization',
    'Remove Security Analysts from Organization',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/07be471f-375d-4b07-9b73-75c7bfe8f067',
};
