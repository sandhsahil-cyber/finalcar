import React from 'react';
import { Layers, CheckCircle2, ShoppingBag, ArrowRight, ShieldCheck, Zap, Sparkles, TrendingUp } from 'lucide-react';
import { AccessoryPackage } from '@/types/accessories';

const PACKAGES: AccessoryPackage[] = [
  {
    id: 'PKG-01',
    name: 'Essential Survival Kit',
    description: 'The absolute basics every new car owner needs for protection and comfort.',
    items: ['3D Cabin Floor Mats', 'Mud Flaps (Set of 4)', 'Teflon Coating', 'Microfiber Towel & Perfume'],
    totalPrice: 12500,
  },
  {
    id: 'PKG-02',
    name: 'Black Edition Stealth',
    description: 'Transform your look with darkened accents and premium interiors.',
    items: ['Piano Black Spoiler', 'Nappa Leather Seat Covers', 'Dark Chrome Front Garnish', 'Smoked Visors'],
    totalPrice: 38900,
  },
  {
    id: 'PKG-03',
    name: 'Tech & Safety Pro',
    description: 'Add intelligence to your drive with high-end electronic fitments.',
    items: ['Dual-Channel Dashcam', 'GPS Vehicle Tracker', 'Tire Pressure Monitor (TPMS)', 'Ambient Lighting'],
    totalPrice: 24500,
  },
];

const AccComboPackages: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight uppercase">Pre-defined Combo Kits</h2>
          <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
            <Layers size={16} className="text-primary" /> Curated Accessory Bundles & Dealer Specials
          </p>
        </div>
        <button className="px-6 py-3 bg-primary text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center gap-2">
           <Sparkles size={14} /> Create New Package
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {PACKAGES.map((pkg, i) => (
          <div key={i} className={`relative bg-card border border-border rounded-[40px] p-10 shadow-sm flex flex-col group hover:shadow-2xl hover:translate-y-[-8px] transition-all duration-500 overflow-hidden`}>
             <div className="absolute top-0 right-0 p-12 opacity-5 scale-[2] pointer-events-none group-hover:rotate-12 transition-transform duration-700">
                <ShoppingBag size={120} />
             </div>
             
             <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="p-3 bg-primary/5 rounded-2xl text-primary"><Zap size={24}/></div>
                <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground">ID: {pkg.id}</p>
                    <p className="text-xl font-black text-foreground mt-1">₹{pkg.totalPrice.toLocaleString()}</p>
                </div>
             </div>

             <div className="relative z-10 flex-1">
                <h3 className="text-xl font-black tracking-tight mb-2 group-hover:text-primary transition-colors">{pkg.name}</h3>
                <p className="text-xs text-muted-foreground font-medium mb-8 leading-relaxed">{pkg.description}</p>
                
                <div className="space-y-4 pt-4 border-t border-border border-dashed">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Kit Inclusion Matrix</p>
                    {pkg.items.map((item, j) => (
                        <div key={j} className="flex items-start gap-3 text-[11px] font-bold text-muted-foreground leading-snug">
                            <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                            {item}
                        </div>
                    ))}
                </div>
             </div>

             <div className="mt-12 pt-6 relative z-10">
                <button className="w-full py-4 bg-[#0f172a] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-primary transition-all flex items-center justify-center gap-2">
                    Modify Bundle <ArrowRight size={14} />
                </button>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <div className="bg-gradient-to-br from-primary to-[#0f172a] p-12 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 p-12 opacity-20 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                  <TrendingUp size={180} />
              </div>
              <div className="max-w-md relative z-10">
                  <h3 className="text-3xl font-black tracking-tight mb-6 leading-tight">Bundle-linked Conversion Boost</h3>
                  <p className="text-sm text-white/50 font-medium leading-relaxed mb-10">
                      Standardizing accessory combos results in a **18%** higher per-car Accessory Index (AI). 
                      Sales Executives find it easier to pitch a "Gold Kit" than individual line items.
                  </p>
                  <button className="px-10 py-4 bg-white text-[#0f172a] rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:opacity-90 transition-all">
                      View Performance Audit
                  </button>
              </div>
          </div>

          <div className="bg-card border border-border p-12 rounded-[40px] shadow-sm flex flex-col justify-center text-left">
              <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-emerald-500 rounded-3xl text-white shadow-xl shadow-emerald-500/30">
                      <ShieldCheck size={28} />
                  </div>
                  <h3 className="text-2xl font-black tracking-tight uppercase">Price Integrity Check</h3>
              </div>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed mb-8">
                  The "Essential Survival Kit" (PKG-01) is currently the top-selling bundle. 
                  Ensure that individual item prices are updated in the Master SKU List to maintain bundle profit margins.
              </p>
              <div className="p-5 bg-muted rounded-3xl border border-border flex items-center gap-6">
                 <div>
                    <p className="text-[10px] font-black opacity-50 uppercase tracking-widest">Active Combos</p>
                    <p className="text-2xl font-black">12</p>
                 </div>
                 <div className="w-px h-10 bg-border" />
                 <div>
                    <p className="text-[10px] font-black opacity-50 uppercase tracking-widest">Avg Value</p>
                    <p className="text-2xl font-black tracking-tight">₹18,200</p>
                 </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default AccComboPackages;
