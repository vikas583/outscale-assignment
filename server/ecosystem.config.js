module.exports = {
  apps: [
    {
      name: "proc-outscale-server",
      instances: 1,
      script: "./dist/index.js",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
