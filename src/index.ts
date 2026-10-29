import { stepCountIs, ToolLoopAgent } from "ai";
import { xai } from "@ai-sdk/xai";
import createReadTool from "./tools/FileSystemTools/ReadFileTool.js";
import createGrepTool from "./tools/FileSystemTools/GrepFileTool.js";
import createBashTool, {
  createApproval,
} from "./tools/GeneralTools/BashTool.js";
import { buildSystemPrompt, type PromptContext } from "./system.js";
import { join, resolve } from "node:path";
import { existsSync, readFileSync } from "node:fs";
import { createLocalSandbox } from "./sanbox-local.js";
import { createJustBashSandbox } from "./sandbox-just-bash.js";
import type { SandboxLifecycle } from "./sanbox.js";

process.loadEnvFile();
const cwd = resolve(process.cwd());
const sandboxType = process.env.SANDBOX || "local";
const sandbox =
  sandboxType === "just-bash"
    ? await createJustBashSandbox(cwd)
    : createLocalSandbox(cwd);

let lifecycle: SandboxLifecycle = {};
await lifecycle.afterStart?.(sandbox);

console.error(`Sanbox: ${sandbox.type}`);
const MODEL = xai("grok-4.3");
const TOOLS = {
  read: createReadTool(sandbox),
  grep: createGrepTool(sandbox),
  bash: createBashTool(sandbox, createApproval({ mode: "interactive" })),
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

try {
  const { text, steps } = await agent.generate({ prompt });
  console.log(text + "\n");
  console.log(steps.length, "steps executed");
} finally {
  console.log("Closing harness")
  await lifecycle.beforeStop?.(sandbox)
  await sandbox.stop()
}
