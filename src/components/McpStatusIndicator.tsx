import { useState } from 'react';
import { Wifi, WifiOff, Loader2, Server, X, ChevronDown, ChevronUp, Check, AlertTriangle } from 'lucide-react';
import { useMcpConnection } from '../hooks/useMcpConnection';
import { motion, AnimatePresence } from 'framer-motion';

export default function McpStatusIndicator() {
  const { status, tools, serverInfo, connecting, connected, connect } = useMcpConnection();
  const [expanded, setExpanded] = useState(false);

  const statusConfig = {
    disconnected: { icon: WifiOff, color: 'text-gray-500', bg: 'bg-gray-100', label: 'Disconnected' },
    connecting: { icon: Loader2, color: 'text-blue-500', bg: 'bg-blue-50', label: 'Connecting...' },
    connected: { icon: Wifi, color: 'text-green-600', bg: 'bg-green-50', label: 'Connected' },
    error: { icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50', label: 'Offline Mode' },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.disconnected;
  const StatusIcon = config.icon;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="mb-2 w-72 bg-white rounded-2xl shadow-2xl border border-border overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-border bg-gradient-light">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-text">MCP Backend</span>
                </div>
                <button onClick={() => setExpanded(false)} className="p-1 hover:bg-white/50 rounded-lg">
                  <X className="w-3.5 h-3.5 text-text-muted" />
                </button>
              </div>
            </div>

            {/* Status */}
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  connected ? 'bg-green-500 animate-pulse' : status === 'connecting' ? 'bg-blue-500 animate-pulse' : 'bg-gray-400'
                }`}></div>
                <span className="text-sm font-medium text-text">{config.label}</span>
              </div>

              {serverInfo && (
                <div className="text-xs text-text-muted space-y-1">
                  <p>Server: <span className="font-medium text-text">{serverInfo.name}</span></p>
                  <p>Version: <span className="font-medium text-text">{serverInfo.version}</span></p>
                </div>
              )}

              {connected && tools.length > 0 && (
                <div className="pt-2 border-t border-border">
                  <p className="text-xs font-medium text-text mb-2">
                    <Check className="w-3 h-3 inline mr-1 text-green-600" />
                    {tools.length} tools available
                  </p>
                  <div className="max-h-32 overflow-y-auto space-y-0.5">
                    {tools.slice(0, 10).map(tool => (
                      <div key={tool.name} className="text-[11px] text-text-muted font-mono truncate px-2 py-0.5 bg-background rounded">
                        {tool.name}
                      </div>
                    ))}
                    {tools.length > 10 && (
                      <p className="text-[11px] text-text-muted px-2">+{tools.length - 10} more...</p>
                    )}
                  </div>
                </div>
              )}

              {!connected && status !== 'connecting' && (
                <button
                  onClick={connect}
                  className="w-full py-2 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {status === 'error' ? 'Retry Connection' : 'Connect to MCP'}
                </button>
              )}

              <div className="pt-2 border-t border-border">
                <p className="text-[10px] text-text-muted leading-relaxed">
                  Connected to <span className="font-medium">mcp.apper.io</span> — Apper MCP server provides database, auth, and API tools for PlantConnect.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`flex items-center gap-2 px-3 py-2 rounded-full shadow-lg border transition-all hover:shadow-xl ${config.bg} ${
          expanded ? 'ring-2 ring-primary/20' : ''
        }`}
      >
        <StatusIcon className={`w-4 h-4 ${config.color} ${status === 'connecting' ? 'animate-spin' : ''}`} />
        <span className="text-xs font-medium text-text">{config.label}</span>
        {expanded ? <ChevronDown className="w-3 h-3 text-text-muted" /> : <ChevronUp className="w-3 h-3 text-text-muted" />}
      </button>
    </div>
  );
}
