import { spawn } from "node:child_process";
import { cpSync, mkdirSync } from "node:fs";
import path from "node:path";

// Bonto runs `npm start` and injects PORT. The standalone server is built here
// so Linux gets its own Next binaries instead of a Windows build artifact.
process.env.PORT ||= "3000";
process.env.HOSTNAME ||= "0.0.0.0";
process.env.NEXT_PUBLIC_SITE_URL ||= "https://bi-asmaih.bonto.run";

const nextBin = path.join("node_modules", "next", "dist", "bin", "next");

function run(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, { stdio: "inherit", env: process.env });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${args.join(" ")} exited with ${code}`));
    });
  });
}

console.log("Building the Next.js server…");
await run([nextBin, "build"]);

const standalone = path.join(".next", "standalone");
cpSync("public", path.join(standalone, "public"), { recursive: true });
mkdirSync(path.join(standalone, ".next"), { recursive: true });
cpSync(path.join(".next", "static"), path.join(standalone, ".next", "static"), { recursive: true });

console.log(`Listening on ${process.env.HOSTNAME}:${process.env.PORT}`);
await run([path.join(standalone, "server.js")]);
