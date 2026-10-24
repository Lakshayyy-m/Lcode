import { stepCountIs, ToolLoopAgent } from "ai";
import { xai } from "@ai-sdk/xai";
import createReadTool from "./tools/ReadFilesTool.js";

process.loadEnvFile();

const cwd = process.argv[2] || process.cwd();
const MODEL = xai("grok-4.3");
const INSTRUCTIONS = `
  You are a coding agent. \n Working directory: ${cwd}
  `;

export const agent = new ToolLoopAgent({
  model: MODEL,
  tools: { read: createReadTool() },
  instructions: INSTRUCTIONS,
  stopWhen: stepCountIs(10),
});

const prompt = process.argv.slice(3).join(" ") || "Hello.";
console.log(prompt);
const { text, steps } = await agent.generate({ prompt });
console.log(text);
console.log(steps);
