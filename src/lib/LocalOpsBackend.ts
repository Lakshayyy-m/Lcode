import { execSync } from "node:child_process";
import type { BashOperations } from "../tools/GeneralTools/BashTool.js";
import { resolve } from "node:path";

const workingDir = resolve(process.cwd());

const localOps: BashOperations = {
  exec: async (command) => {
    try {
      const stdout = execSync(command, {
        cwd: workingDir,
        encoding: "utf-8",
        timeout: 30_000,
      });
      return { stdout, exitCode: 0 };
    } catch (error: any) {
      return {
        stdout: error.stdout || error.stderr || error.message || "",
        exitCode: error.status ?? 1,
      };
    }
  },
};

export default localOps;
