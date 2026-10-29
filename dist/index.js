import { stepCountIs, ToolLoopAgent } from "ai";
import { xai } from "@ai-sdk/xai";
import createReadTool from "./tools/FileSystemTools/ReadFileTool.js";
import createGrepTool from "./tools/FileSystemTools/GrepFileTool.js";
import createBashTool, { createApproval, } from "./tools/GeneralTools/BashTool.js";
import localOps from "./lib/LocalOpsBackend.js";
import { buildSystemPrompt } from "./system.js";
import { join, resolve } from "node:path";
import { existsSync, readFileSync } from "node:fs";
process.loadEnvFile();
const cwd = resolve(process.argv[1] || process.cwd());
const MODEL = xai("grok-4.3");
const TOOLS = {
    read: createReadTool(),
    grep: createGrepTool(),
    bash: createBashTool(localOps, createApproval({ mode: "interactive" })),
};
const agentsPath = join(cwd, "AGENTS.md");
const projectContext = existsSync(agentsPath)
    ? readFileSync(agentsPath, "utf-8")
    : undefined;
export const agent = new ToolLoopAgent({
    model: MODEL,
    tools: TOOLS,
    instructions: buildSystemPrompt({
        workingDirectory: cwd,
        sandboxType: "local",
        toolNames: Object.keys(TOOLS),
        projectContext,
    }),
    stopWhen: stepCountIs(50),
});
const prompt = process.argv.slice(2).join(" ") || "Hello.";
console.log(prompt);
const { text, steps } = await agent.generate({ prompt });
console.log(text + "\n");
// console.log(steps);
//# sourceMappingURL=index.js.map