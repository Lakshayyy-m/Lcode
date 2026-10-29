import type { Sandbox } from "../../sanbox.js";
export interface BashOperations {
    exec(command: string): Promise<{
        stdout: string;
        exitCode: number;
    }>;
}
export default function createBashTool(sandbox: Sandbox, needsApproval: (input: {
    command: string;
}) => boolean): ({
    deferLoading?: boolean;
    title?: string;
    providerOptions?: import("@ai-sdk/provider-utils").ProviderOptions;
    metadata?: import("@ai-sdk/provider").JSONObject;
    inputSchema: import("ai").FlexibleSchema<{
        command: string;
    }>;
    contextSchema?: import("ai").FlexibleSchema<import("@ai-sdk/provider-utils").Context>;
    needsApproval?: boolean | import("@ai-sdk/provider-utils").ToolNeedsApprovalFunction<{
        command: string;
    }, NoInfer<import("@ai-sdk/provider-utils").Context>>;
    onInputStart?: (options: import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    onInputDelta?: (options: {
        inputTextDelta: string;
    } & import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    onInputAvailable?: (options: {
        input: {
            command: string;
        };
    } & import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    toModelOutput?: (options: {
        toolCallId: string;
        input: {
            command: string;
        };
        output: unknown;
    }) => import("@ai-sdk/provider-utils").ToolResultOutput | PromiseLike<import("@ai-sdk/provider-utils").ToolResultOutput>;
} & {
    outputSchema?: import("ai").FlexibleSchema<unknown>;
    execute: import("ai").ToolExecuteFunction<{
        command: string;
    }, unknown, NoInfer<import("@ai-sdk/provider-utils").Context>>;
} & {
    description?: string | ((options: {
        context: NoInfer<import("@ai-sdk/provider-utils").Context>;
        experimental_sandbox?: import("ai").Experimental_SandboxSession;
    }) => string);
    strict?: boolean;
    inputExamples?: {
        input: NoInfer<{
            command: string;
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
        command: string;
    }, unknown, NoInfer<import("@ai-sdk/provider-utils").Context>>;
}) | ({
    deferLoading?: boolean;
    title?: string;
    providerOptions?: import("@ai-sdk/provider-utils").ProviderOptions;
    metadata?: import("@ai-sdk/provider").JSONObject;
    inputSchema: import("ai").FlexibleSchema<{
        command: string;
    }>;
    contextSchema?: import("ai").FlexibleSchema<import("@ai-sdk/provider-utils").Context>;
    needsApproval?: boolean | import("@ai-sdk/provider-utils").ToolNeedsApprovalFunction<{
        command: string;
    }, NoInfer<import("@ai-sdk/provider-utils").Context>>;
    onInputStart?: (options: import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    onInputDelta?: (options: {
        inputTextDelta: string;
    } & import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    onInputAvailable?: (options: {
        input: {
            command: string;
        };
    } & import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    toModelOutput?: (options: {
        toolCallId: string;
        input: {
            command: string;
        };
        output: unknown;
    }) => import("@ai-sdk/provider-utils").ToolResultOutput | PromiseLike<import("@ai-sdk/provider-utils").ToolResultOutput>;
} & {
    outputSchema?: import("ai").FlexibleSchema<unknown>;
    execute: import("ai").ToolExecuteFunction<{
        command: string;
    }, unknown, NoInfer<import("@ai-sdk/provider-utils").Context>>;
} & {
    description?: string | ((options: {
        context: NoInfer<import("@ai-sdk/provider-utils").Context>;
        experimental_sandbox?: import("ai").Experimental_SandboxSession;
    }) => string);
    strict?: boolean;
    inputExamples?: {
        input: NoInfer<{
            command: string;
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
        command: string;
    }, unknown, NoInfer<import("@ai-sdk/provider-utils").Context>>;
}) | ({
    deferLoading?: boolean;
    title?: string;
    providerOptions?: import("@ai-sdk/provider-utils").ProviderOptions;
    metadata?: import("@ai-sdk/provider").JSONObject;
    inputSchema: import("ai").FlexibleSchema<{
        command: string;
    }>;
    contextSchema?: import("ai").FlexibleSchema<import("@ai-sdk/provider-utils").Context>;
    needsApproval?: boolean | import("@ai-sdk/provider-utils").ToolNeedsApprovalFunction<{
        command: string;
    }, NoInfer<import("@ai-sdk/provider-utils").Context>>;
    onInputStart?: (options: import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    onInputDelta?: (options: {
        inputTextDelta: string;
    } & import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    onInputAvailable?: (options: {
        input: {
            command: string;
        };
    } & import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    toModelOutput?: (options: {
        toolCallId: string;
        input: {
            command: string;
        };
        output: unknown;
    }) => import("@ai-sdk/provider-utils").ToolResultOutput | PromiseLike<import("@ai-sdk/provider-utils").ToolResultOutput>;
} & {
    outputSchema?: import("ai").FlexibleSchema<unknown>;
    execute: import("ai").ToolExecuteFunction<{
        command: string;
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
        command: string;
    }, unknown, NoInfer<import("@ai-sdk/provider-utils").Context>>;
}) | ({
    deferLoading?: boolean;
    title?: string;
    providerOptions?: import("@ai-sdk/provider-utils").ProviderOptions;
    metadata?: import("@ai-sdk/provider").JSONObject;
    inputSchema: import("ai").FlexibleSchema<{
        command: string;
    }>;
    contextSchema?: import("ai").FlexibleSchema<import("@ai-sdk/provider-utils").Context>;
    needsApproval?: boolean | import("@ai-sdk/provider-utils").ToolNeedsApprovalFunction<{
        command: string;
    }, NoInfer<import("@ai-sdk/provider-utils").Context>>;
    onInputStart?: (options: import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    onInputDelta?: (options: {
        inputTextDelta: string;
    } & import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    onInputAvailable?: (options: {
        input: {
            command: string;
        };
    } & import("ai").ToolExecutionOptions<NoInfer<import("@ai-sdk/provider-utils").Context>>) => void | PromiseLike<void>;
    toModelOutput?: (options: {
        toolCallId: string;
        input: {
            command: string;
        };
        output: unknown;
    }) => import("@ai-sdk/provider-utils").ToolResultOutput | PromiseLike<import("@ai-sdk/provider-utils").ToolResultOutput>;
} & {
    outputSchema?: import("ai").FlexibleSchema<unknown>;
    execute: import("ai").ToolExecuteFunction<{
        command: string;
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
        command: string;
    }, unknown, NoInfer<import("@ai-sdk/provider-utils").Context>>;
});
export type ApprovalConfig = {
    mode: "interactive";
} | {
    mode: "background";
} | {
    mode: "delegated";
    trust: string[];
};
export declare function createApproval(config: ApprovalConfig): ({ command }: {
    command: string;
}) => boolean;
//# sourceMappingURL=BashTool.d.ts.map