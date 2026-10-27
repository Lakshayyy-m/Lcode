export default function createReadTool(): ({
    deferLoading?: boolean;
    title?: string;
    providerOptions?: import("@ai-sdk/provider-utils").ProviderOptions;
    metadata?: import("@ai-sdk/provider").JSONObject;
    inputSchema: import("ai").FlexibleSchema<{
        path: string;
        offset?: number | undefined;
        limit?: number | undefined;
    }>;
    contextSchema?: import("ai").FlexibleSchema<import("@ai-sdk/provider-utils").Context>;
    needsApproval?: boolean | import("@ai-sdk/provider-utils").ToolNeedsApprovalFunction<{
        path: string;
        offset?: number | undefined;
        limit?: number | undefined;
    }, NoInfer<import("@ai-sdk/provider-utils").Context>>;
    onInputStart?: (options: import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    onInputDelta?: (options: {
        inputTextDelta: string;
    } & import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    onInputAvailable?: (options: {
        input: {
            path: string;
            offset?: number | undefined;
            limit?: number | undefined;
        };
    } & import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    toModelOutput?: (options: {
        toolCallId: string;
        input: {
            path: string;
            offset?: number | undefined;
            limit?: number | undefined;
        };
        output: unknown;
    }) => import("@ai-sdk/provider-utils").ToolResultOutput | PromiseLike<import("@ai-sdk/provider-utils").ToolResultOutput>;
} & {
    outputSchema?: import("ai").FlexibleSchema<unknown>;
    execute: import("ai").ToolExecuteFunction<{
        path: string;
        offset?: number | undefined;
        limit?: number | undefined;
    }, unknown, NoInfer<import("@ai-sdk/provider-utils").Context>>;
} & {
    description?: string | ((options: {
        context: NoInfer<import("@ai-sdk/provider-utils").Context>;
        experimental_sandbox?: import("ai").Experimental_SandboxSession;
    }) => string);
    strict?: boolean;
    inputExamples?: {
        input: NoInfer<{
            path: string;
            offset?: number | undefined;
            limit?: number | undefined;
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
        path: string;
        offset?: number | undefined;
        limit?: number | undefined;
    }, unknown, NoInfer<import("@ai-sdk/provider-utils").Context>>;
}) | ({
    deferLoading?: boolean;
    title?: string;
    providerOptions?: import("@ai-sdk/provider-utils").ProviderOptions;
    metadata?: import("@ai-sdk/provider").JSONObject;
    inputSchema: import("ai").FlexibleSchema<{
        path: string;
        offset?: number | undefined;
        limit?: number | undefined;
    }>;
    contextSchema?: import("ai").FlexibleSchema<import("@ai-sdk/provider-utils").Context>;
    needsApproval?: boolean | import("@ai-sdk/provider-utils").ToolNeedsApprovalFunction<{
        path: string;
        offset?: number | undefined;
        limit?: number | undefined;
    }, NoInfer<import("@ai-sdk/provider-utils").Context>>;
    onInputStart?: (options: import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    onInputDelta?: (options: {
        inputTextDelta: string;
    } & import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    onInputAvailable?: (options: {
        input: {
            path: string;
            offset?: number | undefined;
            limit?: number | undefined;
        };
    } & import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    toModelOutput?: (options: {
        toolCallId: string;
        input: {
            path: string;
            offset?: number | undefined;
            limit?: number | undefined;
        };
        output: unknown;
    }) => import("@ai-sdk/provider-utils").ToolResultOutput | PromiseLike<import("@ai-sdk/provider-utils").ToolResultOutput>;
} & {
    outputSchema?: import("ai").FlexibleSchema<unknown>;
    execute: import("ai").ToolExecuteFunction<{
        path: string;
        offset?: number | undefined;
        limit?: number | undefined;
    }, unknown, NoInfer<import("@ai-sdk/provider-utils").Context>>;
} & {
    description?: string | ((options: {
        context: NoInfer<import("@ai-sdk/provider-utils").Context>;
        experimental_sandbox?: import("ai").Experimental_SandboxSession;
    }) => string);
    strict?: boolean;
    inputExamples?: {
        input: NoInfer<{
            path: string;
            offset?: number | undefined;
            limit?: number | undefined;
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
        path: string;
        offset?: number | undefined;
        limit?: number | undefined;
    }, unknown, NoInfer<import("@ai-sdk/provider-utils").Context>>;
}) | ({
    deferLoading?: boolean;
    title?: string;
    providerOptions?: import("@ai-sdk/provider-utils").ProviderOptions;
    metadata?: import("@ai-sdk/provider").JSONObject;
    inputSchema: import("ai").FlexibleSchema<{
        path: string;
        offset?: number | undefined;
        limit?: number | undefined;
    }>;
    contextSchema?: import("ai").FlexibleSchema<import("@ai-sdk/provider-utils").Context>;
    needsApproval?: boolean | import("@ai-sdk/provider-utils").ToolNeedsApprovalFunction<{
        path: string;
        offset?: number | undefined;
        limit?: number | undefined;
    }, NoInfer<import("@ai-sdk/provider-utils").Context>>;
    onInputStart?: (options: import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    onInputDelta?: (options: {
        inputTextDelta: string;
    } & import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    onInputAvailable?: (options: {
        input: {
            path: string;
            offset?: number | undefined;
            limit?: number | undefined;
        };
    } & import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    toModelOutput?: (options: {
        toolCallId: string;
        input: {
            path: string;
            offset?: number | undefined;
            limit?: number | undefined;
        };
        output: unknown;
    }) => import("@ai-sdk/provider-utils").ToolResultOutput | PromiseLike<import("@ai-sdk/provider-utils").ToolResultOutput>;
} & {
    outputSchema?: import("ai").FlexibleSchema<unknown>;
    execute: import("ai").ToolExecuteFunction<{
        path: string;
        offset?: number | undefined;
        limit?: number | undefined;
    }, unknown, NoInfer<import("@ai-sdk/provider-utils").Context>>;
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
        path: string;
        offset?: number | undefined;
        limit?: number | undefined;
    }, unknown, NoInfer<import("@ai-sdk/provider-utils").Context>>;
}) | ({
    deferLoading?: boolean;
    title?: string;
    providerOptions?: import("@ai-sdk/provider-utils").ProviderOptions;
    metadata?: import("@ai-sdk/provider").JSONObject;
    inputSchema: import("ai").FlexibleSchema<{
        path: string;
        offset?: number | undefined;
        limit?: number | undefined;
    }>;
    contextSchema?: import("ai").FlexibleSchema<import("@ai-sdk/provider-utils").Context>;
    needsApproval?: boolean | import("@ai-sdk/provider-utils").ToolNeedsApprovalFunction<{
        path: string;
        offset?: number | undefined;
        limit?: number | undefined;
    }, NoInfer<import("@ai-sdk/provider-utils").Context>>;
    onInputStart?: (options: import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    onInputDelta?: (options: {
        inputTextDelta: string;
    } & import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    onInputAvailable?: (options: {
        input: {
            path: string;
            offset?: number | undefined;
            limit?: number | undefined;
        };
    } & import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    toModelOutput?: (options: {
        toolCallId: string;
        input: {
            path: string;
            offset?: number | undefined;
            limit?: number | undefined;
        };
        output: unknown;
    }) => import("@ai-sdk/provider-utils").ToolResultOutput | PromiseLike<import("@ai-sdk/provider-utils").ToolResultOutput>;
} & {
    outputSchema?: import("ai").FlexibleSchema<unknown>;
    execute: import("ai").ToolExecuteFunction<{
        path: string;
        offset?: number | undefined;
        limit?: number | undefined;
    }, unknown, NoInfer<import("@ai-sdk/provider-utils").Context>>;
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
        path: string;
        offset?: number | undefined;
        limit?: number | undefined;
    }, unknown, NoInfer<import("@ai-sdk/provider-utils").Context>>;
});
//# sourceMappingURL=ReadFileTool.d.ts.map