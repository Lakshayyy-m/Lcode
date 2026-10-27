import { tool } from "ai";
import z from "zod";
import { SAFE_PREFIXES } from "../../lib/constants.js";

const bashToolSchema = z.object({
  command: z
    .string()
    .describe(
      "Shell command to execute. This will be verified so make sure it is a safe command to run",
    ),
});

export interface BashOperations {
  exec(command: string): Promise<{ stdout: string; exitCode: number }>;
}

export default function createBashTool(
  operations: BashOperations,
  needsApproval: (input: { command: string }) => boolean,
) {
  return tool({
    inputSchema: bashToolSchema,
    execute: async ({ command }) => {
      console.log("Using Bash Tool------------------------");
      if (needsApproval({ command })) {
        console.log("Command rejected: ", command);
        return `Blocked: "${command}" requires approval.`;
      }
      console.log("Command executed: ", command);

      const { stdout } = await operations.exec(command);
      return stdout || "(no output)";
    },
    description: `
    Execute a shell command in the working directory.

    WHEN TO USE: running build commands, installing packages, running tests,
      git operations, directory listings.

    WHEN NOT TO USE: reading file contents (use read instead).
      Searching for patterns (use grep instead).

    DO NOT USE FOR: reading files (use read), searching code or patterns (use grep).

    USAGE: command is a single shell string. Commands not in the safe-prefix
      allowlist are blocked and return a clear error message.

    EXAMPLES:
      - List files: command "ls -la"
      - Check git status: command "git status"
      - Run a test suite: command "npm test"
    `,
    name: "Bash Tool",
  });
}

function isSafe(command: string, safePrefixes: string[]) {
  for (let safe of safePrefixes) {
    if (command.trim().startsWith(safe)) return true;
  }
  return false;
}

export type ApprovalConfig =
  | { mode: "interactive" }
  | { mode: "background" }
  | { mode: "delegated"; trust: string[] };

export function createApproval(config: ApprovalConfig) {
  return ({ command }: { command: string }) => {
    if (config.mode === "background") return false;

    if (config.mode === "delegated") {
      return !isSafe(command, config.trust);
    }

    return !isSafe(command, SAFE_PREFIXES);
  };
}
