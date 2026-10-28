import { stepCountIs, ToolLoopAgent } from "ai";
import { xai } from "@ai-sdk/xai";
import createReadTool from "./tools/FileSystemTools/ReadFileTool.js";
import createGrepTool from "./tools/FileSystemTools/GrepFileTool.js";
import createBashTool, {
  createApproval,
} from "./tools/GeneralTools/BashTool.js";
import localOps from "./lib/LocalOpsBackend.js";
import { INSTRUCTIONS } from "./lib/constants.js";

process.loadEnvFile();

const MODEL = xai("grok-4.3");

export const agent = new ToolLoopAgent({
  model: MODEL,
  tools: {
    read: createReadTool(),
    grep: createGrepTool(),
    bash: createBashTool(localOps, createApproval({ mode: "interactive" })),
  },
  instructions: INSTRUCTIONS,
  stopWhen: stepCountIs(10),
});

const prompt = process.argv.slice(2).join(" ") || "Hello.";
console.log(prompt);
const { text, steps } = await agent.generate({ prompt });
console.log(text + "\n");
// console.log(steps);
