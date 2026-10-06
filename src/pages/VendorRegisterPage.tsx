import { useState } from 'react';
import { motion } from 'framer-motion';
import { Store, MapPin, FileText, CreditCard, Tag, CheckCircle2, ArrowRight, Leaf } from 'lucide-react';

export default function VendorRegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { icon: Store, label: 'Business Details' },
    { icon: MapPin, label: 'Location' },
    { icon: FileText, label: 'Documents' },
    { icon: CreditCard, label: 'Bank Details' },
    { icon: Tag, label: 'Categories' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-full mb-4">
              <Leaf className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Vendor Registration</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">Sell Your Plants on PlantConnect</h1>
            <p className="text-white/80 max-w-lg mx-auto">Join 500+ nurseries and reach 50,000+ plant lovers across India. Start selling in minutes.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-10">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center">
              <div className={`flex flex-col items-center ${i < currentStep ? 'text-primary' : i === currentStep - 1 ? 'text-primary' : 'text-text-muted'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                  i < currentStep - 1 ? 'bg-primary border-primary text-white' :
                  i === currentStep - 1 ? 'border-primary bg-primary/10' : 'border-border bg-white'
                }`}>
                  {i < currentStep - 1 ? <CheckCircle2 className="w-5 h-5" /> : <step.icon className="w-4 h-4" />}
                </div>
                <span className="text-[10px] mt-1 hidden sm:block font-medium">{step.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-8 sm:w-16 h-0.5 mx-1 ${i < currentStep - 1 ? 'bg-primary' : 'bg-border'}`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl border border-border p-6 lg:p-8"
        >
          {currentStep === 1 && (
            <div>
              <h2 className="text-xl font-bold text-text mb-6">Business Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Business Name *</label>
                  <input type="text" placeholder="Enter your nursery name" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Business Email *</label>
                  <input type="email" placeholder="your@email.com" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Phone Number *</label>
                  <input type="tel" placeholder="+91 98765 43210" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Description *</label>
                  <textarea rows={4} placeholder="Tell us about your nursery, specialties, and experience..." className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-xl font-bold text-text mb-6">Nursery Location</h2>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">City *</label>
                    <input type="text" placeholder="Bangalore" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">State *</label>
                    <input type="text" placeholder="Karnataka" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Full Address *</label>
                  <textarea rows={3} placeholder="Complete nursery address" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">PIN Code *</label>
                  <input type="text" placeholder="560038" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Delivery Radius (km) *</label>
                  <input type="number" placeholder="25" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-xl font-bold text-text mb-6">Business Documents</h2>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/30 transition-colors cursor-pointer">
                  <FileText className="w-10 h-10 text-text-muted mx-auto mb-3" />
                  <p className="text-sm font-medium text-text">Upload GST Certificate</p>
                  <p className="text-xs text-text-muted mt-1">PDF, JPG, PNG (Max 5MB)</p>
                </div>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/30 transition-colors cursor-pointer">
                  <FileText className="w-10 h-10 text-text-muted mx-auto mb-3" />
                  <p className="text-sm font-medium text-text">Upload Business Registration</p>
                  <p className="text-xs text-text-muted mt-1">PDF, JPG, PNG (Max 5MB)</p>
                </div>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/30 transition-colors cursor-pointer">
                  <FileText className="w-10 h-10 text-text-muted mx-auto mb-3" />
                  <p className="text-sm font-medium text-text">Upload ID Proof (Aadhaar/PAN)</p>
                  <p className="text-xs text-text-muted mt-1">PDF, JPG, PNG (Max 5MB)</p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h2 className="text-xl font-bold text-text mb-6">Bank & Payout Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Account Holder Name *</label>
                  <input type="text" placeholder="As per bank records" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Account Number *</label>
                  <input type="text" placeholder="Enter account number" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">IFSC Code *</label>
                    <input type="text" placeholder="SBIN0001234" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">Bank Name *</label>
                    <input type="text" placeholder="State Bank of India" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div>
              <h2 className="text-xl font-bold text-text mb-6">Product Categories</h2>
              <p className="text-sm text-text-muted mb-4">Select the categories you want to sell in:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['Indoor Plants', 'Outdoor Plants', 'Flowering Plants', 'Succulents', 'Bonsai', 'Herbs', 'Seeds', 'Pots', 'Tools', 'Soil', 'Fertilizers', 'Fruit Plants'].map(cat => (
                  <label key={cat} className="flex items-center gap-2 p-3 border border-border rounded-xl cursor-pointer hover:border-primary/30 transition-colors">
                    <input type="checkbox" className="w-4 h-4 rounded accent-primary" />
                    <span className="text-sm text-text">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-8">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-3 border border-border text-text-light font-medium rounded-xl hover:bg-background transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={() => currentStep < 5 ? setCurrentStep(currentStep + 1) : null}
              className="flex-1 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              {currentStep < 5 ? (
                <>Next Step <ArrowRight className="w-4 h-4" /></>
              ) : (
                <>Submit Application <CheckCircle2 className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </motion.div>

        {/* Benefits */}
        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          {[
            { value: '10%', desc: 'Low Commission' },
            { value: '24hr', desc: 'Fast Payouts' },
            { value: '50K+', desc: 'Active Buyers' },
          ].map(b => (
            <div key={b.desc} className="bg-white rounded-xl border border-border p-4 text-center">
              <p className="text-2xl font-bold text-primary">{b.value}</p>
              <p className="text-xs text-text-muted">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
