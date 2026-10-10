import { useState, useEffect, useCallback } from 'react';
import { mcpClient } from '../lib/mcp-client';
import { ensureMcpConnection, isMcpConnected } from '../lib/data-service';

/**
 * Hook to manage MCP connection state
 */
export function useMcpConnection() {
  const [status, setStatus] = useState<string>(mcpClient.getStatus());
  const [tools, setTools] = useState(mcpClient.getTools());
  const [serverInfo, setServerInfo] = useState(mcpClient.getServerInfo());
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    const unsubscribe = mcpClient.onStatusChange((newStatus) => {
      setStatus(newStatus);
      setTools(mcpClient.getTools());
      setServerInfo(mcpClient.getServerInfo());
    });
    return unsubscribe;
  }, []);

  const connect = useCallback(async () => {
    setConnecting(true);
    try {
      await ensureMcpConnection();
      setStatus(mcpClient.getStatus());
      setTools(mcpClient.getTools());
      setServerInfo(mcpClient.getServerInfo());
    } catch {
      setStatus('error');
    } finally {
      setConnecting(false);
    }
  }, []);

  return {
    status,
    tools,
    serverInfo,
    connecting,
    connected: isMcpConnected(),
    connect,
  };
}
