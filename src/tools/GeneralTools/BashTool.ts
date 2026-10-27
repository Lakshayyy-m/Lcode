import { tool } from "ai";
import z from "zod";
import { execSync } from "node:child_process";

const cwd = process.argv[1] || process.cwd();

const SAFE_PREFIXES = [
  "ls",
  "cat",
  "pwd",
  "git status",
  "git log",
  "git diff",
  "which",
  "find",
  "head",
  "tail",
  "wc",
];

const bashToolSchema = z.object({
  command: z
    .string()
    .describe(
      "Shell command to execute. This will be verified so make sure it is a safe command to run",
    ),
});

export default function createBashTool() {
  return tool({
    inputSchema: bashToolSchema,
    execute: ({ command }) => {
      if (!isSafe(command)) {
        console.log("Command rejected: ", command);
        return `Blocked: "${command}" requires approval. Only safe commands like ${SAFE_PREFIXES.join(", ")} run automatically`;
      }
      console.log("Command executed: ", command);

      try {
        const output = execSync(command, {
          cwd,
          encoding: "utf-8",
          timeout: 30_000,
        });
        console.log(output);
        return output || "(no output)";
      } catch (error: any) {
        return `Exit ${error.status ?? 1}: ${error.stdout || error.stderr || e.message || ""}`;
      }
    },
    description: `
      Execute a shell command in the current working directory
      WHEN TO USE: running build commands, installing packages, running tests, git operations, directory listings.
      WHEN NOT TO USE: reading file contents (use read instead).  searching for patterns (use grep instead).
      DO NOT USE FOR: reading files (use read), searching patterns (use grep).
    `,
    name: "Bash Tool",
  });
}

function isSafe(command: string) {
  for (let safe of SAFE_PREFIXES) {
    if (command.trim().startsWith(safe)) return true;
  }
  return false;
}
