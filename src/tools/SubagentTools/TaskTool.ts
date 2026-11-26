import { xai } from "@ai-sdk/xai";
import { isStepCount, stepCountIs, tool, ToolLoopAgent } from "ai";
import createGrepTool from "../FileSystemTools/GrepFileTool.js";
import createReadTool from "../FileSystemTools/ReadFileTool.js";
import type { Sandbox } from "../../sanbox.js";
import { z } from "zod";
import createBashTool, { createApproval } from "../GeneralTools/BashTool.js";

export default function createTaskTool(
  sandbox: Sandbox,
  parentTools: {
    read: ReturnType<typeof createReadTool>;
    grep: ReturnType<typeof createGrepTool>;
  },
) {
  return tool({
    description: `Delegate work to a subagent.
    Explorer (default): read-only research with a fast model. Use for searchig across files, understanding patterns, and gathering context
    Executor: implementation with a strong model and delegated trust on bash. Use for focused changes with explicit instructions and a known verification step.

    WHEN TO USE: research across many files (explorer), bulk implementation (executor)
    WHEN NOT TO USE: ambigous requirements (use askUser), architectural decisions (the parent decides).
    DO NOT USE FOR: tasks that need decisions or askUser interactions, single-step tasks the parent can do directly.
    `,
    inputSchema: z.object({
      description: z.string().describe(`What the subagent should investivate"`),
      subagentType: z
        .enum(["explorer", "executor"])
        .default("explorer")
        .describe("Subagent role"),
    }),
    execute: async ({ description, subagentType }) => {
      const agent =
        subagentType === "executor"
          ? buildExecutor(sandbox, parentTools)
          : buildExplorer(sandbox, parentTools);

      await runSubagent(subagentType, agent, description);
    },
  });
}

function buildExplorer(
  sandbox: Sandbox,
  parentTools: { read: any; grep: any },
) {
  return new ToolLoopAgent({
    model: xai("grok-4.3"),
    tools: { read: parentTools.read, grep: parentTools.grep },
    stopWhen: isStepCount(5),
    instructions: `You are an explorer agent. Invstigate and report back concisely. Working directory: ${sandbox.workingDirectory}`,
  });
}

function buildExecutor(
  sandbox: Sandbox,
  parentTools: { read: any; grep: any },
) {
  return new ToolLoopAgent({
    model: xai("grok-4.7"),
    tools: {
      read: parentTools.read,
      grep: parentTools.grep,
      bash: createBashTool(
        sandbox,
        createApproval({
          mode: "background",
          // trust: ["npm test", "npm run build", "npx tsc"],
        }),
      ),
    },
    stopWhen: stepCountIs(15),
  });
}

type Subagent = {
  generate(options: { prompt: string }): Promise<{
    text: string;
    steps: readonly unknown[];
  }>;
};

async function runSubagent(role: string, agent: Subagent, description: string) {
  try {
    console.error(`Running subagent ${role}\n`);
    const { text, steps } = await agent.generate({ prompt: description });
    return text
      ? `[${role}: ${steps.length} steps]\n${text}`
      : `(no response from ${role}).`;
  } catch (error: any) {
    return `${role} error: ${error.message}`;
  }
}
