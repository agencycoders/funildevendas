import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { AllCheckouts } from './pages/AllCheckouts';
import { Customers } from './pages/Customers';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import { Help } from './pages/Help';
import { CreateCheckout } from './pages/CreateCheckout';
import { PaymentGateways } from './pages/PaymentGateways';
import { Search, Bell } from 'lucide-react';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <div className="pl-64">
          <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="px-6 py-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Painel de Controlo</h1>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Pesquisar checkouts..."
                    className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
                <button 
                  className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                  aria-label="Notificações"
                >
                  <Bell className="w-6 h-6" />
                  <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-400 ring-2 ring-white" />
                </button>
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Foto do utilizador"
                  className="w-8 h-8 rounded-full"
                />
              </div>
            </div>
          </header>
          <main className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/checkouts" element={<AllCheckouts />} />
              <Route path="/checkouts/new" element={<CreateCheckout />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
              <Route path="/payment-gateways" element={<PaymentGateways />} />
            </Routes>
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;