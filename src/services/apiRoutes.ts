const dashboardApiRoutes = {
  userinfo: '/user/data',
  tasks: '/user/tasks',
  claimRewards: '/user/claim-reward/',
  leaderboard: '/user/leaderboard',
  claimEXP: '/user/tasks/',
  rewards: 'user/rewards',
  rewardsStatus: 'user/reward-status',
  completeSocialTask: '/user/social-tasks/',
  verifyInviteCode: '/invite/',
};

const connectWalletApiRoutes = {
  authenticate: '/auth/authenticate',
  getSignMessage: '/auth/message/?address=',
};

export const apiRoutes = {
  ...dashboardApiRoutes,
  ...connectWalletApiRoutes,
};
