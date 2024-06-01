const dashboardApiRoutes = {
  userinfo: '/user/data',
  tasks: '/user/tasks',
  claimUSDT: '/user/usdt',
  leaderboard: '/user/leaderboard',
  claimEXP: '/user/tasks/',
  rewards: 'user/rewards',
  rewardsStatus: 'user/reward-status',
  completeSocialTask: '/user/social-tasks/',
};

const connectWalletApiRoutes = {
  authenticate: '/auth/authenticate',
  getSignMessage: '/auth/message/?address=',
};

export const apiRoutes = {
  ...dashboardApiRoutes,
  ...connectWalletApiRoutes,
};
