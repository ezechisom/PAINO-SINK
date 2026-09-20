import React, { useState } from 'react';
import { SiteConfig } from '../types';
import { Settings, X, Save, RotateCcw, Check } from 'lucide-react';

interface ConfigEditorModalProps {
  currentConfig: SiteConfig;
  onSaveConfig: (updated: SiteConfig) => void;
  onResetConfig: () => void;
}

export const ConfigEditorModal: React.FC<ConfigEditorModalProps> = ({
  currentConfig,
  onSaveConfig,
  onResetConfig,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [formData, setFormData] = useState({
    productName: currentConfig.productName,
    normalPrice: currentConfig.normalPrice,
    promoPrice: currentConfig.promoPrice,
    whatsappNumber: currentConfig.whatsappNumber,
    phoneNumber: currentConfig.phoneNumber,
    countdownEndDate: currentConfig.countdownEndDate,
    deliveryInformation: currentConfig.deliveryInformation,
    paymentInformation: currentConfig.paymentInformation,
    returnPolicy: currentConfig.returnPolicy,
    warrantyInformation: currentConfig.warrantyInformation,
    formspreeEndpoint: currentConfig.formspreeEndpoint || 'https://formspree.io/f/xppwqdyj',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig({
      ...currentConfig,
      productName: formData.productName,
      normalPrice: Number(formData.normalPrice),
      promoPrice: Number(formData.promoPrice),
      whatsappNumber: formData.whatsappNumber,
      phoneNumber: formData.phoneNumber,
      countdownEndDate: formData.countdownEndDate,
      deliveryInformation: formData.deliveryInformation,
      paymentInformation: formData.paymentInformation,
      returnPolicy: formData.returnPolicy,
      warrantyInformation: formData.warrantyInformation,
      formspreeEndpoint: formData.formspreeEndpoint,
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsOpen(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating trigger button in bottom left */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-30 bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-full border border-slate-700 shadow-xl flex items-center gap-1.5 text-xs font-semibold backdrop-blur-sm cursor-pointer transition-colors"
        title="Quickly test or customize prices & WhatsApp numbers"
      >
        <Settings className="w-3.5 h-3.5 text-amber-400" />
        <span>Customize Config</span>
      </button>

      {/* Modal Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative text-left">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-lg">Central CONFIG Live Customizer</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              All settings here map directly to <code className="text-amber-300">src/config.ts</code>. You can change these values live to preview different promo prices, dates, or contact details.
            </p>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Regular Price (₦)</label>
                  <input
                    type="number"
                    name="normalPrice"
                    value={formData.normalPrice}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-amber-300 font-bold mb-1">Today's Promo Price (₦)</label>
                  <input
                    type="number"
                    name="promoPrice"
                    value={formData.promoPrice}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">WhatsApp Number (e.g. 23480...)</label>
                  <input
                    type="text"
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Delivery Information</label>
                <textarea
                  name="deliveryInformation"
                  rows={2}
                  value={formData.deliveryInformation}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Payment Information</label>
                <textarea
                  name="paymentInformation"
                  rows={2}
                  value={formData.paymentInformation}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Formspree Endpoint (Receives Customer Orders)</label>
                <input
                  type="url"
                  name="formspreeEndpoint"
                  value={formData.formspreeEndpoint}
                  onChange={handleChange}
                  placeholder="https://formspree.io/f/xppwqdyj"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono text-xs"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">Customer submissions will be sent directly to this URL.</span>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onResetConfig();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white px-3 py-2 rounded-lg bg-slate-800 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Default</span>
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-black font-bold px-4 py-2 rounded-lg cursor-pointer transition-colors"
                >
                  {savedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Applied!</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Apply Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
