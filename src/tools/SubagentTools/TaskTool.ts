import { xai } from "@ai-sdk/xai";
import { isStepCount, tool, ToolLoopAgent } from "ai";
import createGrepTool from "../FileSystemTools/GrepFileTool.js";
import createReadTool from "../FileSystemTools/ReadFileTool.js";
import type { Sandbox } from "../../sanbox.js";
import { z } from "zod";

const MODEL = xai("grok-4.3");
export default function createTaskTool(
  sandbox: Sandbox,
  parentTools: {
    read: ReturnType<typeof createReadTool>;
    grep: ReturnType<typeof createGrepTool>;
  },
) {
  return tool({
    description: `Delegate research to a read-only subagent.
    WHEN TO USE: investigating a codebase, finding patterns, gathering context across many files.
    WHEN NOT TO USE: making changes (the subagentn cannot or run commands).
    DO NOT USE FOR: tasks that need decisions or askUser interactions.
    `,
    inputSchema: z.object({
      description: z.string().describe(`What the subagent should investivate"`),
    }),
    execute: async ({ description }) => {
      const agent = new ToolLoopAgent({
        model: MODEL,
        tools: { read: parentTools.read, grep: parentTools.grep },
        stopWhen: isStepCount(5),
        instructions: `You are an explorer agent. Invstigate and report back concisely. Working directory: ${sandbox.workingDirectory}`,
      });

      try {
        const { text, steps } = await agent.generate({ prompt: description });
        // console.error(`Explorer response: ${text}\nExplorer steps used: ${steps.length} steps`);
        console.error("Running Explorer Subagent");
        return text
          ? `[Explorer: ${steps.length} steps]\n${text}`
          : "(no response from subagent)";
      } catch (error: any) {
        return `Subagent error: ${error.message}`;
      }
    },
  });
}
