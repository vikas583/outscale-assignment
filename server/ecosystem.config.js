module.exports = {
  apps: [{
    name: 'outscale', 
    script: 'yarn',
    args: 'run dev',
    interpreter: '/bin/bash',
    autorestart: true,
    watch: true,
    ignore_watch: ['node_modules'],
    env: {
      NODE_ENV: 'development',
    },
  }],
};
