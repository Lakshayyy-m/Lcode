import { execSync } from "node:child_process";
import type { BashOperations } from "../tools/GeneralTools/BashTool.js";

const cwd = process.argv[1] || process.cwd();

const localOps: BashOperations = {
  exec: async (command) => {
    try {
      const stdout = execSync(command, {
        cwd,
        encoding: "utf-8",
        timeout: 30_000,
      });
      return { stdout, exitCode: 0 };
    } catch (error: any) {
      return {
        stdout: error.stdout || error.stderr || e.message || "",
        exitCode: error.status ?? 1,
      };
    }
  },
};

export default localOps