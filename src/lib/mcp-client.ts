/**
 * PlantConnect MCP Client
 * 
 * Communicates with the Apper.io MCP server using JSON-RPC 2.0 over HTTP POST.
 * This client handles the MCP protocol lifecycle: initialize → tools/list → tools/call
 * 
 * MCP Server: https://mcp.apper.io/v1/connect
 * Protocol: JSON-RPC 2.0 (request/response mode, no SSE)
 */

const MCP_SERVER_URL = 'https://mcp.apper.io/v1/connect';

// JSON-RPC 2.0 Types
interface JsonRpcRequest {
  jsonrpc: '2.0';
  id: number | string;
  method: string;
  params?: Record<string, unknown>;
}

interface JsonRpcResponse<T = unknown> {
  jsonrpc: '2.0';
  id: number | string;
  result?: T;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
}

// MCP Protocol Types
interface McpTool {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpInitializeResult {
  protocolVersion: string;
  capabilities: {
    tools?: { listChanged?: boolean };
    resources?: { subscribe?: boolean; listChanged?: boolean };
    prompts?: { listChanged?: boolean };
  };
  serverInfo: {
    name: string;
    version: string;
  };
}

interface McpToolsListResult {
  tools: McpTool[];
}

interface McpToolCallResult {
  content: Array<{
    type: string;
    text?: string;
    [key: string]: unknown;
  }>;
  isError?: boolean;
}

class McpClient {
  private requestId = 0;
  private initialized = false;
  private serverInfo: McpInitializeResult['serverInfo'] | null = null;
  private tools: McpTool[] = [];
  private connectionStatus: 'disconnected' | 'connecting' | 'connected' | 'error' = 'disconnected';
  private listeners: Set<(status: string) => void> = new Set();

  private nextId(): number {
    return ++this.requestId;
  }

  private notifyListeners() {
    this.listeners.forEach(fn => fn(this.connectionStatus));
  }

  onStatusChange(listener: (status: string) => void): () => void {
    this.listeners.add(listener);
    return () => { this.listeners.delete(listener); };
  }

  getStatus() {
    return this.connectionStatus;
  }

  getServerInfo() {
    return this.serverInfo;
  }

  getTools() {
    return this.tools;
  }

  /**
   * Send a JSON-RPC 2.0 request to the MCP server
   */
  private async sendRequest<T>(method: string, params?: Record<string, unknown>): Promise<T> {
    const request: JsonRpcRequest = {
      jsonrpc: '2.0',
      id: this.nextId(),
      method,
      params,
    };

    try {
      const response = await fetch(MCP_SERVER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data: JsonRpcResponse<T> = await response.json();

      if (data.error) {
        throw new Error(`MCP Error ${data.error.code}: ${data.error.message}`);
      }

      return data.result as T;
    } catch (error) {
      console.error(`MCP request failed [${method}]:`, error);
      throw error;
    }
  }

  /**
   * Initialize the MCP connection
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;

    this.connectionStatus = 'connecting';
    this.notifyListeners();

    try {
      // Step 1: Send initialize request
      const result = await this.sendRequest<McpInitializeResult>('initialize', {
        protocolVersion: '2025-03-26',
        capabilities: {},
        clientInfo: {
          name: 'plantconnect',
          version: '1.0.0',
        },
      });

      this.serverInfo = result.serverInfo;
      this.initialized = true;

      // Step 2: Send initialized notification
      await this.sendRequest('notifications/initialized', {});

      // Step 3: List available tools
      const toolsResult = await this.sendRequest<McpToolsListResult>('tools/list', {});
      this.tools = toolsResult.tools;

      this.connectionStatus = 'connected';
      this.notifyListeners();

      console.log(`✅ MCP Connected to ${this.serverInfo?.name} v${this.serverInfo?.version}`);
      console.log(`📦 ${this.tools.length} tools available`);
    } catch (error) {
      this.connectionStatus = 'error';
      this.notifyListeners();
      console.error('❌ MCP connection failed:', error);
      throw error;
    }
  }

  /**
   * Call an MCP tool
   */
  async callTool(name: string, args: Record<string, unknown> = {}): Promise<McpToolCallResult> {
    if (!this.initialized) {
      await this.initialize();
    }

    const result = await this.sendRequest<McpToolCallResult>('tools/call', {
      name,
      arguments: args,
    });

    return result;
  }

  /**
   * Parse tool call result as JSON
   */
  async callToolJson<T>(name: string, args: Record<string, unknown> = {}): Promise<T> {
    const result = await this.callTool(name, args);

    if (result.isError) {
      const errorText = result.content.find(c => c.type === 'text')?.text || 'Unknown error';
      throw new Error(`Tool error: ${errorText}`);
    }

    const textContent = result.content.find(c => c.type === 'text');
    if (!textContent?.text) {
      throw new Error('No text content in tool response');
    }

    try {
      return JSON.parse(textContent.text) as T;
    } catch {
      // If not valid JSON, return the text as-is cast to T
      return textContent.text as unknown as T;
    }
  }
}

// Singleton instance
export const mcpClient = new McpClient();
export default mcpClient;

export type { McpTool, McpToolCallResult, McpInitializeResult };
