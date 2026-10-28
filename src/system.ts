export interface PromptContext {
  workingDirectory: string;
  sandboxType: string;
  toolNames: string[];
  gitBranch?: string;
  projectContext?: string;
}

export function buildSystemPrompt(ctx: PromptContext): string {
  let instructions: string[] = [];

  instructions.push(
    `You are a coding agent working in: ${ctx.workingDirectory}`,
  );

  instructions.push(`Sandbox: ${ctx.sandboxType}`);

  instructions.push(`
    # Agency
    - USE your tools. Read files, search code, run commands, then answer.
    - Do NOT explain what you WOULD do. Actually do it.
    - Available tools: ${ctx.toolNames.join(", ")}
    `);

  if (ctx.gitBranch) {
    instructions.push(`- Current branch: ${ctx.gitBranch}`);
  }

  instructions.push(`
    # Guardrails
    - Prefer simple, minimal changes
    - Search before creating, and reuse existing patterns.
    - No new dependencies without asking
    `);

  if (ctx.projectContext) {
    instructions.push(`
      # Project Instructions (from AGENTS.md)
      ${ctx.projectContext}
      `);
  }

  return instructions.join("\n");
}
