import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, CreditCard, Smartphone, Building2, Check, Shield, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const deliveryFee = subtotal >= 499 ? 0 : 49;
  const total = subtotal + deliveryFee;

  if (items.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-success" />
          </div>
          <h2 className="text-2xl font-bold text-text mb-2">Order Placed Successfully!</h2>
          <p className="text-text-muted mb-2">Order #PC{Math.random().toString(36).substr(2, 8).toUpperCase()}</p>
          <p className="text-sm text-text-muted mb-6">
            Thank you for your order! You'll receive a confirmation email shortly. Your plants are being prepared with care.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/shop" className="px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors">
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <h1 className="text-3xl font-bold text-text mb-8">Checkout</h1>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-8">
          {['Address', 'Payment', 'Review'].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step > i + 1 ? 'bg-success text-white' : step === i + 1 ? 'bg-primary text-white' : 'bg-border text-text-muted'
              }`}>
                {step > i + 1 ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-sm font-medium hidden sm:block ${step === i + 1 ? 'text-primary' : 'text-text-muted'}`}>{label}</span>
              {i < 2 && <div className="w-8 sm:w-16 h-0.5 bg-border mx-1"></div>}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Step 1: Address */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl border border-border p-6">
                <h2 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Delivery Address
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">Full Name</label>
                    <input type="text" defaultValue="Rahul Sharma" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">Phone</label>
                    <input type="tel" defaultValue="+91 98765 43210" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-text mb-1.5">Address</label>
                    <input type="text" defaultValue="123, Green Valley Apartments, 5th Cross" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">City</label>
                    <input type="text" defaultValue="Bangalore" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">PIN Code</label>
                    <input type="text" defaultValue="560038" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">State</label>
                    <input type="text" defaultValue="Karnataka" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">Landmark</label>
                    <input type="text" defaultValue="Near Indiranagar Metro" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="mt-6 w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors"
                >
                  Continue to Payment
                </button>
              </motion.div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl border border-border p-6">
                <h2 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Payment Method
                </h2>
                <div className="space-y-3">
                  {[
                    { id: 'upi', icon: Smartphone, label: 'UPI (GPay, PhonePe, Paytm)', desc: 'Pay using any UPI app' },
                    { id: 'card', icon: CreditCard, label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay' },
                    { id: 'netbanking', icon: Building2, label: 'Net Banking', desc: 'All major banks supported' },
                    { id: 'cod', icon: Check, label: 'Cash on Delivery', desc: 'Pay when you receive' },
                  ].map(method => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                        paymentMethod === method.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        paymentMethod === method.id ? 'bg-primary/10' : 'bg-background'
                      }`}>
                        <method.icon className={`w-5 h-5 ${paymentMethod === method.id ? 'text-primary' : 'text-text-muted'}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm text-text">{method.label}</p>
                        <p className="text-xs text-text-muted">{method.desc}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === method.id ? 'border-primary' : 'border-border'
                      }`}>
                        {paymentMethod === method.id && <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3.5 border border-border text-text-light font-medium rounded-xl hover:bg-background transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors"
                  >
                    Review Order
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="bg-white rounded-2xl border border-border p-6">
                  <h2 className="text-lg font-bold text-text mb-4">Order Review</h2>
                  <div className="space-y-3">
                    {items.map(({ product, quantity }) => (
                      <div key={product.id} className="flex items-center gap-3">
                        <img src={product.images[0]} alt={product.name} className="w-14 h-14 rounded-lg object-cover" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-text">{product.name}</p>
                          <p className="text-xs text-text-muted">Qty: {quantity}</p>
                        </div>
                        <p className="text-sm font-semibold text-text">₹{(product.price * quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-border p-6">
                  <h3 className="font-semibold text-text mb-2">Delivery Address</h3>
                  <p className="text-sm text-text-light">Rahul Sharma, 123 Green Valley Apartments, Indiranagar, Bangalore - 560038</p>
                </div>

                <div className="bg-white rounded-2xl border border-border p-6">
                  <h3 className="font-semibold text-text mb-2">Payment Method</h3>
                  <p className="text-sm text-text-light capitalize">{paymentMethod === 'upi' ? 'UPI Payment' : paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'card' ? 'Credit/Debit Card' : 'Net Banking'}</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3.5 border border-border text-text-light font-medium rounded-xl hover:bg-background transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all"
                  >
                    <Lock className="w-4 h-4" />
                    Place Order — ₹{total.toLocaleString()}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-border p-6 sticky top-24">
              <h3 className="font-bold text-text mb-4">Order Summary</h3>
              <div className="space-y-2 mb-4">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between text-sm">
                    <span className="text-text-muted truncate mr-2">{product.name} × {quantity}</span>
                    <span className="text-text font-medium shrink-0">₹{(product.price * quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Subtotal</span>
                  <span className="text-text">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Delivery</span>
                  <span className={deliveryFee === 0 ? 'text-success' : 'text-text'}>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="font-bold text-text">Total</span>
                  <span className="text-lg font-bold text-primary">₹{total.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 p-3 bg-accent/20 rounded-xl">
                <Shield className="w-4 h-4 text-primary shrink-0" />
                <span className="text-xs text-primary">100% secure payment. Your data is protected.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
