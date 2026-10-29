import type { Sandbox } from "../../sanbox.js";
export default function createGrepTool(sandbox: Sandbox): ({
    deferLoading?: boolean;
    title?: string;
    providerOptions?: import("@ai-sdk/provider-utils").ProviderOptions;
    metadata?: import("@ai-sdk/provider").JSONObject;
    inputSchema: import("ai").FlexibleSchema<{
        pattern: string;
        path?: string | undefined;
        glob?: string | undefined;
    }>;
    contextSchema?: import("ai").FlexibleSchema<import("@ai-sdk/provider-utils").Context>;
    needsApproval?: boolean | import("@ai-sdk/provider-utils").ToolNeedsApprovalFunction<{
        pattern: string;
        path?: string | undefined;
        glob?: string | undefined;
    }, NoInfer<import("@ai-sdk/provider-utils").Context>>;
    onInputStart?: (options: import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    onInputDelta?: (options: {
        inputTextDelta: string;
    } & import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    onInputAvailable?: (options: {
        input: {
            pattern: string;
            path?: string | undefined;
            glob?: string | undefined;
        };
    } & import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    toModelOutput?: (options: {
        toolCallId: string;
        input: {
            pattern: string;
            path?: string | undefined;
            glob?: string | undefined;
        };
        output: string;
    }) => import("@ai-sdk/provider-utils").ToolResultOutput | PromiseLike<import("@ai-sdk/provider-utils").ToolResultOutput>;
} & {
    outputSchema?: import("ai").FlexibleSchema<string>;
    execute: import("ai").ToolExecuteFunction<{
        pattern: string;
        path?: string | undefined;
        glob?: string | undefined;
    }, string, NoInfer<import("@ai-sdk/provider-utils").Context>>;
} & {
    description?: string | ((options: {
        context: NoInfer<import("@ai-sdk/provider-utils").Context>;
        experimental_sandbox?: import("ai").Experimental_SandboxSession;
    }) => string);
    strict?: boolean;
    inputExamples?: {
        input: NoInfer<{
            pattern: string;
            path?: string | undefined;
            glob?: string | undefined;
        }>;
    }[];
    id?: never;
    isProviderExecuted?: never;
    args?: never;
    supportsDeferredResults?: never;
} & {
    type?: undefined | 'function';
} & {
    execute: import("ai").ToolExecuteFunction<{
        pattern: string;
        path?: string | undefined;
        glob?: string | undefined;
    }, string, NoInfer<import("@ai-sdk/provider-utils").Context>>;
}) | ({
    deferLoading?: boolean;
    title?: string;
    providerOptions?: import("@ai-sdk/provider-utils").ProviderOptions;
    metadata?: import("@ai-sdk/provider").JSONObject;
    inputSchema: import("ai").FlexibleSchema<{
        pattern: string;
        path?: string | undefined;
        glob?: string | undefined;
    }>;
    contextSchema?: import("ai").FlexibleSchema<import("@ai-sdk/provider-utils").Context>;
    needsApproval?: boolean | import("@ai-sdk/provider-utils").ToolNeedsApprovalFunction<{
        pattern: string;
        path?: string | undefined;
        glob?: string | undefined;
    }, NoInfer<import("@ai-sdk/provider-utils").Context>>;
    onInputStart?: (options: import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    onInputDelta?: (options: {
        inputTextDelta: string;
    } & import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    onInputAvailable?: (options: {
        input: {
            pattern: string;
            path?: string | undefined;
            glob?: string | undefined;
        };
    } & import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    toModelOutput?: (options: {
        toolCallId: string;
        input: {
            pattern: string;
            path?: string | undefined;
            glob?: string | undefined;
        };
        output: string;
    }) => import("@ai-sdk/provider-utils").ToolResultOutput | PromiseLike<import("@ai-sdk/provider-utils").ToolResultOutput>;
} & {
    outputSchema?: import("ai").FlexibleSchema<string>;
    execute: import("ai").ToolExecuteFunction<{
        pattern: string;
        path?: string | undefined;
        glob?: string | undefined;
    }, string, NoInfer<import("@ai-sdk/provider-utils").Context>>;
} & {
    description?: string | ((options: {
        context: NoInfer<import("@ai-sdk/provider-utils").Context>;
        experimental_sandbox?: import("ai").Experimental_SandboxSession;
    }) => string);
    strict?: boolean;
    inputExamples?: {
        input: NoInfer<{
            pattern: string;
            path?: string | undefined;
            glob?: string | undefined;
        }>;
    }[];
    id?: never;
    isProviderExecuted?: never;
    args?: never;
    supportsDeferredResults?: never;
} & {
    type: 'dynamic';
} & {
    execute: import("ai").ToolExecuteFunction<{
        pattern: string;
        path?: string | undefined;
        glob?: string | undefined;
    }, string, NoInfer<import("@ai-sdk/provider-utils").Context>>;
}) | ({
    deferLoading?: boolean;
    title?: string;
    providerOptions?: import("@ai-sdk/provider-utils").ProviderOptions;
    metadata?: import("@ai-sdk/provider").JSONObject;
    inputSchema: import("ai").FlexibleSchema<{
        pattern: string;
        path?: string | undefined;
        glob?: string | undefined;
    }>;
    contextSchema?: import("ai").FlexibleSchema<import("@ai-sdk/provider-utils").Context>;
    needsApproval?: boolean | import("@ai-sdk/provider-utils").ToolNeedsApprovalFunction<{
        pattern: string;
        path?: string | undefined;
        glob?: string | undefined;
    }, NoInfer<import("@ai-sdk/provider-utils").Context>>;
    onInputStart?: (options: import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    onInputDelta?: (options: {
        inputTextDelta: string;
    } & import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    onInputAvailable?: (options: {
        input: {
            pattern: string;
            path?: string | undefined;
            glob?: string | undefined;
        };
    } & import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    toModelOutput?: (options: {
        toolCallId: string;
        input: {
            pattern: string;
            path?: string | undefined;
            glob?: string | undefined;
        };
        output: string;
    }) => import("@ai-sdk/provider-utils").ToolResultOutput | PromiseLike<import("@ai-sdk/provider-utils").ToolResultOutput>;
} & {
    outputSchema?: import("ai").FlexibleSchema<string>;
    execute: import("ai").ToolExecuteFunction<{
        pattern: string;
        path?: string | undefined;
        glob?: string | undefined;
    }, string, NoInfer<import("@ai-sdk/provider-utils").Context>>;
} & {
    type: 'provider';
    id: `${string}.${string}`;
    args: Record<string, unknown>;
    description?: never;
    strict?: never;
    inputExamples?: never;
} & {
    isProviderExecuted: false;
    supportsDeferredResults?: never;
} & {
    execute: import("ai").ToolExecuteFunction<{
        pattern: string;
        path?: string | undefined;
        glob?: string | undefined;
    }, string, NoInfer<import("@ai-sdk/provider-utils").Context>>;
}) | ({
    deferLoading?: boolean;
    title?: string;
    providerOptions?: import("@ai-sdk/provider-utils").ProviderOptions;
    metadata?: import("@ai-sdk/provider").JSONObject;
    inputSchema: import("ai").FlexibleSchema<{
        pattern: string;
        path?: string | undefined;
        glob?: string | undefined;
    }>;
    contextSchema?: import("ai").FlexibleSchema<import("@ai-sdk/provider-utils").Context>;
    needsApproval?: boolean | import("@ai-sdk/provider-utils").ToolNeedsApprovalFunction<{
        pattern: string;
        path?: string | undefined;
        glob?: string | undefined;
    }, NoInfer<import("@ai-sdk/provider-utils").Context>>;
    onInputStart?: (options: import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    onInputDelta?: (options: {
        inputTextDelta: string;
    } & import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    onInputAvailable?: (options: {
        input: {
            pattern: string;
            path?: string | undefined;
            glob?: string | undefined;
        };
    } & import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    toModelOutput?: (options: {
        toolCallId: string;
        input: {
            pattern: string;
            path?: string | undefined;
            glob?: string | undefined;
        };
        output: string;
    }) => import("@ai-sdk/provider-utils").ToolResultOutput | PromiseLike<import("@ai-sdk/provider-utils").ToolResultOutput>;
} & {
    outputSchema?: import("ai").FlexibleSchema<string>;
    execute: import("ai").ToolExecuteFunction<{
        pattern: string;
        path?: string | undefined;
        glob?: string | undefined;
    }, string, NoInfer<import("@ai-sdk/provider-utils").Context>>;
} & {
    type: 'provider';
    id: `${string}.${string}`;
    args: Record<string, unknown>;
    description?: never;
    strict?: never;
    inputExamples?: never;
} & {
    isProviderExecuted: true;
    supportsDeferredResults?: boolean;
} & {
    execute: import("ai").ToolExecuteFunction<{
        pattern: string;
        path?: string | undefined;
        glob?: string | undefined;
    }, string, NoInfer<import("@ai-sdk/provider-utils").Context>>;
});
//# sourceMappingURL=GrepFileTool.d.ts.map