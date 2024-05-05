const dashboardApiRoutes = {
  userinfo: '/user/data',
  tasks: '/user/tasks',
  leaderboard: '/user/leaderboard',
};

const connectWalletApiRoutes = {
  authenticate: '/auth/authenticate',
  getSignMessage: '/auth/message/?address=',
};

export const apiRoutes = {
  ...dashboardApiRoutes,
  ...connectWalletApiRoutes,
};
