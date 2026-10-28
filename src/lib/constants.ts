const cwd = process.argv[1] || process.cwd();

export const SAFE_PREFIXES = [
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

export const INSTRUCTIONS = `
  You are a coding agent. \n Working directory: ${cwd}

  # Agency
  - USE your tools. Read files, search code, run commands, then answer.
  - Do NOT explain what you WOULD do. Actually do it.
  - Prefer grep for searching, read for viewing files.
  - Use bash only for commands that aren't covered by other tools.

  # Guardrails
  - Prefer simple minimal changes
  - Search before creating, and reuse existing patterns.
  - No new dependencies without asking
  `;
