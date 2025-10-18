import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const PORT = 43210;
const HOST = "127.0.0.1";

const execPath = process.env.npm_execpath ?? "";
const usePnpm = execPath.includes("pnpm");
const command = usePnpm ? "pnpm" : "npm";
const args = usePnpm
  ? ["dev", "--", "--host", HOST, "--port", String(PORT)]
  : ["run", "dev", "--", "--host", HOST, "--port", String(PORT)];

const server = spawn(command, args, {
  stdio: ["ignore", "pipe", "pipe"],
  env: {
    ...process.env,
    FORCE_COLOR: "0",
  },
});

let resolved = false;

const waitForServer = new Promise((resolve, reject) => {
  const onData = (chunk) => {
    const text = chunk.toString();
    if (
      text.includes(`Local`) ||
      text.includes(`http://${HOST}:${PORT}`) ||
      text.includes(`http://localhost:${PORT}`)
    ) {
      server.stdout.off("data", onData);
      resolved = true;
      resolve(undefined);
    }
  };

  const onError = (error) => {
    cleanup();
    reject(error);
  };

  const onExit = (code) => {
    if (!resolved) {
      cleanup();
      reject(new Error(`astro dev exited prematurely with code ${code}`));
    }
  };

  const cleanup = () => {
    server.stdout.off("data", onData);
    server.off("error", onError);
    server.off("exit", onExit);
  };

  server.stdout.on("data", onData);
  server.on("error", onError);
  server.on("exit", onExit);
});

try {
  await Promise.race([
    waitForServer,
    delay(15_000).then(() => {
      throw new Error("Timed out waiting for astro dev to start");
    }),
  ]);

  const response = await fetch(`http://${HOST}:${PORT}/component-library/`, {
    headers: { "user-agent": "smoke-test" },
  });

  if (!response.ok) {
    throw new Error(`Component library smoke failed: HTTP ${response.status}`);
  }

  const html = await response.text();
  if (!html.includes("Component Library")) {
    throw new Error(
      "Component library smoke failed: expected heading not found",
    );
  }

  console.log("Component library smoke check passed.");
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  server.kill();
}
