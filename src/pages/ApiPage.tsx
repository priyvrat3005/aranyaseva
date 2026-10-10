import { motion } from 'framer-motion';
import { Server, Database, Shield, CreditCard, Webhook, Zap, CheckCircle2, ArrowRight, Globe, Lock } from 'lucide-react';
import { useMcpConnection } from '../hooks/useMcpConnection';
import { Link } from 'react-router-dom';

export default function ApiPage() {
  const { status, tools, serverInfo, connecting, connected, connect } = useMcpConnection();

  const endpoints = [
    { method: 'POST', path: '/api/auth/register', desc: 'Register new customer/vendor', auth: false },
    { method: 'POST', path: '/api/auth/login', desc: 'Authenticate user', auth: false },
    { method: 'GET', path: '/api/products', desc: 'List all products with filters', auth: false },
    { method: 'GET', path: '/api/products/:slug', desc: 'Get product details', auth: false },
    { method: 'GET', path: '/api/vendors', desc: 'List verified nurseries', auth: false },
    { method: 'POST', path: '/api/cart/items', desc: 'Add item to cart', auth: true },
    { method: 'POST', path: '/api/orders', desc: 'Place multi-vendor order', auth: true },
    { method: 'POST', path: '/api/payments/create-order', desc: 'Create Razorpay order', auth: true },
    { method: 'POST', path: '/api/payments/verify', desc: 'Verify payment signature', auth: true },
    { method: 'POST', path: '/api/reviews', desc: 'Submit product review', auth: true },
    { method: 'POST', path: '/api/services/book', desc: 'Book plantation service', auth: true },
    { method: 'POST', path: '/api/vendors/register', desc: 'Vendor application', auth: false },
  ];

  const mcpTools = [
    { name: 'list_records', desc: 'Query records from any table', icon: Database },
    { name: 'get_record', desc: 'Fetch single record by ID', icon: Database },
    { name: 'insert_record', desc: 'Create new records', icon: Database },
    { name: 'update_record', desc: 'Modify existing records', icon: Database },
    { name: 'delete_record', desc: 'Remove records', icon: Database },
    { name: 'count_records', desc: 'Get record counts', icon: Database },
    { name: 'login', desc: 'Authenticate users', icon: Shield },
    { name: 'signup', desc: 'Register new users', icon: Shield },
    { name: 'create_table', desc: 'Create database tables', icon: Database },
    { name: 'run_query', desc: 'Execute complex queries', icon: Zap },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-green relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-full mb-6">
              <Server className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Backend Infrastructure</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
              API & MCP Integration
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              PlantConnect is powered by Apper.io's MCP server — providing enterprise-grade database, authentication, payments, and API infrastructure.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Connection Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-border p-6 lg:p-8 mb-10"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                connected ? 'bg-green-100' : status === 'connecting' ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <Server className={`w-7 h-7 ${
                  connected ? 'text-green-600' : status === 'connecting' ? 'text-blue-600' : 'text-gray-500'
                }`} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-text">MCP Server Connection</h2>
                <p className="text-sm text-text-muted mt-1">
                  Endpoint: <code className="px-2 py-0.5 bg-background rounded text-xs font-mono">https://mcp.apper.io/v1/connect</code>
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className={`w-2 h-2 rounded-full ${
                    connected ? 'bg-green-500 animate-pulse' : status === 'connecting' ? 'bg-blue-500 animate-pulse' : 'bg-gray-400'
                  }`}></div>
                  <span className="text-sm font-medium">
                    {connected ? `Connected — ${tools.length} tools available` :
                     status === 'connecting' ? 'Connecting...' :
                     status === 'error' ? 'Offline mode (using local data)' : 'Not connected'}
                  </span>
                </div>
                {serverInfo && (
                  <p className="text-xs text-text-muted mt-1">
                    Server: {serverInfo.name} v{serverInfo.version}
                  </p>
                )}
              </div>
            </div>
            {!connected && (
              <button
                onClick={connect}
                disabled={connecting}
                className="px-6 py-3 bg-primary hover:bg-primary-dark disabled:opacity-50 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
              >
                {connecting ? (
                  <>Connecting... <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div></>
                ) : (
                  <>Connect <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            )}
          </div>
        </motion.div>

        {/* Architecture Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Database, title: 'PostgreSQL', desc: 'Managed database via Apper', color: 'bg-blue-100 text-blue-600' },
            { icon: Shield, title: 'Auth & RBAC', desc: 'Email, Google OAuth, Phone OTP', color: 'bg-purple-100 text-purple-600' },
            { icon: CreditCard, title: 'Razorpay', desc: 'UPI, Cards, Net Banking, COD', color: 'bg-indigo-100 text-indigo-600' },
            { icon: Webhook, title: 'Webhooks', desc: 'Payment & order events', color: 'bg-orange-100 text-orange-600' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-border p-5"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color} mb-3`}>
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-text">{item.title}</h3>
              <p className="text-sm text-text-muted mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* MCP Tools Available */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-text mb-6">MCP Tools Available</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {mcpTools.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-border"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <tool.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-mono font-medium text-text truncate">{tool.name}</p>
                  <p className="text-xs text-text-muted truncate">{tool.desc}</p>
                </div>
                {connected && <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 ml-auto" />}
              </motion.div>
            ))}
            {tools.length > 0 && (
              <div className="flex items-center justify-center p-3 bg-primary/5 rounded-xl border border-primary/20">
                <p className="text-sm font-medium text-primary">+ {tools.length - mcpTools.length} more tools from server</p>
              </div>
            )}
          </div>
        </div>

        {/* REST API Endpoints */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-text mb-6">REST API Endpoints</h2>
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-background">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Method</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Endpoint</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider hidden md:table-cell">Description</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Auth</th>
                  </tr>
                </thead>
                <tbody>
                  {endpoints.map((ep, i) => (
                    <tr key={i} className="border-b border-border last:border-0 hover:bg-background/50 transition-colors">
                      <td className="px-5 py-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          ep.method === 'GET' ? 'bg-blue-100 text-blue-700' :
                          ep.method === 'POST' ? 'bg-green-100 text-green-700' :
                          ep.method === 'PATCH' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {ep.method}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <code className="text-sm font-mono text-text">{ep.path}</code>
                      </td>
                      <td className="px-5 py-3 hidden md:table-cell">
                        <span className="text-sm text-text-muted">{ep.desc}</span>
                      </td>
                      <td className="px-5 py-3">
                        {ep.auth ? (
                          <Lock className="w-4 h-4 text-amber-500" />
                        ) : (
                          <Globe className="w-4 h-4 text-green-500" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Data Models */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-text mb-6">Database Models</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[
              { name: 'User', fields: 11, icon: '👤' },
              { name: 'Vendor', fields: 18, icon: '🏪' },
              { name: 'Product', fields: 24, icon: '🌿' },
              { name: 'Category', fields: 8, icon: '📂' },
              { name: 'Order', fields: 12, icon: '📦' },
              { name: 'VendorOrder', fields: 9, icon: '🏷️' },
              { name: 'Payment', fields: 10, icon: '💳' },
              { name: 'Review', fields: 11, icon: '⭐' },
              { name: 'Cart', fields: 3, icon: '🛒' },
              { name: 'CartItem', fields: 5, icon: '📋' },
              { name: 'Wishlist', fields: 3, icon: '❤️' },
              { name: 'Coupon', fields: 11, icon: '🎟️' },
              { name: 'Commission', fields: 6, icon: '💰' },
              { name: 'Payout', fields: 6, icon: '🏦' },
              { name: 'Service', fields: 10, icon: '🌳' },
              { name: 'Booking', fields: 10, icon: '📅' },
              { name: 'Notification', fields: 6, icon: '🔔' },
              { name: 'VendorDocument', fields: 5, icon: '📄' },
            ].map((model, i) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.02 }}
                className="bg-white rounded-xl border border-border p-4 hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{model.icon}</span>
                  <h3 className="font-semibold text-sm text-text">{model.name}</h3>
                </div>
                <p className="text-xs text-text-muted">{model.fields} fields</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-light rounded-2xl border border-border p-8 text-center">
          <h2 className="text-xl font-bold text-text mb-2">Want to Build on PlantConnect?</h2>
          <p className="text-text-muted mb-4">Join as a vendor or explore our API documentation</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/vendor/register"
              className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors"
            >
              Become a Vendor
            </Link>
            <a
              href="https://mcp.apper.io/v1/connect"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-border text-text font-semibold rounded-xl hover:bg-white transition-colors"
            >
              MCP Server Docs →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
