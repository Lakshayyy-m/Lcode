export interface PromptContext {
    workingDirectory: string;
    sandboxType: string;
    toolNames: string[];
    gitBranch?: string;
    projectContext?: string | undefined;
}
export declare function buildSystemPrompt(ctx: PromptContext): string;
//# sourceMappingURL=system.d.ts.map