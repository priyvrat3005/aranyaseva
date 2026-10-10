import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, Download, FileText, CheckCircle2, AlertCircle, Database, Package, TrendingUp, Eye } from 'lucide-react';
import { fetchMasterPlants, fetchImportHistory, getExistingSkus } from '../lib/catalogue-service';
import { downloadCsvTemplate, parseAndValidateCSV, type ValidationResult } from '../lib/csv-import';
import type { MasterPlant, CatalogueImport } from '../lib/database.types';

export default function AdminDashboard() {
  const [plants, setPlants] = useState<MasterPlant[]>([]);
  const [imports, setImports] = useState<CatalogueImport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [plantsData, importsData] = await Promise.all([
        fetchMasterPlants(),
        fetchImportHistory(),
      ]);
      setPlants(plantsData);
      setImports(importsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    totalPlants: plants.length,
    activePlants: plants.filter(p => p.active).length,
    categories: new Set(plants.map(p => p.category)).size,
    totalImports: imports.length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-muted">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text">Admin Dashboard</h1>
            <p className="text-text-muted mt-1">Manage plant catalogue and imports</p>
          </div>
          <Link
            to="/admin/import"
            className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors"
          >
            <Upload className="w-4 h-4" />
            Upload CSV
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Plants', value: stats.totalPlants, icon: Package, color: 'bg-blue-100 text-blue-600' },
            { label: 'Active Plants', value: stats.activePlants, icon: CheckCircle2, color: 'bg-green-100 text-green-600' },
            { label: 'Categories', value: stats.categories, icon: Database, color: 'bg-purple-100 text-purple-600' },
            { label: 'Total Imports', value: stats.totalImports, icon: TrendingUp, color: 'bg-orange-100 text-orange-600' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-border p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl font-bold text-text">{stat.value}</p>
              <p className="text-sm text-text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl border border-border p-6"
          >
            <h2 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              Bulk Import
            </h2>
            <p className="text-sm text-text-muted mb-4">
              Upload a CSV file to add or update multiple plants at once. Download the template first to see the required format.
            </p>
            <div className="flex gap-3">
              <Link
                to="/admin/import"
                className="flex-1 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-xl text-center transition-colors"
              >
                Upload CSV
              </Link>
              <button
                onClick={downloadCsvTemplate}
                className="flex-1 py-2.5 border border-border text-text text-sm font-medium rounded-xl hover:bg-background transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Template
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl border border-border p-6"
          >
            <h2 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              View Catalogue
            </h2>
            <p className="text-sm text-text-muted mb-4">
              Browse and manage all master plant records. View details, images, and categories.
            </p>
            <Link
              to="/admin/catalogue"
              className="w-full py-2.5 bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium rounded-xl text-center transition-colors flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              View All Plants
            </Link>
          </motion.div>
        </div>

        {/* Recent Imports */}
        <div className="bg-white rounded-2xl border border-border p-6">
          <h2 className="text-lg font-bold text-text mb-4">Recent Imports</h2>
          {imports.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-text-muted mx-auto mb-3" />
              <p className="text-text-muted">No imports yet</p>
              <p className="text-sm text-text-muted mt-1">Upload your first CSV to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {imports.slice(0, 5).map(imp => (
                <div key={imp.id} className="flex items-center justify-between p-4 bg-background rounded-xl border border-border">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      imp.failed_rows > 0 ? 'bg-amber-100' : 'bg-green-100'
                    }`}>
                      {imp.failed_rows > 0 ? (
                        <AlertCircle className="w-5 h-5 text-amber-600" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-text">{imp.filename}</p>
                      <p className="text-xs text-text-muted">
                        {imp.successful_rows} successful, {imp.failed_rows} failed • {new Date(imp.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-text">{imp.total_rows} rows</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
