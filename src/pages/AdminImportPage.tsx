import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, Download, CheckCircle2, AlertCircle, FileText, ArrowLeft, Loader2, Eye, X } from 'lucide-react';
import { downloadCsvTemplate, parseAndValidateCSV, type ValidationResult } from '../lib/csv-import';
import { getExistingSkus, upsertMasterPlants } from '../lib/catalogue-service';

type ImportStep = 'upload' | 'preview' | 'importing' | 'complete';

export default function AdminImportPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<ImportStep>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [importResult, setImportResult] = useState<{ success: number; failed: number } | null>(null);
  const [showErrors, setShowErrors] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith('.csv')) {
      alert('Please select a CSV file');
      return;
    }

    setFile(selectedFile);
    setStep('preview');

    // Parse and validate
    const existingSkus = await getExistingSkus();
    const result = await parseAndValidateCSV(selectedFile, existingSkus);
    setValidation(result);
  };

  const handleImport = async () => {
    if (!validation || !file) return;

    setStep('importing');

    try {
      // In real app, get current user ID from auth
      const userId = 'demo-admin-user';
      const result = await upsertMasterPlants(validation.rows, userId, file.name);
      setImportResult(result);
      setStep('complete');
    } catch (error) {
      console.error('Import failed:', error);
      alert('Import failed. Please try again.');
      setStep('preview');
    }
  };

  const handleReset = () => {
    setFile(null);
    setValidation(null);
    setImportResult(null);
    setStep('upload');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/admin')}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-text" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-text">Import Plant Catalogue</h1>
            <p className="text-text-muted mt-1">Upload CSV to add or update plants</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-2 mb-8">
          {['Upload', 'Preview', 'Import'].map((label, i) => {
            const stepIndex = ['upload', 'preview', 'importing', 'complete'].indexOf(step);
            const isActive = i === stepIndex || (i === 2 && step === 'complete');
            const isComplete = i < stepIndex || (i === 1 && step === 'complete');
            
            return (
              <div key={label} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  isComplete ? 'bg-success text-white' :
                  isActive ? 'bg-primary text-white' :
                  'bg-border text-text-muted'
                }`}>
                  {isComplete ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-sm font-medium ${isActive ? 'text-primary' : 'text-text-muted'}`}>
                  {label}
                </span>
                {i < 2 && <div className="w-12 h-0.5 bg-border mx-1"></div>}
              </div>
            );
          })}
        </div>

        {/* Upload Step */}
        {step === 'upload' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-border p-8"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-text mb-2">Upload CSV File</h2>
              <p className="text-text-muted mb-6">
                Select a CSV file with plant data. Make sure it follows the template format.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Select CSV File
                </button>
                <button
                  onClick={downloadCsvTemplate}
                  className="px-6 py-3 border border-border text-text font-semibold rounded-xl hover:bg-background transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Template
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
              />

              <div className="mt-8 p-4 bg-background rounded-xl border border-border text-left">
                <h3 className="font-semibold text-sm text-text mb-2">CSV Format Requirements:</h3>
                <ul className="text-xs text-text-muted space-y-1">
                  <li>• Required columns: SKU, Common Name, Category</li>
                  <li>• Optional columns: Scientific Name, Description, Image URL, Image Source URL</li>
                  <li>• Category must be one of the predefined categories</li>
                  <li>• SKU must be unique (duplicates will be updated)</li>
                  <li>• Maximum file size: 5MB</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* Preview Step */}
        {step === 'preview' && validation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* File Info */}
            <div className="bg-white rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-text">{file?.name}</p>
                    <p className="text-xs text-text-muted">{validation.totalRows} rows detected</p>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="p-2 hover:bg-background rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-text-muted" />
                </button>
              </div>

              {/* Validation Summary */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="p-3 bg-green-50 rounded-xl">
                  <p className="text-2xl font-bold text-green-600">{validation.validRows}</p>
                  <p className="text-xs text-green-700">Valid Rows</p>
                </div>
                <div className="p-3 bg-red-50 rounded-xl">
                  <p className="text-2xl font-bold text-red-600">{validation.invalidRows}</p>
                  <p className="text-xs text-red-700">Invalid Rows</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl">
                  <p className="text-2xl font-bold text-amber-600">{validation.duplicates.length}</p>
                  <p className="text-xs text-amber-700">Duplicates</p>
                </div>
              </div>

              {/* Errors */}
              {validation.errors.length > 0 && (
                <div>
                  <button
                    onClick={() => setShowErrors(!showErrors)}
                    className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {showErrors ? 'Hide' : 'View'} {validation.errors.length} errors
                  </button>
                  {showErrors && (
                    <div className="mt-3 max-h-64 overflow-y-auto bg-red-50 rounded-xl p-4 space-y-2">
                      {validation.errors.map((err, i) => (
                        <div key={i} className="text-xs text-red-700">
                          <span className="font-medium">Row {err.row}:</span> {err.message}
                          {err.sku && <span className="text-red-500"> (SKU: {err.sku})</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Preview Table */}
            {validation.rows.length > 0 && (
              <div className="bg-white rounded-2xl border border-border p-6">
                <h3 className="font-semibold text-text mb-4 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-primary" />
                  Preview (First 10 rows)
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 font-medium text-text-muted">SKU</th>
                        <th className="text-left py-2 px-3 font-medium text-text-muted">Name</th>
                        <th className="text-left py-2 px-3 font-medium text-text-muted">Category</th>
                      </tr>
                    </thead>
                    <tbody>
                      {validation.rows.slice(0, 10).map((row, i) => (
                        <tr key={i} className="border-b border-border last:border-0">
                          <td className="py-2 px-3 font-mono text-xs">{row.sku}</td>
                          <td className="py-2 px-3">{row.common_name}</td>
                          <td className="py-2 px-3 text-text-muted">{row.category}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="px-6 py-3 border border-border text-text font-semibold rounded-xl hover:bg-background transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleImport}
                disabled={validation.validRows === 0}
                className="flex-1 py-3 bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                Import {validation.validRows} Plants
              </button>
            </div>
          </motion.div>
        )}

        {/* Importing Step */}
        {step === 'importing' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl border border-border p-12 text-center"
          >
            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-bold text-text mb-2">Importing Plants...</h2>
            <p className="text-text-muted">Please wait while we process your CSV file</p>
          </motion.div>
        )}

        {/* Complete Step */}
        {step === 'complete' && importResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl border border-border p-8 text-center"
          >
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
            <h2 className="text-2xl font-bold text-text mb-2">Import Complete!</h2>
            <p className="text-text-muted mb-6">
              Successfully imported {importResult.success} plants
              {importResult.failed > 0 && ` (${importResult.failed} failed)`}
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleReset}
                className="px-6 py-3 border border-border text-text font-semibold rounded-xl hover:bg-background transition-colors"
              >
                Import Another
              </button>
              <button
                onClick={() => navigate('/admin')}
                className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
