import { resolve } from "node:path";
import type { Sandbox } from "./sanbox.js";
// import { Sandbox as VercelSandbox } from "@vercel/sandbox";

export async function createCloudSandbox(config: {
  template?: string;
  snapshotId?: string;
}): Promise<Sandbox> {
  const vm = await VercelSandbox.create(config);

  return {
    type: "cloud",
    workingDirectory: "/workspace",
    expiresAt: Date.now() + 30 * 60 * 1000,

    async readFile(path) {
      return vm.files.read(resolve("/workspace", path));
    },

    async exec(command) {
      const result = await vm.commands.run(command, { cwd: "/workspace" });
      return {
        stdout: result.stdout + result.stderr,
        exitCode: result.exitCode,
      };
    },

    async stop() {
      await vm.close();
    },

    async snapshot() {
      const snap = await vm.snapshot();
      return { snapshotId: snap.id };
    },
  };
}
