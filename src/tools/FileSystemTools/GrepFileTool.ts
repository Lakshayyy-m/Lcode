import { tool } from "ai";
import { execSync } from "node:child_process";
import { resolve } from "node:path";
import z from "zod";

const grepSchema = z.object({
  pattern: z
    .string()
    .describe(
      `Pattern to search for in files. The string/pattern/regex you are searching for`,
    ),
  path: z
    .string()
    .optional()
    .describe(
      `Path of the directory to search content in. The path of file where to search for the pattern in or the directory path. Default: Current Working Directory`,
    ),
  glob: z.string().optional().describe(`File glob filter, eg. '*.ts'`),
});

const workingDir = resolve(process.argv[1] || process.cwd());

export default function createGrepTool() {
  return tool({
    execute: ({ pattern, path, glob }) => {
      console.log("Using Grep Tool------------------")
      const pointOfInterest = resolve(workingDir, path || ".");
      const escapedPattern = pattern.replace(/'/g, `'\\''`);
      const escapedGlob = (glob || "*").replace(/'/g, `'\\''`);
      const cmd = `grep -rn --exclude-dir=node_modules --exclude-dir=.git --include='${escapedGlob}' -E '${escapedPattern}' '${pointOfInterest}' 2>/dev/null`;

      try {
        const stdout = execSync(cmd, { encoding: "utf-8", timeout: 10_000 });
        const lines = stdout.trim().split(`\n`).filter(Boolean);

        const MAX_MATCHES = 50;
        const truncated = lines.length > MAX_MATCHES;
        const result = truncated ? lines.slice(0, MAX_MATCHES) : lines;

        return truncated
          ? result.join(`\\n`) +
              `\\n... (${lines.length}) total, showing first ${MAX_MATCHES}`
          : result.join(`\\n`) || "No matches found.";
      } catch (error: any) {
        const stdout = String(error?.stdout || "").trim();
        if (stdout) {
          const lines = stdout.split("\\n").filter(Boolean);
          const MAX_MATCHES = 50;
          const truncated = lines.length > MAX_MATCHES;
          const result = truncated ? lines.slice(0, MAX_MATCHES) : lines;

          return truncated
            ? result.join(`\\n`) +
                `\\n... (${lines.length}) total, showing first ${MAX_MATCHES}`
            : result.join(`\\n`) || "No matches found.";
        }

        return "No matches found";
      }
    },
    inputSchema: grepSchema,
    description: `
      This is a tool used to find patterns/string/regex within the files (via file path) provided. Returns matching lines with file paths.

      WHEN TO USE: when looking for a particular string/pattern/regex inside a file or multiple files within a directory. locating function definitions. searching for imports. finding TODOs or error messages.

      WHEN NOT TO USE: when reading a full file or reading a known file. There's difference between reading and searching, one is to be used for full context ingestion while the other is finding context respectively (use read instead). when running commands (use bash instead).

      DO NOT USE FOR: running commands (use bash instead), lisiting directories (use bash instead). reading files (use read instead), modifying files (use edit).

      USAGE: pattern is a regex string. glob filters by file extension. Results are capped at 50 matches.

      EXAMPLES:
        - Find all TODO comments: pattern "TODO" glob "*.ts"
        - Find function definitions: pattern "function \\\\w+" glob "*.ts:"
        - Find imports of a package: pattern "from 'express'" glob "*.ts"
    `,
  });
}
