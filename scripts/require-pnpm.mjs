const userAgent = process.env.npm_config_user_agent ?? "";

if (!userAgent.startsWith("pnpm/")) {
  console.error("This project uses pnpm. Enable Corepack and run pnpm install.");
  process.exit(1);
}
