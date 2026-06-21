// PM2 process config — runs `next start` on a dedicated port so it doesn't
// clash with other apps on the VPS (port 3000 is used by another backend).
module.exports = {
  apps: [
    {
      name: "zynthovo",
      script: "npm",
      args: "start",
      cwd: __dirname,
      env: {
        NODE_ENV: "production",
        PORT: 3005,
      },
    },
  ],
};
