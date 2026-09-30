export default (phase) => ({
  reactStrictMode: true,
  poweredByHeader: false,
  distDir: phase === "phase-development-server" ? ".next-local" : ".next",
});
