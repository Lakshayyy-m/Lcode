import { stepCountIs, ToolLoopAgent } from "ai";
import { xai } from "@ai-sdk/xai";
import createReadTool from "./tools/FileSystemTools/ReadFileTool.js";
import createGrepTool from "./tools/FileSystemTools/GrepFileTool.js";
import createBashTool from "./tools/GeneralTools/BashTool.js";
import { SAFE_PREFIXES } from "./lib/constants.js";
import localOps from "./lib/LocalOpsBackend.js";

process.loadEnvFile();

const cwd = process.argv[1] || process.cwd();
const MODEL = xai("grok-4.3");
const INSTRUCTIONS = `
  You are a coding agent. \n Working directory: ${cwd}
  `;

export const agent = new ToolLoopAgent({
  model: MODEL,
  tools: {
    read: createReadTool(),
    grep: createGrepTool(),
    bash: createBashTool(localOps, SAFE_PREFIXES),
  },
  instructions: INSTRUCTIONS,
  stopWhen: stepCountIs(10),
});

const prompt = process.argv.slice(2).join(" ") || "Hello.";
console.log(prompt);
const { text, steps } = await agent.generate({ prompt });
console.log(text + "\n");
// console.log(steps);
