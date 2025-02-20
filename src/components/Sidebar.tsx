import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { PlusCircle, ShoppingCart, Settings, LayoutDashboard, Users, FileText, HelpCircle, CreditCard } from 'lucide-react';
import { useCheckoutStore } from '../store/checkoutStore';

export function Sidebar() {
  const checkouts = useCheckoutStore((state) => state.checkouts);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNewCheckout = () => {
    navigate('/checkouts/new');
  };

  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-6">
          <ShoppingCart className="w-8 h-8 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">Checkout Pro</h2>
        </div>
        <button 
          onClick={handleNewCheckout}
          className="w-full bg-blue-600 text-white rounded-lg px-4 py-2.5 flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <PlusCircle className="w-5 h-5" />
          Novo Checkout
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-4 space-y-4">
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Principal
            </h3>
            <div className="mt-2 space-y-1">
              <Link
                to="/dashboard"
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg ${
                  location.pathname === '/dashboard'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                Painel Principal
              </Link>
              <Link
                to="/checkouts"
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg ${
                  location.pathname === '/checkouts'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                Todos os Checkouts
              </Link>
              <Link
                to="/payment-gateways"
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg ${
                  location.pathname === '/payment-gateways'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                Gateways de Pagamento
              </Link>
              <Link
                to="/customers"
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg ${
                  location.pathname === '/customers'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Users className="w-5 h-5" />
                Clientes
              </Link>
              <Link
                to="/analytics"
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg ${
                  location.pathname === '/analytics'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FileText className="w-5 h-5" />
                Análises
              </Link>
            </div>
          </div>

          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Os Seus Checkouts
            </h3>
            <div className="mt-2 space-y-1">
              {checkouts.map((checkout) => (
                <Link
                  key={checkout.id}
                  to={checkout.url}
                  className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 group"
                >
                  <span className="truncate">{checkout.name}</span>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      checkout.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {checkout.status === 'active' ? 'Ativo' : 'Rascunho'}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <Link
            to="/settings"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 w-full"
          >
            <Settings className="w-5 h-5" />
            Definições
          </Link>
          <Link
            to="/help"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50"
            aria-label="Ajuda"
          >
            <HelpCircle className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}