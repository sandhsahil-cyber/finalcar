import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/data/dummyData';
import { X, Mail, Lock, User, Shield, Briefcase, UserCircle, Car, Eye, EyeOff, Loader2, ChevronDown } from 'lucide-react';

const roleOptions: { value: UserRole; label: string; icon: React.ElementType; color: string }[] = [
  { value: 'salesperson', label: 'Sales Executive', icon: UserCircle, color: '#3b82f6' },
  { value: 'teamleader', label: 'Team Leader', icon: Shield, color: '#8b5cf6' },
  { value: 'salesmanager', label: 'Sales Manager', icon: Briefcase, color: '#ff6b35' },
];

const demoAccounts = [
  { email: 'manager@autodesk.com', password: 'manager123', role: 'Sales Manager', color: '#ff6b35' },
  { email: 'leader@autodesk.com', password: 'leader123', role: 'Team Leader', color: '#8b5cf6' },
  { email: 'sales@autodesk.com', password: 'sales123', role: 'Sales Executive', color: '#3b82f6' },
];

const LoginModal: React.FC = () => {
  const { showLoginModal, setShowLoginModal, login, signup } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<UserRole>('salesperson');
  const [teamId, setTeamId] = useState('team-1');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!showLoginModal) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.error) setError(result.error);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    if (!fullName.trim()) { setError('Full name is required'); return; }
    setLoading(true);
    const result = await signup({ email, password, full_name: fullName, role, team_id: teamId });
    setLoading(false);
    if (result.error) setError(result.error);
    else setSuccess('Account created! You are now logged in.');
  };

  const handleDemoLogin = async (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');
    setLoading(true);
    const result = await login(demoEmail, demoPassword);
    setLoading(false);
    if (result.error) setError(result.error);
  };

  const resetForm = () => { setEmail(''); setPassword(''); setFullName(''); setError(''); setSuccess(''); };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowLoginModal(false)}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 p-6 text-white">
          <button onClick={() => setShowLoginModal(false)} className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">AutoDesk</h2>
              <p className="text-xs text-white/70">Sales Management System</p>
            </div>
          </div>
          <p className="text-sm text-white/90 mt-2">
            {mode === 'login' ? 'Sign in to access your dashboard' : 'Create a new account'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button onClick={() => { setMode('login'); resetForm(); }} className={`flex-1 py-3 text-sm font-semibold transition-colors ${mode === 'login' ? 'text-orange-600 border-b-2 border-orange-500' : 'text-gray-400 hover:text-gray-600'}`}>
            Sign In
          </button>
          <button onClick={() => { setMode('signup'); resetForm(); }} className={`flex-1 py-3 text-sm font-semibold transition-colors ${mode === 'signup' ? 'text-orange-600 border-b-2 border-orange-500' : 'text-gray-400 hover:text-gray-600'}`}>
            Sign Up
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">{error}</div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700">{success}</div>
          )}

          <form onSubmit={mode === 'login' ? handleLogin : handleSignup} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Enter your full name" required
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder={mode === 'signup' ? 'Min 6 characters' : 'Enter password'} required
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                  {showPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                </button>
              </div>
            </div>

            {mode === 'signup' && (
              <>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Role</label>
                  <div className="grid grid-cols-3 gap-2">
                    {roleOptions.map(opt => {
                      const Icon = opt.icon;
                      const isSelected = role === opt.value;
                      return (
                        <button key={opt.value} type="button" onClick={() => setRole(opt.value)}
                          className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all text-center ${isSelected ? 'border-orange-400 bg-orange-50' : 'border-gray-100 hover:border-gray-200'}`}>
                          <Icon className="w-5 h-5" style={{ color: isSelected ? opt.color : '#9ca3af' }} />
                          <span className={`text-[10px] font-semibold leading-tight ${isSelected ? 'text-gray-900' : 'text-gray-500'}`}>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                {(role === 'salesperson' || role === 'teamleader') && (
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Team</label>
                    <select value={teamId} onChange={e => setTeamId(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 bg-white">
                      <option value="team-1">Alpha Squad</option>
                      <option value="team-2">Beta Force</option>
                      <option value="team-3">Gamma Elite</option>
                      <option value="team-4">Delta Stars</option>
                    </select>
                  </div>
                )}
              </>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2">
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Demo Accounts */}
          {mode === 'login' && (
            <div className="mt-5 pt-5 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Demo Login</p>
              <div className="space-y-2">
                {demoAccounts.map(demo => (
                  <button key={demo.email} onClick={() => handleDemoLogin(demo.email, demo.password)} disabled={loading}
                    className="w-full flex items-center gap-3 px-3 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-left disabled:opacity-50">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${demo.color}15` }}>
                      <User className="w-4 h-4" style={{ color: demo.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-900">{demo.role}</p>
                      <p className="text-[10px] text-gray-400 truncate">{demo.email}</p>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono">{demo.password}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
