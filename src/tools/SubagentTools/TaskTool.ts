import { xai } from "@ai-sdk/xai";
import { isStepCount, stepCountIs, tool, ToolLoopAgent } from "ai";
import createGrepTool from "../FileSystemTools/GrepFileTool.js";
import createReadTool from "../FileSystemTools/ReadFileTool.js";
import type { Sandbox } from "../../sanbox.js";
import { z } from "zod";
import { groupEnd } from "node:console";
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
    Explorer (default): read-only research with a fast model.
    Executor: implementation with a strong model and delegated trust on bash

    WHEN TO USE: research across many files (explorer), bulk implementation (executor)
    WHEN NOT TO USE: ambigous requirements (use askUser), architectural decisions (the parent decides).
    DO NOT USE FOR: tasks that need decisions or askUser interactions.
    `,
    inputSchema: z.object({
      description: z.string().describe(`What the subagent should investivate"`),
      subagentType: z
        .enum(["explorer", "executor"])
        .default("explorer")
        .describe("Subagent role"),
    }),
    execute: async ({ description, subagentType }) => {
      if (subagentType === "executor") {
        const executor = new ToolLoopAgent({
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

        try {
          const { text, steps } = await executor.generate({
            prompt: description,
          });

          return text
            ? `[Executor: ${steps.length} steps\n ${text}`
            : "(no response frpm executor)";
        } catch (error: any) {
          return `Executor error: ${error.message}`;
        }
      }
      const explorer = new ToolLoopAgent({
        model: xai("grok-4.3"),
        tools: { read: parentTools.read, grep: parentTools.grep },
        stopWhen: isStepCount(5),
        instructions: `You are an explorer agent. Invstigate and report back concisely. Working directory: ${sandbox.workingDirectory}`,
      });

      try {
        const { text, steps } = await explorer.generate({
          prompt: description,
        });
        // console.error(`Explorer response: ${text}\nExplorer steps used: ${steps.length} steps`);
        console.error("Running Explorer Subagent");
        return text
          ? `[Explorer: ${steps.length} steps]\n${text}`
          : "(no response from subagent)";
      } catch (error: any) {
        return `Explorer error: ${error.message}`;
      }
    },
  });
}
